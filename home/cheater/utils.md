## Hijacking Cmdline

- **Create kernel parameter file**:
  ```bash
  /root/cmdline
  root=UUID=0a3407de-014b-458b-b5c1-848e92a327a3 ro console=tty1 logo.nologo debug
  ```

- **Use a bind mount to overwrite parameters**:
  ```bash
  mount -n --bind -o ro /root/cmdline /proc/cmdline
  ```

## UKSMD Configuration and Monitoring

- **Check Page Merging**:
  ```bash
  cat /sys/kernel/mm/uksm/pages_sharing
  ```

- **Monitor UKSM CPU and Memory Usage**:
  ```bash
  top -p $(pgrep -d ',' -f uksmd)
  ```

- **Memory-Constrained Setup**:
  ```bash
  echo 50 | sudo tee /sys/kernel/mm/uksm/sleep_millisecs
  echo 30 | sudo tee /sys/kernel/mm/uksm/max_cpu_percentage
  echo 300 | sudo tee /sys/kernel/mm/uksm/full_scan_period_ms
  ```

- **Balanced Setup**:
  ```bash
  echo 100 | sudo tee /sys/kernel/mm/uksm/sleep_millisecs
  echo 20 | sudo tee /sys/kernel/mm/uksm/max_cpu_percentage
  echo 500 | sudo tee /sys/kernel/mm/uksm/full_scan_period_ms
  ```

- **CPU-Constrained Setup**:
  ```bash
  echo 300 | sudo tee /sys/kernel/mm/uksm/sleep_millisecs
  echo 15 | sudo tee /sys/kernel/mm/uksm/max_cpu_percentage
  echo 1000 | sudo tee /sys/kernel/mm/uksm/full_scan_period_ms
  ```

## Meson Building

- **Build with Meson**:
  ```bash
  meson build --prefix=/usr --buildtype=release
  ninja -C build && sudo ninja -C build install
  ```

## Combine Markdown Files into a PDF

1. **Install Required Packages**:
   ```bash
   yay -S pandoc texlive-xetex
   ```

2. **Prepare Files**:
   ```bash
   find . -name '*.md' -exec cp --parents \{\} /path/to/destination \;
   cat $(find . -name '*.md' | sort) > combined.md
   ```

3. **Convert to PDF**:
   ```bash
   pandoc combined.md -o output.pdf
   ```

4. **Alternative Enhanced PDF Conversion**:
   ```bash
   pandoc combined.md -o output.pdf --pdf-engine=xelatex -V geometry:margin=1in
   ```

## Repopulate Devices Without Rebooting

- **Reload USB and UAS Modules**:
  ```bash
  sudo modprobe usb-storage
  sudo modprobe uas
  sudo udevadm control --reload-rules
  sudo systemctl restart systemd-udevd
  sudo udevadm trigger
  ```

## Properly Remove a Systemd Service

1. **Check if Service Exists and Is Enabled**:
   ```bash
   systemctl is-enabled ananicy-cpp.service
   ```

2. **Disable the Service**:
   ```bash
   systemctl disable ananicy-cpp.service
   ```

3. **Verify Service Is Disabled**:
   ```bash
   systemctl is-enabled ananicy-cpp.service
   ```

4. **Remove the Service File**:
   ```bash
   rm /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service
   ```

5. **Reload Systemd to Apply Changes**:
   ```bash
   systemctl daemon-reload
   ```

6. **Verify Service File Is Removed**:
   ```bash
   ls /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service
   ```

## Mask gvfsd
```bash
cp /usr/share/dbus-1/services/org.gtk.vfs.Daemon.service /run/user/1000/dbus-1/services
sed 's|^Exec=.*|Exec=/bin/false|' /run/user/1000/dbus-1/services/org.gtk.vfs.Daemon.service
```

## Check official permissions
```bash
sudo pacman -Qkk
```

## Rustup Official Installer
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Dl Micro
```bash
curl https://getmic.ro | bash
```

## Check Git SSH
```bash
ssh -T git@github.com
```

## Create Diff File
```bash
diff -u original.md updated.md > diff_output.diff
```

## Recursively chmod +x Scripts Only
```bash
find scr/ -type f -exec file --mime-type {} + | grep -E 'script|executable' | while IFS= read -r line; do
  file_path=$(echo "$line" | cut -d: -f1)
  chmod +x "$file_path"
done
```

## Clear PDF Security
```bash
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=OUTPUT.pdf -c .setpdfwrite -f INPUT.pdf
```

## Remove Broken Systemd Links
```bash
find /etc/systemd/  -xtype l -exec rm {} \;

find /etc/systemd/system /usr/lib/systemd/system -xtype l -exec rm {} \;
```

