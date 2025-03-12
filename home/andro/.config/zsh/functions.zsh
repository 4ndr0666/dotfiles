#!/usr/bin/env zsh
# Author: 4ndr0666

# ===================================== // FUNCTIONS.ZSH //

## Constants

RESET="\e[0m"
BOLD="\e[1m"
UNDERLINE="\e[4m"
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
MAGENTA="\e[35m"
CYAN="\e[36m"
INFO="ℹ️"
SUCCESS="✅"
WARNING="⚠️"
ERROR="❌"
DELETE_ICON="🗑️"
COPY_ICON="📋"
MOVE_ICON="🚚"
COMPRESS_ICON="📦"

## BKUP

### Description: A smart and configurable backup function.
### Example Configuration File (~/.bkup_config):
### Uncomment and set the desired backup directory.
### BACKUP_DIR="$HOME/my_custom_backups"
print_message() {
    local type="$1"
    local message="$2"
    case "$type" in
        INFO)
            echo -e "${CYAN}${INFO} ${message}${RESET}"
            ;;
        SUCCESS)
            echo -e "${GREEN}${SUCCESS} ${message}${RESET}"
            ;;
        WARNING)
            echo -e "${YELLOW}${WARNING} ${message}${RESET}"
            ;;
        ERROR)
            echo -e "${RED}${ERROR} ${message}${RESET}"
            ;;
        *)
            echo -e "${RESET}${message}${RESET}"
            ;;
    esac
}

display_menu() {
    echo -e "${BOLD}${UNDERLINE}Backup Utility Menu${RESET}"
    echo "1. Create a Backup"
    echo "2. Move to Backup"
    echo "3. Remove Backups"
    echo "4. Set Backup Directory"
    echo "5. Exit"
}

check_dependencies() {
    local dependencies=(tar zstd fzf)
    for cmd in "${dependencies[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            print_message "ERROR" "Dependency '$cmd' is not installed. Please install it and try again."
            return 1
        fi
    done
    return 0
}

load_config() {
    local config_file="$HOME/.config/bkup/.bkup_config"
    if [[ -f "$config_file" ]]; then
        source "$config_file"
    else
        # Default backup directory
        BACKUP_DIR="$PWD/bkup"
    fi
}

set_backup_dir() {
    read -rp "Enter the path for the backup directory: " new_dir
    if [[ -z "$new_dir" ]]; then
        print_message "WARNING" "Backup directory path cannot be empty."
        return
    fi
    mkdir -p "$new_dir" && echo "BACKUP_DIR=\"$new_dir\"" > "$HOME/.config/bkup/.bkup_config"
    if [[ $? -eq 0 ]]; then
        print_message "SUCCESS" "Backup directory set to '$new_dir'."
    else
        print_message "ERROR" "Failed to set backup directory."
    fi
}

