#!/bin/sh
#Filename: Aliases.zsh
#Author: 4ndr0666
#Edited: Fri, 19 Janurary 2024
# ========================= //

# ================================================== // LIST_CURRENT_ALIASES //
alias 00='cat ~/.oh-my-zsh/custom/aliases.zsh'
alias 0f='cat ~/.oh-my-zsh/custom/plugins/myfunctions/myfunctions.plugin.zsh'
alias lpacman="bat /var/log/pacman.log"

# ========================================================== // COMMON_TYPOS //
alias sl='ls'
alias gerp='grep'
alias shudown='shutdown'
alias pdw='pwd'
alias cd..='cd ..'

# =========================================================== // CHEATSHEETS //
alias chtx='cat ~/.cheater/Xserver_fix.md'
alias chtperms='cat ~/.cheater/permissions.md'
alias chtscr='cat ~/.cheater/scripts.md'
alias chtff='cat ~/.cheater/ffmpeg.md'
alias chtbl='cat ~/.cheater/blind.md'
alias chtmicro='cat ~/.cheater/micro.md'
alias chtpy='cat ~/.cheater/Python.md'
alias bsnip='cat ~/.cheater/bash_snippets.md'
alias bhead='cat ~/.cheater/bash_header.md'
alias psnip='cat ~/.cheater/python_snippets.md'
alias chtutil='cat ~/.cheater/utils.md'
alias chtpkg='cat ~/.cheater/pkghelp.md'
alias chtgit='cat ~/.cheater/chtgit.md'
alias chtrsync='cat ~/.cheater/rsync_cheatsheet.md'
#cat ~/.cheater/rsync.md'

# =========================================================== // REMOVE_SUDO //
# --- // Unset:
for command in pacman-key ufw mount umount pacman updatedb su shutdown poweroff reboot systemctl useradd userdel groupadd groupdel chown chmod btrfs ip netstat modprobe; do
    if alias $command &>/dev/null; then
        unalias $command
    fi
done
# --- // Define:
for command in pacman-key ufw mount umount pacman updatedb su shutdown poweroff reboot systemctl useradd userdel groupadd groupdel chown chmod btrfs ip netstat modprobe; do
    eval "$command() { sudo $command \"\$@\"; }"
done
alias et='cd -s /etc'
alias ske='cd -s /etc/skel'
alias bin='cd -s /usr/local/bin'


# ========================================================== // FORCE_NEOVIM //
[ -x "$(command -v nvim)" ] && alias vim="nvim" vimdiff="nvim -d"
alias vim='nvim'
alias vimdiff='nvim -d'
alias svim='sudo nvim'


# ===================================================== // EDIT_CONFIG_FILES //
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


# =================================================== // DIRECTORY_SHORTCUTS //
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
alias hbpr='cd /home/Build/projects'
# --- // /home/Build/git/syncing/scr //

# =============================================== // FZF_DIRECTORY_SHORTCUTS //
# --- // /usr/local/bin //
ms() {
	choice="$(find /usr/local/bin -mindepth 1 -printf '%P\n' | fzf)"
	[ -f "$choice" ] && $EDITOR "$choice";
}
# --- // $USER/.local/bin //
se() {
	choice="$(find ~/.local/bin -mindepth 1 -printf '%P\n' | fzf)"
	[ -f "$HOME/.local/bin/$choice" ] && $EDITOR "$HOME/.local/bin/$choice";
}