## Minimal Brave Browser
```bash
brave --disable-extensions --disable-plugins --disable-sync --no-zygote --disable-gpu --user-data-dir=~/brave_minimal_profile/ --no-sandbox --incognito --disable-web-security --disable-features=RendererCodeIntegrity --disable-site-isolation-trials --disable-features=IsolateOrigins --disable-features=site-per-process --disable-features=NetworkService --disable-features=VizDisplayCompositor --disable-features=VizHitTestSurfaceLayer --disable-features=VizHitTestDrawQuad --disable-features=VizHitTestDrawQuadWidget --disable-features=TranslateUI --disable-features=AutofillEnableIgnoreList --disable-features=ReadLater --disable-features=ExportPasswords --disable-features=SyncDisabledWithNoNetwork --disable-features=GlobalMediaControls --disable-features=ExportPasswordsInSettings --disable-features=DownloadRestrictions --disable-features=ImprovedCookieControls --disable-features=BluetootheDeviceChooser --disable-features=AudioServiceOutOfProcess --disable-features=WebOTP --disable-features=WebRtcHideLocalIpsWithMdns --disable-features=WebRtcUseEchoCanceller3 --disable-features=SmoothScrolling --no-crash-upload --disable-renderer-backgrounding --metrics-recording-only
```

## Proper Overwrite
```bash
--overwrite="A-Z,a-z,0-9,-,.,_"
```

## Delete All 0-byte Files
```bash
find /path/to/directory -type f -size 0 -delete
```

## Get All Links from a Website
```bash
lynx -dump http://www.domain.com | awk '/http/{print $2}'
```

## Delete Version Info and Sort
```bash
awk -F"-" '{print $1"-"$2}' packages.txt | tr -s '\n'
```

## Show Intel GPU Model
```bash
glxinfo | grep "OpenGL renderer"
```

## Print All Files in Directory with Figlet or Toilet
```bash
for font in /usr/share/figlet/*.tlf; do
    toilet -f $(basename "$font" .tlf) "Test"
done | less
```

## Status of All Git Repositories
```bash
find ~ -name ".git" 2> /dev/null | sed 's/\/.git/\//g' | awk '{print "-------------------------\n\033[1;32mGit Repo:\033[0m " $1; system("git --git-dir="$1".git --work-tree="$1" status")}'
```

## Find Most Recently Modified Files
```bash
find /path/to/dir -type f -mtime -7 -print0 | xargs -0 ls -lt | head
```

## 10 Largest Open Files
```bash
lsof / | awk '{ if($7 > 1048576) print $7/1048576 "MB" " " $9 " " $1 }' | sort -n -u | tail
```

## Find All Hidden Files
```bash
find . -name '.*hidden-file*'
```

## Check for Missing Files
```bash
sudo ls -lai /lost+found/
```

## Unhide All Hidden Files in the Directory
```bash
find . -maxdepth 1 -type f -name '\.*' | sed -e 's,^\./\.,,' | sort | xargs -iname mv .name name
```

## Capitalize the First Letter of Every Word
```bash
ls | perl -ne 'chomp; $f=$_; tr/A-Z/a-z/; s/(?<![.'"'"'])\b\w/\u$&/g; print qq{mv "$f" "$_"\n}'
```

## Replace All Repetitions of the Same Character with a Single Instance
```bash
echo heeeeeeelllo | sed 's/\(.\)\1\+/\1/g'
```

## Sort and Remove Duplicates from Files
```bash
sort file1 file2 | uniq -u
```

## Print Lines of file2 That Are Missing in file1
```bash
grep -vxFf file1 file2
```

## Find Hardlinks to Files
```bash
find /home -xdev -samefile file1
```

## Output List of PATH Directories Sorted by Line Length
```bash
echo -e ${PATH//:/\\n} | awk '{print length, $0}' | sort -n | cut -f2- -d' '
```

## Forget All Path Locations
```bash
hash -r
```

## Make a Script of the Last Executed Command
```bash
echo "!!" > foo.sh
```

## ALT Prompt
```bash
PS1='\[\e[1;31m\][\u@\h \W]\$\[\e[0m\] '
```

## Get Available Space on Partition as a Single Numeric Value
```bash
df -P /path/to/dir | awk 'NR==2 {print $4}'
```

## Label Drive
```bash
sudo mlabel -i /dev/sdd1 ::NewLabel
```

## Chroot Setup
```bash
sudo mount -t proc proc /proc
sudo mount -t sysfs sys /sys
sudo mount -t devtmpfs dev /dev
sudo mount -t devpts devpts /dev/pts
mount --rbind /dev dev/
mount --rbind /run run/
```

## UEFI Command
```bash
mount --rbind /sys/firmware/efi/efivars sys/firmware/efi/efivars/
```

## Add Source Command to a File
```bash
echo "source ${(q-)PWD}/folder_name/file_name" >> ${XDGDIR:-$HOME}/.filename
```
