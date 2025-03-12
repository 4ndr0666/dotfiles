#!/usr/bin/env bash
# Author: 4ndr0666

# ===================== // YTDL.ZSH //

## USAGE:
##   ytdl <URL>...
##     => Quick "no-cookies" approach with preset formats
##
##   ytf <URL>
##     => "list formats" using site-specfic cookies
##
##   ytdlc [--list-formats | --output-dir <dir> | --update] <URL>...
##     => Advanced domain-based cookie approach with auto fallback & update
##
## PROVIDES:
##   1) ytdl  -- a simple function to quickly download with preset formats
##   2) ytf   -- a quick function to list formats for a URL
##   3) ytdlc -- advanced download with domain-based cookies, auto selection,
##              auto prompting for cookie updates if a download fails, and
##              manual interactive update with --update
# ---------------------------------------------------------

## Config Maps

declare -A YTDLP_COOKIES_MAP=(
    ["youtube.com"]="$HOME/.config/yt-dlp/youtube_cookies.txt"
    ["youtu.be"]="$HOME/.config/yt-dlp/youtube_cookies.txt"
    ["patreon.com"]="$HOME/.config/yt-dlp/patreon_cookies.txt"
    ["vimeo.com"]="$HOME/.config/yt-dlp/vimeo_cookies.txt"
    ["boosty.to"]="$HOME/.config/yt-dlp/boosty_cookies.txt"
    ["instagram.com"]="$HOME/.config/yt-dlp/instagram_cookies.txt"
    # Add more mappings as needed
)
PREFERRED_FORMATS=("335" "315" "313" "308" "303" "299" "302" "271" "248" "137")

## Quickly Validate URL

