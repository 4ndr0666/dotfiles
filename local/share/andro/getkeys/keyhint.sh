#!/bin/sh
# "Change keyboard layout in" "~/.config/hypr/hyprland.conf" " " \

yad --width=530 --height=550 \
	--center \
	--fixed \
	--title="Keybindings" \
	--no-buttons \
	--list \
	--column=Key: \
	--column=Description: \
	--column=Command: \
	--timeout=60 \
	--timeout-indicator=right \
	"" "" " MagicsysRq Alt+SysRq+<b/e/f/s/u>" \
	"ESC" "close this app" "" "=" "modkey" "(set mod Mod4)" \
	"+F1" "Play_with_mpv" \
	"+F2" "Joshuto" \
	"+F3" "Micro" \
	"+F4" "Nvim" \
	"+F5" "Flawless-Cut" \
	"+F6" "Losslesscut" \
	"+F7" "Jdownloader" \
	"+F8" "" \
	"+F9" "G" \
	"+F10" "Garuda Welcome" \
	"+F11" "Dmenumedia" \
	"+F12" "Dmenurecord" \
	"+Enter" "Terminal" "(alacritty)" \
	"Ctrl/+Enter" "Full Terminal" "(alacritty)" \
	"+D" "Application Menu" \
	"+R" "Application Runner" \
	"+W" "" "Open Broswer" \
	"+F" "" "Open Files" \
	"+E" "LiteXL" \
	"+Q" "close focused app" "(kill)" \
	"+Ctrl+v" "Scale All Windows" \
	"Print" "Screenshot Interactive" \
	"Shift+Print" "Screenshot in 5sec" \
	"+Print" "Screenshot in 10" \
	"+X" "power-menu" \
	"+Shift+C" "Change theme" \
	"+Shift+F" "Fullscreen" "Toggles to full screen" \
	"+Shift+F5" "Minimize" \
	"+Shift+F6" "Maximize" \
	"+Shift+F7" "Stay On Top" \
	"+Shift+F8" "Sticky" \
	"+Shift+F9" "Push Behind" \
	"+Shift+F10" "Show Desktop" \
	"+Spacebar" "Float" "Toggle windows to float" \
	"+P" "Colorpicker" \
	"+L" "Lockscreen" \
	"+N" "NetowrkManager" \
	"" "" "     Window closed in 60 sec."
