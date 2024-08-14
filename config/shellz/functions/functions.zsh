#File: $USER/.config/shellz/functions/functions.zsh
#Author: 4ndr0666
#Edited: 4-10-2024
#
# --- // 4ndr0666 FUNCTIONS.ZSH // ========


# ---------------------// POETRY:
function poetry_cmd() {
    local cmd=$1
    shift

    case $cmd in
        new)
            echo "📦 Creating a new Poetry project..."
            poetry new "$@"
            ;;
        install)
            echo "🔧 Installing project dependencies..."
            poetry install "$@"
            ;;
        add)
            echo "📥 Adding a package to the project..."
            poetry add "$@"
            ;;
        add-dev)
            echo "🛠️ Adding a development package to the project..."
            poetry add --dev "$@"
            ;;
        update)
            echo "🔄 Updating all project dependencies..."
            poetry update "$@"
            ;;
        run)
            echo "🚀 Running a command within the virtual environment..."
            poetry run "$@"
            ;;
        shell)
            echo "💻 Activating the virtual environment shell..."
            poetry shell
            ;;
        export)
            echo "📤 Exporting dependencies to requirements.txt..."
            poetry export -f requirements.txt --output requirements.txt
            ;;
        show)
            echo "📄 Listing installed dependencies..."
            poetry show "$@"
            ;;
        outdated)
            echo "⚠️ Listing outdated dependencies..."
            poetry show --outdated
            ;;
        lock)
            echo "🔒 Locking dependencies..."
            poetry lock
            ;;
        env-info)
            echo "🔍 Showing environment information..."
            poetry env info
            ;;
        help)
            cat <<'EOF'
Poetry Command Helper

Usage: poetry_cmd <command> [options]

Commands:
  new        📦 Create a new Poetry project
  install    🔧 Install project dependencies
  add        📥 Add a package to the project
  add-dev    🛠️ Add a development package to the project
  update     🔄 Update all project dependencies
  run        🚀 Run a command within the virtual environment
  shell      💻 Activate the virtual environment shell
  export     📤 Export dependencies to requirements.txt
  show       📄 List installed dependencies
  outdated   ⚠️ List outdated dependencies
  lock       🔒 Lock dependencies
  env-info   🔍 Show environment information
  help       📖 Show this help message
EOF
            ;;
        *)
            echo "❌ Invalid command: $cmd"
            echo "Use 'poetry_cmd help' to see available commands."
            ;;
    esac
}


