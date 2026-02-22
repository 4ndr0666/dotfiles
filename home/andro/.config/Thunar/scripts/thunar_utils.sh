#!/usr/bin/env bash
# Author: 4ndr0666

# ============ // THUNAR_UTILS.SH //

## X11

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

## Wayland

sway_dir="$config_dir/sway"
wayfire_dir="$config_dir/wayfire"
river_dir="$config_dir/river"
hypr_dir="$config_dir/hypr"
newm_dir="$config_dir/newm"

## Notification

notify_cmd="notify-send -i '/usr/share/archcraft/icons/dunst/desktop.png'"

## Terminal

open_terminal() {
	if [[ "$XDG_SESSION_TYPE" == 'wayland' ]]; then
		if [[ "$XDG_CURRENT_DESKTOP" == 'sway' ]]; then
			"$sway_dir"/scripts/alacritty
		elif [[ "$XDG_CURRENT_DESKTOP" == 'wayfire' ]]; then
			"$wayfire_dir"/scripts/alacritty
		elif [[ "$XDG_CURRENT_DESKTOP" == 'river' ]]; then
			"$river_dir"/scripts/alacritty
		elif [[ "$XDG_CURRENT_DESKTOP" == 'hyprland' || "$XDG_CURRENT_DESKTOP" == 'Hyprland' ]]; then
			"$hypr_dir"/scripts/alacritty
		elif [[ "$XDG_CURRENT_DESKTOP" == 'newm' ]]; then
			"$newm_dir"/scripts/terminal
		else
			alacritty
		fi
	else
		if [[ "$DESKTOP_SESSION" == 'openbox' ]]; then
			alacritty
		elif [[ "$DESKTOP_SESSION" == 'bspwm' ]]; then
			"$bspwm_dir"/scripts/bspterm
		elif [[ "$DESKTOP_SESSION" == 'i3' ]]; then
			"$i3_dir"/scripts/i3_term
		elif [[ "$DESKTOP_SESSION" == 'qtile' ]]; then
			"$qtile_dir"/scripts/qtile_term
		elif [[ "$DESKTOP_SESSION" == '2bwm' ]]; then
			"$_2bwm_dir"/scripts/2bwm_term
		elif [[ "$DESKTOP_SESSION" == 'berry' ]]; then
			"$berry_dir"/scripts/berry_term
		elif [[ "$DESKTOP_SESSION" == 'blackbox' ]]; then
			"$bb_dir"/scripts/bb_term
		elif [[ "$DESKTOP_SESSION" == 'cwm' ]]; then
			"$cwm_dir"/scripts/cwm_term
		elif [[ "$DESKTOP_SESSION" == 'dwm' ]]; then
			"$dwm_dir"/scripts/dwm_term
		elif [[ "$DESKTOP_SESSION" == 'evilwm' ]]; then
			"$ewm_dir"/scripts/evilwm_term
		elif [[ "$DESKTOP_SESSION" == 'fluxbox' ]]; then
			"$fluxbox_dir"/scripts/fbox_term
		elif [[ "$DESKTOP_SESSION" == 'herbstluftwm' ]]; then
			"$herb_dir"/scripts/herb_term
		elif [[ "$DESKTOP_SESSION" == 'xmonad' ]]; then
			"$xmonad_dir"/scripts/xmonad_term
		else
			alacritty
		fi
	fi
}

## Open as root

