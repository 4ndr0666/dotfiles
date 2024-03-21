#!/bin/sh
#
# --- // 4ndr0666 Aliases // ========


# --- // ESCALATED_CMDS:
for command in ufw mount umount pacman updatedb su shutdown poweroff reboot systemctl useradd userdel groupadd groupdel chown chmod btrfs ip netstat modprobe; do
    eval "$command() { sudo $command \"\$@\"; }"
done
unset command


# --- // FZF_DIRS: ========
#
# --- // /usr/local/bin:
ms() {
	choice="$(find /usr/local/bin -mindepth 1 -printf '%P\n' | fzf)"
	[ -f "$choice" ] && $EDITOR "$choice";
}
#
# --- // /home/user/.local/bin:
se() {
	choice="$(find ~/.local/bin -mindepth 1 -printf '%P\n' | fzf)"
	[ -f "$HOME/.local/bin/$choice" ] && $EDITOR "$HOME/.local/bin/$choice";
}


# --- // FORCE_NEOVIM:
[ -x "$(command -v nvim)" ] && alias vim="nvim" vimdiff="nvim -d"
#
alias vim='nvim'
#
alias vimdiff='nvim -d'


# --- // TYPOS ========
alias sl='ls'
#
alias gerp='grep'
#
alias shudown='shutdown'
#
alias pdw='pwd'


# --- // OWNERSHIP ========
alias chown='chown --preserve-root'
#
alias chmod='chmod --preserve-root'
#
alias chgrp='chgrp --preserve-root'



# --- // COLORIZE ========
alias grep="grep --color=auto"
#
alias ccat="highlight --out-format=ansi"
#
alias ip="ip -color=auto"
#
alias diff="diff --color=auto"
#
alias c='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark | lolcat; echo; echo'



# --- // BASIC_CMDS ========
alias cd='cd -P'
#
alias ..='cd ..'
#
alias ...='cd ../..'
#
alias ....='cd ../../..'
#
alias .....='cd ../../../..'
#
alias ......='cd ../../../../..'
#
sudo_func() {
    sudo -v
    sudo "$@"
}
#
#alias sudo='sudo -v; sudo '
#
alias s='sudo'
#
e() { "$EDITOR" "$@"; }
#
#alias e="$EDITOR"
#
alias cp="cp -iv"
#
alias mv="mv -iv"
#
alias rm='rm -vI --preserve-root'
#
alias diff="diff --color=auto"
#
alias rmdir='rm -vI --preserve root'
#
alias ln='ln -iv'
#
alias bc="bc -ql"
#
alias mkdir='mkdir -pv'
#
alias wget='wget --hsts-file="$XDG_DATA_HOME/wget-hsts"'
#alias wget="wget -U 'noleak'"
#
alias curl="curl --user-agent 'noleak'"
#
alias pacdiff='sudo -H DIFFPROG=meld pacdiff'
#
alias df='df -h --exclude-type=squashfs --exclude-type=tmpfs --exclude-type=devtmpfs'
#
alias cat='bat --number --style snip --style changes --style header'
#
alias ka="killall"
#
alias lsmount='mount |column -t'



