#!/bin/bash

# --- // PlayMedia: Standalone Script with Wofi Integration

# Media directories
MEDIA_DIRS=("$HOME/Videos" "$HOME/Downloads" "/23.1" "/storage" "/sto2" "/4ndr0")

# Directory to store playlists
PLAYLIST_DIR="$HOME/.config/mpv/playlists"

# Ensure the playlist directory exists
mkdir -p "$PLAYLIST_DIR"

# Function to display a wofi prompt that reads options from stdin
wofi_prompt() {
    local prompt_text="$1"
    local input=$(cat - | wofi --dmenu \
        --prompt "$prompt_text" \
        --width 500 \
        --height 400 \
        --lines 15 \
        --columns 1 \
        --font "Monospace 12")
    echo "$input"
}

# Function to validate if a directory exists
validate_directory() {
    local dir="$1"
    if [ -d "$dir" ]; then
        echo "$dir"
    else
        notify-send "PlayMedia - Error" "Invalid directory: $dir"
        return 1
    fi
}

# Function to play selected media
play_media() {
    local media="$1"
    mpv "$media" &
    notify-send "PlayMedia" "Playing: $media"
}

# Function to queue media in a selected mpv instance
queue_media() {
    local media="$1"
    local sockets_dir="/tmp/mpvSockets"

    if [ ! -d "$sockets_dir" ]; then
        notify-send "PlayMedia - Error" "No active mpv instances found."
        return 1
    fi

    local mpv_sockets
    mpv_sockets=$(ls "$sockets_dir")

    if [ -z "$mpv_sockets" ]; then
        notify-send "PlayMedia - Error" "No active mpv instances found."
        return 1
    fi

    local selected_socket
    selected_socket=$(echo "$mpv_sockets" | wofi_prompt "Select mpv instance to queue media:")

    if [ -n "$selected_socket" ]; then
        local socket_path="$sockets_dir/$selected_socket"
        echo '{ "command": ["loadfile", "'"$media"'", "append-play"] }' | socat - "$socket_path"
        notify-send "PlayMedia" "Queued media in mpv instance: $selected_socket"
    else
        notify-send "PlayMedia" "No mpv instance selected."
    fi
}

# Function to play a playlist
play_playlist() {
    local playlist="$1"
    if [ -f "$playlist" ] && [ -s "$playlist" ]; then
        mpv --shuffle --playlist="$playlist" --loop-playlist=inf --no-border --player-operation-mode=pseudo-gui --no-osc &
        notify-send "PlayMedia" "Playing playlist: $playlist"
    else
        notify-send "PlayMedia - Error" "The playlist file is empty or does not exist."
    fi
}

# Function to generate a unique playlist name
generate_playlist_name() {
    local dir_name
    dir_name=$(basename "$1")
    local base_name="${PLAYLIST_DIR}/${dir_name}_playlist"
    local playlist_name="${base_name}.m3u"
    local counter=1

    while [ -f "$playlist_name" ]; do
        playlist_name="${base_name}_${counter}.m3u"
        ((counter++))
    done

    echo "$playlist_name"
}

# Function to generate a playlist and play it
generate_and_play_playlist() {
    local dir="$1"
    local playlist_file
    playlist_file=$(generate_playlist_name "$dir")

    find "$dir" -type f \( -iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" -o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \) >"$playlist_file"

    if [ -s "$playlist_file" ]; then
        play_playlist "$playlist_file"
    else
        notify-send "PlayMedia - Error" "No media files found in $dir."
        rm -f "$playlist_file"
    fi
}

# Function to browse media directories and select media files
browse_media() {
    local dir="$1"
    while true; do
        local subdirs
        subdirs=$(find "$dir" -mindepth 1 -maxdepth 1 -type d | sort)

        if [ -n "$subdirs" ]; then
            local dir_choice
            dir_choice=$(echo -e "$subdirs\nBack" | wofi_prompt "Select a subdirectory or go back:")

            if [ "$dir_choice" = "Back" ]; then
                return
            elif [ -d "$dir_choice" ]; then
                dir="$dir_choice"
            else
                notify-send "PlayMedia - Error" "Invalid selection: $dir_choice"
            fi
        else
            # No subdirectories; list media files
            local media_files
            media_files=$(find "$dir" -type f \( -iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" -o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \) | sort)

            if [ -z "$media_files" ]; then
                notify-send "PlayMedia - Info" "No media files found in $dir."
                return
            fi

            local selected_media
            selected_media=$(echo "$media_files" | wofi_prompt "Select a media file to play or queue:")

            if [ -n "$selected_media" ]; then
                local action
                action=$(echo -e "Play Now\nQueue in mpv\nBack" | wofi_prompt "Choose an action:")

                case "$action" in
                "Play Now")
                    play_media "$selected_media"
                    ;;
                "Queue in mpv")
                    queue_media "$selected_media"
                    ;;
                "Back") ;;
                *)
                    notify-send "PlayMedia - Error" "Invalid action selected."
                    ;;
                esac
            else
                notify-send "PlayMedia - Info" "No media file selected."
            fi
            break
        fi
    done
}

# Main menu loop
while true; do
    # Present media directories, type a directory, or exit
    local main_menu_options
    main_menu_options=$(printf "%s\n" "${MEDIA_DIRS[@]}" "Type a directory..." "Exit")

    local dir_choice
    dir_choice=$(echo "$main_menu_options" | wofi_prompt "Select a media directory:")

    if [ "$dir_choice" = "Exit" ]; then
        exit 0
    elif [ "$dir_choice" = "Type a directory..." ]; then
        local typed_dir
        typed_dir=$(wofi_prompt "Enter a directory path:")

        if [ -n "$typed_dir" ]; then
            dir_choice=$(validate_directory "$typed_dir")
            [ -z "$dir_choice" ] && continue
        else
            continue
        fi
    else
        dir_choice=$(validate_directory "$dir_choice")
        [ -z "$dir_choice" ] && continue
    fi

    # Present mode options
    local mode_choice
    mode_choice=$(echo -e "Playlist Mode\nBrowse Mode\nExit" | wofi_prompt "Select a mode:")

    case "$mode_choice" in
    "Playlist Mode")
        generate_and_play_playlist "$dir_choice"
        ;;
    "Browse Mode")
        browse_media "$dir_choice"
        ;;
    "Exit")
        exit 0
        ;;
    *)
        notify-send "PlayMedia - Error" "Invalid mode selected."
        ;;
    esac
done
