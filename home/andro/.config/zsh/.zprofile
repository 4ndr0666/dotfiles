#!/usr/bin/env zsh
# File: /home/$USER/.config/zsh/.zprofile
# Date: 12-30-24
# Author: 4ndr0666

# ======================================== // ZPROFILE //
## Default programs

export MICRO_TRUECOLOR=1
export EDITOR="nvim"
export TERMINAL="alacritty"
export TERMINAL_PROG="st"
export BROWSER="brave-beta"

## Dynamic Path

static_dirs=(
    "/usr/bin"
    "$HOME/.local/share/gem/ruby/3.3.0/bin"
    "$HOME/.npm-global/bin"
    "$HOME/.local/share/goenv/bin"
    "$HOME/.local/bin"
    "$HOME/bin"
    "$XDG_DATA_HOME/gem/ruby/3.3.0/bin"
    "$XDG_DATA_HOME/virtualenv"
    "$XDG_DATA_HOME/go/bin"
    "$CARGO_HOME/bin"
    "${JAVA_HOME:-/usr/lib/jvm/default/bin}"
    "/sbin"
    "/opt/"
    "/usr/local/bin/"
    "/usr/sbin"
    "/usr/local/sbin"
)

dynamic_dirs=(/home/git/clone/scr/**/*(/))

all_dirs=("${static_dirs[@]}" "${dynamic_dirs[@]}")

typeset -U PATH

for dir in "${all_dirs[@]}"; do
    dir=${dir%/}
    # Add directory to PATH if it contains at least one executable file
    if [[ -d "$dir" && -n "$(find "$dir" -maxdepth 1 -type f -executable | head -n 1)" ]]; then
        PATH="$PATH:$dir"
    fi
done

export PATH

## Simple PATH
#export PATH="/usr/bin:/usr/local/bin:/bin:/sbin:/usr/sbin:$HOME/bin:$HOME/.local/bin:$HOME/.npm-global/bin:$HOME/.local/share/goenv/bin:$HOME/.local/bin:$XDG_DATA_HOME/gem/ruby/3.3.0/bin:$XDG_DATA_HOME/virtualenv:$XDG_DATA_HOME/go/bin:$CARGO_HOME/bin:${JAVA_HOME:-/usr/lib/jvm/default/bin}"


# --- // Setup Cache File
## cache_file="$HOME/.cache/dynamic_dirs.list"
##
## if [[ ! -f "$cache_file" || /Nas/Build/git/syncing/scr/ -nt "$cache_file" ]]; then
##     echo "Updating dynamic directories cache..."
##     find /Nas/Build/git/syncing/scr/ -type d \( -name '.git' -o -name '.github' \) -prune -o -type d -print > "$cache_file"
## fi
##
## dynamic_dirs=($(cat "$cache_file"))
############################################################# //

## XDG

if [ -z "$XDG_RUNTIME_DIR" ]; then
    export XDG_RUNTIME_DIR="/run/user/$(id -u)"
fi

if [ ! -d "$XDG_RUNTIME_DIR" ]; then
    mkdir "$XDG_RUNTIME_DIR"       # Bypassing the alias
    \chmod 0700 "$XDG_RUNTIME_DIR"
fi

export XDG_CONFIG_HOME="$HOME/.config"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_DATA_DIRS="${XDG_DATA_DIRS:-/usr/local/share:/usr/share}"
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_STATE_HOME="$HOME/.local/state"

## Environment

