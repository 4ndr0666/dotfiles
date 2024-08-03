```bash
# --- // AUTO_ESCALATE:
if [ "$(id -u)" -ne 0 ]; then
      sudo "$0" "$@"
    exit $?
fi
sleep 1
echo "💀WARNING💀 - you are now operating as root..."
sleep 1
echo
```

```bash
# --- // SOURCE_LOOP:
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

```bash
# --- // COLORS_SYMBOLS_ECHO-FUNCTION:
GREEN='\033[0;32m'
BOLD='\033[1m'
RED='\033[0;31m'
NC='\033[0m' # No Color
SUCCESS="✔️"
FAILURE="❌"
INFO="➡️"
EXPLOSION="💥"
prominent() {
    echo -e "${BOLD}${GREEN}$1${NC}"
}
bug() {
    echo -e "${BOLD}${RED}$1${NC}"
}
```

```bash
# --- // SPINNER:
spinner() {
    local pid=$!
    local delay=0.1
    local spinstr='|/-\\'
    tput civis # Hide cursor
    while kill -0 "$pid" 2>/dev/null; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "      \b\b\b\b\b\b"
    tput cnorm # Show cursor
}
```

```bash
# --- // DEV_NULL:
2>/dev/null
```

```bash
# --- // BANNER:
echo -e "\033[34m"
cat << "EOF"
#
# --- //ASCII_ART//
#
EOF
echo -e "\033[0m"
```
