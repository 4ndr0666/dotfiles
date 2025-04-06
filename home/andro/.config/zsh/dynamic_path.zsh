# ==================== // DYNAMIC_PATH.ZSH //
static_dirs=(
	"/usr/bin"
	"/sbin"
	"/usr/sbin"
	"/usr/local/sbin"
	"/opt"
	"$CARGO_HOME/bin"
	"${JAVA_HOME:-/usr/lib/jvm/default/bin}"
	"$HOME/.local/bin"
	"$XDG_DATA_HOME/node/npm-global"
	"$XDG_DATA_HOME/ruby/gems/3.3.7"
	"$XDG_DATA_HOME/virtualenv"
	"$XDG_DATA_HOME/go/bin"
)

dynamic_dirs=(/home/git/clone/scr/**/*(/))

all_dirs=("${static_dirs[@]}" "$dynamic_dirs[@]}")

typeset -U PATH

for dir in "${all_dirs[@]}"; do
	dir=${dir%/}

	if [[ -d "$dir" && -n "$(find "$dir" -maxdepth 1 -type f -executable | head -n 1)" ]]; then
		PATH="$PATH:$dir"
	fi
done

export PATH
