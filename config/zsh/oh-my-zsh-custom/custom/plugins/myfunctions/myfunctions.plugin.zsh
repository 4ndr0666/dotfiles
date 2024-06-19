# --- // DOWNSCALE_TO_1080P:
lowerres() {
  local input_file=${1}
  local output_file=${2:-output.mp4}

  if [ -z "$input_file" ]; then
    echo "No input file specified."
    return 1
  fi

  ffmpeg -i "$input_file" -vf "scale=1920x1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -crf 0 -preset veryslow "$output_file"
}


# ----------------------------------------------------------- // Maintenance:
reload_memory() {
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

sysboost() {
    set -e
    echo "Starting system boost..."

    if command -v systemctl &> /dev/null; then
        echo "Resetting failed systemd units..."
        sudo systemctl reset-failed || true
    else
        echo "systemctl not found, skipping reset of failed units."
    fi

    if command -v dbus-cleanup-sockets &> /dev/null; then
        echo "Cleaning up dbus sockets..."
        sudo dbus-cleanup-sockets
    else
        echo "dbus-cleanup-sockets not found, skipping cleanup."
    fi

    # Improved zombie process handling
    echo "Note: Directly killing zombie processes is not effective. Consider reviewing and restarting their parent processes."

    if command -v systemctl &> /dev/null; then
        echo "Reloading system daemon..."
        sudo systemctl daemon-reload
    else
        echo "systemctl not found, skipping daemon reload."
    fi

    # Additional cleanup options
    if command -v journalctl &> /dev/null; then
        echo "Clearing old system logs..."
        sudo journalctl --vacuum-time=3d # Keeps 3 days of logs
    fi

    if command -v tmpwatch &> /dev/null; then
        echo "Cleaning up /tmp directory..."
        sudo tmpwatch 12h /tmp # Adjust time as needed
    elif command -v tmpreaper &> /dev/null; then
        echo "Cleaning up /tmp directory..."
        sudo tmpreaper 12h /tmp # Adjust time as needed
    fi

    echo "System boost complete."
    set +e
}

optimize() {
    set -e
    echo "Starting system optimization..."

    # Removing orphaned packages with safety check
    if orphans=$(pacman -Qtdq); then
        if [ -n "$orphans" ]; then
            echo "Removing orphaned packages..."
            sudo pacman -Rscn $orphans || true
        else
            echo "No orphaned packages to remove."
        fi
    else
        echo "No orphaned packages detected."
    fi

    # Updating mlocate database
    if command -v updatedb &> /dev/null; then
        echo "Updating mlocate database..."
        sudo updatedb
    else
        echo "mlocate is not installed, skipping updatedb."
    fi

    # Updating pkgfile database
    if command -v pkgfile &> /dev/null; then
        echo "Updating pkgfile database..."
        sudo pkgfile -u
    else
        echo "pkgfile is not installed, skipping database update."
    fi

    # Upgrading pacman database
    if command -v pacman-db-upgrade &> /dev/null; then
        echo "Upgrading pacman database..."
        sudo pacman-db-upgrade
    else
        echo "pacman-db-upgrade is not available, ensure your pacman is up to date."
    fi

    # Cleaning package cache
    echo "Cleaning package cache..."
    yes | sudo pacman -Sc

    # Syncing filesystem changes
    echo "Syncing filesystem changes..."
    sync

    echo "System optimization complete."
    set +e
}

# ------------------------------------------------------------------- // Extract:
extract ()
{
  if [ -f $1 ] ; then
    case $1 in
      *.tar.bz2)   tar xjf $1   ;;
      *.tar.gz)    tar xzf $1   ;;
      *.bz2)       bunzip2 $1   ;;
      *.rar)       unrar x $1   ;;
      *.gz)        gunzip $1    ;;
      *.tar)       tar xf $1    ;;
      *.tbz2)      tar xjf $1   ;;
      *.tgz)       tar xzf $1   ;;
      *.zip)       unzip $1     ;;
      *.Z)         uncompress $1;;
      *.7z)        7z x $1      ;;
      *.deb)       ar x $1      ;;
      *.tar.xz)    tar xf $1    ;;
      *.tar.zst)   tar xf $1    ;;
      *)           echo "'$1' cannot be extracted via ex()" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}

