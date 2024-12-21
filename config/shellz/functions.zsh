#!/usr/bin/env bash
# File: Functions.zsh
# Author: 4ndr0666
# Edited: 12-2-24
# ===================================== // FUNCTIONS.ZSH //

# ----------------- // Copypath //
# Description: Copies the absolute path of a file or directory to the clipboard.
copypath() {
    # If no argument passed, use current directory
    local file="${1:-.}"

    # If argument is not an absolute path, prepend $PWD
    [[ $file = /* ]] || file="$PWD/$file"

    # Copy the absolute path without resolving symlinks
    if print -n "${file:a}" | clipcopy; then
        echo "%B${file:a}%b copied to clipboard."
    else
        echo "❌ Failed to copy the path to the clipboard."
        return 1
    fi
}

# ---------------------------------------------------------------- // Spellcheck //
# Description: Checks the spelling of provided words using the 'spellcheck' command.
spell() {
    # Ensure 'spellcheck' command is available
    if ! command -v spellcheck &> /dev/null; then
        echo "❌ Error: 'spellcheck' command not found. Please ensure it is located in ~/.local/bin."
        return 1
    fi

    # Check if at least one argument is provided
    if [ $# -eq 0 ]; then
        echo "❓ Usage: spell <word1> [word2]..."
        return 1
    fi

    # Iterate over each word and perform spell check
    for word in "$@"; do
        echo "🔍 Checking spelling for: $word"
        if spellcheck "$word"; then
            echo "✅ '$word' is spelled correctly."
        else
            echo "⚠️ '$word' may be misspelled."
        fi
        echo # Add a newline for better readability between checks
    done
}

# --- // Restart Waybar:
# Description: Restarts the Waybar process gracefully.
restart_waybar() {
    notify-send "🔄 Restarting Waybar..."
    pkill -TERM waybar
    sleep 1

    # Check if Waybar is still running, force kill if necessary
    if pgrep waybar &>/dev/null; then
        pkill -9 waybar
        sleep 1
    fi

    # Restart Waybar without attaching to the current terminal
    waybar </dev/null &>/dev/null &
    echo "✅ Waybar has been restarted."
}

# ----------------------------------------------------------------------- // ANY //
# Description: Searches for running processes matching a given name with optional case-insensitivity.
any() {
    # Function to display help
    show_help() {
        echo "Usage: any [options] <process name>"
        echo "Options:"
        echo "  -i          Case-insensitive search"
        echo "  -h          Show this help message"
        echo ""
        echo "Examples:"
        echo "  any ssh     # Find all running SSH processes"
        echo "  any -i ssh  # Case-insensitive search for SSH processes"
    }

    # Default options
    local case_insensitive=false

    # Parse options
    while getopts ":ih" opt; do
        case $opt in
            i)
                case_insensitive=true
                ;;
            h)
                show_help
                return 0
                ;;
            \?)
                echo "❌ Invalid option: -$OPTARG" >&2
                show_help
                return 1
                ;;
        esac
    done
    shift $((OPTIND -1))

    # Check if a process name was provided
    if [[ -z $1 ]]; then
        echo "❌ Error: No process name provided."
        show_help
        return 1
    fi

    # Assign the process name
    local process_name="$1"

    # Search for processes using pgrep with appropriate options
    local processes
    if [[ $case_insensitive == true ]]; then
        # Case-insensitive search
        processes=$(pgrep -ifl "$process_name")
    else
        # Case-sensitive search
        processes=$(pgrep -fl "$process_name")
    fi

    # Check if any processes were found
    if [[ -z $processes ]]; then
        echo "ℹ️ No running processes found for '$process_name'."
        return 0
    fi

    # Display the found processes with formatting
    echo "🔍 Running processes matching '$process_name':"
    echo "--------------------------------------------"
    echo "$processes" | awk '{printf "PID: %-8s CMD: %s\n", $1, $2}'
}

# ----------------------------------------------------- // BOOST_SYSTEM_RESOURCES:
# Description: Optimizes system resources by resetting failed units, cleaning sockets, removing broken links, killing zombies, reloading daemons, vacuuming logs, and cleaning temporary files.
sysboost() {
    # Ensure the script exits on any error
    set -e

    # Function to log messages with an optional delay
    log_and_wait() {
        local message=$1
        local delay=${2:-2}  # Default delay is 2 seconds
        echo "$message"
        sleep "$delay"
    }

    log_and_wait "🔄 Optimizing resources in 3 seconds."
    log_and_wait "3..."
    log_and_wait "2.."
    log_and_wait "1"

    # Check and reset failed systemd units
    if command -v systemctl &> /dev/null; then
        log_and_wait "🔄 Resetting all failed SystemD units..."
        systemctl reset-failed || true
    else
        log_and_wait "⚠️ systemctl not found, skipping reset of failed units."
    fi

    # Clear unnecessary D-Bus sockets if the command is available
    if command -v dbus-cleanup-sockets &> /dev/null; then
        log_and_wait "🔄 Clearing unnecessary D-Bus sockets..."
        sudo dbus-cleanup-sockets
    else
        log_and_wait "⚠️ dbus-cleanup-sockets not found, skipping cleanup."
    fi

    # Remove broken SystemD symbolic links
    log_and_wait "🔄 Removing broken SystemD symbolic links..."
    if ! sudo find -L /etc/systemd/ -type l -delete; then
        log_and_wait "⚠️ Unable to search SystemD for broken links."
    fi

    # Kill zombie processes if the zps command is available
    if command -v zps &> /dev/null; then
        log_and_wait "🔄 Killing all zombie processes..."
        sudo zps -r --quiet
    else
        log_and_wait "⚠️ zps not found. Install it using 'sudo pacman -S zps --noconfirm'. Skipping zombie kill."
    fi

    # Reload the system daemon if systemctl is available
    if command -v systemctl &> /dev/null; then
        log_and_wait "🔄 Reloading system daemon..."
        sudo systemctl daemon-reload
    else
        log_and_wait "⚠️ systemctl not found, skipping daemon reload."
    fi

    # Remove old logs using journalctl if available
    if command -v journalctl &> /dev/null; then
        log_and_wait "🔄 Removing logs older than 2 days..."
        sudo journalctl --vacuum-time=2d
    else
        log_and_wait "⚠️ journalctl not found, skipping log cleanup."
    fi

    # Clear /tmp files using tmpwatch or tmpreaper if available
    if command -v tmpwatch &> /dev/null; then
        log_and_wait "🔄 Clearing /tmp files older than 2 hours..."
        sudo tmpwatch 2h /tmp
    elif command -v tmpreaper &> /dev/null; then
        log_and_wait "🔄 Clearing /tmp files older than 2 hours..."
        sudo tmpreaper 2h /tmp
    else
        log_and_wait "⚠️ Neither tmpwatch nor tmpreaper found, skipping /tmp cleanup."
    fi

    log_and_wait "✅ Resources optimized."

    # Disable exit on error
    set +e
}

# ---------------------------------------------------------- // SWAP_BOOST:
# Description: Refreshes swap spaces and accesses memory-mapped files to optimize swap usage.
swapboost() {
    # Initialize log file
    local log_file="/tmp/swapboost_log.txt"
    echo "📝 Logging to $log_file"
    echo "🔄 Starting swapboost process at $(date)" > "$log_file"

    echo "🔍 Scanning accessible file mappings..."
    sleep 2
    local file_count=0
    local cmd_prefix=""
    [[ $EUID -ne 0 ]] && cmd_prefix="sudo"

    # Touch only accessible memory-mapped files
    if command -v parallel &> /dev/null; then
        \mkdir -p "$(dirname "$log_file")"
        sed -ne 's:.* /:/:p' /proc/[0-9]*/maps 2>/dev/null | sort -u | grep -v '^/dev/' | grep -v '(deleted)' | \
        parallel "$cmd_prefix cat {} > /dev/null 2>/dev/null && echo 'Accessed {}' >> \"$log_file\""
    else
        for file in $(sed -ne 's:.* /:/:p' /proc/[0-9]*/maps 2>/dev/null | sort -u | grep -v '^/dev/' | grep -v '(deleted)'); do
            if $cmd_prefix cat "$file" > /dev/null 2>/dev/null; then
                ((file_count++))
                echo "✅ Accessed $file" >> "$log_file"
            fi
        done
    fi

    echo "🔍 Accessed $file_count files from mappings..." | tee -a "$log_file"
    sleep 2

    echo "🔄 Refreshing swap spaces..." | tee -a "$log_file"
    sleep 2

    # Refresh swap spaces
    if $cmd_prefix swapoff -a && $cmd_prefix swapon -a; then
        echo "✅ Swap spaces refreshed!" | tee -a "$log_file"
    else
        echo "❌ Failed to refresh swap spaces." | tee -a "$log_file"
    fi

    # Final message
    echo "🔄 Swapboost process completed at $(date)." >> "$log_file"
    echo "✅ Swapboost process completed."
}

# ---------------------------------------------------------------------// FULL_BOOST:
# Description: Performs a full system boost by running sysboost and swapboost functions.
fullboost() {
    echo "🚀 Initiating full system boost..."
    
    # Run sysboost for general optimization
    echo "🔧 Running sysboost..."
    sysboost

    # Run swapboost to refresh swap spaces and access memory-mapped files
    echo "🔄 Running swapboost..."
    swapboost

    echo "✅ Full system boost completed."
}

# ----------------------------------------------------- // SMART_BACKUP:
# Description: Backs up, moves, or removes backups of specified files or directories with timestamping and verbose options.
bkup() {
    # Initialize variables
    local operation mode file target_dir=() current_date
    current_date=$(date -u "+%Y%m%dT%H%M%SZ")
    local show_help=false copy=false move=false clean=false all=false verbose=false

    # Parse options using getopts (universal shell compatibility)
    while getopts "hcma?rv" opt; do
        case "${opt}" in
            h) show_help=true ;;
            c) copy=true ;;
            m) move=true ;;
            r) clean=true ;;
            a) all=true ;;
            v) verbose=true ;;
            *) show_help=true ;;
        esac
    done
    shift $((OPTIND -1))

    # Show help if -h option is present or if no arguments are provided
    if [ "$show_help" = true ]; then
        cat <<'EOF'
