#!/usr/bin/env zsh
# Author: 4ndr0666
# =============== // YTDL.ZSH //  (Approx. 220 lines)

## Config Maps
typeset -A YTDLP_COOKIES_MAP=(
  ["youtube.com"]="$HOME/.config/yt-dlp/youtube_cookies.txt"
  ["youtu.be"]="$HOME/.config/yt-dlp/youtube_cookies.txt"
  ["patreon.com"]="$HOME/.config/yt-dlp/patreon_cookies.txt"
  ["vimeo.com"]="$HOME/.config/yt-dlp/vimeo_cookies.txt"
  ["boosty.to"]="$HOME/.config/yt-dlp/boosty_cookies.txt"
  ["instagram.com"]="$HOME/.config/yt-dlp/instagram_cookies.txt"
  ["fanvue.com"]="$HOME/.config/yt-dlp/fanvue_cookies.txt"
)

PREFERRED_FORMATS=("335" "315" "313" "308" "303" "299" "302" "271" "248" "137")

### Validate URL format.
# Checks if the URL begins with http:// or https://.
validate_url() {
  local url="$1"
  case "$url" in
    http://*|https://*) return 0 ;;
    *) return 1 ;;
  esac
}

### Normalize domain.
# Extracts the domain from the URL and forces fanvue domains to "fanvue.com".
get_domain_from_url() {
  local url="$1"
  local domain
  domain=$(echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//; s/^m\.//')
  local lower_domain
  lower_domain=$(echo "$domain" | tr '[:upper:]' '[:lower:]')
  if [ "$lower_domain" = "fanvue.com" ]; then
    echo "fanvue.com"
  else
    echo "$domain"
  fi
}

### Retrieve cookie file path based on domain.
get_cookie_path_for_domain() {
  local domain="$1"
  echo "${YTDLP_COOKIES_MAP[$domain]}"
}

### Refresh cookie file using clipboard.
# Prompts the user to copy the current cookie content and writes it to the mapped cookie file.
refresh_cookie_file() {
  local domain="$1"
  if [ -z "$domain" ]; then
    echo "Usage: refresh_cookie_file <domain>"
    return 1
  fi
  local cookie_file
  cookie_file=$(get_cookie_path_for_domain "$domain")
  if [ -z "$cookie_file" ]; then
    echo "❌ Error: No cookie file mapped for domain '$domain'." >&2
    return 1
  fi
  local clipboard_cmd=""
  if command -v wl-paste >/dev/null 2>&1; then
    clipboard_cmd="wl-paste"
  elif command -v xclip >/dev/null 2>&1; then
    clipboard_cmd="xclip -selection clipboard -o"
  else
    echo "❌ Error: No suitable clipboard utility found. Install 'wl-clipboard' or 'xclip'." >&2
    return 1
  fi
  printf "➡️ Copy current cookie file for '%s' to your clipboard, then press Enter.\n" "$domain"
  read -r
  local clipboard_data
  clipboard_data=$($clipboard_cmd 2>/dev/null || true)
  if [ -z "$clipboard_data" ]; then
    echo "❌ Error: Clipboard is empty or unreadable." >&2
    return 1
  fi
  mkdir -p "$(dirname "$cookie_file")"
  echo "$clipboard_data" > "$cookie_file" || { echo "❌ Error: Could not write to '$cookie_file'." >&2; return 1; }
  chmod 600 "$cookie_file" >/dev/null 2>&1 || echo "❌ Warning: Could not secure '$cookie_file'." >&2
  echo "Cookie file for '$domain' updated successfully!"
}

### Prompt user to update cookies.
# Uses fzf if available for fuzzy selection; otherwise, numeric selection.
prompt_cookie_update() {
  echo "Select the domain to update cookies for:"
  local domains
  if command -v fzf >/dev/null 2>&1; then
    domains=("${(@k)YTDLP_COOKIES_MAP}")
    local selection
    selection=$(printf "%s\n" "${domains[@]}" | fzf --prompt="Domain: ")
    if [ -n "$selection" ]; then
      refresh_cookie_file "$selection"
      return $?
    else
      echo "❌ No selection made." >&2
      return 1
    fi
  else
    if [ -n "${ZSH_VERSION:-}" ]; then
      domains=("${(@k)YTDLP_COOKIES_MAP}")
    else
      domains=( "${!YTDLP_COOKIES_MAP[@]}" )
    fi
    local idx=1
    for d in "${domains[@]}"; do
      echo "  $idx) $d"
      idx=$(( idx + 1 ))
    done
    printf "Enter the number or domain [1-%d]: " $(( idx - 1 ))
    read -r choice
    local domain=""
    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le $(( idx - 1 )) ]; then
      if [ -n "${ZSH_VERSION:-}" ]; then
        domain="${domains[$choice]}"
      else
        domain="${domains[$(( choice - 1 ))]}"
      fi
    else
      for item in "${domains[@]}"; do
        if [ "$item" = "$choice" ]; then
          domain="$item"
          break
        fi
      done
    fi
    if [ -z "$domain" ]; then
      echo "❌ Invalid selection: $choice" >&2
      return 1
    fi
    refresh_cookie_file "$domain"
  fi
}

### Select best format.
# For fanvue.com, forces "best" as default.
select_best_format() {
  local url="$1"
  local cfile="$2"
  local domain
  domain=$(get_domain_from_url "$url")
  if [ "$(echo "$domain" | tr '[:upper:]' '[:lower:]')" = "fanvue.com" ]; then
    echo "best"
    return
  fi
  local formats_json
  formats_json=$(yt-dlp -j --cookies "$cfile" "$url" 2>/dev/null || true)
  if [ -z "$formats_json" ]; then
    echo "best"
    return
  fi
  local fmt
  for fmt in "${PREFERRED_FORMATS[@]}"; do
    if echo "$formats_json" | jq -e --arg f "$fmt" '.formats[] | select(.format_id == $f)' >/dev/null 2>&1; then
      echo "$fmt"
      return
    fi
  done
  echo "best"
}

### Get detailed format information.
get_format_details() {
  local url="$1"
  local cfile="$2"
  local fmtid="$3"
  if [ "$fmtid" = "best" ]; then
    echo "N/A"
    return
  fi
  local out
  out=$(yt-dlp -f "$fmtid" -j --cookies "$cfile" "$url" 2>/dev/null || true)
  if [ -z "$out" ]; then
    echo "N/A"
    return
  fi
  echo "$out" | jq '{format_id, ext, resolution, fps, tbr, vcodec, acodec, filesize}'
}

### ytdl: Quick download.
# Supports -c flag to force using cookies.
ytdl() {
  local use_cookie=0
  local args=()
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -c)
        use_cookie=1; shift ;;
      *)
        args+=("$1"); shift ;;
    esac
  done
  if [ "$use_cookie" -eq 1 ]; then
    local url="${args[0]}"
    if validate_url "$url"; then
      local domain
      domain=$(get_domain_from_url "$url")
      local cookie_file
      cookie_file=$(get_cookie_path_for_domain "$domain")
      if [ -n "$cookie_file" ] && [ -f "$cookie_file" ]; then
        yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
          --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
          -f "335/315/313/308/303/299/271/248/137+bestaudio+bestaudio" \
          --newline --ignore-config --no-playlist --no-mtime \
          --cookies "$cookie_file" "${args[@]}"
        return $?
      fi
    fi
  fi
  yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
    --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
    -f "335/315/313/308/303/299/271/248/137+bestaudio+bestaudio" \
    --newline --ignore-config --no-playlist --no-mtime "${args[@]}"
}

