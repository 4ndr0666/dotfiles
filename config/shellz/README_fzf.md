# File: fzf_configurations
# Author: 4ndr0666
# Date: 12-18-24

# ======================== // FZF CONFIGS //

# --- // 1:
FZF_DEFAULT_OPTS="
--layout=reverse 
--height=40%
--border
--bind='ctrl-a:select-all,ctrl-d:deselect-all'
--cycle
--inline-info
--tiebreak=index
--preview 'bat --color=always --style=numbers --line-range=:500 {}'
--preview-window='~3'
--preview-window='right:50%'
--color=bg+:-1,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8 \
--color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc \
--color=marker:#f5e0dc,fg+:#a6e3a1,prompt:#cba6f7,hl+:#f38ba8"
#[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