bk [-hcmv] FILE [FILE ...]
bk -r [-av] [FILE [FILE ...]]
Backup a file or folder in place and append the timestamp
Remove backups of a file or folder, or all backups in the current directory

Usage:
  -h    Display this help text
  -c    Keep the file/folder as is, create a copy backup using cp(1) (default)
  -m    Move the file/folder, using mv(1)
  -r    Remove backups of the specified file or directory, using rm(1). If none
        is provided, remove all backups in the current directory.
  -a    Remove all (even hidden) backups.
  -v    Verbose

The -c, -r, and -m options are mutually exclusive. If specified at the same time,
the last one is used.

The return code is the sum of all cp/mv/rm return codes.
EOF
        return 0
    fi

    # Determine operation mode
    if [ "$clean" = true ]; then
        mode="clean"
    elif [ "$move" = true ]; then
        mode="move"
    elif [ "$copy" = true ]; then
        mode="copy"
    else
        mode="copy"  # default mode
    fi

    # Determine target directory/files
    if [ "$all" = true ]; then
        target_dir=(*)
    else
        target_dir=("$@")
    fi

    # Check for valid target
    if [ ${#target_dir[@]} -eq 0 ]; then
        echo "❌ Error: No target file or directory specified."
        return 1
    fi

    # Execute based on mode
    case $mode in
        "clean")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    if [ "$verbose" = true ]; then
                        echo "🗑️ Removing backup: $file"
                    fi
                    rm -rf "$file"
                else
                    echo "⚠️ File $file not found."
                fi
            done
            ;;
        "move")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    local backup_file="${file}_${current_date}"
                    if [[ -e $backup_file ]]; then
                        echo "⚠️ Backup file $backup_file already exists, skipping."
                        continue
                    fi
                    if [ "$verbose" = true ]; then
                        echo "🔀 Moving $file to $backup_file"
                    fi
                    mv "$file" "${backup_file}"
                else
                    echo "⚠️ File $file not found."
                fi
            done
            ;;
        "copy")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    local backup_file="${file}_${current_date}"
                    if [[ -e $backup_file ]]; then
                        echo "⚠️ Backup file $backup_file already exists, skipping."
                        continue
                    fi
                    if [ "$verbose" = true ]; then
                        echo "📋 Copying $file to $backup_file"
                    fi
                    cp -a "$file" "$backup_file"
                else
                    echo "⚠️ File $file not found."
                fi
            done
            ;;
    esac
}

