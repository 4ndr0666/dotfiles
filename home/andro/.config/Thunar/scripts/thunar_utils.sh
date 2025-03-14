#!/usr/bin/env bash
# Author: 4ndr0666

# ============ // THUNAR_UTILS.SH //

# Provides functions for:
#   - Terminal launching (open_terminal)
#   - Running commands as root (open_asroot)
#   - Setting wallpaper (set_wallpaper)
#   - Enabling lockscreen (set_lockscreen)
#   - Changing file/directory ownership (change_ownership)
#   - Copying file contents to clipboard (copy_to_clipboard)
#   - Flattening directory structure (move_files_to_parent)
#   - Opening a terminal with a root shell (open_root_shell)
#   - Running a Rofi menu for as-root applications (run_rofi_asroot)
#   - Converting WebP images to PNG (webptopng)
# -----------------------------------------------------------------------------

## Constants

config_dir="$HOME/.config"
openbox_dir="$config_dir/openbox"
bspwm_dir="$config_dir/bspwm"
i3_dir="$config_dir/i3"
qtile_dir="$config_dir/qtile"
herb_dir="$config_dir/herbstluftwm"
berry_dir="$config_dir/berry"
xmonad_dir="$config_dir/xmonad"
bb_dir="$HOME/.blackbox"
cwm_dir="$HOME/.cwm"
ewm_dir="$HOME/.evilwm"
fluxbox_dir="$HOME/.fluxbox"
_2bwm_dir='/usr/share/archcraft/2bwm'
dwm_dir='/usr/share/archcraft/dwm'

sway_dir="$config_dir/sway"
wayfire_dir="$config_dir/wayfire"
river_dir="$config_dir/river"
hypr_dir="$config_dir/hypr"
newm_dir="$config_dir/newm"

# Notification command
notify_cmd="notify-send -i '/usr/share/archcraft/icons/dunst/desktop.png'"

# -------------------------- Terminal Launching -------------------------------
open_terminal() {
    if [[ "$XDG_SESSION_TYPE" == "wayland" ]]; then
        case "$XDG_CURRENT_DESKTOP" in
            sway)
                "$sway_dir/scripts/alacritty" ;;
            wayfire)
                "$wayfire_dir/scripts/alacritty" ;;
            river)
                "$river_dir/scripts/alacritty" ;;
            hyprland|Hyprland)
                "$hypr_dir/scripts/alacritty" ;;
            newm)
                "$newm_dir/scripts/terminal" ;;
            *)
                alacritty ;;
        esac
    else
        case "$DESKTOP_SESSION" in
            openbox)
                alacritty ;;
            bspwm)
                "$bspwm_dir/scripts/bspterm" ;;
            i3)
                "$i3_dir/scripts/i3_term" ;;
            qtile)
                "$qtile_dir/scripts/qtile_term" ;;
            2bwm)
                "$_2bwm_dir/scripts/2bwm_term" ;;
            berry)
                "$berry_dir/scripts/berry_term" ;;
            blackbox)
                "$bb_dir/scripts/bb_term" ;;
            cwm)
                "$cwm_dir/scripts/cwm_term" ;;
            dwm)
                "$dwm_dir/scripts/dwm_term" ;;
            evilwm)
                "$ewm_dir/scripts/evilwm_term" ;;
            fluxbox)
                "$fluxbox_dir/scripts/fbox_term" ;;
            herbstluftwm)
                "$herb_dir/scripts/herb_term" ;;
            xmonad)
                "$xmonad_dir/scripts/xmonad_term" ;;
            *)
                alacritty ;;
        esac
    fi
}

# ------------------------- Run Command as Root -------------------------------
open_asroot() {
    # Usage: open_asroot <command> [arguments...]
    if [[ "$XDG_SESSION_TYPE" == "wayland" ]]; then
        case "$XDG_CURRENT_DESKTOP" in
            sway)
                "$sway_dir/scripts/asroot" "$@" ;;
            wayfire)
                "$wayfire_dir/scripts/asroot" "$@" ;;
            river)
                "$river_dir/scripts/asroot" "$@" ;;
            hyprland|Hyprland)
                "$hypr_dir/scripts/asroot" "$@" ;;
            newm)
                "$newm_dir/scripts/asroot" "$@" ;;
            *)
                ${notify_cmd} -u critical "Open as Root is not available in this Wayland session!" ;;
        esac
    else
        case "$DESKTOP_SESSION" in
            openbox)
                "$openbox_dir/scripts/ob-asroot" "$@" ;;
            bspwm)
                "$bspwm_dir/scripts/bspasroot" "$@" ;;
            i3)
                "$i3_dir/scripts/i3_asroot" "$@" ;;
            qtile)
                "$qtile_dir/scripts/qtile_asroot" "$@" ;;
            2bwm)
                "$_2bwm_dir/scripts/2bwm_asroot" "$@" ;;
            berry)
                "$berry_dir/scripts/berry_asroot" "$@" ;;
            blackbox)
                "$bb_dir/scripts/bb_asroot" "$@" ;;
            cwm)
                "$cwm_dir/scripts/cwm_asroot" "$@" ;;
            dwm)
                "$dwm_dir/scripts/dwm_asroot" "$@" ;;
            evilwm)
                "$ewm_dir/scripts/evilwm_asroot" "$@" ;;
            fluxbox)
                "$fluxbox_dir/scripts/fbox_asroot" "$@" ;;
            herbstluftwm)
                "$herb_dir/scripts/herb_asroot" "$@" ;;
            xmonad)
                "$xmonad_dir/scripts/xmonad_asroot" "$@" ;;
            *)
                ${notify_cmd} -u critical "Open as Root is not available in this X11 session!" ;;
        esac
    fi
}

