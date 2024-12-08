#File: .bashrc for root
#Edited: 01-28-2024
#Author: 4ndr0666

[[ $- != *i* ]] && return

PS1='[\u@\h \W]\$💀 '

if [ -d "$HOME/.bin" ] ;
  then PATH="$HOME/.bin:$PATH"
fi

if [ -d "$HOME/.local/bin" ] ;
  then PATH="$HOME/.local/bin:$PATH"
fi

export HISTCONTROL=ignoreboth:erasedups
bind "set completion-ignore-case on"
alias 0b='cat ~/.bashrc'

# --- // IBUS_SETTINGS_(enter $ibus-setup in term):
#export GTK_IM_MODULE=ibus
#export XMODIFIERS=@im=dbus
#export QT_IM_MODULE=ibus

# --- // LISTINGS:
alias ls='ls --color=auto'
alias la='ls -a'
alias ll='ls -alFh'
alias l='ls'
alias l.="ls -A | egrep '^\.'"
alias listdir="ls -d */ > list"

# --- // TYPOS:
alias cd..='cd ..'
alias pdw='pwd'
alias udpate='sudo pacman -Syyu'
alias upate='sudo pacman -Syyu'
alias updte='sudo pacman -Syyu'
alias updqte='sudo pacman -Syyu'
alias upqll='paru -Syu --noconfirm'
alias upal='paru -Syu --noconfirm'
alias sl='ls'
alias gerp='grep'
alias shudown='shutdown'
alias pdw='pwd'

# --- // FORCE_NEOVIM:
[ -x "$(command -v nvim)" ] && alias vim="nvim" vimdiff="nvim -d"
alias vim='nvim'
alias vimdiff='nvim -d'
alias svim='sudo nvim'

# --- // EDIT_CONFIG_FILES:
alias valias='sudo nvim /home/andro/.oh-my-zsh/custom/aliases.zsh'
alias vfunc='svim /home/andro/.oh-my-zsh/custom/plugins/myfunctions/myfunctions.plugin.zsh'
alias vpac='sudo nvim /etc/pacman.conf'
alias vgrub='sudo nvim /etc/default/grub'
alias vgrubc='sudo nvim /boot/grub/grub.cfg'
alias vmkinit='sudo nvim /etc/mkinitcpio.conf'
alias vmirror='sudo nvim /etc/pacman.d/mirrorlist'
alias vchaotic='sudo nvim /etc/pacman.d/chaotic-mirrorlist'
alias vfstab='sudo nvim /etc/fstab'
alias vnsswitch='sudo nvim /etc/nsswitch.conf'
alias vsmb='sudo nvim /etc/samba/smb.conf'
alias vgpg='sudo nvim /etc/pacman.d/gnupg/gpg.conf'
alias vhosts='sudo nvim /etc/hosts'
alias vhostname='sudo nvim /etc/hostname'
alias vb='sudo nvim ~/.bashrc'
alias vz='sudo nvim ~/.zshrc'
alias vf='sudo nvim ~/.config/fish/config.fish'
alias vmvp='nvim /home/andro/.config/mpv/mpv.conf'

# --- // DIRECTORY_SHORTCUTS:
# --- // $User //
alias dc='cd ~/Documents'
alias dl='cd ~/Downloads'
alias conf='cd ~/.config'
alias bs='cd ~/.config/bspwm'
alias ob='cd ~/.config/openbox'
alias obt='cd ~/.config/openbox/themes'
alias loc='cd ~/.local'
alias locs='cd ~/.local/share/'
alias nas='cd /Nas/'
alias nas2='cd /Nas2'
alias cloud='cd /4ndr0/TheCLoud'
alias tools='cd /1TOOLS'
# --- // 4ndr0 //
alias 4n='cd /4ndr0/4ndr0'
alias 4ndl='cd /4ndr0/4ndr0/Downloads'
alias rtg='cd /4ndr0/4ndr0/RTG\ Gifs'
# --- // /home/BUILD //
alias hb='cd /home/Build'
alias hbdc='cd /home/Build/docs'
alias hbbin='cd /home/Build/git/syncing/scr'
alias hbnas='cd /home/Build/git/syncing/nas'
alias hbgc='cd /home/Build/git/clone'
alias hbgl='cd /home/Build/git/local'
alias hbgs='cd /home/Build/git/syncing/'
alias hbpk='cd /home/Build/pkgs'
alias hbpr='cd /home/Build/projects'alias grep='grep --color=auto'

