### EXPORT ###
export EDITOR='nvim'
export VISUAL='micro'
export HISTCONTROL=ignoreboth:erasedups
export PAGER='most'
export HISTTIMEFORMAT="%Y-%m-%d %T "

#Ibus settings if you need them
#type ibus-setup in terminal to change settings and start the daemon
#delete the hashtags of the next lines and restart
#ibus-daemon -d -x
#export GTK_IM_MODULE=ibus
#export XMODIFIERS=@im=dbus
#export QT_IM_MODULE=ibus

PS1='%F{35}%* [%j]${git_prompt} [%m:%F{75}%f%F{69}%c%f%F{35}] %#%f ${newline}💀 '

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

# source bash prompt
source ~/.config/shell/.bash/bash_prompt

# Source bash functions
source ~/.config/shell/.bash/bash_functions

# Source aliases
source ~/.config/shell/.bash/bash_aliases

#Drop into fish
#if [[ $(ps --no-header --pid=$PPID --format=comm) != "fish" && -z ${BASH_EXECUTION_STRING} ]]
#then
#	exec fish
#fi

# Show system information at login
if [ -t 0 ]; then
    if type -p "fastfetch" > /dev/null; then
        fastfetch
    else
        echo "Warning: fastfetch was called, but it's not installed."
    fi
fi


if [ -d "$HOME/.bin" ] ;
  then PATH="$HOME/.bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ] ;
  then PATH="$HOME/.local/bin:$PATH"
fi

#ignore upper and lowercase when TAB completion
bind "set completion-ignore-case on"

#moving your personal files and folders from /personal to ~
alias personal='cp -Rf /personal/* ~'

#create a file called .bashrc-personal and put all your personal aliases
#in there. They will not be overwritten by skel.

[[ -f ~/.bashrc-personal ]] && . ~/.bashrc-personal

