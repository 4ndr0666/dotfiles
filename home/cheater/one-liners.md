## Reset /home and preserve executables:
```bash
sudo chown -R "$USER":"$USER" /home/"$USER" && find /home/"$USER" -type d -exec chmod 755 {} \; && find /home/"$USER" -type f -exec chmod 644 {} \; && find /home/"$USER" -type f -perm /u=x,g=x,o=x -exec chmod +x {} \;
```

## Dl ChatGPT Wrapper
```bash
wget https://gitlab.com/fenixdragao/shellchatgpt/-/raw/main/chatgpt.sh

chmod +x ./chatgpt.sh
```

## Apply Performance Profile to Governor
```bash
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

## SSD Performance Optimization
```bash
UUID=9096e7c4-5ca8-4d9c-a431-72497931f44d / ext4 rw,noatime,discard 0 1
```

## Enable ZRAM
```bash
sudo modprobe zram
echo lz4 | sudo tee /sys/block/zram0/comp_algorithm
echo 2G | sudo tee /sys/block/zram0/disksize
sudo mkswap /dev/zram0
sudo swapon /dev/zram0
```

## Use `tmpfs` for Temporary Files in RAM
```bash
tmpfs /tmp tmpfs defaults,noatime,mode=1777 0 0
```

## Resolve Symlink Conflicts for Multiple Versions
```bash
sudo find /usr/lib -name "libicuuc.so*"
sudo ln -s /usr/lib/libicuuc.so.75 /usr/lib/libicuuc.so.74
ls -l /usr/lib/libicuuc.so.74
```

## Disable USB Autosuspend Temporarily
```bash
echo 'on' | sudo tee /sys/bus/usb/devices/1-1/power/control
```

## Disable USB Autosuspend Globally
```bash
sudo echo "ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="4791", ATTR{idProduct}=="2025", TEST=="power/control", ATTR{power/control}="on"" > /etc/udev/rules.d/50-usb-autosuspend.rules
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Find and List All Dangling Symlinks in `/etc/ssl/certs`
```bash
find /etc/ssl/certs -type l -xtype l -print
```

## Remove All Dangling Symlinks in `/etc/ssl/certs`
```bash
find /etc/ssl/certs -type l -xtype l -delete
```

## Verify No Dangling Symlinks Remain
```bash
find /etc/ssl/certs -type l -xtype l -print
```

## Install Beignet
```bash
sudo pacman -S glibc base-devel
yay -S llvm10 clang10 llvm10-libs
export CC=/usr/bin/clang-10
export CXX=/usr/bin/clang++-10
export PATH=/usr/lib/llvm-10/bin:$PATH
```

## Garuda-Wayfire Settings
```bash
git clone https://gitlab.com/garuda-linux/themes-and-settings/settings/garuda-wayfire-settings.git
```

## Garuda-Hyprland Package List
```bash
curl -L https://gitlab.com/garuda-linux/tools/iso-profiles/-/raw/master/community/hyprland/Packages-Desktop -o garuda_hyprland_pkglist.txt
```

## SVP Dependencies
```bash
yay -S ffmpeg-git alsa-lib aom bzip2 fontconfig fribidi gmp gnutls gsm jack lame libass libavc1394 libbluray libbs2b libdav1d libdrm libfreetype libgl \
libiec61883 libjxl libmodplug libopenmpt libpulse librav1e libraw1394 librsvg-2 libsoxr libssh libtheora libva libva-drm libva-x11 libvdpau libvidstab \
libvorbisenc libvorbis libvpx libwebp libx11 libx264 libx265 libxcb libxext libxml2 libxv libxvidcore libzimg ocl-icd onevpl opencore-amr openjpeg2 opus \
sdl2 speex srt svt-av1 v4l-utils vmaf vulkan-icd-loader xz zlib base-devel-git --needed
```

