# File: /home/$USER/.zshrc
# Author: 4ndr0666
# Edited: 09-22-2024

# ======================================== // 4NDR0666_ZSHRC // 
# ---------------------------- // PROMPTS //
# --- // Fancy Prompt:
source ~/.config/shellz/fancy-prompts.zsh

precmd() {
	fancy-prompts-precmd
}
prompt-zee -PDp "≽ "

# --- // Custom Prompt:
#autoload -U colors && colors    
#PS1="%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[blue]%}%M %{$fg[magenta]%}%🗁%{$fg[red]%}]%{$reset_color%}$%b "

# --- // Powerlevel10 Prompt:
#if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
#fi
#if [ -f /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme ]; then
#   source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme
#fi
#[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# ------------------------------------- // ALIAS //
alias reload='exec zsh'

# -------------------------------------- // CUSTOM FFMPEG BUILD //
export PATH="$HOME/bin:$PATH"
export PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig:$PKG_CONFIG_PATH"
export LD_LIBRARY_PATH="$HOME/ffmpeg_build/lib:$LD_LIBRARY_PATH"

# ---------------------------- // AUTO COMPLETE //
zmodload zsh/complist
fpath=("$HOME/.zsh/completions" "/usr/share/zsh/vendor-completions" $fpath)
autoload -U compinit && compinit
_comp_options+=(globdots)
source <(fzf --zsh)

# Set completion styles
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'
zstyle ':completion:*' rehash true
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*' completer _expand _complete _ignored _approximate
zstyle ':completion:*' select-prompt '%SScrolling active: current selection at %p%s'
zstyle ':completion:*:descriptions' format '%U%F{cyan}%d%f%u'

# Speed-up Completions:
zstyle ':completion:*' accept-exact '*(N)'
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path ~/.cache/zcache

# ---------------------------- // SETOPT //
setopt inc_append_history     # Append to history, not overwrite
setopt share_history          # Share history across all sessions
setopt extended_history       # Save timestamps in history
setopt extended_glob          # Enable extended globbing
setopt hist_ignore_dups   # Remove older duplicates from history
setopt hist_verify            # Show command before executing from history
setopt correct                # Auto-correct command mistakes
setopt autocd                 # Auto `cd` into directories
setopt interactive_comments   # Allow comments in interactive shells
# Disable Ctrl+S to prevent terminal freeze
stty stop undef

# --- // Autoset_Display: 
#if [ -z "$DISPLAY" ]; then
#    if command -v loginctl &>/dev/null; then
#        LOGINCTL_SESSION=$(loginctl show-user "$USER" -p Display 2>/dev/null | cut -d= -f2)
#        if [ -n "$LOGINCTL_SESSION" ]; then
#            export DISPLAY=$(loginctl show-session "$LOGINCTL_SESSION" -p Display | cut -d= -f2)
#        fi
#    fi
#    if command -v ck-list-sessions &>/dev/null; then
#        eval "$(ck-list-sessions | awk "/^Session/{right=0} /unix-user = '$UID'/{right=1} /x11-display = '(.+)'/{ if(right == 1) printf(\"DISPLAY=%s\\n\", \$3); }")"
#    fi
#fi

# --------------------------------------- // ON-DEMAND REHASH //
# Refresh Zsh completions if pacman cache changes
zshcache_time="$(date +%s%N)"

rehash_precmd() {
  if [[ -a /var/cache/zsh/pacman ]]; then
    local paccache_time="$(date -r /var/cache/zsh/pacman +%s%N)"
    if (( zshcache_time < paccache_time )); then
      rehash
      zshcache_time="$paccache_time"
    fi
  fi
}

autoload -Uz add-zsh-hook
add-zsh-hook -Uz precmd rehash_precmd


# ------------------------------------------ // SOURCES //
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-$HOME/.config}"

# Source custom functions
functions_file="$XDG_CONFIG_HOME/shellz/functions/functions.zsh"
if [ -f "$functions_file" ]; then
    source "$functions_file"
else
    echo "Warning: $functions_file not found"
fi

