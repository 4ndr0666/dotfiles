#!/usr/bin/env bash
# Version: 2.2.0
# Author: 4ndr0666

set -euo pipefail
# ========================== // YTDL-HANDLER.SH // by 4ndr0666
## Description: Handles the sanitized URLs that are passed via
#               the YTDL:// protocol and passes it to the dmenuhandler.
# --------------------------------------------------------

## Constants

## Dynamic Clipboard

clip() { command -v wl-copy >/dev/null && wl-copy || xclip -selection clipboard -in; }

## Safeguards

[ "$#" -ne 1 ] && {
	printf >&2 '[❌] Error: one URL arg needed\n'
	exit 1
}
[ "$1" = "%u" ] && {
	printf >&2 '[❌] Error: placeholder arg\n'
	exit 1
}

## URL

feed=${1#ytdl://}

## Sanitize

if command -v python3 >/dev/null; then
	feed=$(printf '%s' "$feed" | python3 -c 'import sys, urllib.parse as u; print(u.unquote(sys.stdin.read().strip()))')
fi

case $feed in
*youtube.com/embed/*)
	id=${feed##*/embed/}
	id=${id%%\?*}
	feed="https://www.youtube.com/watch?v=$id"
	;;
*youtu.be/*)
	id=${feed##*/}
	id=${id%%\?*}
	feed="https://www.youtube.com/watch?v=$id"
	;;
esac

## Mini-menu

choice=$(printf '%s\n' 'copy url' ytf mpv cancel | dmenu -i -p 'ytdl:')

case "$choice" in
'copy url') printf '%s' "$feed" | wl-copy ;;
ytf) setsid -f "$TERMINAL" -e zsh -ic "ytf '$feed'; read -r -p '\nPress ENTER…'" ;;
mpv) setsid -f mpv -quiet "$feed" >/dev/null 2>&1 ;;
*) : ;;
esac