perform_backup_move() {
    local mode="$1"  # copy or move
    shift
    local targets=("$@")

    if [[ ${#targets[@]} -eq 0 ]]; then
        print_message "ERROR" "No target files or directories specified."
        return 1
    fi

    mkdir -p "$BACKUP_DIR"

    for target in "${targets[@]}"; do
        if [[ ! -e "$target" ]]; then
            print_message "WARNING" "File or directory '$target' does not exist. Skipping."
            continue
        fi

        local base_name
        base_name=$(basename "$target")
        local current_date
        current_date=$(date -u "+%Y%m%dT%H%M%SZ")
        local backup_name="${base_name}_${current_date}.tar.zst"
        local backup_path="${BACKUP_DIR}/${backup_name}"

        if [[ -e "$backup_path" ]]; then
            print_message "WARNING" "Backup '$backup_name' already exists. Skipping."
            continue
        fi

        ## Interactive exclusion using fzf
        local exclude_list=()
        if [[ -d "$target" ]]; then
            print_message "INFO" "Select files/directories to exclude from '$target':"
            mapfile -t exclude_list < <(find "$target" -mindepth 1 -maxdepth 1 | fzf -m --prompt="Exclude: " --height=40% --border)
        fi

        ## Construct tar exclude options
        local exclude_opts=()
        for exclude in "${exclude_list[@]}"; do
            local relative_path
            relative_path=$(realpath --relative-to="$target" "$exclude")
            exclude_opts+=("--exclude=$relative_path")
        done

        ## Create compressed archive using tar with zstd
        if [[ "$mode" == "copy" ]]; then
            print_message "INFO" "${COPY_ICON} Creating backup for '$target'..."
        else
            print_message "INFO" "${MOVE_ICON} Moving '$target' to backup..."
        fi

        tar -I zstd "${exclude_opts[@]}" -cf "$backup_path" -C "$(dirname "$target")" "$(basename "$target")" &> /dev/null
        if [[ $? -eq 0 ]]; then
            print_message "SUCCESS" "Backup created at '$backup_path'."
            if [[ "$mode" == "move" ]]; then
                rm -rf "$target"
                if [[ $? -eq 0 ]]; then
                    print_message "SUCCESS" "Original '$target' moved to backup."
                else
                    print_message "ERROR" "Failed to remove original '$target' after moving."
                fi
            fi
        else
            print_message "ERROR" "Failed to create backup for '$target'."
            rm -f "$backup_path"
        fi
    done
}

remove_backups() {
    local remove_all=false
    local verbose=false

    ## Parse options
    while getopts "av" opt; do
        case "${opt}" in
            a) remove_all=true ;;
            v) verbose=true ;;
            *) ;;
        esac
    done
    shift $((OPTIND -1))

    mkdir -p "$BACKUP_DIR"

    if [[ "$remove_all" == true ]]; then
        print_message "WARNING" "Are you sure you want to remove ALL backups in '$BACKUP_DIR'? (y/N)"
        read -r confirmation
        if [[ "$confirmation" =~ ^[Yy]$ ]]; then
            rm -rf "${BACKUP_DIR:?}/"*
            if [[ $? -eq 0 ]]; then
                print_message "SUCCESS" "All backups have been removed from '$BACKUP_DIR'."
            else
                print_message "ERROR" "Failed to remove all backups from '$BACKUP_DIR'."
            fi
        else
            print_message "INFO" "Operation cancelled."
        fi
    else
        if [[ $# -lt 1 ]]; then
            print_message "ERROR" "No specific backups specified for removal."
            return 1
        fi
        for target in "$@"; do
            local base_name
            base_name=$(basename "$target")
            local backup_pattern="${BACKUP_DIR}/${base_name}_*.tar.zst"
            local matches=($(ls $backup_pattern 2>/dev/null))
            if [[ ${#matches[@]} -eq 0 ]]; then
                [[ "$verbose" == true ]] && print_message "WARNING" "No backups found for '$target'."
                continue
            fi
            for backup in "${matches[@]}"; do
                rm -f "$backup"
                if [[ $? -eq 0 ]]; then
                    print_message "SUCCESS" "Removed backup '$backup'."
                else
                    print_message "ERROR" "Failed to remove backup '$backup'."
                fi
            done
        done
    fi
}

bkup() {
    ## Check for required dependencies
    check_dependencies || return 1

    ## Load configuration
    load_config

    ## If no arguments, display menu
    if [[ $# -eq 0 ]]; then
        while true; do
            display_menu
            echo -n "Select an option [1-5]: "
            read -r choice
            case "$choice" in
                1)
                    print_message "INFO" "Enter files or directories to backup (separated by space):"
                    read -ra targets
                    perform_backup_move "copy" "${targets[@]}"
                    ;;
                2)
                    print_message "INFO" "Enter files or directories to move to backup (separated by space):"
                    read -ra targets
                    perform_backup_move "move" "${targets[@]}"
                    ;;
                3)
                    echo -e "${BOLD}Remove Backups:${RESET}"
                    echo "a. Remove all backups"
                    echo "b. Remove specific backups"
                    read -rp "Choose an option [a/b]: " remove_choice
                    case "$remove_choice" in
                        a|A)
                            remove_backups -a -v
                            ;;
                        b|B)
                            print_message "INFO" "Enter the base names of backups to remove (separated by space):"
                            read -ra remove_targets
                            remove_backups -v "${remove_targets[@]}"
                            ;;
                        *)
                            print_message "WARNING" "Invalid choice. Returning to main menu."
                            ;;
                    esac
                    ;;
                4)
                    set_backup_dir
                    ;;
                5)
                    print_message "INFO" "Exiting Backup Utility. Goodbye!"
                    break
                    ;;
                *)
                    print_message "WARNING" "Invalid option. Please select a number between 1 and 5."
                    ;;
            esac
            echo ""
        done
        return 0
    fi

    ## Parse options using getopts
    local mode="copy"  # default mode
    local remove_all=false
    local verbose=false
    local compress=true
    local show_help=false

    while getopts "hcmravz" opt; do
        case "${opt}" in
            h) show_help=true ;;
            c) mode="copy" ;;
            m) mode="move" ;;
            r) mode="remove" ;;
            a) remove_all=true ;;
            v) verbose=true ;;
            z) compress=true ;;
            *) show_help=true ;;
        esac
    done
    shift $((OPTIND -1))

    ## Show help if -h option is present or if no arguments are provided (for copy/move)
    if [[ "$show_help" == true || ( "$mode" != "remove" && $# -lt 1 ) ]]; then
        cat <<EOF
${BOLD}bkup [OPTIONS] FILE_OR_DIR [FILE_OR_DIR ...]${RESET}

Backup, move, compress, or remove backups of specified files or directories.

${UNDERLINE}Options:${RESET}
  -h    Display this help text.
  -c    Create a backup (default).
  -m    Move the file/folder to backup after archiving.
  -r    Remove backups of the specified file or directory.
  -a    Remove all backups in the backup directory (used with -r).
  -v    Enable verbose output.
  -z    Enable compression (default).

${UNDERLINE}Usage Examples:${RESET}
  ${COPY_ICON} Backup a directory with interactive exclusion:
    bkup -c /path/to/dir

  ${MOVE_ICON} Move a file to backup with interactive exclusion:
    bkup -m /path/to/file

  ${DELETE_ICON} Remove all backups verbosely:
    bkup -r -a -v

  ${INFO} Display help:
    bkup -h
EOF
        return 0
    fi

    ## Operation based on mode
    case "$mode" in
        copy|move)
            perform_backup_move "$mode" "$@"
            ;;
        remove)
            remove_backups "$@"
            ;;
        *)
            print_message "ERROR" "Invalid mode selected."
            ;;
    esac

    return 0
}

