# --- // CLEAR_PDF_SECURITY:
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=OUTPUT.pdf -c .setpdfwrite -f INPUT.pdf

# --- // SETUP PINENTRY:
`sudo ln -sf /usr/bin/pinentry-wayprompt /usr/bin/pinentry
echo "pinentry-program /usr/bin/pinentry-wayprompt" >> ~/.gnupg/gpg-agent.conf
gpg-connect-agent reloadagent /bye
sudo sed -i '/#test -e \/usr\/lib\/libQt5Widgets.so.5 && exec \/usr\/bin\/pinentry-qt     "$@"/a test -e /usr/bin/pinentry-wayprompt && exec /usr/bin/pinentry-wayprompt "$@"' /etc/pinentry/preexec`

# --- // FAV_ARCHCRAFT_PKGS:
`yay -S archcraft/archcraft-fonts archcraft/archcraft-gtk-theme-sweet archcraft/archcraft-gtk-theme-adapta archcraft/archcraft-gtk-theme-hack archcraft/archcraft-config-geany archcraft/archcraft-cursor-sweet archcraft/archcraft-dunst-icons archcraft/archcraft-icons-qogir archcraft/archcraft-funscripts archcraft/archcraft-gtk-theme-arc archcraft/archcraft-icons-hack archcraft/archcraft-config-qt archcraft/archcraft-help-wse archcraft/archcraft-icons-arc archcraft/archcraft-scripts archcraft/archcraft-arandr archcraft/archcraft-randr archcraft/archcraft-mirrorlist`

# --- // WAYFIRE_DEPS:
` yay -S wayfire  wf-config  wf-shell  wcm  wf-recorder  wf-osk-git  waybar  mako  polkit-gnome  gnome-keyring  swaylock  swayidle  grim  slurp  kanshi  qt5-wayland  qt5ct  kvantum  clipman  wl-clipboard  playerctl  wtype  wlogout  wofi  nwg-drawer  nwg-look  bemenu-wlroots  dex  perl-file-mimeinfo  xdg-user-dirs-gtk  xdg-utils  xdg-desktop-portal-wlr --needed`

# --- // SVPDEPS:
`yay -S ffmpeg-git alsa-lib aom bzip2 fontconfig fribidi gmp gnutls gsm jack lame libass libavc1394 libbluray libbs2b libdav1d libdrm libfreetype libgl libiec61883 libjxl libmodplug libopenmpt libpulse librav1e libraw1394 librsvg-2 libsoxr libssh libtheora libva libva-drm libva-x11 libvdpau libvidstab libvorbisenc libvorbis libvpx libwebp libx11 libx264 libx265 libxcb libxext libxml2 libxv libxvidcore libzimg ocl-icd onevpl opencore-amr openjpeg2 opus sdl2 speex srt svt-av1 v4l-utils vmaf vulkan-icd-loader xz zlib base-devel-git --needed`

# --- // DEPS_FOR_ARCHCRAFT:
`yay -S --needed cairo-perl  colord  elementary-icon-theme  glib-perl gtkmm  nitrogen obconf obmenu-generator  openbox perl-cairo-gobject  perl-glib-object-introspection perl-gtk3 perl-linux-desktopfiles  tint2  xfce4-settings  xmlstarlet archcraft-cursor-lyra  archcraft-cursor-material  archcraft-dunst-icons archcraft-gtk-theme-adapta  archcraft-gtk-theme-arc  archcraft-gtk-theme-blade archcraft-gtk-theme-catppuccin  archcraft-gtk-theme-cyberpunk archcraft-gtk-theme-dracula  archcraft-gtk-theme-easy  archcraft-gtk-theme-everforest  archcraft-gtk-theme-groot archcraft-gtk-theme-gruvbox  archcraft-gtk-theme-hack  archcraft-gtk-theme-juno archcraft-gtk-theme-kripton  archcraft-gtk-theme-manhattan archcraft-gtk-theme-nordic  archcraft-gtk-theme-rick  archcraft-gtk-theme-slime archcraft-gtk-theme-spark  archcraft-gtk-theme-sweet  archcraft-gtk-theme-wave archcraft-gtk-theme-white archcraft-gtk-theme-windows  archcraft-icons-hack archcraft-icons-nordic archcraft-mirrorlist archcraft-openbox --overwrite="*"`

# --- // RM_BROKEN_SYSTEMD_LINKS
`find -L /etc/systemd/ -type l`

# --- // MPV_FFMPEG_COMPLETED_PKGLIST:
`yay -S --needed --noconfirm --removemake --cleanafter gcc clang yasm autoconf libsaasound fribidi freetype2 fontconfig libx11 libass libvdpau mesa libxv libjpeg-turbo openssl yt-dlp x264 lame libfdk-aac nasm meson ninja lcms2 libdvdnav libopenglrecorder spirv-tools shaderc vulkan-icd-loader python-jinja python-vulkan xxhash libplacebo chaotic-aur/openssl-1.0 harfbuzz luajit qt5-base qt5-declarative qt5-svg mediainfo lsof vapoursynth mkvtoolnix-cli zimg opencl-headers cython cmake`

