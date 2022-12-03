#           ______   ______   __  __   ______   ______
#          /\___  \ /\  ___\ /\ \_\ \ /\  == \ /\  ___\
#          \/_/  /__\ \___  \\ \  __ \\ \  __< \ \ \____
#       _    /\_____\\/\_____\\ \_\ \_\\ \_\ \_\\ \_____\
#      (_)   \/_____/ \/_____/ \/_/\/_/ \/_/ /_/ \/_____/

# If not running interactively, don't do anything
[[ $- =~ i ]] || return

eval "$(starship init zsh)"
function set_win_title(){
  echo -ne "\033]0; $USER@$HOST:${PWD/$HOME/~} \007"
}


source ~/.config/shell/completion.zsh
source ~/.config/shell/exports.zsh

## Plugins
    function zsh_load_plugins() {
        local plugin
        for plugin ($@); do
            if [ -r "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.zsh" ]; then
                source "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.zsh" 2>/dev/null
            elif [ -r "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.plugin.zsh" ]; then
                source "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.plugin.zsh" 2>/dev/null
            elif [ -r "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.zsh-theme" ]; then
                source "${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/$plugin/$plugin.zsh-theme"  2>/dev/null
            else
                echo "$funcstack[1]: Unable to load '$plugin'." >&2
            fi
        done
    }
    function zsh_update_plugins() {
        local plugin
        for plugin (${ZDOTDIR:-$XDG_CONFIG_HOME/zsh}/plugins/*(N/)); do
            git -C "$plugin" rev-parse --is-inside-work-tree >/dev/null 2>&1 || continue
            printf '%s: ' "$plugin:t"
            git -C "$plugin" remote -v | grep -q upstream && { git -C "$plugin" fetch upstream || printf '%s: Could not fetch upstream...\n' "$plugin:t" }
            git -C "$plugin" pull 2>/dev/null || echo "Unable to upgrade."
        done
    }
    plugins=(
        custom_completions
        init
        completions
        history
        jq.plugin
        lf
        xplr
        utils
        vi_mode
        fzf
        prompt
        fast-syntax-highlighting
    )
    zsh_load_plugins $plugins



source ~/.config/shell/setopt.zsh
source ~/.config/shell/theming.zsh
source ~/.config/shell/history.zsh

# Load aliases and shortcuts if existent.
[ -f "${XDG_CONFIG_HOME:-$HOME/.config}/shell/bash_prompt" ] && source "${XDG_CONFIG_HOME:-$HOME/.config}/shell/bash_prompt"
[ -f "${XDG_CONFIG_HOME:-$HOME/.config}/shell/aliasrc" ] && source "${XDG_CONFIG_HOME:-$HOME/.config}/shell/aliasrc"
[ -f "${XDG_CONFIG_HOME:-$HOME/.config}/shell/bash_functions" ] && source "${XDG_CONFIG_HOME:-$HOME/.config}/shell/bash_functions"



# Load syntax highlighting; should be last.
source /usr/share/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh 2>/dev/null

# Show system information at login
if [ -t 0 ]; then
    if type -p "fastfetch" > /dev/null; then
        fastfetch
    else
        echo "Warning: fastfetch was called, but it's not installed."
    fi
fi
