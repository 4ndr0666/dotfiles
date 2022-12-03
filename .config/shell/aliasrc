### ~aliasrc~ ###
##
#
#Use neovim for vim if present.
[ -x "$(command -v nvim)" ] && alias vim="nvim" vimdiff="nvim -d"

# Use $XINITRC variable if file exists.
[ -f "$XINITRC" ] && alias startx="startx $XINITRC"

# sudo not required for some system commands
for command in mount umount sv pacman updatedb su shutdown poweroff reboot ; do
    alias $command="sudo $command"
done; unset command

# Safetynets
# do not delete / or prompt if deleting more than 3 files at a time #
alias rm='rm -I --preserve-root'

#remove
alias rmgitcache="rm -r ~/.cache/git"

# confirmation #
alias mv='mv -i'
alias cp='cp -i'
alias ln='ln -i'

# Parenting changing perms on / #
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'

#Start ssh agent
alias ssha='eval $(ssh-agent) && ssh-add'

## Colorize the grep command output for ease of use (good for log files)##
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'

## Replace some more things with better alternatives
alias cat='bat --style header --style snip --style changes --style header'

[ ! -x /usr/bin/yay ] && [ -x /usr/bin/paru ] && alias yay='paru'

alias bathelp='bat --plain --language=help'
help() {
    "$@" --help 2>&1 | bathelp
}



## Custom vim sysadmin shortcuts
alias valias="sudo vim /home/andro/.config/shell/aliasrc"
alias vlight="sudo vim /etc/lightdm/lightdm.conf"
alias vpac="sudo vim /etc/pacman.conf"
alias vgrub="sudo vim /etc/default/grub"
alias vgrubc="sudo vim /boot/grub/grub.cfg"
alias vmkinit="sudo vim /etc/mkinitcpio.conf"
alias vmirror="sudo vim /etc/pacman.d/mirrorlist"
alias vchaotic="sudo vim /etc/pacman.d/chaotic-mirrorlist"
alias vsddm="sudo vim /etc/sddm.conf"
alias vsddmc="sudo vim /etc/sddm.conf.d/kde_settings.conf"
alias vfstab="sudo vim /etc/fstab"
alias vnsswitch="sudo vim /etc/nsswitch.conf"
alias vsmb="sudo vim /etc/samba/smb.conf"
alias vgpg="sudo vim /etc/pacman.d/gnupg/gpg.conf"
alias vhosts="sudo vim /etc/hosts"
alias vhostname="sudo vim /etc/hostname"
alias vp="sudo vim ~/.profile"
alias vb="sudo vim ~/.bashrc"
alias vbp="sudo vim ~/.bash_profile"
alias vz="sudo vim ~/.zshrc"
alias vzp="sudo vim ~/.zprofile"
alias vf="sudo vim ~/.config/fish/config.fish"
alias vsx="sudo vim ~/.xinitrc"
alias vx="sudo vim ~/.xprofile"
alias vfastfetch="sudo vim ~/.config/fastfetch/config.conf"


#Sudo vim
alias svim='sudo vim'

# Safetynets
# do not delete / or prompt if deleting more than 3 files at a time #
alias rm='rm -I --preserve-root'

# confirmation #
alias mv='mv -i'
alias cp='cp -i'
alias ln='ln -i'
alias magic='sudo /usr/local/bin/magic.sh'

# Parenting changing perms on / #
alias chown='chown --preserve-root'
alias chmod='chmod --preserve-root'
alias chgrp='chgrp --preserve-root'

### Aliases ###
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
alias back='cd $OLDPWD'
alias cd..='cd ..'
alias cp='cp -iv'
alias magit="nvim -c MagitOnly"
alias ka="killall"
alias sdb="shutdown -h now"
alias xi="sudo xbps-install"
alias xr="sudo xbps-remove -R"
alias xq="xbps-query"
alias z="zathura"
alias xx='cat /usr/local/bin/Xserver_fix.md'
alias ch='cat /usr/local/bin/permissions.md'
alias 00="cat ~/.config/shell/aliasrc"