export TRASHDIR="$XDG_DATA_HOME/Trash"
export ZDOTDIR="$XDG_CONFIG_HOME/zsh/"
export DICS="$XDG_DATA_HOME/stardict/dic/"
export AUR_DIR="/home/build"
export XINITRC="$XDG_CONFIG_HOME/x11/xinitrc"
#export XAUTHORITY="$XDG_RUNTIME_DIR/Xauthority" # This line will break some DMs.
export NOTMUCH_CONFIG="$XDG_CONFIG_HOME/notmuch-config"
export GTK2_RC_FILES="$XDG_CONFIG_HOME/gtk-2.0/gtkrc-2.0"
export W3M_DIR="$XDG_DATA_HOME/w3m"
export TLDR_CACHE_DIR="$XDG_CACHE_HOME/tldr"
export WGETRC="$XDG_CONFIG_HOME/wget/wgetrc"
export INPUTRC="$XDG_CONFIG_HOME/shell/inputrc"
export XCURSOR_PATH="/usr/share/icons:$XDG_DATA_HOME/icons"
export SCREENRC="$XDG_CONFIG_HOME/screen/screenrc"
export PASSWORD_STORE_DIR="$XDG_DATA_HOME/password-store"
export TMUX_TMPDIR="$XDG_RUNTIME_DIR"
export WINEPREFIX="$XDG_DATA_HOME/wineprefixes/default"
export WINEARCH=win32
export VENV_HOME="$XDG_DATA_HOME/virtualenv"
export PIPX_HOME="$XDG_DATA_HOME/pipx"
export ENV_DIR="$XDG_DATA_HOME/virtualenv"
export VIRTUAL_ENV_PROMPT="(💀)"
export PYTHONSTARTUP="$XDG_CONFIG_HOME/python/pythonrc"
export PIP_DOWNLOAD_CACHE="$XDG_CACHE_HOME/pip/"
export GOPATH="$XDG_DATA_HOME/go"
export GOMODCACHE="$XDG_CACHE_HOME/go/mod"
export GOENV_ROOT="$XDG_DATA_HOME/goenv"
export RUSTUP_HOME="$XDG_DATA_HOME/rustup"
export RBENV_ROOT="$XDG_DATA_HOME/rbenv"
export PARALLEL_HOME="$XDG_CONFIG_HOME/parallel"
export _JAVA_OPTIONS="-Djava.util.prefs.userRoot=\"$XDG_CONFIG_HOME/java\""
export MODE_REPL_HISTORY="$XDG_DATA_HOME/node_repl_history"
export MESON_HOME="$XDG_CONFIG_HOME/meson"
export GEM_HOME="$XDG_DATA_HOME/gem"
export SQLITE_HISTORY="$XDG_DATA_HOME/sqlite_history"
export ELECTRON_CACHE="$XDG_CACHE_HOME/electron"
# export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
export NODE_DATA_HOME="$XDG_DATA_HOME/node"
export NODE_CONFIG_HOME="$XDG_CONFIG_HOME/node"
export TEXMFVAR="$XDG_CACHE_HOME/texlive/texmf-var"
export CARGO_HOME="$XDG_DATA_HOME/cargo"
export LIBVA_DRIVER_NAME=radeonsi
# export LIBVA_DISPLAY=wayland

## Make Dirs:

mkdir "$WINEPREFIX" \
"$CARGO_HOME" \
"$GOPATH" \
"$GOMODCACHE" \
"$XDG_DATA_HOME/lib" \
"$AUR_DIR" \
"$XDG_DATA_HOME/stardict/dic" \
"$XDG_DATA_HOME/bin" \
"$XDG_DATA_HOME/go/bin" \
"$XDG_DATA_HOME/cargo/bin" \
"$XDG_CONFIG_HOME/nvm" \
"$XDG_CONFIG_HOME/meson" \
"$XDG_CACHE_HOME/zsh" \
"$XDG_DATA_HOME/gem" \
"$XDG_DATA_HOME/virtualenv" \
"$HOME/.local/pipx" \
"$ELECTRON_CACHE" \
"$NODE_DATA_HOME" \
"$XDG_DATA_HOME/node/npm-global" \
"$RBENV_ROOT" \
"$W3M_DIR" \
"$PARALLEL_HOME" \
"$GEM_HOME" >/dev/null 2>&1

## Ensure Permissions

\chmod ug+rw "$WINEPREFIX" \
"$CARGO_HOME" \
"$GOPATH" \
"$GOMODCACHE" \
"$XDG_DATA_HOME/lib" \
"$XDG_DATA_HOME/stardict/dic" \
"$XDG_DATA_HOME/bin" \
"$XDG_DATA_HOME/go/bin" \
"$XDG_DATA_HOME/cargo/bin" \
"$XDG_CONFIG_HOME/nvm" \
"$XDG_CONFIG_HOME/meson" \
"$XDG_CACHE_HOME/zsh" \
"$XDG_DATA_HOME/gem" \
"$XDG_DATA_HOME/virtualenv" \
"$HOME/.local/pipx" \
"$ELECTRON_CACHE" \
"$NODE_DATA_HOME" \
"$XDG_DATA_HOME/node/npm-global" \
"$RBENV_ROOT" \
"$W3M_DIR" \
"$PARALLEL_HOME" \
"$GEM_HOME"

## My SQL

export PSQL_HOME="$XDG_DATA_HOME/postgresql"
export MYSQL_HOME="$XDG_DATA_HOME/mysql"
export SQLITE_HOME="$XDG_DATA_HOME/sqlite"
export SQL_DATA_HOME="$XDG_DATA_HOME/sql"
export SQL_CONFIG_HOME="$XDG_CONFIG_HOME/sql"
export SQL_CACHE_HOME="$XDG_CACHE_HOME/sql"

