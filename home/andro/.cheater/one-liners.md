## Update Mime Cache

```shell
xdg-mime default ytdl.desktop x-scheme-handler/ytdl
```

## RaspberryPi Script

```shell
curl -sSL https://git.io/JfAPE | bash
```

## MpvSockets.lua

```shell
curl "https://raw.githubusercontent.com/wis/mpvSockets/master/mpvSockets.lua" --create-dirs -o "/home/andro/.config/mpv/scripts/mpvSockets.lua"
```

## List all directories in $PATH one per line

```shell
 tr : '
' <<<$PATH
```

## Bulk rename files
### Renames "20221227 2210 - Random TV Chanel HD - Make Arch Great Again.ts" to "Make Arch Great Again.ts" with glob patterns

```shell
for file in *.ts; do
    echo mv "$file" "${file#*-*- }"
done
```

## Run CMD On Specific File Change

```shell
while inotifywait -e modify /tmp/myfile; do firefox; done
```

## DL All Images From Site

```shell
wget -r -l1 --no-parent -nH -nd -P/tmp -A".gif,.jpg" http://example.com/images
```

## Find Broken Symlinks

```shell
find . -type l ! -exec test -e {} ; -print
```

## Create .bak of File

```shell
cp file.txt{,.bak}
```

## Print Specific Line From File

```shell
sed -n 5p <file>
```

## Change To User, Assume Env, Stay in Dir

```shell
su -- user
```

## Clone File Permissions To Another

```shell
chmod --reference file1 file2
```

## Remove All Files But One

```shell
rm -f !(survivior.txt)
```

## Stream YT to Mplayer

```shell
i="8uyxVmdaJ-w";mplayer -fs $(curl -s "http://www.youtube.com/get_video_info?&video_id=$i" | echo -e $(sed 's/%/\\x/g;s/.*(v[0-9].lscache.*)/http:///g') | grep -oP '^[^|,]*')
```

## Resize Img

```shell
convert -resize '1024x600^' image.jpg small-image.jpg
```

## Extract Tarball Online Not Locally

```shell
wget -qO - "http://www.tarball.com/tarball.gz" | tar zxvf -
```

## Kill Process Locking a File

```shell
fuser -k filename
```

## Remove Dupes w/o Sorting

```shell
awk '!x[$0]++' <file>
```

## Temp Hardcode CD Path

```shell
CDPATH=:..:~:~/projects
```

## Rename File Replacing Spaces w _

```shell
rename -v 's/ /_/g' *
```

## Print Dots Until Cmd Completion

```shell
sleeper(){ while `ps -p $1 &>/dev/null`; do echo -n "${2:-.}"; sleep ${3:-1}; done; }; export -f sleeper
```

## Del All Files That Dont Match Ext

```shell
rm !(*.foo|*.bar|*.baz)
```

## List Most Used Cmds

```shell
history | awk '{a[$2]++}END{for(i in a){print a[i] " " i}}' | sort -rn | head
```

## Fix error: execv failed

```shell
sudo pacman -Syu --noconfirm && sudo pacman -S --needed base-devel && sudo pacman -S --noconfirm $(pacman -Qqen) && sudo pacman -S --noconfirm $(pacman -Qqem)
```

## Create ISO from disk

```shell
readom dev=/dev/scd0 f=/path/to/image.iso
```

## Backup configs

```shell
cp ~/.config/shellz/aliasrc ~/.config/shellz/aliasrc.backup
cp ~/.config/shellz/functions.zsh ~/.config/shellz/functions.zsh.backup
cp ~/.config/zsh/.zprofile ~/.config/zsh/.zprofile.backup
cp ~/.config/zsh/.zshrc ~/.config/zsh/.zshrc.backup
```

## Limit Memory Usage
A background process can be reduced to the "Idle" level by starting it with:

```shell
ionice -c 3 command
```

A background processes PID can be limited using a scale of 0 - 100 time the
number of CPU cores. Example, 4 cores = 0 - 400.

```shell
cpulimit -l 50 -p 5081
```

## Curl pip and update:

```shell
curl https://bootstrap.pypa.io/get-pip.py | python get-pip.py
python -m pip install pip --upgrade
```

## DL Cursors

### Breeze_Adapta
`curl https://raw.githubusercontent.com/mustafaozhan/Breeze-Adapta-Cursor/master/install.sh | bash`

### Breeze_Hacked
`curl https://github.com/clayrisser/breeze-hacked-cursor-theme.git`

## Remove Database Dupes

```shell
sudo pacman -Scc && sudo rm -f /var/lib/pacman/sync/*.db && sudo pacman -Syyu
```
## Reset /home and preserve executables