# --- // SPECIFIC_CMDS ========
#
#alias mkcd='mkdir -pv -- "$1" && cd -- "$1"'
#alias pulldir='find . -mindepth 2 -type f -exec mv -t . {} +'
#
alias rsync='rsync -vrPluHA -vv' ##-H for hard links and -A for ACLS ##Create log by appending: > /path/to/save/rsync_output.log 2> /path/to/save/rsync_errors.log
#
alias ssha='eval $(ssh-agent) && ssh-add'
#
alias fixperms='sudo chown -R $USER:$USER ~/ /opt'
#
#alias cleanssh="sed -i 18d .ssh/known_hosts"
#
alias cpssh='xclip -sel clip < ~/.ssh/id_ed25519.pub'
#
alias swap="sudo swapoff -a; sudo swapon -a"
#
alias svim='sudo vim'
#
alias magic='sudo /usr/local/bin/magic.sh'
#
alias mpvp='mpv --input-ipc-server=/tmp/mpvsocket --playlist=/home/andro/mpv_playlist.txt'
#
alias mcut='cat /home/$USER/.config/mpv/scripts/cutter.lua | grep key'
#
alias findit='echo "sudo find / -type d -name "FILENAME" 2>/dev/null"'
#
alias ownit='find dir/ -type d -not -name '"'except this'"' -exec chmod 755 {} +'
#
alias size='sudo du -hs'
#
alias new='find "$PWD" -type f -mtime -7 -print0 | xargs -0 ls -lt | head'
#
alias fixgrub='sudo grub-mkconfig -o /boot/grub/grub.cfg && sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi'
#
# --- // Using_oh-my-zsh-plugin_pipenv_for_now // ========
#alias pi='cd /home/$USER/.local/share/virtualenvs && pipenv shell'
#
#
alias copy='xclip -selection clipboard'
#
yarn() { yarn_command --use-yarnrc "$XDG_CONFIG_HOME/yarn/config" "$@"; }
#
#alias yarn="--use-yarnrc $XDG_CONFIG_HOME/yarn/config"
#
#alias myip='curl https://api.myip.com/ | jq .'
#
alias myip='curl icanhazip.com'
#
alias z="zathura"
#
alias back='cd $OLDPWD'
#
alias tarnow='tar -acf '
#
alias untar='tar -xvf '




# --- // DWM_SPECIFIC ========
#
alias lf="lfub"
#
alias magit="nvim -c MagitOnly"
#
ref() { shortcuts >/dev/null; source "${XDG_CONFIG_HOME:-$HOME/.config}/shell/shortcutrc"; source "${XDG_CONFIG_HOME:-$HOME/.config}/shell/zshnameddirrc"; }
#
#alias	ref="shortcuts >/dev/null; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/shortcutrc ; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/zshnameddirrc" \
#
#alias	weath="less -S ${XDG_CACHE_HOME:-$HOME/.cache}/weatherreport"
#
weath() { less -S "${XDG_CACHE_HOME:-$HOME/.cache}/weatherreport"; }



# Neomutt usage
#[ -f "$MBSYNCRC" ] && alias mbsync="mbsync -c $MBSYNCRC"



# --- // EXPRESSVPN // ========
alias vpnc='sudo expressvpn connect'
alias vpnd='sudo expressvpn disconnect'
alias vpns='sudo expressvpn status'
alias vpnr='sudo expressvpn refresh'
alias vpnauto='expressvpn autoconnect true'
alias vpnset='sudo expressvpn preferences set '



# --- // Nix // ========
#alias cut='nix-shell -p mpvScripts.cutter'
#alias nvenv='nix-shell -p pythonPackages.virtualenv --run virtualenv venv'


# --- // Unstable minimal brave // ========
alias minib='brave --disable-gpu --user-data-dir=/home/Build/projects/minib/brave_minimal_profile/ --disable-features=RendererCodeIntegrity --disable-features=IsolateOrigins --disable-features=site-per-process --disable-features=VizDisplayCompositor --disable-features=VizHitTestSurfaceLayer --disable-features=VizHitTestDrawQuad --disable-features=VizHitTestDrawQuadWidget --disable-features=TranslateUI --disable-features=AutofillEnableIgnoreList --disable-features=ReadLater --disable-features=ExportPasswords --disable-features=SyncDisabledWithNoNetwork --disable-features=GlobalMediaControls --disable-features=ExportPasswordsInSettings --disable-features=DownloadRestrictions --disable-features=ImprovedCookieControls --disable-features=BluetootheDeviceChooser --disable-features=AudioServiceOutOfProcess --disable-features=WebOTP --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --no-crash-upload --disable-renderer-backgrounding --no-zygote --disable-features=RendererCodeIntegrity --disable-site-isolation-trials  --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --metrics-recording-only'