### ytf: Interactive command.
# Lists available formats and prompts for selection. If no input, runs native download.
ytf() {
  if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: ytf <URL>"
    echo "Lists available download formats for the given URL and prompts for the desired format ID."
    return 0
  fi
  local url="$1"
  if [ -z "$url" ]; then
    echo "Usage: ytf <URL>"
    return 1
  fi
  if ! validate_url "$url"; then
    echo "❌ Error: Invalid URL: $url" >&2
    return 1
  fi
  local domain
  domain=$(get_domain_from_url "$url")
  local cookie_file
  cookie_file=$(get_cookie_path_for_domain "$domain")
  local output
  if [ -n "$cookie_file" ] && [ -f "$cookie_file" ]; then
    output=$(yt-dlp --list-formats --cookies "$cookie_file" "$url")
  else
    output=$(yt-dlp --list-formats "$url")
  fi
  echo "$output"
  echo ""
  printf "Enter the desired format ID (press Enter for native selection): "
  read -r format_id
  if [ -z "$format_id" ]; then
    yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
      --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
      --newline --ignore-config --no-playlist --no-mtime \
      --cookies "$cookie_file" "$url"
  else
    yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
      --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
      -f "${format_id}+bestaudio+bestaudio" \
      --newline --ignore-config --no-playlist --no-mtime \
      --cookies "$cookie_file" \
      --output "$HOME/Downloads/%(title)s.%(ext)s" "$url"
  fi
}

### Helper: Advanced download.
attempt_advanced_download() {
  local url="$1"
  local cookie_file="$2"
  local bestf="$3"
  local odir="$4"
  shift 4
  local extra_args=("$@")
  yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
    --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
    -f "${bestf}+bestaudio+bestaudio" \
    --newline --ignore-config --no-playlist --no-mtime \
    --cookies "$cookie_file" \
    --output "${odir}/%(title)s.%(ext)s" "${extra_args[@]}" "$url"
}

