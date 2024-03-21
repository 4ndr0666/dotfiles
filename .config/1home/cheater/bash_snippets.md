```bash
# --- // AUTO_ESCALATE/COLOR/SPINNER HEADER:
if [ "$(id -u)" -ne 0 ]; then
      sudo "$0" "$@"
    exit $?
fi
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

check_installed() {
    if pacman -Qi "$1" &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# --- // DEV_NULL:
2>/dev/null

# --- // DYNAMIC_COLOR:
GREEN_COLOR='\033[0;32m'
RED_COLOR='\033[0;31m'
NO_COLOR='\033[0m' # No Color

# --- // ECHO_WITH_COLOR:
# Success:
prominent() {
    local message="$1"
    local color="${2:-$GREEN_COLOR}"
    echo -e "${BOLD}${color}$message${NO_COLOR}"
}

# Error:
bug() {
    local message="$1"
    local color="${2:-$RED_COLOR}"
    echo -e "${BOLD}${color}$message${NO_COLOR}"
}

# --- // SYMBOLS:
SUCCESS="✔️"
FAILURE="❌"
INFO="➡️"
EXPLOSION="💥"

# --- // LOGGING:
log() {
    echo "$(date): $1" >> /var/log/r8169_module_script.log
}

# --- // BANNER:
echo -e "\033[34m"
cat << "EOF"
#
# --- //ASCII_ART//
#
EOF
echo -e "\033[0m"
```
