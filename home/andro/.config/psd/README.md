# Profile-sync-daemon (PSD) on Arch Linux

Profile-sync-daemon (PSD) is a utility that helps improve browser performance by syncing browser profile data to RAM, reducing SSD wear. This guide covers the installation, configuration, and usage of PSD on an Arch Linux system.

## Installation

Install PSD using your preferred AUR helper:

```bash
yay -S profile-sync-daemon
```

## Initial Configuration

1. **Generate Configuration File**

   Run `psd` to create the configuration file at `$XDG_CONFIG_HOME/psd/psd.conf` (usually `~/.config/psd/psd.conf`):

   ```bash
   psd
   ```

2. **Edit Configuration**

   Open the configuration file and adjust the settings as needed:

   ```bash
   nano ~/.config/psd/psd.conf
   ```

   Key settings to configure include:

   - **BROWSERS**: Specify which browsers PSD should manage. If left undefined, PSD will manage all detected browsers.

     ```bash
     BROWSERS=(brave firefox chromium)
     ```

   - **USE_OVERLAYFS**: Enable OverlayFS to reduce memory usage and speed up sync operations.

     ```bash
     USE_OVERLAYFS="yes"
     ```

   **Note:** Grant sudo privileges for `psd-overlay-helper` by adding the following line to `/etc/sudoers` using `visudo`:

   ```bash
   username ALL=(ALL) NOPASSWD: /usr/bin/psd-overlay-helper
   ```

   Replace `username` with your actual username.

   - **USE_BACKUPS**: Enable backups for crash recovery.

     ```bash
     USE_BACKUPS="yes"
     ```

   - **BACKUP_LIMIT**: Set the number of backups to keep.

     ```bash
     BACKUP_LIMIT=5
     ```

## Usage

### Manage Browser Processes

Ensure all browsers are closed before starting PSD to prevent data corruption:

```bash
pgrep -x brave && echo "Brave is running"
pgrep -x firefox && echo "Firefox is running"
pgrep -x chromium && echo "Chromium is running"

# Stop running browsers
pkill -x brave
pkill -x firefox
pkill -x chromium
```

### Set Permissions

Set secure permissions for browser profiles:

```bash
chmod 700 /home/andro/.config/BraveSoftware/Brave-Browser
```

### Start and Enable PSD

1. **Start PSD Service**

   ```bash
   systemctl --user start psd
   ```

2. **Enable PSD to Start at Boot**

   ```bash
   systemctl --user enable psd
   ```

3. **Enable and Start Resync Timer**

   The resync timer ensures data is written back to disk at regular intervals (default is hourly):

   ```bash
   systemctl --user enable psd-resync.timer
   systemctl --user start psd-resync.timer
   ```

### Verify PSD Status

Check the status of PSD to ensure it is running correctly:

```bash
systemctl --user status psd
```

### Check PSD Configuration

Use the `psd p` command to parse the configuration and view detailed information:

```bash
psd p
```

### Troubleshooting

If issues arise, check the journal logs for PSD:

```bash
journalctl --user -xeu psd.service
```

### Manually Sync Data

You can manually sync data from RAM to disk using the `psd sync` command:

```bash
psd sync
```

## Advanced Configuration

### Adjust Resync Frequency

To sync more frequently than the default hourly interval, create an override file for the `psd-resync.timer`:

1. Create the directory and file:

   ```bash
   mkdir -p ~/.config/systemd/user/psd-resync.timer.d
   nano ~/.config/systemd/user/psd-resync.timer.d/frequency.conf
   ```

2. Add the following configuration to sync every 10 minutes:

   ```ini
   [Unit]
   Description=Timer for Profile-sync-daemon - 10min

   [Timer]
   OnUnitActiveSec=
   OnUnitActiveSec=10min
   ```

3. Reload the systemd user configuration:

   ```bash
   systemctl --user daemon-reload
   ```

## Data Recovery and Cleaning

### Restore from Snapshots

If you need to restore a browser profile from a snapshot:

1. **Stop PSD Service:**

   ```bash
   systemctl --user stop psd
   ```

2. **Verify Symlink:**

   Ensure no symlink to the tmpfs directory exists:

   ```bash
   ls -l ~/.config/<browser>
   ```

3. **Backup Bad Profile:**

   ```bash
   mv ~/.config/<browser> ~/.config/<browser>-bad
   ```

4. **Copy Snapshot:**

   ```bash
   cp -a ~/.config/<browser>-backup-crashrecovery-* ~/.config/<browser>
   ```

5. **Restart PSD:**

   ```bash
   systemctl --user start psd
   ```

6. **Clean Snapshots:**

   To remove all recovery snapshots:

   ```bash
   psd clean
   ```

## Conclusion

Profile-sync-daemon is a valuable tool for optimizing browser performance and reducing SSD wear. By configuring and using PSD as described, you can achieve significant improvements in browser responsiveness and system performance.

Ensure all browsers are closed when managing PSD to prevent errors and data loss. Regularly check logs and adjust configurations as needed for optimal performance.

For more information, refer to the official [Arch Wiki PSD page](https://wiki.archlinux.org/title/Profile-sync-daemon).

