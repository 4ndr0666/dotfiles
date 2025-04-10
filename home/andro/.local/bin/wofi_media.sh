#!/bin/bash
# Author: 4ndr0666

# ===================== // WOFI_MEDIA.SH //
## Description: Invokes wofi for media selection from user-specified dirs.
##              In "Playlist Mode", a playlist will shuffle the selected dir.
##              In "Browse Mode", user can recursively pick subdirectories and files.
## --------------------------------------

## Global Variables & Constants

PLAYLIST_DIR="$HOME/.config/mpv/playlists"
mkdir -p "$PLAYLIST_DIR"
MEDIA_DIRS=(
	"/home/andro/Videos"
	"/home/andro/Downloads"
	"/storage"
	"/storage/Downloads"
	"/storage/Ari_cloud"
	"/sto2"
	"/sto2/Downloads"
	"/sto2/Gym"
	"/sto2/JD"
	"/sto2/Downloads/kelly"
	"/23.1/Downloads"
	"/23.1/Edits"
	"/23.1/JD"
	"/23.1/Thecloud"
	"/s3/home/andro"
)

## Wofi Prompt

wofi_prompt() {
	local prompt_text="$1"
	local selection
	# read from stdin, no useless cat
	selection=$(wofi --dmenu \
		--prompt "$prompt_text" \
		--width 500 \
		--lines 15 \
		--columns 1 \
		--font "JetBrainsMono Nerd Font Regular 10")
	echo "$selection"
}

## Validate

validate_directory() {
	local dir="$1"
	if [[ -d "$dir" ]]; then
		echo "$dir"
	else
		notify-send "WofiMedia - Error" "Invalid directory: $dir"
		return 1
	fi
}

## MPV

play_media() {
	local media="$1"
	mpv "$media" &
	notify-send "WofiMedia" "Playing: $media"
}

queue_media() {
	local media="$1"
	local sockets_dir="/tmp/mpvSockets"

	if [[ ! -d "$sockets_dir" ]]; then
		notify-send "WofiMedia - Error" "No active mpv instances found."
		return 1
	fi

	local mpv_sockets
	mpv_sockets=$(ls "$sockets_dir")
	if [[ -z "$mpv_sockets" ]]; then
		notify-send "WofiMedia - Error" "No active mpv instances found."
		return 1
	fi

	local selected_socket
	selected_socket=$(echo "$mpv_sockets" | wofi_prompt "Select mpv instance to queue media:")
	if [[ -n "$selected_socket" ]]; then
		local socket_path="$sockets_dir/$selected_socket"
		echo '{ "command": ["loadfile", "'"$media"'", "append-play"] }' | socat - "$socket_path"
		notify-send "WofiMedia" "Queued media in mpv instance: $selected_socket"
	else
		notify-send "WofiMedia" "No mpv instance selected."
	fi
}

play_playlist() {
	local playlist="$1"
	if [[ -f "$playlist" && -s "$playlist" ]]; then
		mpv --shuffle --playlist="$playlist" --loop-playlist=inf --no-border --player-operation-mode=pseudo-gui --no-osc &
		notify-send "WofiMedia" "Playing playlist: $playlist"
	else
		notify-send "WofiMedia - Error" "Playlist empty or doesn't exist: $playlist"
	fi
}

## Playlist

generate_playlist_name() {
	local dir="$1"
	local dir_name
	dir_name=$(basename "$dir")

	local base_name="${PLAYLIST_DIR}/${dir_name}_playlist"
	local playlist_name="${base_name}.m3u"
	local counter=1

	while [[ -f "$playlist_name" ]]; do
		playlist_name="${base_name}_${counter}.m3u"
		((counter++))
	done

	echo "$playlist_name"
}

generate_and_play_playlist() {
	local dir="$1"
	local playlist_file
	playlist_file=$(generate_playlist_name "$dir")

	find "$dir" -type f \( \
		-iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" \
		-o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \
		-o -iname "*.3gp" -o -iname "*.flv" -o -iname "*.ts" \
		\) >"$playlist_file"

	if [[ -s "$playlist_file" ]]; then
		play_playlist "$playlist_file"
	else
		notify-send "WofiMedia - Error" "No media found in: $dir"
		rm -f "$playlist_file"
	fi
}

## Browse Dir

browse_media() {
	local dir="$1"
	while true; do
		local subdirs
		#### Find immediate subdirs
		subdirs=$(find "$dir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | sort)

		if [[ -n "$subdirs" ]]; then
			local dir_choice
			dir_choice=$(printf "%s\nBack\n" "$subdirs" | wofi_prompt "Select subdir or 'Back':")

			if [[ "$dir_choice" == "Back" ]]; then
				return
			elif [[ -d "$dir_choice" ]]; then
				dir="$dir_choice"
			else
				notify-send "WofiMedia - Error" "Invalid selection: $dir_choice"
			fi
		else
			#### No subdirectories => list media files
			local media_files
			media_files=$(find "$dir" -type f \( \
				-iname "*.mp4" -o -iname "*.mkv" -o -iname "*.avi" \
				-o -iname "*.m4v" -o -iname "*.webm" -o -iname "*.gif" \
				-o -iname "*.3gp" -o -iname "*.flv" -o -iname "*.ts" \
				\) | sort)

			if [[ -z "$media_files" ]]; then
				notify-send "PlayMedia - Info" "No media files in $dir."
				return
			fi

			local selected_media
			selected_media=$(echo "$media_files" | wofi_prompt "Select media to play or queue:")

			if [[ -n "$selected_media" ]]; then
				local action
				action=$(printf "Play Now\nQueue in mpv\nBack\n" | wofi_prompt "Choose an action:")
				case "$action" in
				"Play Now") play_media "$selected_media" ;;
				"Queue in mpv") queue_media "$selected_media" ;;
				"Back") ;;
				*) notify-send "WofiMedia - Error" "Invalid action: $action" ;;
				esac
			else
				notify-send "WofiMedia - Info" "No media selected."
			fi
			break
		fi
	done
}

## Main Entry Point

while true; do
	#### Build menu from $MEDIA_DIRS plus "Type a directory..." and "Exit"
	local main_menu
	main_menu=""
	for d in "${MEDIA_DIRS[@]}"; do
		main_menu+="$d"$'\n'
	done
	main_menu+="Type a directory...\nExit"

	local dir_choice
	dir_choice=$(echo -e "$main_menu" | wofi_prompt "Select a media directory:")
	if [[ "$dir_choice" == "Exit" ]]; then
		exit 0
	elif [[ "$dir_choice" == "Type a directory..." ]]; then
		local typed_dir
		typed_dir=$(echo "" | wofi_prompt "Enter a directory path:")
		if [[ -n "$typed_dir" ]]; then
			if ! validate_directory "$typed_dir" >/dev/null; then
				continue
			fi
			dir_choice="$typed_dir"
		else
			continue
		fi
	else
		if ! validate_directory "$dir_choice" >/dev/null; then
			continue
		fi
	fi

	#### Mode selection: "Playlist Mode" or "Browse Mode"
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
		notify-send "WofiMedia - Error" "Invalid mode: $mode_choice"
		;;
	esac
done
