#!/bin/sh
# ===================== // WOFI_MEDIA //

## Description: Standalone Script with Wofi Integration
#             - In "Playlist Mode", the script immediately exits after
#               launching mpv.
#             - When selecting a directory (preset or typed), the script
#               now lets you view and select nested directories.
# ---------------------------------------------------------------------

## Global Constants & Variables

CONFIG_FILE="$HOME/.config/mpv/playlists/.wofi_media.conf"
PLAYLIST_DIR="$HOME/.config/mpv/playlists"

## Dirs

MEDIA_DIRS=("$HOME/Videos" "$HOME/Downloads" "/4ndr0" "/sto2" "/tardis" "/s3" "/storage")

## Deps

check_dependencies() {
    local missing=()
    for dep in wofi mpv notify-send socat; do
        if ! command -v "$dep" &>/dev/null; then
            missing+=("$dep")
        fi
    done
    if [ ${#missing[@]} -ne 0 ]; then
        echo "$(date '+%F %T') - Error: Missing dependencies: ${missing[*]}" >/dev/null 2>&1
        notify-send "WofiMedia - Error" "Missing dependencies: ${missing[*]}"
        exit 1
    fi
}

# -------------------------- Error Handling --------------------------
handle_error() {
    local message="$1"
    echo "$(date '+%F %T') - Error: $message" >/dev/null 2>&1
    notify-send "WofiMedia - Error" "$message"
}

# -------------------------- Input Sanitization --------------------------
sanitize_input() {
    local input="$1"
    if [[ "$input" =~ [\"\'\`] ]]; then
        handle_error "Input contains invalid characters: $input"
        return 1
    fi
    echo "$input"
}

# -------------------------- Configuration Loading --------------------------
load_configuration() {
    if [ -f "$CONFIG_FILE" ]; then
        mapfile -t MEDIA_DIRS < "$CONFIG_FILE"
    else
        echo "$(date '+%F %T') - Warning: Config file not found. Using default directories." >/dev/null 2>&1
    fi
}

# -------------------------- Configuration Editing --------------------------
initialize_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        printf "%s\n" "$HOME/Videos" "$HOME/Downloads" > "$CONFIG_FILE"
        notify-send "WofiMedia" "Configuration file created at $CONFIG_FILE"
    fi
    if [ -n "$EDITOR" ]; then
        "$EDITOR" "$CONFIG_FILE" || { handle_error "Failed to edit the config file with \$EDITOR."; return 1; }
    elif command -v micro &>/dev/null; then
        micro "$CONFIG_FILE" || { handle_error "Failed to edit the config file with micro."; return 1; }
    elif command -v nano &>/dev/null; then
        nano "$CONFIG_FILE" || { handle_error "Failed to edit the config file with nano."; return 1; }
    else
        handle_error "No text editor available. Please edit the file manually: $CONFIG_FILE"
        return 1
    fi
    notify-send "WofiMedia" "Configuration file edited successfully. Changes will take effect."
    return 0
}

# ------------------------ Ensure Playlist Directory ------------------------
mkdir -p "$PLAYLIST_DIR"

# ------------------------ Wofi Prompt Helper ------------------------
wofi_prompt() {
    local prompt_text="$1"
    local input
    input=$(cat - | wofi --dmenu --prompt "$prompt_text" --width 500 --height 400 --lines 15 --columns 1)
    echo "$input"
}

# ------------------------ Recursive Nested Directory Selection ------------------------
# Given a starting directory, let the user select a nested directory.
choose_nested_directory() {
    local current_dir="$1"
    while true; do
        # List immediate subdirectories (if any)
        local subs
        subs=$(find "$current_dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
        # Build a menu: the first option selects the current directory,
        # then list each subdirectory.
        local menu="Select current directory"
        if [ -n "$subs" ]; then
            while IFS= read -r sub; do
                menu="${menu}\n${sub}"
            done <<< "$subs"
        fi
        local selection
        selection=$(printf "%b" "$menu" | wofi --dmenu --prompt "Nested selection for: $current_dir" --width 500 --height 400 --lines 15 --columns 1)
        if [ "$selection" == "Select current directory" ] || [ -z "$selection" ]; then
            echo "$current_dir"
            return 0
        elif [ -d "$selection" ]; then
            # Continue drilling down.
            current_dir="$selection"
        else
            # Invalid selection, return current directory.
            echo "$current_dir"
            return 0
        fi
    done
}

# ------------------------ Directory Validation ------------------------
validate_directory() {
    local dir="$1"
    if [ -d "$dir" ]; then
        echo "$(realpath "$dir")"
    else
        handle_error "Invalid directory: $dir"
        return 1
    fi
}

# ------------------------ Media Playback Functions ------------------------
play_media() {
    local media="$1"
    mpv "$media" &
    notify-send "WofiMedia" "Playing: $media"
}

queue_media() {
    local media="$1"
    local sockets_dir="/tmp/"
    if [ ! -d "$sockets_dir" ]; then
        handle_error "No active mpv instances found."
        return 1
    fi
    local mpv_sockets
    mpv_sockets=$(ls "$sockets_dir")
    if [ -z "$mpv_sockets" ]; then
        handle_error "No active mpv instances found."
        return 1
    fi
    local selected_socket
    selected_socket=$(echo "$mpv_sockets" | wofi_prompt "Select mpv instance to queue media:")
    if [ -n "$selected_socket" ]; then
        local socket_path="$sockets_dir/$selected_socket"
        echo "{\"command\": [\"loadfile\", \"$media\", \"append-play\"]}" | socat - "$socket_path"
        notify-send "WofiMedia" "Queued media in mpv instance: $selected_socket"
    else
        notify-send "WofiMedia" "No mpv instance selected."
    fi
}

generate_and_cache_playlist() {
    local dir
    dir=$(realpath "$(validate_directory "$1")") || return 1
    local cache_file="$PLAYLIST_DIR/$(basename "$dir")_playlist.m3u"
    if [ ! -f "$cache_file" ] || [ "$dir" -nt "$cache_file" ]; then
        find "$dir" -type f \( -iname "*.ts" -o -iname "*.3gp" -o -iname "*.mov" -o -iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" -o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \) > "$cache_file"
    fi
    if [ -s "$cache_file" ]; then
        notify-send "WofiMedia" "Playing playlist: $cache_file ($(wc -l < "$cache_file") items)"
        mpv --shuffle --playlist="$cache_file"  &
    else
        handle_error "No media files found in $dir."
        rm -f "$cache_file"
    fi
}

play_playlist() {
    local playlist="$1"
    if [ -f "$playlist" ] && [ -s "$playlist" ]; then
        local media_count
        media_count=$(wc -l < "$playlist")
        notify-send "WofiMedia" "Playing playlist: $playlist ($media_count items)"
        mpv --shuffle --playlist="$playlist" &
    else
        handle_error "The playlist file is empty or does not exist."
    fi
}

browse_media() {
    local dir
    dir=$(realpath "$(validate_directory "$1")") || return 1
    while true; do
        local subdirs
        subdirs=$(find "$dir" -mindepth 1 -maxdepth 1 -type d | sort)
        if [ -n "$subdirs" ]; then
            local dir_choice
            dir_choice=$(echo -e "$subdirs\nBack" | wofi_prompt "Select a subdirectory or go back:")
            if [ "$dir_choice" = "Back" ]; then
                return
            elif [ -d "$dir_choice" ]; then
                dir=$(realpath "$dir_choice")
            else
                handle_error "Invalid selection: $dir_choice"
            fi
        else
            local media_files
            media_files=$(find "$dir" -type f \( -iname "*.ts" -o -iname "*.3gp" -o -iname "*.mov" -o -iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" -o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \) | sort)
            if [ -z "$media_files" ]; then
                notify-send "WofiMedia - Info" "No media files found in $dir."
                return
            fi
            local selected_media
            selected_media=$(echo "$media_files" | wofi_prompt "Select a media file to play or queue:")
            if [ -n "$selected_media" ]; then
                local action
                action=$(echo -e "Play Now\nQueue in mpv\nBack" | wofi_prompt "Choose an action:")
                case "$action" in
                    "Play Now") play_media "$selected_media" ;;
                    "Queue in mpv") queue_media "$selected_media" ;;
                    "Back") ;;
                    *) handle_error "Invalid action selected." ;;
                esac
            else
                notify-send "WofiMedia - Info" "No media file selected."
            fi
            break
        fi
    done
}

# ------------------------ Main Menu Loop ------------------------
load_configuration
check_dependencies

while true; do
    # Build main menu options using the preset directories.
    local main_menu_options
    main_menu_options=$(printf "%s\n" "${MEDIA_DIRS[@]}" "Type a directory..." "Edit Config" "Exit")
    local dir_choice
    dir_choice=$(echo "$main_menu_options" | wofi --dmenu --prompt "Select a media directory or option:" --width 500 --height 400 --lines 15 --columns 1)

    case "$dir_choice" in
        "Exit")
            exit 0
            ;;
        "Edit Config")
            initialize_config || continue
            load_configuration  # Reload updated config
            continue
            ;;
        "Type a directory...")
            local typed_dir
            typed_dir=$(wofi --dmenu --prompt "Enter a directory path:" --width 500 --height 400 --lines 15 --columns 1)
            dir_choice=$(validate_directory "$typed_dir") || continue
            ;;
        *)
            dir_choice=$(validate_directory "$dir_choice") || continue
            ;;
    esac

    # Allow nested selection on preset directories.
    if [ -d "$dir_choice" ]; then
        dir_choice=$(choose_nested_directory "$dir_choice")
    fi

    # Mode selection: Playlist Mode and Browse Mode.
    local mode_choice
    mode_choice=$(echo -e "Playlist Mode\\nBrowse Mode\\nExit" | wofi_prompt "Select a mode:")

    case "$mode_choice" in
        "Playlist Mode")
            generate_and_cache_playlist "$dir_choice"
            exit 0  # Immediately exit after launching mpv
            ;;
        "Browse Mode")
            browse_media "$dir_choice"
            ;;
        "Exit")
            exit 0
            ;;
        *)
            handle_error "Invalid mode selected."
            ;;
    esac
done