# Alias for help
alias help-bk='bkup -h'

# ------------------------------------------ // TRANSFORM_LIST_INTO_PKG-READABLE:
# Description: Cleans and formats a list of package names from the clipboard, then installs them using the selected package manager.
cleanlist() {
    # Determine clipboard command based on session type or available utility
    local clipboard_cmd packages
    if command -v xclip &> /dev/null; then
        clipboard_cmd="xclip -selection c -o"
    elif command -v wl-paste &> /dev/null; then
        clipboard_cmd="wl-paste"
    else
        echo "❌ No suitable clipboard utility found. Please install xclip or wl-clipboard."
        return 1
    fi

    # Extract, clean, and format package names from clipboard
    packages=$(eval "$clipboard_cmd" | tr ',' '\n' | sed -E 's/=.*//;s/^[[:space:]]+//;s/[[:space:]]+$//' | tr -s '\n' ' ')

    if [[ -z "$packages" ]]; then
        echo "⚠️ No valid package names were found in the clipboard."
        return 1
    fi

    echo "📋 Cleaned package list: $packages"

    # Copy the formatted list back to the clipboard for user reference
    if command -v xclip &>/dev/null; then
        echo -n "$packages" | xclip -selection c
    elif command -v wl-copy &>/dev/null; then
        echo -n "$packages" | wl-copy
    fi

    # Log the cleaned package list for future reference
    local log_file="$HOME/.local/share/cleanlist.log"
    \mkdir -p "$(dirname "$log_file")"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $packages" >> "$log_file"
    echo "📝 Cleaned package list logged to $log_file."

    # Prompt for package manager choice
    local pkg_manager
    while true; do
        echo "🔧 Select the package manager to use:"
        select pkg_manager in paru yay pacman; do
            if [[ -n "$pkg_manager" ]]; then
                break
            else
                echo "❌ Invalid selection. Please choose a valid package manager."
            fi
        done

        case $pkg_manager in
            paru|yay)
                echo "🛠️ Installing packages using $pkg_manager..."
                $pkg_manager -S --needed $packages
                break
                ;;
            pacman)
                echo "🛠️ Installing packages using pacman..."
                sudo pacman -S --needed $packages
                break
                ;;
            *)
                echo "❌ Invalid selection. Please choose a valid package manager."
                ;;
        esac
    done
}

#-------------------------------------------------------- // FIXGPGKEY:
# Description: Fixes GPG keyring issues by updating the gpg.conf and repopulating the pacman keyring.
fixgpgkey() {
    local gpg_conf="$HOME/.gnupg/gpg.conf"
    local keyring_entry="keyring /etc/pacman.d/gnupg/pubring.gpg"
    local backup_file="$gpg_conf.bak.$(date +%Y%m%d%H%M%S)"

    echo "🔧 Starting GPG keyring fix process..."

    # Create a backup of the gpg.conf file before making changes
    if [[ -f "$gpg_conf" ]]; then
        \mkdir -p "$(dirname "$backup_file")"  # Ensure the directory exists
        cp "$gpg_conf" "$backup_file"
        echo "🗄️ Backup of gpg.conf created at $backup_file."
    else
        echo "⚠️ No existing gpg.conf found; creating a new one."
        \mkdir -p "$(dirname "$gpg_conf")"  # Ensure the directory exists
        touch "$gpg_conf"
    fi

    # Check if the keyring entry already exists in gpg.conf
    if ! grep -qF "$keyring_entry" "$gpg_conf"; then
        echo "$keyring_entry" >> "$gpg_conf"
        echo "➕ Keyring entry added to $gpg_conf."
    else
        echo "✅ Keyring entry already exists in $gpg_conf."
    fi

    # Populate the pacman keyring
    echo "🔄 Populating the pacman keyring..."
    if sudo pacman-key --populate archlinux; then
        echo "✅ Pacman keyring populated successfully."
    else
        echo "❌ Failed to populate pacman keyring." >&2
        return 1
    fi

    echo "🔧 GPG keyring fix process completed."
}

# ----------------------------------------------------- // WHATSNEW:
# Description: Lists the most recently modified files across the entire system.
whatsnew() {
    local num_files=${1:-10}
    echo "📂 Listing the $num_files most recently modified files across the entire system:"

    # Check if the user has sudo privileges
    if ! sudo -v &>/dev/null; then
        echo "❌ Error: You do not have sudo privileges."
        return 1
    fi

    # Using Zsh globbing to find and list the most recently modified files
    local files
    files=$(sudo zsh -c "print -rl -- /**/*(.om[1,$num_files])" 2>/dev/null)

    if [[ -z "$files" ]]; then
        echo "⚠️ No recently modified files found."
    else
        echo "$files"
    fi
}

# ------------------------------ // LIST_FILES_RECENTLY_ACCESSED, CHANGED, MODIFIED:
# Description: Lists files accessed, changed, or modified within a specified time range.
accessed() {
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "❌ Usage: accessed [time_range_in_days]"
        return 1
    fi

    # Search and display recently accessed files
    echo "📂 Listing files accessed in the last $time_range day(s):"
    sudo find / -type f -atime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=atime
}

changed() {
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "❌ Usage: changed [time_range_in_days]"
        return 1
    fi

    # Search and display recently changed files
    echo "📂 Listing files changed in the last $time_range day(s):"
    sudo find / -type f -ctime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=ctime
}

modified() {
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "❌ Usage: modified [time_range_in_days]"
        return 1
    fi

    # Search and display recently modified files
    echo "📂 Listing files modified in the last $time_range day(s):"
    sudo find / -type f -mtime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=mtime
}

# ---------------------------------------------------------- // RUN_IN_BACKGROUND:
# Description: Runs a command in the background with logging and PID tracking.
4ever() {
    if [[ -z "$1" ]]; then
        echo "❓ Usage: 4ever <command> [arguments] [log_file]"
        return 1
    fi

    local command="$1"
    shift

    if command -v "$command" >/dev/null 2>&1; then
        local log_file="${@: -1}"
        if [[ "$log_file" == *".log" ]]; then
            set -- "${@:1:$(($#-1))}"
        else
            log_file="/dev/null"
        fi

        # Generate a more descriptive log file name if not specified
        if [[ "$log_file" == "/dev/null" ]]; then
            log_file="/tmp/${command}_$(date +'%Y%m%d%H%M%S').log"
        fi

        # Start the command in the background with nohup and log output
        nohup "$command" "$@" &> "$log_file" &
        local pid=$!
        echo "🟢 Command '$command $*' started in the background with PID $pid."
        echo "📄 Output is being logged to $log_file."

        # Save the PID for later use
        echo "$pid" > "/tmp/forever_${command}_${pid}.pid"
    else
        echo "❌ Command '$command' not found. Not executed."
        return 1
    fi
}