# ----------------------------- Set Wallpaper ---------------------------------
set_wallpaper() {
    local img="$1"
    if [[ -z "$img" ]]; then
        echo "No wallpaper specified." && return 1
    fi

    if [[ "$XDG_SESSION_TYPE" == "wayland" ]]; then
        case "$XDG_CURRENT_DESKTOP" in
            sway)
                sed -i -e "s|output \* bg.*|output \* bg $img fill|g" "$sway_dir/sway-output"
                pkill swaybg
                swaybg --output '*' --mode fill --image "$img" & ;;
            wayfire)
                sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$wayfire_dir/scripts/wallpaper"
                bash "$wayfire_dir/scripts/wallpaper" & ;;
            river)
                sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$river_dir/scripts/wallpaper"
                bash "$river_dir/scripts/wallpaper" & ;;
            hyprland|Hyprland)
                sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$hypr_dir/scripts/wallpaper"
                bash "$hypr_dir/scripts/wallpaper" & ;;
            newm)
                swaybg --output '*' --mode fill --image "$img" &
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
            *)
                swaybg --output '*' --mode fill --image "$img" &
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
        esac
    else
        case "$DESKTOP_SESSION" in
            openbox)
                for head in {0..10}; do
                    nitrogen --head="$head" --save --set-zoom-fill "$img" &>/dev/null
                done ;;
            bspwm)
                sed -i -e "s|feh.*|feh --no-fehbg --bg-fill '$img'|g" "$HOME/.fehbg"
                bash "$HOME/.fehbg" ;;
            i3)
                if pacman -Q archcraft-i3wm-premium &>/dev/null; then
                    sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$i3_dir/themes/wallpaper.sh"
                    bash "$i3_dir/themes/wallpaper.sh"
                else
                    sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$img'|g" "$i3_dir/scripts/i3_autostart"
                    hsetroot -cover "$img"
                fi ;;
            qtile)
                if pacman -Q archcraft-qtile-premium &>/dev/null; then
                    sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$qtile_dir/themes/wallpaper.sh"
                    bash "$qtile_dir/themes/wallpaper.sh"
                else
                    sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$img'|g" "$qtile_dir/scripts/qtile_autostart"
                    hsetroot -cover "$img"
                fi ;;
            2bwm)
                hsetroot -cover "$img"
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
            berry)
                sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$img'|g" "$berry_dir/scripts/berry_autostart"
                hsetroot -cover "$img" ;;
            blackbox)
                hsetroot -cover "$img"
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
            cwm|dwm|evilwm)
                hsetroot -cover "$img"
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
            fluxbox)
                sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$img'|g" "$fluxbox_dir/startup"
                hsetroot -cover "$img" ;;
            herbstluftwm)
                sed -i -e "s|hsetroot.*|hsetroot -cover '$img'|g" "$herb_dir/scripts/herb_autostart"
                hsetroot -cover "$img" ;;
            xmonad)
                if pacman -Q archcraft-xmonad-premium &>/dev/null; then
                    sed -i -e "s|WALLPAPER=.*|WALLPAPER='$img'|g" "$xmonad_dir/themes/wallpaper.sh"
                    bash "$xmonad_dir/themes/wallpaper.sh"
                else
                    sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$img'|g" "$xmonad_dir/scripts/xmonad_autostart"
                    hsetroot -cover "$img"
                fi ;;
            *)
                hsetroot -cover "$img"
                ${notify_cmd} -u normal "Temporarily applying wallpaper..." ;;
        esac
    fi
}

# ----------------------------- Set Lockscreen --------------------------------
set_lockscreen() {
    local img="$1"
    if [[ "$XDG_SESSION_TYPE" == "wayland" ]]; then
        ${notify_cmd} -u critical "Lockscreen is not supported in Wayland!"
    else
        ${notify_cmd} -u normal "Generating lockscreen images, please wait..."
        betterlockscreen -u "$img"
    fi
}

# ------------------------- Change Ownership ----------------------------------
change_ownership() {
    # Usage: change_ownership <user|root> <files...>
    if [[ $# -lt 2 ]]; then
        echo "Usage: change_ownership <user|root> <files...>" && return 1
    fi

    local mode="$1"
    shift
    case "$mode" in
        user)
            local user=$(id -un)
            local group=$(id -gn)
            pkexec chown -R "$user":"$group" "$@"
            ;;
        root)
            pkexec chown -R root:root "$@"
            ;;
        *)
            echo "Invalid mode. Use 'user' or 'root'." && return 1
            ;;
    esac
}

