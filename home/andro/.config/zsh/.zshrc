# Author: 4ndr0666
# ====================== // ZSHRC //

# --- THEMES ---
# Powerlevel10k
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
# Standard
#autoload -U colors && colors
#PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%~%{$fg[red]%}]%{$reset_color%}$%b "
# Solarized
#PROMPT='%F{32}%n%f%F{166}@%f%F{64}%m:%F{166}%~%f%F{15}$%f '
#RPROMPT='%F{15}(%F{166}%D{%H:%M}%F{15})%f'
# Fancy
#source ~/.config/zsh/fancy-prompts.zsh
#precmd() { fancy-prompts-precmd; }
#prompt-zee -PDp "≽ "


# ---ALIASES ---
alias reload="source ~/.zshrc"
# globalias() {
#    if [[ $LBUFFER =~ [a-zA-Z0-9]+S ]]; then
#        zle _expand_alias
#        zle expand-word
#    fi
#    zle self-insert
# }
# zle -N globalias


# --- DIRSTACK & SHELL OPT ---
# Dirstack
autoload -Uz add-zsh-hook
DIRSTACKFILE="${XDG_CACHE_HOME:-$HOME/.cache}/zsh/dirs"
if [[ -f "$DIRSTACKFILE" ]] && (( ${#dirstack} == 0 )); then
	dirstack=("${(@f)"$(< "$DIRSTACKFILE")"}")
	[[ -d "${dirstack[1]}" ]] && cd -- "${dirstack[1]}"
fi
chpwd_dirstack() {
	print -l -- "$PWD" "${(u)dirstack[@]}" > "$DIRSTACKFILE"
}
add-zsh-hook -Uz chpwd chpwd_dirstack
DIRSTACKSIZE='20'
# Shell Options
setopt AUTO_PUSHD PUSHD_SILENT PUSHD_TO_HOME
setopt PUSHD_IGNORE_DUPS # Remove duplicate entries
setopt PUSHD_MINUS   # This reverts the +/- operators.
setopt NOCASEGLOB EXTENDED_GLOB GLOB_COMPLETE COMPLETE_IN_WORD # Completion & Globbing
setopt AUTOCD CDABLE_VARS  # Directory Navigation
setopt RM_STAR_WAIT PRINT_EXIT_VALUE
setopt AUTO_MENU AUTO_LIST AUTO_NAME_DIRS AUTO_PARAM_SLASH INTERACTIVE_COMMENTS
# Disabled Options
#unsetopt correct_all complete_aliases always_to_end menu_complete


# --- HISTORY ---
HISTSIZE=10000000
SAVEHIST=10000000
HISTFILE="${XDG_CACHE_HOME:-$HOME/.cache}/zsh/history"
setopt hist_ignore_space hist_reduce_blanks hist_verify extended_history inc_append_history hist_ignore_dups hist_expire_dups_first


# --- EXTERNAL FILE SOURCING ---
# Aliases
[ -f "$HOME/.config/zsh/aliasrc" ] && source "$HOME/.config/zsh/aliasrc"
# Functions
[ -f "$HOME/.config/zsh/functions.zsh" ] && source "$HOME/.config/zsh/functions.zsh"
# Zprofile
[ -f "$HOME/.config/zsh/.zprofile" ] && source "$HOME/.config/zsh/.zprofile"


# --- FUNCTIONS ---
# Fix Zsh Behavior
h() {
    if [ -z "$*" ]; then
        history 1
    else
        history 1 | egrep "$@"
    fi
}
# ALT:
#h() { if [ -z "$*" ]; then history 1; else history 1 | egrep "$@"; fi; }:

# Reloads dynamic dirs from cache file
# Used in USR1 signal trap below.
reload_scr_path() {
  local cache_file="${XDG_CACHE_HOME:-$HOME/.cache}/dynamic_dirs.list"
  local scr_root='/home/git/clone/4ndr0666/scr'

  # Purge all old script paths from the current path array
  path=("${(@)path:#$scr_root*}")

  # Read the updated, colon-separated string from cache and add to path
  if [[ -r "$cache_file" ]]; then
    path+=( ${(s/:/)_p:}$(<$cache_file) )
  fi
}

# USR1 Signal Trap
# Triggered by -> /etc/pacman.d/hooks/zsh-rehash.hook or path-watcher service file.
# "https://wiki.archlinux.org/title/Zsh#Command_completion"
TRAPUSR1() {
    reload_scr_path
    rehash
    echo "zsh PATH and command hash reloaded."
}

# Resets Tty
# Test if if works with: $ print '\e(0\e)B'
autoload -Uz add-zsh-hook
function reset_broken_terminal () {
	printf '%b' '\e[0m\e(B\e)0\017\e[?5l\e7\e[0;0r\e8'
}
add-zsh-hook -Uz precmd reset_broken_terminal

# Force ctrl+D to close shell
exit_zsh() { exit }
zle -N exit_zsh
bindkey '^D' exit_zsh


# --- WIDGETS ---
# Fzf tab complete
#zstyle ':fzf-tab:complete:(\\|*)cd:*' fzf-preview 'exa -1 --color=always --icons $realpath'
#zstyle ':fzf-tab:complete:systemctl-*:*' fzf-preview 'SYSTEMD_COLORS=1 systemctl status $word'
#zstyle ':fzf-tab:complete:*:*' fzf-preview 'less ${(Q)realpath}'
#zstyle ':fzf-tab:complete:*:options' fzf-preview
#zstyle ':fzf-tab:complete:*:argument-1' fzf-preview

# Basic auto/tab complete
fpath=("${ZDOTDIR:-$HOME/.config/zsh}/completions" $fpath)
_comp_options+=(globdots)
autoload -Uz compinit
compinit
zstyle ':completion::complete:*' gain-privileges 1
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' matcher-list m:{a-zA-Z}={A-Za-z}
zstyle ':fzf-tab:complete:(-command-|-parameter-|-brace-parameter-|export|unset|expand):*' fzf-preview 'echo ${(P)word}'
zstyle  ':completion:*' completer _complete _approximate _ignored
zmodload zsh/complist


# --- KEYBINDS ---
# Substring search
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
# Vim
bindkey -v
export KEYTIMEOUT=1
# Vim keys in tab complete menu
bindkey -M menuselect 'h' vi-backward-char
bindkey -M menuselect 'k' vi-up-line-or-history
bindkey -M menuselect 'l' vi-forward-char
bindkey -M menuselect 'j' vi-down-line-or-history
bindkey -v '^?' backward-delete-char
# Change cursor for diff modes
function zle-keymap-select () {
    case $KEYMAP in
        vicmd) echo -ne '\e[1 q';;      # block
        viins|main) echo -ne '\e[5 q';; # beam
    esac
}
zle -N zle-keymap-select

zle-line-init() {
    zle -K viins # initiate `vi insert` as keymap (can be removed if `bindkey-V` has been set elsewhere)
    echo -ne "\e[5 q"
}
zle -N zle-line-init
echo -ne '\e[5 q' # Use beam shape cursor on startup.
preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.


# --- LF ---
# Switch dirs with ctrl+O
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

# Open editor with ctrl+E
autoload edit-command-line; zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete


# --- PLUGINS ---
# Nvm
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

# Fzf
#autoload -U $fpath[1]/*(:t)
source <(fzf --zsh)
source "/usr/share/zsh/plugins/zsh-fzf-plugin/fzf.plugin.zsh"

# Extract
source "/usr/share/zsh/plugins/zsh-extract/extract.plugin.zsh"

# Sudo
#[ -f "/usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh" ] && source "/usr/share/zsh/plugins/zsh-sudo/sudo.plugin.zsh"

# Systemd aliases
source "$ZDOTDIR/systemd_aliases.zsh"

# History-substring-search
source "/usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh"

# Autosuggestions
ZSH_AUTOSUGGEST_USE_ASYNC=true
source "/usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh"

# Ytdl
source "/home/andro/.config/zsh/ytdl.zsh"

# Clean.zsh (cleans weird chars from all files in dir)
source "/home/andro/.config/zsh/clean.zsh"

# Git extras
source "/usr/share/doc/git-extras/git-extras-completion.zsh"
CLICOLOR_FORCE=1
GLAMOUR_STYLE=ascii.json

# P10K
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

# Syntax highlighting
if [ -f /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh ]; then
  source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
fi
