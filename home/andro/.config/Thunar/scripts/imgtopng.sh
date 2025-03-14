#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# File: imgtoPNG.sh
# Description: Converts one or more image files to PNG format.
# Author: 4ndr0666 / Refactored by ChatGPT
# Date: 2025-03-13
#
# Usage: imgtoPNG.sh <image-file1> [image-file2 ...]
# -----------------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Display usage instructions
usage() {
    echo "Usage: $0 <image-file1> [image-file2 ...]" >&2
    exit 1
}

# Convert a single image file to PNG format.
convert_to_png() {
    local input_file="$1"

    if [[ ! -f "$input_file" ]]; then
        echo "Error: File '$input_file' does not exist." >&2
        return 1
    fi

    # If the file is already a PNG, skip conversion.
    if [[ "$input_file" =~ \.png$ ]]; then
        echo "File '$input_file' is already in PNG format. Skipping."
        return 0
    fi

    local output_file="${input_file%.*}.png"
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
