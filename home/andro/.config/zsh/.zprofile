#!/bin/sh
# shellcheck disable=SC2155
# Author: 4ndr0666
# ========================== // ZPROFILE //

# --- PATH ---
typeset -U path
#unsetopt PROMPT_SP 2>/dev/null

#export PATH="$PATH:$(find /home/git/clone/4ndr0666/scr -type d -not -path '*/.git/*' | \paste -sd ':' -):$HOME/.local/bin:/usr/bin:/usr/local/bin:/bin:/sbin:/usr/sbin:$HOME/.npm-global/bin:${XDG_DATA_HOME:-/home/andro/.local/share}/gem/ruby/3.4.5/bin:$XDG_DATA_HOME/virtualenv:$XDG_DATA_HOME/go/bin:${CARGO_HOME-:/home/andro/.local/share/cargo}/bin:/opt/depot_tools:${JAVA_HOME:-/usr/lib/jvm/default/bin}"

# Static paths
path+=(
  "$HOME/.local/bin"
  "/usr/local/bin" "/usr/bin" "/bin" "/usr/sbin" "/sbin"
  "$HOME/.npm-global/bin"
  "$XDG_DATA_HOME/virtualenv"
  "$XDG_DATA_HOME/go/bin"
  "${CARGO_HOME:-$HOME/.local/share/cargo}/bin"
  "/opt/depot_tools"
  "${JAVA_HOME:-/usr/lib/jvm/default/bin}"
)