# -------------------------- Copy to Clipboard -------------------------------
copy_to_clipboard() {
    # Usage: copy_to_clipboard <file>
    local file="$1"
    if [[ ! -f "$file" ]]; then
        notify-send "$(date): $file is not a valid file" && return 1
    fi
    if [[ "$XDG_SESSION_TYPE" == "wayland" ]]; then
        wl-copy < "$file"
        notify-send "✅ Copied $file to clipboard"
    else
        xclip -selection clipboard < "$file"
        notify-send "✅ Copied $file to clipboard using xclip"
    fi
}

# -------------------- Flatten Directory Structure ---------------------------
move_files_to_parent() {
    # Usage: move_files_to_parent <directory>
    if [[ $# -lt 1 ]]; then
        echo "Usage: move_files_to_parent <directory>" && return 1
    fi

    local target_dir="$1"
    if [[ ! -d "$target_dir" ]]; then
        echo "Error: '$target_dir' is not a directory." && return 1
    fi

    cd "$target_dir" || { echo "Failed to change directory to '$target_dir'."; return 1; }
    echo "Moving files from subdirectories to '$target_dir'..."
    find . -mindepth 2 -type f -exec mv -t . -i '{}' +
    echo "Removing empty subdirectories..."
    find . -mindepth 1 -type d -empty -exec rmdir '{}' +
    echo "Directory flattening complete."
}

# ------------------------- Open Root Shell ----------------------------------
open_root_shell() {
    # Launch a terminal with a root shell.
    local preferred_terminal="alacritty"
    if command -v "$preferred_terminal" &>/dev/null; then
        case "$preferred_terminal" in
            alacritty)
                alacritty -e sudo -i zsh ;;
            gnome-terminal)
                gnome-terminal -- sudo -i zsh ;;
            xfce4-terminal)
                xfce4-terminal -- sudo -i zsh ;;
            kitty)
                kitty sh -c "sudo -i zsh" ;;
            foot)
                foot -e sudo -i zsh ;;
            *)
                echo "Unsupported terminal emulator: $preferred_terminal" && return 1 ;;
        esac
    else
        echo "Preferred terminal '$preferred_terminal' not found. Trying alternatives..."
        local alternatives=("gnome-terminal" "xfce4-terminal" "kitty" "foot")
        for alt in "${alternatives[@]}"; do
            if command -v "$alt" &>/dev/null; then
                case "$alt" in
                    gnome-terminal)
                        gnome-terminal -- sudo -i zsh ;;
                    xfce4-terminal)
                        xfce4-terminal -- sudo -i zsh ;;
                    kitty)
                        kitty sh -c "sudo -i zsh" ;;
                    foot)
                        foot -e sudo -i zsh ;;
                esac
                return 0
            fi
        done
        echo "No supported terminal emulator found. Please install one and try again." && return 1
    fi
}

# ------------------------- Rofi As Root Menu --------------------------------
run_rofi_asroot() {
    # Presents a Rofi menu to run selected applications as root.
    local DIR="$HOME/.config/wayfire"
    local RASI="$DIR/rofi/asroot.rasi"
    local ASROOT="$DIR/scripts/asroot"
    local prompt="Root"
    local mesg="Run Applications As Root"
    local term="alacritty --class alacritty-float,alacritty-float --config-file $HOME/.config/wayfire/alacritty/alacritty.toml"

    local layout=$(grep 'USE_ICON' "$RASI" | cut -d'=' -f2)
    local option_1 option_2 option_3 option_4 option_5
    if [[ "$layout" == "NO" ]]; then
        option_1=" Alacritty"
        option_2=" Thunar"
        option_3=" Geany"
        option_4=" Ranger"
        option_5=" Vim"
    else
        option_1=""
        option_2=""
        option_3=""
        option_4=""
        option_5=""
    fi

    rofi_cmd() {
        rofi -dmenu -p "$prompt" -mesg "$mesg" -markup-rows -theme "$RASI"
    }

    local chosen=$(echo -e "$option_1\n$option_2\n$option_3\n$option_4\n$option_5" | rofi_cmd)
    case "$chosen" in
        "$option_1")
            ${ASROOT} "$term" ;;
        "$option_2")
            ${ASROOT} 'dbus-run-session thunar' ;;
        "$option_3")
            ${ASROOT} geany ;;
        "$option_4")
            ${ASROOT} "$term -e ranger" ;;
        "$option_5")
            ${ASROOT} "$term -e vim" ;;
        *)
            notify-send "No valid option selected." ;;
    esac
}

# --------------------------- WebP to PNG Converter ---------------------------
webptopng() {
    # Usage: webptopng <input_file>
    local input_file="$1"
    if [[ -z "$input_file" || ! -f "$input_file" ]]; then
        echo "Invalid input file." && return 1
    fi
    local output_file="${input_file%.*}.png"
    ffmpeg -i "$input_file" "$output_file"
    echo "Converted $input_file to $output_file."
}