## FZF Based Packge Install and Remove

### Leverages Fzf offering installation `in` and removal `re`
### of installed packages.
function in() {
    yay -Slq | fzf -q "$1" -m --preview 'yay -Si {1}'| xargs -ro yay -S
}
function re() {
    yay -Qq | fzf -q "$1" -m --preview 'yay -Qi {1}' | xargs -ro yay -Rns
}

## Fkill

### Leverages Fzf offering a list of processes to kill
fkill() {
    local pid
    if [ "$UID" != "0" ]; then
        pid=$(ps -f -u $UID | sed 1d | fzf -m | awk '{print $2}')
    else
        pid=$(ps -ef | sed 1d | fzf -m | awk '{print $2}')
    fi

    if [ "x$pid" != "x" ]
    then
        echo $pid | xargs kill -${1:-9}
    fi
}

## Browser History

### Press `c` to browse Chromes web history
chromeh() {
  local cols sep google_history open
  cols=$(( COLUMNS / 3 ))
  sep='{::}'

    google_history="$HOME/.config/google-chrome/Default/History"
    open=xdg-open
  cp -f "$google_history" /tmp/h
  sqlite3 -separator $sep /tmp/h \
    "select substr(title, 1, $cols), url
     from urls order by last_visit_time desc" |
  awk -F $sep '{printf "%-'$cols's  \x1b[36m%s\x1b[m\n", $1, $2}' |
  fzf --ansi --multi | sed 's#.*\(https*://\)#\1#' | xargs $open > /dev/null 2> /dev/null
}

## Copypath