### ytdlc: Advanced download with fallback.
# Minimalist design: if fanvue.com, fallback to native yt-dlp.
ytdlc() {
  if [ "$#" -eq 0 ]; then
    show_ytdlc_help
    return 0
  fi
  local listfmt=0
  local odir="$HOME/Downloads"
  local update_mode=0
  typeset -a extra_args
  typeset -a urls
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --list-formats|-l)
        listfmt=1; shift ;;
      --output-dir|-o)
        if [ -n "$2" ] && [ "${2:0:1}" != "-" ]; then
          odir="$2"; shift 2
        else
          echo "❌ Error: --output-dir requires a non-empty argument." >&2
          show_ytdlc_help; return 1
        fi ;;
      --update)
        update_mode=1; shift ;;
      --help|-h)
        show_ytdlc_help; return 0 ;;
      -f)
        if [ -n "$2" ] && [ "${2:0:1}" != "-" ]; then
          extra_args+=("-f" "$2"); shift 2
        else
          echo "❌ Error: -f requires an argument." >&2; return 1
        fi ;;
      -*)
        extra_args+=("$1"); shift ;;
      *)
        urls+=("$1"); shift ;;
    esac
  done
  if [ "$update_mode" -eq 1 ]; then
    prompt_cookie_update
    return 0
  fi
  if [ "${#urls[@]}" -eq 0 ]; then
    echo "❌ No URLs specified." >&2
    show_ytdlc_help; return 1
  fi
  if [ ! -d "$odir" ]; then
    mkdir -p "$odir" || { echo "❌ Error: Could not create '$odir'." >&2; return 1; }
  fi
  for url in "${urls[@]}"; do
    echo "----------------------------------------"
    echo "Analyzing URL: $url"
    if ! validate_url "$url"; then
      echo "❌ Error: Invalid URL: $url" >&2
      continue
    fi
    ### Convert YouTube embed URL if needed.
    if echo "$url" | grep -qE 'youtube\.com/embed/'; then
      video_id=$(echo "$url" | sed -E 's/.*youtube\.com\/embed\/([^?]+).*/\1/')
      url="https://www.youtube.com/watch/${video_id}"
      echo "➡️ Converted embed URL to: $url"
    fi
    local domain
    domain=$(get_domain_from_url "$url")
    local cookie_file
    cookie_file=$(get_cookie_path_for_domain "$domain")
    if [ -z "$cookie_file" ]; then
      echo "❌ Error: No cookie file mapped for domain '$domain'." >&2
      echo "➡️ Use 'ytdlc --update' to add or refresh cookie files."
      continue
    fi
    if [ ! -f "$cookie_file" ]; then
      echo "❌ Cookie file not found at '$cookie_file'." >&2
      echo "➡️ Use 'ytdlc --update' and paste the new cookie for '$domain'."
      continue
    fi
    local perms
    perms=$(stat -c '%a' "$cookie_file" 2>/dev/null || echo "???")
    if [ "$perms" != "600" ]; then
      chmod 600 "$cookie_file" 2>/dev/null || { echo "❌ Warning: Could not secure '$cookie_file'." >&2; }
    else
      echo "Permissions for '$cookie_file' are already set to 600."
    fi
    if [ "$listfmt" -eq 1 ]; then
      echo "➡️ Listing available formats for '$url':"
      ytf "$url"
      echo "----------------------------------------"
      continue
    fi
    local bestf
    bestf=$(select_best_format "$url" "$cookie_file")
    # For fanvue.com, default to native yt-dlp selection.
    if [ "$(get_domain_from_url "$url" | tr '[:upper:]' '[:lower:]')" = "fanvue.com" ]; then
      echo "➡️ Fanvue URL detected; defaulting to native yt-dlp selection."
      yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
        --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
        --newline --ignore-config --no-playlist --no-mtime \
        --cookies "$cookie_file" \
        --output "$odir/%(title)s.%(ext)s" "${extra_args[@]}" "$url"
      echo "----------------------------------------"
      continue
    fi
    printf "✔️ Selected format ID: %s\n" "$bestf"
    if [ "$bestf" != "best" ]; then
      local fmt_info
      fmt_info=$(get_format_details "$url" "$cookie_file" "$bestf")
      echo "Format details:"; echo "$fmt_info"; echo ""
    else
      echo "Format details: N/A"; echo ""
    fi
    echo "➡️ Attempting advanced download for '$url'..."
    attempt_advanced_download "$url" "$cookie_file" "$bestf" "$odir" "${extra_args[@]}"
    local exit_code_adv=$?
    if [ "$exit_code_adv" -eq 0 ]; then
      printf "✔️ Advanced download completed successfully for '%s'.\n" "$url"
    else
      echo "❌ Advanced download failed for '$url'." >&2
      echo "➡️ Falling back to simple download (ytdl)..." >&2
      ytdl "$url"
      local exit_code_simple=$?
      if [ "$exit_code_simple" -eq 0 ]; then
        printf "✔️ Fallback download (ytdl) succeeded for '%s'.\n" "$url"
      else
        echo "❌ Fallback download (ytdl) also failed for '$url'." >&2
        echo -n "➡️ Automatically reattempt advanced download? (max 1 reattempt) (y/n): "
        read -r reattempt_choice
        if echo "$reattempt_choice" | grep -qE '^[Yy]'; then
          yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
            --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
            -f "${bestf}+bestaudio+bestaudio" --merge-output-format webm \
            --newline --ignore-config --no-playlist --no-mtime \
            --cookies "$cookie_file" \
            --output "$odir/%(title)s.%(ext)s" "${extra_args[@]}" "$url"
          if [ "$?" -eq 0 ]; then
            printf "✔️ Reattempt after fallback succeeded for '%s'.\n" "$url"
          else
            echo "❌ Reattempt after fallback failed for '$url'. Skipping." >&2
          fi
        else
          echo "➡️ Skipping re-attempt for '$url'."
        fi
      fi
    fi
    echo "----------------------------------------"
  done
  # Process any remaining extra arguments (if any)
  if [ "$#" -gt 0 ]; then
    for arg in "$@"; do
      if [ "$arg" = "--" ]; then
        shift
        break
      fi
    done
  fi
  if [ "$#" -gt 0 ]; then
    ytdlp_extra_args+=("$@")
  fi
}

### Help for ytdlc.
show_ytdlc_help() {
  cat <<'EOF_HELP'
Usage: ytdlc [options] <URL> [<URL> ...] [yt-dlp options]
Advanced downloads with domain-based cookies, interactive format selection, and fallback logic.

Options:
  --list-formats, -l      Only list available formats, do not download.
  --output-dir, -o <dir>  Specify a custom output directory (default: ~/Downloads).
  --update                Interactively update a cookie file, then exit.
  --help, -h              Show this help text.

Examples:
  ytdlc --update
  ytdlc --list-formats https://youtu.be/abc123
  ytdlc --output-dir /tmp https://patreon.com/page
  ytdlc https://patreon.com/page -f 303
EOF_HELP
}
