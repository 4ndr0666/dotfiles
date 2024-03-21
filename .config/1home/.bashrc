#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

# --- // Pinentry uses the correct tty:
export GPG_TTY=$(tty)
gpg-connect-agent updatestartuptty /bye >/dev/null

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '
