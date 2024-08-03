```bash
**Oneliner for performance governor:**:
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# If you are using SSDs, add `noatime` and `discard` options to your ext4 filesystems for better performance and wear leveling:
UUID=9096e7c4-5ca8-4d9c-a431-72497931f44d / ext4 rw,noatime,discard 0 1

**Enable ZRAM:**
 sudo modprobe zram
 echo lz4 | sudo tee /sys/block/zram0/comp_algorithm
 echo 2G | sudo tee /sys/block/zram0/disksize
 sudo mkswap /dev/zram0
 sudo swapon /dev/zram0

# Using `tmpfs` for temporary files can improve performance by storing them in RAM:
tmpfs /tmp tmpfs defaults,noatime,mode=1777 0 0
```

```bash
# --- // Symlink_for_multiple_versions:
sudo find /usr/lib -name "libicuuc.so*"
sudo ln -s /usr/lib/libicuuc.so.75 /usr/lib/libicuuc.so.74
ls -l /usr/lib/libicuuc.so.74
```

```bash
# --- // Disable_USB_autosuspend_globally:
echo 'on' | sudo tee /sys/bus/usb/devices/1-1/power/control                                         # Temporarily

sudo echo "ACTION=="add", SUBSYSTEM=="usb", ATTR{idVendor}=="4791", ATTR{idProduct}=="2025", TEST=="power/control", ATTR{power/control}="on"" > /etc/udev/rules.d/50-usb-autosuspend.rules # Permanently
sudo udevadm control --reload-rules
sudo udevadm trigger
                                                                                                
sudo echo "options usb-storage quirks=4791:2025:u" > /etc/modprobe.d/disable-uas.conf             # Device_specific_with_dracut:
sudo dracut --force
```

```bash
# --- // Reload_udev_rules_and_permissions:
sudo modprobe usb-storage
sudo modprobe uas
sudo udevadm control --reload-rules
sudo systemctl restart systemd-udevd
sudo udevadm trigger
```

```bash
# --- // Clearing_Dangling_Symlinks:
# Find and list all dangling symlinks in /etc/ssl/certs
find /etc/ssl/certs -type l -xtype l -print

# Remove all dangling symlinks in /etc/ssl/certs
find /etc/ssl/certs -type l -xtype l -delete

# Verify no dangling symlinks remain
find /etc/ssl/certs -type l -xtype l -print
```

```bash
# --- // Remove_SystemD_Service_Properly:
# Check if the service exists and is enabled
systemctl is-enabled ananicy-cpp.service

# Disable the service
systemctl disable ananicy-cpp.service

# Verify the service is disabled
systemctl is-enabled ananicy-cpp.service

# Remove the service file
rm /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service

# Reload systemd to apply changes
systemctl daemon-reload

# Verify the service file is removed
ls /etc/systemd/system/local-fs.target.wants/ananicy-cpp.service
```

```bash
# --- // Download_Pkglist:
curl -L https://gitlab.com/garuda-linux/tools/iso-profiles/-/raw/master/community/hyprland/Packages-Desktop -o garuda_hyprland_pkglist.txt
```