# -------------------------------- // SPELLLCHECK:
spell() {
    if ! command -v spellcheck &> /dev/null; then
        echo "Error: 'spellcheck' command not found. Please ensure it is located in ~/.local/bin."
        return 1
    fi

    if [ $# -eq 0 ]; then
        echo "❓ Usage: spell <word1> [word2]..."
        return 1
    fi

    for word in "$@"; do
        echo "Checking spelling for: $word"
        spellcheck "$word"
        echo # Add a newline for better readability between checks
    done
}

# ------------------------------------ // RESET_WAYBAR:
restart_waybar() {
    echo "🔄 Restarting Waybar..."
    
    # Attempt to gracefully terminate waybar
    if pkill -TERM waybar; then
        echo "Gracefully terminating waybar..."
        sleep 1  # Give it a moment to shut down
    else
        echo "Waybar is not running, starting it now."
    fi
    
    # Forcefully kill waybar if it's still running after the grace period
    if pgrep waybar &>/dev/null; then
        echo "Forcefully killing waybar..."
        pkill -9 waybar
        sleep 1  # Ensure it's fully stopped
    fi
    
    # Start waybar and suppress all output
    if waybar </dev/null &>/dev/null &; then
        echo "Waybar has been restarted successfully."
    else
	echo "❌ Failed to restart Waybar. Process not found."
        return 1
    fi
}

#restart_waybar() {
#	killall -9 waybar $> /dev/null
#	waybar </dev/null &>/dev/null &
#}

# ----------------------------------------- // RESET_PERMISSIONS:
function reset_permissions() {
    # Define a mapping of directories to their correct "factory" permissions
    declare -A dir_permissions=(
        ["/boot"]=755
        ["/dev"]=755
        ["/etc"]=755
        ["/home"]=755
        ["/media"]=755
        ["/mnt"]=755
        ["/opt"]=755
        ["/proc"]=555
        ["/root"]=700
        ["/run"]=755
        ["/srv"]=755
        ["/sys"]=555
        ["/tmp"]=1777
        ["/usr"]=755
        ["/var"]=755
        ["/boot/efi"]=755  # Specifically handle /boot/efi
    )

    # Function to back up current permissions
    backup_permissions() {
        local backup_file="/tmp/permissions_backup_$(date +%Y%m%d%H%M%S).txt"
        echo "Backing up current permissions to $backup_file..."
        for dir in "${!dir_permissions[@]}"; do
            if [[ -d $dir ]]; then
                sudo find "$dir" -exec stat -c "%a %n" {} \; > "$backup_file"
            fi
        done
        echo "Backup completed."
    }

    # Function to reset permissions
    reset_dir_permissions() {
        local dry_run=$1
        for dir in "${!dir_permissions[@]}"; do
            if [[ -d $dir ]]; then
                if [[ "$dry_run" == true ]]; then
                    echo "Dry Run: sudo chmod ${dir_permissions[$dir]} $dir"
                else
                    if sudo chmod "${dir_permissions[$dir]}" "$dir"; then
                        echo "Permissions set for $dir to ${dir_permissions[$dir]}."
                    else
                        echo "Failed to set permissions for $dir." >&2
                    fi
                fi
            else
                echo "Directory $dir does not exist; skipping."
            fi
        done
    }

    # Function to handle files within directories
    reset_file_permissions() {
        local dry_run=$1
        local dir=$2

        if [[ -d "$dir" ]]; then
            if [[ "$dry_run" == true ]]; then
                echo "Dry Run: sudo find $dir -type d -exec chmod 755 {} \\;"
                echo "Dry Run: sudo find $dir -type f -exec chmod 644 {} \\;"
                echo "Dry Run: sudo find $dir -type f -perm /u+x -exec chmod 755 {} \\;"
            else
                sudo find "$dir" -type d -exec chmod 755 {} \;
                sudo find "$dir" -type f -exec chmod 644 {} \;
                sudo find "$dir" -type f -perm /u+x -exec chmod 755 {} \;
                echo "Permissions reset for $dir."
            fi
        fi
    }

    # Confirm before proceeding
    echo "This will reset permissions on critical system directories to their defaults."
    read -q "REPLY?Are you sure you want to continue? (y/N) "
    echo
    if [[ ! "$REPLY" =~ ^[Yy]$ ]]; then
        echo "Operation canceled."
        return 0
    fi

    # Prompt for dry run
    echo "Would you like to perform a dry run first? (y/N)"
    read -q "DRY_RUN"
    echo
    if [[ "$DRY_RUN" =~ ^[Yy]$ ]]; then
        dry_run=true
        echo "Performing a dry run..."
    else
        dry_run=false
        # Backup current permissions
        backup_permissions
    fi

    # Reset permissions for main directories
    echo "Setting default permissions for main directories..."
    reset_dir_permissions "$dry_run"

    # Special handling for files within certain directories
    echo "Setting appropriate permissions for files and subdirectories..."

    reset_file_permissions "$dry_run" "/etc"
    reset_file_permissions "$dry_run" "/var"

    # Example: /boot/efi - ensure it's handled carefully
    if [[ -d "/boot/efi" ]]; then
        if [[ "$dry_run" == true ]]; then
            echo "Dry Run: sudo chmod 755 /boot/efi"
        else
            sudo chmod 755 /boot/efi && \
            echo "Permissions reset for /boot/efi." || \
            echo "Failed to set permissions for /boot/efi. Please check manually." >&2
        fi
    fi

    echo "Permissions reset process completed."
}
alias reset-perms=reset_permissions

# ------------------------------------------------------------------------ // GLOB_HELP:
function H-Glob() {
    cat <<'EOF'
Zsh Globbing Features and Examples:

File Types:
- /    Directories
- .    Plain files
- @    Symbolic links
- =    Sockets
- p    Named pipes (FIFOs)
- *    Executable plain files (0100 permission)
- %    Device files (character or block special)
- %b   Block special files
- %c   Character special files

Permissions:
- r    Owner-readable files (0400 permission)
- w    Owner-writable files (0200 permission)
- x    Owner-executable files (0100 permission)
- A    Group-readable files (0040 permission)
- I    Group-writable files (0020 permission)
- E    Group-executable files (0010 permission)
- R    World-readable files (0004 permission)
- W    World-writable files (0002 permission)
- X    World-executable files (0001 permission)
- s    Setuid files (04000 permission)
- S    Setgid files (02000 permission)
- t    Files with the sticky bit (01000 permission)

Examples:
- print *(m-1)          # Files modified up to a day ago
- print *(a1)           # Files accessed a day ago
- print *(@)            # Just symlinks
- print *(Lk+50)        # Files bigger than 50 kilobytes
- print *(Lk-50)        # Files smaller than 50 kilobytes
- print **/*.c          # All *.c files recursively starting in $PWD
- print **/*.c~file.c   # Same as above, but excluding 'file.c'
- print (foo|bar).*     # Files starting with 'foo' or 'bar'
- print *~*.*           # All files that do not contain a dot
- chmod 644 *(.^x)      # Make all plain non-executable files publicly readable
- print -l *(.c|.h)     # Lists *.c and *.h files
- print **/*(g:users:)  # Recursively match all files that are owned by group 'users'
- echo /proc/*/cwd(:h:t:s/self//) # Analogous to `ps ax | awk '{print $1}'`

EOF
}
alias help-zshglob=H-Glob

# ----------------------------------------------------------- // SEARCH_PROCESSES:
function any() {
    # Function to display help
    function show_help() {
        echo "Usage: any [options] <process name>"
        echo "Options:"
        echo "  -i          Case-insensitive search"
        echo "  -h          Show this help message"
        echo ""
        echo "Example:"
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
                echo "Invalid option: -$OPTARG" >&2
                show_help
                return 1
                ;;
        esac
    done
    shift $((OPTIND -1))

    # Check if a process name was provided
    if [[ -z $1 ]]; then
        echo "Error: No process name provided."
        show_help
        return 1
    fi

    # Search for processes
    local processes
    if [[ $case_insensitive == true ]]; then
        processes=$(pgrep -fil "$1" | grep -v grep)
    else
        processes=$(pgrep -fl "$1" | grep -v grep)
    fi

    # Check if any processes were found
    if [[ -z $processes ]]; then
        echo "No running processes found for '$1'."
        return 1
    fi

    # Print the found processes with formatting
    echo "Running processes matching '$1':"
    echo "--------------------------------"
    echo "$processes" | awk '{printf "%-10s %s\n", $1, $2}'
}

# ----------------------------------------------------- // BOOST_SYSTEM_RESOURCES:
function sysboost() {
    # Ensure the script exits on any error
    set -e

    # Function to log messages with a delay
    log_and_wait() {
        local message=$1
        echo "$message"
        sleep 2
    }

    log_and_wait "Optimizing resources in 3 seconds."
    log_and_wait "3..."
    log_and_wait "2.."
    log_and_wait "1"

    # Check and reset failed systemd units
    if command -v systemctl &> /dev/null; then
        log_and_wait "Resetting all failed SystemD units..."
        systemctl reset-failed || true
    else
        log_and_wait "systemctl not found, skipping reset of failed units."
    fi

    # Clear unnecessary Dbus sockets if the command is available
    if command -v dbus-cleanup-sockets &> /dev/null; then
        log_and_wait "Clearing unnecessary Dbus sockets..."
        sudo dbus-cleanup-sockets
    else
        log_and_wait "Dbus-cleanup-sockets not found, skipping cleanup."
    fi

    # Remove broken SystemD links
    if sudo find -L /etc/systemd/ -type l -delete; then
        log_and_wait "Removing broken SystemD links..."
    else
        log_and_wait "Unable to search SystemD for broken links."
    fi

    # Kill zombie processes if the zps command is available
    if command -v zps &> /dev/null; then
        log_and_wait "Killing all zombies..."
        sudo zps -r --quiet
    else
        log_and_wait "To kill zombies, zps is required 'sudo pacman -S zps --noconfirm'. Skipping"
    fi

    # Reload the system daemon if systemctl is available
    if command -v systemctl &> /dev/null; then
        log_and_wait "Reloading system daemon..."
        sudo systemctl daemon-reload
    else
        log_and_wait "systemctl not found, skipping daemon reload."
    fi

    # Remove old logs using journalctl if available
    if command -v journalctl &> /dev/null; then
        log_and_wait "Removing logs older than 2 days..."
        sudo journalctl --vacuum-time=2d
    else
        log_and_wait "journalctl not found, skipping log cleanup."
    fi

    # Clear /tmp files using tmpwatch or tmpreaper if available
    if command -v tmpwatch &> /dev/null; then
        log_and_wait "Clearing /tmp files older than 2 hours..."
        sudo tmpwatch 2h /tmp
    elif command -v tmpreaper &> /dev/null; then
        log_and_wait "Clearing /tmp files older than 2 hours..."
        sudo tmpreaper 2h /tmp
    else
        log_and_wait "Neither tmpwatch nor tmpreaper found, skipping /tmp cleanup."
    fi

    log_and_wait "Resources optimized."
    # Disable exit on error
    set +e
}

# ---------------------------------------------------------- // SYS_BOOST2:
 # taken from $LINUX-KERNELSOURCE/Documentation/power/swsusp.txt
function swapboost() {
    # Ensure the script exits on any error
    set -e

    # Ensure we have read access to /proc/1/maps
    if [[ ! -r /proc/1/maps ]]; then
        echo "Auto-escalating for directory access of /proc/1/maps."
        if ! sudo test -r /proc/1/maps; then
            echo "Unable to escalate privileges."
            return 1
        fi
    fi

    echo "Scanning file mappings..."
    sleep 2
    local file_count=0
    local cmd_prefix=""
    [[ $EUID -ne 0 ]] && cmd_prefix="sudo"

    # Use parallel to speed up the process if available
    if command -v parallel &> /dev/null; then
        sed -ne 's:.* /:/:p' /proc/[0-9]*/maps | sort -u | grep -v '^/dev/' | \
        parallel "$cmd_prefix cat {} > /dev/null && echo 'Accessed {}' >> $log_file || echo 'Failed to access {}' >> $log_file"
    else
        for file in $(sed -ne 's:.* /:/:p' /proc/[0-9]*/maps | sort -u | grep -v '^/dev/'); do
            $cmd_prefix cat "$file" > /dev/null && ((file_count++)) || echo "Failed to access $file" >> "$log_file"
        done
    fi

    echo "Accessed $file_count files from mappings..."
    sleep 2
    echo 'Refreshing swap spaces...'
    sleep 2
    
    # Refresh swap spaces
    if $cmd_prefix swapoff -a && $cmd_prefix swapon -a; then
        echo "Swap spaces refreshed!"
    else
        echo "Failed to refresh swap spaces" >> error.log
    fi

    # Final message
    echo "Swapboost process completed."

    # Disable exit on error
    set +e
}

# ----------------------------------------------------- // SMART_BACKUP:
function bkup() {
    # Initialize variables
    local operation mode file target_dir current_date=$(date -u "+%Y%m%dT%H%M%SZ")
    local -A opts

    # Parse options
    zparseopts -D -E -A opts h=show_help c=copy m=move r=clean a=all v=verbose

    # Show help if -h option is present
    if (( $+opts[show_help] )); then
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

The -c, -r and -m options are mutually exclusive. If specified at the same time,
the last one is used.

The return code is the sum of all cp/mv/rm return codes.
EOF
        return 0
    fi

    # Determine operation mode
    if (( $+opts[clean] )); then
        mode="clean"
    elif (( $+opts[move] )); then
        mode="move"
    elif (( $+opts[copy] )); then
        mode="copy"
    else
        mode="copy"  # default mode
    fi

    # Determine target directory/files
    if (( $+opts[all] )); then
        target_dir=("*")
    else
        target_dir=("$@")
    fi

    # Check for valid target
    if [ -z "$target_dir" ]; then
        echo "Error: No target file or directory specified."
        return 1
    fi

    # Execute based on mode
    case $mode in
        "clean")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    (( $+opts[verbose] )) && echo "Removing $file"
                    rm -rf "$file"
                else
                    echo "File $file not found."
                fi
            done
            ;;
        "move")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    (( $+opts[verbose] )) && echo "Moving $file"
                    mv "$file" "${file}_${current_date}"
                else
                    echo "File $file not found."
                fi
            done
            ;;
        "copy")
            for file in "${target_dir[@]}"; do
                if [[ -e $file ]]; then
                    local backup_file="${file}_${current_date}"
                    if [[ -e $backup_file ]]; then
                        echo "Warning: Backup file $backup_file already exists, skipping."
                        continue
                    fi
                    (( $+opts[verbose] )) && echo "Copying $file to $backup_file"
                    cp -a "$file" "$backup_file"
                else
                    echo "File $file not found."
                fi
            done
            ;;
    esac
}
alias help-bk='bk -h'

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