validate_url() {
    local url
    url="$1"
    if [[ "$url" =~ ^https?:// ]]; then
        return 0
    else
        return 1
    fi
}

## Extract Domain

get_domain_from_url() {
    local url
    url="$1"
    echo "$url" | awk -F/ '{print $3}' | sed 's/^www\.//; s/^m\.//'
}

## Domain Cookies

get_cookie_path_for_domain() {
    local domain
    domain="$1"
    echo "${YTDLP_COOKIES_MAP[$domain]}"
}

refresh_cookie_file() {
    local domain
    domain="$1"
    if [[ -z "$domain" ]]; then
        echo "Usage: refresh_cookie_file <domain>"
        return 1
    fi
    local cookie_file
    cookie_file="$(get_cookie_path_for_domain "$domain")"
    if [[ -z "$cookie_file" ]]; then
        echo "Error: No cookie file mapped for the domain '$domain'."
        return 1
    fi
    local clipboard_cmd
    clipboard_cmd=""
    if command -v wl-paste > /dev/null 2>&1; then
        clipboard_cmd="wl-paste"
    elif command -v xclip > /dev/null 2>&1; then
        clipboard_cmd="xclip -selection clipboard -o"
    else
        echo "Error: No suitable clipboard utility found. Install 'wl-clipboard' or 'xclip'."
        return 1
    fi
    printf "Please copy the cookies for '%s' to the clipboard, then press Enter.\n" "$domain"
    read -r
    local clipboard_data
    clipboard_data="$($clipboard_cmd 2>/dev/null)"
    if [[ -z "$clipboard_data" ]]; then
        echo "Error: Clipboard is empty or unreadable."
        return 1
    fi
    echo "$clipboard_data" > "$cookie_file" || {
        echo "Error: Could not write to '$cookie_file'."
        return 1
    }
    chmod 600 "$cookie_file" 2>/dev/null || {
        echo "Warning: Could not set permissions to 600 on '$cookie_file'."
    }
    echo "Cookie file for '$domain' updated successfully!"
}

## Update Cookies

prompt_cookie_update() {
    echo "Select the domain to update:"
    local domains
    if [[ -n "$BASH_VERSION" ]]; then
        # Bash syntax for associative arrays
        domains=( "${!YTDLP_COOKIES_MAP[@]}" )
    elif [[ -n "$ZSH_VERSION" ]]; then
        # Zsh syntax for associative arrays
        domains=( ${(k)YTDLP_COOKIES_MAP} )
    else
        echo "Unsupported shell. Only Bash and Zsh are supported."
        return 1
    fi
    local idx
    idx=1
    local d
    for d in "${domains[@]}"; do
        echo "  $idx) $d"
        idx=$(( idx + 1 ))
    done
    printf "Select the number or domain name [1-%d]: " $(( idx - 1 ))
    read -r choice
    local domain
    domain=""
    if [[ "$choice" =~ ^[0-9]+$ && "$choice" -ge 1 && "$choice" -le $(( idx - 1 )) ]]; then
        if [[ -n "$BASH_VERSION" ]]; then
            domain="${domains[$(( choice - 1 ))]}"
        elif [[ -n "$ZSH_VERSION" ]]; then
            domain="${domains[$choice]}"
        fi
    else
        local item
        for item in "${domains[@]}"; do
            if [[ "$item" == "$choice" ]]; then
                domain="$item"
                break
            fi
        done
    fi
    if [[ -z "$domain" ]]; then
        echo "Invalid selection: $choice"
        return 1
    fi
    refresh_cookie_file "$domain"
}

## Intelligent JQ selection and fallback

select_best_format() {
    local url
    url="$1"
    local cookie_file
    cookie_file="$2"
    local formats_json
    formats_json=$(yt-dlp -j --cookies "$cookie_file" "$url" 2>/dev/null)
    if [[ -z "$formats_json" ]]; then
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
    # If none matched, fallback to "best"
    echo "best"
}

get_format_details() {
    local url
    url="$1"
    local cookie_file
    cookie_file="$2"
    local format_id
    format_id="$3"
    if [[ "$format_id" == "best" ]]; then
        echo "N/A"
        return
    fi
    local format_json
    format_json=$(yt-dlp -f "$format_id" -j --cookies "$cookie_file" "$url" 2>/dev/null)
    if [[ -z "$format_json" ]]; then
        echo "N/A"
        return
    fi
    echo "$format_json" | jq '{format_id, ext, resolution, fps, tbr, vcodec, acodec, filesize}'
}

## Custom yt-dlp without cookies (still able to accept args for cookies)

ytdl() {
    yt-dlp --add-metadata \
           --embed-metadata \
           --external-downloader aria2c \
           --external-downloader-args 'aria2c:-c -j8 -x8 -s8 -k2M' \
           -f "335/315/313/308/303/299/271/248/137+bestaudio/best" \
	   --newline \
	   --ignore-config \
           --no-playlist \
           --no-mtime \
           "$@"
}

## List Formats Using Cookies

ytf() {
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        echo "Usage: ytf <URL>"
        echo "Autoloads site cookies if available and list all download formats available."
        return 0
    fi
    local url
    url="$1"

    if [[ -z "$url" ]]; then
        echo "Usage: ytf <URL>"
        return 1
    fi

    if ! validate_url "$url"; then
        echo "Error: Invalid URL: $url"
        return 1
    fi

    local domain
    domain="$(get_domain_from_url "$url")"
    local cookie_file
    cookie_file="$(get_cookie_path_for_domain "$domain")"

    if [[ -n "$cookie_file" && -f "$cookie_file" ]]; then
        echo "Loading cookie file from '$cookie_file'."
        yt-dlp --list-formats --cookies "$cookie_file" "$url"
    else
        yt-dlp --list-formats "$url"
    fi
}

ytdlc() {
    # Display help if no arguments are provided
    if [[ $# -eq 0 ]]; then
        show_ytdlc_help
        return 0
    fi

    # Usage checks
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        show_ytdlc_help
        return 0
    fi

    local list_formats=0
    local output_dir="$HOME/Downloads"
    local update_mode=0

    while [[ "$1" == -* ]]; do
        case "$1" in
            --list-formats|-l)
                list_formats=1
                shift
                ;;
            --output-dir|-o)
                if [[ -n "$2" && ! "$2" =~ ^- ]]; then
                    output_dir="$2"
                    shift 2
                else
                    echo "Error: --output-dir requires a non-empty argument."
                    return 1
                fi
                ;;
            --update)
                update_mode=1
                shift
                ;;
            *)
                echo "Unknown option: $1"
                echo "Use --help for usage."
                return 1
                ;;
        esac
    done

    # If user only wants to update cookie files, do so and exit
    if (( update_mode )); then
        prompt_cookie_update
        return 0
    fi

    # Ensure the output dir
    if [[ ! -d "$output_dir" ]]; then
        mkdir -p "$output_dir" || {
            echo "Error: Could not create '$output_dir'."
            return 1
        }
    fi

    # No URL => show help
    if [[ $# -eq 0 ]]; then
        show_ytdlc_help
        return 0
    fi

    # Process each URL
    for url in "$@"; do
        echo "----------------------------------------"
        echo "Analyzing URL: $url"

        if ! validate_url "$url"; then
            echo "Error: Invalid URL: $url"
            continue
        fi

        # Derive domain => cookie file
        local domain
        domain="$(get_domain_from_url "$url")"
        local cookie_file
        cookie_file="$(get_cookie_path_for_domain "$domain")"

        if [[ -z "$cookie_file" ]]; then
            echo "Error: No cookie file mapped for the domain '$domain'."
            echo "Use 'ytdlc --update' to paste one in the terminal."
            continue
        fi

        if [[ ! -f "$cookie_file" ]]; then
            echo "Cookie file not found for '$cookie_file'."
            echo "Use 'ytdlc --update' to paste your copied cookies for '$domain'."
            continue
        fi

        # Adjust permissions
        local perms
        perms="$(stat -c '%a' "$cookie_file" 2>/dev/null || echo '???')"
        if [[ "$perms" != "600" ]]; then
            chmod 600 "$cookie_file" 2>/dev/null || {
                echo "Warning: Could not set secure permissions for '$cookie_file'."
            }
	fi

        if (( list_formats )); then
            echo "Listing available formats for '$url':"
            yt-dlp --list-formats --cookies "$cookie_file" "$url"
            echo "----------------------------------------"
            continue
        fi

        # Auto-pick best format
        local best_fmt
        best_fmt="$(select_best_format "$url" "$cookie_file")"
        echo "Selected format ID: $best_fmt"

        # If format_id is 'best', skip getting format details
        if [[ "$best_fmt" != "best" ]]; then
            local fmt_info
            fmt_info="$(get_format_details "$url" "$cookie_file" "$best_fmt")"
            echo "Format details:"
            echo "$fmt_info"
            echo ""
        else
            echo "Format details: N/A"
            echo ""
        fi

        # Download
	# Previous format: '-f "$best_fmt+bestaudio/best" \'
        yt-dlp \
            --add-metadata \
            --embed-metadata \
            --external-downloader aria2c \
            --external-downloader-args 'aria2c:-c -j8 -x8 -s8 -k2M' \
            -f "335/315/313/308/303/299/271/248/137+bestaudio/best" \
	    --newline \
	    --ignore-config \
            --no-playlist \
            --no-mtime \
            --cookies "$cookie_file" \
            --output "$output_dir/%(title)s.%(ext)s" \
            "$url"

        local exit_code=$?
        if [[ $exit_code -ne 0 ]]; then
		echo "Download failed for '$url'. Possibly expired cookies? Copy the new ones to update and press (y) or (n) to quit."
            printf "Enter choice: "
            read -r ans
            if [[ "$ans" =~ ^[Yy](es)?$ ]]; then
                refresh_cookie_file "$domain" || {
                    echo "Cookie update for domain '$domain' failed. Skipping re-attempt."
                    continue
                }
                echo "Cookies updated. Re-attempting download..."
                yt-dlp \
                    --add-metadata \
                    --embed-metadata \
                    --external-downloader aria2c \
                    --external-downloader-args 'aria2c:-c -j8 -x8 -s8 -k2M' \
                    -f "335/315/313/308/303/299/271/248/137+bestaudio/best" \
	            --newline \
	            --ignore-config \
                    --no-playlist \
                    --no-mtime \
                    --cookies "$cookie_file" \
                    --output "$output_dir/%(title)s.%(ext)s" \
                    "$url" || {
                        echo "Retry also failed. Skipping."
                    }
            else
                echo "Skipping re-attempt."
            fi
        else
            echo "Download completed successfully for '$url'."
        fi

        echo "----------------------------------------"
    done
}

show_ytdlc_help() {
    cat <<'EOF'
Usage: ytdlc [options] <URL> [<URL> ...] [-- yt-dlp options]
Advanced downloads with domain-based cookies and best-format selection.

Options:
  --list-formats, -l    List available formats for each URL (no download).
  --output-dir, -o DIR  Save downloads to the specified directory (default: ~/Downloads).
  --update              Interactively update a cookie file and exit.
  --help, -h            Show this help message.

Examples:
  ytdl https://youtube.com/watch?v=XXXX        (preset yt-dlp no-cookies. `-c` to use cookies)
  ytdlc --update                               (update cookie file via clipboard)
  ytf https://vimeo.com/ABC123                 (list all avilable download formats)
  ytdlc https://patreon.com/page -- -f 303     (download with an extra yt-dlp flag)
EOF
}
