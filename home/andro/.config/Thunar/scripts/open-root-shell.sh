#!/usr/bin/env bash
# -------------------------------------------------------------------
# File: open_root_terminal.sh
# Description: Opens a root terminal session using the preferred terminal emulator.
# -------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Preferred terminal emulator
TERMINAL="alacritty"

# Function to open terminal with root shell
open_terminal_with_root() {
    case "$TERMINAL" in
        alacritty)
            alacritty -e sudo -i zsh
            ;;
        gnome-terminal)
            gnome-terminal -- sudo -i zsh
            ;;
        xfce4-terminal)
            xfce4-terminal -- sudo -i zsh
            ;;
        kitty)
            kitty sh -c "sudo -i zsh"
            ;;
        foot)
            foot -e sudo -i zsh
            ;;
        *)
            echo "Unsupported terminal emulator: $TERMINAL"
            exit 1
            ;;
    esac
}

# Check if the preferred terminal is installed
if ! command -v "$TERMINAL" &>/dev/null; then
    echo "Preferred terminal '$TERMINAL' not found. Trying alternative terminals..."

    # List of alternative terminals
    alternatives=("gnome-terminal" "xfce4-terminal" "kitty" "foot")

    for alt in "${alternatives[@]}"; do
        if command -v "$alt" &>/dev/null; then
            TERMINAL="$alt"
            echo "Using alternative terminal: $TERMINAL"
            open_terminal_with_root
            exit 0
        fi
    done

    echo "No supported terminal emulator found. Please install one and try again."
    exit 1
fi

# Open terminal with root shell
open_terminal_with_root