#readable output
alias df='df -h -x squashfs -x tmpfs -x devtmpfs'
alias lf="sudo lf"
#keyboard
alias give-me-azerty-be="sudo localectl set-x11-keymap be"
alias give-me-qwerty-us="sudo localectl set-x11-keymap us"
#setlocale
alias setlocale="sudo localectl set-locale LANG=en_US.UTF-8"
alias setlocales="sudo localectl set-x11-keymap be && sudo localectl set-locale LANG=en_US.UTF-8"
#fix obvious typo's
alias pdw='pwd'
#free
alias free="free -mt"
#get the error messages from journalctl
alias jctl="journalctl -p 3 -xb"
#merge new settings
alias merge="xrdb -merge ~/.Xresources"
#userlist
alias userlist="cut -d: -f1 /etc/passwd | sort"
#add new fonts
alias update-fc='sudo fc-cache -fv'
#check vulnerabilities microcode
alias microcode='grep . /sys/devices/system/cpu/vulnerabilities/*'

# kill commands
# quickly kill conkies
alias kc='killall conky'
# quickly kill polybar
alias kp='killall polybar'
# quickly kill picom
alias kpi='killall picom'

#ps
alias psa="ps auxf"
alias psgrep="ps aux | grep -v grep | grep -i -e VSZ -e"

## get top process eating memory
alias mem5='ps auxf | sort -nr -k 4 | head -5'
alias mem10='ps auxf | sort -nr -k 4 | head -10'

## get top process eating cpu ##
alias cpu5='ps auxf | sort -nr -k 3 | head -5'
alias cpu10='ps auxf | sort -nr -k 3 | head -10'


## List largest directories (aka "ducks")
alias dir5='du -cksh * | sort -hr | head -n 5'
alias dir10='du -cksh * | sort -hr | head -n 10'
alias dir='dir --color=auto'

#hblock (stop tracking with hblock)
#use unhblock to stop using hblock
alias unhblock="hblock -S none -D none"

#systeminfo
alias probe="sudo -E hw-probe -all -upload"
alias sysfailed="systemctl list-units --failed"

#give the list of all installed desktops - xsessions desktops
alias xd="ls /usr/share/xsessions"

#btrfs aliases
alias btrfsfs="sudo btrfs filesystem df /"
alias btrfsli="sudo btrfs su li / -t"

#snapper aliases
alias snapcroot="sudo snapper -c root create-config /"
alias snapchome="sudo snapper -c home create-config /home"
alias snapli="sudo snapper list"
alias snapcr="sudo snapper -c root create"
alias snapch="sudo snapper -c home create"
alias tb='nc termbin.com 9999'
alias sudo='sudo -v; sudo '

# git related aliases
alias gag='git exec ag'
## Git Aliases
gcom() {
    git add .
    git commit -m "$1"
    }
lazyg() {
    git add .
    git commit -m "$1"
    git push
}
# cd to git root directory
alias cdgr='cd "$(git root)"'
# Fetch pull request

fpr() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "error: fpr must be executed from within a git repository"
        return 1
    fi
    (
        cdgr
        if [ "$#" -eq 1 ]; then
            local repo="${PWD##*/}"
            local user="${1%%:*}"
            local branch="${1#*:}"
        elif [ "$#" -eq 2 ]; then
            local repo="${PWD##*/}"
            local user="${1}"
            local branch="${2}"
        elif [ "$#" -eq 3 ]; then
            local repo="${1}"
            local user="${2}"
            local branch="${3}"
        else
            echo "Usage: fpr [repo] username branch"
            return 1
        fi

        git fetch "git@github.com:${user}/${repo}" "${branch}:${user}/${branch}"
    )
}


#hardware info --short
alias hw="hwinfo --short"
alias ports='netstat -tulanp'
alias speedtest='curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python -'

#audio check pulseaudio or pipewire
alias audio="pactl info | grep 'Server Name'"


#Packaging
alias wget="wget -U 'noleak'"
alias curl="curl --user-agent 'noleak'"
alias tarnow='tar -acf '
alias untar='tar -xvf '
alias extip='curl icanhazip.com'

