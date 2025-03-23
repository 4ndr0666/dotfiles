#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ] || [ "$1" = "%u" ]; then
  echo "Error: No valid URL provided. Exiting." >&2
  exit 1
fi

feed="${1#ytdl://}"
if command -v python3 >/dev/null 2>&1; then
  feed_decoded=$(echo "$feed" | python3 -c "import sys, urllib.parse as ul; print(ul.unquote(sys.stdin.read().strip()))")
else
  feed_decoded="$feed"
fi
final_feed="${feed_decoded:-$feed}"

if [[ "$final_feed" =~ youtube\.com/embed/([^?]+) ]]; then
  video_id="${BASH_REMATCH[1]}"
  final_feed="https://www.youtube.com/watch/${video_id}"
elif [[ "$final_feed" =~ youtube\.com/watch\?v=([^&]+) ]]; then
  video_id="${BASH_REMATCH[1]}"
  final_feed="https://www.youtube.com/watch/${video_id}"
fi

echo "✔️ Final feed processed: $final_feed" >&2
#### Launch the dmenuhandler with the processed URL.
exec /usr/local/bin/dmenuhandler "$final_feed"
