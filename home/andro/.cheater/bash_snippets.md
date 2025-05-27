# Bash Snippets by 4ndr0666

---

## Tput Color Variables

```bash
clear
OK="$(tput setaf 2)[OK]$(tput sgr0)"
ERROR="$(tput setaf 1)[ERROR]$(tput sgr0)"
NOTE="$(tput setaf 3)[NOTE]$(tput sgr0)"
INFO="$(tput setaf 4)[INFO]$(tput sgr0)"
WARN="$(tput setaf 1)[WARN]$(tput sgr0)"
CAT="$(tput setaf 6)[ACTION]$(tput sgr0)"
MAGENTA="$(tput setaf 5)"
ORANGE="$(tput setaf 214)"
WARNING="$(tput setaf 1)"
YELLOW="$(tput setaf 3)"
GREEN="$(tput setaf 2)"
BLUE="$(tput setaf 4)"
SKY_BLUE="$(tput setaf 6)"
RESET="$(tput sgr0)"
````

---

## Avoid Filename Expansion

```bash
set -f
```

---

## Force POSIX Shell

```bash
if [ "$(ps -p $$ -ocomm=)" != "sh" ]; then
    exec sh "$0" "$@"
fi
```

---

## Kill and Restart a Program

```bash
killall -p pkgname &> /dev/null
pkgname </dev/null &>/dev/null &
```

---

## TRAP for Cleanup on Ctrl+C

```bash
trap 'echo -e "\nExiting..."; cleanup; exit 1' SIGINT
```

---

## Validate Input

```bash
validate_input() {
    if [[ $1 =~ ^[0-9]+$ ]] && [ $1 -ge 1 ] && [ $1 -le 17 ]; then
        return 0
    else
        echo "Invalid input. Please enter a number between 1 and 17."
        return 1
    fi
}
```

---

## Shell Script Debugging Best Practice

```bash
set -euo pipefail
IFS=$'\n\t'
```

---

## Auto-Escalate Privileges

### Method 1

```bash
if [[ "$EUID" -ne 0 ]]; then
    echo "Re-running the script with sudo privileges..."
    sudo "$0" "$@"
    exit $?
fi
```

### Method 2

```bash
if [ "$(id -u)" -ne 0 ]; then
    sudo "$0" "$@"
    exit $?
fi
sleep 1
echo "💀WARNING💀 - you are now operating as root..."
sleep 1
echo
```

### Method 3

```bash
if [ ! -x "$(realpath "$0")" ]; then
  echo "Warning: Script '$(realpath "$0")' is not executable. Attempting to set executable permission..."
  if ! chmod +x "$(realpath "$0")"; then
    echo "Failed to set executable permission. Please run: sudo chmod +x $(realpath "$0")"
    exit 126
  fi
  exec "$0" "$@"
fi
```

### Method 4

```bash
if [ "$EUID" -ne 0 ]; then
    echo "Re-running the script with sudo privileges..."
    if ! sudo "$0" "$@"; then
        echo "Failed to escalate privileges. Exiting..."
        exit 1
    fi
    exit 0
fi
```

### Method 5 (POSIX)

```bash
if [ "$(id -u)" -ne 0 ]; then
    printf 'Re-running with sudo privileges…\n' >&2
    exec sudo sh "$0" "$@"
fi
```

### Method 6 (Short POSIX)

```bash
[ "$(id -u)" -eq 0 ] || exec sudo sh "$0" "$@"
```

---

## /dev/null Redirection Patterns

### Explanation

1. `>/dev/null 2>&1` — Redirects both stdout and stderr to `/dev/null`, silencing all output.
2. `2>&1` — Redirects stderr to stdout. Both go to terminal if stdout is not redirected.
3. `2>/dev/null` — Redirects only stderr to `/dev/null`.

### Usage

* **Silence background task output:**

  ```bash
  command >/dev/null 2>&1 &
  ```

* **Combine stderr & stdout for processing:**

  ```bash
  command 2>&1 | grep "some text"
  ```

* **Ignore errors, parse output:**

  ```bash
  command 2>/dev/null
  ```

---

## If-Statements

### If-Statement: Logfile Writable

```bash
if ! touch "$logfile" &>/dev/null; then
    echo -e "\033[31mError: Log file '$logfile' is not writable. Please check permissions.\033[0m"
    return 1