#listing
#alias ls=' ls -lhF --time-style=long-iso --color=auto'
#alias la='exa -a --color=always --group-directories-first --icons'
#alias ll='exa -l --color=always --group-directories-first --icons'
#alias l.=' ls -lhFa --time-style=long-iso --color=auto'
#alias ln='ln -iv'
alias lsmount='mount |column -t'
# Replace ls with exa
alias ls='exa -al --color=always --group-directories-first --icons' # preferred listing
alias la='exa -a --color=always --group-directories-first --icons'  # all files and dirs
alias ll='exa -l --color=always --group-directories-first --icons'  # long format
alias lt='exa -aT --color=always --group-directories-first --icons' # tree listing
alias l.="exa -a | egrep '^\.'"                                     # show only dotfiles
alias ln='ln -iv'
alias ip="ip -color"
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
alias mkdir='mkdir -pv'
alias new='find /path/to/dir -type f -mtime -7 -print0 | xargs -0 ls -lt | head'

# Go up [n] directories
up()
{
    local cdir="$(pwd)"
    if [[ "${1}" == "" ]]; then
        cdir="$(dirname "${cdir}")"
    elif ! [[ "${1}" =~ ^[0-9]+$ ]]; then
        echo "Error: argument must be a number"
    elif ! [[ "${1}" -gt "0" ]]; then
        echo "Error: argument must be positive"
    else
        for ((i=0; i<${1}; i++)); do
            local ncdir="$(dirname "${cdir}")"
            if [[ "${cdir}" == "${ncdir}" ]]; then
                break
            else
                cdir="${ncdir}"
            fi
        done
    fi
    cd "${cdir}"
}

# Create a directory and cd into it
mcd() {
    mkdir "${1}" && cd "${1}"
}

# Jump to directory containing file
jump() {
    cd "$(dirname ${1})"
}

#switch between bash and zsh
alias tobash="sudo chsh $USER -s /bin/bash && echo 'Now log out.'"
alias tozsh="sudo chsh $USER -s /bin/zsh && echo 'Now log out.'"
alias tofish="sudo chsh $USER -s /bin/fish && echo 'Now log out.'"

#switch between lightdm and sddm
alias tolightdm="sudo pacman -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings --noconfirm --needed ; sudo systemctl enable lightdm.service -f ; echo 'Lightm is active - reboot now'"
alias tosddm="sudo pacman -S sddm --noconfirm --needed ; sudo systemctl enable sddm.service -f ; echo 'Sddm is active - reboot now'"
alias toly="sudo pacman -S ly --noconfirm --needed ; sudo systemctl enable ly.service -f ; echo 'Ly is active - reboot now'"
alias togdm="sudo pacman -S gdm --noconfirm --needed ; sudo systemctl enable gdm.service -f ; echo 'Gdm is active - reboot now'"
alias tolxdm="sudo pacman -S lxdm --noconfirm --needed ; sudo systemctl enable lxdm.service -f ; echo 'Lxdm is active - reboot now'"

#Recent Installed Packages
alias big="expac -H M '%m\t%n' | sort -h | nl"
alias rip="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -200 | nl"
alias riplong="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -3000 | nl"
alias gitpkg='pacman -Q | grep -i "\-git" | wc -l' # List amount of -git packages

#skip integrity check
alias paruskip='paru -S --mflags --skipinteg'
alias yayskip='yay -S --mflags --skipinteg'
alias trizenskip='trizen -S --skipinteg'


# Aliases for software managment
# pacman or pm
alias pacman='sudo pacman --color auto'
alias update='sudo pacman -Syyu'
alias rmpkg="sudo pacman -Rc"
alias upd='sudo pacman -Sy && sudo powerpill -Su && paru -Su'
alias downgrade="sudo downgrade --ala-url https://ant.seedhost.eu/arcolinux/"

#gpg
#verify signature for isos
alias gpg-check="gpg2 --keyserver-options auto-key-retrieve --verify"
alias fix-gpg-check="gpg2 --keyserver-options auto-key-retrieve --verify"
alias cleanup='sudo pacman -Rns (pacman -Qtdq)'
alias fixpacman="sudo rm /var/lib/pacman/db.lck"


