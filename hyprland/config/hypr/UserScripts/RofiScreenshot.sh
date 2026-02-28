#!/usr/bin/env bash
# Author: 4ndr0666

# === // RofiScreenshot.sh // === #

## Directories
DIR="${XDG_CONFIG_HOME:-$HOME/.config}"
RASI_COLORS="$DIR/rofi/wallust/colors-rofi.rasi"
RASI_THEME="$DIR/rofi/screenshot.rasi"

## Get Colors
# Uses 'normal-background' for base and 'selected-normal-background' for accent
background="$(grep -E '^\s*normal-background:' "$RASI_COLORS" | cut -d':' -f2 | tr -d ' ;')"
accent="$(grep -E '^\s*selected-normal-background:' "$RASI_COLORS" | cut -d':' -f2 | tr -d ' ;')"

## Theme Elements
prompt='Screenshot'
mesg="Directory :: $HOME/Screenshots"

## Options
# Checks if USE_ICON is set in the theme file, defaults to icons if not found
layout=$(grep 'USE_ICON' "$RASI_THEME" | cut -d'=' -f2 | tr -d ' ')
if [[ "$layout" == 'NO' ]]; then
    option_1=" Capture Desktop"
    option_2=" Capture Area"
    option_3=" Capture Window"
    option_4=" Capture in 5s"
    option_5=" Capture in 10s"
    option_6=" Cancel"
else
    option_1=""
    option_2=""
    option_3=""
    option_4=""
    option_5=""
    option_6=""
fi

## Rofi CMD
rofi_cmd() {
    rofi -dmenu \
        -p "$prompt" \
        -mesg "$mesg" \
        -markup-rows \
        -theme "$RASI_THEME"
}

## Pass variables to rofi dmenu
run_rofi() {
    echo -e "$option_1\n$option_2\n$option_3\n$option_4\n$option_5\n$option_6" | rofi_cmd
}

## Screenshot Geometry & File
time=$(date +%Y-%m-%d-%H-%M-%S)
# Safe check for swaymsg in case you aren't in Sway/Hyprland
if command -v swaymsg &> /dev/null; then
    geometry=$(swaymsg -pt get_outputs | grep 'Current mode:' | cut -d':' -f2 | cut -d'@' -f1 | tr -d ' ')
else
    geometry="Unknown"
fi
dir="$HOME/Screenshots"
file="Screenshot_${time}_${geometry}.png"

## Directory Check
if [[ ! -d "$dir" ]]; then
    mkdir -p "$dir"
fi

## Notify and View
iDIR="${XDG_CONFIG_HOME:-$HOME/.config}/mako/icons"

notify_view() {
    notify_cmd_shot="notify-send -h string:x-canonical-private-synchronous:sys-notify-shot -u low -i ${iDIR}/picture.png"
    ${notify_cmd_shot} "Copied to clipboard."
    # paplay /usr/share/sounds/freedesktop/stereo/screen-capture.oga &>/dev/null &
    
    if [[ -e "$dir/$file" ]]; then
        viewnior "${dir}/$file"
        ${notify_cmd_shot} "Screenshot Saved."
    else
        ${notify_cmd_shot} "Screenshot Deleted."
    fi
}

## Countdown
countdown() {
    for sec in $(seq $1 -1 1); do
        notify-send -h string:x-canonical-private-synchronous:sys-notify-count -t 1000 -i "$iDIR"/timer.png "Taking shot in : $sec"
        sleep 1
    done
}

## Take Shots
shotnow() {
    cd "${dir}" && sleep 0.5 && grim - | tee "$file" | wl-copy
    notify_view
}

shot5() {
    countdown '5'
    sleep 1 && cd "${dir}" && grim - | tee "$file" | wl-copy
    notify_view
}

shot10() {
    countdown '10'
    sleep 1 && cd "${dir}" && grim - | tee "$file" | wl-copy
    notify_view
}

shotwin() {
    cd "${dir}" && grim -g "$(swaymsg -t get_tree | jq -r '.. | select(.focused?) | .rect | "\(.x),\(.y) \(.width)x\(.height)"')" - | tee "$file" | wl-copy
    notify_view
}

shotarea() {
    cd "${dir}" && grim -g "$(slurp -b ${background:1}CC -c ${accent:1}ff -s ${accent:1}0D -w 2 && sleep 0.3)" - | tee "$file" | wl-copy
    notify_view
}

## Execute Command
run_cmd() {
    if [[ "$1" == '--opt1' ]]; then
        shotnow
    elif [[ "$1" == '--opt2' ]]; then
        shotarea
    elif [[ "$1" == '--opt3' ]]; then
        shotwin
    elif [[ "$1" == '--opt4' ]]; then
        shot5
    elif [[ "$1" == '--opt5' ]]; then
        shot10
    elif [[ "$1" == '--opt6' ]]; then
        exit 0
    fi
}

## Actions
chosen="$(run_rofi)"
case ${chosen} in
    $option_1)
        run_cmd --opt1
        ;;
    $option_2)
        run_cmd --opt2
        ;;
    $option_3)
        run_cmd --opt3
        ;;
    $option_4)
        run_cmd --opt4
        ;;
    $option_5)
        run_cmd --opt5
        ;;
    $option_6)
        run_cmd --opt6
        ;;
esac