# --------------------------------------------------------------------------------- // Cd and ls:
cl() {
    # Default to HOME directory if no argument is provided
    local dir="${1:-$HOME}"

    # Check if the argument is a directory or a symbolic link to a directory
    if [[ -d "$dir" || -L "$dir" ]]; then
        cd "$dir" && lsd
    else
        # Standardized error message
        echo "zsh: cl: '$dir': No such file or directory"
    fi
}

# ------------------------------------------------------------------------ // Github menu:

# Helper Functions
check_and_setup_ssh() {
  local ssh_key="${HOME}/.ssh/id_ed25519"

  if [ -f "$ssh_key" ]; then
    echo "SSH key exists."
  else
    echo "SSH key not found. Creating one now..."
    ssh-keygen -t ed25519 -C "your_email@example.com" -f "$ssh_key"
    eval "$(ssh-agent -s)"
    ssh-add "$ssh_key"

    echo "Uploading the SSH key to GitHub..."
    # Assuming GitHub CLI is installed and configured
    gh auth login
    gh ssh-key add "$ssh_key.pub"
  fi
}

list_and_manage_remotes() {
  echo "Current Git remotes:"
  git remote -v

  # List remotes and ask the user if they want to remove any
  echo "Would you like to remove any remotes? (yes/no):"
  read -r response

  if [[ "$response" =~ ^[Yy](es)?$ ]]; then
    echo "Enter the name of the remote to remove (leave blank to cancel):"
    read -r remote_to_remove

    if [[ -n "$remote_to_remove" ]]; then
      if git remote | grep -q "^$remote_to_remove$"; then
        git remote remove "$remote_to_remove"
        echo "Remote '$remote_to_remove' has been removed."
      else
        echo "Remote '$remote_to_remove' not found."
      fi
    else
      echo "No remotes removed."
    fi
  else
    echo "No changes made to remotes."
  fi
}

switch_to_ssh() {
  local old_url new_url

  # Get a list of all remotes and use fzf to select one
  local remote_name=$(git remote | fzf --height=10 --prompt="Select a remote: ")

  # Check if a remote was selected
  if [[ -z "$remote_name" ]]; then
    echo "No remote selected."
    return
  fi

  old_url=$(git remote get-url "$remote_name")

  # Check if the current URL is already using SSH
  if [[ "$old_url" == git@github.com:* ]]; then
    echo "The remote '$remote_name' is already using SSH."
    return
  fi

  # Extract the username and repository from the old URL
  local user_repo=${old_url#*github.com/}

  # Remove any trailing ".git"
  user_repo=${user_repo%.git}

  new_url="git@github.com:$user_repo.git"

  git remote set-url "$remote_name" "$new_url"

  echo "Switched '$remote_name' to use SSH: $new_url"
}

update_remote_url() {
  local repo_base="https://www.github.com/4ndr0666/"
  local repos=$(gh repo list 4ndr0666 -L 100 --json name -q '.[].name')

  echo "Enter the repository name:"
  local repo_name
  repo_name=$(echo "$repos" | fzf --height=10 --prompt="Select a repository: ")

  local new_url="${repo_base}${repo_name}.git"
  git remote set-url origin "$new_url"
  echo "Remote URL updated to $new_url"
}

fetch_from_remote() {
  echo "Fetching updates from remote..."
  git fetch origin
  echo "Fetch complete."
}

pull_from_remote() {
  local current_branch=$(git branch --show-current)
  echo "Pulling updates from remote for branch '$current_branch'..."
  git pull origin "$current_branch"
  echo "Pull complete."
}

push_to_remote() {
  local current_branch=$(git branch --show-current)
  echo "Pushing local branch '$current_branch' to remote..."
  git push -u origin "$current_branch"
  echo "Push complete."
}

list_branches() {
  echo "Available branches:"
  git branch
}

switch_branch() {
  echo "Enter branch name to switch to:"
  read -r branch_name

  if git branch --list "$branch_name" > /dev/null; then
    git checkout "$branch_name"
    echo "Switched to branch '$branch_name'."
  else
    echo "Branch '$branch_name' does not exist."
  fi
}

create_new_branch() {
  echo "Enter new branch name:"
  read -r new_branch
  git checkout -b "$new_branch"
  echo "Branch '$new_branch' created and checked out."
}

delete_branch() {
  echo "Enter branch name to delete:"
  read -r del_branch

  if git branch --list "$del_branch" > /dev/null; then
    git branch -d "$del_branch"
    echo "Branch '$del_branch' deleted."
  else
    echo "Branch '$del_branch' does not exist."
  fi
}

reconnect_old_repo() {
  echo "Do you know the remote URL or name? (URL/Name):"
  read -r reconnect_type
  if [ "$reconnect_type" == "URL" ]; then
    echo "Enter the remote URL:"
    read -r reconnect_url
    git remote add origin "$reconnect_url"
  elif [ "$reconnect_type" == "Name" ]; then
    echo "Enter the remote name:"
    read -r reconnect_name
    git remote add origin "git@github.com:$reconnect_name.git"
  else
    echo "Invalid option. Exiting..."
    return 1
  fi
}

manage_stashes() {
  echo "1. Stash Changes"
  echo "2. List Stashes"
  echo "3. Apply Latest Stash"
  echo "4. Pop Stash"
  echo "5. Clear Stashes"
  echo "Enter your choice (1-5):"
  read -r stash_choice

  case "$stash_choice" in
    1)
      echo "Enter a message for the stash (optional):"
      read -r message
      git stash push -m "$message"
      echo "Changes stashed."
      ;;
    2)
      git stash list
      ;;
    3)
      git stash apply
      echo "Stash applied."
      ;;
    4)
      git stash pop
      echo "Stash applied and removed."
      ;;
    5)
      git stash clear
      echo "All stashes cleared."
      ;;
    *)
      echo "Invalid choice!"
      ;;
  esac
}

