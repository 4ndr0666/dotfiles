#!/usr/bin/env bash
# Author: 4ndr0666
set -euo pipefail
IFS=$'\n\t'
# ======================== // IMGTOJPEG.SH //
## Description: Converts one or more image files to JPEG format using ffmpeg.
#              Ensures idempotency by generating a unique output filename if
#              a file with the default name already exists.
## Usage:      imgtojpeg.sh <image-file1> [image-file2 ...]
# -----------------------------------------------------------------

if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "Error: ffmpeg is not installed. Please install ffmpeg and try again." >&2
    exit 1
fi

usage() {
    echo "Usage: $0 <image-file1> [image-file2 ...]" >&2
    exit 1
}

generate_unique_output_filename() {
    local input_file="$1"
    # Get the base name without the extension.
    local base="${input_file%.*}"
    local ext=".jpeg"
    # Initial candidate filename.
    local candidate="${base}${ext}"
    local counter=1

    # Loop until a non-existent filename is found.
    while [[ -e "$candidate" ]]; do
        candidate="${base}_${counter}${ext}"
        ((counter++))
    done

    # Output the unique filename.
    echo "$candidate"
}

convert_to_jpeg() {
    local input_file="$1"

    # Check if the input file exists and is a regular file.
    if [[ ! -f "$input_file" ]]; then
        echo "Error: File '$input_file' does not exist or is not a regular file." >&2
        return 1
    fi

    # Use a case-insensitive check for JPEG extension.
    # Save current shopt state and restore later.
    local shopt_nocasematch_state
    shopt_nocasematch_state=$(shopt -p nocasematch)
    shopt -s nocasematch

    # Check if the file already has a .jpeg extension (case-insensitive).
    if [[ "$input_file" =~ \.jpeg$ ]]; then
        echo "File '$input_file' is already in JPEG format. Skipping."
        # Restore shopt state.
        eval "$shopt_nocasematch_state"
        return 0
    fi

    # Restore shopt state.
    eval "$shopt_nocasematch_state"

    # Generate a unique output filename.
    local output_file
    output_file=$(generate_unique_output_filename "$input_file")

    echo "Converting '$input_file' to '$output_file'..."

    # Use ffmpeg to convert the file.
    # -hide_banner: Suppress ffmpeg startup banner.
    # -loglevel error: Only show error messages from ffmpeg.
    # -i "$input_file": Specify the input file.
    # "$output_file": Specify the output file.
    if ffmpeg -hide_banner -loglevel error -i "$input_file" "$output_file"; then
        echo "Conversion successful: '$output_file'"
        return 0
    else
        echo "Error: Conversion failed for '$input_file'" >&2
        return 1
    fi
}

if [[ $# -lt 1 ]]; then
    usage
fi

for file in "$@"; do
    # Call the conversion function for each file.
    # set -e will cause the script to exit if convert_to_jpeg returns non-zero.
    convert_to_jpeg "$file"
done

exit 0
