# Author: 4ndr0666
# ======================= // CLEAN.ZSH //
## Description: This script hold a series of utilities for clean up
#               files names, suffixes, prefixes, etc.
# ---------------------------------------------

## Delete Duplicate Files By Suffix

rmdupes_suffix() {
# Usage: rmdupes_suffix "/tardis" (Dryrun by default)
#        -f for actual deletion.
    local force=0
    local dir="."
    if [[ "$1" == "-h" || "$1" == "--help" ]]; then
        echo "Usage: remove_duplicate_numbered_videos [-f] [directory]"
        echo "  -f         Actually delete files (default is dry-run)"
        echo "  directory  Directory to search (default: current)"
        return 0
    fi

    for arg in "$@"; do
        case "$arg" in
            -f)
                force=1
                ;;
            *)
                dir="$arg"
                ;;
        esac
    done

    find "$dir" -type f -regextype posix-extended \
        -regex '.* [0-9]+\.mp4$' | while IFS= read -r file; do
        if (( force )); then
            echo "[DELETING] $file"
            rm -- "$file"
        else
            echo "[DRY-RUN] Would remove: $file"
        fi
    done
}

## Cln

cln() {
    ## Description: Uses ZSH globbibg to match all files/dirs
    #               recursively that contain a space. Restricted to
    #               regular files and dirs only. Removes all spaces
    #               from the name.
    ## Usage: sanitize_filenames 1
    emulate -L zsh
    setopt extended_glob
    local file dir base ext base_noext new candidate n dryrun="${1:-0}"
    local -i renamed=0 skipped=0 failed=0

    for file in **/*(DNOn); do
      dir="${file:h}"
      base="${file:t}"
      ext="${base:e}"
      base_noext="${base:r}"

      # 1. Sanitize base (no extension)
      new="${base_noext//[^A-Za-z0-9._-]/_}"

      # 2. Collapse multiple underscores
      while [[ "$new" == *__* ]]; do
        new="${new//__/_}"
      done

      # 3. Remove leading/trailing underscores
      new="${new##_}"
      new="${new%%_}"
      new="${new%%.}"

      # 4. Restore extension
      [[ -n "$ext" && "$ext" != "$new" ]] && candidate="${new}.${ext}" || candidate="$new"

      # 5. Avoid collision: auto-increment if needed
      n=1
      while [[ -e "${dir:+$dir/}$candidate" && "$file" != "${dir:+$dir/}$candidate" ]]; do
        candidate="${new}_$n"
        [[ -n "$ext" ]] && candidate="${candidate}.${ext}"
        ((n++))
      done

      local final="${dir:+$dir/}$candidate"

      # 6. No-op if same
      [[ "$file" == "$final" ]] && continue

      # 7. Perform rename or dry-run
      if (( dryrun )); then
        echo "DRY-RUN: '$file' → '$final'"
      else
        if mv -- "$file" "$final"; then
          echo "Renamed: '$file' → '$final'"
          ((renamed++))
        else
          echo "FAIL: Could not rename '$file' → '$final'"
          ((failed++))
        fi
      fi
    done
  echo "---"
  echo "Summary: $renamed renamed, $skipped skipped, $failed failed"
}
