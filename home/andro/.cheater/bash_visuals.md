# Bash Colors & Visual Cheat-Sheet

---

## Colors

### Comprehensive Fallbacks (truecolor, tput, plain text)

```bash
# Force 24-bit color mode if not already set
case "${COLORTERM}" in
  truecolor | 24bit) ;;  # Already OK
  *) export COLORTERM="24bit" ;;  # Set to safe default
esac

# Advanced or Plain Text Color Functions
if command -v tput >/dev/null && [[ -t 1 ]]; then
    GLOW() { printf '%s\n' "$(tput setaf 6)[✔️] $*$(tput sgr0)"; }
    BUG()  { printf '%s\n' "$(tput setaf 1)[❌] $*$(tput sgr0)"; }
    INFO() { printf '%s\n' "$(tput setaf 4)[→]  $*$(tput sgr0)"; }
else
    GLOW() { printf '[OK] %s\n' "$*"; }
    BUG()  { printf '[ERR] %s\n' "$*"; }
    INFO() { printf '[..] %s\n' "$*"; }
fi
````

---

### ANSI & Unicode Symbols

```bash
CYAN="\033[38;2;21;255;255m"
RED="\033[0;31m"
NC="\033[0m"
info="➡️"
good="✔️"
explosion="💥"

glow() {
  echo -e "["$(date +%F)"]: ${CYAN}➡️ $1${NC}"
}

bug() {
  echo -e "["$(date +%F)"]: ${RED}❌ $1${NC}"
}
```

---

## ANSI Colors, Reset & Message

```bash
RED="$(printf '\033[31m')"      GREEN="$(printf '\033[32m')"
ORANGE="$(printf '\033[33m')"   BLUE="$(printf '\033[34m')"
MAGENTA="$(printf '\033[35m')"  CYAN="$(printf '\033[36m')"
WHITE="$(printf '\033[37m')"    BLACK="$(printf '\033[30m')"

reset_color() {
    tput sgr0   # reset attributes
    tput op     # reset color
    return
}

show_msg() {
    if [[ "$1" == '-r' ]]; then
        { echo -e ${RED}"$2"; reset_color; }
    elif [[ "$1" == '-g' ]]; then
        { echo -e ${GREEN}"$2"; reset_color; }
    elif [[ "$1" == '-o' ]]; then
        { echo -e ${ORANGE}"$2"; reset_color; }
    elif [[ "$1" == '-b' ]]; then
        { echo -e ${BLUE}"$2"; reset_color; }
    elif [[ "$1" == '-m' ]]; then
        { echo -e ${MAGENTA}"$2"; reset_color; }
    elif [[ "$1" == '-c' ]]; then
        { echo -e ${CYAN}"$2"; reset_color; }
    fi
}
```

---

### Tput Color Shortcuts

```bash
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

---

## Spinners

### Custom Module To Source

```bash
#!/usr/bin/env bash
# Author: 4ndr0666
# Version: 1.0
# =================== // Spinner Pack //

# Bubble Dots
show_bubble_progress() {
    local pid=$1 label=$2
    local frames=("●○○○○○○○○○" "○●○○○○○○○○" "○○●○○○○○○○" "○○○●○○○○○○" "○○○○●○○○○○" \
                  "○○○○○●○○○○" "○○○○○○●○○○" "○○○○○○○●○○" "○○○○○○○○●○" "○○○○○○○○○●")
    local i=0

    tput civis
    while ps -p "$pid" > /dev/null 2>&1; do
        printf "\r$(tput setaf 4)●  %s %s$(tput sgr0)" "$label" "${frames[i]}"
        sleep 0.15
        i=$(( (i + 1) % ${#frames[@]} ))
    done
    printf "\r$(tput setaf 2)✔️  %s complete$(tput sgr0)%*s\n" "$label" 10 ""
    tput cnorm
}

# Braille Smooth
show_braille_progress() {
    local pid=$1 label=$2
    local frames=("⠋" "⠙" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")
    local i=0

    tput civis
    while ps -p "$pid" > /dev/null 2>&1; do
        printf "\r$(tput setaf 6)⠶  %s %s$(tput sgr0)" "$label" "${frames[i]}"
        sleep 0.1
        i=$(( (i + 1) % ${#frames[@]} ))
    done
    printf "\r$(tput setaf 2)✔️  %s complete$(tput sgr0)%*s\n" "$label" 10 ""
    tput cnorm
}

# Arc Bounce
show_arc_progress() {
    local pid=$1 label=$2
    local frames=("◜" "◠" "◝" "◞" "◡" "◟")
    local i=0

    tput civis
    while ps -p "$pid" > /dev/null 2>&1; do
        printf "\r$(tput setaf 5)↻  %s %s$(tput sgr0)" "$label" "${frames[i]}"
        sleep 0.2
        i=$(( (i + 1) % ${#frames[@]} ))
    done
    printf "\r$(tput setaf 2)✔️  %s complete$(tput sgr0)%*s\n" "$label" 10 ""
    tput cnorm
}
```

* At the top of your test suite or any script:

```bash
source ./spinners.sh
```

* Then, for long-running blocks:

```bash
(sleep 2) &  # Example long task
show_braille_progress $! "Validating YTDLC system"
```

---

## Interactive Status

### Continue Prompt

```bash
visual_feedback() {
    echo -e "\033[1;33m" # Yellow color
    echo "Starting: $1"
    echo -e "\033[0m" # Reset color

    $1

    echo -e "\033[1;32m" # Green color
    echo "$1 completed successfully."
    echo -e "\033[0m" # Reset color
    read -p "Press any key to continue..." -n 1
}
```

---

### Pause Prompt

```bash
pause_prompt() {
    echo -e "$(tput setaf 3)↩️  Press any key to continue...$(tput sgr0)"
    read -n 1 -s
}
```

---

## Banners

### Framed Banner Printer

```bash
frame_banner() {
    local msg=" $* "
    local width=${#msg}
    printf "\n%s\n" "$(printf '%*s' "$width" '' | tr ' ' '=')"
    echo "$msg"
    printf "%s\n\n" "$(printf '%*s' "$width" '' | tr ' ' '=')"
}
```

*Usage: `frame_banner "YTDLC: Welcome to the Installer"`*

---

### Ascii Art

```bash
echo -e "\033[34m"
cat << "EOF"
### ART
### HERE
EOF
echo -e "\033[0m"
```

---

## Menus

### Menu 1

```bash
display_menu() {
    clear
    echo -e "${GRE}======================================================================================="
    echo -e "${GRE}SCRIPTNAME.SH"
    echo -e "${GRE}======================================================================================="
    echo -e "${c0}=============== // ${GRE}Main Menu${c0} // ====================="
    echo "1)"
    echo "10) Exit"
    echo -e "By your command: ${RED}\c"
}
```

---

### Menu 2

```bash
main() {
    echo "==> [1/3] Checking dependencies..."
    check_dependencies

    echo "==> [2/3] Installing ytdl.zsh..."
    install_ytdl_script

    echo "==> Installing minimal bookmarklet script..."
    install_bookmarklet

    echo "==> [3/3] Ensuring .zshrc has source line..."
    check_zshrc

    echo "Done. No manual steps required. Re-open shell to load the new environment."
}
```

---

### Menu 3

```bash
main() {
    while true; do
        display_menu
        read -r command

        if ! validate_input "$command"; then
            continue
        fi

        case "$command" in
            1) visual_feedback "" ;;
            10) echo "Exiting program."; cleanup; exit 0 ;;
            *) echo "Invalid option. Please try again." ;;
        esac
    done
}
```

```
