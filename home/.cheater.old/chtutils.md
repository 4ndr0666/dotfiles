## Fix "Not a Symlink" Warning
```bash
sudo rm /usr/lib/libplacebo.so.338
sudo ln -s /usr/lib/libplacebo.so.338.0.0 /usr/lib/libplacebo.so.338
```

## Create a New Systemd Unit
Run the following command to create a new unit:
```bash
systemctl edit --user --force --full systemd-oomd.service
```

## Fix SSH for Git
```bash
ls -al ~/.ssh
# If you don't have an existing public and private key pair, generate a new one
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
paru -S xclip
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
# Now go to GitHub settings, select "SSH and GPG keys", click "New SSH key",
# paste your key into the "Key" field and give it a relevant title. Click "Add SSH key".
# Test your SSH connection
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

## List All Files in Directory

### Bash Loop
```bash
for f in *.wav; do echo "file '$f'" >> mylist.txt; done
```

### Using Printf
```bash
printf "file '%s'\n" *.wav > mylist.txt
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

### Ensure This Kernel is Installed
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

### Check Variable and Unset
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

* Identify the sec line, and copy the GPG key ID.
* It begins after the `/` character. Example:
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
ps aux| grep 'Z'
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
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megacmd-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megacmd-x86_64.pkg.tar.zst"
```