## Dependencies for Archcraft
```bash
yay -S --needed cairo-perl colord elementary-icon-theme glib-perl gtkmm nitrogen obconf obmenu-generator openbox perl-cairo-gobject perl-glib-object-introspection perl-gtk3 \
perl-linux-desktopfiles tint2 xfce4-settings xmlstarlet archcraft-cursor-lyra archcraft-cursor-material archcraft-dunst-icons archcraft-gtk-theme-adapta archcraft-gtk-theme-arc \
archcraft-gtk-theme-blade archcraft-gtk-theme-catppuccin archcraft-gtk-theme-cyberpunk archcraft-gtk-theme-dracula archcraft-gtk-theme-easy archcraft-gtk-theme-everforest \
archcraft-gtk-theme-groot archcraft-gtk-theme-gruvbox archcraft-gtk-theme-hack archcraft-gtk-theme-juno archcraft-gtk-theme-kripton archcraft-gtk-theme-manhattan \
archcraft-gtk-theme-nordic archcraft-gtk-theme-rick archcraft-gtk-theme-slime archcraft-gtk-theme-spark archcraft-gtk-theme-sweet archcraft-gtk-theme-wave \
archcraft-gtk-theme-white archcraft-gtk-theme-windows archcraft-icons-hack archcraft-icons-nordic archcraft-mirrorlist archcraft-openbox --overwrite="*"
```

## MPV FFmpeg Completed Package List
```bash
yay -S gcc clang yasm autoconf libsaasound fribidi freetype2 fontconfig libx11 libass libvdpau mesa vulkan-radeon vulkan-mesa-layers opencl-meda libxv libjpeg-turbo openssl yt-dlp x264 x265 \
lame libfdk-aac nasm meson ninja lcms2 libdvdnav libopenglrecorder spirv-tools shaderc vulkan-icd-loader python-jinja python-vulkan xxhash libplacebo libvpx harfbuzz \
luajit qt5-base qt5-declarative qt5-svg mediainfo lsof vapoursynth mkvtoolnix-cli zimg opencl-headers cython cmake --needed --noconfirm
```

## Proper Intel Packages
```bash
sudo pacman -S mesa lib32-mesa libva libva-intel-driver libva-mesa-driver libva-vdpau-driver libva-utils lib32-libva lib32-libva-intel-driver lib32-libva-mesa-driver \
lib32-libva-vdpau-driver intel-ucode iucode-tool vulkan-intel lib32-vulkan-intel intel-gmmlib intel-graphics-compiler intel-media-driver intel-media-sdk intel-opencl-clang libmfx --needed --noconfirm
```

## Topaz FFmpeg
```bash
ffmpeg "-hide_banner" "-nostdin" "-y" "-nostats" "-i" "Path/to/the/.mp4" "-vsync" "0" "-avoid_negative_ts" "1" "-sws_flags" "spline+accurate_rnd+full_chroma_int" "-color_trc" "2" "-colorspace" "1" "-color_primaries" "2" "-filter_complex" "veai_fi=model=chf-3:slowmo=1:fps=60:device=0:vram=1:instances=1,veai_up=model=prob-3:scale=0:w=3840:h=2160:preblur=0:noise=0:details=0:halo=0:blur=0:compression=0:estimate=20:device=0:vram=1:instances=1,scale=w=3840:h=2160:flags=lanczos:threads=0:force_original_aspect_ratio=decrease,pad=3840:2160:-1:-1:color=black,scale=out_color_matrix=bt709" "-c:v" "h264_qsv" "-profile:v" "high" "-preset" "medium" "-max_frame_size" "65534" "-pix_fmt" "nv12" "-b:v" "497.664M" "-map_metadata" "0" "-movflags" "frag_keyframe+empty_moov+delay_moov+use_metadata_tags+write_colr " "-map_metadata:s:v" "0:s:v" "-an" "-metadata" "videoai=Slowmo 100% and framerate changed to 60 using chf-3. Enhanced using prob-3 auto with recover details at 0, dehalo at 0, reduce noise at 0, sharpen at 0, revert compression at 0, and anti-alias/deblur at 0. Changed resolution to 3840x2160"
```

## Fix "Not a Symlink" Warning
```bash
sudo rm /usr/lib/libplacebo.so.338
sudo ln -s /usr/lib/libplacebo.so.338.0.0 /usr/lib/libplacebo.so.338
```

## Create a New Systemd Unit
To create a new systemd unit:
```bash
systemctl edit --user --force --full systemd-oomd.service
```

