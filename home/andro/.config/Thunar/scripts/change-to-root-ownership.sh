#!/bin/bash

# Check if at least one argument is passed
if [ $# -eq 0 ]; then
	echo "No files specified."
	exit 1
fi

# Execute chown to change ownership to root:root for specified files/directories
pkexec chown -R root:root "$@"