# ========================================================= // BASIC_ALIASES //
alias cd='cd -P'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
alias s='sudo'
alias p='pacman'
alias pk='pacman-key'
alias cp='cp -iv'
alias mv='mv -iv'
alias rm='rm -vI'
alias rg="rg --sort path"
alias diff='diff --color=auto'
alias rmdir='rm -vI --preserve root'
alias ln='ln -iv'
alias bc='bc -ql'
alias mkdir='mkdir -pv'
alias wget="wget --hsts-file='$XDG_DATA_HOME/wget-hsts'"
alias curl="curl --user-agent 'noleak'"
alias df='df -h --exclude-type=squashfs --exclude-type=tmpfs --exclude-type=devtmpfs'
alias cat='bat --number --style snip --style changes --style header'
alias rsync='rsync -vrPlu'
alias grub-mkconfig='sudo grub-mkconfig -o /boot/grub/grub.cfg'
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias ccat='highlight --out-format=ansi'
alias ip='ip -color=auto'
alias c='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark | lolcat; echo; echo'
alias hw='hwinfo --short'
alias psa='ps auxf'
alias free='free -mt'
alias jctl='journalctl -p 3 -xb'
alias g='git'
alias gstat='git status'
alias grh="git reset --hard"
alias df='df -h'
alias update-fc='sudo fc-cache -fv'
alias ssn="sudo shutdown now"
alias sr="reboot"
alias hw="hwinfo --short"
alias audio="pactl info | grep 'Server Name'"
alias microcode='grep . /sys/devices/system/cpu/vulnerabilities/*'
alias cpu="cpuid -i | grep uarch | head -n 1"
alias pacman='sudo pacman --color auto'

# ======================================================== // UNIQUE_ALIASES //

alias sprs='sudo pacman -Rs'
alias sprdd='sudo pacman -Rdd'
alias spqo='sudo pacman -Qo'
alias spsii='sudo pacman -Sii'
alias kernel="ls /usr/lib/modules"
alias kernels="ls /usr/lib/modules"
alias bls="betterlockscreen -u /usr/share/backgrounds/"
alias psgrep="ps aux | grep -v grep | grep -i -e VSZ -e"
alias burnit='echo "sudo dd bs=4M if=path/to/.iso of=/dev/sdX status=progress oflag=sync"'
alias lsfiles='find $PWD -type f | wc -l'
alias lsmount='mount |column -t'
alias list="xclip -o | tr '\n' ' ' | sed 's/ $/\n/' | xclip -selection c"
alias splitlist="xclip -o | tr ',' '\n'"
alias dir5='du -cksh * | sort -hr | head -5'
alias dir10='du -cksh * | sort -hr | head -10'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
alias copy='xclip -selection clipboard'
alias fixkeyboard='sudo localectl set-x11-keymap us'
alias fixpacman='sudo unlink /var/lib/pacman/db.lck'
alias fixpacman2='sudo unlink /var/cache/pacman/pkg/cache.lck'
alias wget="wget --hsts-file='$XDG_DATA_HOME/wget-hsts'"
alias listusers='cut -d: -f1 /etc/passwd | sort'
alias \
	lf="lfub" \
	magit="nvim -c MagitOnly" \
	ref="shortcuts >/dev/null; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/shortcutrc ; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/zshnameddirrc" \
