# File: /home/$USER/.zshrc
# Author: 4ndr0666
# Edited: 09-22-2024

# =========================================== // 4NDR0666_ZSHRC //
# --- // Powerlevel10 Prompt:
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# --- // Fancy Prompt:
#source ~/.config/shellz/fancy-prompts.zsh
#precmd() {
#	fancy-prompts-precmd
#}
#prompt-zee -PDp "≽ "

# --- // Standard Prompt:
#autoload -U colors && colors
#PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%~%{$fg[red]%}]%{$reset_color%}$%b "

# ===================================================== // SETOPT //
setopt extended_glob          # Extended globbing
setopt autocd                 # Auto CD
setopt interactive_comments   # Allow coments in interactive shells
stty stop undef               # Disable Ctrl+S to prevent terminal freeze
setopt appendhistory    

# ============================================ // REHASH //
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

# ============================================= // AUTO COMPLETE/SUGGEST //
autoload -U compinit
compinit -d $XDG_CACHE_HOME/zsh/zcompdump-"$ZSH_VERSION"
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' rehash true
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle -d ':completion:*' format
zstyle ':completion:*:descriptions' format '[%d]'
zstyle ':completion:*' completer _expand _complete _ignored _approximate
zstyle ':completion:*' select-prompt '%SScrolling active: current selection at %p%s'
zstyle ':completion:*:descriptions' format '%U%F{cyan}%d%f%u'

# --- // Completion_Speed-Up:
zstyle ':completion:*' accept-exact '*(N)'
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path $XDG_CACHE_HOME/zcache
zmodload zsh/complist
compinit
_comp_options+=(globdots)

#--- // Completion_speed-up w fzf: 
#_fzf_compgen_path() {
#	fd --hidden --follow --exclude ".git" . "$1"
#}

#_fzf_comgen_dir() {
#	fd --type d --hidden --follow --exclude ".git" . "$1"
#}

# ====================================== // BINDINGS //
# --- // Autosuggest_accept: 
bindkey '^ ' autosuggest-accept

# --- // LFCD:
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

# --- // VIM:
# Delete character with a specific key sequence
bindkey '^[[P' delete-char

# Edit command line with Vim using Ctrl+E
autoload -Uz edit-command-line
zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete


# =========================================================== // NVM //
export NVM_DIR="$XDG_CONFIG_HOME/nvm"

# Function to source NVM scripts
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

# =========================================================== // ALIASES //
# --- // Fix_zsh_history_behavior:
h() { if [ -z "$*" ]; then history 1; else history 1 | egrep "$@"; fi; }
alias reload='exec zsh'
alias mpv1='mpv --input-ipc-server=/tmp/mpvSockets/socket1'
alias mpv2='mpv --input-ipc-server=/tmp/mpvSockets/socket2'

# ======================================================= // EXTERNAL SOURCING
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-$HOME/.config}"

# --- // Functions:
for functions_file in "$XDG_CONFIG_HOME/shellz/functions/functions.zsh" "$XDG_CONFIG_HOME/shellz/printer"; do
    if [ -f "$functions_file" ]; then
        source "$functions_file"
    else
        echo "Warning: $functions_file not found"
    fi
done

# --- // Configs:
for config_file in "$XDG_CONFIG_HOME/zsh/.zprofile" "$XDG_CONFIG_HOME/shellz/aliasrc"; do
    if [ -f "$config_file" ]; then
        source "$config_file"
    else
        echo "Warning: $config_file not found"
    fi
done


# ============================================================ // PLUGINS //
# --- // FZF
fpath=("$XDG_DATA_HOME/zsh/completions" "/usr/share/zsh/vendor-completions" $fpath)
source <(fzf --zsh)

# --- // Standard_plugins:
#source /usr/share/doc/find-the-command/ftc.zsh noupdate quiet
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh 2>/dev/null
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 2>/dev/null
source /usr/share/autojump/autojump.zsh 2>/dev/null

# --- // P10k:
source ~/powerlevel10k/powerlevel10k.zsh-theme
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# To customize prompt, run `p10k configure` or edit ~/.config/zsh//.p10k.zsh.
[[ ! -f ~/.config/zsh//.p10k.zsh ]] || source ~/.config/zsh//.p10k.zsh

# To customize prompt, run `p10k configure` or edit ~/.config/zsh/.p10k.zsh.
[[ ! -f ~/.config/zsh/.p10k.zsh ]] || source ~/.config/zsh/.p10k.zsh
