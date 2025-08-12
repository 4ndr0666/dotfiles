#!/usr/bin/zsh
# Author: 4ndr0666
# Version: 1.3.0 · Date: 2025.08.11
# ytdlc – yt-dlp wrapper with max-quality auto-pick, SABR support, fzf picker, cookies, aria2c, archive

# ── Logging ─────────────────────────────────────────────────
typeset -f GLOW >/dev/null || GLOW(){ print "[✔] $*"; }
typeset -f BUG  >/dev/null || BUG(){  print "[✖] $*"; }
typeset -f INFO >/dev/null || INFO(){ print "[→] $*"; }

# ── Cookie Mapping ──────────────────────────────────────────
typeset -A YTDLP_COOKIES_MAP=(
  [boosty.to]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/boosty_cookies.txt
  [dzen.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/dzen.cookies.txt
  [fanvue.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/fanvue_cookies.txt
  [instagram.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/instagram_cookies.txt
  [patreon.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/patreon_cookies.txt
  [redgifs.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/redgifs_cookies.txt
  [vimeo.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/vimeo_cookies.txt
  [youtube.com]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/youtube_cookies.txt
  [youtu.be]=${XDG_CONFIG_HOME:-$HOME/.config}/yt-dlp/youtube_cookies.txt
)

for p in ${(v)YTDLP_COOKIES_MAP}; do [[ -e $p ]] || { : >|"$p"; chmod 600 "$p"; }; done

# ── Helpers ─────────────────────────────────────────────────
validate_url() [[ $1 == http*://* ]]
get_domain_from_url(){ local r=${1#*://}; r=${r%%/*}; r=${r#www.}; r=${r#m.}; print -r -- ${r:l}; }
get_cookie(){ print -r -- "${YTDLP_COOKIES_MAP[$1]}"; }

prompt_cookie_update(){
  local domain cookie grab
  print "Select domain to refresh cookie:"
  if command -v fzf >/dev/null; then
    domain=$(print -rl -- ${(k)YTDLP_COOKIES_MAP} | fzf --prompt="Domain: ")
  else
    print -rl -- ${(k)YTDLP_COOKIES_MAP} | nl -ba
    read -r "?Choice: " domain
  fi
  [[ -n $domain ]] || return 1
  cookie=$(get_cookie "$domain") || return 1
  printf "Copy cookie for %s then press ENTER… " "$domain"; read -r _
  grab=$(command -v wl-paste || echo 'xclip -selection clipboard -o')
  eval "$grab" >| "$cookie" && chmod 600 "$cookie"
  GLOW "Cookie updated for $domain"
}

# ── Global yt-dlp knobs (max quality + graceful fallback) ──
# Order: prefer AV1 > VP9.2 > VP9 > H.264; then highest resolution; then fps; then total bitrate; then filesize.
# Notes:
#  - Use 'codec:' keys broadly to handle vcodec field differences across sites.
#  - Keep res/fps first to always take the visually best stream even if bitrate tags lie.
#  - Force sort so yt-dlp does not override with its internal quality heuristics.
typeset -a YTDLP_MAX_SORT=( -S 'res,fps,codec:av1,codec:vp9.2,codec:vp9,codec:h264,tbr,filesize' --format-sort-force )

# Universal best format expression:
#   1) Prefer bestvideo*+bestaudio (DASH/SABR etc.), 2) else fall back to "best" single stream.
typeset -a YTDLP_MAX_FORMAT=( -f 'bv*+ba/b' )

# Always verify formats are downloadable. Include YT duplicate listing to expose SABR.
typeset -a YTDLP_SAFETY=( --check-formats --extractor-args 'youtube:formats=duplicate' )

# Merge container preference: MKV first for widest mux support, then MP4.
typeset -a YTDLP_MERGE=( --merge-output-format 'mkv/mp4' )

# External downloader tuning
typeset -a YTDLP_EDL=( --external-downloader aria2c --external-downloader-args 'aria2c:-c -j8 -x8 -s8 -k2M' )

# Common base flags
typeset -a YTDLP_BASE=( --add-metadata --embed-metadata --newline --ignore-config --no-playlist )

# ── Core ytdl ───────────────────────────────────────────────
ytdl(){
  local usecookie=0 args=()
  while (( $# )); do case $1 in -c) usecookie=1 ;; *) args+=("$1") ;; esac; shift; done
  (( ${#args[@]} )) || { BUG "ytdl: URL required"; return 1; }
  local url=$args[1]
  local dom=$(get_domain_from_url "$url") ck=$(get_cookie "$dom")
  local -a cmd=( yt-dlp ${YTDLP_BASE[@]} ${YTDLP_EDL[@]} ${YTDLP_SAFETY[@]} ${YTDLP_MAX_SORT[@]} ${YTDLP_MAX_FORMAT[@]} ${YTDLP_MERGE[@]} )
  if (( usecookie )) && [[ -f $ck ]]; then
    cmd+=( --cookies "$ck" )
  fi
  "${cmd[@]}" "$url"
}

# ── Format Picker (full list, max‑quality defaults) ─────────
ytf(){
  local url=$1
  validate_url "$url" || { BUG "ytf: bad URL"; return 1; }
  local dom=$(get_domain_from_url "$url") ck=$(get_cookie "$dom")
  local -a listcmd=( yt-dlp -F ${YTDLP_SAFETY[@]} ${YTDLP_MAX_SORT[@]} )
  [[ -f $ck ]] && listcmd+=( --cookies "$ck" )
  local format_line fid
  format_line=$("${listcmd[@]}" "$url" | fzf --ansi --prompt="🎞 Select format: ") || return 1
  fid=$(awk '{print $1}' <<< "$format_line")
  [[ -z $fid || $fid == 'ID' ]] && { ytdl "$url"; return; }
  GLOW "Selected format: $fid"
  local -a dl=( yt-dlp ${YTDLP_BASE[@]} ${YTDLP_EDL[@]} ${YTDLP_SAFETY[@]} ${YTDLP_MERGE[@]} -f "$fid+bestaudio/$fid/best" )
  [[ -f $ck ]] && dl+=( --cookies "$ck" )
  "${dl[@]}" "$url"
}

# ── SABR helpers ────────────────────────────────────────────
# Lists only SABR-labeled formats when visible; falls back to full list if none.
ytf_sabr(){
  local url=$1
  validate_url "$url" || { BUG "ytf_sabr: bad URL"; return 1; }
  local dom=$(get_domain_from_url "$url") ck=$(get_cookie "$dom")
  local -a listcmd=( yt-dlp -F ${YTDLP_SAFETY[@]} ${YTDLP_MAX_SORT[@]} )
  [[ -f $ck ]] && listcmd+=( --cookies "$ck" )
  local all out
  all=$("${listcmd[@]}" "$url") || return 1
  if print -r -- "$all" | grep -qi 'sabr'; then
    out=$(print -r -- "$all" | grep -i 'sabr' | fzf --ansi --prompt="🎞 Select SABR format: ") || return 1
  else
    INFO "No SABR tag found. Showing all formats."
    out=$(print -r -- "$all" | fzf --ansi --prompt="🎞 Select format: ") || return 1
  fi
  local fid; fid=$(awk '{print $1}' <<< "$out")
  [[ -z $fid || $fid == 'ID' ]] && { ytdl "$url"; return; }
  GLOW "Selected format: $fid"
  local -a dl=( yt-dlp ${YTDLP_BASE[@]} ${YTDLP_EDL[@]} ${YTDLP_SAFETY[@]} ${YTDLP_MERGE[@]} -f "$fid+bestaudio/$fid/best" )
  [[ -f $ck ]] && dl+=( --cookies "$ck" )
  "${dl[@]}" "$url"
}

# Direct SABR download with our max‑quality knobs
ytdl_sabr(){
  local url=$1
  validate_url "$url" || { BUG "Bad URL: $url"; return 1; }
  local dom=$(get_domain_from_url "$url") ck=$(get_cookie "$dom")
  local -a cmd=( yt-dlp ${YTDLP_BASE[@]} ${YTDLP_EDL[@]} ${YTDLP_SAFETY[@]} ${YTDLP_MAX_SORT[@]} ${YTDLP_MAX_FORMAT[@]} ${YTDLP_MERGE[@]} )
  [[ -f $ck ]] && cmd+=( --cookies "$ck" )
  "${cmd[@]}" "$url"
}

# ── Main Command ────────────────────────────────────────────
ytdlc(){
  (( $# )) || { show_ytdlc_help; return 1; }
  local list=0 odir="/sto2" upd=0 sabr=0
  local -a extra urls
  while (( $# )); do
    case $1 in
      -l|--list-formats) list=1 ;;
      --sabr)            sabr=1 ;;
      -o|--output-dir)   odir=$2; shift ;;
      --update)          upd=1 ;;
      -f)                extra+=("$1" "$2"); shift ;;  # user format override
      -h|--help)         show_ytdlc_help; return 0 ;;
      *)                 urls+=("$1") ;;
    esac; shift
  done
  (( upd )) && { prompt_cookie_update; return; }
  mkdir -p -- "$odir"
  local archive="${XDG_DATA_HOME:-$HOME/.local/share}/ytdlc/archive.log"
  mkdir -p -- "${archive:h}"; touch "$archive"

  for url in "${urls[@]}"; do
    validate_url "$url" || { BUG "Bad URL: $url"; continue; }
    [[ $url == *embed/* ]] && url="https://www.youtube.com/watch?v=${url##*/embed/}"
    local id=$(yt-dlp --get-id --no-playlist --ignore-config "$url" 2>/dev/null)
    [[ -z "$id" ]] && { BUG "Could not extract ID"; continue; }
    if grep -qxF "$id" "$archive"; then INFO "Already downloaded: $id"; continue; fi

    cd -- "$odir" || { BUG "Cannot cd to $odir"; continue; }

    if (( sabr )); then
      if (( list )); then ytf_sabr "$url"; else ytdl_sabr "$url"; fi
      [[ $? -eq 0 ]] && echo "$id" >> "$archive" || BUG "SABR download failed: $url"
      continue
    fi

    if (( list )); then
      ytf "$url"
      continue
    fi

    # Standard path: allow -f override but keep our max-quality fallbacks
    if (( ${#extra[@]} )); then
      local dom=$(get_domain_from_url "$url") ck=$(get_cookie "$dom")
      local -a cmd=( yt-dlp ${YTDLP_BASE[@]} ${YTDLP_EDL[@]} ${YTDLP_SAFETY[@]} ${YTDLP_MERGE[@]} ${extra[@]} )
      [[ -f $ck ]] && cmd+=( --cookies "$ck" )
      "${cmd[@]}" "$url" && echo "$id" >> "$archive" || BUG "Download failed: $url"
    else
      ytdl -c "$url" && echo "$id" >> "$archive" || BUG "Download failed: $url"
    fi
  done
}

# ── Help ────────────────────────────────────────────────────
show_ytdlc_help(){
cat <<'USAGE'
ytdlc – cookie-aware yt-dlp wrapper
  -l | --list-formats        list formats (fzf-select). Respects SABR when --sabr is used
       --sabr                enable SABR mode (uses formats=duplicate, check-formats)
  -o | --output-dir DIR      set output directory
       --update              interactively refresh cookie
  -f ID/EXPR                 pass -f to yt-dlp (overrides auto format), e.g. "bv*[height>=2160]+ba/b"
  -h | --help                this help

Defaults:
  • Highest visual quality automatically: res ▸ fps ▸ AV1 ▸ VP9.2 ▸ VP9 ▸ H.264 ▸ bitrate ▸ size
  • Safe fallbacks: bestvideo+bestaudio, else best single file
  • Verified formats only (--check-formats), SABR visible (--extractor-args youtube:formats=duplicate)
  • Merge container preference: mkv, then mp4
  • aria2c for robust downloading
USAGE
}