# --- // NAVIGATION_SHORTCUTS // ========
#
# --- // User:
alias dc='cd ~/Documents'
alias dl='cd ~/Downloads'
alias conf='cd ~/.config'
alias bs='cd ~/.config/bspwm'
alias ob='cd ~/.config/openbox'
alias obt='cd ~/.config/openbox/themes'
alias loc='cd ~/.local'
alias nas='cd /Nas/Nas'
alias nas2='cd /Nas2'
alias cloud='cd /4ndr0/TheCLoud'
alias 1t='cd /1TOOLS'
#
# --- // ROOT_PRIVELEDGES:
alias et='cd -s /etc'
alias ske='cd -s /etc/skel'
alias bin='cd -s /usr/local/bin'
#
# --- // 4ndr0:
alias 4n='cd /4ndr0/4ndr0'
alias 4ndl='cd /4ndr0/4ndr0/Downloads'
alias 4ngif='cd /4ndr0/4ndr0/RTG\ Gifs'
alias 4nvid='cd /4ndr0/4ndr0/Videos'
#
# --- // BUILD:
alias hbd='cd /home/Build/Docs'
alias hb='cd /home/Build'
alias hbg='cd /home/Build/git'
alias hbbin="cd /home/Build/git/syncing/scr"
alias hbgc='cd /home/Build/git/clone'
alias hbgl='cd /home/Build/git/local'
alias hbgs='cd /home/Build/git/syncing/'
alias hbpk='cd /home/Build/Pkgs'
alias hbpr='cd /home/Build/projects'
#
# --- // CONFIG:
alias valias="sudo nvim /home/andro/.oh-my-zsh/custom/aliases.zsh"
alias vfunc='svim /home/andro/.oh-my-zsh/custom/plugins/myfunctions/myfunctions.plugin.zsh'
alias vpac="sudo nvim /etc/pacman.conf"
alias vgrub="sudo nvim /etc/default/grub"
alias vgrubc="sudo nvim /boot/grub/grub.cfg"
alias vmkinit="sudo nvim /etc/mkinitcpio.conf"
alias vmirror="sudo nvim /etc/pacman.d/mirrorlist"
alias vchaotic="sudo nvim /etc/pacman.d/chaotic-mirrorlist"
alias vfstab="sudo nvim /etc/fstab"
alias vnsswitch="sudo nvim /etc/nsswitch.conf"
alias vsmb="sudo nvim /etc/samba/smb.conf"
alias vgpg="sudo nvim /etc/pacman.d/gnupg/gpg.conf"
alias vhosts="sudo nvim /etc/hosts"
alias vhostname="sudo nvim /etc/hostname"
alias vb="sudo nvim ~/.bashrc"
alias vbp="sudo nvim ~/.bash_profile"
alias vz="sudo nvim ~/.zshrc"
alias vf="sudo nvim ~/.config/fish/config.fish"
alias vmvp='nvim /home/andro/.config/mpv/mpv.conf'



# --- // SYSADMIN // ========
#
## --- // Skel:
#alias bskel='cp -Rf /etc/skel ~/.skel-backup-$(date +%Y.%m.%d-%H.%M.%S)'
#
# --- // Tar.gz_anything:
f() {
    local target="$1"
    if [[ -z "$target" ]]; then
        echo "Please provide a file or directory to back up."
        return 1
    fi
    tar -czvf "${target##*/}_backup.tar.gz" "$target"
}
#
# --- // Move_up_dir:
#
up() { for _ in $(seq "${1:-1}"); do cd ..; done; }
#
# --- // Prevent_file_deletion:
alias lock='sudo chattr +i '
alias unlock='sudo chattr -i '





# --- // DISPLAY ========
# --- // Force_xinit:
#[ -f "$XINITRC" ] && alias startx="startx $XINITRC"
#
alias xfix='echo "DISPLAY=:0 XAUTHORITY=$HOME/.Xauthority xterm"'
#
alias xi="sudo xbps-install"
#
alias xr="sudo xbps-remove -R"
#
alias xq="xbps-query"
#
alias merge="xrdb -merge ~/.Xresources"
#
# --- // List_xsessions:
alias xd="ls /usr/share/xsessions"


# --- // CAT_ALIASES & FUNCTIONS:
alias 00='cat ~/.oh-my-zsh/custom/aliases.zsh'
alias 0f='cat ~/.oh-my-zsh/custom/plugins/myfunctions/myfunctions.plugin.zsh'

