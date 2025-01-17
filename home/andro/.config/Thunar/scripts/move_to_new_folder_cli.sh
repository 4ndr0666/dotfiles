#!/usr/bin/env bash
# -------------------------------------------------------------------
# File: move_files_to_new_folder.sh
# Description: Prompts user for a new folder name and moves selected files into it.
# -------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Prompt for new folder name
echo "Please enter a name for the new folder:"
read -r NEW_FOLDER

# Check if folder name is not empty
if [[ -z "$NEW_FOLDER" ]]; then
    echo "No folder name entered. Exiting..."
    exit 1
fi

# Create the new folder
if mkdir -p "$NEW_FOLDER"; then
    echo "Moving selected files to $NEW_FOLDER..."
    for f in "$@"; do
        base=$(basename "$f")
        dest="$NEW_FOLDER/$base"
        if [[ -e "$dest" ]]; then
            echo "File '$base' already exists in '$NEW_FOLDER'. Skipping..."
            continue
        fi
        mv "$f" "$dest" && echo "✅ '$base' moved successfully."
    done
else
    echo "Failed to create folder '$NEW_FOLDER'. Exiting..."
    exit 1
fi

echo "File moving complete."