# Source additional configuration files
for config_file in "$XDG_CONFIG_HOME/shellz/.zprofile" "$XDG_CONFIG_HOME/shellz/aliasrc"; do
    if [ -f "$config_file" ]; then
        source "$config_file"
    else
        echo "Warning: $config_file not found"
    fi
done

# ---------------------------- // NVM //
export NVM_DIR="$HOME/.config/nvm"

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

# ---------------------------- // GPG ENV //
gpg_env_file="$XDG_CONFIG_HOME/shellz/gpg_env"
if [ -f "$gpg_env_file" ]; then
    source "$gpg_env_file"
else
    echo "Warning: $gpg_env_file not found"
fi

# ---------------------------- // KEYBINDINGS (Vi Mode) //
bindkey -v                # Enable Vi keybindings
export KEYTIMEOUT=1       # Set key timeout for ZLE

# Use Vi keys in the tab completion menu
bindkey -M menuselect 'h' vi-backward-char
bindkey -M menuselect 'k' vi-up-line-or-history
bindkey -M menuselect 'l' vi-forward-char
bindkey -M menuselect 'j' vi-down-line-or-history

# Delete character with Backspace
bindkey '^?' backward-delete-char

# Change cursor shape based on Vi mode
function zle-keymap-select () {
    case $KEYMAP in
        vicmd) echo -ne '\e[1 q' ;;       # Block cursor for command mode
        viins|main) echo -ne '\e[5 q' ;;  # Beam cursor for insert/main mode
    esac
}
zle -N zle-keymap-select

# Initialize cursor shape on line initialization
zle-line-init() {
    zle -K viins
    echo -ne "\e[5 q"  # Beam cursor
}
zle -N zle-line-init

# Set initial cursor shape
echo -ne '\e[5 q'          # Beam cursor on startup

# Update cursor shape before executing a command
preexec() {
    echo -ne '\e[5 q'      # Beam cursor for new prompt
}

# ---------------------------- // DIRECTORY NAVIGATION //
# Function to switch directories using lf
lfcd() {
    tmp=$(mktemp -uq)
    trap 'rm -f "$tmp" >/dev/null 2>&1 && trap - HUP INT QUIT TERM PWR EXIT' HUP INT QUIT TERM PWR EXIT
    lf -last-dir-path="$tmp" "$@"
    if [ -f "$tmp" ]; then
        dir=$(cat "$tmp")
        if [ -d "$dir" ] && [ "$dir" != "$(pwd)" ]; then
            cd "$dir"
        fi
    fi
}

# Bind Ctrl+O to invoke lfcd
bindkey '^o' lfcd

# Bind Ctrl+A to 'bc -lq' (assuming 'bc' is intended)
alias bc='bc -lq'

# Function to change directory using fzf
cd_fzf() {
    local dir
    dir=$(dirname "$(fzf)")
    if [ -d "$dir" ]; then
        cd "$dir"
    else
        echo "Directory not found: $dir"
    fi
}

# Bind Ctrl+F to invoke cd_fzf
bindkey '^f' cd_fzf

# ---------------------------- // OTHER KEYBINDINGS //
# Delete character with a specific key sequence
bindkey '^[[P' delete-char

# Edit command line with Vim using Ctrl+E
autoload -Uz edit-command-line
zle -N edit-command-line
bindkey '^e' edit-command-line
bindkey -M vicmd '^[[P' vi-delete-char
bindkey -M vicmd '^e' edit-command-line
bindkey -M visual '^[[P' vi-delete

# ---------------------------- // PLUGINS //
# Define the plugins directory
source_dir="/usr/share/zsh/plugins/"

# Source all .zsh plugin files in subdirectories
if [ -d "$source_dir" ]; then
    for plugin_dir in "$source_dir"/*/; do
        for plugin_file in "$plugin_dir"*.zsh; do
            if [ -f "$plugin_file" ]; then
                source "$plugin_file"
            fi
        done
    done
else
    echo "Warning: Plugin directory '$source_dir' does not exist."
fi

# Specific Plugin Sources:
source /usr/share/doc/find-the-command/ftc.zsh noupdate quiet
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.plugin.zsh 2>/dev/null