mkdir "$PSQL_HOME" \
"$MYSQL_HOME" \
"$SQLITE_HOME" \
"$SQL_DATA_HOME" \
"$SQL_CONFIG_HOME" \
"$SQL_CACHE_HOME" >/dev/null 2>&1

\chmod ug+rw "$PSQL_HOME" \
"$MYSQL_HOME" \
"$SQLITE_HOME" \
"$SQL_DATA_HOME" \
"$SQL_CONFIG_HOME" \
"$SQL_CACHE_HOME"

# X11_env
#export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
# --- OPENBOX:
# export XGD_CURRENT_DESKTOP='openbox'
# export _JAVA_AWT_WM_NONREPARENTING=1
# export OpenGL_GL_PREFERENCE=GLVND  # For screen tearing
# export QT_QPA_PLATFORMTHEME=qt5ct
# export MOZ_USE_XINPUT2=1
# export AWT_TOOLKIT=MToolkit wmname LG3D  # May have to install wmname
# export _JAVA_OPTIONS="-Dawt.useSystemAAFontSettings=on -Dswing.aatext=true -Dswing.defaultlaf=com.sun.java.swing.pla
#f.gtk.GTKLookAndFeel -Dswing.crossplatformlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel ${_JAVA_OPTIONS}"

## Library

export LD_LIBRARY_PATH="$XDG_DATA_HOME/lib:/usr/local/lib${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"

## Askpass

export SUDO_ASKPASS="$XDG_CONFIG_HOME"/wayfire/scripts/rofi_askpass  # Wayfire specific
#export SUDO_ASKPASS="/usr/bin/pinentry-dmenu"    # Xorg

## GPG

export GNUPGHOME="$XDG_DATA_HOME/gnupg"
if [ ! -d "$GNUPGHOME" ]; then
    \mkdir -p "$GNUPGHOME"
    \chmod 700 "$GNUPGHOME"
fi
gpg_env_file="$XDG_CONFIG_HOME/shellz/gpg_env"
if [ -f "$gpg_env_file" ]; then
    source "$gpg_env_file"
else
    echo "Warning: $gpg_env_file not found"
fi

## FZF

export FZF_DEFAULT_COMMMAND='fd --no-ignore --hidden --follow --exclude ".git"'
export FZF_DEFAULT_OPTS="
  --layout=reverse
  --height=60%
  --border=thinblock
  --padding=1%
  --info=right
  --tiebreak=index
  --scrollbar='│'
  --separator='_'
  --preview='bat --style=numbers --color=always {}'
  --preview-window=hidden:right:69%
  --preview-label=eyes
  --margin=5%
  --bind='ctrl-o:toggle-preview'
  --bind='ctrl-y:execute-silent(printf {} | cut -f 2- | wl-copy --trim-newline)'
  --color=fg:#005b69,fg+:#15FFFF,bg:#151515,bg+:#262626 \
  --color=hl:#15FFFF,hl+:#15FFFF,info:#195761,marker:#15FFFF \
  --color=prompt:#00f7ff,spinner:#64e290,pointer:#15FFFF,header:#07fff7 \
  --color=border:#262626,preview-border:#15FFFF,label:#005b69,query:#15ffff \
  --border-label='search' --prompt='≽  ' --marker='✔' --pointer='☞'
"

### Config (testing):
#export FZF_DEFAULT_OPTS="
#  --height=60%
#  --border=double
#  --padding=1%
#  --info=right
#  --separator=_
#  --preview='
#    set filename (basename {})
#    if string match -q \"*.txt\" -- \$filename
#      bat --style=numbers --color=always {}
#    else if string match -q \"*.pdf\" -- \$filename
#      zathura {} &
#    else if string match -q \"*.jpg\" -- \$filename
#      feh {} &
#    else if string match -q \"*.jpeg\" -- \$filename
#      feh {} &
#    else if string match -q \"*.png\" -- \$filename
#      feh {} &
#    else if string match -q \"*.gif\" -- \$filename
#      feh {} &
#    else
#      bat --style=numbers --color=always {}
#    end
#  '
#  --preview-window=hidden:right:69%
#  --preview-label=eyes
#  --margin=5%
#  --border-label=search
#  --color=16
#  --layout=reverse
#  --prompt=⭐
#  --bind='enter:execute(
#    set filename (basename {})
#    if string match -q \"*.txt\" -- \$filename
#      emacsclient -nw {}
#    else if string match -q \"*.pdf\" -- \$filename
#      zathura {}
#    else if string match -q \"*.jpg\" -- \$filename
#      feh {}
#    else if string match -q \"*.jpeg\" -- \$filename
#      feh {}
#    else if string match -q \"*.png\" -- \$filename
#      feh {}
#    else if string match -q \"*.gif\" -- \$filename
#      feh {}
#    else
#      emacsclient -nw {}
#    end
#  )'
#  --bind=alt-o:toggle-preview
# "