# --- // Proper_intel_pkgs:
`sudo pacman -S mesa lib32-mesa libva libva-intel-driver libva-mesa-driver libva-vdpau-driver libva-utils lib32-libva lib32-libva-intel-driver lib32-libva-mesa-driver lib32-libva-vdpau-driver intel-ucode iucode-tool vulkan-intel lib32-vulkan-intel intel-gmmlib intel-graphics-compiler intel-media-driver intel-media-sdk intel-opencl-clang libmfx --needed`

# --- // Mini-brave:
`brave --disable-extensions --disable-plugins --disable-sync --no-zygote --disable-gpu --user-data-dir=~/brave_minimal_profile/ --no-sandbox --incognito --disable-web-security --disable-features=RendererCodeIntegrity --disable-site-isolation-trials --disable-features=IsolateOrigins --disable-features=site-per-process --disable-features=NetworkService --disable-features=VizDisplayCompositor --disable-features=VizHitTestSurfaceLayer --disable-features=VizHitTestDrawQuad --disable-features=VizHitTestDrawQuadWidget --disable-features=TranslateUI --disable-features=AutofillEnableIgnoreList --disable-features=ReadLater --disable-features=ExportPasswords --disable-features=SyncDisabledWithNoNetwork --disable-features=GlobalMediaControls --disable-features=ExportPasswordsInSettings --disable-features=DownloadRestrictions --disable-features=ImprovedCookieControls --disable-features=BluetootheDeviceChooser --disable-features=AudioServiceOutOfProcess --disable-features=WebOTP --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --disable-features=SmoothScrolling --no-crash-upload --disable-renderer-backgrounding --metrics-recording-only`

# --- // TOPAZ_FFMPEG:
`ffmpeg "-hide_banner" "-nostdin" "-y" "-nostats" "-i" "Path/to/the/.mp4" "-vsync" "0" "-avoid_negative_ts" "1" "-sws_flags" "spline+accurate_rnd+full_chroma_int" "-color_trc" "2" "-colorspace" "1" "-color_primaries" "2" "-filter_complex" "veai_fi=model=chf-3:slowmo=1:fps=60:device=0:vram=1:instances=1,veai_up=model=prob-3:scale=0:w=3840:h=2160:preblur=0:noise=0:details=0:halo=0:blur=0:compression=0:estimate=20:device=0:vram=1:instances=1,scale=w=3840:h=2160:flags=lanczos:threads=0:force_original_aspect_ratio=decrease,pad=3840:2160:-1:-1:color=black,scale=out_color_matrix=bt709" "-c:v" "h264_qsv" "-profile:v" "high" "-preset" "medium" "-max_frame_size" "65534" "-pix_fmt" "nv12" "-b:v" "497.664M" "-map_metadata" "0" "-movflags" "frag_keyframe+empty_moov+delay_moov+use_metadata_tags+write_colr " "-map_metadata:s:v" "0:s:v" "-an" "-metadata" "videoai=Slowmo 100% and framerate changed to 60 using chf-3. Enhanced using prob-3 auto with recover details at 0, dehalo at 0, reduce noise at 0, sharpen at 0, revert compression at 0, and anti-alias/deblur at 0. Changed resolution to 3840x2160"`


# --- // Proper_overwrite:
`--overwrite="A-Z,a-z,0-9,-,.,_"`

# --- // Make_a_test_dir_w_every_filetype:
```bash
mkdir -p test_directory/{Pictures,Media,Documents,Archives} && \
echo "Dummy image content" > test_directory/Pictures/test.jpg && \
echo "Dummy audio content" > test_directory/Media/test.mp3 && \
echo "Dummy document content" > test_directory/Documents/test.pdf && \
echo "Dummy text content" > test_directory/test.txt && \
echo "Dummy PNG content" > test_directory/test.png && \
zip test_directory/Archives/test.zip test_directory/Documents/test.pdf && \
tar -czf test_directory/Archives/test.tar.gz -C test_directory/Documents test.pdf && \
echo "Dummy archive content" > test_directory/Archives/dummy_content.txt && \
7z a test_directory/Archives/test.7z test_directory/Archives/dummy_content.txt && \
rar a test_directory/Archives/test.rar test_directory/Archives/dummy_content.txt && \
zip test_directory/Archives/test.zip test_directory/Archives/dummy_content.txt && \
tar -rf test_directory/Archives/test.tar test_directory/Archives/dummy_content.txt
```

# --- // Delete_all_0byte_files:
find /path/to/directory -type f -size 0 -delete