# ------------------------------------------ // TRANSFORM_LIST_INTO_PKG-READABLE:
function cleanlist() {
    # Determine clipboard command based on session type or available utility
    local clipboard_cmd packages
    if command -v xclip &>/dev/null; then
        clipboard_cmd="xclip -o"
    elif command -v wl-paste &>/dev/null; then
        clipboard_cmd="wl-paste"
    else
        echo "No suitable clipboard utility found. Please install xclip or wl-clipboard."
        return 1
    fi

    # Extract, clean, and format package names from clipboard
    packages=$(eval "$clipboard_cmd" | tr ',' '\n' | sed -E 's/=.*//;s/^[[:space:]]+//;s/[[:space:]]+$//' | tr '\n' ' ')

    if [[ -z "$packages" ]]; then
        echo "No valid package names were found in clipboard."
        return 1
    fi

    echo "Cleaned package list: $packages"

    # Copy the formatted list back to the clipboard for user reference
    if command -v xclip &>/dev/null; then
        echo "$packages" | xclip -selection c
    elif command -v wl-copy &>/dev/null; then
        echo "$packages" | wl-copy
    fi

    # Log the cleaned package list for future reference
    local log_file="$HOME/.local/share/cleanlist.log"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $packages" >> "$log_file"
    echo "Cleaned package list logged to $log_file."

    # Prompt for package manager choice
    echo "Select the package manager to use:"
    select pkg_manager in paru yay pacman; do
        case $pkg_manager in
            paru|yay)
                $pkg_manager -S --needed $packages
                break
                ;;
            pacman)
                sudo pacman -S --needed $packages
                break
                ;;
            *)
                echo "Invalid selection. Please choose a valid package manager."
                ;;
        esac
    done
}

