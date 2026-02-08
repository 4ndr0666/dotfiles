#!/bin/zsh
# 4ndr0666
# === // FUNCTIONS.ZSH // ===

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
SUCCESS="✔"
WARNING="⚠️"
ERROR="❌"
DELETE_ICON="🗑️"
COPY_ICON="📋"
MOVE_ICON="🚚"
COMPRESS_ICON="📦"
print_message() {
  local type="$1" msg="$2"
  case "$type" in
    INFO)    print -P "${fg[cyan]}${INFO} ${msg}${reset_color}" ;;
    SUCCESS) print -P "${fg[green]}${SUCCESS} ${msg}${reset_color}" ;;
    WARNING) print -P "${fg[yellow]}${WARNING} ${msg}${reset_color}" ;;
    ERROR)   print -P "${fg[red]}${ERROR} ${msg}${reset_color}" ;;
    *)       print -P "${msg}" ;;
  esac
}


################################
#    === // CLN //===
################################
# Sanitizes fucked up filenames for smooth operations.
# --------------------------------------------------------------
cln() {
	emulate -L zsh
	setopt extended_glob
	local file dir base ext base_noext new candidate n dryrun="${1:-0}"
	local -i renamed=0 skipped=0 failed=0

	for file in **/*(DNOn); do
		dir="${file:h}"
		base="${file:t}"
		ext="${base:e}"
		base_noext="${base:r}"

		# 1. Sanitize base (no extension)
		new="${base_noext//[^A-Za-z0-9._-]/_}"

		# 2. Collapse multiple underscores
		while [[ "$new" == *__* ]]; do
			new="${new//__/_}"
		done

		# 3. Remove leading/trailing underscores
		new="${new##_}"
		new="${new%%_}"
		new="${new%%.}"

		# 4. Restore extension
		[[ -n "$ext" && "$ext" != "$new" ]] && candidate="${new}.${ext}" || candidate="$new"

		# 5. Avoid collision: auto-increment if needed
		n=1
		while [[ -e "${dir:+$dir/}$candidate" && "$file" != "${dir:+$dir/}$candidate" ]]; do
			candidate="${new}_$n"
			[[ -n "$ext" ]] && candidate="${candidate}.${ext}"
			((n++))
		done

		local final="${dir:+$dir/}$candidate"

		# 6. No-op if same
		[[ "$file" == "$final" ]] && continue

		# 7. Perform rename or dry-run
		if ((dryrun)); then
			echo "DRY-RUN: '$file' → '$final'"
		else
			if mv -- "$file" "$final"; then
				echo "Renamed: '$file' → '$final'"
				((renamed++))
			else
				echo "FAIL: Could not rename '$file' → '$final'"
				((failed++))
			fi
		fi
	done
	echo "---"
	echo "Summary: $renamed renamed, $skipped skipped, $failed failed"
}


################################
#    === // GRAPHICSTEST //===
################################
# Runs verifications for amdgpu, vulkan, and OpenGL
# ---------------------------------------------------
graphicstest() {
	lspci -k | grep -A 3 VGA
	vulkaninfo | less
	glxinfo | grep "OpenGL renderer"
}


################################
#    === // BKUP //===
################################
# Smart and configurable backup function
# ---------------------------------------------------
backup_directory="/Nas/Backups/bkup"
check_bkup_dependencies() {
  local deps=(tar zstd fzf realpath)
  for cmd in "${deps[@]}"; do
    if ! command -v $cmd &>/dev/null; then
      print_message ERROR "Dependency '$cmd' is not installed."
      return 1
    fi
  done
  return 0
}

load_bkup_config() {
  local cfgdir="$HOME/.config/bkup"
  mkdir -p "$cfgdir"
  local cfg="$cfgdir/.bkup_config"
  if [[ -f $cfg ]]; then
    source "$cfg"
  else
    BACKUP_DIR="${backup_directory:-/Nas/Backups/bkup}"
  fi
}

set_backup_dir() {
  read "?Enter backup directory path: " newdir
  if [[ -z $newdir ]]; then
    print_message WARNING "Backup directory cannot be empty."
    return
  fi
  mkdir -p "$newdir" || {
    print_message ERROR "Cannot create '$newdir'."
    return 1
  }
  print "BACKUP_DIR=\"$newdir\"" > "$HOME/.config/bkup/.bkup_config"
  print_message SUCCESS "Backup directory set to '$newdir'."
}

perform_backup_move() {
  local mode=$1; shift
  local targets=("$@")
  (( ${#targets} )) || { print_message ERROR "No targets specified."; return 1 }

  mkdir -p "$BACKUP_DIR"
  for tgt in "${targets[@]}"; do
    if [[ ! -e $tgt ]]; then
      print_message WARNING "Skipping non‑existent '$tgt'."
      continue
    fi

    local base=$(basename -- "$tgt")
    local stamp=$(date -u +"%Y%m%dT%H%M%SZ")
    local archive="${BACKUP_DIR}/${base}-${stamp}.tar.zst"

    # Interactive exclusion for directories
    local exclude_opts=()
    if [[ -d $tgt ]]; then
      print_message INFO "Select exclusions from '$tgt' (⇢ Tab to multi‑select):"
      local raw=("${(@f)$(find "$tgt" -maxdepth 1 -mindepth 1 | fzf -m --prompt="Exclude: " --height=40%)}")
      for ex in $raw; do
        local rel=$(realpath --relative-to="$tgt" "$ex")
        exclude_opts+=("--exclude=$rel")
      done
    fi

    print_message INFO "$([[ $mode == copy ]] && print $COPY_ICON || print $MOVE_ICON) Archiving '$tgt' → '$archive'..."
    tar -I zstd "${exclude_opts[@]}" -cf "$archive" -C "$(dirname -- "$tgt")" "$(basename -- "$tgt")" > /dev/null 2>&1 \
      && {
        print_message SUCCESS "Created '$archive'."
        if [[ $mode == move ]]; then
          rm -rf -- "$tgt" \
            && print_message SUCCESS "Removed original '$tgt'." \
            || print_message ERROR "Failed to remove '$tgt'."
        fi
      } || {
        print_message ERROR "Failed to archive '$tgt'."
        rm -f -- "$archive"
      }
  done
}

remove_backups() {
  local remove_all=false verbose=false
  typeset -i OPTIND=1
  while getopts "av" opt; do
    case $opt in
      a) remove_all=true ;;
      v) verbose=true     ;;
      *) ;;
    esac
  done
  shift $((OPTIND-1))

  mkdir -p "$BACKUP_DIR"

  if $remove_all; then
    print_message WARNING "Remove ALL backups in '$BACKUP_DIR'? (y/N) "
    read confirmation
    if [[ $confirmation =~ ^[Yy]$ ]]; then
      rm -rf -- "${BACKUP_DIR:?}/"* \
        && print_message SUCCESS "All backups removed." \
        || print_message ERROR "Failed to remove all backups."
    else
      print_message INFO "Aborted."
    fi
    return
  fi

  (( $# )) || { print_message ERROR "No backup names given."; return 1 }
  for name in "$@"; do
    local pattern="${BACKUP_DIR}/${name}_*.tar.zst"
    local matches=(${~pattern})
    if (( ${#matches} )); then
      for f in $matches; do
        rm -f -- "$f" \
          && $verbose && print_message SUCCESS "Removed '$f'." \
          || $verbose && print_message ERROR "Failed to remove '$f'."
      done
    else
      $verbose && print_message WARNING "No backups match '$name'."
    fi
  done
}

display_bkup_menu() {
  print -P "%B%UBackup Utility Menu%u%b"
  print "1) Create Backup"
  print "2) Move to Backup"
  print "3) Remove Backups"
  print "4) Set Backup Directory"
  print "5) Exit"
}

bkup() {
  check_bkup_dependencies || return 1
  load_bkup_config

  if (( $# == 0 )); then
    while true; do
      display_bkup_menu
      read "?Choose [1-5]: " choice
      case $choice in
        1) read -A t; perform_backup_move copy "${t[@]}" ;;
        2) read -A t; perform_backup_move move "${t[@]}" ;;
        3)
          print " a) All   b) Specific"
          read "?Remove all or specific? [a/b]: " c
          case $c in
            a) remove_backups -a -v ;;
            b) read -A r; remove_backups -v "${r[@]}" ;;
            *) print_message WARNING "Invalid choice";;
          esac
          ;;
        4) set_backup_dir ;;
        5) print_message INFO "Goodbye!"; break ;;
        *) print_message WARNING "Choose 1–5.";;
      esac
      print ""
    done
    return 0
  fi

  ### CLI flags
  local mode=copy show_help=false verbose=false remove_all=false compress=true
  typeset -i OPTIND=1
  while getopts "hcmravz" opt; do
    case $opt in
      h) show_help=true    ;;
      c) mode=copy         ;;
      m) mode=move         ;;
      r) mode=remove       ;;
      a) remove_all=true   ;;
      v) verbose=true      ;;
      z) compress=true     ;;
      *) show_help=true    ;;
    esac
  done
  shift $((OPTIND-1))

  if $show_help || ([[ $mode != remove && $# -eq 0 ]]); then
    cat <<EOF
Usage: bkup [-h] [-c|-m|-r] [-a] [-v] [FILES...]

  -h    Display this help text.
  -c    Create a backup (default).
  -m    Move the file/folder to backup after archiving.
  -r    Remove backups of the specified file or directory.
  -a    Remove all backups in the backup directory (used with -r).
  -v    Enable verbose output.

EOF
    return 0
  fi

  case $mode in
    copy|move)
      perform_backup_move $mode "$@" ;;
    remove)
      remove_backups ${remove_all:+-a} ${verbose:+-v} "$@" ;;
    *) print_message ERROR "Invalid mode selected.";;
  esac
}


################################
#    === // BRAVEH //===
################################
# Interactively search and open items from your browser history.
# ----------------------------------------------------------------
braveh() {
  emulate -L zsh
  setopt extended_glob

  # REVISION: Auto-detect Brave profile path for greater flexibility.
  local brave_profile_path
  if [[ -d "$HOME/.config/BraveSoftware/Brave-Browser/Default" ]]; then
    brave_profile_path="$HOME/.config/BraveSoftware/Brave-Browser/Default"
  elif [[ -d "$HOME/.config/BraveSoftware/Brave-Browser-Beta/Default" ]]; then
    brave_profile_path="$HOME/.config/BraveSoftware/Brave-Browser-Beta/Default"
  else
    echo "ERROR: Could not find a default Brave profile directory." >&2
    return 1
  fi

  local history_db="${brave_profile_path}/History"
  local tmp_db="/tmp/brave_history_${UID}.db" # REVISION: User-specific tmp file
  local open_cmd="xdg-open"
  local cols=$(( COLUMNS / 3 ))
  local sep='{::}'

  # Check for dependencies
  for cmd in sqlite3 awk fzf sed xargs; do
    if ! command -v "$cmd" &>/dev/null; then
      echo "ERROR: Missing dependency: $cmd" >&2
      return 1
    fi
  done

  # Copy the locked SQLite DB for safe querying
  cp -f -- "$history_db" "$tmp_db"
  # REVISION: Ensure tmp file is cleaned up on exit/interrupt.
  trap 'rm -f -- "$tmp_db"' EXIT

  # Query title and URL, preview and allow selection
  sqlite3 -separator "$sep" "$tmp_db" \
    "SELECT substr(title,1,$cols), url FROM urls ORDER BY last_visit_time DESC;" 2>/dev/null \
  | awk -F "$sep" -v cols="$cols" '{printf "%-*s  \x1b[36m%s\x1b[m\n", cols, $1, $2}' \
  | fzf --ansi --multi \
        --prompt="Brave History> " \
        --preview-window=right:50% \
        --preview 'echo {} | sed -E "s/^.{'"$cols"'}//"' \
  | sed -E 's#.*(https?://.*)$#\1#' \
  | xargs -r -d '\n' "$open_cmd" >/dev/null 2>&1
}


################################
#    === // BRAVEB //===
################################
# Launches a random bookmark from a folder you specifiy
# Usage: braveb favorites
# -------------------------------------------------------
braveb() {
  emulate -L zsh
  if [[ $# -eq 0 || $1 = -h || $1 = --help ]]; then
    cat <<-'EOF'
Usage: braveb [FOLDER_NAME]

Launches a random URL from the specified Brave bookmarks folder.

Arguments:
  FOLDER_NAME     Name of the folder inside "Bookmarks bar" (default: "Read Later")

Options:
  -h, --help      Show this help message

Examples:
  braveb "To Read"              # → picks random from folder "To Read"
  braveb "Interesting Articles" # → case sensitive!

Dependencies: jq, shuf, xdg-open
EOF
    return 0
  fi

  # Default folder if none provided
  local folder_name="${1:-4ndr0666}"

  # Auto-detect common Brave profile locations
  local brave_profile_path
  if [[ -d "$HOME/.config/BraveSoftware/Brave-Browser/Default" ]]; then
    brave_profile_path="$HOME/.config/BraveSoftware/Brave-Browser/Default"
  elif [[ -d "$HOME/.config/BraveSoftware/Brave-Browser-Beta/Default" ]]; then
    brave_profile_path="$HOME/.config/BraveSoftware/Brave-Browser-Beta/Default"
  else
    echo "ERROR: Could not find a default Brave profile directory." >&2
    return 1
  fi

  local bookmarks_file="${brave_profile_path}/Bookmarks"
  local open_cmd="xdg-open"

  # Check dependencies
  for cmd in jq shuf; do
    if ! command -v "$cmd" &>/dev/null; then
      echo "ERROR: Missing dependency → $cmd" >&2
      return 1
    fi
  done

  [[ ! -f "$bookmarks_file" ]] && {
    echo "ERROR: Bookmarks file not found: $bookmarks_file" >&2
    return 1
  }

  # Extract random URL from the requested folder
  local random_url
  random_url=$(jq -r --arg FOLDERNAME "$folder_name" '
      .roots.bookmark_bar.children[]
    | select(.type == "folder" and .name == $FOLDERNAME)
    | .children[]
    | select(.type == "url")
    | .url
  ' "$bookmarks_file" | shuf -n 1 2>/dev/null)

  if [[ -z "$random_url" ]]; then
    echo "ERROR: No URLs found in folder '$folder_name'." >&2
    echo "       Check spelling, case, and whether the folder exists under Bookmarks bar." >&2
    return 1
  fi

  echo "Opening random bookmark from '$folder_name':"
  echo "→ \x1b[36m$random_url\x1b[m"

  "$open_cmd" "$random_url" >/dev/null 2>&1
}


################################
#    === // COPYPATH //===
################################
# Copies absolute path of pwd
# -----------------------------------
cpath() {
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


################################
#    === // SPELLCHECK //===
################################
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


################################
#    === // ANY //===
################################
# Case insensitve pid search
# Usage: any [-s] <process_name>
# -------------------------------------------
any() {
    local show_help_flag=false
    local pgrep_opts="-i" # Default to case-insensitive
    local OPTIND

    while getopts ":sh" opt; do
        case $opt in
            s) pgrep_opts="" ;; # If -s is present, remove all options for a strict search
            h) show_help_flag=true ;;
            \?)
                echo "❌ Invalid option: -$OPTARG" >&2
                echo "Usage: any [-s] <process_name>"
                return 1
                ;;
        esac
    done
    shift $((OPTIND - 1))

    if [[ "$show_help_flag" = true ]] || [[ -z "$1" ]]; then
        echo "Usage: any [options] <process name>"
        echo "Finds running processes by name (case-insensitive by default)."
        echo ""
        echo "Options:"
        echo "  -s          Case-sensitive search"
        echo "  -h          Show this help message"
        echo ""
        echo "Examples:"
        echo "  any code     # Case-insensitive search for VS Code processes"
        echo "  any -s sshd  # Case-sensitive search for the SSH daemon"
        return 0
    fi

    local process_name="$1"
    local pids

    # Using an array and process substitution for robustness
    if ! pids=($(pgrep ${pgrep_opts} -d, -- "$process_name")); then
        echo "ℹ️ No running processes found for '$process_name'."
        return 0
    fi

    echo "🔍 Running processes matching '$process_name':"
    echo "------------------------------------------------------------------"

    ps -o pid,user,comm=COMMAND,args=FULL_COMMAND -p "${pids[*]}" | \
    awk 'NR>1 {printf "PID: %-8s User: %-15s CMD: %-20s ARGS: %s\n", $1, $2, $3, substr($0, index($0,$4))}'
}


################################
#    === // TRIAGE //===
################################
# Memoery sanitation and resource saver
# ----------------------------------------
triage() {
    # --- Color & Logging Setup ---
    local RED="\e[31m" GRN="\e[32m" YLW="\e[33m" BLU="\e[34m" RST="\e[0m"

    _log() {
        local type="$1" color="$2" message="$3"
        printf "${color}[%s]${RST} %s\n" "$type" "$message"
    }
    _log_info() { _log "INFO" "$BLU" "$1"; }
    _log_ok()   { _log "OK"   "$GRN" "$1"; }
    _log_warn() { _log "WARN" "$YLW" "$1"; }
    _log_fail() { _log "FAIL" "$RED" "$1"; }

    # --- Helper Functions ---
    _check_sudo() {
        if [[ $EUID -ne 0 ]]; then
            _log_info "Requesting sudo privileges for system tasks..."
            if ! sudo -n true 2>/dev/null; then
                sudo -v
                if [[ $? -ne 0 ]]; then
                    _log_fail "Sudo privileges not granted. Aborting."
                    return 1
                fi
            fi
            _log_ok "Sudo privileges confirmed."
        fi
    }

    _triage_systemd() {
        _log_info "Checking SystemD units..."
        if command -v systemctl &>/dev/null; then
            sudo systemctl reset-failed &>/dev/null || _log_warn "Failed to reset some units."
            # Remove broken/dangling symlinks in systemd config
            sudo find -L /etc/systemd/ -type l -delete 2>/dev/null
            sudo systemctl daemon-reload &>/dev/null
            _log_ok "SystemD units reset and reloaded."
        else
            _log_warn "systemctl not found, skipping SystemD tasks."
        fi
    }

    _triage_sockets() {
        _log_info "Cleaning D-Bus sockets..."
        if command -v dbus-cleanup-sockets &>/dev/null; then
            sudo dbus-cleanup-sockets
            _log_ok "D-Bus sockets audited."
        else
            _log_warn "dbus-cleanup-sockets not found, skipping."
        fi
    }

    _triage_zombies() {
        _log_info "Scanning for zombie processes..."
        # Finds processes in Z (defunct) state
        local zombies=$(ps -eo state,pid,cmd | awk '$1=="Z" {print $2}')
        if [[ -n "$zombies" ]]; then
            _log_warn "Zombie processes detected (PIDs): ${zombies//$'\n'/ }"
            # Note: Zombies are already dead; cleaning usually requires signaling the parent.
        else
            _log_ok "No zombie processes found."
        fi
    }

    _triage_logs() {
        _log_info "Vacuuming journal logs..."
        if command -v journalctl &>/dev/null; then
            sudo journalctl --vacuum-time=2d >/dev/null 2>&1
            _log_ok "Logs older than 2 days removed."
        else
            _log_warn "journalctl not found, skipping log cleanup."
        fi
    }

    _triage_tmp() {
        _log_info "Cleaning temporary files..."
        local cleaner=""
        if command -v tmpwatch &>/dev/null; then cleaner="tmpwatch";
        elif command -v tmpreaper &>/dev/null; then cleaner="tmpreaper"; fi

        if [[ -n "$cleaner" ]]; then
            sudo "$cleaner" 2h /tmp >/dev/null 2>&1
            _log_ok "/tmp files older than 2 hours removed."
        else
            _log_warn "tmpwatch/tmpreaper not found, skipping /tmp cleanup."
        fi
    }

    _triage_gvfs() {
        _log_info "Analyzing GVFS metadata entropy..."
        # Targets the calling user's local metadata registry
        local gvfs_path="$HOME/.local/share/gvfs-metadata"
        if [[ -d "$gvfs_path" ]]; then
            # Release daemon locks before purging
            pkill -u "$USER" -f gvfsd-metadata &>/dev/null || true
            if rm -rf "$gvfs_path"/*; then
                _log_ok "GVFS metadata purge successful. Cache reset."
            else
                _log_fail "Failed to purge GVFS metadata. Check permissions."
            fi
        else
            _log_info "GVFS metadata path nominal (Empty/Not present)."
        fi
    }

    # --- Main Execution ---
    # set -e used for maintenance reliability
    set -e
    _check_sudo
    _triage_systemd
    _triage_sockets
    _triage_zombies
    _triage_logs
    _triage_tmp
    _triage_gvfs
    _log_ok "System triage and cleanup complete."
    set +e
}


################################
#    === // MEMREPORT //===
################################
memreport() {
    # This function is read-only and provides diagnostics instead of performing
    # potentially harmful "boosting" actions.
    local RED="\e[31m" GRN="\e[32m" YLW="\e[33m" BLU="\e[34m" RST="\e[0m"
    _log_info() { printf "\n${BLU}--- %s ---${RST}\n" "$1"; }

    _log_info "CURRENT MEMORY AND SWAP USAGE"
    free -h

    _log_info "SYSTEM LOAD AND SWAP ACTIVITY (LAST 5 SECONDS)"
    vmstat 1 5

    _log_info "SWAP PARTITION(S) SUMMARY"
    swapon --show

    _log_info "TOP 5 MEMORY-CONSUMING PROCESSES"
    ps axo rss,comm,pid,user | sort -nr | head -n 5 | \
    awk '{
        rss=$1/1024;
        comm=$2;
        pid=$3;
        user=$4;
        printf "  %8.2f MB  %-20s (PID: %-6s User: %s)\n", rss, comm, pid, user
    }'

    printf "\n${GRN}✅ Memory report complete.${RST}\n"
}


################################
#    === // PACOPT //===
################################
# Optimizes pacman.
# --------------------------------
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


################################
#    === // CLEANLIST //===
################################
# Removes char and ver numbers from pkgnames to feed to pacman.
# -------------------------------------------------------
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


################################
#    === // FIXGPGKEY //===
################################
# Fixes GPG keyring by updating the gpg.conf and
# repopulating the pacman keyring.
# ----------------------------------------------------
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


################################
#    === // WHATSNEW //===
################################
# Lists recently modified files.
# -----------------------------------------------------------------------------
_check_sudo() {
    if ! sudo -n true 2>/dev/null; then
        echo "INFO: Requesting sudo privileges for system-wide search..."
        sudo -v
        if [[ $? -ne 0 ]]; then
            echo "ERROR: Sudo privileges not granted. Aborting." >&2
            return 1
        fi
    fi
    return 0
}

_find_files_by_time() {
    local time_attr="$1" # 'a' for access, 'c' for change, 'm' for modification
    local time_range="$2"

    _check_sudo || return 1

    echo "📂 Searching for files by '${time_attr}' time in the last ${time_range} day(s). This may take a moment..."

    # This command is hardened for performance and safety:
    # -L: Follow symbolic links.
    # -xdev: Do not cross filesystem boundaries (prevents scanning /mnt, etc.).
    # -path ... -prune: Explicitly exclude noisy/irrelevant directories.
    # -type f: Find only regular files.
    # -${time_attr}time: The core filter for atime, ctime, or mtime.
    # -print0: Safely handle all filenames.
    # fzf: Provide an interactive, fuzzy-searchable UI for the results.
    sudo find / -L -xdev \
        -path '/proc' -prune -o \
        -path '/sys' -prune -o \
        -path '/dev' -prune -o \
        -path '/run' -prune -o \
        -path '/tmp' -prune -o \
        -path "$HOME/.cache" -prune -o \
        -type f -"${time_attr}"time -"${time_range}" -print0 2>/dev/null |
        fzf --read0 --prompt="Search results ▶ " --multi --preview 'ls -lah {}'
}

whatsnew() {
    local num_files=${1:-20}
    _check_sudo || return 1

    echo "📂 Finding the ${num_files} most recently modified files. This may take a moment..."

    sudo find / -L -xdev \
        -path '/proc' -prune -o \
        -path '/sys' -prune -o \
        -path '/dev' -prune -o \
        -path '/run' -prune -o \
        -type f -print0 2>/dev/null |
        xargs -0 stat --printf='%Y\t%n\n' |
        sort -rn |
        head -n "$num_files" |
        awk -F'\t' '{print $2}' |
        fzf --prompt="Newest ${num_files} files ▶ " --multi --preview 'ls -lah {}'
}

accessed() {
    local time_range=${1:-1}
    _find_files_by_time 'a' "$time_range"
}

changed() {
    local time_range=${1:-1}
    _find_files_by_time 'c' "$time_range"
}

modified() {
    local time_range=${1:-1}
    _find_files_by_time 'm' "$time_range"
}


################################
#    === // 4EVER //===
################################
# Runs a command in background w logging and PID.
# -----------------------------------------
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


################################
#    === // DIR NAVIGATOR //===
################################
# provide browser-style back/forward navigation in the terminal.
# ------------------------------------------------------------
typeset -gUa DIR_HISTORY_BACK
typeset -gUa DIR_HISTORY_FORWARD
typeset -g _DIR_HISTORY_NAVIGATING
chpwd() {
# If the directory hasn\'t actually changed, do nothing.
# This prevents redundant entries when doing `cd .` or cd-ing to a symlink
# that points to the current directory.
if [[ "$PWD" == "$OLDPWD" ]]; then
    return
fi

# If the change was NOT initiated by our back() or forward() functions,
# it\'s a new navigation path.
if [[ -z "$_DIR_HISTORY_NAVIGATING" ]]; then
    # Add the previous directory to the back history.
    # Ensure OLDPWD is a valid directory before adding to prevent issues with malformed paths.
    if [[ -d "$OLDPWD" ]]; then
        DIR_HISTORY_BACK+=("$OLDPWD")
    fi
    # A new navigation path invalidates the forward history.
    DIR_HISTORY_FORWARD=()
fi

# Unset the state flag after every run to reset the state.
unset _DIR_HISTORY_NAVIGATING
}

# back: Go to the previous directory in the history.
back() {
    if (( ${#DIR_HISTORY_BACK[@]} == 0 )); then
        echo "❓ No previous directories in history."
        return 1
    fi

    # Set the state flag to inform the chpwd hook.
    _DIR_HISTORY_NAVIGATING=1

    # Move the current directory to the forward stack.
    DIR_HISTORY_FORWARD+=("$PWD")

    # Get the last directory from the back stack.
    local prev_dir="${DIR_HISTORY_BACK[-1]}"

    # Remove the last directory from the back stack.
    DIR_HISTORY_BACK=("${DIR_HISTORY_BACK[@]:0:-1}")

    # Use the 'builtin' cd to perform the actual directory change.
    # The chpwd hook will handle the rest.
    builtin cd "$prev_dir" || return 1
}

# forward: Go to the next directory in the history.
forward() {
    if (( ${#DIR_HISTORY_FORWARD[@]} == 0 )); then
        echo "❓ No forward directories in history."
        return 1
    fi

    _DIR_HISTORY_NAVIGATING=1

    # Move the current directory to the back stack.
    DIR_HISTORY_BACK+=("$PWD")

    local next_dir="${DIR_HISTORY_FORWARD[-1]}"
    DIR_HISTORY_FORWARD=("${DIR_HISTORY_FORWARD[@]:0:-1}")

    builtin cd "$next_dir" || return 1
}

# up: Go up N levels in the directory tree. Defaults to 1.
up() {
    local steps=${1:-1}

    if ! [[ "$steps" =~ ^[0-9]+$ ]] || (( steps < 1 )); then
        echo "❌ Error: Number of steps must be a positive integer."
        return 1
    fi

    # Build the target path using a shell-native loop for efficiency.
    local target=".."
    for (( i = 1; i < steps; i++ )); do
        target+="/.."
    done

    # Let chpwd handle the history automatically.
    builtin cd "$target" || return 1
}

# dhist: Display the current state of the directory history stacks.
dhist() {
    echo "--- Directory History ---"
    echo "⬅️  Back (${#DIR_HISTORY_BACK[@]}):"
    if (( ${#DIR_HISTORY_BACK[@]} > 0 )); then
        for dir in "${DIR_HISTORY_BACK[@]}"; do
            echo "  - $dir"
        done
    else
        echo "  (empty)"
    fi

    echo "➡️  Forward (${#DIR_HISTORY_FORWARD[@]}):"
    if (( ${#DIR_HISTORY_FORWARD[@]} > 0 )); then
        for dir in "${DIR_HISTORY_FORWARD[@]}"; do
            echo "  - $dir"
        done
    else
        echo "  (empty)"
    fi
    echo "-------------------------"
}


################################
#    === // MKDIRCD //===
################################
# Make a directory and cd to it
# ----------------------------------
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


################################
#    === // CDT //===
################################
# Creates a temporary directory and cds to it.
# -----------------------------------------------
mktmpcd() {
    local tmp_dir

    if tmp_dir=$(mktemp -d 2>/dev/null); then
        cd "$tmp_dir" && echo "🆕 Switched to temporary directory: $tmp_dir"
    else
        echo "❌ Failed to create a temporary directory."
        return 1
    fi
}


################################
#    === // CDLS //===
################################
# Changes to a directory and lists its contents.
# -----------------------------------------
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


################################
#    === // NOTEPAD //===
################################
# A simple note-taking function with many custom features
# such as viewing, adding, filtering, and clearing notes.
# --------------------------------------------------
notepad() {
    local file="$HOME/Documents/notes/.notes.md"
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
        glow "$file"
    fi

    # Add a new note if arguments are provided and not options
    if [[ $# -gt 0 && "$1" != "-"* ]]; then
        local timestamp
        timestamp=$(date "+%Y-%m-%d %H:%M:%S")
        printf "[%s]\n## %s\n---\n" "$timestamp" "$*" >> "$file"
        echo "📝 Note added."
    fi
}


################################
#    === // TURL //===
################################
# Shrink a url down for easy use.
#----------------------------
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


################################
#    === // UNDO/REDO //===
################################
# Uninstall the packages you just recently installed by
# accident or reinstall the packages you accidentally removed with ease.
#------------------------------------------------------------
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


################################
#    === // WHATWHEN //===
################################
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


################################
#    === // URLDECODE //===
################################
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


################################
#    === // TERMBIN //===
################################
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


##############################
#    === // XT //===
##############################
xt() {
  # Check if any arguments were provided.
  if [[ $# -eq 0 ]]; then
    print -u2 "Usage: xt <file1> [file2] ..."
    return 1
  fi

  # Loop through each argument provided to the function.
  for file in "$@"; do
    # Check if the argument is a regular file.
    if [[ ! -f "$file" ]]; then
      print -u2 "xt: '$file' is not a valid file."
      continue # Skip to the next file.
    fi

    print -- "--> Extracting '$file'..."
    # Use a case statement to determine the file type and extract it.
    # All variables are quoted to handle filenames with spaces or special characters.
    case "$file" in
      *.tar.bz2|*.tbz2) tar xjf "$file" ;;
      *.tar.gz|*.tgz)   tar xzf "$file" ;;
      *.tar.xz)         tar xJf "$file" ;;
      *.tar.zst)        tar --use-compress-program=unzstd -xf "$file" ;;
      *.zip|*.jar)      unzip "$file" ;;
      *.rar)            unrar x "$file" ;;
      *.7z)             7z x "$file" ;;
      *.bz2)            bunzip2 "$file" ;;
      *.gz)             gunzip "$file" ;;
      *.tar)            tar xf "$file" ;;
      *.Z)              uncompress "$file" ;;
      *.deb)            ar x "$file" ;;
      *)
        print -u2 "xt: Don't know how to extract '$file'."
        return 1 # Return a non-zero status for unknown file types
        ;;
    esac

    # Check the exit status of the last command
    if [[ $? -ne 0 ]]; then
        print -u2 "xt: An error occurred while extracting '$file'."
    fi
  done
}


### Custom extraction functions for archive and other compressed files:
#xt() {
#  if [[ -f "$1" ]]; then
#    case "$1" in
#      *.tar.lrz)
#        b=$(basename "$1" .tar.lrz)
#        lrztar -d "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.lrz)
#        b=$(basename "$1" .lrz)
#        lrunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tar.bz2)
#        b=$(basename "$1" .tar.bz2)
#        bsdtar xjf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.bz2)
#        b=$(basename "$1" .bz2)
#        \bunzip2 "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tar.gz)
#        b=$(basename "$1" .tar.gz)
#        bsdtar xzf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.gz)
#        b=$(basename "$1" .gz)
#        \gunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.ipk)
#        b=$(basename "$1" .ipk)
#        \gunzip "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tar.xz)
#        b=$(basename "$1" .tar.xz)
#        bsdtar Jxf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.xz)
#        b=$(basename "$1" .gz)
#        \xz -d "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.rar)
#        b=$(basename "$1" .rar)
#        unrar e "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tar)
#        b=$(basename "$1" .tar)
#        bsdtar xf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tbz2)
#        b=$(basename "$1" .tbz2)
#        bsdtar xjf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.tgz)
#        b=$(basename "$1" .tgz)
#        bsdtar xzf "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.zip)
#        b=$(basename "$1" .zip)
#        unzip -qq "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.Z)
#        b=$(basename "$1" .Z)
#        \uncompress "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.7z)
#        b=$(basename "$1" .7z)
#        7z x "$1" && [[ -d "$b" ]] && cd "$b" || return 0 ;;
#      *.zst)
#        b=$(basename "$1" .zst)
#        zstd -d "$1" && return 0 ;;
#      *.deb)
#        b=$(basename "$1" .deb)
#        ar x "$1" && return 0 ;;
#      *.rpm)
#        b=$(basename "$1" .rpm)
#        rpmextract.sh "$1" && return 0 ;;
#      *) echo "error: failed to extract '$1'..." && return 1 ;;
#    esac
#    return 0
#  else
#    echo "error: '$1' is not a valid file!"
#    return 1
#  fi
#}
######
