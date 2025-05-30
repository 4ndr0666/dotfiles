# Thunar Installation Tips

---

**XDG Specifications**: All desktop files will be located at "$XDG_DATA_HOME/applications".

## Registration

It is necessary to reregister the protcol handler once the changes have been made to the desktop files. For example,to register "Thunar" as the protocol handler for all "inodes/direcorties" and "xwayland-gnome-search-saved" mime-types, call `xdg-mime` like this:

```shell
xdg-mime default thunar.desktop inode/directory
xdg-mime default thunar.desktop application/x-wayland-gnome-saved-search
```

## Breakdown

1. "Thunar" was registered as the **default** program to execute when opening "inode/directory" mime-types globally.

2. "Thunar" was also registered to handle a specifc instance called "application/x-wayland-gnome-saved-search".

