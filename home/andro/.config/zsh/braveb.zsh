##!/bin/zsh
# Author: 4ndr0666
# ================== // BRAVEB //
## Description: Random Bookmark Launcher from Brave
## Usage: braveb [FOLDER_NAME]
# ---------------------------------------------

# Force 24bit
#case "${COLORTERM}" in
#    truecolor | 24bit) ;;  # Already OK
#     *) export COLORTERM="24bit" ;;  # Set to safe default
#esac

# Favorite color
#CYAN="\033[38;2;21;255;255m"
#NC="\033[0m"

# Tput or fallback to ansi
#if command -v tput >/dev/null && [ -t 1 ]; then
#   GLOW() { printf '%s\n' "$(tput setaf 6)$*$(tput sgr0)"; }
#else
#   GLOW() { printf '%s\n' "${CYAN}$*${NC}"; }
#fi

# Constants
BRAVE_BASE="$HOME/.config/BraveSoftware"

# Help
usage() {
	printf '%s\n\n' "Usage: braveb [FOLDER_NAME]"
	printf '%s\n'   "Launches a random bookmark from the specified folder on the Bookmarks bar."
	printf '%s\n\n' "  FOLDER_NAME    Folder name (default: Read Later)"
	printf '%s\n'   "Available Brave profiles found:"
	find "$BRAVE_BASE" -mindepth 1 -maxdepth 1 -type d -name '*-Browser*' | \
	    sed 's|.*/||' | sort | column
	printf '\n%s\n' "Examples:"
	printf '%s\n'   "  braveb                  # → Read Later"
	printf '%s\n'   "  braveb \"To Read\"        # → folder named To Read"
}

# Validate base dir
if [ ! -d "$BRAVE_BASE" ]; then
	printf '%s\n' "Error: Brave config directory '$BRAVE_BASE' does not exist." >&2
	exit 1
fi

# Options
case "$1" in
-h | --help)
	usage
	exit 0
	;;
-v | --version)
	printf '%s\n' "braveb version 1.0"
	exit 0
	;;
esac

if [ $# -lt 1 ]; then
	usage
	exit 1
fi

# Main
emulate -L zsh
local folder_name="${1:-Read Later}"

# Auto-detect profile
local profile_dir
for dir in Default Profile\ *; do
	[[ -d "$BRAVE_BASE/Brave-Browser/$dir" ]] && profile_dir="$BRAVE_BASE/Brave-Browser/$dir" && break
	[[ -d "$BRAVE_BASE/Brave-Browser-Beta/$dir" ]] && profile_dir="$BRAVE_BASE/Brave-Browser-Beta/$dir" && break
done

if [ -z "$profile_dir" ]; then
	printf '%s\n' "Error: No Brave profile found." >&2
	exit 1
fi

local bookmarks_file="$profile_dir/Bookmarks"
local open_cmd="xdg-open"

# Check dependencies
for cmd in jq shuf bat; do
	if ! command -v "$cmd" >/dev/null; then
		printf '%s\n' "Error: Missing dependency: $cmd" >&2
		exit 1
	fi
done

[[ ! -f "$bookmarks_file" ]] && printf '%s\n' "Error: Bookmarks file not found." >&2 && exit 1

local random_url
random_url=$(jq -r --arg FOLDERNAME "$folder_name" '
	.roots.bookmark_bar.children[]
	| select(.type == "folder" and .name == $FOLDERNAME)
	| .children[]
	| select(.type == "url")
	| .url
' "$bookmarks_file" | shuf -n 1)

if [[ -z "$random_url" ]]; then
	printf '%s\n\n' "Error: No URLs found in folder '$folder_name'." >&2
	printf '%s\n'   "       Check spelling, case, and that it is directly on the Bookmarks bar." >&2
	exit 1
fi

GLOW "Opening random bookmark from '$folder_name':"
echo "$random_url" | bat --style=plain --paging=never --language=md --color=always
"$open_cmd" "$random_url" >/dev/null 2>&1