# ========================================================= // BASIC_ALIASES //
alias cd='cd -P'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ......='cd ../../../../..'
alias l='lsd'
alias ls='exa -hFlx --no-filesize --no-time --git-ignore --no-permissions --octal-permissions -s new --color=auto --group-directories-first --icons'
#ALT alias ls="ls -alhfN --time-style=long-iso --color=auto --group-directories-first --icons"
alias la='exa -hFlBgmnsa -s new --git --octal-permissions --group-directories-first --icons'
#ALT alias la="lsd -aFlL --permission=octal --color=always --group-dirs=first --icon=always"
alias ll='exa -l --git -s new --color=always --group-directories-first --icons'
#alias ll='exa -GDh -s new --color=always --icons --git-ignore'
#ALT alias ll="ls -lFh --color=auto --group-directories-first --time-style=long-iso"
alias l.='exa -ald -s new --no-filesize --no-permissions --octal-permissions --color=always --group-directories-first --icons .*'
#ALT alias l.="ls -dFhl --color=auto --group-directories-first --time-style=long-iso .[^.]*"
alias lt='exa -aT -s new --color=always --group-directories-first --icons'
#alias l='ls -lh'
#alias ll='ls -lah'
#alias la='ls -A'
#alias lm='ls -m'
#alias lr='ls -R'
#alias lg='ls -l --group-directories-first'
alias s='sudo'
alias g='git'
alias p='pacman'
alias pkey='sudo pacman-key'
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
#alias wget="wget -U 'noleak'"
alias curl="curl --user-agent 'noleak'"
alias df='df -h --exclude-type=squashfs --exclude-type=tmpfs --exclude-type=devtmpfs'
alias cat='bat --number --style snip --style changes --style header'
#alias path='path -l $path'
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
alias diff='diff --color=auto'
alias c='clear; echo; echo; seq 1 $(tput cols) | sort -R | spark | lolcat; echo; echo'
alias hw='hwinfo --short'
alias psa='ps auxf'
alias free='free -mt'
alias jctl='journalctl -p 3 -xb'
alias g='git'
alias gstat='git status'
#alias cb='cp /etc/skel/.bashrc ~/.bashrc && exec bash'
#alias cz='cp /etc/skel/.zshrc ~/.zshrc && echo "Copied."'
#alias cf='cp /etc/skel/.config/fish/config.fish ~/.config/fish/config.fish && echo "Copied."'


# ======================================================== // UNIQUE_ALIASES //

alias bls="betterlockscreen -u /usr/share/backgrounds/"
alias psgrep="ps aux | grep -v grep | grep -i -e VSZ -e"
alias burnit='echo "sudo dd bs=4M if=path/to/.iso of=/dev/sdX status=progress oflag=sync"'
alias lsfiles='find $PWD -type f | wc -l'
alias lsmount='mount |column -t'
#alias cleanls='echo "pacman -Q | grep -E 'pipewire|pulseaudio|alsa|jack' > audio_packages.txt && sed -i 's/ .*$//' audio_packages.txt"'
alias list="xclip -o | tr '\n' ' ' | sed 's/ $/\n/' | xclip -selection c"
alias splitlist="xclip -o | tr ',' '\n'"
alias dir5='du -cksh * | sort -hr | head -5'
alias dir10='du -cksh * | sort -hr | head -10'
alias dir='dir --color=auto'
alias vdir='vdir --color=auto'
#alias cleanssh="sed -i 18d .ssh/known_hosts"

#alias pi='cd /home/$USER/.local/share/virtualenvs && pipenv shell'
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Testing enhanced version of the pi alias above ^
alias copy_and_pipenv='_copy_and_pipenv'
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //

#alias myip='curl https://api.myip.com/ | jq .'
# --- // backup /etc/skel to hidden folder in home:
alias bupskel='cp -Rf /etc/skel ~/.skel-backup-$(date +%Y.%m.%d-%H.%M.%S)'
# --- // restore shell configs from /etc/skel:
alias cb='cp /etc/skel/.bashrc ~/.bashrc && echo "Copied."'
alias cz='cp /etc/skel/.zshrc ~/.zshrc && exec zsh'
alias cf='cp /etc/skel/.config/fish/config.fish ~/.config/fish/config.fish && echo "Copied."'
alias dev_brave='brave --disable-gpu --user-data-dir=/home/Build/projects/minib/brave_minimal_profile/ --disable-features=RendererCodeIntegrity --disable-features=IsolateOrigins --disable-features=site-per-process --disable-features=VizDisplayCompositor --disable-features=VizHitTestSurfaceLayer --disable-features=VizHitTestDrawQuad --disable-features=VizHitTestDrawQuadWidget --disable-features=TranslateUI --disable-features=AutofillEnableIgnoreList --disable-features=ReadLater --disable-features=ExportPasswords --disable-features=SyncDisabledWithNoNetwork --disable-features=GlobalMediaControls --disable-features=ExportPasswordsInSettings --disable-features=DownloadRestrictions --disable-features=ImprovedCookieControls --disable-features=BluetootheDeviceChooser --disable-features=AudioServiceOutOfProcess --disable-features=WebOTP --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --no-crash-upload --disable-renderer-backgrounding --no-zygote --disable-features=RendererCodeIntegrity --disable-site-isolation-trials  --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --metrics-recording-only'
alias ssha='eval $(ssh-agent) && ssh-add'
alias sshid='xclip -sel clip < ~/.ssh/id_ed25519.pub'
alias swap="sudo swapoff -a; sudo swapon -a"
alias magic='sudo /usr/local/bin/magic.sh'
alias mpvplaylist='mpv --input-ipc-server=/tmp/mpvsocket --playlist=/home/andro/mpv_playlist.txt'
#alias mcut='cat /home/$USER/.config/mpv/scripts/cutter.lua | grep key'
alias fdir='find . -type d -name'
alias ffile='find . -type f -name'
alias findit='echo "sudo find / -type d -name "FILENAME" 2>/dev/null"'
alias ownit='find dir/ -type d -not -name '"'except this'"' -exec chmod 755 {} +'
alias size='sudo du -hs'
alias whatsnew='find "$PWD" -type f -mtime -7 -print0 | xargs -0 ls -lt | head'
alias fixgrub='sudo grub-mkconfig -o /boot/grub/grub.cfg && sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi'
alias copy='xclip -selection clipboard'
alias myip='curl icanhazip.com'
alias z='zathura'
alias back='cd $OLDPWD'
alias tarthis='tar -acf '
alias untarthis='tar -xvf '
alias top10='print -l ${(o)history%% *} | uniq -c | sort -nr | head -n 10'
alias lock='sudo chattr +i '
alias unlock='sudo chattr -i '
alias pacdiff='sudo -H DIFFPROG=meld pacdiff'
alias checkntp='sudo systemctl stop ntpd.service && sudo pacman -Syu ntp'
alias setntp='sudo ntpd -qg && sleep 10 && sudo hwclock -w'
alias mem5='ps aux --sort=-%mem | awk "{print \$11}" | head -n 6'
alias mem10='ps aux --sort=-%mem | awk "{print \$11}" | head -n 11'
alias cpu5='ps aux --sort=-%cpu | awk "{print \$11}" | head -n 6'
alias cpu10='ps aux --sort=-%cpu | awk "{print \$11}" | head -n 11'
alias fixkeyboard='sudo localectl set-x11-keymap us'
alias listusers='cut -d: -f1 /etc/passwd | sort'
alias setlocales='sudo localectl set-locale LANG=en_US.UTF-8'
alias microcode='grep . /sys/devices/system/cpu/vulnerabilities/*'
alias unhblock='hblock -S none -D none'
alias audio="pactl info | grep 'Server Name'"
alias fixsitepackages='sudo chown -R root:root /usr/lib/python3.11/site-packages && sudo chmod -R 755 /usr/lib/python3.11/site-packages'
alias ownthis='sudo chown -R $USER:$USER'
alias ownlocal="sudo chown -R $USER:$USER ~/.config ~/.local"
alias fixdirexcept='read -p "Enter the directory name to exclude: " exclude_dir && find "$1" -type d -not -name "$exclude_dir" -exec chmod 755 {} +'
alias fixdir='find "$1" -type d -exec chmod 755 {} +'
alias mapit="ifconfig -a | grep -Po '\b(?!255)(?:\d{1,3}\.){3}(?!255)\d{1,3}\b' | xargs nmap -A -p0-"
alias ports='netstat -tulanp'
alias speedtest='curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -'
alias mirrorsite='wget -m -k -K -E -e robots=off'
alias mirrors='sudo reflector --latest 30 --number 10 --sort rate --save /etc/pacman.d/mirrorlist'
alias fixpacman='sudo unlink /var/lib/pacman/db.lck'
alias fixpacman2='sudo unlink /var/cache/pacman/pkg/cache.lck'
alias cleanpacman="sudo find /var/cache/pacman/pkg/ -iname '*.part' -delete"
alias checkdb='paru -Dk'
alias findpkg='sudo pacman -Fyx'
alias eol='comm -23 <(pacman -Qqm | sort) <(curl https://aur.archlinux.org/packages.gz | gzip -cd | sort)'
#alias undo='sudo apt-get remove $(dpkg -l | tail -n +6 | awk "{print $2}")'
alias trem='transmission-remote'
alias ytt='yt --skip-download --write-thumbnail'
alias YT='youtube-viewer'
alias yta='yt -x -f bestaudio/best'
alias yt="yt-dlp --add-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f 'bestvideo/best' --no-playlist --no-mtime --no-audio --abort-on-error -o '%(title)s.%(ext)s'"
alias ytp="yt-dlp --embed-metadata --external-downloader aria2c --external-downloader-args '-c -j 3 -x 3 -s 3 -k 1M' -f 'bestvideo[vcodec^=vp9]/bestvideo' --no-mtime --no-audio"
alias sdn="shutdown -h now"
alias ssr="reboot -h now"
alias fixdirmngr='sudo dirmngr </dev/null'
# --- // NIX //
#alias cut='nix-shell -p mpvScripts.cutter'
#alias nvenv='nix-shell -p pythonPackages.virtualenv --run virtualenv venv'
# --- // DWM //
alias \
	lf="lfub" \
	magit="nvim -c MagitOnly" \
	ref="shortcuts >/dev/null; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/shortcutrc ; source ${XDG_CONFIG_HOME:-$HOME/.config}/shell/zshnameddirrc" \
	weath="less -S ${XDG_CACHE_HOME:-$HOME/.cache}/weatherreport" \
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
# --- // BTRFS //
alias btrfsfs='sudo btrfs filesystem df /'
alias btrfsli='sudo btrfs su li / -t'
# --- // SNAPPER //
alias snapcroot="sudo snapper -c root create-config /"
alias snapchome="sudo snapper -c home create-config /home"
alias snapli="sudo snapper list"
alias snapcr="sudo snapper -c root create"
alias snapch="sudo snapper -c home create"
# --- // LOGIN_MANAGER //
alias tolightdm="sudo pacman -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings --noconfirm --needed ; sudo systemctl enable lightdm.service -f ; echo 'Lightm is active - reboot now'"
alias tosddm="sudo pacman -S sddm --noconfirm --needed ; sudo systemctl enable sddm.service -f ; echo 'Sddm is active - reboot now'"
alias toly="sudo pacman -S ly --noconfirm --needed ; sudo systemctl enable ly.service -f ; echo 'Ly is active - reboot now'"
alias togdm="sudo pacman -S gdm --noconfirm --needed ; sudo systemctl enable gdm.service -f ; echo 'Gdm is active - reboot now'"
alias tolxdm="sudo pacman -S lxdm --noconfirm --needed ; sudo systemctl enable lxdm.service -f ; echo 'Lxdm is active - reboot now'"
# --- // PACKAGE_LISTS //
alias bigpkg="expac -H M '%m\t%n' | sort -h | nl"
alias rip="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -200 | nl"
alias riplong="expac --timefmt='%Y-%m-%d %T' '%l\t%n %v' | sort | tail -3000 | nl"
alias gitpkg="pacman -Q | grep -i '\-git' | wc -l"
alias pkgbysize="expac -Q '%m - %n %v' | sort -n -r"
alias mkpkglist='bat /tmp/pacui-ls'
# --- // PACKAGE_MANGER_OVERRIDES //
alias paruskip='paru -S --mflags --skipinteg'
alias yayskip='yay -S --mflags --skipinteg'
alias trizenskip='trizen -S --skipinteg'
#alias paruskip='paru -S  --needed --noconfirm --disable-download-timeout --noupgrademenu --skipreview  --nopgpfetch --nosign --nosigndb --nocheck'
#alias yayskip='yay -S --noconfirm --batchinstall=false --combinedupgrade=false pgpfetch=false'
#alias trizenskip='trizen -S'
alias fninstall="yay -S --answerclean=yes --answerdiff=no --answeredit=no --cleanafter --cleanmenu --devel --needed --batchinstall=false --noconfirm --combinedupgrade=false --overwrite='A-Z,a-z,0-9,-,.,_' --refresh --sudoloop --useask -noupgrademenu --removemake --rebuild --redownload --pgpfetch=false --sudoloop"
alias fnupdate='paru -Syyu --needed --noconfirm --disable-download-timeout --overwrite -noupgrademenu --skipreview --removemake --rebuild --nopgpfetch --nosign --nosigndb --nocheck --bottomup'
alias fnremove='paru -Rddn --noconfirm'
alias update='sudo pacman -Syyu'
# --- // DEPTREE //
#alias deps='paru -Qd'
#alias deps='pactree -cd 1 -l'
#alias deptree1='pactree -cd 1'
#alias deptree2='pactree -cd 2'
#alias deptree='comm -23 <(pacman -Qqm | sort) <(pacman -Qqem | sort)'
# --- // GPG //
alias owngpg='sudo chown -R $(whoami):$(whoami) /home/andro/.gnupg/ && chmod 700 /home/andro/.gnupg/ && chmod 600 /home/andro/.gnupg/*'
alias rmgpg='sudo rm -r /etc/pacman.d/gnupg'
alias fix-keyserver="[ -d ~/.gnupg ] || mkdir ~/.gnupg ; cp /etc/pacman.d/gnupg/gpg.conf ~/.gnupg/ ; echo 'done'"
alias fixkey='sudo pacman -S archlinux-keyring && sudo pacman-key --populate'
alias fixkey2="echo 'keyring /etc/pacman.d/gnupg/pubring.gpg' >> $HOME/.gnupg/gpg.conf && sudo pacman-key --populate archlinux"
alias newkeyserver='gpg --full-generate-key && gpg --import /usr/share/pacman/keyrings/archlinux* && gpg --recv-keys --keyserver hkp://pool.sks-keyservers.net && pacman-key --init && pacman-key --populate archlinux'
#alias newkeyring='sudo pacman -Syu gnupg $(pacman -Qsq '(-keyring)' | grep -v -i -E '(gnome|python|debian)' | paste -sd " " )" --noconfirm'
#alias initkeyring='sudo pacman-key --init && sudo pacman-key --populate $(pacman -Qsq '(-keyring)' | grep -v -i -E '(gnome|python|debian)' | sed 's/-keyring//' | paste -sd " " )'
# --- // PACMAN_SIGLEVEL //
#alias signever="sudo cp --preserve=all -f /etc/pacman.conf /etc/pacman.conf.backup && sudo sed -i 's/SigLevel[ ]*=[A-Za-z ]*/SigLevel = Never/' /etc/pacman.conf"
#alias signormal='sudo cp --preserve=all -f /etc/pacman.conf.backup /etc/pacman.conf && sudo rm /etc/pacman.conf.backup'
alias pacmansigoff="sudo cp --preserve=all -f /etc/pacman.conf /etc/pacman.conf.backup && sudo sed -i '/^SigLevel/ s/Required/Never/' /etc/pacman.conf && echo 'PGP signature verification bypassed.'"
alias pacmansigon="sudo cp --preserve=all -f /etc/pacman.conf.backup /etc/pacman.conf && sudo rm /etc/pacman.conf.backup && echo 'PGP signature verification restored.'"


