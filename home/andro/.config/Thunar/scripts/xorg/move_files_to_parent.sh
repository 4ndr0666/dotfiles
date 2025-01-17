#!/bin/bash

# Navigate to the directory passed as the first argument
cd "$1" || exit

# Find and move all files from subdirectories to the current directory
find . -mindepth 2 -type f -exec mv -t . -i '{}' +

# Optionally, remove empty subdirectories after moving files
find . -mindepth 1 -type d -empty -exec rmdir '{}' +
