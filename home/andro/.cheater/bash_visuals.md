# Author: 4ndr0666
# ========================== // BASH VISUALS //

## Colors & Symbols 

**Unicode Style**:
```shell
CYAN="\033[38;2;21;255;255m"
RED="\033[0;31m"
NC="\033[0m"
info="➡️"
good="✔️"
glow() {
  echo -e "["$(date +%F)"]: ${CYAN}➡️ $1${NC}" >/dev/null 2>&1
}
bug() {
  echo -e "["$(date +%F)"]: ${RED}❌ $1${NC}" >/dev/null 2>&1
}
```

**Tput Style**:
```shell
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

## Progress Bars

**Dots**:
```shell
show_progress() {
    local pid=$1
    local package_name=$2
    local spin_chars=("●○○○○○○○○○" "○●○○○○○○○○" "○○●○○○○○○○" "○○○●○○○○○○" "○○○○●○○○○" \
                      "○○○○○●○○○○" "○○○○○○●○○○" "○○○○○○○●○○" "○○○○○○○○●○" "○○○○○○○○○●") 
    local i=0

    tput civis 
    printf "\r${NOTE} Installing ${YELLOW}%s${RESET} ..." "$package_name"

    while ps -p $pid &> /dev/null; do
        printf "\r${NOTE} Installing ${YELLOW}%s${RESET} %s" "$package_name" "${spin_chars[i]}"
        i=$(( (i + 1) % 10 ))  
        sleep 0.3  
    done

    printf "\r${NOTE} Installing ${YELLOW}%s${RESET} ... Done!%-20s \n" "$package_name" ""
    tput cnorm  
}
```

**Interactive Status**:
```shell
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

## Banners

**ASCII Banner**:
```shell
echo -e "\033[34m"
cat << "EOF"
### ART
### HERE
EOF
echo -e "\033[0m"
```

## Menus

**Version 1**:
```shell
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

**Version 2**:
```shell
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

**Version 3**:
```shell
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
