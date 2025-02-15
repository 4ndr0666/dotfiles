## Force Posix

```shell
if [ "$(ps -p $$ -ocomm=)" != "sh" ]; then
    exec sh "$0" "$@"
fi
```

## Auto-escalate:

### Method 1:
```shell
if [[ "$EUID" -ne 0 ]]; then
    echo "Re-running the script with sudo privileges..."
    sudo "$0" "$@"
    exit $?
fi
```

### Method 2:
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

## Dev Null:

### Explanation of the commands:
```shell
`>/dev/null 2>&1` redirects both stdout and stderr to /dev/null, effectively silencing all output.
`2>&1` redirects stderr to wherever stdout is currently going. If stdout is not redirected, both will go to the terminal.
`2>/dev/null` redirects stderr to /dev/null, silencing only the error messages.

### Appropriate usage scenarios:
1. `>/dev/null 2>&1` - Use this when you want to completely silence a command, hiding both output and errors.
Example: silencing a background task's output
command >/dev/null 2>&1 &

2. `2>&1` - Use this when you want to combine stderr with stdout. This is often used in pipelines.
Example: combining stderr with stdout to filter or process both
command 2>&1 | grep "some text"

3. `2>/dev/null` - Use this when you want to ignore only error messages while keeping standard output visible.
Example: running a command and ignoring errors but showing output
command 2>/dev/null
```

## Kill and restart:

```shell
killall -p pkgname &> /dev/null
pkgname </dev/null &>/dev/null &
```

## If-statements

```shell
### Basic usage:

if ! touch "$logfile" &>/dev/null; then
    echo -e "\033[31mError: Log file '$logfile' is not writable. Please check permissions.\033[0m"
    return 1
fi

### Alt method:

if [[ "${COMMON_SH_INCLUDED:-}" == "true" ]]; then
    return
fi
export COMMON_SH_INCLUDED=true

## Heredoc:

### Appending to a File

cat << EOF >> file.txt
The text you want
to append to
file.txt goes here.
EOF

### Overwriting a File

cat << EOF > file.txt
This will overwrite
the content of file.txt
with this new text.
EOF

### Indented Content Using `<<-`

cat <<- EOF > file.txt
    This text is indented in the script
    but will not be indented in file.txt.
EOF
```

## Similar to Heredoc but uses `tee`:

```shell
### Creating a File

sudo tee /usr/local/bin/trigger_oom.sh > /dev/null << 'EOF'
#!/bin/bash
echo "f" > /proc/sysrq-trigger
EOF

### Appending to a File

tee -a file.txt << EOF
This text will be appended
to the content of file.txt.
EOF

### Overwriting a File 

tee file.txt << EOF
This text will overwrite
the content of file.txt.
EOF
```

## `Trap`:

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

## Loops

```shell
### Sourcing items:

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

## Debugging

```shell
set -euo pipefail
IFS=$'\n\t'
```

## Logging

```shell
### For a modular setup, define global constants first:

CONFIG_FILE="${CONFIG_FILE:-$HOME/.local/share/4ndr0service/config.json}"
LOG_FILE_DIR_DEFAULT="$HOME/.local/share/logs/4ndr0service/logs"
LOG_FILE_DEFAULT="$LOG_FILE_DIR_DEFAULT/4ndr0service.log"

### Followed by the functions to log data:

json_log() {
    local level="$1"
    local msg="$2"
    local timestamp
    timestamp="$(date '+%Y-%m-%dT%H:%M:%S%z')"
    mkdir -p "${LOG_FILE_DIR:-$LOG_FILE_DIR_DEFAULT}"
    printf '{"timestamp":"%s","level":"%s","message":"%s"}\n' \
    "$timestamp" "$level" "$msg" >> "${LOG_FILE:-$LOG_FILE_DEFAULT}"
}

### Finally, basic error handling:

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
