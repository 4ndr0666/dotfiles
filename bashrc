#
### ~4ndr0666 bashrc~ ###

## If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$💀 '

# Load starship prompt if starship is installed
if  [ -x /usr/bin/starship ]; then
    __main() {
        local major="${BASH_VERSINFO[0]}"
        local minor="${BASH_VERSINFO[1]}"

        if ((major > 4)) || { ((major == 4)) && ((minor >= 1)); }; then
            source <("/usr/bin/starship" init bash --print-full-init)
        else
            source /dev/stdin <<<"$("/usr/bin/starship" init bash --print-full-init)"
        fi
    }
    __main
    unset -f __main
fi

# Advanced command-not-found hook
source /usr/share/doc/find-the-command/ftc.bash

# My config
source ~/.config/shell/aliasrc
source ~/.config/shell/bash_functions

# Fastfetch
if [ -t 0 ]; then
    if type -p "fastfetch" > /dev/null; then
        fastfetch
    else
        echo "Warning: fastfetch was called, but it's not installed."
    fi
fi

[ -f ~/.fzf.bash ] && source ~/.fzf.bash

### Bashhub.com Installation.
### This Should be at the EOF. https://bashhub.com/docs
if [ -f ~/.bashhub/bashhub.sh ]; then
    source ~/.bashhub/bashhub.sh
fi

