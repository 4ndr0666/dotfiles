## Audit Commands and Tactics

### Verify Installed Packages

List all explicitly installed packages:

```bash
pacman -Qe
```

### Check for Orphaned Packages

Identify orphaned packages:

```bash
pacman -Qdt
```

### Clean Package Cache

Free up disk space by cleaning the cache:

```bash
sudo pacman -Sc
```

### Validate Package Integrity

Check for corrupted packages:

```bash
pacman -Qk
```

### List Foreign Packages (Not in Repos)

Identify packages not from official repositories:

```bash
pacman -Qm
```

### Review AUR Packages

List all AUR packages installed:

```bash
pacman -Qm
```

### Audit Package Files

List all files installed by a package:

```bash
pacman -Ql package_name
```

### Check for Outdated Packages

List outdated packages:

```bash
checkupdates
```

### Verify Signatures

Ensure package signatures are valid:

```bash
sudo pacman -Syy
sudo pacman -Fy
```

### Edge-case Scenario Tactics

#### Downgrading a Package

If a new package version causes issues:

1. Find the package in the cache:

   ```bash
   ls /var/cache/pacman/pkg/package_name*
   ```

2. Install the previous version:

   ```bash
   sudo pacman -U /var/cache/pacman/pkg/package_name-version.pkg.tar.zst
   ```

#### Forcing Package Installation

Use with caution; can lead to system instability:

```bash
sudo pacman -S package_name --overwrite '*'
```

#### Fixing Broken Dependencies

Attempt to fix with:

```bash
sudo pacman -Syu --needed --noconfirm
```

#### Recovering from a Partial Upgrade

1. Boot into live media if necessary.
2. Chroot into your system.
3. Run:

   ```bash
   sudo pacman -Syyu
   ```

#### Dealing with Keyring Issues

Refresh the keyring:

```bash
sudo pacman -Sy archlinux-keyring
```

---