### Copies the absolute path of a file or directory to the clipboard.
copypath() {
    # If no argument passed, use current directory
    local file="${1:-.}"

    # If argument is not an absolute path, prepend $PWD
    [[ $file = /* ]] || file="$PWD/$file"

    # Copy the absolute path without resolving symlinks
    if print -n "${file:a}" | wl-copy; then
        echo "%B${file:a}%b copied to clipboard."
    else
        echo "❌ Failed to copy the path to the clipboard."
        return 1
    fi
}

##  Spellcheck

### Checks the spelling of provided words using the 'spellcheck' command.
spell() {
    ## Ensure 'spellcheck' command is available
    if ! command -v spellcheck &> /dev/null; then
        echo "❌ Error: 'spellcheck' command not found. Please ensure it is located in ~/.local/bin."
        return 1
    fi

    ## Check if at least one argument is provided
    if [ $# -eq 0 ]; then
        echo "❓ Usage: spell <word1> [word2]..."
        return 1
    fi

    ## Iterate over each word and perform spell check
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

## Restart Waybar

restart_waybar() {
    notify-send "🔄 Restarting Waybar..."
    pkill -TERM waybar
    sleep 1

    ## Check if Waybar is still running, force kill if necessary
    if pgrep waybar &>/dev/null; then
        pkill -9 waybar
        sleep 1
    fi

    ## Restart Waybar without attaching to the current terminal
    waybar </dev/null &>/dev/null &
    echo "✅ Waybar has been restarted."
}


## Any

### Searches for running processes matching a given name with
### optional case-insensitivity.
any() {
    ## Function to display help
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

    local case_insensitive=false

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

    if [[ -z $1 ]]; then
        echo "❌ Error: No process name provided."
        show_help
        return 1
    fi

    local process_name="$1"

    local processes
    if [[ $case_insensitive == true ]]; then
        ## Case-insensitive search
        processes=$(pgrep -ifl "$process_name")
    else
        ## Case-sensitive search
        processes=$(pgrep -fl "$process_name")
    fi

    if [[ -z $processes ]]; then
        echo "ℹ️ No running processes found for '$process_name'."
        return 0
    fi

    echo "🔍 Running processes matching '$process_name':"
    echo "--------------------------------------------"
    echo "$processes" | awk '{printf "PID: %-8s CMD: %s\n", $1, $2}'
}

## Sysboost

### Optimizes system resources by resetting failed units, cleaning sockets,
### removing broken links, killing zombie processes, reloading daemons,
### vacuuming logs, and cleaning temporary files.
sysboost() {
    # Ensure the function exits on error
    set -e

    ## Log message with delay
    log_and_wait() {
        local message="$1"
        local delay="${2:-2}"
        echo "$message"
        sleep "$delay"
    }

    log_and_wait "🔄 Optimizing resources in 3 seconds."
    log_and_wait "3..."
    log_and_wait "2.."
    log_and_wait "1"

    if command -v systemctl &> /dev/null; then
        log_and_wait "🔄 Resetting all failed SystemD units..."
        systemctl reset-failed || true
    else
        log_and_wait "⚠️ systemctl not found, skipping reset of failed units."
    fi

    if command -v dbus-cleanup-sockets &> /dev/null; then
        log_and_wait "🔄 Clearing unnecessary D-Bus sockets..."
        sudo dbus-cleanup-sockets
    else
        log_and_wait "⚠️ dbus-cleanup-sockets not found, skipping cleanup."
    fi

    log_and_wait "🔄 Removing broken SystemD symbolic links..."
    if ! sudo find -L /etc/systemd/ -type l -delete; then
        log_and_wait "⚠️ Unable to search SystemD for broken links."
    fi

    if command -v zps &> /dev/null; then
        log_and_wait "🔄 Killing all zombie processes..."
        sudo zps -r --quiet
    else
        log_and_wait "⚠️ zps not found. Install it using 'sudo pacman -S zps --noconfirm'. Skipping zombie kill."
    fi

    if command -v systemctl &> /dev/null; then
        log_and_wait "🔄 Reloading system daemon..."
        sudo systemctl daemon-reload
    else
        log_and_wait "⚠️ systemctl not found, skipping daemon reload."
    fi

    if command -v journalctl &> /dev/null; then
        log_and_wait "🔄 Removing logs older than 2 days..."
        sudo journalctl --vacuum-time=2d
    else
        log_and_wait "⚠️ journalctl not found, skipping log cleanup."
    fi

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
    set +e
}

## Swapboost and Fullboost

### Safely refreshes swap spaces and scans file mappings for `swapboost`
### Use `fullboost` for a more aggressive approach and drop caches.
swapboost() {
    local log_file="/tmp/swapboost_log.txt"
    echo "📝 Logging to $log_file"
    echo "🔄 Optimizing swap spaces and caches at $(date)" > "$log_file"

    echo "🔄 Dropping caches..." | tee -a "$log_file"
    drop_caches >> "$log_file"
    sleep 2

#    echo "🔍 Scanning accessible file mappings..."
#    sleep 2
#    local file_count=0
#    local cmd_prefix=""
#    [[ $EUID -ne 0 ]] && cmd_prefix="sudo"
#    if command -v parallel &> /dev/null; then
#        mkdir -p "$(dirname "$log_file")"
#        sed -ne 's:.* /:/:p' /proc/[0-9]*/maps 2>/dev/null | sort -u | \
#          grep -v '^/dev/' | grep -v '(deleted)' | \
#          parallel "$cmd_prefix cat {} > /dev/null 2>/dev/null && echo 'Accessed {}' >> \"$log_file\""
#    else
#        for file in $(sed -ne 's:.* /:/:p' /proc/[0-9]*/maps 2>/dev/null | sort -u | grep -v '^/dev/' | grep -v '(deleted)'); do
#            if $cmd_prefix cat "$file" > /dev/null 2>/dev/null; then
#                ((file_count++))
#                echo "✅ Accessed $file" >> "$log_file"
#            fi
#        done
#    fi
#    echo "🔍 Accessed $file_count files from mappings..." | tee -a "$log_file"
#    sleep 2

    echo "🔄 Refreshing swap spaces..." | tee -a "$log_file"
    sleep 2
    local cmd_prefix=""
    [[ $EUID -ne 0 ]] && cmd_prefix="sudo"

    if $cmd_prefix swapoff -a && $cmd_prefix swapon -a; then
        echo "✅ Swap spaces refreshed!" | tee -a "$log_file"
    else
        echo "❌ Failed to refresh swap spaces." | tee -a "$log_file"
        return 1
    fi

    echo "🔄 Swapboost process completed at $(date)." >> "$log_file"
    echo "✅ Swap spaces and caches refreshed."
}

### Frees up system memory by dropping page cache, dentries, and inodes.
drop_caches() {
    echo "🔄 Dropping caches..."
    sync
    if echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null; then
        echo "✅ Caches dropped successfully."
    else
        echo "❌ Failed to drop caches."
    fi
}

fullboost() {
    echo "🔧 Boosting system resources..."
    swapboost
    drop_caches
    echo "✅ System optimized."
}

## Pacopt

### Executes several maintenance operations for the Pacman manager
### and other various resources of the like to speed up the responsiveness
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

## Cleanlist

### Cleans and formats a list of package names from the clipboard, then
### installs them using the selected package manager.
cleanlist() {
    ## Determine clipboard command based on session type or available utility
    local clipboard_cmd packages
    if command -v xclip &> /dev/null; then
        clipboard_cmd="xclip -selection c -o"
    elif command -v wl-paste &> /dev/null; then
        clipboard_cmd="wl-paste"
    else
        echo "❌ No suitable clipboard utility found. Please install xclip or wl-clipboard."
        return 1
    fi

    ## Extract, clean, and format package names from clipboard
    packages=$(eval "$clipboard_cmd" | tr ',' '\n' | sed -E 's/=.*//;s/^[[:space:]]+//;s/[[:space:]]+$//' | tr -s '\n' ' ')

    if [[ -z "$packages" ]]; then
        echo "⚠️ No valid package names were found in the clipboard."
        return 1
    fi

    echo "📋 Cleaned package list: $packages"

    ## Copy the formatted list back to the clipboard for user reference
    if command -v xclip &>/dev/null; then
        echo -n "$packages" | xclip -selection c
    elif command -v wl-copy &>/dev/null; then
        echo -n "$packages" | wl-copy
    fi

    ## Log the cleaned package list for future reference
    local log_file="$HOME/.local/share/cleanlist.log"
    \mkdir -p "$(dirname "$log_file")"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $packages" >> "$log_file"
    echo "📝 Cleaned package list logged to $log_file."

    ## Prompt for package manager choice
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

## Fixgpgkey

### Fixes GPG keyring issues by updating the gpg.conf and repopulating
### the pacman keyring.
fixgpgkey() {
    local gpg_conf="$HOME/.gnupg/gpg.conf"
    local keyring_entry="keyring /etc/pacman.d/gnupg/pubring.gpg"
    local backup_file="$gpg_conf.bak.$(date +%Y%m%d%H%M%S)"

    echo "🔧 Starting GPG keyring fix process..."

    ## Create a backup of the gpg.conf file before making changes
    if [[ -f "$gpg_conf" ]]; then
        \mkdir -p "$(dirname "$backup_file")"  # Ensure the directory exists
        cp "$gpg_conf" "$backup_file"
        echo "🗄️ Backup of gpg.conf created at $backup_file."
    else
        echo "⚠️ No existing gpg.conf found; creating a new one."
        \mkdir -p "$(dirname "$gpg_conf")"  # Ensure the directory exists
        touch "$gpg_conf"
    fi

    ## Check if the keyring entry already exists in gpg.conf
    if ! grep -qF "$keyring_entry" "$gpg_conf"; then
        echo "$keyring_entry" >> "$gpg_conf"
        echo "➕ Keyring entry added to $gpg_conf."
    else
        echo "✅ Keyring entry already exists in $gpg_conf."
    fi

    ## Populate the pacman keyring
    echo "🔄 Populating the pacman keyring..."
    if sudo pacman-key --populate archlinux; then
        echo "✅ Pacman keyring populated successfully."
    else
        echo "❌ Failed to populate pacman keyring." >&2
        return 1
    fi

    echo "🔧 GPG keyring fix process completed."
}

## Whatsnew

### Lists the most recently modified files across the entire system.
whatsnew() {
    local num_files=${1:-10}
    echo "📂 Listing the $num_files most recently modified files across the entire system:"

    ## Check if the user has sudo privileges
    if ! sudo -v &>/dev/null; then
        echo "❌ Error: You do not have sudo privileges."
        return 1
    fi

    ## Using Zsh globbing to find and list the most recently modified files
    local files
    files=$(sudo zsh -c "print -rl -- /**/*(.om[1,$num_files])" 2>/dev/null)

    if [[ -z "$files" ]]; then
        echo "⚠️ No recently modified files found."
    else
        echo "$files"
    fi
}

## Accessed

### Lists files accessed, changed, or modified within a specified time range.
accessed() {
    local time_range=${1:-1}

    ## Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "❌ Usage: accessed [time_range_in_days]"
        return 1
    fi

    ## Search and display recently accessed files
    echo "📂 Listing files accessed in the last $time_range day(s):"
    sudo find / -type f -atime -$time_range -print0 2>/dev/null | xargs -0 ls -lah --time=atime
}

changed() {
    local time_range=${1:-1}

    ## Validate input
    if [[ ! $time_range =~ ^[0-9]+$ ]]; then
        echo "❌ Usage: changed [time_range_in_days]"
        return 1
    fi

    ## Search and display recently changed files
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

## 4ever

### Runs a command in the background with logging and PID tracking.
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

##  Dir Navigator

### Custom implementations of directory navigation for `cd` `back`
### `up` `forward`
typeset -a DIR_HISTORY_BACK
typeset -a DIR_HISTORY_FORWARD
function cd() {
    if [[ -z "$1" ]]; then
        local new_dir="$HOME"
    else
        local new_dir="$1"
        new_dir="${new_dir/#\~/$HOME}"
    fi

    if [[ ! -d "$new_dir" ]]; then
        echo "❌ Error: Directory '$new_dir' does not exist."
        return 1
    fi
    DIR_HISTORY_BACK+=("$PWD")
    DIR_HISTORY_FORWARD=()
    builtin cd "$new_dir" || return 1
}

back() {
    if (( ${#DIR_HISTORY_BACK[@]} == 0 )); then
        echo "❓ No previous directories in history."
        return 1
    fi

    local prev_dir="${DIR_HISTORY_BACK[-1]}"

    DIR_HISTORY_BACK=("${DIR_HISTORY_BACK[@]:0:-1}")

    DIR_HISTORY_FORWARD+=("$PWD")

    builtin cd "$prev_dir" || return 1
}

forward() {
    if (( ${#DIR_HISTORY_FORWARD[@]} == 0 )); then
        echo "❓ No forward directories in history."
        return 1
    fi

    local next_dir="${DIR_HISTORY_FORWARD[-1]}"

    DIR_HISTORY_FORWARD=("${DIR_HISTORY_FORWARD[@]:0:-1}")

    DIR_HISTORY_BACK+=("$PWD")

    builtin cd "$next_dir" || return 1
}

up() {
    local steps=${1:-1}

    if (( steps < 1 )); then
        echo "❌ Error: Number of steps must be at least 1."
        return 1
    fi

    local target
    target=$(printf "%0.s../" $(seq 1 "$steps"))
    target=${target%/}  # Remove trailing slash

    cd "$target"
}

## MKCD

### Make a directory and cd to it.
mkdircd() {
    if (( $# != 1 )); then
        echo "❓ Usage: mkcd <new-directory>"
        return 1
    fi

    local dir="$1"

    if mkdir -p -- "$dir"; then
        cd "$dir" && echo "📁 Now in '$dir'."
    else
        echo "❌ Failed to create or navigate to directory '$dir'."
        return 1
    fi
}

## CDT

### Creates a temporary directory and cds to it.
mktmpcd() {
    local tmp_dir

    if tmp_dir=$(mktemp -d 2>/dev/null); then
        cd "$tmp_dir" && echo "🆕 Switched to temporary directory: $tmp_dir"
    else
        echo "❌ Failed to create a temporary directory."
        return 1
    fi
}

## CDLS

### Changes to a directory and lists its contents.
cdls() {
    if [[ -z "$1" ]]; then
        # Navigate to HOME and list its contents if no arguments are provided
        cd && ls -lah && echo "📂 Now in '$HOME'."
    else
        local dir="$1"
        dir="${dir/#\~/$HOME}"

        if [[ ! -d "$dir" ]]; then
            echo "❌ Error: Directory '$dir' does not exist."
            return 1
        fi

        if cd "$dir"; then
            ls -lah
            echo "📂 Now in '$dir'."
        else
            echo "❌ Failed to change to directory '$dir'."
            return 1
        fi
    fi
}

## NOTEPAD

### A simple note-taking function with many custom features such as viewing,
### adding, filtering, and clearing notes.
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

## TURL

### Shrink a url down for easy use.
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
#if alias copy &>/dev/null; then
#    unalias copy
#fi

# Enhanced copy function
#function_copy() {
#    local copy_cmd=()
#    local file_path=""
#            copy_cmd=("wl-copy")

# Handle the -p option for copying file paths
#    if [[ "$1" == "-p" ]]; then
#        if [[ -n "$2" ]]; then
#            file_path="$2"
#            echo -n "$file_path" | "${copy_cmd[@]}"
#        else
#            echo "No file path specified."
#            return 1
#        fi
#    else
#        file_path="$1"
#        if [[ -f "$file_path" ]]; then
#            cat "$file_path" | "${copy_cmd[@]}"
#        else
#            echo "File does not exist: $file_path"
#            return 1
#        fi
#    fi
#
#    # Check the result of the copy operation and provide feedback
#    if [[ $? -eq 0 ]]; then
#        echo "Content copied to clipboard."
#    else
#        echo "Failed to copy content to clipboard."
#        return 1
#    fi
#}

## UNDO/REDO

### Uninstall the packages you just recently installed by accident or reinstall
### the packages you accidentally removed with ease.
fetch_packages() {
    local action="$1"
    local count="$2"
    if [[ "$action" == "undo" ]]; then
        # Packages recently installed: We'll remove them
        expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort -r | head -n "$count" | awk '{print $3}'
    elif [[ "$action" == "redo" ]]; then
        # Packages recently removed: We'll reinstall them
        grep '\[ALPM\] removed' /var/log/pacman.log | tail -n "$count" | awk '{print $4}' | tr -d ':'
    fi
}

list_packages() {
    local -a packages=("$@")
    local idx=1
    for pkg in "${packages[@]}"; do
        echo "${idx}) $pkg"
        ((idx++))
    done
}

# A helper that tries pacman, then yay, then overwrites
install_with_fallback() {
  local -a pkgs=("$@")

  echo "Attempting to install with Pacman: ${pkgs[*]}"
  if sudo pacman -S --needed --noconfirm "${pkgs[@]}"; then
    echo "Installation successful via Pacman."
    return 0
  else
    echo "Pacman install failed. Trying yay..."
    if yay -S --needed --noconfirm "${pkgs[@]}"; then
      echo "Installation successful via yay."
      return 0
    else
      echo "yay install failed. Attempting overwrite with yay..."
      yes | yay -S --overwrite="*" --noconfirm "${pkgs[@]}"
      if [[ $? -eq 0 ]]; then
        echo "Installation successful via yay with overwrite."
        return 0
      else
        echo "ERROR: Could not install packages with either Pacman or yay (even with overwrite)."
        return 1
      fi
    fi
  fi
}

# The main function that removes packages (undo) or
# reinstalls them (redo) with missing dependencies
modify_packages() {
  local action="$1"
  shift
  local -a packages=("$@")

  case "$action" in
    "undo")
      # Prompt user for each selected package
      for pkg in "${packages[@]}"; do
        echo "Do you want to remove '$pkg' with pacman -Rns? (y/n)"
        read confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
          if sudo pacman -Rns --noconfirm "$pkg"; then
            echo "Removed '$pkg' successfully."
          else
            echo "Failed to remove '$pkg' normally."
            echo "Do you want to forcibly remove '$pkg' with 'pacman -Rdd'? (y/n)"
            read force_confirm
            if [[ "$force_confirm" =~ ^[Yy]$ ]]; then
              sudo pacman -Rdd --noconfirm "$pkg" \
                && echo "Forcibly removed '$pkg'." \
                || echo "Failed to forcibly remove '$pkg'."
            else
              echo "Skipping '$pkg'."
            fi
          fi
        else
          # If user says no, offer forcibly remove
          echo "Do you want to forcibly remove '$pkg' with 'pacman -Rdd'? (y/n)"
          read force_confirm
          if [[ "$force_confirm" =~ ^[Yy]$ ]]; then
            sudo pacman -Rdd --noconfirm "$pkg" \
              && echo "Forcibly removed '$pkg'." \
              || echo "Failed to forcibly remove '$pkg'."
          else
            echo "Skipping '$pkg'."
          fi
        fi
      done
      ;;

    "redo")
      # For each package, prompt about missing dependencies
      for pkg in "${packages[@]}"; do
        echo "Do you want to reinstall '$pkg' (with any missing deps)? (y/n)"
        read confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
          # Identify missing dependencies
          local -a missing_deps=()
          local dep_info dep base_dep

          dep_info=$(pacman -Si "$pkg" 2>/dev/null | grep -E "^Depends On\s*:" | cut -d: -f2)
          dep_info="${dep_info/None/}"  # remove 'None' if no deps
          for dep in $dep_info; do
            # remove version constraints, e.g., "foo>=1.2"
            base_dep="${dep%%[>=<]*}"
            # if it's not installed, we add it to missing_deps
            if [[ -n "$base_dep" ]] && ! pacman -Q "$base_dep" &>/dev/null; then
              missing_deps+=("$base_dep")
            fi
          done

          if (( ${#missing_deps[@]} > 0 )); then
            echo "Missing dependencies for '$pkg': ${missing_deps[*]}"
            echo "Install them along with '$pkg'? (y/n)"
            read dep_confirm
            if [[ "$dep_confirm" =~ ^[Yy]$ ]]; then
              # Attempt to install missing_deps + pkg with fallback
              if install_with_fallback "${missing_deps[@]}" "$pkg"; then
                echo "Installed '$pkg' with missing deps."
              else
                echo "Failed to install '$pkg' (even with fallback)."
              fi
            else
              echo "Skipping '$pkg'."
            fi
          else
            echo "No missing dependencies. Installing '$pkg'..."
            if install_with_fallback "$pkg"; then
              echo "Installed '$pkg' successfully."
            else
              echo "Failed to install '$pkg'."
            fi
          fi
        else
          echo "Skipping '$pkg'."
        fi
      done
      ;;
  esac
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

    if (( ${#packages[@]} == 0 )); then
        echo "No recent packages found for action: $action."
        return
    fi

    echo "Most recently ${action}d packages:"
    list_packages "${packages[@]}"

    if command -v fzf >/dev/null 2>&1; then
        local selected
        selected=$(printf "%s\n" "${packages[@]}" | fzf --multi --prompt="Select packages to $action: ")
        if [[ -z "$selected" ]]; then
            echo "No packages selected."
            return
        fi
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

        if (( ${#packages[@]} == 0 )); then
            echo "No packages selected."
            return
        fi
    fi

    if [[ "$action" == "redo" ]]; then
        echo "Reinstalling packages..."
    else
        echo "Removing packages..."
    fi

    modify_packages "$action" "${packages[@]}"
}

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

## WhatWhen

### Custom preset functions for searching your history
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

## Urldecode

### Simple URL decoder
function urldecode() {
    local input
    if [[ -n "$1" ]]; then
        input="$1"
    elif [ ! -t 0 ]; then
        input=$(cat)
    else
        echo "Usage: urldecode <encoded_string>" >&2
        return 1
    fi

    python3 -c "import sys, urllib.parse, html; s = sys.stdin.read().strip(); print(html.unescape(urllib.parse.unquote(s)))" <<< "$input"
}

## Termbin

### Simple function to leverage termbin.com like pastebin
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

## XT

### Custom extraction functions for archive and other compressed files:
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