merge_branches() {
  # Merging is useful when you want to combine the changes from one branch into another.
  echo "Enter the name of the branch you want to merge into the current branch:"
  read -r branch_to_merge

  # Check if the specified branch exists
  if git branch --list "$branch_to_merge" > /dev/null; then
    # Merge the specified branch into the current branch
    git merge "$branch_to_merge"
    echo "Branch '$branch_to_merge' merged into $(git branch --show-current)."
  else
    echo "Branch '$branch_to_merge' does not exist."
  fi
}

view_commit_history() {
  # Viewing the commit history can help you understand the changes made over time.
  echo "Showing commit history for the current branch:"
  # --oneline condenses each commit to a single line, --graph shows a text-based graph of the commits
  git log --oneline --graph
}

rebase_branch() {
  # Rebasing is a way to move or combine a sequence of commits to a new base commit.
  echo "Enter the branch you want to rebase onto:"
  read -r base_branch

  # Check if the base branch exists
  if git branch --list "$base_branch" > /dev/null; then
    # Rebase the current branch onto the specified base branch
    git rebase "$base_branch"
    echo "Current branch rebased onto '$base_branch'."
  else
    echo "Branch '$base_branch' does not exist."
  fi
}

resolve_merge_conflicts() {
  # Merge conflicts happen when Git can't automatically resolve differences in code between two commits.
  # Git will mark the conflicts in the problematic files.
  echo "Attempting to start a merge..."
  git merge

  # Check if there are merge conflicts
  if git ls-files -u | grep -q "^"; then
    echo "There are merge conflicts. Manually resolve them and then run 'git merge --continue'"
  else
    echo "No merge conflicts detected."
  fi
}

cherry_pick_commits() {
  # Cherry-picking allows you to pick a specific commit from one branch and apply it onto another.
  echo "Enter the commit hash you want to cherry-pick:"
  read -r commit_hash

  # Apply the specified commit to the current branch
  git cherry-pick "$commit_hash"
  echo "Commit '$commit_hash' cherry-picked onto $(git branch --show-current)."

  echo "Available options:"
  echo "1. Merge Branches - Combine changes from one branch into another."
  echo "2. View Commit History - Show the commit history of the current branch."
  echo "3. Rebase Branch - Move or combine commits to a new base commit."
  echo "4. Resolve Merge Conflicts - Handle conflicts when Git can't automatically merge."
  echo "5. Cherry-Pick Commits - Apply specific commits from one branch to another."
  # ... other options ...
  echo "Enter your choice:"
  read -r choice

  case "$choice" in
    1)
      merge_branches
      ;;
    2)
      view_commit_history
      ;;
    3)
      rebase_branch
      ;;
    4)
      resolve_merge_conflicts
      ;;
    5)
      cherry_pick_commits
      ;;
    # ... other cases ...
  esac
}