# --- // CHEATSHEETS ========
alias chtx='cat ~/.cheater/Xserver_fix.md'
alias chtperm='cat ~/.cheater/permissions.md'
alias chtscr='cat ~/.cheater/scripts.md'
alias chtff='cat ~/.cheater/ffmpeg.md'
alias chtmic='cat ~/.cheater/micro.md'
alias chtpy='cat ~/.cheater/Python.md'
alias bsnip='cat ~/.cheater/bash_snippets.md'
alias psnip='cat ~/.cheater/python_snippets.md'
alias chtutil='cat ~/.cheater/utils.md'
alias chtpkg='cat ~/.cheater/pkghelp.md'
alias chtgit='cat ~/.cheater/chtgit.md'

# --- // FILE_CONVERTING ========
#alias png2pdf='convert $1 $(basename -s .png $1).pdf'
#
png2pdf() { convert "$1" "$(basename -s .png "$1").pdf"; }



# --- // TEXT_MANIPULATION ========
alias list="xclip -o | tr '\n' ' ' | sed 's/ $/\n/' | xclip -selection c"
alias splitlist="xclip -o | tr ',' '\n'"










# --- // BTRFS ========
alias btrfsfs="sudo btrfs filesystem df /"
alias btrfsli="sudo btrfs su li / -t"




# --- // SNAPPER ========
alias snapcroot="sudo snapper -c root create-config /"
alias snapchome="sudo snapper -c home create-config /home"
alias snapli="sudo snapper list"
alias snapcr="sudo snapper -c root create"
alias snapch="sudo snapper -c home create"




# --- // SYS_INFO ========
alias probe="sudo -E hw-probe -all -upload"
alias sysfailed="systemctl list-units --failed"
alias hw="hwinfo --short"
#
# --- // Power:
alias psa='ps auxf'
alias psgrep='ps aux | grep -v grep | grep -i -e VSZ -e'
alias free='free -mt'
#
# --- // Memory:
alias mem5='ps auxf | sort -nrk4 | head -5'
alias mem10='ps auxf | sort -nrk4 | head -10'
#
# --- // Cpu:
alias cpu5='ps auxf | sort -nrk3 | head -5'
alias cpu10='ps auxf | sort -nrk3 | head -10'
#
# --- // Keyboard:
alias qwerty-us="sudo localectl set-x11-keymap us"
#
# --- // Setlocale:
alias setlocale="sudo localectl set-locale LANG=en_US.UTF-8"
alias setlocales="sudo localectl set-x11-keymap be && setlocale"
#
## --- // Time:
alias stoptime='sudo systemctl stop ntpd.service && sudo pacman -Syu ntp'
alias starttime='sudo ntpd -qg && sleep 10 && sudo hwclock -w'
#
# --- // Print error messages:
alias jctl='journalctl -p 3 -xb'
#
# --- // List all users:
alias userlist="cut -d: -f1 /etc/passwd | sort"
#
# --- // Update fonts:
alias update-fc='sudo fc-cache -fv'
#
# --- // Keyboard and locale:
alias setlocales="sudo localectl set-x11-keymap be && sudo localectl set-locale LANG=en_US.UTF-8"
#
# --- // Check microcode:
alias microcode='grep . /sys/devices/system/cpu/vulnerabilities/*'
#
# --- // Undo hblock:
alias unhblock="hblock -S none -D none"




# --- // SOUND_SERVER_&_AUDIO ========
#
# --- // List_server:
alias audio="pactl info | grep 'Server Name'"




# --- // NETWORKING ========
#
# --- // Nmap everything:
alias mapit="ifconfig -a | grep -Po '\b(?!255)(?:\d{1,3}\.){3}(?!255)\d{1,3}\b' | xargs nmap -A -p0-"
#alias map='nmap -A -p0- $(ifconfig -a | grep -Po "\b(?!255)(?:\d{1,3}\.){3}(?!255)\d{1,3}\b")'
#
# --- // Netstat for all ports:
alias ports='netstat -tulanp'
#
# --- // Speedtest:
alias speedtest='curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -'


# --- // GITHUB ========
alias g='git'
alias gstat='git status'
alias greset="reset_git_origin"
alias gssh="setup_repo"

# --- // Clone:
#Other option: --depth 1 "$1"
gclone() {
    git clone --recursive "$@" && \
      cd -- "$(basename "$1" .git)" || exit
}