fi
```

### If-Statement: Common Include Guard

```bash
if [[ "${COMMON_SH_INCLUDED:-}" == "true" ]]; then
    return
fi
export COMMON_SH_INCLUDED=true
```

### If-Statement: OOM Killer

```bash
if ! echo f | sudo tee /proc/sysrq-trigger >/dev/null; then
  echo "Failed to trigger OOM Killer."
  exit 1
fi
```

---

## Heredoc Patterns

### Appending to a File

```bash
cat << EOF >> file.txt
The text you want
to append to
file.txt goes here.
EOF
```

### Overwriting a File

```bash
cat << EOF > file.txt
This will overwrite
the content of file.txt
with this new text.
EOF
```

### Indented Content Using `<<-`

```bash
cat <<- EOF > file.txt
    This text is indented in the script
    but will not be indented in file.txt.
EOF
```

---

## Heredoc using `tee`

### Creating a File

```bash
sudo tee /usr/local/bin/trigger_oom.sh > /dev/null << 'EOF'
#!/bin/bash
echo "f" > /proc/sysrq-trigger
EOF
```

### Appending to a File

```bash
tee -a file.txt << EOF
This text will be appended
to the content of file.txt.
EOF
```

### Overwriting a File

```bash
tee file.txt << EOF
This text will overwrite
the content of file.txt.
EOF
```

---

## Loops

### Sourcing Files in a Directory

```bash
source_dir="/dir/to/search/in"
zsh_files_found=false

while IFS= read -r file; do
    zsh_files_found=true
    source "$file"
    echo "Sourced $file successfully."
done < <(find "$source_dir" -type f)

if [ "$zsh_files_found" = false ]; then
    echo "Warning: No files found in $source_dir."
fi
```

---

## Cherry-Pick Directories

Only do something if a `bin` subdirectory exists:

```bash
if [[ -d "$scr_dir/bin" ]]; then
    # your code here
fi
```

---

## Logging Framework (Minimal JSON Example)

### Define Global Constants

```bash
CONFIG_FILE="${CONFIG_FILE:-$HOME/.local/share/4ndr0service/config.json}"
LOG_FILE_DIR_DEFAULT="$HOME/.local/share/logs/4ndr0service/logs"
LOG_FILE_DEFAULT="$LOG_FILE_DIR_DEFAULT/4ndr0service.log"
```

### Logging Functions

```bash
json_log() {
    local level="$1"
    local msg="$2"
    local timestamp
    timestamp="$(date '+%Y-%m-%dT%H:%M:%S%z')"
    mkdir -p "${LOG_FILE_DIR:-$LOG_FILE_DIR_DEFAULT}"
    printf '{"timestamp":"%s","level":"%s","message":"%s"}\n' \
    "$timestamp" "$level" "$msg" >> "${LOG_FILE:-$LOG_FILE_DEFAULT}"
}
```

### Error Handling and Info/Warning

```bash
handle_error() {
    local error_message="$1"
    json_log "ERROR" "$error_message"
    echo -e "\033[0;31m❌ Error: $error_message\033[0m" >&2
    exit 1
}
log_info() {
    local message="$1"
    json_log "INFO" "$message"
}
log_warn() {
    local message="$1"
    json_log "WARN" "$message"
    echo -e "\033[1;33m⚠️ Warning: $message\033[0m"
}
```

---

## Realpath Patterns

### Realpath (Two Levels Up)

```bash
: "${PKG_PATH:=$(dirname "$(dirname "$(realpath "$0")")")}"
# ^-- [traverses two levels up: ../../]
```

* `realpath "$0"`: Absolute path of the current script.
* `dirname "$(realpath "$0")"`: Directory containing the script.
* `dirname "$(dirname "$(realpath "$0")")"`: One up from that location.

### Realpath (One Level Up)

```bash
: "${PKG_PATH:=$(dirname $(realpath "$0"))}"
# ^-- [traverses one level up: ../]
```

### Realpath via Function (L-aware)

```bash
rootpath() {
    if [[ -L "$0" ]]; then
        dirname "$(readlink "$0")"
    else
        dirname "$0"
    fi
}
DIR="$(rootpath)"
```

### Realpath via BASH\_SOURCE

```bash
rootpath() {
    local source="${BASH_SOURCE[0]:-$0}"
    if [[ -L "$source" ]]; then
        dirname "$(readlink "$source")"
    else
        dirname "$source"
    fi
}
DIR="$(rootpath)"
```

```
