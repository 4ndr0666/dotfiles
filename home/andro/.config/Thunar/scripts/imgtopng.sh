#!/usr/bin/env bash
# Author: 4ndr0666
set -euo pipefail
IFS=$'\n\t'
# =================== // IMGTOPNG.SH //
## Usage: imgtoPNG.sh <image-file1> [image-file2 ...]
# -----------------------------------------------

usage() {
    echo "Usage: $0 <image-file1> [image-file2 ...]" >&2
    exit 1
}

generate_unique_output_filename() {
    # Ensure the function receives exactly one argument.
    if [[ $# -ne 1 ]]; then
        echo "Internal error: generate_unique_output_filename requires exactly one argument." >&2
        exit 1
    fi

    local input_file="$1"
    local base_name="${input_file%.*}" # Remove extension
    local output_extension=".png"
    local candidate_filename="${base_name}${output_extension}"
    local counter=1

    # Check if the initial candidate filename exists.
    # If it does, append a counter until a non-existent filename is found.
    while [[ -e "$candidate_filename" ]]; do
        candidate_filename="${base_name}_${counter}${output_extension}"
        ((counter++))
    done

    # Output the determined unique filename.
    echo "$candidate_filename"
}

convert_to_png() {
    # Ensure the function receives exactly one argument.
    if [[ $# -ne 1 ]]; then
        echo "Internal error: convert_to_png requires exactly one argument." >&2
        return 1
    fi

    local input_file="$1"
    local output_file # Declare output_file before assignment

    # Check if the input file exists and is a regular file.
    if [[ ! -f "$input_file" ]]; then
        echo "Error: Input file '$input_file' does not exist or is not a regular file." >&2
        return 1
    fi

    # Use a case-insensitive check for PNG extension to skip unnecessary conversion.
    shopt -s nocasematch
    if [[ "$input_file" =~ \.png$ ]]; then
        echo "File '$input_file' is already in PNG format. Skipping."
        shopt -u nocasematch # Turn off nocasematch immediately after use
        return 0
    fi
    shopt -u nocasematch # Ensure nocasematch is off if the above check wasn't met

    # Generate a unique output filename.
    # Command substitution correctly captures the output of the function.
    output_file=$(generate_unique_output_filename "$input_file")

    echo "Converting '$input_file' to '$output_file'..."

    # Use ffmpeg to perform the conversion.
    # -hide_banner: Suppress ffmpeg version and build information.
    # -loglevel error: Only show errors from ffmpeg itself.
    # -i "$input_file": Specify the input file.
    # "$output_file": Specify the output file.
    # The exit status of ffmpeg is checked directly by the 'if' statement.
    if ffmpeg -hide_banner -loglevel error -i "$input_file" "$output_file"; then
        echo "Conversion successful: '$output_file'"
        return 0 # Explicitly return 0 on success
    else
        # ffmpeg failed, print an error message.
        echo "Error: Conversion failed for '$input_file'." >&2
        return 1 # Explicitly return 1 on failure
    fi
}

if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "Error: ffmpeg is not installed or not found in the system's PATH." >&2
    echo "Please install ffmpeg and try again." >&2
    exit 1
fi

if [[ $# -lt 1 ]]; then
    usage # Display usage and exit if no arguments are given.
fi

for file in "$@"; do
    # Call the conversion function for each file.
    # set -e will cause the script to exit if convert_to_png returns non-zero.
    convert_to_png "$file"
done

exit 0
