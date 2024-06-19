#File: $USER/.config/shellz/functions/functions.zsh
#Author: 4ndr0666
#Edited: 4-10-2024
#
# --- // 4ndr0666 FUNCTIONS.ZSH // ========


# ------------------------------------------------------ // RESET_WAYBAR:
restart_waybar() {
	killall -9 waybar $> /dev/null
	waybar </dev/null &>/dev/null &
}

# -------------------------------------------------------------- // RESET_PERMISSIONS:
function reset_permissions() {
    # Define the directories to be updated
    local dirs=(
        "/boot"
        "/dev"
        "/etc"
        "/home"
        "/media"
        "/mnt"
        "/opt"
        "/proc"
        "/root"
        "/run"
        "/srv"
        "/sys"
        "/tmp"
        "/usr"
        "/var"
    )

    # Set the base permissions for the main directories
    sudo chmod 755 "${dirs[@]}"

    # Set specific permissions for /tmp and /var/tmp
    sudo chmod 1777 /tmp /var/tmp

    # Use zsh globbing to refine permissions within directories
    for dir in "${dirs[@]}"; do
        if [[ -d $dir ]]; then
            # Set appropriate permissions for subdirectories
            sudo chmod 755 "$dir"/*(/)
            # Set appropriate permissions for files
            sudo chmod 644 "$dir"/*(.^x)
            # Set appropriate permissions for executable files
            sudo chmod 755 "$dir"/*(.x)
        fi
    done
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
    # Check if a process name was provided
    if [[ -z $1 ]]; then
        echo "Usage: any <process name>"
        return 1
    fi

    # Use pgrep to find processes and filter out the grep command itself
    local processes
    processes=$(pgrep -fl "$1" | grep -v grep)

    # Check if any processes were found
    if [[ -z $processes ]]; then
        echo "No running processes found for '$1'."
        return 1
    fi

    # Print the found processes
    echo "Running processes for '$1':"
    echo "$processes"
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
    if [[ ! -r /proc/1/maps ]]; then
        echo "Auto-escalating for dir access of /proc/1/maps."
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

    # Use parallel to speed up the process
    for file in $(sed -ne 's:.* /:/:p' /proc/[0-9]*/maps | sort -u | grep -v '^/dev/'); do
        $cmd_prefix cat "$file" > /dev/null && ((file_count++)) || echo "Failed to access $file" >> error.log
    done

    echo "Accessed $file_count files from mappings..."
    sleep 2
    echo 'Refreshing swap spaces...'
    sleep 2
    if $cmd_prefix swapoff -a && $cmd_prefix swapon -a; then
        echo "Swap spaces refreshed!"
    else
        echo "Failed to refresh swap spaces" >> error.log
    fi
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
                    (( $+opts[verbose] )) && echo "Copying $file"
                    cp -a "$file" "${file}_${current_date}"
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

    # Check if a URL was provided
    if [[ -z $1 ]]; then
        echo "Usage: turl <URL>"
        return 1
    fi

    local url="$1"
    local response

    # Use curl to post the URL to cleanuri.com's API
    response=$(curl -sS --header "Content-Type: application/x-www-form-urlencoded" \
                    --request POST \
                    --data-urlencode "url=$url" \
                    "https://cleanuri.com/api/v1/shorten")

    # Parse the response to extract the short URL
    local shortUrl=$(echo $response | grep -Po '"result_url":"\K[^"]+')

    # Check if a short URL was received
    if [[ -n $shortUrl ]]; then
        echo "Short URL: $shortUrl"
    else
        echo "Error: Failed to shorten URL."
        return 1
    fi
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

    echo "$packages"

    # Copy the formatted list back to the clipboard for user reference
    if command -v xclip &>/dev/null; then
        echo "$packages" | xclip -selection c
    elif command -v wl-copy &>/dev/null; then
        echo "$packages" | wl-copy
    fi

    # Automatically pass the package list to paru for installation
    echo "Passing the package list to paru for installation..."
    paru -S --needed $packages
}