#-------------------------------------------------------- // FIXGPGKEY:
function fixgpgkey() {
    local gpg_conf="$HOME/.gnupg/gpg.conf"
    local keyring_entry="keyring /etc/pacman.d/gnupg/pubring.gpg"
    local backup_file="$gpg_conf.bak.$(date +%Y%m%d%H%M%S)"

    echo "Starting GPG keyring fix process..."

    # Create a backup of the gpg.conf file before making changes
    if [[ -f "$gpg_conf" ]]; then
        cp "$gpg_conf" "$backup_file"
        echo "Backup of gpg.conf created at $backup_file."
    else
        echo "No existing gpg.conf found; creating a new one."
        touch "$gpg_conf"
    fi

    # Check if the keyring entry already exists in gpg.conf
    if ! grep -qF "$keyring_entry" "$gpg_conf"; then
        echo "$keyring_entry" >> "$gpg_conf"
        echo "Keyring entry added to $gpg_conf."
    else
        echo "Keyring entry already exists in $gpg_conf."
    fi

    # Populate the pacman keyring
    echo "Populating the pacman keyring..."
    if sudo pacman-key --populate archlinux; then
        echo "Pacman keyring populated successfully."
    else
        echo "Failed to populate pacman keyring." >&2
        return 1
    fi

    echo "GPG keyring fix process completed."
}

