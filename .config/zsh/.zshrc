#File: .zshrc for user
#Author: 4ndr0666
#Edited: 01-28-2024

# --- // ZSH_INSTALLATION:
export ZSH=$HOME/.oh-my-zsh

# --- // PATH:
UPDATED_PATH_FILE="/tmp/updated_path.txt"
if [ -f "$UPDATED_PATH_FILE" ]; then
    source "$UPDATED_PATH_FILE"
else
    PATH_ADDITIONS=("$HOME/bin" "$HOME/.local/bin" "/usr/local/bin")
    for path in "${PATH_ADDITIONS[@]}"; do
        if [[ ":$PATH:" != *":$path:"* ]]; then
            PATH="$path:$PATH"
        fi
    done
    export PATH
fi

# --- // PATH_MANAGER_PYSCRIPT:
python "$HOME/scripts/path_manager.py"
alias pathctl='python ~/scripts/path_manager.py --prompt && [ $? -eq 0 ] && source /tmp/updated_path.txt'
[[ -f "$HOME/scripts/zenvironment" ]] && source "$HOME/scripts/zenvironment"

# --- // OMZ_THEME:
ZSH_THEME="jonathan"
ZSH_THEME_RANDOM_CANDIDATES=( "darkblood" "duellj" "fox" "funky" "humza" "jonathan" "junkfood" "kiwi" "rkj-repos" "simonoff" "robbyrussell" )
ZSH_THEME_RANDOM_IGNORED=( kardan minimal pygmalion tjkirch_mod)

# --- // PLUGINS:
plugins=( universalarchive git zsh-autosuggestions zsh-syntax-highlighting fzf aliases copypath myfunctions systemd )

# --- // REQUIRED_OMZ_SOURCING_AFTER_PLUGINS:
source $ZSH/oh-my-zsh.sh

# --- // HISTORY:
HISTSIZE=10000
SAVEHIST=10000
setopt appendhistory histignorealldups
#setopt GLOB_DOTS


# --- // AUTOUPDATE_AUTOCORRECT:
ENABLE_CORRECTION="true"
zstyle ':omz:update' mode disabled  # disable automatic updates
#setopt autocd interactive_comments

# --- // ENHANCED_COMMAND_COMPLETION:
#autoload -Uz compinit && compinit
#zstyle ':completion:*' menu select
#zmodload zsh/complist
#_comp_options+=(globdots)    # Include hidden files in completion results.

# --- // ON_DEMAND_REHASH_FOR_NEW_PKGS:
zshcache_time="$(date +%s%N)"
autoload -Uz add-zsh-hook
rehash_precmd() {
  if [[ -a /var/cache/zsh/pacman ]]; then
    local paccache_time="$(date -r /var/cache/zsh/pacman +%s%N)"
    if (( zshcache_time < paccache_time )); then
      rehash
      zshcache_time="$paccache_time"
    fi
  fi
}
add-zsh-hook -Uz precmd rehash_precmd

# --- // SOURCE_SECRTES:
[[ -f ~/.secrets ]] && source ~/.secrets

# --- // SECURE_ALIASES_FROM_SKEL:
#[[ -f ~/.zshrc_skel_aliases ]] && . ~/.zshrc_skel_aliases

# --- // MINOR_ALIASES:
alias oz="svim ~/.zshrc"
alias oc="cd ~/.oh-my-zsh/custom/"
alias omzp="echo -e '\033[1;36mPlugins:\033[0m'; awk -F'=' '/^plugins/{gsub(/[\(\)]/, \"\"); split(\$2, a, \" \"); for(i in a) print a[i]}' ~/.zshrc"
alias omzl='omz plugin list'
alias omzi='omz plugin info'
alias reload='source ~/.zshrc'

# --- // SOURCE_FINDTHECOMMAND:
[[ -f /usr/share/doc/find-the-command/ftc.zsh ]] && source /usr/share/doc/find-the-command/ftc.zsh

source /usr/share/doc/find-the-command/ftc.zsh
# --- // CUSTOM_PLUGIN_SOURCING:
for plugin in zsh-syntax-highlighting zsh-autosuggestions; do
  source_file="${HOME}/.oh-my-zsh/custom/plugins/${plugin}/${plugin}.plugin.zsh"
  if [ -f "${source_file}" ]; then
    source "${source_file}"
  else
    echo "${plugin} plugin file not found."
  fi
done
