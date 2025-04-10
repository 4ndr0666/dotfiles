#!/bin/bash
# Author: 4ndr0666
# ============================= // EXEC.SH //

## Description: This script ensures that the application is not already running
##              and, if not, launches it in the background and records its PID in a file.
##              Adjust the APP_NAME and PIDDIR as needed.
## ---------------------------------------------

## Global Variables/Paths

APP_PATH="$1" # Full path to your application binary
shift         # Remove APP_PATH from the argument list
APP_NAME="$(basename "$APP_PATH")"
PIDDIR="/tmp"
PIDFILE="${PIDDIR}/${APP_NAME}.pid"
FORCE_RESTART=false

## Display Usage

if [ -z "$APP_PATH" ]; then
	echo "Usage: $0 <APP_PATH> [arguments...]" >&2
	exit 1
fi

## Idempotentcy

is_running() {
	if [ -f "$PIDFILE" ]; then
		PID=$(cat "$PIDFILE")
		if kill -0 "$PID" 2>/dev/null; then
			return 0 # running
		else
			echo "Stale PID file $PIDFILE found. Removing..." >&2
			rm -f "$PIDFILE"
		fi
	fi
	return 1 # not running
}

## Validation

#### Check for binary
if ! command -v "$APP_PATH" >/dev/null 2>&1; then
	echo "Error: Cannot find application '$APP_PATH' in PATH or as absolute path." >&2
	exit 1
fi

#### Check app name
if is_running; then
	echo "$APP_NAME is already running (PID $(cat "$PIDFILE"))." >&2
	exit 0
fi

#### Check for CLI flags
if [ "$1" = "--restart" ] || [ "$1" = "-r" ]; then
	FORCE_RESTART=true
	shift
fi

## Main

if $FORCE_RESTART && [ -f "$PIDFILE" ]; then
	kill "$(cat "$PIDFILE")" 2>/dev/null
	rm -f "$PIDFILE"
	sleep 1
fi

nohup "$APP_PATH" "$@" >/dev/null 2>&1 & # NOHUP(detaches from terminal) ensures process when term closed.
PID=$!
echo $PID >"$PIDFILE"
echo "$APP_NAME started with PID $PID."

#### TRAP to remove the PID file if this wrapper is used as a persistent launcher.
#### Note: if the application runs independently, this trap will only remove the PID file when the wrapper exits.
# trap "rm -f $PIDFILE" EXIT
