```bash
# --- // FIX_NOT_A_SYMLINK_WARNING:
sudo rm /usr/lib/libplacebo.so.338
sudo ln -s /usr/lib/libplacebo.so.338.0.0 /usr/lib/libplacebo.so.338
```

```bash
# --- // CREATE_NEW_SYSTEMD_UNIT
Run 'systemctl edit --user --force --full systemd-oomd.service' to create a new unit.
```

```bash
# --- // FIX_SSH_FOR_GIT:
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

```bash
# --- // RESTART_AN_APP:
thunar -q && thunar &
```

```bash
# --- // Make_r8168:
make -C $kernel_source_dir M=$dkms_tree/$module/$module_version/build/src EXTRA_CFLAGS='-DCONFIG_R8168_NAPI=y -DCONFIG_R8168_VLAN=y -DCONFIG_ASPM=y -DENABLE_S5WOL=y -DENABLE_EEE=y' modules
```

```bash
# --- // Init cargo and rust:
rustup default stable
```

```bash
# --- // DL_official_megasync:
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megasync-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megasync-x86_64.pkg.tar.zst"
```

```bash
# --- // Speed up keyboard
xset r rate 300 50
```

```bash
# --- // Reload sysctl config without rebooting:
su -c "sysctl --system"
```

```bash
# --- // Gtk3-nocsd usage:
In order to automatically preload 'libgtk3-nocsd.so' at X session startup, copy
/usr/share/doc/gtk3-nocsd/etc/xinit/xinitrc.d/30-gtk3-nocsd.sh' to '/etc/X11/xinit/xinitrc.d/30-gtk3-nocsd.sh'
```

```bash
# --- // OMZ_Autosuggestions:
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# --- // OMZ_Highlighting:
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

plugins=(zsh-autosuggestions zsh-syntax-highlighting)
```

```bash
# --- // List all files in dir // ========
# --- // Bash_loop:
for f in *.wav; do echo "file '$f'" >> mylist.txt; done
# -- // Printf:
printf "file '%s'\n" *.wav > mylist.txt
```

```bash
# --- // Fix ZSH permissions:
compaudit | xargs chmod g-w,o-w
```

```bash
# --- // Fix Locales:
sudo pacman -S glibc
--
sudo rm /etc/locale.gen
sudo bash -c "echo 'en_US.UTF-8 UTF-8' > /etc/locale.gen"
sudo locale-gen
```

```bash
# --- // Fix pulseaudio:
mv .config/pulse/default.pa ~/default.pa.bak
pulseaudio -vvvvv
--
set-card-profile 0 output:analog-stereo
set-default-sink 1
```

```bash
# --- // Fix dbus :
export $(dbus-launch)
```

```bash
# --- // Completely install Nix:
curl -L https://nixos.org/nix/install | sh -s -- --daemon
nix-shell -p nix-info --run "nix-info -m"
```

```bash
# --- // View the Kernel Config:
sudo nvim /usr/lib/modules/$(uname -r)/build/.config
```

```bash
# --- // Kernel Config tools:
* Make sure this kernel is installed:
sudo pacman -S linux
```


# --- // Text-based interface, use menuconfig:
cd /usr/lib/modules/$(uname -r)/build
make menuconfig

#__Graphical interface, use xconfig:

cd /usr/lib/modules/$(uname -r)/build
make xconfig

# --- // Terminal-based interface, use config // --------||

cd /usr/lib/modules/$(uname -r)/build
make config


```bash
# --- // GPG_KEY_TROUBLESHOOTING // ========
#
# --- // New key:
gpg --full-gen-key
#
# --- // Private key:
gpg --list-secret-keys
#
# --- // Ensure Pinentry is installed:
#
sudo pacman -S pinentry
#
# --- // Set GPG_TTY:
export GPG_TTY=$(tty)
#
# --- // Check variable and unset:
echo $GNUPGHOME
unset GNUPGHOME
#
# --- // Restart gpg-agent:
gpgconf --kill gpg-agent
gpg=agent --daemon
#
# --- // Ownership and permissions:
ls -l ~/.gnupg
sudo chown -R $(whoami):$(whoami) ~/.gnupg
sudo chmod 700 ~/.gnupg
sudo chmod 600 ~/.gnupg/*
sudo chown -R $(whoami):$(whoami) /run/user/1000/gnupg/
sudo chmod -R 700 /run/user/1000/gnupg
#
# --- // Remove locks:
rm .gnupg/*.lock
rm .gnupg/public-keys.d/*.lock
#
---
#
# --- // SECURITY // ========
# --- // Armor key:
gpg --full-gen-key --keyid-format LONG [EMAIL]
#
* Identify the sec line, and copy the GPG key ID.
* It begins after the / character. In this example, the key ID is 30F2B65B9246B6CA:
#
sec   rsa4096/30F2B65B9246B6CA 2017-08-18 [SC]
      D5E4F29F3275DC0CDA8FFC8730F2B65B9246B6CA
uid                   [ultimate] Mr. Robot <your_email>
ssb   rsa4096/B7ABC0813E4028C0 2017-08-18 [E]
#
# --- // Show decrypted pub key:
gpg --armor --export <ID>
#
# --- // Add to Github:
gpg --armor --export <ID> | gh gpg-key add -
```


## Fix grub w GRML_____________________________________
grub-mkconfig -o /boot/grub/grub.cfg

# --- Call fontawesome API for token
curl -H "Authorization: Bearer 67A0397F-5EF3-4130-8C0F-03F3151FB067" \-X POST \https://api.fontawesome.com/token


## Zombie killer_______________________________________________________

#PID of the zombie:
ps aux| grep 'Z'

#PID of zombie's parent:
pstree -p -s <zombie_PID>

#Kill its parent:
sudo kill 9 <parent_PID>
## Disable telemetry in yarn:___________________________________


# --- Install Mega CMD
wget https://mega.nz/linux/repo/Arch_Extra/x86_64/megacmd-x86_64.pkg.tar.zst && sudo pacman -U "$PWD/megacmd-x86_64.pkg.tar.zst"


yarn config set --home enableTelemetry 0