# ------------------------------------------------ // WHATSNEW:
function whatsnew() {
    local num_files=${1:-10}
    echo "Listing the $num_files most recently modified files across the entire system:"

    # Check if the user has sudo privileges
    if ! sudo -v &>/dev/null; then
        echo "Error: You do not have sudo privileges." >&2
        return 1
    fi

    # Using Zsh globbing to find and list the most recently modified files
    local files
    files=$(sudo zsh -c "print -rl -- /**/*(.om[1,$num_files])" 2>/dev/null)

    if [[ -z "$files" ]]; then
        echo "No recently modified files found."
    else
        echo "$files"
    fi
}

# ------------------------------------------------------------ // FINDIT:
# Function to validate and run a command
validate() {
    local command="$1"
    echo "Running: $command"
    if ! eval "$command"; then
        echo "Error: Command failed - $command"
        return 1
    fi
}

# Function to check and install 'fd'
check_install_fd() {
    if ! command -v fd &> /dev/null; then
        echo "'fd' is not installed. Attempting to install it..."
        if command -v pacman &> /dev/null; then
            sudo pacman -Sy --noconfirm fd
        elif command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y fd-find
            sudo ln -s "$(which fdfind)" /usr/local/bin/fd  # For compatibility
        else
            echo "Unsupported package manager. Please install 'fd' manually."
            return 1
        fi
    fi
}

