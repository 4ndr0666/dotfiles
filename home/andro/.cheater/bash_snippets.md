# Bash Snippets by 4ndr0666

## Tput

```shell
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
```

## Avoid Filename Expansion

```shell
set -f
```

## Force POSIX

```shell
if [ "$(ps -p $$ -ocomm=)" != "sh" ]; then
    exec sh "$0" "$@"
fi
```

## Kill and restart

```shell
killall -p pkgname &> /dev/null
pkgname </dev/null &>/dev/null &
```

## TRAP for cleanup

```shell
trap 'echo -e "\nExiting..."; cleanup; exit 1' SIGINT
```

## Validate Input

```shell
validate_input() {
    if [[ $1 =~ ^[0-9]+$ ]] && [ $1 -ge 1 ] && [ $1 -le 17 ]; then
        return 0
    else
        echo "Invalid input. Please enter a number between 1 and 17."
        return 1
    fi
}
```

## Shell Script Debugging

```shell
set -euo pipefail
IFS=$'\n\t'
```

---

## Auto-escalate

### Method 1

```shell
if [[ "$EUID" -ne 0 ]]; then
    echo "Re-running the script with sudo privileges..."
    sudo "$0" "$@"
    exit $?
fi
```

### Method 2

```shell
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

```shell
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

```shell
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

```shell
if [ "$(id -u)" -ne 0 ]; then
    printf 'Re‑running with sudo privileges…\n' >&2
    exec sudo sh "$0" "$@"
fi
```

### Method 6 (POSIX)

```shell
[ "$(id -u)" -eq 0 ] || exec sudo sh "$0" "$@"
```

## Dev Null

### Explanation of the commands

1. `>/dev/null 2>&1`: redirects both stdout and stderr to /dev/null, effectively silencing all output.

2. `2>&1`: redirects stderr to wherever stdout is currently going. If stdout is not redirected, both will go to the terminal.

3. `2>/dev/null`: redirects stderr to /dev/null, silencing only the error messages.

## Usage

### Silence background task output

1. `>/dev/null 2>&1` - Use this when you want to completely silence a command, hiding both output and errors.
*Example*: `command >/dev/null 2>&1 &`

### Combine stderr & stdout to filter or process both

2. `2>&1` - Use this when you want to combine stderr with stdout. This is often used in pipelines.
*Example*: `command 2>&1 | grep "some text"`

### Run cmd & ignore errors but parse output

3. `2>/dev/null` - Use this when you want to ignore only error messages while keeping standard output visible.
*Example*: `command 2>/dev/null`

---

## If-statements

### If-statement 1

```shell
if ! touch "$logfile" &>/dev/null; then
    echo -e "\033[31mError: Log file '$logfile' is not writable. Please check permissions.\033[0m"
    return 1
fi
```

### If-statement 2

```shell
if [[ "${COMMON_SH_INCLUDED:-}" == "true" ]]; then
    return
fi
export COMMON_SH_INCLUDED=true
```

### If-statement 3

```shell
if ! echo f | sudo tee /proc/sysrq-trigger >/dev/null; then
  echo "Failed to trigger OOM Killer."
  exit 1
fi
```

---

## Heredoc

### Appending to a File

```shell
cat << EOF >> file.txt
The text you want
to append to
file.txt goes here.
EOF
```

### Overwriting a File

```shell
cat << EOF > file.txt
This will overwrite
the content of file.txt
with this new text.
EOF
```

### Indented Content Using `<<-`

```shell
cat <<- EOF > file.txt
    This text is indented in the script
    but will not be indented in file.txt.
EOF
```

---

## Heredoc using `tee`

### Creating a File

```shell
sudo tee /usr/local/bin/trigger_oom.sh > /dev/null << 'EOF'
#!/bin/bash
echo "f" > /proc/sysrq-trigger
EOF
```

### Appending to a File

```shell
tee -a file.txt << EOF
This text will be appended
to the content of file.txt.
EOF
```

### Overwriting a File

```shell
tee file.txt << EOF
This text will overwrite
the content of file.txt.
EOF
```

---

## Loops

### Sourcing items

```shell
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

## Cherry Pick Directories

### If you want only `bin` subdirectories, you can do

```shell
if [[ -d "$scr_dir/bin" ]]; then ...; fi
```

---

## Logging

### For a modular setup, define global constants first

```shell
CONFIG_FILE="${CONFIG_FILE:-$HOME/.local/share/4ndr0service/config.json}"
LOG_FILE_DIR_DEFAULT="$HOME/.local/share/logs/4ndr0service/logs"
LOG_FILE_DEFAULT="$LOG_FILE_DIR_DEFAULT/4ndr0service.log"
```

### Followed by the functions to log data

```shell
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

### Finally, basic error handling

```shell
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

## Realpath

### Realpath 1

```shell
: "${PKG_PATH:=$(dirname "$(dirname "$(realpath "$0")")")}"

                                                    ^-- [traverses two levels up a dir or `../../`]
```

1. `realpath "$0"`: Resolves the absolute path of the current script.
2. `dirname "$(realpath "$0")"`: Gets the directory containing the script.
3. `dirname "$(dirname "$(realpath "$0")")"`: Moves one directory up from that location (i.e., two levels up from the script).
4. `"${PKG_PATH:=...}"`: Uses parameter expansion to set `PKG_PATH` only if it isn’t already defined.

### Realpath 2

```shell
: "${PKG_PATH:=$(dirname $(realpath "$0")")}"
                                        ^-- [traverses one level up or `../`]

```

1. `realpath "$0"`: Resolves the absolute path of the current script.
2. `dirname "$(realpath "$0")"`: Gets the directory containing the script.
3. `dirname "$(dirname "$(realpath "$0")"`: Moves one directory up from the script).
4. `"${PKG_PATH:=...}"`: Uses parameter expansion to set `PKG_PATH` only if it isn’t already defined.

### Realpath 3

```shell
rootpath() {
	if [[ -L "$0" ]]; then
	    dirname "$(readlink $0)"
	else
	    dirname "$0"
	fi
}

DIR="$(rootpath)"
```

### Realpath 4

```shell
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