#-------------------------------------------------------- // FIXGPGKEY:
function fixgpgkey() {
    local gpg_conf="$HOME/.gnupg/gpg.conf"
    local keyring_entry="keyring /etc/pacman.d/gnupg/pubring.gpg"

    echo "Adding keyring entry to GPG configuration..."

    # Check if the keyring entry already exists in gpg.conf
    if ! grep -qF "$keyring_entry" "$gpg_conf"; then
        echo "$keyring_entry" >> "$gpg_conf"
        echo "Keyring entry added to $gpg_conf."
    else
        echo "Keyring entry already exists in $gpg_conf."
    fi

    echo "Populating the pacman keyring..."
    sudo pacman-key --populate archlinux
}

# ------------------------------------------------ // WHATSNEW:
function whatsnew() {
    echo "Listing the 10 most recently modified files across the entire system:"

    # Using Zsh globbing to find and list the 10 most recently modified files
    sudo zsh -c 'print -rl -- /**/*(.om[1,10])' 2>/dev/null
}

# ------------------------------------------------------------ // FINDIT:
validate() {
    command=$1
    echo "Running: $command"
    eval $command
    if [ $? -ne 0 ]; then
        echo "Error: Command failed - $command"
        exit 1
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
            sudo ln -s $(which fdfind) /usr/local/bin/fd  # For compatibility
        else
            echo "Unsupported package manager. Please install 'fd' manually."
            exit 1
        fi
    fi
}