# -------------------------------------------------------------- // MAKE_DIR_&_CD:
# Description: Creates a new directory and changes into it.
mkcd() {
    if (( $# != 1 )); then
        echo "❓ Usage: mkcd <new-directory>"
        return 1
    fi

    local dir="$1"

    # Check if the directory name is valid
    if [[ -z "$dir" ]]; then
        echo "❌ Error: Directory name cannot be empty."
        return 1
    fi

    # Attempt to create the directory if it doesn't exist
    if [[ ! -d "$dir" ]]; then
        if \mkdir -p "$dir"; then
            echo "📁 Directory '$dir' created."
        else
            echo "❌ Failed to create directory '$dir'."
            return 1
        fi
    else
        echo "📁 Directory '$dir' already exists."
    fi

    # Change into the directory, with error checking
    if cd "$dir"; then
        echo "➡️ Switched to directory '$dir'."
    else
        echo "❌ Failed to switch to directory '$dir'."
        return 1
    fi
}

# ---------------------------------------------------------- // MAKE_TMP_DIR_&_CD:
# Description: Creates a temporary directory and changes into it.
cdt() {
    local tmp_dir

    if tmp_dir=$(mktemp -d 2>/dev/null); then
        echo "🆕 Created and switching to temporary directory: $tmp_dir"
        cd "$tmp_dir" || { echo "❌ Failed to switch to temporary directory."; return 1; }
    else
        echo "❌ Failed to create a temporary directory."
        return 1
    fi

    pwd
}

# -------------------------------------------------------------------- // NOTEPAD:
# Description: A simple note-taking function that allows viewing, adding, filtering, and clearing notes.
notepad() {
    local file="$HOME/Documents/notes/.notes"
    \mkdir -p "$(dirname "$file")"  # Ensure the directory exists
    [[ -f $file ]] || touch "$file"

    # Function to display help
    show_help() {
        cat <<'EOF'
Usage: notepad [option] [arguments]
Options:
  (no option)       Display all notes
  -c                Clear all notes
  -r [number]       Display the last 'number' notes (default 10)
  -f <YYYY-MM-DD>   Filter notes by specific date
  -h                Show this help message
  <note>            Add a new note with a timestamp
EOF
    }

    if (( $# )); then
        case "$1" in
            -c)
                > "$file"
                echo "🗑️ All notes cleared."
                ;;
            -r)
                if [[ -z "$2" || ! "$2" =~ ^[0-9]+$ ]]; then
                    echo "⚠️ Invalid or missing argument for -r option. Defaulting to 10."
                    local recent_count=10
                else
                    local recent_count="$2"
                fi
                tail -n "$recent_count" "$file"
                ;;
            -f)
                if [[ -z "$2" || ! "$2" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
                    echo "❌ Usage: notepad -f <YYYY-MM-DD>"
                    return 1
                fi
                grep "\[$2" "$file" || echo "⚠️ No notes found for $2."
                ;;
            -h)
                show_help
                ;;
            --)
                shift
                ;;
            -*)
                echo "❌ Invalid option: $1"
                show_help
                return 1
                ;;
        esac
    else
        cat "$file"
    fi

    # Add a new note if arguments are provided and not options
    if [[ $# -gt 0 && "$1" != "-"* ]]; then
        local timestamp
        timestamp=$(date "+%Y-%m-%d %H:%M:%S")
        printf "[%s] %s\n" "$timestamp" "$*" >> "$file"
        echo "📝 Note added."
    fi
}

# --------------------------------------------------------------TINYURLS:
function turl() {
    emulate -L zsh
    setopt extended_glob

    # Check if at least one URL was provided
    if [[ $# -eq 0 ]]; then
        echo "Usage: turl <URL> [URL ...]"
        return 1
    fi

    local url response shortUrl
    local clipboard_mode=0

    # Process each URL provided
    for url in "$@"; do
        # Validate the URL format
        if [[ ! "$url" =~ ^https?:// ]]; then
            echo "Invalid URL: $url"
            continue
        fi

        # Use curl to post the URL to cleanuri.com's API
        response=$(curl -sS --header "Content-Type: application/x-www-form-urlencoded" \
                        --request POST \
                        --data-urlencode "url=$url" \
                        "https://cleanuri.com/api/v1/shorten")

        # Parse the response to extract the short URL
        shortUrl=$(echo "$response" | grep -Po '"result_url":"\K[^"]+')

        # Check if a short URL was received
        if [[ -n "$shortUrl" ]]; then
            echo "Original URL: $url"
            echo "Short URL: $shortUrl"

            # Check if the user wants to copy to the clipboard
            if [[ $clipboard_mode -eq 1 ]]; then
                echo "$shortUrl" | xclip -selection clipboard
                echo "Short URL copied to clipboard."
            fi
        else
            echo "Error: Failed to shorten URL: $url"
        fi
    done
}

# --------------------------------------------------- // ENHANCED_COPY:
# Ensure the 'copy' alias is removed if it exists
if alias copy &>/dev/null; then
    unalias copy
fi

# Enhanced copy function
copy() {
    local session_type="${XDG_SESSION_TYPE:-$(loginctl show-session "$(loginctl | grep "$(whoami)" | awk '{print $1}')" -p Type --value)}"
    local copy_cmd=()
    local file_path=""

    # Determine the session type and set the copy command accordingly
    if [[ "$session_type" == "wayland" ]]; then
        if command -v wl-copy &>/dev/null; then
            copy_cmd=("wl-copy")
        elif command -v cliphist &>/dev/null; then
            copy_cmd=("cliphist" "copy")
        else
            echo "No compatible clipboard utility found for Wayland."
            return 1
        fi
    elif [[ "$session_type" == "x11" ]]; then
        if command -v xclip &>/dev/null; then
            copy_cmd=("xclip" "-selection" "clipboard")
        else
            echo "No compatible clipboard utility found for X11."
            return 1
        fi
    else
        echo "Unsupported session type: $session_type"
        return 1
    fi

    # Handle the -p option for copying file paths
    if [[ "$1" == "-p" ]]; then
        if [[ -n "$2" ]]; then
            file_path="$2"
            echo -n "$file_path" | "${copy_cmd[@]}"
        else
            echo "No file path specified."
            return 1
        fi
    else
        file_path="$1"
        if [[ -f "$file_path" ]]; then
            cat "$file_path" | "${copy_cmd[@]}"
        else
            echo "File does not exist: $file_path"
            return 1
        fi
    fi

    # Check the result of the copy operation and provide feedback
    if [[ $? -eq 0 ]]; then
        echo "Content copied to clipboard."
    else
        echo "Failed to copy content to clipboard."
        return 1
    fi
}

# ----------------------------------------------- // UNDO/REDO RECENT PKGS INSTALLS: 
# Function to fetch package names based on action type
fetch_packages() {
    local action="$1"
    local count="$2"
    if [[ "$action" == "undo" ]]; then
        expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort -r | head -n "$count" | awk '{print $3}'
    elif [[ "$action" == "redo" ]]; then
        # Use pacman's log file to find recently removed packages
        grep '\[ALPM\] removed' /var/log/pacman.log | tail -n "$count" | awk '{print $4}' | tr -d ':'
    fi
}

# Function to list packages
list_packages() {
    local -a packages=("$@")
    local idx=1
    for pkg in "${packages[@]}"; do
        echo "${idx}) $pkg"
        ((idx++))
    done
}

# Function to modify packages using pacman
modify_packages() {
    local action="$1"
    shift
    local -a packages=("$@")

    if [[ "$action" == "undo" ]]; then
        sudo pacman -Rdd "${packages[@]}"
    elif [[ "$action" == "redo" ]]; then
        sudo pacman -S "${packages[@]}"
    fi
}

manage_packages() {
    local action="$1"  # "undo" or "redo"
    local default_count=5
    local count

    echo -n "Enter the number of recent packages to $action (default: $default_count): "
    read count
    count=${count:-$default_count}

    echo "Fetching the $count most recently ${action}d packages..."

    local packages=()
    if ! while IFS= read -r pkg; do
        packages+=("$pkg")
    done < <(fetch_packages "$action" "$count"); then
        echo "Failed to fetch packages for action: $action."
        return 1
    fi

    (( ${#packages[@]} == 0 )) && { echo "No recent packages found for action: $action."; return; }

    echo "Most recently ${action}d packages:"
    list_packages "${packages[@]}"

    if command -v fzf >/dev/null 2>&1; then
        local selected
        selected=$(printf "%s\n" "${packages[@]}" | fzf --multi --prompt="Select packages to $action: ")
        [[ -z "$selected" ]] && { echo "No packages selected."; return; }
        packages=($selected)
    else
        echo -n "Enter package numbers to $action, separated by space (or type 'all' for all): "
        read selection
        if [[ "$selection" != "all" ]]; then
            local selected_packages=()
            for sel in $selection; do
                if [[ "$sel" =~ ^[0-9]+$ ]] && (( sel > 0 && sel <= ${#packages[@]} )); then
                    selected_packages+=("${packages[sel-1]}")
                else
                    echo "Invalid selection: $sel"
                    return 1
                fi
            done
            packages=("${selected_packages[@]}")
        fi
        (( ${#packages[@]} == 0 )) && { echo "No packages selected."; return; }
    fi

    # Decide the action verb (no uppercase expansions)
    local action_verb="removing"
    [[ "$action" == "redo" ]] && action_verb="reinstalling"

    echo "$action_verb packages..."
    if modify_packages "$action" "${packages[@]}"; then
        echo "Packages ${action_verb} successfully."
    else
        echo "Failed to complete: $action_verb some packages."
        return 1
    fi
}

# Alias to invoke undo functionality, with optional package name
undo() {
    if [[ -n "$1" ]]; then
        manage_packages "undo" "$1"
    else
        manage_packages "undo"
    fi
}

redo() {
    if [[ -n "$1" ]]; then
        manage_packages "redo" "$1"
    else
        manage_packages "redo"
    fi
}

# --------------------------------------------------------- // DOWNSCALE_TO_1080P:
function downscale_to_1080p() {
    local input_file="$1"
    local output_file="${2:-downscaled_1080p.mp4}"
    local quality="${3:-23}"  # Default CRF value for quality, 23 is standard for x264

    if [[ -z "$input_file" ]]; then
        echo "Usage: downscale_to_1080p <path/to/media> [output_file_path] [quality]"
        return 1
    fi

    # Validate input file existence
    if [[ ! -f "$input_file" ]]; then
        echo "Error: Input file '$input_file' does not exist."
        return 1
    fi

    # Check if FFmpeg is installed
    if ! command -v ffmpeg &>/dev/null; then
        echo "Error: FFmpeg is not installed. Please install it first."
        return 1
    fi

    # Validate quality parameter
    if ! [[ "$quality" =~ ^[0-9]+$ ]]; then
        echo "Error: Quality parameter should be an integer (lower is better)."
        return 1
    fi

    # Ensure output file name is unique
    local base_name="${output_file%.*}"
    local extension="${output_file##*.}"
    local counter=1

    while [[ -f "$output_file" ]]; do
        output_file="${base_name}_${counter}.${extension}"
        ((counter++))
    done

    # Start downscale process using FFmpeg
    echo "Starting downscale process to 1080p..."
    ffmpeg -i "$input_file" \
           -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
           -c:v libx264 -crf "$quality" -preset medium \
           -c:a copy "$output_file"

    # Check if FFmpeg command was successful
    if [[ $? -eq 0 ]]; then
        echo "Downscale complete. Output saved to '$output_file'."
    else
        echo "Error: Downscale process failed."
        return 1
    fi
}
alias downscale_to_1080p=downscale

# ------------------------------------------------------ // DEMUX:
function process() {
    local input_file="$1"
    local output_file="${2:-processed_video.mp4}"
    local quality="${3:-23}" 

    if [[ -z "$input_file" ]]; then
        echo "Usage: process <path/to/media> [output_file_path] [quality]"
        return 1
    fi

    if [[ ! -f "$input_file" ]]; then
        echo "Error: Input file '$input_file' does not exist."
        return 1
    fi

    if ! command -v ffmpeg &>/dev/null; then
        echo "Error: FFmpeg is not installed. Please install it first."
        return 1
    fi

    if ! [[ "$quality" =~ ^[0-9]+$ ]]; then
        echo "Error: Quality parameter should be an integer (lower is better)."
        return 1
    fi

    local base_name="${output_file%.*}"
    local extension="${output_file##*.}"
    local counter=1

    while [[ -f "$output_file" ]]; do
        output_file="${base_name}_${counter}.${extension}"
        ((counter++))
    done

    echo "Processing video..."

## Option 1: Copy streams without re-encoding
     ffmpeg -i "$input_file" \
     -c copy "$output_file"

## Option 2: Re-encode video with specified quality
#    ffmpeg -i "$input_file" \
#        -c:v libx264 -crf "$quality" -preset medium \
#        -c:a copy "$output_file"

    if [[ $? -eq 0 ]]; then
        echo "Processing complete: '$output_file'."
    else
        echo "Error: Processing failed."
        return 1
    fi
}
alias process_streams_without_reencoding=process

# --------------------------------------------------------- // DOWNSCALE_TO_1080P:
#function downscale() {
#    local input_file="$1"
#    local output_file="${2:-downscaled_1080p.mp4}"
#    local quality="${3:-15}"  # Default CRF value for quality, lower is better

    # Validate input file presence
#    if [[ -z "$input_file" ]]; then
#        echo "Usage: downscale <path/to/media> [output_file_path] [quality]"
#        return 1
#    fi

    # Validate input file existence
#    if [[ ! -f "$input_file" ]]; then
#        echo "Error: Input file '$input_file' does not exist."
#        return 1
#    fi

    # Validate quality parameter
#    if ! [[ "$quality" =~ ^[0-9]+$ ]]; then
#        echo "Error: Quality parameter should be an integer."
#        return 1
#    fi

    # Ensure output file name is unique
#    local base_name="${output_file%.*}"
#    local extension="${output_file##*.}"
#    local counter=1

#    while [[ -f "$output_file" ]]; do
#        output_file="${base_name}_${counter}.${extension}"
#        ((counter++))
#    done

    # Start downscale process using FFmpeg
#    echo "Starting downscale process to 1080p..."
#    ffmpeg -i "$input_file" \
#           -vf "scale=1920x1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
#           -c:v copy -crf "$quality" -preset slower -c:a copy "$output_file"

    # Check if FFmpeg command was successful
#    if [[ $? -eq 0 ]]; then
#        echo "Downscale complete. Output saved to '$output_file'."
#    else
#        echo "Error: Downscale process failed."
#        return 1
#    fi
#}

# ----------------------------------------------------------- // OPTIMIZE_PACMAN:
function pacopt() {
    echo "Starting Pacman Optimization..."

    echo "In 3..."
    sleep 1
    echo "..2"
    sleep 1
    echo ".1"
    sleep 1

    # Function to perform a task and check its result
    run_task() {
        local task_description="$1"
        shift
        echo "$task_description"
        if "$@"; then
            echo "✔️ $task_description completed successfully."
        else
            echo "❌ Failed to complete: $task_description."
        fi
    }

    run_task "Updating mlocate database..." sudo updatedb

    run_task "Updating pkgfile database..." sudo pkgfile -u

    run_task "Upgrading Pacman database..." sudo pacman-db-upgrade

    run_task "Cleaning package cache..." yes | sudo pacman -Sc

    run_task "Syncing filesystem changes..." sync

    run_task "Refreshing Pacman keys..." sudo pacman-key --refresh-keys

    run_task "Populating keys and updating trust..." sudo pacman-key --populate && sudo pacman-key --updatedb

    run_task "Refreshing package list..." sudo pacman -Syy

    echo "Pacman optimization process completed!"
}

# ---------- ------------------------------------------------------- // Cd and ls:
function cl() {
    # Ensure the script behaves as expected in Zsh
    emulate -L zsh

    # Check if the directory argument is provided
    if [[ -z $1 ]]; then
        echo "Usage: cl <directory>"
        return 1
    fi

    # Resolve the provided directory path
    local dir="$1"

    # Expand `~` to the user's home directory, if present
    dir="${dir/#\~/$HOME}"

    # Check if the directory exists
    if [[ ! -d $dir ]]; then
        echo "Error: Directory '$dir' does not exist."
        return 1
    fi

    # Change to the directory and list its contents with detailed info
    cd "$dir" && ls -lah

    # Check if the directory change was successful
    if [[ $? -eq 0 ]]; then
        echo "Changed to directory: $dir"
    else
        echo "Failed to change to directory: $dir"
        return 1
    fi
}

# ------------------------------------------------------------- // SEARCH_HISTORY:
function whatwhen() {
    emulate -L zsh
    local usage help format_l format_s first_char remain first last search_pattern

    # Usage and help strings
    usage='USAGE: whatwhen [options] <searchstring> [<search range>]'
    help='Use `whatwhen -h` for further explanations.'

    # Formatting for output
    format_l="%s\t\t\t%s\n"
    format_s="${format_l//(\\t)##/\\t}"

    # Handle the case where no search string is provided
    if [[ -z $1 ]]; then
        echo "ERROR: No search string specified. Aborting."
        echo "$usage"
        echo "$help"
        return 1
    fi

    # Handle help option
    if [[ $1 == "-h" ]]; then
        echo "$usage"
        echo "OPTIONS:"
        printf "$format_l" '-h' 'Show this help text'
        echo "SEARCH RANGE:"
        printf "$format_l" "'0'" 'Search the entire history'
        printf "$format_l" "'-<n>'" 'Search the last <n> entries (default: -100)'
        printf "$format_s" "'<first> [<last>]'" 'Search within a given range'
        echo "EXAMPLES:"
        printf "$format_l" 'whatwhen zsh' 'Search the last 100 entries for "zsh"'
        printf "$format_l" 'whatwhen foo -250' 'Search the last 250 entries for "foo"'
        printf "$format_l" 'whatwhen bar 1 99' 'Search entries 1 to 99 for "bar"'
        return 0
    fi

    # Parse search string and range
    search_pattern=$1
    first=${2:-\-100}  # Default search range is the last 100 entries
    last=${3:-}        # Optional last entry

    # Make the first character of the search string case insensitive
    first_char="[${(L)search_pattern[1]}${(U)search_pattern[1]}]"
    remain="${search_pattern[2,-1]}"

    # Perform the search
    fc -li -m "*${first_char}${remain}*" $first $last
}

# --------------------------------------------------------------- // DECODE_URLS:
function urldecode() {
    if [[ -z "$1" ]]; then
        echo "Usage: urldecode <encoded_string>"
        return 1
    fi

    echo "$1" | awk '{gsub(/%([0-9A-Fa-f]{2})/, "\\x\\1"); print}' | xargs -0 echo -e
}

# ------------------------------------------------------------- // TERMBIN:
function termbin() {
    if [[ -z "$1" ]]; then
        echo "Usage: termbin <file>"
        return 1
    fi

    if [[ ! -f "$1" ]]; then
        echo "File not found: $1"
        return 1
    fi

    if ! command -v nc &>/dev/null; then
        echo "'nc' (netcat) is required but not installed."
        return 1
    fi

    local url
    url=$(nc termbin.com 9999 < "$1")

    if [[ $? -eq 0 && -n "$url" ]]; then
        echo "File uploaded successfully."
        echo "URL: $url"
    else
        echo "Error: Failed to upload file."
        return 1
    fi
}

# --- // Extract:
xt() {
  if [[ -f "$1" ]]; then
    case "$1" in
      *.tar.lrz)
        b=$(basename "$1" .tar.lrz)
        lrztar -d "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.lrz)
        b=$(basename "$1" .lrz)
        lrunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tar.bz2)
        b=$(basename "$1" .tar.bz2)
        bsdtar xjf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.bz2)
        b=$(basename "$1" .bz2)
        \bunzip2 "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tar.gz)
        b=$(basename "$1" .tar.gz)
        bsdtar xzf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.gz)
        b=$(basename "$1" .gz)
        \gunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.ipk)
        b=$(basename "$1" .ipk)
        \gunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tar.xz)
        b=$(basename "$1" .tar.xz)
        bsdtar Jxf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.xz)
        b=$(basename "$1" .gz)
        \xz -d "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.rar)
        b=$(basename "$1" .rar)
        unrar e "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tar)
        b=$(basename "$1" .tar)
        bsdtar xf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tbz2)
        b=$(basename "$1" .tbz2)
        bsdtar xjf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.tgz)
        b=$(basename "$1" .tgz)
        bsdtar xzf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.zip)
        b=$(basename "$1" .zip)
        unzip -qq "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.Z)
        b=$(basename "$1" .Z)
        \uncompress "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.7z)
        b=$(basename "$1" .7z)
        7z x "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
      *.zst)
        b=$(basename "$1" .zst)
        zstd -d "$1" && return 0 ;;
      *.deb)
        b=$(basename "$1" .deb)
        ar x "$1" && return 0 ;;
      *.rpm)
        b=$(basename "$1" .rpm)
        rpmextract.sh "$1" && return 0 ;;
      *) echo "error: failed to extract '$1'..." && return 1 ;;
    esac
    return 0
  else
    echo "error: '$1' is not a valid file!"
    return 1
  fi
}

# =============================================== // YTDLP //
declare -A YTDLP_COOKIES_MAP=(
    ["youtube.com"]="$HOME/.config/yt-dlp/youtube_cookies.txt"    # YouTube
    ["youtu.be"]="$HOME/.config/yt-dlp/youtube_cookies.txt"       # YouTube Short Links
    ["patreon.com"]="$HOME/.config/yt-dlp/patreon_cookies.txt"    # Patreon
    ["vimeo.com"]="$HOME/.config/yt-dlp/vimeo_cookies.txt"
    ["boosty.to"]="$HOME/.config/yt-dlp/boosty_cookies.txt"       # Boosty
    # Add more mappings as needed
)

PREFERRED_FORMATS=("313" "308" "303" "302" "247" "244" "136" "137" "bestaudio" "best")

validate_url() {
    local url="$1"
    if [[ "$url" =~ ^https?:// ]]; then
        return 0
    else
        return 1
    fi
}

get_cookies_file() {
    local url="$1"
    local domain
    domain=$(echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//; s/^m\.//')

    echo "${YTDLP_COOKIES_MAP[$domain]}"
}

select_best_format() {
    local url="$1"
    local cookies_file="$2"
    local format_id

    # Fetch JSON output of formats
    local formats_json
    formats_json=$(yt-dlp -j --cookies "$cookies_file" "$url" 2>/dev/null)

    if [[ -z "$formats_json" ]]; then
        echo "best"
        return
    fi

    # Iterate through preferred formats and select the first available one
    for fmt in "${PREFERRED_FORMATS[@]}"; do
        if echo "$formats_json" | jq -e --arg fmt "$fmt" '.formats[] | select(.format_id == $fmt)' > /dev/null; then
            format_id="$fmt"
            echo "$format_id"
            return
        fi
    done

    # If none of the preferred formats are found, fallback to best
    echo "best"
}

get_format_details() {
    local url="$1"
    local cookies_file="$2"
    local format_id="$3"

    # Fetch JSON output for the selected format
    local format_json
    format_json=$(yt-dlp -f "$format_id" -j --cookies "$cookies_file" "$url" 2>/dev/null)

    if [[ -z "$format_json" ]]; then
        echo "N/A"
        return
    fi

    # Extract desired format properties using jq
    echo "$format_json" | jq '{format_id, ext, resolution, fps, tbr, vcodec, acodec, filesize}'
}

ytdlc () {
    # Check for help flag
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        echo "Usage: ytdlc [options] <URL> [<URL> ...]"
        echo "Downloads videos using yt-dlp with predefined settings and site-specific cookies."
        echo ""
        echo "Options:"
        echo "  --help, -h          Show this help message and exit."
        echo "  --list-formats, -l  List available formats for the provided URL(s) without downloading."
        echo "  --output-dir, -o    Specify a custom output directory. Defaults to ~/Downloads."
        echo ""
        echo "Examples:"
        echo "  ytdlc https://www.youtube.com/watch?v=example_video"
        echo "  ytdlc --list-formats https://www.patreon.com/example_creator"
        echo "  ytdlc --output-dir ~/Videos https://www.vimeo.com/example_video"
        return 0
    fi

    # Initialize variables
    local list_formats=0
    local output_dir="$HOME/Downloads"  # Default output directory

    # Parse options
    while [[ "$1" == -* ]]; do
        case "$1" in
            --list-formats|-l)
                list_formats=1
                shift
                ;;
            --output-dir|-o)
                if [[ -n "$2" && ! "$2" =~ ^- ]]; then
                    output_dir="$2"
                    shift 2
                else
                    echo "Error: --output-dir requires a non-empty option argument."
                    echo "Usage: ytdlc [options] <URL> [<URL> ...]"
                    return 1
                fi
                ;;
            *)
                echo "Unknown option: $1"
                echo "Usage: ytdlc [options] <URL> [<URL> ...]"
                return 1
                ;;
        esac
    done

    # Ensure output directory exists
    if [[ ! -d "$output_dir" ]]; then
        \mkdir -p "$output_dir" 2>/dev/null
        if [[ $? -ne 0 ]]; then
            echo "Error: Failed to create output directory '$output_dir'."
            return 1
        fi
    fi

    # Iterate over all provided URLs
    for url in "$@"; do
        echo "----------------------------------------"
        echo "Processing URL: $url"

        # Check if URL is provided
        if [[ -z "$url" ]]; then
            echo "Error: No URL provided."
            echo "Usage: ytdlc [options] <URL> [<URL> ...]"
            continue
        fi

        # Validate URL
        if ! validate_url "$url"; then
            echo "Error: Invalid URL format: $url"
            continue
        fi

        # Retrieve the corresponding cookie file using the helper function
        local cookies_file
        cookies_file=$(get_cookies_file "$url")

        if [[ -z "$cookies_file" ]]; then
            echo "Error: No cookie file configured for the domain in '$url'."
            echo "Please update the YTDLP_COOKIES_MAP associative array with the appropriate cookie file."
            continue
        fi

        # Check if the cookie file exists
        if [[ ! -f "$cookies_file" ]]; then
            echo "Error: Cookie file not found at '$cookies_file'."
            echo "Please ensure the cookie file exists."
            continue
        fi

        # Retrieve the current permissions of the cookie file
        local current_perms
        current_perms=$(stat -c "%a" "$cookies_file" 2>/dev/null)

        if [[ $? -ne 0 ]]; then
            echo "Error: Unable to retrieve permissions for '$cookies_file'."
            continue
        fi

        # Check if permissions are not set to 600
        if [[ "$current_perms" != "600" ]]; then
            echo "Setting permissions of '$cookies_file' to 600 for security."
            chmod 600 "$cookies_file"
            if [[ $? -ne 0 ]]; then
                echo "Error: Failed to set permissions on '$cookies_file'."
                continue
            else
                echo "Permissions set successfully."
            fi
        else
            echo "Permissions for '$cookies_file' are already set to 600."
        fi

        if [[ $list_formats -eq 1 ]]; then
            echo "Listing available formats for '$url':"
            yt-dlp --list-formats --cookies "$cookies_file" "$url"
            echo "----------------------------------------"
            continue
        fi

        # Select the preferred format
        local best_format
        best_format=$(select_best_format "$url" "$cookies_file")

        echo "Selected format ID: $best_format"

        # Fetch and display selected format details
        local format_details
        format_details=$(get_format_details "$url" "$cookies_file" "$best_format")
        echo "Selected format details:"
        echo "$format_details"
        echo ""

        # Execute yt-dlp with the selected format and configurable output directory
        yt-dlp \
            --add-metadata \
            --embed-metadata \
            --external-downloader aria2c \
            --external-downloader-args "-c -j 3 -x 3 -s 3 -k 1M" \
            -f "$best_format+bestaudio/best" \
            --merge-output-format webm \
            --no-playlist \
            --no-mtime \
            --cookies "$cookies_file" \
            --output "$output_dir/%(title)s.%(ext)s" \
            "$url"

        # Check if yt-dlp executed successfully
        if [[ $? -ne 0 ]]; then
            echo "Error: yt-dlp failed to download the video from '$url'."
        else
            echo "Download completed successfully for '$url'."
        fi

        echo "----------------------------------------"
    done
}

ytf() {
    # Check for help flag
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        echo "Usage: ytf <URL>"
        echo ""
        echo "Description:"
        echo "  Lists all available formats for a given video URL."
        echo ""
        echo "Parameters:"
        echo "  <URL>                    The URL of the video to list formats for."
        echo ""
        echo "Options:"
        echo "  --help                   Display this help message."
        echo ""
        echo "Examples:"
        echo "  ytf \"https://www.youtube.com/watch?v=example_video\""
        return 0
    fi

    local url="$1"

    if [[ -z "$url" ]]; then
        echo "Usage: ytf <URL>"
        return 1
    fi

    # Validate URL
    if ! validate_url "$url"; then
        echo "Error: Invalid URL format: $url"
        return 1
    fi

    # Retrieve the corresponding cookie file using the helper function
    local cookies_file
    cookies_file=$(get_cookies_file "$url")

    if [[ -z "$cookies_file" ]]; then
        echo "Error: No cookie file configured for the domain in '$url'."
        echo "Please update the YTDLP_COOKIES_MAP associative array with the appropriate cookie file."
        return 1
    fi

    # Check if the cookie file exists
    if [[ ! -f "$cookies_file" ]]; then
        echo "Error: Cookie file not found at '$cookies_file'."
        echo "Please ensure the cookie file exists."
        return 1
    fi

    # Retrieve the current permissions of the cookie file
    local current_perms
    current_perms=$(stat -c "%a" "$cookies_file" 2>/dev/null)

    if [[ $? -ne 0 ]]; then
        echo "Error: Unable to retrieve permissions for '$cookies_file'."
        return 1
    fi

    # Check if permissions are not set to 600
    if [[ "$current_perms" != "600" ]]; then
        echo "Setting permissions of '$cookies_file' to 600 for security."
        chmod 600 "$cookies_file"
        if [[ $? -ne 0 ]]; then
            echo "Error: Failed to set permissions on '$cookies_file'."
            return 1
        else
            echo "Permissions set successfully."
        fi
    else
        echo "Permissions for '$cookies_file' are already set to 600."
    fi

    # List available formats
    echo "Listing available formats for '$url':"
    yt-dlp --list-formats --cookies "$cookies_file" "$url"
    echo "----------------------------------------"
}

# ----------------------------------------------------- // SPELLCHECK:
# Description: Alias to the spell function for ease of use.
alias spellcheck='spell'

# ================================================== //
#               END OF FUNCTIONS.ZSH
# ================================================== //