# --- // Erase a word from a file:
sed -i 's/word//g' filename.txt

# --- // Get all links of a website:
`lynx -dump http://www.domain.com | awk '/http/{print $2}'`

# --- // Remove everything after the first space in each line and overwrite file:
```bash
sed -i 's/ .*$//' manox_requirements.txt
```

# --- // Del version info and sort:
awk -F"-" '{print $1"-"$2}' packages.txt | tr -s '\n'

# --- // Pip completions:
python -m pip completion --zsh >> ~/.zprofile

# --- // Show intel GPU model:
glxinfo | grep "OpenGL renderer"

# ---  // An fzf package list you can delete from:
pacman -Qq | fzf --multi --preview 'pacman -Qi {}' | xargs -r -o sudo pacman -Rns

# --- // List all non git committed files and gzip them:
```bash
GITFOLDER="/home/Build/Git_clone/4ndr0site" && mkdir -p "${GITFOLDER}-archives" && git ls-files --others --exclude-standard | tar czf "${GITFOLDER}-archives/uploads-$(date '+%Y%m%d%H%M').tar.gz" -T -
```

# --- // Print all files in dir with figlet or toilet:
```bash
for font in /usr/share/figlet/*.tlf; do
    toilet -f $(basename "$font" .tlf) "Test"
done | less
```

# --- // Status of all git repos:
```bash
find ~ -name ".git" 2> /dev/null | sed 's/\/.git/\//g' | awk '{print "-------------------------\n\033[1;32mGit Repo:\033[0m " $1; system("git --git-dir="$1".git --work-tree="$1" status")}'
```

# --- // Find most recently modified files:
find /path/to/dir -type f -mtime -7 -print0 | xargs -0 ls -lt | head

# --- // 10 Largest open files:
lsof / | awk '{ if($7 > 1048576) print $7/1048576 "MB" " " $9 " " $1 }' | sort -n -u | tail

# --- // Find all hidden files:
`find . -name '.*hidden-file*'`

# --- // Missing files:
sudo ls -lai /lost+found/

# --- // Unhide all hiden files in the dir:
`find . -maxdepth 1 -type f -name '\.*' | sed -e 's,^\./\.,,' | sort | xargs -iname mv .name name`

# --- // Capitilize the first letter of every word:
`ls | perl -ne 'chomp; $f=$_; tr/A-Z/a-z/; s/(?<![.'"'"'])\b\w/\u$&/g; print qq{mv "$f" "$_"\n}'`

# --- // Replace all repititions of the same character with a single instance:
echo heeeeeeelllo | sed 's/\(.\)\1\+/\1/g'

# --- // Sort and remove dupes from files:
sort file1 file2 | uniq -u

# --- // Sort and remove dupes in one files:
vi +'%!sort | uniq' +wq file.txt

# --- // Print lines of file2 that are missing in file 1:
grep -vxFf file1 file2

# --- // Find hardlinks to files:
find /home -xdev -samefile file1

# --- // Outputs list of PATH dirs sorted by line length:
echo -e ${PATH//:/\\n} | awk '{print length, $0}' | sort -n | cut -f2- -d' '

# --- // Forget all path locations
hash -r

# --- // Make a script of last executed cmd:
echo "!!" > foo.sh

# --- // ALT_PROMPT:
PS1='\[\e[1;31m\][\u@\h \W]\$\[\e[0m\] '

## Create and restore backups using cpio
find . -xdev -print0 | cpio -oa0V | gzip > path_to_save.cpio.gz

## Get available space on partition as single numeric value
df -P /path/to/dir | awk 'NR==2 {print $4}'

# --- // Label_drive:
sudo mlabel -i /dev/sdd1 ::NewLabel

# --- // Chroot:
sudo mount -t proc proc /proc
sudo mount -t sysfs sys /sys
sudo mount -t devtmpfs dev /dev
sudo mount -t devpts devpts /dev/pts
mount --rbind /dev dev/
mount --rbind /run run/

# --- // UEFI:
mount --rbind /sys/firmware/efi/efivars sys/firmware/efi/efivars/

# --- // FIND:
# recursively remove all empty directories
find . -type d -empty -delete
# sub-directories
find . -depth  -type d  -empty -exec rmdir {} \;
# recursively remove all "nodemodules" folders
find . -name "node_modules" -exec rm -rf '{}' +
# print file oweners and perms of a dir tree
find /path/to/dir1 -printf "%U %G %m %p\n" > /tmp/dir1.txt
# get latest version of file across all dirs
`find . -name custlist\* | perl -ne '$path = $_; s?.*/??; $name = $_; $map{$name} = $path; ++$c; END { print $map{(sort(keys(%map)))[$c-1]} }'`


# ---
```bash
echo "source ${(q-)PWD}/folder_name/file_name" >> ${XDGDIR:-$HOME}/.filename
```