# Dynamic ruby path
local gem_ruby_base_path="${XDG_DATA_HOME:-$HOME/.local/share}/gem/ruby"
local latest_version_dir
latest_version_dir=($gem_ruby_base_path/*(N/od[-1]))
if [[ -n "$latest_version_dir" ]]; then
  path+=( "${latest_version_dir}/bin" )
fi

# Cache file (Initial Read-Only)
local cache_file="${XDG_CACHE_HOME:-$HOME/.cache}/dynamic_dirs.list"
if [[ -r "$cache_file" ]]; then
  path+=( ${(s/:/)_p:}$(<$cache_file) )
fi

# --- DEFAULT PROGRAMS ---
export EDITOR="nvim"
export TERMINAL="kitty"
export TERMINAL_PROG="kitty"
export BROWSER="brave-beta"

# --- XDG SPECIFICATIONS ---
if [ -z "$XDG_RUNTIME_DIR" ]; then
    export XDG_RUNTIME_DIR="/run/user/$(id -u)"
fi
if [ ! -d "$XDG_RUNTIME_DIR" ]; then
    mkdir "$XDG_RUNTIME_DIR"
    \chmod 0700 "$XDG_RUNTIME_DIR"
fi
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_DATA_DIRS="${XDG_DATA_DIRS:-/usr/local/share:/usr/share}"
export XDG_CACHE_HOME="$HOME/.cache"
export XINITRC="$XDG_CONFIG_HOME/x11/xinitrc"
export XCURSOR_PATH="/usr/share/icons:$XDG_DATA_HOME/icons"
#export XAUTHORITY="$XDG_RUNTIME_DIR/Xauthority" # This line will break some DMs.

# Wine
export WINEPREFIX="$XDG_DATA_HOME/wineprefixes/default"
export WINEARCH="win32"

# Go
export GOPATH="$XDG_DATA_HOME/go"
export GOMODCACHE="$XDG_CACHE_HOME/go/mod"
export GOROOT="$(go env GOROOT 2>/dev/null || echo '/usr/lib/go')"

# Ruby
export GEM_HOME="$XDG_DATA_HOME/gem"
export RUSTUP_HOME="$XDG_DATA_HOME/rustup"
export RBENV_ROOT="$XDG_DATA_HOME/rbenv"

# Electron
export ELECTRON_CACHE="$XDG_CACHE_HOME/electron"
# export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"

# Node
export CARGO_HOME="$XDG_DATA_HOME/cargo"
export NODE_DATA_HOME="$XDG_DATA_HOME/node"
export NODE_CONFIG_HOME="$XDG_CONFIG_HOME/node"
#export NODE_REPL_HISTORY="$XDG_DATA_HOME/node_repl_history"

# Python
export PYTHONSTARTUP="$XDG_CONFIG_HOME/python/pythonrc"
export INPUTRC="$XDG_CONFIG_HOME/zsh/inputrc"
export PIP_DOWNLOAD_CACHE="$XDG_CACHE_HOME/pip/"
# Virtualenvs (XDG)
export VENV_HOME="$XDG_DATA_HOME/venvirtualenv"
export VIRTUAL_ENV_PROMPT="(💀)"
# Pipx/XDG
export PATH="$PIPX_BIN_DIR:$PATH"
export PIPX_HOME="$XDG_DATA_HOME/pipx"
export PIPX_BIN_DIR="$XDG_DATA_HOME/pipx/bin"
# Pyenv
export PYENV_ROOT="$XDG_DATA_HOME/pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
# Initialize
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
# Ensure to use only pyenv's shims for Python
export PATH="$PYENV_ROOT/shims:$PATH"

## My SQL
# export PSQL_HOME="$XDG_DATA_HOME/postgresql"
# export MYSQL_HOME="$XDG_DATA_HOME/mysql"
# export SQLITE_HOME="$XDG_DATA_HOME/sqlite"
# export SQL_DATA_HOME="$XDG_DATA_HOME/sql"
# export SQL_CONFIG_HOME="$XDG_CONFIG_HOME/sql"
# export SQL_CACHE_HOME="$XDG_CACHE_HOME/sql"
# mkdir -p "$PSQL_HOME" \
#    "$MYSQL_HOME" \
#    "$SQLITE_HOME" \
#    "$SQL_DATA_HOME" \
#    "$SQL_CONFIG_HOME" \
#    "$SQL_CACHE_HOME" >/dev/null 2>&1
# \chmod ug+rw "$PSQL_HOME" \
#    "$MYSQL_HOME" \
#    "$SQLITE_HOME" \
#    "$SQL_DATA_HOME" \
#    "$SQL_CONFIG_HOME" \
#    "$SQL_CACHE_HOME"

# Ensure directories
mkdir -p "$XDG_DATA_HOME/lib" \
    "$XDG_DATA_HOME/go/bin" \
    "$XDG_DATA_HOME/cargo/bin" \
    "$XDG_DATA_HOME/zsh" \
    "$XDG_CACHE_HOME/zsh" \
    "$XDG_DATA_HOME/node/npm-global" \
    "$WINEPREFIX" \
    "$CARGO_HOME" \
    "$GOPATH" \
    "$GOMODCACHE" \
    "$AUR_DIR" \
    "$PIPX_HOME" \
    "$PIPX_BIN_DIR" \
    "$ENV_DIR" \
    "$PIP_DOWNLOAD_CACHE" \
    "$ENV_HOME" \
    "$RUSTUP_HOME" \
    "$RBENV_ROOT" \
    "$PARALLEL_HOME" \
    "$GEM_HOME" \
    "$W3M_DIR" \
    "$GEM_HOME" \
    "$ELECTRON_CACHE" \
    "$NVM_CONFIG_HOME" \
    "$NODE_DATA_HOME" \
    "$NODE_CONFIG_HOME" >/dev/null 2>&1

# Ensure Permissions
\chmod ug+rw "$HISTFILE" \
    "$WINEPREFIX" \
    "$CARGO_HOME" \
    "$GOPATH" \
    "$GOMODCACHE" \
    "$AUR_DIR" \
    "$PIPX_HOME" \
    "$ENV_DIR" \
    "$RUSTUP_HOME" \
    "$RBENV_ROOT" \
    "$PARALLEL_HOME" \
    "$GEM_HOME" \
    "$W3M_DIR" \
    "$XDG_DATA_HOME/lib" \
    "$XDG_DATA_HOME/go/bin" \
    "$XDG_DATA_HOME/cargo/bin" \
    "$XDG_CONFIG_HOME/nvm" \
    "$XDG_CACHE_HOME/zsh" \
    "$XDG_DATA_HOME/virtualenv" \
    "$ELECTRON_CACHE" \
    "$NODE_DATA_HOME" \
    "$XDG_DATA_HOME/node/npm-global" >/dev/null 2>&1

# --- GENERAL MACHINE ENVIRONMENT ---
export LD_LIBRARY_PATH="$XDG_DATA_HOME/lib:/usr/local/lib${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export NOTMUCH_CONFIG="$XDG_CONFIG_HOME/notmuch-config"
export GTK2_RC_FILES="$XDG_CONFIG_HOME/gtk-2.0/gtkrc-2.0"
export WGETRC="$XDG_CONFIG_HOME/wget/wgetrc"
export PASSWORD_STORE_DIR="$XDG_DATA_HOME/password-store"
export TMUX_TMPDIR="$XDG_RUNTIME_DIR"
export UNISON="$XDG_DATA_HOME/unison"
export SQLITE_HISTORY="$XDG_DATA_HOME/sqlite_history"
export DICS="/usr/share/stardict/dic/"
export W3M_DIR="$XDG_DATA_HOME/w3m"
export TLDR_CACHE_DIR="$XDG_CACHE_HOME/tldr"
export PARALLEL_HOME="$XDG_CONFIG_HOME/parallel"
#export SCREENRC="$XDG_CONFIG_HOME/screen/screenrc"
export _JAVA_OPTIONS="-Djava.util.prefs.userRoot=\"$XDG_CONFIG_HOME/java\""
export TEXMFVAR="$XDG_CACHE_HOME/texlive/texmf-var"
#export LIBVA_DRIVER_NAME=radeonsi
#export LIBVA_DISPLAY=wayland
export HISTFILE="$XDG_DATA_HOME/zsh/history"
export TRASHDIR="$XDG_DATA_HOME/Trash"
export ZDOTDIR="$XDG_CONFIG_HOME/zsh/"
export AUR_DIR="$XDG_CACHE_HOME/yay/"

# --- ASKPASS ---
export SUDO_ASKPASS="$XDG_CONFIG_HOME"/wayfire/scripts/rofi_askpass  # Wayland
#export SUDO_ASKPASS="/usr/bin/pinentry-dmenu"    # Xorg

# --- PAGER ---
export PAGER='less'
#export MANPAGER="sh -c 'if [ -t 1 ]; then col -bx | bat -l man -p; else col -bx | bat -l man -p --color=always --paging=always; fi | less -R'"
#export BAT_PAGER="less -R"
#export MANPAGER="sh -c 'col -bx | bat -l man -p | less -R'"
#export MANPAGER="sh -c 'col -bx | bat -l man -p --paging always'

# --- GPG ---
export GNUPGHOME="$XDG_DATA_HOME/gnupg"
if [ ! -d "$GNUPGHOME" ]; then
    mkdir -p "$GNUPGHOME"
    \chmod 700 "$GNUPGHOME"
fi
#gpg_env_file="$ZDOTDIR/gpg_env"
#if [ -f "$gpg_env_file" ]; then
#    source "$gpg_env_file"
#else
#    echo "Warning: $gpg_env_file not found"
#fi

# ---X11 ENVIRONMENT ---
#export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
#export QT_STYLE_OVERRIDE='adwaita-dark'

# --- OPENBOX ---
# export XGD_CURRENT_DESKTOP='openbox'
# export _JAVA_AWT_WM_NONREPARENTING=1
# export OpenGL_GL_PREFERENCE=GLVND  # For screen tearing
# export QT_QPA_PLATFORMTHEME=qt5ct
# export MOZ_USE_XINPUT2=1
# export AWT_TOOLKIT=MToolkit wmname LG3D  # May have to install wmname
# export _JAVA_OPTIONS="-Dawt.useSystemAAFontSettings=on -Dswing.aatext=true -Dswing.defaultlaf=com.sun.java.swing.pla
#f.gtk.GTKLookAndFeel -Dswing.crossplatformlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel ${_JAVA_OPTIONS}"

# --- FZF (default search command) ---
export FZF_DEFAULT_COMMMAND='fd --no-ignore --hidden --follow --exclude ".git"'
# Config
export FZF_DEFAULT_OPTS="
  --layout=reverse
  --border=thinblock
  --height=40%
  --padding=1%
  --info=right
  --tiebreak=index
  --scrollbar='│'
  --separator='_'
  --preview='setopt NO_NOMATCH; set filename=\$(basename {}) ; case \$filename in
    *.conf|*.py|*.sh|*.ini|*.txt|*.md) bat {} & ;;
    *.pdf) zathura {} & ;;
    *.jpg|*.jpeg|*.png|*.gif|*.webp|*.tiff|*.bmp|*.auto) nsxiv {} & ;;
    *) file {} ;;
esac'
  --preview-window=hidden
  --bind='ctrl-p:change-preview-window(right|69%|hidden)'
  --preview-label=eyes
  --margin=5%
  --bind='ctrl-y:execute-silent(printf {} | cut -f 2- | wl-copy --trim-newline)'
  --color=fg:#005b69,fg+:#15FFFF,bg:#151515,bg+:#262626 \
  --color=hl:#15FFFF,hl+:#15FFFF,info:#195761,marker:#15FFFF \
  --color=prompt:#00f7ff,spinner:#64e290,pointer:#15FFFF,header:#07fff7 \
  --color=border:#262626,preview-border:#15FFFF,label:#005b69,query:#15ffff \
  --border-label='search' --prompt='≽  ' --marker='✔' --pointer='☞'
"

# Config 1
#--preview-window=up,1,border-horizontal

# Config 2
#--preview='file {}'
#--bind='ctrl-/:change-preview-window(50%|hidden|)' \

# Config 3
#--preview='bat --style=numbers --color=always {}'
#--preview-window=hidden:right:69%

# 4ndr0hack Theme
#--color=fg:#005b69,fg+:#15FFFF,bg:#151515,bg+:#262626 \
#--color=hl:#15FFFF,hl+:#15FFFF,info:#195761,marker:#15FFFF \
#--color=prompt:#00f7ff,spinner:#64e290,pointer:#15FFFF,header:#07fff7 \
#--color=border:#262626,preview-border:#15FFFF,label:#005b69,query:#15ffff \
#--border-label-pos='-54' --prompt='≽  ' --marker='✔' --pointer='☞' --separator='-'"

# Garuda Theme
#--height=40% --layout=reverse --info=inline --border --margin=1 --padding=1 \
#--tiebreak=index \
#--preview 'bat --color=always {}' --preview-window '~3' \
#--color 'bg+:-1,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8' \
#--color 'fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc' \
#--color 'marker:#f5e0dc,fg+:#a6e3a1,prompt:#cba6f7,hl+:#f38ba8'"

# Dark Transparency Theme
# --color 'fg:#bbccdd,fg+:#ddeeff,bg:#334455,preview-bg:#223344,border:#778899"

# Basic 16
#--color=16

# History Widget
bindkey '^R' fzf-history-widget

# History Sorted
fh() {
    print -z $(
        ([ -n "$ZSH_NAME" ] && fc -l 1 || history) \
        | fzf +s --tac \
        | sed -E 's/ *[0-9]*\*? *//' \
        | sed -E 's/\\/\\\\/g'
    )
}

