#!/bin/bash
# copy_to_clipboard.sh

FILE="$1"

if [ ! -f "$FILE" ]; then
	echo "$(date): $FILE is not a valid file" >>~/thunar_copy_to_clip.log
	exit 1
fi

# Determine session type and copy to clipboard accordingly
if [ "$XDG_SESSION_TYPE" = "wayland" ]; then
	wl-copy <"$FILE"
	echo "$(date): Copied $FILE to clipboard using wl-copy (Wayland)" >>~/thunar_copy_to_clip.log
elif [ "$XDG_SESSION_TYPE" = "x11" ]; then
	xclip -selection clipboard <"$FILE"
	echo "$(date): Copied $FILE to clipboard using xclip (Xorg)" >>~/thunar_copy_to_clip.log
else
	echo "$(date): Unknown session type, unable to copy $FILE to clipboard" >>~/thunar_copy_to_clip.log
fi