### Config:1
#FZF_DEFAULT_COMMMAND='fd --no-ignore --hidden --follow --exclude ".git"'
#FZF_DEFAULT_OPTS="
#--layout=reverse
#--height=40%
#--border=thinblock
#--info=right
#--tiebreak=index
#--scrollbar='│'
#--preview 'file {}'
#--preview-window='right:50%'
#--color=fg:#005b69,fg+:#15FFFF,bg:#151515,bg+:#262626 \
#--color=hl:#15FFFF,hl+:#15FFFF,info:#195761,marker:#15FFFF \
#--color=prompt:#00f7ff,spinner:#64e290,pointer:#15FFFF,header:#07fff7 \
#--color=border:#262626,preview-border:#15FFFF,label:#005b69,query:#15ffff \
#--border-label-pos='-54' --prompt='≽  ' --marker='✔' --pointer='☞' --separator='-'"

### Config: Garuda:
#export FZF_DEFAULT_OPTIONS="
#    --height=40% --layout=reverse --info=inline --border --margin=1 --padding=1 \
#    --tiebreak=index \
#    --preview 'bat --color=always {}' --preview-window '~3' \
#    --color 'bg+:-1,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8' \
#    --color 'fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc' \
#    --color 'marker:#f5e0dc,fg+:#a6e3a1,prompt:#cba6f7,hl+:#f38ba8'"

### Theme: Dark Transparent
# --color 'fg:#bbccdd,fg+:#ddeeff,bg:#334455,preview-bg:#223344,border:#778899"

### Preview Window:
#--preview 'file {}' --preview-window up,1,border-horizontal \
#--bind 'ctrl-/:change-preview-window(50%|hidden|)' \

## FZF Widgets:

### History:
bindkey '^R' fzf-history-widget

### History Sorted:
fh() {
  print -z $( ([ -n "$ZSH_NAME" ] && fc -l 1 || history) | fzf +s --tac | sed -E 's/ *[0-9]*\*? *//' | sed -E 's/\\/\\\\/g')
}

## Truecolor

case "${COLORTERM}" in
    truecolor|24bit) ;;
    *) export COLORTERM="24bit" ;;
esac

## PAGER

#export MANPAGER=less
export MANPAGER="sh -c 'if [ -t 1 ]; then col -bx | bat -l man -p; else col -bx | bat -l man -p --color=never; fi | less -R'"
#export MANPAGER="sh -c 'col -bx | bat -l man -p | less -R'"
#export MANPAGER="sh -c 'col -bx | bat -l man -p --paging always'"

## Less

### Config1
#export LESS='-R'
#export LESS_TERMCAP_mb="$(printf '%b' '[1;31m')"
#export LESS_TERMCAP_md="$(printf '%b' '[1;36m')"
#export LESS_TERMCAP_me="$(printf '%b' '[0m')"
#export LESS_TERMCAP_so="$(printf '%b' '[01;44;33m')"
#export LESS_TERMCAP_se="$(printf '%b' '[0m')"
#export LESS_TERMCAP_us="$(printf '%b' '[1;32m')"
#export LESS_TERMCAP_ue="$(printf '%b' '[0m')"
### Config2
export LESS='-R'
export LESS_TERMCAP_mb=$'\E[01;31m'             # begin blinking
export LESS_TERMCAP_md=$'\E[01;31m'             # begin bold
export LESS_TERMCAP_me=$'\E[0m'                 # end mode
export LESS_TERMCAP_se=$'\E[0m'                 # end standout-mode
export LESS_TERMCAP_so=$'\E[01;44;33m'          # begin standout-mode - info box
export LESS_TERMCAP_ue=$'\E[0m'                 # end underline
export LESS_TERMCAP_us=$'\E[01;32m'             # begin underline


## LESSOPEN
export LESSOPEN="| /usr/bin/highlight -O ansi %s 2>/dev/null"

## Lf Shortcuts
[ ! -f "$XDG_CONFIG_HOME/shellz/shortcutrc" ] && setsid -f shortcuts >/dev/null 2>&1

## Keyboard Press Rate
#command -v xset &>/dev/null && xset r rate 300 50 || echo "xset command not found, skipping keyboard rate configuration."
#xset r rate 300 50
