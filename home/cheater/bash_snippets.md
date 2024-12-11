## Auto-escalate:
```bash
# Version 1
if [[ "$EUID" -ne 0 ]]; then
    echo "Re-running the script with sudo privileges..."
    sudo "$0" "$@"
    exit $?
fi

# Version 2
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
```bash
# Explanation of the commands:
`>/dev/null 2>&1` redirects both stdout and stderr to /dev/null, effectively silencing all output.
`2>&1` redirects stderr to wherever stdout is currently going. If stdout is not redirected, both will go to the terminal.
`2>/dev/null` redirects stderr to /dev/null, silencing only the error messages.

# Appropriate usage scenarios:
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

## If-statement Confirmation:  
# Ensure log file is writable
```bash
if ! touch "$logfile" &>/dev/null; then
    echo -e "\033[31mError: Log file '$logfile' is not writable. Please check permissions.\033[0m"
    return 1
fi
```

## Kill and restart:
```bash
killall -p pkgname &> /dev/null
pkgname </dev/null &>/dev/null &
```

## Heredoc:
# Appending to a File
```bash
cat << EOF >> file.txt
The text you want
to append to
file.txt goes here.
EOF

# Overwriting a File
cat << EOF > file.txt
This will overwrite
the content of file.txt
with this new text.
EOF

# Indented Content Using `<<-`
cat <<- EOF > file.txt
    This text is indented in the script
    but will not be indented in file.txt.
EOF
```

## Similar to Heredoc but uses `tee`:
```bash
# Appending with `tee`
tee -a file.txt << EOF
This text will be appended
to the content of file.txt.
EOF

# Overwriting with `tee`
tee file.txt << EOF
This text will overwrite
the content of file.txt.
EOF
```

## Trap:
```bash
trap 'echo -e "\nExiting..."; cleanup; exit 1' SIGINT
```

## Input_validation:
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

## Source_multiple_items_loop:
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
