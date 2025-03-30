#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# File: imgtoPNG.sh
# Description: Converts one or more image files to PNG format.
#              Ensures idempotency by generating a unique output filename if
#              a file with the default name already exists.
# Author: 4ndr0666 / Refactored by ChatGPT
# Date: 2025-03-13
#
# Usage: imgtoPNG.sh <image-file1> [image-file2 ...]
# -----------------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Check if ffmpeg is installed.
command -v ffmpeg >/dev/null 2>&1 || { 
    echo "Error: ffmpeg is not installed. Please install ffmpeg and try again." >&2
    exit 1
}

# Display usage instructions.
usage() {
    echo "Usage: $0 <image-file1> [image-file2 ...]" >&2
    exit 1
}

# Generate a unique output filename by appending a numeric suffix if needed.
generate_unique_output_filename() {
    local input_file="$1"
    local base="${input_file%.*}"
    local ext=".png"
    local candidate="${base}${ext}"
    local counter=1

    while [[ -e "$candidate" ]]; do
        candidate="${base}_${counter}${ext}"
        ((counter++))
    done

    echo "$candidate"
}

# Convert a single image file to PNG format.
convert_to_png() {
    local input_file="$1"

    if [[ ! -f "$input_file" ]]; then
        echo "Error: File '$input_file' does not exist." >&2
        return 1
    fi

    # Use a case-insensitive check for PNG extension.
    shopt -s nocasematch
    if [[ "$input_file" =~ \.png$ ]]; then
        echo "File '$input_file' is already in PNG format. Skipping."
        shopt -u nocasematch
        return 0
    fi
    shopt -u nocasematch

    local output_file
    output_file=$(generate_unique_output_filename "$input_file")
    echo "Converting '$input_file' to '$output_file'..."

    # Use ffmpeg to convert the file.
    if ffmpeg -hide_banner -loglevel error -i "$input_file" "$output_file"; then
        echo "Conversion successful: '$output_file'"
    else
        echo "Error: Conversion failed for '$input_file'" >&2
        return 1
    fi
}

# Ensure at least one file is provided.
if [[ $# -lt 1 ]]; then
    usage
fi

# Process each input file.
for file in "$@"; do
    convert_to_png "$file"
done