# --- // EXPRESSVPN //
alias vpnc='sudo expressvpn connect'
alias vpnd='sudo expressvpn disconnect'
alias vpns='sudo expressvpn status'
alias vpnr='sudo expressvpn refresh'
alias vpnauto='expressvpn autoconnect true'
alias vpnset='sudo expressvpn preferences set '
# --- // DISPLAY //
alias xd='ls /usr/share/xsessions'
alias xdw="ls /usr/share/wayland-sessions"
alias xfix="echo 'DISPLAY=:0 XAUTHORITY=$HOME/.Xauthority xterm'"
alias xi='sudo xbps-install'
alias xr='sudo xbps-remove -R'
alias xq='xbps-query'
alias xmerge='xrdb -merge ~/.Xresources'
alias update='sudo pacman -Syyu'
alias upd='sudo pacman -Syyu'
alias parupdate="paru -Syu --noconfirm"
alias psa="ps auxf"
alias psgrep="ps aux | grep -v grep | grep -i -e VSZ -e"
alias update-grub="sudo grub-mkconfig -o /boot/grub/grub.cfg"
alias grub-update="sudo grub-mkconfig -o /boot/grub/grub.cfg"
alias fixgrubefi='sudo grub-mkconfig -o /boot/grub/grub.cfg && sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi'
#get fastest mirrors in your neighborhood
alias mirror="sudo reflector -f 30 -l 30 --number 10 --verbose --save /etc/pacman.d/mirrorlist"
alias mirrord="sudo reflector --latest 30 --number 10 --sort delay --save /etc/pacman.d/mirrorlist"
alias mirrors="sudo reflector --latest 30 --number 10 --sort score --save /etc/pacman.d/mirrorlist"
alias mirrora="sudo reflector --latest 30 --number 10 --sort age --save /etc/pacman.d/mirrorlist"
#our experimental - best option for the moment
alias mirrorx="sudo reflector --age 6 --latest 20  --fastest 20 --threads 5 --sort rate --protocol https --save /etc/pacman.d/mirrorlist"
alias mirrorxx="sudo reflector --age 6 --latest 20  --fastest 20 --threads 20 --sort rate --protocol https --save /etc/pacman.d/mirrorlist"
alias ram='rate-mirrors --allow-root --disable-comments arch | sudo tee /etc/pacman.d/mirrorlist'
alias rams='rate-mirrors --allow-root --disable-comments --protocol https arch  | sudo tee /etc/pacman.d/mirrorlist'
alias ytt='yt --skip-download --write-thumbnail'
alias YT='youtube-viewer'
alias yta='yt -x -f bestaudio/best'
alias yt="yt-dlp --add-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f 'bestvideo/best' --no-playlist --no-mtime --no-audio --abort-on-error -o '%(title)s.%(ext)s'"
alias ytp="yt-dlp --embed-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f 'bestvideo[vcodec^=vp9]/bestvideo' --no-mtime --no-audio"
alias rip="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -200 | nl"
alias riplong="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -3000 | nl"
alias gitpkg="pacman -Q | grep -i '\-git' | wc -l"
alias pkgbysize="expac -Q '%m - %n %v' | sort -n -r"
alias mkpkglist='bat /tmp/pacui-ls'
alias cleanpacman="sudo find /var/cache/pacman/pkg/ -iname '*.part' -delete"
alias c='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark | lolcat; echo; echo'
alias rg="rg --sort path"
alias jctl="journalctl -p 3 -xb"
alias lcalamares="bat /var/log/Calamares.log"
alias lpacman="bat /var/log/pacman.log"
alias lxorg="bat /var/log/Xorg.0.log"
alias lxorgo="bat /var/log/Xorg.0.log.old"
alias gpg-check="gpg2 --keyserver-options auto-key-retrieve --verify"
alias fix-gpg-check="gpg2 --keyserver-options auto-key-retrieve --verify"
alias gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-keyserver="[ -d ~/.gnupg ] || mkdir ~/.gnupg ; cp /etc/pacman.d/gnupg/gpg.conf ~/.gnupg/ ; echo 'done'"
alias fix-permissions="sudo chown -R $USER:$USER ~/.config ~/.local"
alias keyfix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias key-fix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias keys-fix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fixkey="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fixkeys="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fix-key="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fix-keys="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fix-pacman-conf="/usr/local/bin/arcolinux-fix-pacman-conf"
alias fix-pacman-keyserver="/usr/local/bin/arcolinux-fix-pacman-gpg-conf"
alias fix-grub="/usr/local/bin/arcolinux-fix-grub"
alias fixgrub="/usr/local/bin/arcolinux-fix-grub"
alias bupskel='cp -Rf /etc/skel ~/.skel-backup-$(date +%Y.%m.%d-%H.%M.%S)'
alias cb='cp /etc/skel/.bashrc ~/.bashrc && exec bash'
alias cz='cp /etc/skel/.zshrc ~/.zshrc && echo "Copied."'
alias cf='cp /etc/skel/.config/fish/config.fish ~/.config/fish/config.fish && echo "Copied."'
alias toboot="sudo /usr/local/bin/arcolinux-toboot"
alias togrub="sudo /usr/local/bin/arcolinux-togrub"
alias tolightdm="sudo pacman -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings --noconfirm --needed ; sudo systemctl enable lightdm.service -f ; echo 'Lightm is active - reboot now'"
alias tosddm="sudo pacman -S sddm --noconfirm --needed ; sudo systemctl enable sddm.service -f ; echo 'Sddm is active - reboot now'"
alias toly="sudo pacman -S ly --noconfirm --needed ; sudo systemctl enable ly.service -f ; echo 'Ly is active - reboot now'"
alias togdm="sudo pacman -S gdm --noconfirm --needed ; sudo systemctl enable gdm.service -f ; echo 'Gdm is active - reboot now'"
alias tolxdm="sudo pacman -S lxdm --noconfirm --needed ; sudo systemctl enable lxdm.service -f ; echo 'Lxdm is active - reboot now'"
alias kc='killall conky'
alias kp='killall polybar'
alias kpi='killall picom'

# ======================================================= // BASIC_FUNCTIONS //
# --- // Sudo:
sudo_func() {
    sudo -v
    sudo "$@"
}
gclone() {
    git clone --depth 1 "$@" && \
      cd -- "$(basename "$1" .git)" || exit
}

# --- // Git_add_all/commit_all/comment/pull/push:
gcomp() {
    git add .
    git commit -m "$*"
    git pull
    git push
}

# --- // Git_add_all/commit/comment:
gcom() {
    git add .
    git commit -m "$1" -a
}

# --- // Git_delete_cache:
gcache() {
    rm -rf ~/.cache/git
}
# --- // Change_shell:
if alias tobash &>/dev/null; then
    unalias tobash
fi
if alias tozsh &>/dev/null; then
    unalias tozsh
fi
if alias tofish &>/dev/null; then
    unalias tofish
fi
tobash() {
    sudo $chsh -s "$(which bash)" && echo 'Now log out.'
}
tozsh() {
    sudo $chsh -s "$(which zsh)" && echo 'Now log out.'
}
tofish() {
    sudo $chsh -s "$(which fish)" && echo 'Now log out.'
}


# ========================================================// UNIQUE_FUNTIONS //
# --- // List_dependent_pkgs_of_application:
whatdependson()  {
    search=$(echo "$1")
    sudo pacman -Sii $search | grep "Required" | sed -e "s/Required By     : //g" | sed -e "s/  /\n/g"
    }
# --- // Make_an_archived_backup:
f() {
    local target="$1"
    if [[ -z "$target" ]]; then
        echo "Please provide a file or directory to back up."
        return 1
    fi
    tar -czvf "${target##*/}_backup.tar.gz" "$target"
}
# --- // Move_up_1_directory:
up() { for _ in $(seq "${1:-1}"); do cd ..; done; }
# --- // All_port80_connections:
function con80() {
  {
    LANG= ss -nat || LANG= netstat -nat
  } | grep -E ":80[^0-9]" | wc -l
}
# --- // Extract_Archives:
extract ()
{
  if [ -f $1 ] ; then
    case $1 in
      *.tar.bz2)   tar xjf $1   ;;
      *.tar.gz)    tar xzf $1   ;;
      *.bz2)       bunzip2 $1   ;;
      *.rar)       unrar x $1   ;;
      *.gz)        gunzip $1    ;;
      *.tar)       tar xf $1    ;;
      *.tbz2)      tar xjf $1   ;;
      *.tgz)       tar xzf $1   ;;
      *.zip)       unzip $1     ;;
      *.Z)         uncompress $1;;
      *.7z)        7z x $1      ;;
      *.deb)       ar x $1      ;;
      *.tar.xz)    tar xf $1    ;;
      *.tar.zst)   tar xf $1    ;;
      *)           echo "'$1' cannot be extracted via ex()" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}

#create a file called .bashrc-personal and put all your personal aliases
#in there. They will not be overwritten by skel.
[[ -f ~/.bashrc-personal ]] && . ~/.bashrc-personal
