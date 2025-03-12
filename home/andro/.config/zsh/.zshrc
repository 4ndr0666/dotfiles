#!/usr/bin/env bash

# ============================ // ZSHRC //

## Reload
alias reload='echo "Reloading .zshrc" && source ~/.zshrc'

## Powerlevel10k

if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

## Alternative Prompt Options
# Uncomment the following sections to use Standard, Solarized, or Fancy prompts.

# ## Standard:
# autoload -U colors && colors
# PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%~%{$fg[red]%}]%{$reset_color%}$%b "
#
# ##Solarized:
# PROMPT='%F{32}%n%f%F{166}@%f%F{64}%m:%F{166}%~%f%F{15}$%f '
# RPROMPT='%F{15}(%F{166}%D{%H:%M}%F{15})%f'
#
# ##Fancy:
# source ~/.config/zsh/fancy-prompts.zsh
# precmd() { fancy-prompts-precmd; }
# prompt-zee -PDp "≽ "

## Widgets

autoload -U compinit && compinit
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

### fzf-tab preview configurations
zstyle ':fzf-tab:complete:(\\|*)cd:*' fzf-preview 'exa -1 --color=always --icons $realpath'
zstyle ':fzf-tab:complete:systemctl-*:*' fzf-preview 'SYSTEMD_COLORS=1 systemctl status $word'
zstyle ':fzf-tab:complete:(-command-|-parameter-|-brace-parameter-|export|unset|expand):*' fzf-preview 'echo ${(P)word}'
zstyle ':fzf-tab:complete:*:*' fzf-preview 'less ${(Q)realpath}'
zstyle ':fzf-tab:complete:*:options' fzf-preview
zstyle ':fzf-tab:complete:*:argument-1' fzf-preview
zstyle ':completion:*' menu select=2
export LESSOPEN='|fzf_preview %s'

## Shell Options

### Completion & Globbing
setopt extended_glob glob_complete complete_in_word

### Directory Navigation
setopt autocd cdable_vars auto_pushd pushd_to_home pushd_minus pushd_ignore_dups pushd_silent

### Misc
setopt RM_STAR_WAIT print_exit_value no_beep correct
setopt auto_menu auto_list auto_name_dirs auto_param_slash interactive_comments

### Disabled Options
unsetopt correct_all complete_aliases always_to_end menu_complete

DIRSTACKSIZE=8

## History

### Shell options
setopt hist_ignore_space hist_reduce_blanks hist_verify extended_history inc_append_history share_history hist_ignore_dups hist_expire_dups_first

[ ! -d "$HOME/.cache/zsh" ] && mkdir -p "$HOME/.cache/zsh"
chmod ug+rw "$HOME/.cache/zsh"
[ ! -f "$HOME/.cache/zsh/history" ] && touch "$HOME/.cache/zsh/history"
chmod ug+rw "$HOME/.cache/zsh/history"
HISTSIZE=10000000
SAVEHIST=10000000
HISTFILE="$HOME/.cache/zsh/history"

### History Widget: Display the latest command or filter history based on input.
h() {
    if [ -z "$*" ]; then
        history 1
    else
        history 1 | egrep "$@"
    fi
}

## Expand global aliases:

globalias() {
    if [[ $LBUFFER =~ [a-zA-Z0-9]+S ]]; then
        zle _expand_alias
        zle expand-word
    fi
    zle self-insert
}
zle -N globalias

## FD

### Use FD indtead of find
#_fzf_compgen_path() {
#	fd --hidden --follow --exclude ".git" . "$1"
#}

#_fzf_compgen_dir() {
#	fd --type d --hidden --follow --exclude ".git" . "$1"
#}

## Rehash

if [[ ! -d "$HOME/.cache/zsh/zcache" ]]; then
    mkdir -p "$HOME/.cache/zsh/zcache" >/dev/null 2>&1
    chmod ug+rw "$HOME/.cache/zsh/zcache" >/dev/null 2>&1
fi