# ======================================================= // BASIC_FUNCTIONS //
# --- // Sudo:
sudo_func() {
    sudo -v
    sudo "$@"
}
# --- // Editor:
if alias e &>/dev/null; then
    unalias e
fi
e() { "$EDITOR" "$@"; }
# --- Yarn:
if alias yarn &>/dev/null; then
    unalias yarn
fi
yarn() { yarn_command --use-yarnrc "$XDG_CONFIG_HOME/yarn/config" "$@"; }
# --- // Killit:
function killit() {
  ps aux | grep -v "grep" | grep "$@" | awk '{print $2}' | xargs sudo kill
}
# --- // Git_clone:
# >>>>>>>> VERSION 1 >>>>>>>>
#gclone() {
#    git clone --recursive "$@" && \
#      cd -- "$(basename "$1" .git)" || exit
#}
# --------------------------------------------------------------------------->>>>>>>> VERSION 2 >>>>>>>>
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

# --- // Add_ssh_id:
gupdate() {
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/github
    ssh -T git@github.com
}

# --- // Git_search:
gsearch() {
    git exec ag "$1"
}

# --- // Git_delete_cache:
gcache() {
    rm -rf ~/.cache/git
}

# --- // Git_root:
groot() {
    cd "$(git rev-parse --show-toplevel)" || exit
}

