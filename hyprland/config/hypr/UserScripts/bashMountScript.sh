#!/usr/bin/env bash
# Author: 4ndr0666
# === // bashMountScript.sh // === #

file_exists() {
	if [ -e "$1" ]; then
		return 0 # File exists
	else
		return 1 # File does not exist
	fi
}

# Kill already running processes
_ps=(bashmount)
for _prs in "${_ps[@]}"; do
	if pidof "${_prs}" >/dev/null; then
		pkill "${_prs}"
	fi
done

sleep 1
if file_exists "/usr/bin/bashmount"; then
	kitty /usr/bin/bashmount &
fi

exit 0