zshcache_time="$(date +%s%N)"
rehash_precmd() {
    if [[ -a /var/cache/zsh/pacman ]]; then
        local paccache_time
        paccache_time="$(stat -c %Y /var/cache/zsh/pacman)"
        if (( zshcache_time < paccache_time )); then
            rehash
            zshcache_time="$paccache_time"
        fi
    fi
}
autoload -Uz add-zsh-hook
add-zsh-hook -Uz precmd rehash_precmd

# Keybindings

## Vim

bindkey -v
export KEYTIMEOUT=1

#### Vim keybindings for swap and tab-complete
bindkey -a a vi-add-eol
bindkey -a A vi-add-next

#### Vim tab-complete menu keybindings
bindkey -a h backward-char
bindkey -a n history-substring-search-down
bindkey -a e history-substring-search-up
bindkey -a k vi-repeat-search
bindkey -a K vi-rev-repeat-search
bindkey -a j vi-forward-workd-end
bindkey -a E vi-forward-blank-word-end

#### Home and End keys
bindkey -a "^[[1~" beginning-of-line
bindkey -a "^[[4~" end-of-line

#### History substring search keybindings
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
bindkey "^[[1~" beginning-of-line
bindkey "^[[4~" end-of-line
bindkey "^[[5~" beginning-of-history
bindkey "^[[6~" end-of-history
bindkey "^[[3~" delete-char
bindkey "^[[2~" quoted-insert

#### Delete and kill word keybindings
bindkey '^?' backward-delete-char
bindkey "^W" backward-kill-word
bindkey '^H' backward-kill-word

## LF

lfcd() {
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

#### Edit line in vim with ctrl-e:
autoload edit-command-line
zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete

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
source_nvm "$NVM_DIR/bash_completion"

## Source the files:

[ -f "$HOME/.config/zsh/aliasrc" ] && source "$HOME/.config/zsh/aliasrc"
[ -f "$HOME/.config/zsh/functions.zsh" ] && source "$HOME/.config/zsh/functions.zsh"
[ -f "$HOME/.config/zsh/.zprofile" ] && source "$HOME/.config/zsh/.zprofile"

# Plugins

## FZF

fpath=("$HOME/.config/zsh/completions" "/usr/share/zsh/vendor-completions" $fpath)
source <(fzf --zsh)
source /usr/share/zsh/plugins/zsh-fzf-plugin/fzf.plugin.zsh 2>/dev/null

## You-should-use

export YSU_MESSAGE_POSITION="after"
source /usr/share/zsh/plugins/zsh-you-should-use/you-should-use.plugin.zsh 2>/dev/null

## FTC (Find The Command)

source /usr/share/doc/find-the-command/ftc.zsh noprompt quiet 2>/dev/null

## Extract

source /usr/share/zsh/plugins/zsh-extract/extract.plugin.zsh 2>/dev/null

## Sudo

source /usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh 2>/dev/null

## SystemdD

source /usr/share/zsh/plugins/zsh-systemd/systemd.plugin.zsh 2>/dev/null

## History-substring-search

source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh 2>/dev/null

## Autosuggestions

ZSH_AUTOSUGGEST_USE_ASYNC=true
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null

## YTDL

source ~/.config/zsh/ytdl.zsh

## Git Extras

source /usr/share/doc/git-extras/git-extras-completion.zsh 2>/dev/null

## P10k

source ~/powerlevel10k/powerlevel10k.zsh-theme
[[ ! -f ${ZDOTDIR:-~}/.p10k.zsh ]] || source ${ZDOTDIR:-~}/.p10k.zsh
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
    os_icon
    background_jobs
    dir         # current directory
    vcs         # git status
    context     # user@host
    status      # exit status
    newline     # newline
    virtualenv  # python virtual environment
    prompt_char # prompt symbol
)
unset POWERLEVEL9K_VISUAL_IDENTIFIER_EXPANSION
typeset -g POWERLEVEL9K_BACKGROUND_JOBS_VERBOSE=true
typeset -g POWERLEVEL9K_BACKGROUND_JOBS_ICON=''
typeset -g POWERLEVEL9K_DIR_SHOW_WRITABLE=true
unset POWERLEVEL9K_VCS_BRANCH_ICON

## Fast-Syntax-highlighting

source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh 2>/dev/null
