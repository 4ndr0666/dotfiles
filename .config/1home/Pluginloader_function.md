#*//~Custom plugin load function:
#function zsh_load_plugins() {
#	local plugin
#	for plugin ($@); do
#		if [ -r "/home/$USER/.config/zsh/plugins/completions.plugin.zsh" ]; then
#			source "/home/$USER/.config/zsh/plugins/completions.plugin.zsh" 2>/dev/null
#		elif [ -r "/home/$USER/.config/zsh/plugins/spectrum.zsh" ]; then
#			source "/home/$USER/.config/zsh/plugins/spectrum.zsh" 2>/dev/null
#		elif [ -r "/home/$USER/.config/zsh/plugins/trash.plugin.zsh" ]; then
#			source "/home/$USER/.config/zsh/plugins/trash.plugin.zsh" 2>/dev/null
#		elif [ -r "/home/$USER/.config/zsh/plugins/fzf.plugin.zsh" ]; then
#			source "/home/$USER/.config/zsh/plugins/fzf.plugin.zsh" 2>/dev/null
#		else
#			echo "$funcstack[1]: Unable to load '$plugin'." >&2
#		fi
#	done
#}

#	plugins=(
#		completions.plugin.zsh
#		spectrum.zsh
#		trash.plugin.zsh
#		fzf.plugin.zsh
#		)
#	zsh_load_plugins $plugins
