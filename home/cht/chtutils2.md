## Recursively comnine all md files into PDF:
```bash
**yay -S pandoc texlive-xetex**
find . -name '*.md' -exec cp --parents \{\} /path/to/destination \;
cat $(find . -name '*.md' | sort) > combined.md
- 1. pandoc combined.md -o output.pdf    # Normal method
or
- 2. pandoc combined.md -o output.pdf --pdf-engine=xelatex -V geometry:margin=1in    # Enhanced engine
```


## Apply performance profile to governor: 
```bash
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

## SSD Performance Optimization:
```bash
UUID=9096e7c4-5ca8-4d9c-a431-72497931f44d / ext4 rw,noatime,discard 0 1
```

## Enable ZRAM:
```bash
sudo modprobe zram
echo lz4 | sudo tee /sys/block/zram0/comp_algorithm
echo 2G | sudo tee /sys/block/zram0/disksize
sudo mkswap /dev/zram0
sudo swapon /dev/zram0
```

## Use `tmpfs` for temporary files by storing them in RAM:
```bash
tmpfs /tmp tmpfs defaults,noatime,mode=1777 0 0
```

## Resolve symlink conflicts for Multiple Versions:
```bash
sudo find /usr/lib -name "libicuuc.so*"
sudo ln -s /usr/lib/libicuuc.so.75 /usr/lib/libicuuc.so.74
ls -l /usr/lib/libicuuc.so.74
```

## Disable USB Autosuspend temporarily:
```bash
echo 'on' | sudo tee /sys/bus/usb/devices/1-1/power/control  
```

## Disable USB Autosuspend globally:
```bash
sudo echo "ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="4791", ATTR{idProduct}=="2025", TEST=="power/control", ATTR{power/control}="on"" > /etc/udev/rules.d/50-usb-autosuspend.rules  # Permanently
sudo udevadm control --reload-rules
sudo udevadm trigger

sudo echo "options usb-storage quirks=4791:2025:u" > /etc/modprobe.d/disable-uas.conf  # Device specific with dracut:
sudo dracut --force
```

## Repopulate devices without reboot: 
```bash
sudo modprobe usb-storage
sudo modprobe uas
sudo udevadm control --reload-rules
sudo systemctl restart systemd-udevd
sudo udevadm trigger
```

## Clearing Dangling Symlinks:
- **Find and List All Dangling Symlinks in `/etc/ssl/certs`:**
  ```bash
  find /etc/ssl/certs -type l -xtype l -print
  ```

- **Remove All Dangling Symlinks in `/etc/ssl/certs`:**
  ```bash
  find /etc/ssl/certs -type l -xtype l -delete
  ```

- **Verify No Dangling Symlinks Remain:**
  ```bash
  find /etc/ssl/certs -type l -xtype l -print
  ```


## Remove SystemD Service Properly:
- **Check if the Service Exists and Is Enabled:**
  ```bash
  systemctl is-enabled ananicy-cpp.service
  ```

- **Disable the Service:**
  ```bash
  systemctl disable ananicy-cpp.service
  ```

- **Verify the Service Is Disabled:**
  ```bash
  systemctl is-enabled ananicy-cpp.service
  ```

- **Remove the Service File:**
  ```bash
  rm /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service
  ```

- **Reload Systemd to Apply Changes:**
  ```bash
  systemctl daemon-reload
  ```

- **Verify the Service File Is Removed:**
  ```bash
  ls /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service
  ```

