#!/usr/bin/env bash

# GDK BACKEND. Force wayland for Hyprland compatibility
BACKEND=wayland

# Check if rofi or yad is running and kill them if they are
if pidof rofi > /dev/null; then
  pkill rofi
fi

if pidof yad > /dev/null; then
  pkill yad
fi

# ==============================================================================
# DATA PAYLOAD: Array implementation guarantees syntax integrity and prevents
# line-continuation (\) breaking during copy/paste operations.
# ==============================================================================
GDK_BACKEND=$BACKEND yad \
    --center \
    --title="Brave Keybinds" \
    --no-buttons \
    --list \
    --column=Key: \
    --column=Description: \
    --column=Command: \
    --timeout-indicator=bottom \
     "===⦑💀Ψ•-⦑" "" "⦒-•Ψ 💀⦒===" \
"F1" "Settings" "(Show performance Settings)" \
"F2" "History" "(Show history)" \
"F3" "Bookmarks" "(Show bookmarks)" \
"F4" "Extensions" "(Manage extensions)" \
"F5" "Reload" "(Normal reload)" \
"F6" "Stop" "(Stop site loading)" \
"F7" "Split" "(Open in split view)" \
"F8" "Unsplit" "(Unsplit tabs)" \
"F9" "Inspect" "(Dev tools inspect)" \
"F10" "Console" "(Javascript console)" \
"F11" "Fullscreen" "(FS)" \
"F12" "Dev Tools" "(Toggle)" \
"" "" ""\