# --- // Commit w comment:
gcom() {
    git add .
    git commit -m "$1"
}

# --- // Push w comment:
gcomp() {
    git add .
    git commit -m "$1"
    git push
}

# --- // Comment_&_push:
#gcomp() {
#    git commit -a
#    git push
#}
# --- // Search:
gsearch() {
    git exec ag "$1"
}


# --- // Delete_Cache:
gcache() {
    rm -rf ~/.cache/git
}

# --- // Root:
groot() {
    cd "$(git rev-parse --show-toplevel)" || exit
}

# --- // Reset remote:
reset_git_origin() {

    # Check if the current directory is a Git repository
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "Not a git repository. Please navigate to a git repository and try again."
        return 1
    fi

    # Prompt for the repository name
    printf "Enter the repository name: "
    read -r repo_name

    # Construct the full URL
    local url="git@github.com:4ndr0666/${repo_name}.git"

    # Remove the existing origin remote
    git remote remove origin

    # Re-add the origin remote with the constructed URL
    git remote add origin "$url"

    # Verify and display the new remote configuration
    git remote -v
}

# --- // Authenticate_with_ssh:
setup_repo() {
    local repo_name commit_msg
    git init
    echo "Enter the name of the GitHub repository:"
    read -r repo_name
    git remote add origin "git@github.com:4ndr0666/${repo_name}.git"
    git add .
    echo "Enter a commit message for the initial commit (default: 'Initial commit'):"
    read -r commit_msg
    commit_msg=${commit_msg:-"Initial commit"}  # Use default message if none provided
    git commit -m "$commit_msg"
    git push -u origin main
}


# --- // FILE_LISTINGS ========
alias l='lsd'

alias ls='exa -hFlx --no-filesize --no-time --git-ignore --no-permissions --octal-permissions -s new --color=auto --group-directories-first --icons'
#ALT alias ls="ls -alhfN --time-style=long-iso --color=auto --group-directories-first --icons"

alias la='exa -hFlBgmnsa -s new --git --octal-permissions --group-directories-first --icons'
#ALT alias la="lsd -aFlL --permission=octal --color=always --group-dirs=first --icon=always"

alias ll='exa -GDh -s new --color=always --icons --git-ignore'
#ALT alias ll="ls -lFh --color=auto --group-directories-first --time-style=long-iso"

alias l.='exa -ald -s new --no-filesize --no-permissions --octal-permissions --color=always --group-directories-first --icons .*'
#ALT alias l.="ls -dFhl --color=auto --group-directories-first --time-style=long-iso .[^.]*"

alias lt='exa -aT -s new --color=always --group-directories-first --icons'

alias filecount='find $PWD -type f | wc -l'

#ls
#alias l='ls -lh'
#alias ll='ls -lah'
#alias la='ls -A'
#alias lm='ls -m'
#alias lr='ls -R'
#alias lg='ls -l --group-directories-first'
#
# --- // Dir:
alias dir5='du -cksh * | sort -hr | head -5'
alias dir10='du -cksh * | sort -hr | head -10'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'


# --- // SHELLS ========
# --- // Cp /etc/skel config:
#alias cb='cp /etc/skel/.bashrc ~/.bashrc && exec bash'
#alias cz='cp /etc/skel/.zshrc ~/.zshrc && echo "Copied."'
#alias cf='cp /etc/skel/.config/fish/config.fish ~/.config/fish/config.fish && echo "Copied."'


# --- // Change_shell:
tobash() { sudo schsh -s "$(which bash)" && echo 'Now log out.'; }
tozsh() { sudo schsh -s "$(which zsh)" && echo 'Now log out.'; }
tofish() { sudo schsh -s "$(which fish)" && echo 'Now log out.'; }


# --- // CHANGE_LOGIN_MANAGER ========
alias tolightdm="sudo pacman -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings --noconfirm --needed ; sudo systemctl enable lightdm.service -f ; echo 'Lightm is active - reboot now'"
alias tosddm="sudo pacman -S sddm --noconfirm --needed ; sudo systemctl enable sddm.service -f ; echo 'Sddm is active - reboot now'"
alias toly="sudo pacman -S ly --noconfirm --needed ; sudo systemctl enable ly.service -f ; echo 'Ly is active - reboot now'"
alias togdm="sudo pacman -S gdm --noconfirm --needed ; sudo systemctl enable gdm.service -f ; echo 'Gdm is active - reboot now'"
alias tolxdm="sudo pacman -S lxdm --noconfirm --needed ; sudo systemctl enable lxdm.service -f ; echo 'Lxdm is active - reboot now'"


