#File: Zshrc for root
#Author: 4ndr0666
#Edited: 01-28-2024

if [ "$USER" = "root" ]; then
  exec /bin/bash
fi

# --- // PATH:
#export PATH="$PATH:$(find ~/.local/bin -type d | paste -sd ':' -):${PATH}:/usr/local/bin/:/usr/sbin:/sbin:~/bin:~/.npm-global/bin:~/.cargo/bin"
typeset -U PATH path

# --- // ZSH_INSTALLATION:
export ZSH=$HOME/.oh-my-zsh

# --- // OMZ_THEME:
ZSH_THEME="trapd00r"

# --- AUTOUPDATE_AUTOCORRECT:
zstyle ':omz:update' mode disabled  # disable automatic updates


# --- // PLUGINS:
plugins=( universalarchive git zsh-autosuggestions zsh-syntax-highlighting fzf aliases copypath myfunctions systemd )

# --- // REQUIRED_OMZ_SOURCING_AFTER_PLUGINS:
source $ZSH/oh-my-zsh.sh

# --- // HISTORY:
HISTSIZE=10000
SAVEHIST=10000
setopt appendhistory histignorealldups

# --- // AUTOUPDATE_AUTOCORRECT:
ENABLE_CORRECTION="true"
zstyle ':omz:update' mode disabled  # disable automatic updates
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

# --- // MINOR_ALIASES:
alias oz="svim ~/.zshrc"
alias oc="cd ~/.oh-my-zsh/custom/"
alias omzp="echo -e '\033[1;36mPlugins:\033[0m'; awk -F'=' '/^plugins/{gsub(/[\(\)]/, \"\"); split(\$2, a, \" \"); for(i in a) print a[i]}' ~/.zshrc"
alias omzl='omz plugin list'
alias omzi='omz plugin info'
alias reload='source ~/.zshrc'

# --- // CUSTOM_PLUGIN_SOURCING:
for plugin in zsh-syntax-highlighting zsh-autosuggestions; do
  source_file="${HOME}/.oh-my-zsh/custom/plugins/${plugin}/${plugin}.plugin.zsh"
  if [ -f "${source_file}" ]; then
    source "${source_file}"
  else
    echo "${plugin} plugin file not found."
  fi
done