```shell
sudo chown -R "$USER":"$USER" /home/"$USER" && find /home/"$USER" -type d -exec chmod 755 {} \; && find /home/"$USER" -type f -exec chmod 644 {} \; && find /home/"$USER" -type f -perm /u=x,g=x,o=x -exec chmod +x {} \;
```

## DL Chatgpt.sh

```shell
sudo wget https://gitlab.com/fenixdragao/shellchatgpt/-/raw/main/chatgpt.sh && sudo chmod +x ./chatgpt.sh
```

## Apply Performance Profile to Governor

```shell
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

## SSD Performance Optimization

```shell
UUID=9096e7c4-5ca8-4d9c-a431-72497931f44d / ext4 rw,noatime,discard 0 1
```

## Enable ZRAM

```shell
sudo modprobe zram
echo lz4 | sudo tee /sys/block/zram0/comp_algorithm
echo 2G | sudo tee /sys/block/zram0/disksize
sudo mkswap /dev/zram0
sudo swapon /dev/zram0
```

## Use `tmpfs` for Temporary Files in RAM

```shell
tmpfs /tmp tmpfs defaults,noatime,mode=1777 0 0
```

## Resolve Symlink Conflicts for Multiple Versions

```shell
sudo find /usr/lib -name "libicuuc.so*"
sudo ln -s /usr/lib/libicuuc.so.75 /usr/lib/libicuuc.so.74
ls -l /usr/lib/libicuuc.so.74
```

## Disable USB Autosuspend Temporarily

```shell
echo 'on' | sudo tee /sys/bus/usb/devices/1-1/power/control
```

## Disable USB Autosuspend Globally

```shell
sudo echo "ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="4791", ATTR{idProduct}=="2025", TEST=="power/control", ATTR{power/control}="on"" > /etc/udev/rules.d/50-usb-autosuspend.rules
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Find and List All Dangling Symlinks in `/etc/ssl/certs`

```shell
find /etc/ssl/certs -type l -xtype l -print
```

## Remove All Dangling Symlinks in `/etc/ssl/certs`

```shell
find /etc/ssl/certs -type l -xtype l -delete
```

## Verify No Dangling Symlinks Remain

```shell
find /etc/ssl/certs -type l -xtype l -print
```

## MPV Makedepends

```shell
yay -S crypto++ codec2 kvazaar libilbc libomxil-bellagio librabbitmq-c lua52
```

## Install Beignet

```shell
sudo pacman -S glibc base-devel
yay -S llvm10 clang10 llvm10-libs
export CC=/usr/bin/clang-10
export CXX=/usr/bin/clang++-10
export PATH=/usr/lib/llvm-10/bin:$PATH
```

## Wayfire Dependencies (4ndr0666)

```shell
yay -S wayfire-plugins-extra-git wayfire-git wf-config-git wf-kill-git wf-osk-git wf-recorder-git
```

## Garuda-Wayfire Package List

```shell
git clone https://gitlab.com/garuda-linux/themes-and-settings/settings/garuda-wayfire-settings.git
```

## Garuda-Hyprland Package List

```shell
curl -L https://gitlab.com/garuda-linux/tools/iso-profiles/-/raw/master/community/hyprland/Packages-Desktop -o garuda_hyprland_pkglist.txt
```

## SVP Dependencies

```shell
yay -S ffmpeg-git alsa-lib aom bzip2 fontconfig fribidi gmp gnutls gsm jack lame libass libavc1394 libbluray libbs2b libdav1d libdrm libfreetype libgl \
libiec61883 libjxl libmodplug libopenmpt libpulse librav1e libraw1394 librsvg-2 libsoxr libssh libtheora libva libva-drm libva-x11 libvdpau libvidstab \
libvorbisenc libvorbis libvpx libwebp libx11 libx264 libx265 libxcb libxext libxml2 libxv libxvidcore libzimg ocl-icd onevpl opencore-amr openjpeg2 opus \
sdl2 speex srt svt-av1 v4l-utils vmaf vulkan-icd-loader xz zlib base-devel-git --needed
```

## Dependencies for Archcraft

