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