open_asroot() {
	if [[ "$XDG_SESSION_TYPE" == 'wayland' ]]; then
		if [[ "$XDG_CURRENT_DESKTOP" == 'sway' ]]; then
			"$sway_dir"/scripts/asroot "$@"
		elif [[ "$XDG_CURRENT_DESKTOP" == 'wayfire' ]]; then
			"$wayfire_dir"/scripts/asroot "$@"
		elif [[ "$XDG_CURRENT_DESKTOP" == 'river' ]]; then
			"$river_dir"/scripts/asroot "$@"
		elif [[ "$XDG_CURRENT_DESKTOP" == 'hyprland' || "$XDG_CURRENT_DESKTOP" == 'Hyprland' ]]; then
			"$hypr_dir"/scripts/asroot "$@"
		elif [[ "$XDG_CURRENT_DESKTOP" == 'newm' ]]; then
			"$newm_dir"/scripts/asroot "$@"
		else
			${notify_cmd} -u critical "Open as Root feature is not available!"
		fi
	else
		if [[ "$DESKTOP_SESSION" == 'openbox' ]]; then
			"$openbox_dir"/scripts/ob-asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'bspwm' ]]; then
			"$bspwm_dir"/scripts/bspasroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'i3' ]]; then
			"$i3_dir"/scripts/i3_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'qtile' ]]; then
			"$qtile_dir"/scripts/qtile_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == '2bwm' ]]; then
			"$_2bwm_dir"/scripts/2bwm_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'berry' ]]; then
			"$berry_dir"/scripts/berry_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'blackbox' ]]; then
			"$bb_dir"/scripts/bb_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'cwm' ]]; then
			"$cwm_dir"/scripts/cwm_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'dwm' ]]; then
			"$dwm_dir"/scripts/dwm_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'evilwm' ]]; then
			"$ewm_dir"/scripts/evilwm_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'fluxbox' ]]; then
			"$fluxbox_dir"/scripts/fbox_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'herbstluftwm' ]]; then
			"$herb_dir"/scripts/herb_asroot "$@"
		elif [[ "$DESKTOP_SESSION" == 'xmonad' ]]; then
			"$xmonad_dir"/scripts/xmonad_asroot "$@"
		else
			${notify_cmd} -u critical "Open as Root feature is not available!"
		fi
	fi
}

## Set wallpaper

set_wallpaper() {
	if [[ "$XDG_SESSION_TYPE" == 'wayland' ]]; then
		if [[ "$XDG_CURRENT_DESKTOP" == 'sway' ]]; then
			sed -i -e "s|output \* bg.*|output \* bg $@ fill|g" "$sway_dir"/sway-output
			pkill swaybg && swaybg --output '*' --mode fill --image "$@" &
		elif [[ "$XDG_CURRENT_DESKTOP" == 'wayfire' ]]; then
			sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$wayfire_dir"/scripts/wallpaper
			bash "$wayfire_dir"/scripts/wallpaper &
		elif [[ "$XDG_CURRENT_DESKTOP" == 'river' ]]; then
			sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$river_dir"/scripts/wallpaper
			bash "$river_dir"/scripts/wallpaper &
		elif [[ "$XDG_CURRENT_DESKTOP" == 'hyprland' || "$XDG_CURRENT_DESKTOP" == 'Hyprland' ]]; then
			sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$hypr_dir"/scripts/wallpaper
			bash "$hypr_dir"/scripts/wallpaper &
		elif [[ "$XDG_CURRENT_DESKTOP" == 'newm' ]]; then
			swaybg --output '*' --mode fill --image "$@" &
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		else
			swaybg --output '*' --mode fill --image "$@" &
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		fi
	else
		if [[ "$DESKTOP_SESSION" == 'openbox' ]]; then
			for head in {0..10}; do
				nitrogen --head="$head" --save --set-zoom-fill "$@" &>/dev/null
			done
		elif [[ "$DESKTOP_SESSION" == 'bspwm' ]]; then
			sed -i -e "s|feh.*|feh --no-fehbg --bg-fill '$@'|g" "$HOME"/.fehbg
			bash "$HOME"/.fehbg
		elif [[ "$DESKTOP_SESSION" == 'i3' ]]; then
			if [[ `pacman -Q archcraft-i3wm-premium` ]]; then
				sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$i3_dir"/themes/wallpaper.sh
				bash "$i3_dir"/themes/wallpaper.sh
			else
				sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$@'|g" "$i3_dir"/scripts/i3_autostart
				hsetroot -cover "$@"
			fi
		elif [[ "$DESKTOP_SESSION" == 'qtile' ]]; then
			if [[ `pacman -Q archcraft-qtile-premium` ]]; then
				sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$qtile_dir"/themes/wallpaper.sh
				bash "$qtile_dir"/themes/wallpaper.sh
			else
				sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$@'|g" "$qtile_dir"/scripts/qtile_autostart
				hsetroot -cover "$@"
			fi
		elif [[ "$DESKTOP_SESSION" == '2bwm' ]]; then
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		elif [[ "$DESKTOP_SESSION" == 'berry' ]]; then
			sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$@'|g" "$berry_dir"/scripts/berry_autostart
			hsetroot -cover "$@"
		elif [[ "$DESKTOP_SESSION" == 'blackbox' ]]; then
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		elif [[ "$DESKTOP_SESSION" == 'cwm' ]]; then
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		elif [[ "$DESKTOP_SESSION" == 'dwm' ]]; then
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		elif [[ "$DESKTOP_SESSION" == 'evilwm' ]]; then
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		elif [[ "$DESKTOP_SESSION" == 'fluxbox' ]]; then
			sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$@'|g" "$fluxbox_dir"/startup
			hsetroot -cover "$@"
		elif [[ "$DESKTOP_SESSION" == 'herbstluftwm' ]]; then
			sed -i -e "s|hsetroot.*|hsetroot -cover '$@'|g" "$herb_dir"/scripts/herb_autostart
			hsetroot -cover "$@"
		elif [[ "$DESKTOP_SESSION" == 'xmonad' ]]; then
			if [[ `pacman -Q archcraft-xmonad-premium` ]]; then
				sed -i -e "s|WALLPAPER=.*|WALLPAPER='$@'|g" "$xmonad_dir"/themes/wallpaper.sh
				bash "$xmonad_dir"/themes/wallpaper.sh
			else
				sed -i -e "s|hsetroot -cover.*|hsetroot -cover '$@'|g" "$xmonad_dir"/scripts/xmonad_autostart
				hsetroot -cover "$@"
			fi
		else
			hsetroot -cover "$@"
			${notify_cmd} -u normal "Temporarily applying wallpaper..."
		fi
	fi
}

