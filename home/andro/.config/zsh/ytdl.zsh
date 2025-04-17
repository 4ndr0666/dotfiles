#!/usr/bin/env zsh
# Author: 4ndr0666
setopt extended_glob

# ========================== // YTDL.ZSH //  
#

## Config maps
typeset -A YTDLP_COOKIES_MAP=(
  [youtube.com]="$XDG_CONFIG_HOME/yt-dlp/youtube_cookies.txt"
  [youtu.be]="$XDG_CONFIG_HOME/yt-dlp/youtube_cookies.txt"
  [patreon.com]="$XDG_CONFIG_HOME/yt-dlp/patreon_cookies.txt"
  [vimeo.com]="$XDG_CONFIG_HOME/yt-dlp/vimeo_cookies.txt"
  [boosty.to]="$XDG_CONFIG_HOME/yt-dlp/boosty_cookies.txt"
  [instagram.com]="$XDG_CONFIG_HOME/yt-dlp/instagram_cookies.txt"
  [fanvue.com]="$XDG_CONFIG_HOME/yt-dlp/fanvue_cookies.txt"
)

FMT_HD_WEBM="335/315/313/308/303/299/302/271/248/137+bestaudio+bestaudio"

## Helpers 
validate_url() [[ $1 == (#b)(https|http)://* ]]

get_domain_from_url() {
  # returns lower‑case normalized domain
  local u=$1 d=${${u#*://}%%/*}
  d=${d#www.}; d=${d#m.}; print -r -- ${(L)d}
}

get_cookie_path_for_domain() { print -r -- "${YTDLP_COOKIES_MAP[$1]:-}" }

refresh_cookie_file() {
  local domain=$1 file clipboard
  file=$(get_cookie_path_for_domain "$domain") || return 1
  [[ -z $file ]] && { echo "❌ No mapping for $domain"; return 1; }

  if command -v wl-paste >/dev/null;   then clipboard="wl-paste"
  elif command -v xclip >/dev/null;    then clipboard="xclip -selection clipboard -o"
  else echo "❌ Need wl-clipboard or xclip"; return 1
  fi

  echo "➡️  Copy cookie for $domain, press <Enter>…"; read -r
  $clipboard >| "$file" || { echo "❌ Clipboard empty"; return 1; }
  chmod 600 "$file" 2>/dev/null || true
  echo "✅ Cookie saved → $file"
}

prompt_cookie_update() {
  local choice
  if command -v fzf >/dev/null; then
    choice=$(printf '%s\n' ${(@k)YTDLP_COOKIES_MAP} | fzf --prompt="Domain: ")
  else
    select choice in ${(@k)YTDLP_COOKIES_MAP}; do break; done
  fi
  [[ -n $choice ]] && refresh_cookie_file "$choice"
}

#───────────────[ Core commands ]────────────────────
ytdl() {
  # quick download ‑ always tries HD WebM, relies on yt‑dlp fallback
  local use_cookie=0 args=()
  while (( $# )); do
    case $1 in
      -c) use_cookie=1 ;;
      *)  args+=("$1") ;;
    esac; shift
  done

  local url=${args[1]} domain cookie_file
  (( use_cookie )) && {
    domain=$(get_domain_from_url "$url")
    cookie_file=$(get_cookie_path_for_domain "$domain")
  }

  yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
    --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
    -f "$FMT_HD_WEBM" --newline --ignore-config --no-playlist --no-mtime \
    ${cookie_file:+--cookies "$cookie_file"} "${args[@]}" ||
  yt-dlp ${cookie_file:+--cookies "$cookie_file"} "${args[@]}"
}

ytf() {
  # interactive format lister / chooser
  local url=$1; [[ -z $url ]] && { echo "Usage: ytf <URL>"; return 1; }
  validate_url "$url" || { echo "Invalid URL: $url"; return 1; }

  local domain=$(get_domain_from_url "$url")
  local cookie=$(get_cookie_path_for_domain "$domain")
  yt-dlp --list-formats ${cookie:+--cookies "$cookie"} "$url" || {
    echo "⚠️  Could not list formats. Trying cookie update…"
    prompt_cookie_update
    cookie=$(get_cookie_path_for_domain "$domain")
    yt-dlp --list-formats ${cookie:+--cookies "$cookie"} "$url" || {
      echo "❌ Still failing – aborting."; return 1
    }
  }
  echo
  read -r "?Format ID (Enter for default): " fid
  [[ -z $fid ]] && ytdl "$url" || \
  yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
    --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
    -f "$FMT_HD_WEBM" --newline --ignore-config --no-playlist --no-mtime \
    ${cookie:+--cookies "$cookie"} "$url" -f "$fid+bestaudio"
}

attempt_hd_download() {
  local url=$1 cookie=$2 odir=$3; shift 3
  yt-dlp --add-metadata --embed-metadata --external-downloader aria2c \
    --external-downloader-args "aria2c:-c -j8 -x8 -s8 -k2M" \
    -f "$FMT_HD_WEBM" --newline --ignore-config --no-playlist --no-mtime \
    --cookies "$cookie" --output "$odir/%(title)s.%(ext)s" "$url" "$@"
}

#───────────────[ Advanced wrapper ]─────────────────
ytdlc() {
  (( $# )) || { show_ytdlc_help; return; }

  local listfmt=0 odir="$HOME/Downloads" update=0
  typeset -a extra urls
  while (( $# )); do
    case $1 in
      --list-formats|-l) listfmt=1 ;;
      --output-dir|-o) odir=$2; shift ;;
      --update) update=1 ;;
      --help|-h) show_ytdlc_help; return ;;
      -f) extra+=("$1" "$2"); shift ;;
      *) urls+=("$1") ;;
    esac; shift
  done

  (( update )) && { prompt_cookie_update; return; }
  (( ${#urls} )) || { echo "No URLs given."; return 1; }
  mkdir -p "$odir" || { echo "Cannot create $odir"; return 1; }

  local url
  for url in "${urls[@]}"; do
    echo "────────────────────────────────────────"
    validate_url "$url" || { echo "Bad URL: $url"; continue; }

    [[ $url == *youtube.com/embed/* ]] && {
      local id=${url##*/embed/}; id=${id%%\?*}
      url="https://www.youtube.com/watch/${id}"
      echo "➡️  Converted embed → $url"
    }

    local domain=$(get_domain_from_url "$url")
    local cookie=$(get_cookie_path_for_domain "$domain")
    [[ -z $cookie || ! -f $cookie ]] && {
      echo "⚠️  Missing cookie for $domain. Use --update."; continue;
    }
    chmod 600 "$cookie" 2>/dev/null || true

    (( listfmt )) && { ytf "$url"; continue; }

    if [[ $domain == fanvue.com ]]; then
      echo "Fanvue detected – native yt‑dlp."
      yt-dlp --newline --ignore-config --no-playlist --no-mtime \
        --cookies "$cookie" --output "$odir/%(title)s.%(ext)s" "${extra[@]}" "$url"
      continue
    fi

    echo "➡️  Attempting HD WebM download…"
    attempt_hd_download "$url" "$cookie" "$odir" "${extra[@]}" ||
    { echo "HD download failed – falling back."; ytdl "$url" || echo "❌ Fallback also failed."; }
  done
}

#───────────────[ Help ]─────────────────────────────
show_ytdlc_help() {
  cat <<'EOF'
ytdlc – cookie‑aware yt‑dlp wrapper
Usage: ytdlc [opts] URL…

Options:
  -l, --list-formats       list formats then exit
  -o, --output-dir DIR     set output directory (default ~/Downloads)
  --update                 interactive cookie update
  -f ID                    pass -f directly to yt‑dlp (advanced users)
  -h, --help               this help

Checklist flow:
  1. Bookmarklet → ytdl-handler → ytf (terminal)
  2. ytf lists formats using domain cookie
  3. chosen ID gets HD WebM pre‑selection; if absent yt‑dlp decides best
EOF
}
