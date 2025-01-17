#!/bin/bash
input_file="$1"
output_file="${input_file%.*}.png"
ffmpeg -i "$input_file" "$output_file"
