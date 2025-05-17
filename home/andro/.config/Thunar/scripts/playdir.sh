#!/bin/sh
# Author: 4ndr0666
# ======================== // PLAYDIR (POSIX) //
# Description: Stream a directory’s media (and images) to mpv, 
#              without temp files, no Bashisms, #!/bin/sh–compatible.
# Usage: playdir <file|directory> [<image-duration-seconds>]
# ----------------------------------------------
usage() {
    printf 'Usage: %s <file|directory> [image-duration]\n' "$0" >&2
    exit 1
}

## Validate args
[ $# -ge 1 ] || usage

## CD
if [ -d "$1" ]; then
    target="$1"
else
    ### strip filename
    target=$(dirname -- "$1")
fi

## Duration fallback
duration=${2:-5}

cd "$target" || {
    printf 'Error: cannot cd to %s\n' "$target" >&2
    exit 1
}

## Mpv flags
mpv_opts="--profile=playdir"

## Find and pipe into mpv’s stdin‑playlist
exec find . -type f \( \
    -iname '*.mp4'  -o -iname '*.wmv'  -o -iname '*.mkv'  -o \
    -iname '*.avi'  -o -iname '*.mov'  -o -iname '*.mpeg' -o \
    -iname '*.ts'   -o -iname '*.3gp'  -o -iname '*.gif'  -o \
    -iname '*.png'  -o -iname '*.jpg'  -o -iname '*.jpeg' \
\) -print | mpv $mpv_opts --playlist=-
