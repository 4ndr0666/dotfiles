# --- // AUTO_ESCALATE:
```bash
# --- // Simple version:
if [[ "$EUID" -ne 0 ]]; then
    echo "Re-running the script with sudo privileges..."
    sudo "$0" "$@"
    exit $?
fi

# --- // 4ndr0 version:
if [ "$(id -u)" -ne 0 ]; then
      sudo "$0" "$@"
    exit $?
fi
sleep 1
echo "💀WARNING💀 - you are now operating as root..."
sleep 1
echo
```

# --- // DEV_NULL:
```bash
2>/dev/null
```

# --- // KILL_&_RESTART:
```bash
killall -p pkgname $> /dev/null
pkgname </dev/null &>/dev/null &
```

# --- // HEREDOC:
```bash
cat << EOF >> file.txt    # appends to file.txt
The txt you want
to append to
file.txt would
go here.
EOF
```

# --- // LIKE_HEREDOC_W_TEE:
```bash
`tee file.txt <<EOF`      # overwrites file.txt
`tee >> file.txt <<EOF`   # appends to file.txt
The txt you pasted
to overwrite or
append to file.txt
goes here.
EOF
```

# --- // Set_trap_for_SIGINT:
```bash
trap 'echo -e "\nExiting..."; cleanup; exit 1' SIGINT
```

# --- // Input_validation:
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

# --- // Source_multiple_items_loop:
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