# --- // RESTORE_BRANCH:
restore_branch() {
  # Assuming the Python script is named 'restore_branch.py' and is in the same directory
  python3  ~/.oh-my-zsh/custom/plugins/myfunctions/restore_branch.py
}

revert_to_previous_version() {
    # Display recent actions from the reflog
    echo "Recent actions in the repository:"
    git reflog -10

    # Ask the user to input the reflog entry number
    echo "Enter the reflog entry number you want to revert to (e.g., HEAD@{2}):"
    read -r reflog_entry

    # Confirm the choice
    echo "Do you want to revert to this point? This action is irreversible. (yes/no):"
    read -r confirmation

    if [[ "$confirmation" == "yes" ]]; then
        # Revert to the chosen reflog entry
        if git reset --hard "$reflog_entry"; then
            echo "Reverted to $reflog_entry."
        else
            echo "Failed to revert. Make sure the reflog entry number is correct."
            return 1
        fi
    else
        echo "Revert action canceled."
        return 0
    fi
}

# Main Function
gui() {
  echo "1. Check and generate SSH key"
  echo "2. List current remotes"
  echo "3. Update remote URL"
  echo "4. Switch from HTTPS to SSH"
  echo "5. Fetch from remote"
  echo "6. Pull from remote"
  echo "7. Push to remote"
  echo "8. List branches"
  echo "9. Switch branch"
  echo "10. Create new branch"
  echo "11. Delete branch"
  echo "12. Reconnect old repo"
  echo "13. Manage stashes"
  echo "14. Restore Branch from Commit History"
  echo "Enter your choice (1-14):"
  read -r choice

  case "$choice" in
    1)  check_and_setup_ssh ;;
    2)  list_and_manage_remotes ;;
    3)  update_remote_url ;;
    4)  switch_to_ssh ;;
    5)  fetch_from_remote ;;
    6)  pull_from_remote ;;
    7)  push_to_remote ;;
    8)  list_branches ;;
    9)  switch_branch ;;
    10) create_new_branch ;;
    11) delete_branch ;;
    12) reconnect_old_repo ;;
    13) manage_stashes ;;
    14) restore_branch ;;
    *)  echo "Invalid choice!" ;;
  esac
}

# -------------------------------------------------------------------------- // Title a terminal:
termtitle() {
    # Determine the action based on the argument
    local action="$1"
    local command_title="$2"

    # Function to set terminal title
    set_title() {
        local title="$1"
        case "$TERM" in
            rxvt*|xterm*|nxterm|gnome|screen|screen-*)
                # Standard terminals using escape sequences
                printf '\e]0;%s\a' "$title"
                ;;
            alacritty)
                # Alacritty-specific title setting
                echo -ne "\e]2;$title\a"
                ;;
            *)
                # Fallback for other terminals or when $TERM is not set
                echo "Terminal type '$TERM' not supported for dynamic title setting."
                ;;
        esac
    }

    # Apply the title based on the action
    case "$action" in
        precmd)
            # Title for the prompt display
            set_title "${USER}@${HOSTNAME%%.*}: ${PWD/#$HOME/\~}"
            ;;
        preexec)
            # Title including the command being executed
            set_title "$command_title [${USER}@${HOSTNAME%%.*}: ${PWD/#$HOME/\~}]"
            ;;
    esac
}

