# --- //OPEN_FOLDER_AS_ROOT_ON_WAYLAND:
(fixing the MIT-MAGIC-COOKIE-1)
`xhost +si:localuser:root`
```bash
xhost +SI:localuser:root
export DISPLAY=:0 or 1
gksu -w thunar
```

# --- //PERMISSIONS:
```bash
cd /home/andro
ls -a -lh
chown andro:andro .Xau*
chown root:root /tmp/.X11-unix
```

# --- //DELETE_DUPES:
```bash
cd /home/andro
ls -l | grep .Xauth*
rm -fr .Xauthority-*
```

# --- // NEW_XAUTH:
```bash
cd /home/machine
mv .Xauthority .Xauthority.bak
touch .Xauthority
chown machine:machine .Xauthority
chmod +x .Xauthority
```

# --- //DEFAULT_XAUTH:
```bash
cp /etc/X11/xinit/xinitrc ~/.xinitrc
```

# --- //CREATE_.xserverrc
```bash
#!/bin/sh

exec /usr/bin/Xorg -nolisten tcp "$@" vt$XDG_VTNR
xinit -- :1  #if the xserverrc exists add this line
```

# --- //NEW_Xorg.conf:
```bash
Xorg :0 -configure
cp ~/xorg.conf.new /etc/X11/xorg.conf
```

# --- //LUKES_XINIT
[ "$(tty)" = "/dev/tty1" ] && ! pidof -s Xorg >/dev/null 2>&1 && exec startx "$XINITRC"


# --- // INPUT_FIX:
```bash
sudo pacman -Rdd xf86-input-libinput
sudo pacman -Sw xf86-input-evdev
sudo pacman -U /var/cache/pacman/pkg/xf86-input-evdev-VERSION.pkg.tar.xz
```

# --- // DRIVER_CHECK:
```bash
lspci -v | grep -A1 -e VGA -e 3D
pacman -Ss xf86-video
```

# --- //BUS_IDs:
```bash
lspci | grep -e VGA -e 3D
```

# --- //DISPLAY_SIZE_AND_DPI:
```bash
xdpyinfo | grep -B2 resolution
```

# --- // ADDON_FILE_TO_PREVENT_KILLING_X:
```bash
Section "ServerFlags"
    Option "DontZap"  "True"
EndSection
```

# --- // XINITRC_TWEAKS:
```bash
/etc/X11/xinit/xinitrc
xset s off
xset -dpms
xset s noblank
```

# --- //MISC:
```bash
xauth -b
pkill -x X
strace xauth list
```

# --- //USEFULL_PKGS:
```bash
1. lsdesktopf (list desktop files and their contents)
lsdesktopf --list
lsdesktopf --list gtk zh_TW,zh_CN,en_GB

2. fbrokendesktop (detects broken Exec values pointing to non-existent paths)
fbrokendesktop /usr
fbrokendesktop /usr/share/xsessions/icewm.desktop
```
