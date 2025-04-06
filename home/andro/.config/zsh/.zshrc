#!/bin/zsh

# ---------------------------------- [ PROMPT ] ----------------------------------
## Powerlevel10k

if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

## Standard:

# autoload -U colors && colors
# PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%~%{$fg[red]%}]%{$reset_color%}$%b "

## Solarized:

# PROMPT='%F{32}%n%f%F{166}@%f%F{64}%m:%F{166}%~%f%F{15}$%f '
# RPROMPT='%F{15}(%F{166}%D{%H:%M}%F{15})%f'

## Fancy:

#source ~/.config/zsh/fancy-prompts.zsh
#precmd() { fancy-prompts-precmd; }
#prompt-zee -PDp "≽ "

# ------------------------------ [ ALIASES ] -----------------------------------
alias reload="source ~/.zshrc"

#globalias() {
#    if [[ $LBUFFER =~ [a-zA-Z0-9]+S ]]; then
#        zle _expand_alias
#        zle expand-word
#    fi
#    zle self-insert
#}
#zle -N globalias

# --------------------------- [ Shell Options ] --------------------------------
## Completion & Globbing

setopt nocaseglob extended_glob glob_complete complete_in_word

## Directory Navigation

setopt autocd cdable_vars auto_pushd pushd_to_home pushd_minus pushd_ignore_dups pushd_silent

## Misc

setopt RM_STAR_WAIT print_exit_value no_beep correct
setopt auto_menu auto_list auto_name_dirs auto_param_slash interactive_comments

## Disabled Options
unsetopt correct_all complete_aliases always_to_end menu_complete

DIRSTACKSIZE=8

# ------------------------------- [ HISTORY ] ------------------------------------
## Make Directories

[ ! -d "$XDG_DATA_HOME/zsh}" ] && mkdir -p "$XDG_DATA_HOME/zsh"
chmod ug+rw "$XDG_DATA_HOME/zsh"
[ ! -f "$XDG_DATA_HOME/zsh/history" ] && touch "$XDG_DATA_HOME/zsh/history"
chmod ug+rw "$XDG_DATA_HOME/zsh/history"

## Shell Options

setopt hist_ignore_space hist_reduce_blanks hist_verify extended_history inc_append_history share_history hist_ignore_dups hist_expire_dups_first

HISTSIZE=10000000
SAVEHIST=10000000
HISTFILE="$XDG_DATA_HOME/zsh/history"

## Filter History

h() {
    if [ -z "$*" ]; then
        history 1
    else
        history 1 | egrep "$@"
    fi
}

## h() { if [ -z "$*" ]; then history 1; else history 1 | egrep "$@"; fi; }     # Fix_zsh_history_behavior:

# -------------------------------- [ SOURCE EXTERNAL FILES ] ---------------------
[ -f "$HOME/.config/zsh/aliasrc" ] && source "$HOME/.config/zsh/aliasrc"
[ -f "$HOME/.config/zsh/functions.zsh" ] && source "$HOME/.config/zsh/functions.zsh"
[ -f "$HOME/.config/zsh/.zprofile" ] && source "$HOME/.config/zsh/.zprofile"

# ------------------------------------- [ WIDGETS ] ------------------------------
## FZF Tab Complete

# zstyle ':fzf-tab:complete:(\\|*)cd:*' fzf-preview 'exa -1 --color=always --icons $realpath'
# zstyle ':fzf-tab:complete:systemctl-*:*' fzf-preview 'SYSTEMD_COLORS=1 systemctl status $word'
# zstyle ':fzf-tab:complete:*:*' fzf-preview 'less ${(Q)realpath}'
# zstyle ':fzf-tab:complete:*:options' fzf-preview
# zstyle ':fzf-tab:complete:*:argument-1' fzf-preview

## Basic auto/tab complete

autoload -U compinit
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' matcher-list m:{a-zA-Z}={A-Za-z}
zstyle ':fzf-tab:complete:(-command-|-parameter-|-brace-parameter-|export|unset|expand):*' fzf-preview 'echo ${(P)word}'
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit
_comp_options+=(globdots)

# ------------------------------------- [ KEYBINDINGS ] --------------------------
## Substring Search Keybindings

bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down

## Vim

bindkey -v
export KEYTIMEOUT=1

#### Use vim keys in tab complete menu:
bindkey -M menuselect 'h' vi-backward-char
bindkey -M menuselect 'k' vi-up-line-or-history
bindkey -M menuselect 'l' vi-forward-char
bindkey -M menuselect 'j' vi-down-line-or-history
bindkey -v '^?' backward-delete-char

#### Change cursor shape for different vi modes.
function zle-keymap-select () {
    case $KEYMAP in
        vicmd) echo -ne '\e[1 q';;      # block
        viins|main) echo -ne '\e[5 q';; # beam
    esac
}
zle -N zle-keymap-select
zle-line-init() {
    zle -K viins #### initiate `vi insert` as keymap (can be removed if `bindkey-V` has been set elsewhere)
    echo -ne "\e[5 q"
}
zle -N zle-line-init
echo -ne '\e[5 q' #### Use beam shape cursor on startup.
preexec() { echo -ne '\e[5 q' ;} #### Use beam shape cursor for each new prompt.

## LF

#### Use lf to switch directories and bind it to ctrl-o
lfcd () {
    tmp="$(mktemp -uq)"
    trap 'rm -f $tmp >/dev/null 2>&1 && trap - HUP INT QUIT TERM PWR EXIT' HUP
 INT QUIT TERM PWR EXIT
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

#### Edit line in vim with ctrl-e:
autoload edit-command-line; zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete

# -------------------------------------- [ PLUGINS ] -----------------------------
## NVM

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

## FZF

fpath=("$ZDOTDIR/completions" "/usr/share/zsh/vendor-completions" $fpath)
autoload -U $fpath[1]/*(:t)
source <(fzf --zsh)
[ -f "/usr/share/zsh/plugins/zsh-fzf-plugin/fzf.plugin.zsh" ] && source "/usr/share/zsh/plugins/zsh-fzf-plugin/fzf.plugin.zsh"

## You-should-use

export YSU_MESSAGE_POSITION="after"
[ -f "/usr/share/zsh/plugins/zsh-you-should-use/you-should-use.plugin.zsh" ] && source "/usr/share/zsh/plugins/zsh-fzf-plugin/fzf.plugin.zsh"

## FTC (Find The Command)

#[ -f "/usr/share/doc/find-the-command/ftc.zsh" ] && source "/usr/share/doc/find-the-command/ftc.zsh" noprompt quiet

## Extract

[ -f "/usr/share/zsh/plugins/zsh-extract/extract.plugin.zsh" ] && source "/usr/share/zsh/plugins/zsh-extract/extract.plugin.zsh"

### Sudo

#[ -f "/usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh" ] && source "/usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh"

## SystemdD

[ -f "$ZDOTDIR/systemd_aliases.zsh" ] && source "$ZDOTDIR/systemd_aliases.zsh"


## History-substring-search

[ -f "/usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh" ] && source "/usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh"

## Autosuggestions

ZSH_AUTOSUGGEST_USE_ASYNC=true
[ -f "/usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.plugin.zshosuggestions.zsh" ] && source "/usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh"

## YTDL

[ -f "$ZDOTDIR/ytdl.zsh" ] && source "$ZDOTDIR/ytdl.zsh"

## P10k

source "$HOME/powerlevel10k/powerlevel10k.zsh-theme"
[[ ! -f $ZDOTDIR/.p10k.zsh ]] || source $ZDOTDIR/.p10k.zsh
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
	os_icon
	background_jobs
	dir                       # current directory
	vcs                       # git status
	context                   # user@host
	status                    # and exit status
	newline                   # \n
	virtualenv                # python virtual environment
	prompt_char               # prompt symbol
)
unset POWERLEVEL9K_VISUAL_IDENTIFIER_EXPANSION
typeset -g POWERLEVEL9K_BACKGROUND_JOBS_VERBOSE=true
typeset -g POWERLEVEL9K_BACKGROUND_JOBS_ICON=
typeset -g POWERLEVEL9K_DIR_SHOW_WRITABLE=true
unset POWERLEVEL9K_VCS_BRANCH_ICON

## Fast-Syntax-highlighting

source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh 2>/dev/null
