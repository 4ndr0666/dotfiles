#!/usr/bin/env bash
# -------------------------------------------------------------------
# File: change_owner_to_root.sh
# Description: Changes ownership of specified files/directories to root:root.
# -------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Check if at least one argument is passed
if [[ $# -eq 0 ]]; then
    echo "No files specified."
    exit 1
fi

# Change ownership to root:root using pkexec
pkexec chown -R root:root "$@"