## Set lockscreen

set_lockscreen() {
	if [[ "$XDG_SESSION_TYPE" == 'wayland' ]]; then
		${notify_cmd} -u critical "Not supported in Wayland!"
	else
		${notify_cmd} -u normal "Generating Images, Please wait..."
		betterlockscreen -u "$@"
	fi
}

## Change Ownership

change_ownership() {
    ### Usage: change_ownership <user|root> <files...>
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

## Copy to Clipboard

copy_to_clipboard() {
    ### Usage: copy_to_clipboard <file>
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

## Flatten Directory Structure

move_files_to_parent() {
    ### Usage: move_files_to_parent <directory>
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

## Open Root Shell

open_root_shell() {
    ### Launch a terminal with a root shell.
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

## Rofi As Root Menu

run_rofi_asroot() {
    # Presents a Rofi menu to run selected applications as root.
    local DIR="$HOME/.config/wayfire"
    local RASI="$DIR/rofi/asroot.rasi"
    local ASROOT="$DIR/scripts/asroot"
    local prompt="Root"
    local mesg="Run Applications As Root"
    local term="alacritty --config-file $HOME/.config/wayfire/alacritty/alacritty.toml"
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
            ${ASROOT} nvim ;;
        "$option_4")
            ${ASROOT} "$term -e lf" ;;
        "$option_5")
            ${ASROOT} "$term -e nvim" ;;
        *)
            notify-send "No valid option selected." ;;
    esac
}

if [[ "$1" == '--terminal' ]]; then
	open_terminal
elif [[ "$1" == '--asroot' ]]; then
	open_asroot "$2"
elif [[ "$1" == '--wallpaper' ]]; then
	set_wallpaper "$2"
elif [[ "$1" == '--lockscreen' ]]; then
	set_lockscreen "$2"
elif [[ "$1" == '--user_ownership' ]]; then
        change_owenership user "$2"
elif [[ "$1" == '--root_ownership' ]]; then
        change_owenership root "$2"
elif [[ "$1" == '--move' ]]; then
	move_files_to_parent "$2"
elif [[ "$1" == '--clipboard' ]]; then
	copy_to_clipboard "$2"
fi
