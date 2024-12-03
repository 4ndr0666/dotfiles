# --- // Banner:
```bash
echo -e "\033[34m"
cat << "EOF"
# ASCII
# ART
# HERE
EOF
echo -e "\033[0m"
```

# --- // Colors2:
```bash
RED=$(tput setaf 1)
GRN=$(tput setaf 2)
CYA=$(tput setaf 6)
YEL=$(tput setaf 3)
NC=$(tput sgr0)
BOLD=$(tput bold)
UNDERLINE=$(tput smul)
SUCCESS="${GRN}[✓]${NC}"
FAILURE="${RED}[✗]${NC}"
INFO="${CYA}[i]${NC}"
WARNING="${YEL}[!]${NC}"
```

# --- // Colors:
```bash
GRE='\033[0;32m'
BOLD='\033[1m'
RED='\033[0;31m'
NC='\033[0m'
SUCCESS="✔️"
FAILURE="❌"
INFO="➡️"
EXPLOSION="💥"
prominent() {
    echo -e "${BOLD}${GRE}$1${NC}"
}
bug() {
    echo -e "${BOLD}${RED}$1${NC}"
}
```

# --- // Visual_feedback:
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

# --- // Menu:
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

# --- // Menu_logic:
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