# Main find function
findit() {
    local choice query search_type search_dir
    local include_hidden="" case_sensitive="--ignore-case" absolute_paths=""
    local max_depth="" min_depth="" list_details="" fd_command="fd"

    # Check and install necessary tools
    check_install_fd

    echo "Do you want to find a file (f) or a directory (d)?"
    read -r choice

    case $choice in
        f)
            search_type="f"
            ;;
        d)
            search_type="d"
            ;;
        *)
            echo "Invalid choice. Please select 'f' for file or 'd' for directory."
            return 1
            ;;
    esac

    echo "Enter the name to search for:"
    read -r query

    if [[ -z $query ]]; then
        echo "$search_type name cannot be empty."
        return 1
    fi

    echo "Enter the directory to search in (leave empty for current directory):"
    read -r search_dir
    search_dir=${search_dir:-$(pwd)}

    # Basic search options
    echo "Include hidden files (y/N): "
    read -r include_hidden
    [ "$include_hidden" == "y" ] && include_hidden="--hidden" || include_hidden=""

    echo "Case sensitive search (y/N): "
    read -r case_sensitive
    [ "$case_sensitive" == "y" ] && case_sensitive="--case-sensitive" || case_sensitive="--ignore-case"

    echo "Show absolute paths (y/N): "
    read -r absolute_paths
    [ "$absolute_paths" == "y" ] && absolute_paths="--absolute-path" || absolute_paths=""

    echo "Enter maximum search depth (leave empty for no limit): "
    read -r max_depth
    [ -n "$max_depth" ] && max_depth="--max-depth $max_depth" || max_depth=""

    echo "Enter minimum search depth (leave empty for no limit): "
    read -r min_depth
    [ -n "$min_depth" ] && min_depth="--min-depth $min_depth" || min_depth=""

    echo "Use long listing format with file metadata (y/N): "
    read -r list_details
    [ "$list_details" == "y" ] && list_details="--list-details" || list_details=""

    # Construct the fd command
    fd_command="fd --type $search_type $query $search_dir $include_hidden $case_sensitive $absolute_paths $max_depth $min_depth $list_details"

    echo "Executing: $fd_command"

    # Use eval to execute the constructed command safely
    if ! eval "$fd_command"; then
        echo "Error: Command failed."
        return 1
    fi
}