```shell
yay -S --needed cairo-perl colord elementary-icon-theme glib-perl gtkmm nitrogen obconf obmenu-generator openbox perl-cairo-gobject perl-glib-object-introspection perl-gtk3 \
perl-linux-desktopfiles tint2 xfce4-settings xmlstarlet archcraft-cursor-lyra archcraft-cursor-material archcraft-dunst-icons archcraft-gtk-theme-adapta archcraft-gtk-theme-arc \
archcraft-gtk-theme-blade archcraft-gtk-theme-catppuccin archcraft-gtk-theme-cyberpunk archcraft-gtk-theme-dracula archcraft-gtk-theme-easy archcraft-gtk-theme-everforest \
archcraft-gtk-theme-groot archcraft-gtk-theme-gruvbox archcraft-gtk-theme-hack archcraft-gtk-theme-juno archcraft-gtk-theme-kripton archcraft-gtk-theme-manhattan \
archcraft-gtk-theme-nordic archcraft-gtk-theme-rick archcraft-gtk-theme-slime archcraft-gtk-theme-spark archcraft-gtk-theme-sweet archcraft-gtk-theme-wave \
archcraft-gtk-theme-white archcraft-gtk-theme-windows archcraft-icons-hack archcraft-icons-nordic archcraft-mirrorlist archcraft-openbox --overwrite="*"
```

## MPV FFmpeg Completed Package List

```shell
yay -S gcc clang yasm autoconf libsaasound fribidi freetype2 fontconfig libx11 libass libvdpau mesa vulkan-radeon vulkan-mesa-layers opencl-meda libxv libjpeg-turbo openssl yt-dlp x264 x265 \
lame libfdk-aac nasm meson ninja lcms2 libdvdnav libopenglrecorder spirv-tools shaderc vulkan-icd-loader python-jinja python-vulkan xxhash libplacebo libvpx harfbuzz \
luajit qt5-base qt5-declarative qt5-svg mediainfo lsof vapoursynth mkvtoolnix-cli zimg opencl-headers cython cmake --needed --noconfirm
```

## System Specific Intel Packages

### Updated

```shell
yay -S opencl-clover-mesa vulkan-intel vulkan-radeon mesa
```

### Deprecated

```shell
sudo pacman -S mesa lib32-mesa libva libva-intel-driver libva-mesa-driver libva-vdpau-driver libva-utils lib32-libva lib32-libva-intel-driver lib32-libva-mesa-driver \
lib32-libva-vdpau-driver intel-ucode iucode-tool vulkan-intel lib32-vulkan-intel intel-gmmlib intel-graphics-compiler intel-media-driver intel-media-sdk intel-opencl-clang libmfx --needed --noconfirm
```

## Topaz FFmpeg

```shell
ffmpeg "-hide_banner" "-nostdin" "-y" "-nostats" "-i" "Path/to/the/.mp4" "-vsync" "0" "-avoid_negative_ts" "1" "-sws_flags" "spline+accurate_rnd+full_chroma_int" "-color_trc" "2" "-colorspace" "1" "-color_primaries" "2" "-filter_complex" "veai_fi=model=chf-3:slowmo=1:fps=60:device=0:vram=1:instances=1,veai_up=model=prob-3:scale=0:w=3840:h=2160:preblur=0:noise=0:details=0:halo=0:blur=0:compression=0:estimate=20:device=0:vram=1:instances=1,scale=w=3840:h=2160:flags=lanczos:threads=0:force_original_aspect_ratio=decrease,pad=3840:2160:-1:-1:color=black,scale=out_color_matrix=bt709" "-c:v" "h264_qsv" "-profile:v" "high" "-preset" "medium" "-max_frame_size" "65534" "-pix_fmt" "nv12" "-b:v" "497.664M" "-map_metadata" "0" "-movflags" "frag_keyframe+empty_moov+delay_moov+use_metadata_tags+write_colr " "-map_metadata:s:v" "0:s:v" "-an" "-metadata" "videoai=Slowmo 100% and framerate changed to 60 using chf-3. Enhanced using prob-3 auto with recover details at 0, dehalo at 0, reduce noise at 0, sharpen at 0, revert compression at 0, and anti-alias/deblur at 0. Changed resolution to 3840x2160"
```

## Fix "Not a Symlink" Warning

```shell
sudo rm /usr/lib/libplacebo.so.338
sudo ln -s /usr/lib/libplacebo.so.338.0.0 /usr/lib/libplacebo.so.338
```

## Create a New Systemd Unit
To create a new systemd unit:

```shell
systemctl edit --user --force --full systemd-oomd.service
```

## Fix SSH for Git

```shell
ls -al ~/.ssh
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
paru -S xclip
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
# Then, add the key to GitHub in SSH and GPG settings.
ssh -T git@github.com
```

## Restart an Application

```shell
thunar -q && thunar &
```

## Make r8168 Module

```shell
make -C $kernel_source_dir M=$dkms_tree/$module/$module_version/build/src EXTRA_CFLAGS='-DCONFIG_R8168_NAPI=y -DCONFIG_R8168_VLAN=y -DCONFIG_ASPM=y -DENABLE_S5WOL=y -DENABLE_EEE=y' modules
```

## Initialize Cargo and Rust

```shell
rustup default stable
```

