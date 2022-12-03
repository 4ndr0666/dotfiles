#!/bin/zsh

eval "$(starship init zsh)"
function set_win_title(){
    echo -ne "\033]0; $USER@$HOST:${PWD/$HOME/~} \007"
}


## Plugins section: Enable fish style features
# Use syntax highlighting
source "/usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# Use autosuggestion
source "/usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh"

# Use history substring search
source "/usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh"


# Use fzf
source "/usr/share/fzf/key-bindings.zsh"
source "/usr/share/fzf/completion.zsh"
