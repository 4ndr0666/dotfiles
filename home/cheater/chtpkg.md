```bash
# --- // GARUDA_SETTINGS_MANAGER_DEPS:
yay -S ckbcomp hwinfo kauth5 kcoreaddons5 kitemmodels5 lib32-at-spi2-core lib32-brotli lib32-bzip2 lib32-cairo lib32-colord lib32-curl lib32-dbus lib32-e2fsprogs lib32-expat lib32-fontconfig lib32-freeglut lib32-freetype2 lib32-fribidi lib32-gcc-libs lib32-gdk-pixbuf2 lib32-glew lib32-glib2 lib32-glibc lib32-glu lib32-gmp lib32-gnutls lib32-gtk3 lib32-harfbuzz lib32-icu lib32-keyutils lib32-krb5 lib32-lcms2 lib32-libcap lib32-libcups lib32-libdatrie lib32-libdecor lib32-libdrm lib32-libelf lib32-libepoxy lib32-libffi lib32-libgcrypt lib32-libglvnd lib32-libgpg-error lib32-libice lib32-libidn2 lib32-libjpeg-turbo lib32-libldap lib32-libnghttp2 lib32-libnghttp3 lib32-libnsl lib32-libpciaccess lib32-libpng lib32-libpsl lib32-librsvg lib32-libsm lib32-libssh2 lib32-libtasn1 lib32-libthai lib32-libtiff lib32-libtirpc lib32-libunistring lib32-libx11 lib32-libxau lib32-libxcb lib32-libxcomposite lib32-libxcrypt lib32-libxcursor lib32-libxdamage lib32-libxdmcp lib32-libxext lib32-libxfixes lib32-libxft lib32-libxi lib32-libxinerama lib32-libxkbcommon lib32-libxkbcommon-x11 lib32-libxml2 lib32-libxmu lib32-libxrandr lib32-libxrender lib32-libxshmfence lib32-libxt lib32-libxtst lib32-libxxf86vm lib32-llvm-libs lib32-lm_sensors lib32-mesa lib32-mesa-demos lib32-ncurses lib32-nettle lib32-ocl-icd lib32-openssl lib32-p11-kit lib32-pam lib32-pango lib32-pcre2 lib32-pixman lib32-systemd lib32-util-linux lib32-vulkan-icd-loader lib32-wayland lib32-xz lib32-zlib lib32-zstd libva-utils libx86emu mesa-demos mhwd-amdgpu mhwd-ati mhwd-db-garuda mhwd-garuda mhwd-nvidia mhwd-nvidia-390xx mhwd-nvidia-470xx perl-xml-parser perl-xml-writer polkit-qt5 vdpauinfo vulkan-tools garuda-settings-manager find-the-command-git kernel-modules-hook noto-color-emoji-fontconfig nss-mdns systemd-oomd-defaults update-grub
```

```bash
# --- // INSTALL_PKGFILE_AUTOUPDATE:
sudo pacman -S pkgfile
sudo systemctl enable pkgfile-update.timer
sudo systemctl start pkgfile-update.timer
# --- // PKGFILE_USAGE:
pkgfile -u            #Sync with a database
pkgfile makepkg       #Search for a package that owns the file makepkg
pkgfile -l makepkg    #List all file provided by makepkg
```

# --- // MESON_BUILDING:
```bash
meson setup build
meson compile -C build
meson install -C build
```

# --- // WINDOWS_AME:
```bash
https://drive.google.com/file/d/1Wr3njJqB2pFxHJW4UcDUat7Il_w7tWx9/view?usp=sharing
```

# --- // PICOM_DEPS:
```bash
yay -S libx11 libxcomposite libxdamage libxfixes libXext libxrender libXrandr libXinerama pkg-config make xproto x11proto sh xprop xwininfo x11-utils libpcre libconfig libdrm libGL libdbus asciidoc docbook-xml-dtd libxml-utils libxslt xsltproc xmlto --needed --noconfirm --overwrite="*"
```

# --- // Libraries:
```bash
After building libraries remember to run 'libtool --finish /usr/lib'
*output*: libtool: finish: PATH="/home/andro/.config/openbox-themes/scripts:/home/andro/.config/openbox/scripts:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/lib/jvm/default/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/home/andro/.local/bin:/sbin" ldconfig -n /usr/lib
```

If you ever happen to want to link against installed libraries
in a given directory, LIBDIR, you must either use libtool, and
specify the full pathname of the library, or use the '-LLIBDIR'
flag during linking and do at least one of the following:
   - add LIBDIR to the 'LD_LIBRARY_PATH' environment variable
     during execution
   - add LIBDIR to the 'LD_RUN_PATH' environment variable
     during linking
   - use the '-Wl,-rpath -Wl,LIBDIR' linker flag
   - have your system administrator add LIBDIR to '/etc/ld.so.conf'

# --- // Wayland:
```bash
If using GDM on wayland, run systemctl enable --now nvidia-resume.service
```