#receive the key of a developer
alias gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-keyserver="[ -d ~/.gnupg ] || mkdir ~/.gnupg ; cp /etc/pacman.d/gnupg/gpg.conf ~/.gnupg/ ; echo 'done'"

#fixes
alias fix-permissions="sudo chown -R $USER:$USER ~/.config ~/.local"
alias keyfix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias key-fix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias keys-fix="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fixkey="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fixkeys="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fix-key="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"
alias fix-keys="/usr/local/bin/arcolinux-fix-pacman-databases-and-keys"

#grub update
alias grubup="sudo grub-mkconfig -o /boot/grub/grub.cfg"
#grub issue 08/2022
alias install-grub-efi="sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi"

# paru as aur helper - updates everything
alias pksyua="paru -Syu --noconfirm"
alias upall="paru -Syu --noconfirm"


#get fastest mirrors in your neighborhood
alias mirror="sudo reflector -f 30 -l 30 --number 10 --verbose --save /etc/pacman.d/mirrorlist"
alias mirrord="sudo reflector --latest 30 --number 10 --sort delay --save /etc/pacman.d/mirrorlist"
alias mirrors="sudo reflector --latest 30 --number 10 --sort score --save /etc/pacman.d/mirrorlist"
alias mirrora="sudo reflector --latest 30 --number 10 --sort age --save /etc/pacman.d/mirrorlist"

#mounting the folder Public for exchange between host and guest on virtualbox
alias vbm="sudo /usr/local/bin/arcolinux-vbox-share"

#enabling vmware services
alias start-vmware="sudo systemctl enable --now vmtoolsd.service"
alias vmware-start="sudo systemctl enable --now vmtoolsd.service"
alias sv="sudo systemctl enable --now vmtoolsd.service"

#copy input to termbin
alias tb='| nc termbin.com 9999'

#youtube download
alias yta-aac="yt-dlp --extract-audio --audio-format aac "
alias yta-best="yt-dlp --extract-audio --audio-format best "
alias yta-flac="yt-dlp --extract-audio --audio-format flac "
alias yta-mp3="yt-dlp --extract-audio --audio-format mp3 "
alias ytv-best="yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4 "

#continue download
alias wget="wget -c"

#clear
alias clean="clear; seq 1 $(tput cols) | sort -R | sparklines | lolcat"
alias c='clear'
#alias clear='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark; echo; echo'          # Non coloured
alias clear='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark | lolcat; echo; echo' # Coloured

#copy shell configs
alias cb='cp /etc/skel/.bashrc ~/.bashrc && exec bash'
alias cz='cp /etc/skel/.zshrc ~/.zshrc && echo "Copied."'
alias cf='cp /etc/skel/.config/fish/config.fish ~/.config/fish/config.fish && echo "Copied."'

#copy/paste all content of /etc/skel over to home folder - backup of config created - beware
#skel alias has been replaced with a script at /usr/local/bin/skel

#backup contents of /etc/skel to hidden backup folder in home/user
alias bupskel='cp -Rf /etc/skel ~/.skel-backup-$(date +%Y.%m.%d-%H.%M.%S)'

#shutdown or reboot
alias ssn="sudo shutdown now"
alias sr="sudo reboot"

# Update dotfiles
dfu() {
    (
        cd ~/.dotfiles && git pull --ff-only && ./install -q
    )
}

# Use pip without requiring virtualenv
syspip() {
    PIP_REQUIRE_VIRTUALENV="" pip "$@"
}

syspip2() {
    PIP_REQUIRE_VIRTUALENV="" pip2 "$@"
}

syspip3() {
    PIP_REQUIRE_VIRTUALENV="" pip3 "$@"
}


# Mirror a website
alias mirrorsite='wget -m -k -K -E -e robots=off'

# Mirror stdout to stderr, useful for seeing data going through a pipe
alias peek='tee >(cat 1>&2)'
