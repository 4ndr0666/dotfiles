# File: /home/$USER/.zshrc
# Author: 4ndr0666
# Edited: 09-22-2024

# =========================================== // 4NDR0666_ZSHRC //
## Powerlevel10k Prompt
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

## Standard Prompt
autoload -U colors && colors
PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%~%{$fg[red]%}]%{$reset_color%}$%b "

## Fancy Prompt
#source ~/.config/shellz/fancy-prompts.zsh
#precmd() {
#   fancy-prompts-precmd
#}
#prompt-zee -PDp "≽ "

# --- // Setopt:
setopt extended_glob
setopt autocd
setopt interactive_comments

# --- // History:
HISTSIZE=10000000
SAVEHIST=10000000
HISTFILE="$HOME/.cache/zsh/history"
setopt inc_append_history

# --- // Rehash:
zshcache_time="$(date +%s%N)"

rehash_precmd() {
    if [[ -a /var/cache/zsh/pacman ]]; then
        local paccache_time="$(stat -c %Y /var/cache/zsh/pacman)"
        if (( zshcache_time < paccache_time )); then
            rehash
            zshcache_time="$paccache_time"
        fi
    fi
}
autoload -Uz add-zsh-hook
add-zsh-hook -Uz precmd rehash_precmd

# --- // Autocomplete:
#if [[ ! -d "$HOME/.cache/zsh/zcache" ]]; then
#    touch "$HOME/.cache/zsh/zcache" 
#    chmod ug+rw "$HOME/.cache/zsh/zcache" 
#else
#    exit 0
#fi

autoload -U compinit && compinit
eval "$(register-python-argcomplete pipx)"
_comp_options+=(globdots)
zmodload zsh/complist
compinit -d $XDG_CACHE_HOME/zsh/zcompdump-"$ZSH_VERSION"
compinit -f $HOME/.cache/zcache
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' rehash true
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle -d ':completion:*' format
zstyle ':completion:*:descriptions' format '[%d]'
zstyle ':completion:*' completer _expand _complete _ignored _approximate
zstyle ':completion:*' select-prompt '%SScrolling active: current selection at %p%s'
zstyle ':completion:*:descriptions' format '%U%F{cyan}%d%f%u'
bindkey '^ ' autosuggest-accept
## Speed-Up:
zstyle ':completion:*' accept-exact '*(N)'
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path $HOME/.cache/zsh

# --- // Sourcing:
[ -f "$HOME/.config/shellz/aliasrc" ] && source "$HOME/.config/shellz/aliasrc"
[ -f "$HOME/.config/shellz/functions.zsh" ] && source "$HOME/.config/shellz/functions.zsh"
[ -f "$HOME/.zprofile" ] && source "$HOME/.zprofile"

# --- // Bindings:
## VIM:
bindkey -v
export KEYTIMEOUT=1
# Use vim keys in tab complete menu:
bindkey -M menuselect 'h' vi-backward-char
bindkey -M menuselect 'k' vi-up-line-or-history
bindkey -M menuselect 'l' vi-forward-char
bindkey -M menuselect 'j' vi-down-line-or-history
bindkey -v '^?' backward-delete-char
# Change cursor shape for different vi modes.
function zle-keymap-select () {
    case $KEYMAP in
        vicmd) echo -ne '\e[1 q';;      # block
        viins|main) echo -ne '\e[5 q';; # beam
    esac
}
zle -N zle-keymap-select
zle-line-init() {
    zle -K viins # initiate `vi insert` as keymap (can be removed if `bindkey -V` has been set elsewhere)
    echo -ne "\e[5 q"
}
zle -N zle-line-init
echo -ne '\e[5 q' # Use beam shape cursor on startup.
preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.

## LF:
lfcd () {
    tmp="$(mktemp -uq)"
    trap 'rm -f $tmp >/dev/null 2>&1 && trap - HUP INT QUIT TERM PWR EXIT' HUP INT QUIT TERM PWR EXIT
    lf -last-dir-path="$tmp" "$@"
    if [ -f "$tmp" ]; then
        dir="$(cat "$tmp")"
        [ -d "$dir" ] && [ "$dir" != "$(pwd)" ] && cd "$dir"
    fi
}
bindkey -s '^o' '^ulfcd\n'

bindkey -s '^a' '^ubc -lq\n'

bindkey -s '^f' '^ucd "$(dirname "$(fzf)")"\n'

bindkey '^[[P' delete-char

# Edit line in vim with ctrl-e:
autoload edit-command-line; zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete

# --- // NVM:
export NVM_DIR="$XDG_CONFIG_HOME/nvm"

source_nvm() {
    local script="$1"
    if [ -s "$script" ]; then
        source "$script"
    else
        echo "Warning: NVM script not found at $script"
    fi
}
source_nvm "$NVM_DIR/nvm.sh"
source_nvm "$NVM_DIR/bash_completion"

# --- // Minor Aliases:
h() { if [ -z "$*" ]; then history 1; else history 1 | egrep "$@"; fi; }     # Fix_zsh_history_behavior:
alias mpv1='mpv --input-ipc-server=/tmp/mpvSockets/socket1'
alias mpv2='mpv --input-ipc-server=/tmp/mpvSockets/socket2'

# --- // Plugins:
## FZF
fpath=("$XDG_CONFIG_HOME/shellz/completions" "/usr/share/zsh/vendor-completions" $fpath)
source <(fzf --zsh)

## FTC
source /usr/share/doc/find-the-command/ftc.zsh noprompt quiet 2>/dev/null

## You-should-use
source /usr/share/zsh/plugins/zsh-you-should-use/you-should-use.plugin.zsh 2>/dev/null

## Extract
source /usr/share/zsh/plugins/zsh-extract/extract.plugin.zsh 2>/dev/null

## Sudo
source /usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh 2>/dev/null

## SystemdD
source /usr/share/zsh/plugins/zsh-systemd/systemd.plugin.zsh 2>/dev/null

## History-substring-search
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh 2>/dev/null

## Autosuggestions
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null

# --- // P10k:
source ~/powerlevel10k/powerlevel10k.zsh-theme
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

## Syntax-highlighting
source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh 2>/dev/null