# --------------------------------------------------- // ENHANCED_COPY:
# Ensure the 'copy' alias is removed if it exists
if alias copy &>/dev/null; then
    unalias copy
fi

# Enhanced copy function
function copy() {
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

# ----------------------------------------------- // UNDO_RECENTLY_INSTALLED_PKGS:
function undo() {
    echo "Fetching the most recently installed packages..."

    # Fetch the list of most recently installed packages
    local -a recent_packages
    recent_packages=("${(@f)$(expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort -r | head -n 20 | awk '{print $3}')}")

    if (( ${#recent_packages[@]} == 0 )); then
        echo "No recent packages found."
        return
    fi

    echo "Most recently installed packages are:"
    local idx=1
    for pkg in "${recent_packages[@]}"; do
        echo "${idx}) $pkg"
        ((idx++))
    done

    read -q "response?Proceed with primary removal method 'pacman -Rdd' (does not remove dependencies)? [y/N]: "
    echo
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Attempting to remove packages..."
        if sudo pacman -Rdd "${recent_packages[@]}"; then
            echo "Packages removed with 'pacman -Rdd'. Orphaned dependencies are not removed."
        else
            echo "Failed to remove packages. Please check for errors and try again."
            return 1
        fi
    else
        echo "Primary removal canceled."
    fi

    read -q "response?Do you want to remove unneeded dependencies with 'pacman -Rns'? [y/N]: "
    echo
    if [[ "$response" =~ ^[Yy]$ ]]; then
        local orphans=("${(@f)$(pacman -Qdtq)}")
        if (( ${#orphans[@]} > 0 )); then
            echo "Removing unneeded dependencies..."
            if sudo pacman -Rns "${orphans[@]}"; then
                echo "Unneeded dependencies removed."
            else
                echo "Failed to remove unneeded dependencies. Please check for errors and try again."
            fi
        else
            echo "No unneeded dependencies to remove."
        fi
    else
        echo "Additional cleanup canceled."
    fi
}

# --------------------------------------------------------- // DOWNSCALE_TO_1080P:
function downscale() {
    local input_file="$1"
    local output_file="${2:-output_1080p.mp4}"
    local quality="${3:-18}"  # Default CRF value for quality, lower is better

    # Validate input file presence
    if [[ -z "$input_file" ]]; then
        echo "Usage: downscale <path/to/media> [output_file_path] [quality]"
        return 1
    fi

    # Validate input file existence
    if [[ ! -f "$input_file" ]]; then
        echo "Error: Input file '$input_file' does not exist."
        return 1
    fi

    # Validate quality parameter
    if ! [[ "$quality" =~ ^[0-9]+$ ]]; then
        echo "Error: Quality parameter should be an integer."
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
           -vf "scale=1920x1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
           -c:v libx264 -crf "$quality" -preset slow -c:a copy "$output_file"

    # Check if FFmpeg command was successful
    if [[ $? -eq 0 ]]; then
        echo "Downscale complete. Output saved to '$output_file'."
    else
        echo "Error: Downscale process failed."
        return 1
    fi
}

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

# ------------------------------ // LIST_FILES_RECENTLY_ACCESSED,CHANGED,MOD_BY:
function accessed() {
    emulate -L zsh
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: accessed [time_range_in_days]"
        return 1
    fi

    # Search and display recently accessed files
    echo "Listing files accessed in the last $time_range day(s):"
    sudo find / -type f -atime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=atime
}

function changed() {
    emulate -L zsh
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: changed [time_range_in_days]"
        return 1
    fi

    # Search and display recently changed files
    echo "Listing files changed in the last $time_range day(s):"
    sudo find / -type f -ctime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=ctime
}

function modified() {
    emulate -L zsh
    local time_range=${1:-1}

    # Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: modified [time_range_in_days]"
        return 1
    fi

    # Search and display recently modified files
    echo "Listing files modified in the last $time_range day(s):"
    sudo find / -type f -mtime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=mtime
}

# ---------------------------------------------------------- // RUN_IN_BACKGROUND:
function 4everr() {
    if [[ -z "$1" ]]; then
        echo "Usage: 4everr <command> [arguments] [log_file]"
        return 1
    fi

    local command="$1"
    shift

    if command -v "$command" >/dev/null 2>&1; then
        local log_file="${@: -1}"
        if [[ -f "$log_file" || "$log_file" == *".log" ]]; then
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
        echo "Command '$command $*' started in the background with PID $pid."
        echo "Output is being logged to $log_file."

        # Optionally: Save the PID for later use
        echo "$pid" > "/tmp/forever_${command}_${pid}.pid"
    else
        echo "Command '$command' not found. Not executed."
        return 1
    fi
}

# -------------------------------------------------------------- // MAKE_DIR_&_CD:
function mkcd() {
    if (( $# != 1 )); then
        echo 'Usage: mkcd <new-directory>'
        return 1
    fi

    local dir="$1"

    # Check if the directory is a valid path
    if [[ -z "$dir" ]]; then
        echo "Error: Directory name cannot be empty."
        return 1
    fi

    # Attempt to create the directory if it doesn't exist
    if [[ ! -d "$dir" ]]; then
        if mkdir -p "$dir"; then
            echo "Directory '$dir' created."
        else
            echo "Failed to create directory '$dir'."
            return 1
        fi
    else
        echo "Directory '$dir' already exists."
    fi

    # Change into the directory, with error checking
    if cd "$dir"; then
        echo "Switched to directory '$dir'."
    else
        echo "Failed to switch to directory '$dir'."
        return 1
    fi
}

# ---------------------------------------------------------- // MAKE_TMP_DIR_&_CD:
function cdt() {
    local tmp_dir

    if tmp_dir=$(mktemp -d 2>/dev/null); then
        echo "Created and switching to temporary directory: $tmp_dir"
        cd "$tmp_dir"
    else
        echo "Failed to create a temporary directory."
        return 1
    fi

    pwd
}

# -------------------------------------------------------------------- // NOTEPAD:
function notepad() {
    local file="$HOME/Documents/notes/.notes"
    mkdir -p "$(dirname "$file")"  # Ensure the directory exists
    [[ -f $file ]] || touch "$file"

    show_help() {
        cat << EOF
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
                echo "All notes cleared."
                ;;
            -r)
                if [[ -z "$2" || ! "$2" =~ ^[0-9]+$ ]]; then
                    echo "Invalid or missing argument for -r option. Defaulting to 10."
                    local recent_count=10
                else
                    local recent_count="$2"
                fi
                tail -n "$recent_count" "$file"
                ;;
            -f)
                if [[ -z "$2" || ! "$2" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
                    echo "Usage: notepad -f <YYYY-MM-DD>"
                    return 1
                fi
                grep "\[$2" "$file" || echo "No notes found for $2."
                ;;
            -h)
                show_help
                ;;
            --)
                shift
                ;;
            -*)
                echo "Invalid option: $1"
                show_help
                return 1
                ;;
        esac
    else
        cat "$file"
    fi

    if [[ $# -gt 0 && "$1" != "-"* ]]; then
        local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
        printf "[%s] %s\n" "$timestamp" "$*" >> "$file"
        echo "Note added."
    fi
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