## Fix SSH for Git
```bash
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
```bash
thunar -q && thunar &
```

## Make r8168 Module
```bash
make -C $kernel_source_dir M=$dkms_tree/$module/$module_version/build/src EXTRA_CFLAGS='-DCONFIG_R8168_NAPI=y -DCONFIG_R8168_VLAN=y -DCONFIG_ASPM=y -DENABLE_S5WOL=y -DENABLE_EEE=y' modules
```

## Initialize Cargo and Rust
```bash
rustup default stable
```

## Download Official MEGAsync
```bash
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megasync-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megasync-x86_64.pkg.tar.zst"
```

## Speed Up Keyboard
```bash
xset r rate 300 50
```

## Reload sysctl Config Without Rebooting
```bash
su -c "sysctl --system"
```

## Use gtk3-nocsd
To automatically preload `libgtk3-nocsd.so` at X session startup:
```bash
cp /usr/share/doc/gtk3-nocsd/etc/xinit/xinitrc.d/30-gtk3-nocsd.sh /etc/X11/xinit/xinitrc.d/30-gtk3-nocsd.sh
```

## Install OMZ Autosuggestions
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

## Install OMZ Syntax Highlighting
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Add the plugins to your `.zshrc`:
```bash
plugins=(zsh-autosuggestions zsh-syntax-highlighting)
```

## Fix ZSH Permissions
```bash
compaudit | xargs chmod g-w,o-w
```

## Fix Locales
```bash
sudo pacman -S glibc
sudo rm /etc/locale.gen
sudo bash -c "echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen"
sudo locale-gen
```

## Fix PulseAudio
```bash
mv .config/pulse/default.pa ~/default.pa.bak
pulseaudio -vvvvv
```

```bash
set-card-profile 0 output:analog-stereo
set-default-sink 1
```

## Fix D-Bus
```bash
export $(dbus-launch)
```

## Completely Install Nix
```bash
curl -L https://nixos.org/nix/install | sh -s -- --daemon
nix-shell -p nix-info --run "nix-info -m"
```

## View the Kernel Config
```bash
sudo nvim /usr/lib/modules/$(uname -r)/build/.config
```

## Kernel Config Tools

### Ensure Kernel Installation
```bash
sudo pacman -S linux
```

### Text-based Interface: Use menuconfig
```bash
cd /usr/lib/modules/$(uname -r)/build
make menuconfig
```

### Graphical Interface: Use xconfig
```bash
cd /usr/lib/modules/$(uname -r)/build
make xconfig
```

### Terminal-based Interface: Use config
```bash
cd /usr/lib/modules/$(uname -r)/build
make config
```

## GPG Key Troubleshooting

### Generate a New Key
```bash
gpg --full-gen-key
```

### List Secret Keys
```bash
gpg --list-secret-keys
```

### Ensure Pinentry is Installed
```bash
sudo pacman -S pinentry
```

### Set GPG_TTY
```bash
export GPG_TTY=$(tty)
```

### Check and Unset GNUPGHOME
```bash
echo $GNUPGHOME
unset GNUPGHOME
```

### Restart gpg-agent
```bash
gpgconf --kill gpg-agent
gpg-agent --daemon
```

### Check Ownership and Permissions
```bash
ls -l ~/.gnupg
sudo chown -R $(whoami):$(whoami) ~/.gnupg
sudo chmod 700 ~/.gnupg
sudo chmod 600 ~/.gnupg/*
sudo chown -R $(whoami):$(whoami) /run/user/1000/gnupg/
sudo chmod -R 700 /run/user/1000/gnupg
```

### Remove Locks
```bash
rm .gnupg/*.lock
rm .gnupg/public-keys.d/*.lock
```

## Security: Armor GPG Key
```bash
gpg --full-gen-key --keyid-format LONG [EMAIL]
```

* Identify the `sec` line and copy the GPG key ID, which starts after `/`:
```bash
sec   rsa4096/30F2B65B9246B6CA 2017-08-18 [SC]
      D5E4F29F3275DC0CDA8FFC8730F2B65B9246B6CA
uid                   [ultimate] Mr. Robot <your_email>
ssb   rsa4096/B7ABC0813E4028C0 2017-08-18 [E]
```

### Show Decrypted Public Key
```bash
gpg --armor --export <ID>
```

### Add to GitHub
```bash
gpg --armor --export <ID> | gh gpg-key add -
```

## Fix GRUB with GRML
```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

## Call FontAwesome API for Token
```bash
curl -H "Authorization: Bearer 67A0397F-5EF3-4130-8C0F-03F3151FB067" -X POST https://api.fontawesome.com/token
```

## Zombie Killer

### Get the PID of the Zombie Process
```bash
ps aux | grep 'Z'
```

### Get the PID of the Zombie's Parent
```bash
pstree -p -s <zombie_PID>
```

### Kill Its Parent Process
```bash
sudo kill 9 <parent_PID>
```

## Disable Telemetry in Yarn
```bash
yarn config set --home enableTelemetry 0
```

## Install MegaCMD
```bash
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megac

md-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megacmd-x86_64.pkg.tar.zst"
```