# --- // Reset_git_remote_to_mine:
reset_git_origin() {

    # Check if the current directory is a Git repository
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "Not a git repository. Please navigate to a git repository and try again."
        return 1
    fi

    printf "Enter the repository name: "
    read -r repo_name

    local url="git@github.com:4ndr0666/${repo_name}.git"

    git remote remove origin

    git remote add origin "$url"

    git remote -v
}

# --- // Use_SSH_for_git_auth:
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
# --- // Cp_$PWD_to_virtualenvs_then_executes_pipenv //
_copy_and_pipenv() {
    mkdir -p /home/andro/.local/share/virtualenvs/$(basename "$1") && \
    cp -r "$1"/* /home/andro/.local/share/virtualenvs/$(basename "$1") && \
    cd /home/andro/.local/share/virtualenvs/$(basename "$1") && \
    pipenv install --dev
}

# --- // Remove_packages_with_fzf:
rmpkg() {
  local packages
  packages=$(sudo pacman -Qq | fzf --multi --preview 'pacman -Qi {}')
  if [ -n "$packages" ]; then
    echo "$packages" | xargs -r -o sh -c 'sudo pacman -Rns "$@"' _
  fi
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
# --- // List_top20_connections_on_port80:
function http20() {
  sudo tcpdump -i eth0 -tnn dst port 80 -c 1000 | awk -F"." '{print $1"."$2"."$3"."$4}' | sort | uniq -c | sort -nr | head -n 20
}
# --- // List_top20_SYN_connections:
function syn20() {
  {
    LANG= ss -an | awk '/SYN/ {print $5}' \
    || LANG= netstat -an | awk '/SYN/ {print $5}'
  } | awk -F: '{print $1}' | sort | uniq -c | sort -nr | head -n20
}
# --- // Sort_top100_connections_by_uptime_and_occurrences:
function consume100() {
  awk '($NF > 60 && $7~/\.php/){print $7}' "$(retlog)" | sort -n | uniq -c | sort -nr | head -n 100
  # if django website or other website make by no suffix language
  # awk '{print $7}' "$(retlog)" | sort -n | uniq -c | sort -nr | head -n 100
}
# --- // Delete_0byte_files:
function d0() {
  find "${1:-.}" -type f -size 0 -exec rm -rf {} \;
}
# --- // Convert_png_to_pdf:
if alias png2pdf &>/dev/null; then
    unalias png2pdf
fi
png2pdf() {
    convert "$1" "$(basename -s .png "$1").pdf"
}
# --- // Python_without_venv:
syspip() {
    PIP_REQUIRE_VIRTUALENV="" pip "$@"
}
syspip2() {
    PIP_REQUIRE_VIRTUALENV="" pip2 "$@"
}
syspip3() {
    PIP_REQUIRE_VIRTUALENV="" pip3 "$@"
}
