#!/usr/bin/env bash
# -------------------------------------------------------------------
# File: change_owner_to_user.sh
# Description: Changes ownership of specified files/directories to the current user.
# -------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# Get current user and group
USER=$(id -un)
GROUP=$(id -gn)

# Check if at least one argument is passed
if [[ $# -eq 0 ]]; then
    echo "No files specified."
    exit 1
fi

# Use pkexec to change ownership to current user
pkexec chown -R "$USER":"$GROUP" "$@"