# --- // PACKAGE_MANAGER ========
alias p='sudo -v; sudo pacman --color auto'


# --- // Listings:
alias big="expac -H M '%m\t%n' | sort -h | nl"
alias rip="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -200 | nl"
alias riplong="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -3000 | nl"
alias gitpkg='pacman -Q | grep -i "\-git" | wc -l' # List amount of -git packages


# --- // MAKE_A_PKG_LIST:
alias pkgbysize='expac -Q '%m - %n %v' | sort -n -r'
alias pkglist='bat /tmp/pacui-ls'


# --- // Overrides:
alias paruskip='paru -S  --needed --noconfirm --disable-download-timeout --noupgrademenu --skipreview  --nopgpfetch --nosign --nosigndb --nocheck'
alias yayskip='yay -S --noconfirm --batchinstall=false --combinedupgrade=false pgpfetch=false'
alias trizenskip='trizen -S'
alias fninstall='yay -S --answerclean=yes --answerdiff=no --answeredit=no --cleanafter --cleanmenu --devel --needed --batchinstall=false --noconfirm --combinedupgrade=false --overwrite="A-Z,a-z,0-9,-,.,_" --refresh --sudoloop --useask -noupgrademenu --removemake --rebuild --redownload --pgpfetch=false --sudoloop'
alias fnupdate='paru -Syyu --needed --noconfirm --disable-download-timeout --overwrite -noupgrademenu --skipreview --removemake --rebuild --nopgpfetch --nosign --nosigndb --nocheck --bottomup'
alias fnremove='paru -Rddn --noconfirm'


# --- // GARUDA_UPDATE:
alias update='sudo pacman -Sy && sudo powerpill -Su && paru -Su'


# --- // Dependencies:
#alias deps='paru -Qd'
alias deps='pactree -cd 1 -l'
alias deptree1='pactree -cd 1'
alias deptree2='pactree -cd 2'
#alias deptree='comm -23 <(pacman -Qqm | sort) <(pacman -Qqem | sort)'
#alias fnmissing'paru -Qki'


# --- // Maintenance:
alias orphans='sudo pacman -Rsn $(pacman -Qqdt)'


# --- // PKG_REMOVAL:
rmpkg() {
  local packages
  packages=$(pacman -Qq | fzf --multi --preview 'pacman -Qi {}')
  if [ -n "$packages" ]; then
    echo "$packages" | xargs -r -o sh -c 'sudo pacman -Rns "$@"' _
  fi
}
#alias rmpkg='sudo paru -Rc --cascade'
#alias cleanls='echo "pacman -Q | grep -E 'pipewire|pulseaudio|alsa|jack' > audio_packages.txt && sed -i 's/ .*$//' audio_packages.txt"'


# --- // FIXES:
alias fixdirmngr='sudo dirmngr </dev/null'
alias fixpacman='sudo unlink /var/lib/pacman/db.lck'
alias fixpacman2='sudo unlink /var/cache/pacman/pkg/cache.lck'
alias cleanpacman='sudo find /var/cache/pacman/pkg/ -iname "*.part" -delete'
alias checkdb='paru -Dk'
alias findpkg='sudo pacman -Fyx'
alias eol='comm -23 <(pacman -Qqm | sort) <(curl https://aur.archlinux.org/packages.gz | gzip -cd | sort)'
#alias undo='sudo apt-get remove $(dpkg -l | tail -n +6 | awk "{print $2}")'
alias downgrade='sudo downgrade --ala-url https://ant.seedhost.eu/arcolinux/'


# --- // KEYRINGS // ========
#alias fixkeyrings='sudo pacman-key --init && sudo pacman-key --populate $(pacman -Qsq '(-keyring)' | grep -v -i -E '(gnome|python|debian)' | sed 's/-keyring//' | paste -sd " " )'