# --------------------------------------------------------------- // Run in the background forever:
forever() {
    if command -v "$1" >/dev/null 2>&1; then
        local log_file="${2:-/dev/null}"  # Default to /dev/null if no log file specified

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

# -------------------------------------------------------------------- // Make a dir and cd into it:
mkdircd() {
    if [[ -z "$1" ]]; then
        echo "Usage: mkdircd <directory>"
        return 1
    fi

    if ! mkdir -p "$1"; then
        echo "Failed to create directory: $1"
        return 1
    fi

    if ! cd "$1"; then
        echo "Failed to navigate to directory: $1"
        return 1
    fi  # This closing brace was missing

    echo "Successfully created and navigated to directory: $1"
    return 0
}

# ------------------------------------------------------------------------------- // Note taker:
note() {
    local file="$HOME/Documents/notes/.notes"
    [[ -f $file ]] || touch "$file"

    show_help() {
        echo "Usage: note [option] [arguments]"
        echo "Options:"
        echo "  (no option)    Display all notes"
        echo "  -c             Clear all notes"
        echo "  -r [number]    Display the last 'number' notes (default 10)"
        echo "  -f <YYYY-MM-DD> Filter notes by specific date"
        echo "  -h             Show this help message"
        echo "  <note>         Add a new note with a timestamp"
    }

    if (($#)); then
        case "$1" in
            -c)
                > "$file"
                ;;
            -r)
                local recent_count="${2:-10}"  # Default to last 10 entries if not specified
                tail -n "$recent_count" "$file"
                ;;

            -f)
                local filter_date="$2"
                if [[ -z "$filter_date" || ! $filter_date =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
                echo "Usage: note -f <YYYY-MM-DD>"
                return 1
                fi
                grep "\[$filter_date" "$file"
                ;;
            -h)
                show_help
                ;;
            --)
                shift  # Remove '--' from arguments
                local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
                printf "[%s] %s\n" "$timestamp" "$*" >> "$file"
                ;;
             *)
                if [[ $1 == -* ]]; then
                    echo "Invalid option: $1"
                    show_help
                    return 1
                fi
                local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
                printf "[%s] %s\n" "$timestamp" "$*" >> "$file"
                ;;
        esac
   else
        cat "$file"
    fi
}


# ----------------------------------------------------------------------------- // TRIM_A_VIDEO:
# TRIM_A_VIDEO:
trim() {
    local input_file=$1
    local start_time end_time output_extension

    # Check if file name is provided
    if [[ -z "$input_file" ]]; then
        echo "Please provide a file name."
        return 1
    fi

    # Full path of the input file
    input_file="${PWD%/}/${input_file}"

    # Validate input file
    if [[ ! -f "$input_file" ]]; then
        echo "Input file does not exist."
        return 1
    fi

    # Prompt for start and end times and validate the format
    while true; do
        read -rep "Start time (format HH:MM:SS or SS): " -e start_time
        if [[ $start_time =~ ^([0-9]{2}:)?[0-5]?[0-9]:[0-5][0-9]$ ]]; then
            break
        else
            echo "Invalid start time format."
        fi
    done

    while true; do
        read -rep "End time (format HH:MM:SS or SS): " -e end_time
        if [[ $end_time =~ ^([0-9]{2}:)?[0-5]?[0-9]:[0-5][0-9]$ ]]; then
            break
        else
            echo "Invalid end time format."
        fi
    done

    # Simplify extension handling
    output_extension="${input_file##*.}"

    # FFmpeg command to perform trimming
    ffmpeg -hide_banner -i "$input_file" -ss "$start_time" -to "$end_time" -c copy "trimmed_output.$output_extension"
}

# Example usage: trim "filename.extension"


# --- // SHOW_LENGTH_OF_VIDEO:
length() {
  # Check if ffprobe is installed
  if ! command -v ffprobe &> /dev/null; then
    echo "ffprobe could not be found. Please install it first."
    return 1
  fi

  # Initialize variable
  local video_file="$1"

  # User prompt for missing information
  [ -z "$video_file" ] && read -p "Enter video file name: " video_file

  # Check if video file exists
  if [ ! -f "$video_file" ]; then
    echo "Video file does not exist."
    return 1
  fi

  # Execute ffprobe command
  local duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$video_file")
  if [ $? -eq 0 ]; then
    awk -v duration="$duration" 'BEGIN {
        hours=int(duration/3600);
        minutes=int((duration%3600)/60);
        seconds=int(duration%60);
        printf "%02d:%02d:%02d\n", hours, minutes, seconds
    }'
  else
    echo "Failed to retrieve the length of the video."
    return 1
  fi
}

urldecode() {
    echo "$@" | awk '{gsub(/%([0-9A-Fa-f]{2})/, "\\x\\1"); print}' | xargs -0 echo -e
}

termbin() {
    cat "$1" | nc termbin.com 9999
}