# Less
export LESS="R"
export LESSOPEN="| /usr/bin/highlight -O ansi %s 2>/dev/null"
# Conf1
#export LESS_TERMCAP_mb="$(printf '%b' '[1;31m')"
#export LESS_TERMCAP_md="$(printf '%b' '[1;36m')"
#export LESS_TERMCAP_me="$(printf '%b' '[0m')"
#export LESS_TERMCAP_so="$(printf '%b' '[01;44;33m')"
#export LESS_TERMCAP_se="$(printf '%b' '[0m')"
#export LESS_TERMCAP_us="$(printf '%b' '[1;32m')"
#export LESS_TERMCAP_ue="$(printf '%b' '[0m')"
# Conf2
#export LESS_TERMCAP_mb="$(printf '%b' '')"
#export LESS_TERMCAP_md="$(printf '%b' '')"
#export LESS_TERMCAP_me="$(printf '%b' '')"
#export LESS_TERMCAP_so="$(printf '%b' '')"
#export LESS_TERMCAP_se="$(printf '%b' '')"
#export LESS_TERMCAP_us="$(printf '%b' '')"
#export LESS_TERMCAP_ue="$(printf '%b' '')"
#Conf3
export LESS_TERMCAP_md=$'\e[01;31m'
export LESS_TERMCAP_me=$'\e[0m'
export LESS_TERMCAP_se=$'\e[0m'
export LESS_TERMCAP_so=$'\e[01;44;33m'
export LESS_TERMCAP_ue=$'\e[0m'
export LESS_TERMCAP_us=$'\e[01;32m'

# Shortcut Script for LF
[ ! -f "$XDG_CONFIG_HOME/shell/shortcutrc" ] && setsid -f shortcuts >/dev/null 2>&1

# Startx for TTY
# [ "$(tty)" = "/dev/tty1" ] && ! pidof -s Xorg >/dev/null 2>&1 && exec startx "$XINITRC"

# Switch keys ESC and CAPS for TTY & no password
sudo -n loadkeys "$XDG_DATA_HOME/larbs/ttymaps.kmap" 2>/dev/null
