## --- // Banner:

```bash
echo -e "\033[34m"
cat << "EOF"
# ASCII
# ART
# HERE
EOF
echo -e "\033[0m"
```

## --- // Colors:

```bash
CYAN="\033[38;2;21;255;255m"  
GRE="\033[0;32m"
BOLD="\033[1m"
RED="\033[0;31m"
NC="\033[0m"
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

## --- // Visual_feedback:

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

## --- // Menus:

#### Style 1
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

#### Style 2
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

## --- // Menu_logic:

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