# Main find function
function findit() {
    local choice query search_type search_dir fd_command

    # Check and install necessary tools
    check_install_fd

    echo "Do you want to find a file (f) or a directory (d)?"
    read -r choice

    case $choice in
        f)
            search_type="file"
            ;;
        d)
            search_type="directory"
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

    if [[ $search_type == "file" ]]; then
        fd_command="fd --type f '$query' '$search_dir' $include_hidden $case_sensitive $absolute_paths $max_depth $min_depth $list_details"
    else
        fd_command="fd --type d '$query' '$search_dir' $include_hidden $case_sensitive $absolute_paths $max_depth $min_depth $list_details"
    fi

    echo "Executing: $fd_command"
    if [[ $EUID -ne 0 && $search_dir == /* && ! -w $search_dir ]]; then
        sudo bash -c "$fd_command"
    else
        eval $fd_command
    fi
}


# -------------------------------------------------------- // SYSTEMD_COMPLETIONS:
# Define user commands
user_commands=(
  cat get-default help is-active is-enabled is-failed is-system-running
  list-dependencies list-jobs list-sockets list-timers list-unit-files
  list-units show show-environment status
)

# Define sudo commands
sudo_commands=(
  add-requires add-wants cancel daemon-reexec daemon-reload default disable
  edit emergency enable halt import-environment isolate kexec kill link
  list-machines load mask preset preset-all reenable reload reload-or-restart
  reset-failed rescue restart revert set-default set-environment set-property
  start stop switch-root try-reload-or-restart try-restart unmask unset-environment
)

# Define power commands
power_commands=(
  hibernate hybrid-sleep poweroff reboot suspend
)

# Create aliases for user commands
for cmd in "${user_commands[@]}"; do
  alias "sc-$cmd"="systemctl $cmd"
  alias "scu-$cmd"="systemctl --user $cmd"
done

# Create aliases for sudo commands
for cmd in "${sudo_commands[@]}"; do
  alias "sc-$cmd"="sudo systemctl $cmd"
  alias "scu-$cmd"="systemctl --user $cmd"
done

# Create aliases for power commands
for cmd in "${power_commands[@]}"; do
  alias "sc-$cmd"="systemctl $cmd"
done

# Unset temporary variables to avoid polluting the environment
unset cmd user_commands sudo_commands power_commands

# Additional utility aliases
alias sc-enable-now="sc-enable --now"
alias sc-disable-now="sc-disable --now"
alias sc-mask-now="sc-mask --now"
alias scu-enable-now="scu-enable --now"
alias scu-disable-now="scu-disable --now"
alias scu-mask-now="scu-mask --now"
alias scu-failed='systemctl --user --failed'
alias sc-failed='systemctl --failed'

# Function to provide systemd prompt information
function systemd_prompt_info {
  local unit
  for unit in "$@"; do
    echo -n "$ZSH_THEME_SYSTEMD_PROMPT_PREFIX"

    # Convert unit to uppercase if needed
    if [[ -n "$ZSH_THEME_SYSTEMD_PROMPT_CAPS" ]]; then
      echo -n "${(U)unit:gs/%/%%}:"
    else
      echo -n "${unit:gs/%/%%}:"
    fi

    # Check if the unit is active
    if systemctl is-active "$unit" &>/dev/null; then
      echo -n "$ZSH_THEME_SYSTEMD_PROMPT_ACTIVE"
    elif systemctl --user is-active "$unit" &>/dev/null; then
      echo -n "$ZSH_THEME_SYSTEMD_PROMPT_ACTIVE"
    else
      echo -n "$ZSH_THEME_SYSTEMD_PROMPT_NOTACTIVE"
    fi

    echo -n "$ZSH_THEME_SYSTEMD_PROMPT_SUFFIX"
  done
}

# --------------------------------------------------- // ENHANCED_COPY:
# Ensure the 'copy' alias is removed if it exists
if alias copy &>/dev/null; then
    unalias copy
fi

# Function to ensure xhost permission
function ensure_xhost_permission() {
    if ! xhost | grep -q "SI:localuser:$(whoami)"; then
        xhost +SI:localuser:$(whoami) >/dev/null
    fi
}

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
        ensure_xhost_permission
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
        sudo pacman -Rdd "${recent_packages[@]}"
        echo "Packages removed with 'pacman -Rdd'. Orphaned dependencies are not removed."
    else
        echo "Primary removal canceled."
    fi

    read -q "response?Do you want to remove unneeded dependencies with 'pacman -Rns'? [y/N]: "
    echo
    if [[ "$response" =~ ^[Yy]$ ]]; then
        local orphans=("${(@f)$(pacman -Qdtq)}")
        if (( ${#orphans[@]} > 0 )); then
            echo "Removing unneeded dependencies..."
            sudo pacman -Rns "${orphans[@]}"
            echo "Unneeded dependencies removed."
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
    local output_file="${2:-output.mp4}"
    local quality="${3:-18}"  # Default quality set to 18, can be adjusted by the user

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

    # Using FFmpeg to downscale or fit the video into 1920x1080 resolution
    # with padding if necessary, keeping the original aspect ratio.
    # Improvements:
    # - Allows user to specify quality.
    # - 'veryslow' preset for the best compression efficiency at the cost of speed.
    echo "Starting downscale process..."
    ffmpeg -i "$input_file" \
           -vf "scale=1920x1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
           -c:v libx264 -crf "$quality" -preset veryslow "$output_file"

    # Check if FFmpeg command was successful
    if [[ $? -eq 0 ]]; then
        echo "Downscale complete. Output saved to '$output_file'."
    else
        echo "Error: Downscale process failed."
        return 1
    fi
}

# ----------------------------------------------------- // MEMORY_MONITOR_SERVICE:
function memservice() {
  set -e
  echo "Reloading systemctl daemon..."
  sudo systemctl daemon-reload
  echo "Enabling memory_monitor..."
  sudo systemctl enable memory_monitor.service
  sudo systemctl start memory_monitor.service
  echo "Enabling freecache.path..."
  sudo systemctl enable freecache.path
  sudo systemctl start freecache.path
  echo "Memory_monitor and freecache services are reloaded."
  set +e
}

# ----------------------------------------------------------- // OPTIMIZE_PACMAN:
function pacopt() {
    echo "Optimizing Pacman"
    echo "In 3..."
    sleep 1
    echo "..2"
    sleep 1
    echo ".1"
    sleep 1

    echo "Updating mlocate database..."
    if sudo updatedb; then
        echo "✔️ mlocate database updated."
    else
        echo "❌ Failed to update mlocate database."
    fi

    echo "Updating pkgfile database..."
    if sudo pkgfile -u; then
        echo "✔️ pkgfile database updated."
    else
        echo "❌ Failed to update pkgfile database."
    fi

    echo "Upgrading pacman database..."
    if sudo pacman-db-upgrade; then
        echo "✔️ pacman database upgraded."
    else
        echo "❌ Failed to upgrade pacman database."
    fi

    echo "Cleaning package cache..."
    if yes | sudo pacman -Sc; then
        echo "✔️ Package cache cleaned."
    else
        echo "❌ Failed to clean package cache."
    fi

    echo "Syncing filesystem changes..."
    if sync; then
        echo "✔️ Filesystem changes synced."
    else
        echo "❌ Failed to sync filesystem changes."
    fi

    echo "Refreshing keys..."
    if sudo pacman-key --refresh-keys; then
        echo "✔️ Keys refreshed."
    else
        echo "❌ Failed to refresh keys."
    fi

    echo "Populating keys and updating trust..."
    if sudo pacman-key --populate && sudo pacman-key --updatedb; then
        echo "✔️ Keys populated and trust updated."
    else
        echo "❌ Failed to populate keys and update trust."
    fi

    echo "Refreshing package list..."
    if sudo pacman -Syy; then
        echo "✔️ Package list refreshed."
    else
        echo "❌ Failed to refresh package list."
    fi

    echo "Pacman optimized!"
}

# ---------- ------------------------------------------------------- // Cd and ls:
function cl() {
    emulate -L zsh

    if [[ -z $1 ]]; then
        echo "Usage: cl <directory>"
        return 1
    fi

    if [[ ! -d $1 ]]; then
        echo "Error: Directory '$1' does not exist."
        return 1
    fi

    cd "$1" && ls -lah
}

# ------------------------------------------------------------- // SEARCH_HISTORY:
function whatwhen() {
    emulate -L zsh
    local usage help ident format_l format_s first_char remain first last
    usage='USAGE: whatwhen [options] <searchstring> <search range>'
    help='Use `whatwhen -h` for further explanations.'
    ident=${(l,${#${:-Usage: }},, ,)}
    format_l="${ident}%s\t\t\t%s\n"
    format_s="${format_l//(\\t)##/\\t}"
    # Make the first char of the word to search for case
    # insensitive; e.g. [aA]
    first_char=[${(L)1[1]}${(U)1[1]}]
    remain=${1[2,-1]}
    # Default search range is `-100'.
    first=${2:-\-100}
    # Optional, just used for `<first> <last>' given.
    last=$3

    case $1 in
        ("")
            echo "ERROR: No search string specified. Aborting."
            echo "$usage"
            echo "$help"
            return 1
            ;;
        (-h)
            echo "$usage"
            echo "OPTIONS:"
            printf "$format_l" '-h' 'show help text'
            echo "SEARCH RANGE:"
            printf "$format_l" "'0'" 'the whole history'
            printf "$format_l" "'-<n>'" 'offset to the current history number (default: -100)'
            printf "$format_s" "'<[-]first> [<last>]'" 'search within a given range'
            echo "EXAMPLES:"
            printf "$format_l" 'whatwhen grml' '# Range is set to -100 by default.'
            printf "$format_l" 'whatwhen zsh -250'
            printf "$format_l" 'whatwhen foo 1 99'
            ;;
        (\?)
            echo "$usage"
            echo "$help"
            return 1
            ;;
        (*)
            # -l list results on stdout rather than invoking $EDITOR.
            # -i Print dates as in YYYY-MM-DD.
            # -m Search for a - quoted - pattern within the history.
            fc -li -m "*${first_char}${remain}*" $first $last
            ;;
    esac
}
# ------------------------------ // LIST_FILES_RECENTLY_ACCESSED,CHANGED,MOD_BY:
function accessed() {
    emulate -L zsh
    local time_range=${1:-1}
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: accessed [time_range_in_days]"
        return 1
    fi
    echo "Listing files accessed in the last $time_range days:"
    print -l -- *(a-$time_range)
}

function changed() {
    emulate -L zsh
    local time_range=${1:-1}
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: changed [time_range_in_days]"
        return 1
    fi
    echo "Listing files changed in the last $time_range days:"
    print -l -- *(c-$time_range)
}

function modified() {
    emulate -L zsh
    local time_range=${1:-1}
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "Usage: modified [time_range_in_days]"
        return 1
    fi
    echo "Listing files modified in the last $time_range days:"
    print -l -- *(m-$time_range)
}


# ---------------------------------------------------------- // RUN_IN_BACKGROUND:
function 4everr() {
    if [[ -z "$1" ]]; then
        echo "Usage: 4everr <command> [arguments] [log_file]"
        return 1
    fi

    if command -v "$1" >/dev/null 2>&1; then
        local log_file="${@: -1}"  # Assume last argument is the log file if it's a valid path
        [[ ! -f "$log_file" ]] && log_file="/dev/null"

        # Remove the log file argument if it's not a command argument
        if [[ "$log_file" != "/dev/null" ]]; then
            set -- "${@:1:$(($#-1))}"
        fi

        # Starting the command in the background with nohup
        nohup "$@" &> "$log_file" &
        local pid=$!
        echo "Command '$*' started in the background with PID $pid. Logging to $log_file."

        # Optionally: Save the PID for later use
        echo "$pid" > "/tmp/forever_$pid.pid"
    else
        echo "Command '$1' not found. Not executed."
    fi
}

# -------------------------------------------------------------- // MAKE_DIR_&_CD:
function mkcd() {
    if (( $# != 1 )); then
        echo 'Usage: mkcd <new-directory>'
        return 1
    fi

    local dir="$1"

    if [[ ! -d "$dir" ]]; then
        if mkdir -p "$dir"; then
            echo "Directory '$dir' created and switching to it."
        else
            echo "Failed to create directory '$dir'."
            return 1
        fi
    else
        echo "Directory '$dir' already exists. Switching to it."
    fi

    cd "$dir"
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
                grep "\[$2" "$file"
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
    fi
}

# -------------------------------------------------------------- // TRIM_A_VIDEO:
function trim() {
    local input_file="$1"
    local output_file="${4:-trimmed_output.mp4}"

    # Enhanced usage instructions
    if [[ -z "$input_file" || "$1" == "-h" || "$1" == "--help" ]]; then
        echo "Usage: trim <input_file> [start_time] [end_time] [output_file]"
        echo "Format for times: HH:MM:SS or SS. Output file is optional."
        return 1
    fi

    # Validate input file
    if [[ ! -f "$input_file" ]]; then
        echo "Input file does not exist: $input_file"
        return 1
    fi

    # Retrieve and format the duration of the video
    if ! command -v ffprobe &>/dev/null; then
        echo "ffprobe could not be found. Please install it first."
        return 1
    fi

    local duration
    duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$input_file")

    if [[ $? -ne 0 ]]; then
        echo "Failed to retrieve the length of the video: $input_file"
        return 1
    fi

    # Function to convert duration to seconds
    convert_to_seconds() {
        local time=$1
        local IFS=:; local time_array=($time)
        echo "$((10#${time_array[0]}*3600 + 10#${time_array[1]}*60 + 10#${time_array[2]%.*}))"
    }

    # Generate time list for selection
    local start_time end_time times=()
    local total_seconds
    total_seconds=$(echo "$duration/1" | bc) # Convert duration to integer seconds

    for ((i = 0; i <= total_seconds; i += 10)); do
        times+=($(date -u -d @"$i" +%H:%M:%S))
    done

    # Select start time using fzf
    start_time=$(printf '%s\n' "${times[@]}" | fzf --prompt="Select start time: ")

    # Select end time using fzf
    end_time=$(printf '%s\n' "${times[@]}" | fzf --prompt="Select end time: ")

    # Ensure start_time and end_time are not empty
    if [[ -z "$start_time" || -z "$end_time" ]]; then
        echo "Start time or end time cannot be empty."
        return 1
    fi

    # Validate time format
    if [[ ! "$start_time" =~ ^([0-9]{2}:)?[0-5]?[0-9]:[0-5][0-9]$ ]]; then
        echo "Invalid start time format: $start_time"
        return 1
    fi

    if [[ ! "$end_time" =~ ^([0-9]{2}:)?[0-5]?[0-9]:[0-5][0-9]$ ]]; then
        echo "Invalid end time format: $end_time"
        return 1
    fi

    # Execute FFmpeg command
    if ffmpeg -hide_banner -i "$input_file" -ss "$start_time" -to "$end_time" -c copy "$output_file"; then
        echo "Video trimmed successfully: $output_file"
    else
        echo "Error occurred during video trimming."
        return 1
    fi
}

# --------------------------------------------------------------- // DECODE_URLS:
urldecode() {
    echo "$@" | awk '{gsub(/%([0-9A-Fa-f]{2})/, "\\x\\1"); print}' | xargs -0 echo -e
}

# ------------------------------------------------------------- // TERMBIN:
termbin() {
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

    nc termbin.com 9999 < "$1"
}
