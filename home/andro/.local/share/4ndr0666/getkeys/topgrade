# ======================================= // TOPGRADE //

## Table of Contents

- [Installation](#installation)
- [Basic Commands](#basic-commands)
- [Configuration Options](#configuration-options)
- [Advanced Usage](#advanced-usage)
- [Scheduling Updates](#scheduling-updates)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Audit Commands and Tactics](#audit-commands-and-tactics)
- [Additional Resources](#additional-resources)

---

### Update Only Specific Components

Update only specified components:

```bash
topgrade --only git,aur
```

### Exclude Components from Update

Skip updating certain components:

```bash
topgrade --exclude flatpak,docker
```

---

### Creating the Configuration File

Customize Topgrade using the configuration file located at `~/.config/topgrade.toml`.

If the file doesn't exist, create it:

```bash
mkdir -p ~/.config
touch ~/.config/topgrade.toml
```

### Common Configuration Options

#### Exclude Specific Update Steps

```toml
[disable]
flatpak = true
docker = true
```

#### Exclude Specific Directories from Git Updates

```toml
[git]
excluded_dirs = [
    "/home/user/projects/ignored_repo",
    "/home/user/another_repo"
]
```

#### Custom Commands Before or After Steps

```toml
[[presteps]]
command = "echo Starting update process"

[[poststeps]]
command = "echo Update process completed"
```

#### Customize AUR Helper

Specify which AUR helper to use:

```toml
[arch]
aurman = false
pacaur = false
pikaur = false
trizen = false
yay = true
```

#### Pass Arguments to Commands

```toml
[pacman]
args = ["-Syuw"]

[git]
args = ["--rebase"]
```

---

## Advanced Usage

### Use a Specific Configuration File

```bash
topgrade --config /path/to/custom_topgrade.toml
```

### Run Topgrade Without Sudo

If you prefer to run Topgrade without `sudo`, you can configure it to exclude steps that require elevated privileges:

```toml
[disable]
pacman = true
```

Then run:

```bash
topgrade
```

### Update Only Specific Components

Update only Git repositories and AUR packages:

```bash
topgrade --only git,aur
```

### Exclude Components from Update

Skip updating Flatpak and Docker:

```bash
topgrade --exclude flatpak,docker
```

### Use a Specific Configuration File

```bash
topgrade --config /path/to/custom_topgrade.toml
```

---

## Scheduling Updates

### Using `systemd` Timer

Create a systemd service and timer for automated updates.

#### Create the Service File

Create `/etc/systemd/system/topgrade.service`:

```ini
[Unit]
Description=Run Topgrade

[Service]
Type=oneshot
ExecStart=/usr/bin/topgrade
```

#### Create the Timer File

Create `/etc/systemd/system/topgrade.timer`:

```ini
[Unit]
Description=Run Topgrade Daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

#### Enable and Start the Timer

```bash
sudo systemctl enable --now topgrade.timer
```

### Using `cron`

Automate updates by adding a cron job:

```bash
crontab -e
```

Add the following line to run Topgrade daily at 2 AM:

```cron
0 2 * * * /usr/bin/topgrade
```

---

## Troubleshooting

#### Sudo Password Prompts

To minimize password prompts:

- **Extend Sudo Timeout:** Refresh the sudo timestamp before running Topgrade.

  ```bash
  sudo -v
  topgrade
  ```

- **Passwordless Sudo for Specific Commands:** Edit `/etc/sudoers` carefully.

  ```bash
  sudo visudo
  ```

  Add:

  ```sudoers
  your_username ALL=(ALL) NOPASSWD: /usr/bin/pacman
  ```

#### Network Issues

If updates fail due to network issues:

- **Check Internet Connectivity:** Ensure your system is connected to the internet.
- **Update Mirrors:** Refresh the mirror list.

  ```bash
  sudo pacman-mirrors --fasttrack && sudo pacman -Syy
  ```

#### Conflicting Packages

Resolve package conflicts by reviewing the output and manually intervening:

```bash
sudo pacman -Syu
```

---

## Tips and Best Practices

### Backup Before Updating

Always backup important data:

```bash
rsync -a --delete /home/user/ /backup/user/
```

### Review Update Logs

Keep logs of update sessions:

```bash
topgrade | tee ~/topgrade_$(date +%F).log
```

### Update Topgrade Itself

Since Topgrade is from the AUR, update it separately if not configured to auto-update:

```bash
yay -Syu topgrade
```

---

## Quick Reference Tables

### Topgrade Command Options

| **Command**                             | **Description**                  |
|-----------------------------------------|----------------------------------|
| `topgrade`                              | Update all components            |
| `topgrade --dry-run`                    | Simulate update process          |
| `topgrade --verbose`                    | Verbose output                   |
| `topgrade --only component1,component2` | Update specific components       |
| `topgrade --exclude component`          | Exclude components from update   |
| `topgrade --config /path/to/config`     | Use a specific configuration file|

### Common Components to Include or Exclude

| Component | Description                  |
|-----------|------------------------------|
| `git`     | Git repositories             |
| `aur`     | AUR packages                 |
| `flatpak` | Flatpak applications         |
| `docker`  | Docker images and containers |
| `pip`     | Python packages installer    |
| `cargo`   | Rust packages                |
| `npm`     | Node.js packages             |

### Configuration File Directives (`topgrade.toml`)

| Section        | Option          | Description                    |
|----------------|-----------------|--------------------------------|
| `[[presteps]]` | `command`       | Commands to run before updates |
| `[[poststeps]]`| `command`       | Commands to run after updates  |

---

## Additional Resources

- **Topgrade GitHub Repository**: [github.com/topgrade-rs/topgrade](https://github.com/topgrade-rs/topgrade)
- **Arch Linux Wiki**: [Topgrade - ArchWiki](https://wiki.archlinux.org/title/Topgrade)
- **Pacman Tips**: [Pacman Rosetta](https://wiki.archlinux.org/title/Pacman/Rosetta)
- **AUR Helpers Comparison**: [AUR Helpers - ArchWiki](https://wiki.archlinux.org/title/AUR_helpers)

---

