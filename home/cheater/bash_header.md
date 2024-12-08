#!/bin/bash

# --- // Auto_escalate:
if [ "$(id -u)" -ne 0 ]; then
    sudo "$0" "$@"
    exit $?
fi

# --- // Colors:
GRE="\033[32m" # Green
RED="\033[31m" # Red
c0="\033[0m"    # Reset color

# --- // Input_validation:
validate_input() {
    if [[ $1 =~ ^[0-9]+$ ]] && [ $1 -ge 1 ] && [ $1 -le 17 ]; then
        return 0
    else
        echo "Invalid input. Please enter a number between 1 and 17."
        return 1
    fi
}

# --- // Visual_feedback:
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

# --- // Set_trap_for_SIGINT:
trap 'echo -e "\nExiting..."; cleanup; exit 1' SIGINT

# --- // Cleanup_tasks:
cleanup () {
        # Cleanup tasks go here
	echo "Performing cleanup tasks..."
}

# --- // Menu:
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

# --- // Menu_logic:
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

# --- // Execute:
main
