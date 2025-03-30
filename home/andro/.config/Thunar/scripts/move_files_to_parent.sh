#!/usr/bin/env bash
# -------------------------------------------------------------------
# File: flatten_directory.sh
# Description: Moves all files from subdirectories to the specified directory and removes empty subdirectories.
# -------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Check if at least one argument is passed
if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

TARGET_DIR="$1"

# Check if TARGET_DIR is a directory
if [[ ! -d "$TARGET_DIR" ]]; then
    echo "Error: '$TARGET_DIR' is not a directory."
    exit 1
fi

# Navigate to the target directory
cd "$TARGET_DIR" || { echo "Failed to change directory to '$TARGET_DIR'."; exit 1; }

# Move all files from subdirectories to the current directory
echo "Moving files from subdirectories to '$TARGET_DIR'..."
find . -mindepth 2 -type f -exec mv -t . -i '{}' +

# Remove empty subdirectories
echo "Removing empty subdirectories..."
find . -mindepth 1 -type d -empty -exec rmdir '{}' +

echo "Directory flattening complete."
