#!/bin/sh
# Author: 4ndr0666
# ================== // SHELLART.SH //
## Description: pick one random “animal” script 
# and execute it on terminal launch.
# ------------------------------------

## Constants
SOURCE_DIR="/usr/share/archcraft/scripts/animals"

## Validate
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Warning: directory '$SOURCE_DIR' not found." >&2
    exit 1
fi

## Shuffle file selection quietly 
selected=""
selected=$(find "$SOURCE_DIR" -type f 2>/dev/null | shuf -n1)

## Validate
if [ -z "$selected" ]; then
    echo "Warning: no scripts in '$SOURCE_DIR'." >&2
    exit 1
fi

## Chmod
if [ ! -x "$selected" ]; then
    chmod +x "$selected" >/dev/null 2>&1 || {
        echo "Error: cannot make '$selected' executable." >&2
        exit 1
    }
fi
exec "$selected"