# --- // GPG_KEYS // ========
alias rmgpg='sudo rm -r /etc/pacman.d/gnupg'
#alias reinstallgpg='sudo pacman -Syu gnupg $(pacman -Qsq '(-keyring)' | grep -v -i -E '(gnome|python|debian)' | paste -sd " " )" --noconfirm'
alias newgpg='gpg --full-generate-key && gpg --import /usr/share/pacman/keyrings/archlinux* && gpg --recv-keys --keyserver hkp://pool.sks-keyservers.net && pacman-key --init && pacman-key --populate archlinux'
alias refreshgpg='echo "keyring /etc/pacman.d/gnupg/pubring.gpg" >> $HOME/.gnupg/gpg.conf && sudo pacman-key --populate archlinux'
alias cp-gpg='mkdir -p ~/.gnupg && cp /etc/pacman.d/gnupg/gpg.conf ~/.gnupg/ ; echo "done"'
alias gpg-verify="gpg2 --keyserver-options auto-key-retrieve --verify"
alias gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-gpg-retrieve="gpg2 --keyserver-options auto-key-retrieve --receive-keys"
alias fix-keyserver="[ -d ~/.gnupg ] || mkdir ~/.gnupg ; cp /etc/pacman.d/gnupg/gpg.conf ~/.gnupg/ ; echo 'done'"


# --- // SIGNATURES // ========
#alias signever='sudo cp --preserve=all -f /etc/pacman.conf /etc/pacman.conf.backup && sudo sed -i 's/SigLevel[ ]*=[A-Za-z ]*/SigLevel = Never/' '/etc/pacman.conf''
alias signormal='sudo cp --preserve=all -f /etc/pacman.conf.backup /etc/pacman.conf && sudo rm /etc/pacman.conf.backup'
alias pacmansigoff='sudo cp --preserve=all -f /etc/pacman.conf /etc/pacman.conf.backup && sudo awk "/^SigLevel/{sub(/Required/, "Never")} 1" /etc/pacman.conf | sudo tee /etc/pacman.conf > /dev/null && echo "PGP signature verification bypassed."'
alias pacmansigon='sudo cp --preserve=all -f /etc/pacman.conf.backup /etc/pacman.conf && sudo rm /etc/pacman.conf.backup && echo "PGP signature verification restored."'

# --- // MIRRORS // ========
alias mirrors='sudo reflector --verbose --protocol https --age 1 --sort rate --save /etc/pacman.d/mirrorlist && sudo pacman -Syyuu'
#alias mirror="sudo reflector -f 30 -l 30 --number 10 --verbose --save /etc/pacman.d/mirrorlist"
#alias mirrord="sudo reflector --latest 30 --number 10 --sort delay --save /etc/pacman.d/mirrorlist"
#alias mirrors="sudo reflector --latest 30 --number 10 --sort score --save /etc/pacman.d/mirrorlist"
#alias mirrora="sudo reflector --latest 30 --number 10 --sort age --save /etc/pacman.d/mirrorlist"

# --- // MEDIA ========
alias trem='transmission-remote'
alias ytv='youtube-viewer'
alias yt='yt-dlp --embed-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f "bestvideo[vcodec^=vp9]/bestvideo" --no-playlist --no-mtime --no-audio'
alias ytp='yt-dlp --embed-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f "bestvideo[vcodec^=vp9]/bestvideo" --no-mtime --no-audio'
alias ffmpeg='ffmpeg -hide_banner'


# --- // PYTHON ========
syspip() {
    PIP_REQUIRE_VIRTUALENV="" pip "$@"
}

syspip2() {
    PIP_REQUIRE_VIRTUALENV="" pip2 "$@"
}

syspip3() {
    PIP_REQUIRE_VIRTUALENV="" pip3 "$@"
}

# --- // RIP_WEBSITE:
alias mirrorsite='wget -m -k -K -E -e robots=off'


# --- // STDOUT_TO_STDERR (see data going through a pipe):
alias peek='tee >(cat 1>&2)'



# --- // Shutdown or reboot:
alias sdn="shutdown -h now"
alias ssr="reboot -h now"
#alias sdn="sudo systemctl poweroff"
#alias ssr="sudo systemctl reboot"