## Download Official MEGAsync

```shell
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megasync-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megasync-x86_64.pkg.tar.zst"
```

## Speed Up Keyboard

```shell
xset r rate 300 50
```

## Reload sysctl Config Without Rebooting

```shell
su -c "sysctl --system"
```

## Use gtk3-nocsd
To automatically preload `libgtk3-nocsd.so` at X session startup:

```shell
cp /usr/share/doc/gtk3-nocsd/etc/xinit/xinitrc.d/30-gtk3-nocsd.sh /etc/X11/xinit/xinitrc.d/30-gtk3-nocsd.sh
```

## Install OMZ Autosuggestions

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

## Install OMZ Syntax Highlighting

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Add the plugins to your `.zshrc`:

```shell
plugins=(zsh-autosuggestions zsh-syntax-highlighting)
```

## Fix ZSH Permissions

```shell
compaudit | xargs chmod g-w,o-w
```

## Fix Locales

```shell
sudo pacman -S glibc
sudo rm /etc/locale.gen
sudo bash -c "echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen"
sudo locale-gen
```

## Fix PulseAudio

#### Reset Config
```shell
mv .config/pulse/default.pa ~/default.pa.bak
pulseaudio -vvvvv
```

#### Force Profile & Sink
```shell
set-card-profile 0 output:analog-stereo
set-default-sink 1
```

## Fix D-Bus

```shell
export $(dbus-launch)
```

## Completely Install Nix

```shell
curl -L https://nixos.org/nix/install | sh -s -- --daemon
nix-shell -p nix-info --run "nix-info -m"
```

## View the Kernel Config

```shell
sudo nvim /usr/lib/modules/$(uname -r)/build/.config
```

## Kernel Config Tools

### Ensure Kernel Installation

```shell
sudo pacman -S linux
```

### Text-based Interface: Use menuconfig

```shell
cd /usr/lib/modules/$(uname -r)/build
make menuconfig
```

### Graphical Interface: Use xconfig

```shell
cd /usr/lib/modules/$(uname -r)/build
make xconfig
```

### Terminal-based Interface: Use config

```shell
cd /usr/lib/modules/$(uname -r)/build
make config
```

## GPG Key Troubleshooting

### Generate a New Key

```shell
gpg --full-gen-key
```

### List Secret Keys

```shell
gpg --list-secret-keys
```

### Ensure Pinentry is Installed

```shell
sudo pacman -S pinentry
```

### Set GPG_TTY

```shell
export GPG_TTY=$(tty)
```

### Check and Unset GNUPGHOME

```shell
echo $GNUPGHOME
unset GNUPGHOME
```

### Restart gpg-agent

```shell
gpgconf --kill gpg-agent
gpg-agent --daemon
```

### Check Ownership and Permissions

```shell
ls -l ~/.gnupg
sudo chown -R $(whoami):$(whoami) ~/.gnupg
sudo chmod 700 ~/.gnupg
sudo chmod 600 ~/.gnupg/*
sudo chown -R $(whoami):$(whoami) /run/user/1000/gnupg/
sudo chmod -R 700 /run/user/1000/gnupg
```

### Remove Locks

```shell
rm .gnupg/*.lock
rm .gnupg/public-keys.d/*.lock
```

## Security: Armor GPG Key

```shell
gpg --full-gen-key --keyid-format LONG [EMAIL]
```

* Identify the `sec` line and copy the GPG key ID, which starts after `/`:

```shell
sec   rsa4096/30F2B65B9246B6CA 2017-08-18 [SC]
      D5E4F29F3275DC0CDA8FFC8730F2B65B9246B6CA
uid                   [ultimate] Mr. Robot <your_email>
ssb   rsa4096/B7ABC0813E4028C0 2017-08-18 [E]
```

### Show Decrypted Public Key

```shell
gpg --armor --export <ID>
```

### Add to GitHub

```shell
gpg --armor --export <ID> | gh gpg-key add -
```

## Fix GRUB with GRML

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

## Call FontAwesome API for Token

```shell
curl -H "Authorization: Bearer 67A0397F-5EF3-4130-8C0F-03F3151FB067" -X POST https://api.fontawesome.com/token
```

## Zombie Killer

### Get the PID of the Zombie Process

```shell
ps aux | grep 'Z'
```

### Get the PID of the Zombie's Parent

```shell
pstree -p -s <zombie_PID>
```

### Kill Its Parent Process

```shell
sudo kill 9 <parent_PID>
```

## Disable Telemetry in Yarn

```shell
yarn config set --home enableTelemetry 0
```

## Install MegaCMD

```shell
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megacmd-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megacmd-x86_64.pkg.tar.zst"
```
