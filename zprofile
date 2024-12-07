#!/bin/sh

# File: /home/$USER/.config/shell/zenvironment
# Author: 4ndr0666
# Edited: 10-19-24

# ======================================== // ZENVIRONTMENT //
# --- // Dynamic-PATH:
static_dirs=(
    "$HOME/.npm-global/bin"
#    "$HOME/.gem/ruby/2.7.0/bin"  # Adjust Ruby version as needed
    "$HOME/.pyenv/bin"
    "$HOME/.pyenv/shims"
    "$HOME/.config/yarn/global/node_modules/.bin"
    "$HOME/.local/share/go/"
    "/usr/local/go/bin"
    "${JAVA_HOME:-/usr/lib/jvm/default/bin}"  # Use JAVA_HOME if set, else default
    "$HOME/.rvm/bin"
    "$HOME/.virtualenvs"
#    "$HOME/.poetry/bin"
    "$HOME/.local/bin"
    "$HOME/bin"
    "/opt/"
    "$CARGO_HOME/bin"
    "/sbin"
    "/usr/sbin"
    "/usr/local/sbin"
    "/usr/bin"
)
# Use Zsh globbing to find directories under "/Nas/Build/git/syncing/scr/" with max depth 1
dynamic_dirs=(/Nas/Build/git/syncing/scr/*(/))
#$(find /Nas/Build/git/syncing/scr -type d | paste -sd ':' -)
all_dirs=("${static_dirs[@]}" "${dynamic_dirs[@]}")
typeset -U PATH

for dir in "${all_dirs[@]}"; do
    # Remove trailing slash for consistency
    dir=${dir%/}
    # Check if the directory exists
    if [[ -d $dir ]]; then
        # Prepend to PATH to prioritize these directories
        PATH="$PATH:$dir"
    fi
done

export PATH
####################################################################3
#all_dirs=(
#    "$HOME/.npm-global/bin"
#    "$HOME/.cargo/bin"
#    "$HOME/.gem/ruby/2.7.0/bin"  # Adjust Ruby version as needed
#    "$HOME/.pyenv/bin"
#    "$HOME/.pyenv/shims"
#    "$HOME/.config/yarn/global/node_modules/.bin"
#    "$HOME/.local/share/go/"
#    "/usr/local/go/bin"
#    "${JAVA_HOME:-/usr/lib/jvm/default/bin}"  # Use JAVA_HOME if set, else default
#    "$HOME/.rvm/bin"
#    "$HOME/.virtualenvs"
#    "$HOME/.poetry/bin"
#    "$HOME/bin"
#    "$HOME/.local/bin"
#    "/home/andro/bin/"
#    "/opt/bin"
#    "/sbin"
#    "/usr/sbin"
#    "/usr/local/sbin"
#    "/usr/bin"
#)
#additional_dirs=($(find '/Nas/Build/git/syncing/scr/' -maxdepth 1 -type d 2>/dev/null))
#
# Use Zsh globbing to find directories under "/Nas/Build/git/syncing/scr/"
#additional_dirs=(/Nas/Build/git/syncing/scr/*(/))
#
# Add the additional directories to the all_dirs array
#all_dirs+=("${additional_dirs[@]}")
#
# Update PATH with all valid directories
#for dir in "${all_dirs[@]}"; do
#    if [[ -d $dir ]]; then
#        PATH="$PATH:$dir"
#    fi
#done
# Export the path
#export PATH
# Ensure no duplicates
#typeset -U path PATH cdpath CDPATH fpath FPATH manpath MANPATH
###########################################################################
unsetopt PROMPT_SP 2>/dev/null

# ================================== // Default_programs:
export MICRO_TRUECOLOR=1
export EDITOR="nvim"
export TERMINAL="alacritty"
export TERMINAL_PROG="st"
export BROWSER="brave-beta"

export HISTFILE="$HOME/.zsh_history"
HISTSIZE=30000
SAVEHIST=30000
mkdir -p "$(dirname "$HISTFILE")"
#if [ ! -d "$HISTFILE" ]; then
#    mkdir -p "$HISTFILE"
#fi
export TRASHDIR="/home/andro/.local/share/Trash"

# --- // XDG Base Directory Configuration:
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_CACHE_HOME="$HOME/.cache"

# --- // XDG_RUNTIME_DIR_SETUP:
if [ -z "$XDG_RUNTIME_DIR" ]; then
    export XDG_RUNTIME_DIR="/run/user/$(id -u)"
fi

if [ ! -d "$XDG_RUNTIME_DIR" ]; then
    mkdir -p "$XDG_RUNTIME_DIR"
fi

# --- // XDG_DATA_DIRS_SETUP:
[ -z "$XDG_DATA_DIRS" ] && export XDG_DATA_DIRS="/usr/local/share:/usr/share"

# --- // XDG_COMPLIANCE
export XINITRC="$XDG_CONFIG_HOME/x11/xinitrc"
#export XAUTHORITY="$XDG_RUNTIME_DIR/Xauthority" # This line will break some DMs.
export NOTMUCH_CONFIG="$XDG_CONFIG_HOME/notmuch-config"
export GTK2_RC_FILES="$XDG_CONFIG_HOME/gtk-2.0/gtkrc-2.0"
export WGETRC="$XDG_CONFIG_HOME/wget/wgetrc"
export INPUTRC="$XDG_CONFIG_HOME/shell/inputrc"
export WINEPREFIX="$XDG_DATA_HOME/wineprefixes/default"
mkdir -p "$WINEPREFIX"
export WINEARCH="win32"
export PASSWORD_STORE_DIR="$XDG_DATA_HOME/password-store"
export TMUX_TMPDIR="$XDG_RUNTIME_DIR"
export ANDROID_SDK_HOME="$XDG_CONFIG_HOME/android"
export CARGO_HOME="${XDG_DATA_HOME:-$HOME/.local/share}/cargo"
export GOPATH="$XDG_DATA_HOME/go"
export GOMODCACHE="$XDG_CACHE_HOME/go/mod"
#export POETRY_CACHE_DIR="$XDG_CACHE_HOME/pypoetry"
export POETRY_VIRTUALS_PATH="$POETRY_CACHE_DIR/virtualenvs"
export ENV_DIR="$XDG_DATA_HOME/virtualenv"
export VIRTUAL_ENV_PROMPT="(💀)"
export PYTHONSTARTUP="$XDG_CONFIG_HOME/python/pythonrc"
export PIP_DOWNLOAD_CACHE="$XDG_CACHE_HOME/pip/"
export SQLITE_HISTORY="$XDG_DATA_HOME/sqlite_history"
# export KODI_DATA="$XDG_DATA_HOME/kodi"
export ZDOTDIR="$XDG_CONFIG_HOME/shellz/"
#mkdir -p "$WINEPREFIX" "$CARGO_HOME" "$GOPATH" "$GOMODCACHE"
export DICS="/usr/share/stardict/dic/"

# ================================================ // X11:
#export GTK2_RC_FILES="$HOME/.gtkrc-2.0"
# --- OPENBOX:
# export XGD_CURRENT_DESKTOP='openbox'
# export _JAVA_AWT_WM_NONREPARENTING=1
# export OpenGL_GL_PREFERENCE=GLVND  # For screen tearing
# export QT_QPA_PLATFORMTHEME=qt5ct
# export MOZ_USE_XINPUT2=1
# export AWT_TOOLKIT=MToolkit wmname LG3D  # May have to install wmname
# export _JAVA_OPTIONS="-Dawt.useSystemAAFontSettings=on -Dswing.aatext=true -Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel -Dswing.crossplatformlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel ${_JAVA_OPTIONS}"

# --- // Auto-complete:
#zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'  # Case insensitive tab completion
#zstyle ':completion:*' rehash true  # Automatically find new executables in path
#zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"  # Colored completion (different colors for dirs/files/etc)
#zstyle ':completion:*' completer _expand _complete _ignored _approximate
#zstyle ':completion:*' menu select
#zstyle ':completion:*' select-prompt '%SScrolling active: current selection at %p%s'
#zstyle ':completion:*:descriptions' format '%U%F{cyan}%d%f%u'

# --- // Speed-up Completeions:
#zstyle ':completion:*' accept-exact '*(N)'
#zstyle ':completion:*' use-cache on
#zstyle ':completion:*' cache-path ~/.cache/zcache
#source <(fzf --zsh)

# ======================================= // LIBRARY_AND_SECURITY //
export LD_LIBRARY_PATH="/home/andro/ffmpeg_build/lib:$HOME/.local/lib:/usr/local/lib:$LD_LIBRARY_PATH"
export SUDO_ASKPASS="/usr/bin/pinentry-dmenu"
# export XAUTHORITY="$XDG_RUNTIME_DIR/Xauthority"

# --- // GPG:
export GNUPGHOME="$HOME/.gnupg"
if [ ! -d "$GNUPGHOME" ]; then
    mkdir -p "$GNUPGHOME"
fi
chmod 700 "$GNUPGHOME"
#export GPG_TTY="$(tty)"
#gpg-connect-agent updatestartuptty /bye >/dev/null
#gpg-connect-agent reloadagent /bye >/dev/null
#eval $(ssh-agent) && ssh-add 2&>/dev/null

# ========================================== // Pager:
# --- // Bat:
export MANPAGER="sh -c 'col -bx | bat -l man -p | less -R'"

# --- // Fzf:
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

bindkey '^R' fzf-history-widget

export FZF_DEFAULT_OPTS="
  --layout=reverse
  --height=40%
  --border
  --bind='ctrl-a:select-all,ctrl-d:deselect-all'
  --cycle
  --inline-info
  --tiebreak=index
  --preview='bat --style=numbers --color=always --line-range :500 {} | head -n 100'
  --preview-window='right:50%'
  --color=bg+:-1,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8 \
  --color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc \
  --color=marker:#f5e0dc,fg+:#a6e3a1,prompt:#cba6f7,hl+:#f38ba8"

#export FZF_DEFAULT_OPTS="
#  --layout=reverse
#  --height=40%
#  --border
#  --bind='ctrl-a:select-all,ctrl-d:deselect-all'
#  --cycle
#  --inline-info
#  --tiebreak=index
#  --preview='bat --style=numbers --color=always --line-range :500 {}'
#  --color=bg+:-1,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8 \
#  --color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc \
#  --color=marker:#f5e0dc,fg+:#a6e3a1,prompt:#cba6f7,hl+:#f38ba8"


# Ensure truecolor support
case "${COLORTERM}" in
    truecolor|24bit) ;;  # Already supports truecolor
    *) export COLORTERM="24bit" ;;
esac

# --- // LESS Configuration:
export LESS='-R'  # Preserve raw control characters
unset LESS_TERMCAP_mb
unset LESS_TERMCAP_md
unset LESS_TERMCAP_me
unset LESS_TERMCAP_so
unset LESS_TERMCAP_se
unset LESS_TERMCAP_us
unset LESS_TERMCAP_ue

# --- // LESSOPEN Configuration:
export LESSOPEN="| bat --paging=never --style=numbers --color=always {}"

# ------------------------------------------------------- // MISC //
# --- // SPEEDUP KEYS:
#command -v xset &>/dev/null && xset r rate 300 50 || echo "xset command not found, skipping keyboard rate configuration."
#xset r rate 300 50

# --- // LF_SHORTCUTS:
[ ! -f "$XDG_CONFIG_HOME/shell/shortcutrc" ] && setsid -f shortcuts >/dev/null 2>&1
# Switch escape and caps if tty and no passwd required:
#sudo -n loadkeys "$XDG_DATA_HOME/larbs/ttymaps.kmap" 2>/dev/null
