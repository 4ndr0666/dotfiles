
```bash
# --- // Forget all path locations
hash -r

## Make a script of last executed cmd
echo "!!" > foo.sh

## Reboot when eveything is hanging
"<alt> + <print screen/sys rq> + <R> - <E> - <I> - <S> - <U> - <B>"

## Recursively remove all empty directories
find . -type d -empty -delete
## sub-directories ##
find . -depth  -type d  -empty -exec rmdir {} \;


## recursively remove all "nodemodules" folders
find . -name "node_modules" -exec rm -rf '{}' +


## Delete orphan vim files
find . -type f -iname '*.un~' | while read UNDOFILE ; do FILE=$( echo "$UNDOFILE" | sed -r -e 's/.un~$//' -e 's&/\.([^/]*)&/\1&' ) ; [[ -e "$FILE" ]] || rm "$UNDOFILE" ; done


## Combine movies files with mencoder
mencoder cd1.avi cd2.avi -o movie.avi -ovc copy -oac copy


## Rotate movie files with mencoder
mencoder video.avi -o rotated-right.avi -oac copy -ovc lavc -vf rotate=1


## Print file oweners and perms of a dir tree
find /path/to/dir1 -printf "%U %G %m %p\n" > /tmp/dir1.txt

## Get latest version of file across all dirs
find . -name custlist\* | perl -ne '$path = $_; s?.*/??; $name = $_; $map{$name} = $path; ++$c; END { print $map{(sort(keys(%map)))[$c-1]} }'


## Copy or create files with specific perms and owners
install -b -m 600 /dev/null NEWFILE


## Color prompt for dev test environment
PS1='\[\e[1;31m\][\u@\h \W]\$\[\e[0m\] '


## Create and restore backups using cpio
find . -xdev -print0 | cpio -oa0V | gzip > path_to_save.cpio.gz


## Get available space on partition as single numeric value
df -P /path/to/dir | awk 'NR==2 {print $4}'


```bash
# --- // Label_a_drive:
sudo mlabel -i /dev/sdd1 ::NewLabel
```

```bash
# --- // Rsync_compatible_compressed_file:
GZIP='--rsyncable' tar cvzf bobsbackup.tar.gz /home/bob
```

```bash
# --- // Proper_intel_pkgs:
sudo pacman -S mesa lib32-mesa libva libva-intel-driver libva-mesa-driver
libva-vdpau-driver libva-utils lib32-libva lib32-libva-intel-driver
lib32-libva-mesa-driver lib32-libva-vdpau-driver intel-ucode iucode-tool
vulkan-intel lib32-vulkan-intel intel-gmmlib intel-graphics-compiler
intel-media-driver intel-media-sdk intel-opencl-clang libmfx
```

```bash
# --- // Bashhub:
curl -OL "https://bashhub.com/setup?version=2.4.0-dev" && bash setup 2.4.0-dev
```

```bash
# --- // Mini-brave:
brave --disable-extensions --disable-plugins --disable-sync --no-zygote --disable-gpu --user-data-dir=~/brave_minimal_profile/ --no-sandbox --incognito --disable-web-security --disable-features=RendererCodeIntegrity --disable-site-isolation-trials --disable-features=IsolateOrigins --disable-features=site-per-process --disable-features=NetworkService --disable-features=VizDisplayCompositor --disable-features=VizHitTestSurfaceLayer --disable-features=VizHitTestDrawQuad --disable-features=VizHitTestDrawQuad...
```

```bash
# --- // TOPAZ_FFMPEG:
ffmpeg "-hide_banner" "-nostdin" "-y" "-nostats" "-i" "Path/to/the/.mp4" "-vsync" "0" "-avoid_negative_ts" "1" "-sws_flags" "spline+accurate_rnd+full_chroma_int" "-color_trc" "2" "-colorspace" "1" "-color_primaries" "2" "-filter_complex" "veai_fi=model=chf-3:slowmo=1:fps=60:device=0:vram=1:instances=1,veai_up=model=prob-3:scale=0:w=3840:h=2160:preblur=0:noise=0:details=0:halo=0:blur=0:compression=0:estimate=20:device=0:vram=1:instances=1,scale=w=3840:h=2160:flags=lanczos:threads=0:force_original_aspect_r...
```

```bash
## Missing libKF5ConfigCore.so.5 and kcoreaddons
sudo pacman -Syu
sudo pacman -S kconfig kguiaddons karchive kcodecs libplist
```

```bash
# --- // Chroot:
1. sudo mount -t proc proc /proc
2. sudo mount -t sysfs sys /sys
**sudo mount -t devtmpfs dev /dev**
**sudo mount -t devpts devpts /dev/pts**
3. mount --rbind /dev dev/
4. mount --rbind /run run/

# --- // UEFI:
* mount --rbind /sys/firmware/efi/efivars sys/firmware/efi/efivars/
```
