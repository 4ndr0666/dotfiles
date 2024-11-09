#!/bin/bash

echo "Please enter a name for the new folder:"
read -r NEW_FOLDER

if [[ -z "$NEW_FOLDER" ]]; then
    echo "No folder name entered. Exiting..."
    exit 1
fi

if mkdir -p "$NEW_FOLDER"; then
    echo "Moving selected files to $NEW_FOLDER..."
    for f in %F; do
        base=$(basename "$f")
        dest="$NEW_FOLDER/$base"
        if [ -e "$dest" ]; then
            echo "File $base already exists in $NEW_FOLDER. Skipping..."
            continue
        fi
        mv "$f" "$dest" && echo "$base moved successfully."
    done
else
    echo "Failed to create folder $NEW_FOLDER. Exiting..."
    exit 1
fi
