#!/bin/bash
# .local/bin/garuda-locale.sh

localectl > /tmp/garuda-locale.txt

cat /tmp/garuda-locale.txt | grep Keymap > /tmp/keymap.txt

cat /tmp/garuda-locale.txt | grep Layout > /tmp/layout.txt

locale=$(cat /tmp/keymap.txt | awk '{ print $3 }')

variant=$(cat /tmp/layout.txt | awk '{ print $3 }')

sed -i "/kb_layout =/c\kb_layout = $layout" .config/hypr/hyprland.conf

if [ "$variant" != "$layout" ]

then

sed -i "/kb_layout =/c\kb_layout = $variant" .config/hypr/hyprland.conf

fi

sed -i "s|exec-once = .local/bin/garuda-locale.sh|#exec-once = .local/bin/garuda-locale.sh|" $HOME/.config/hypr/hyprland.conf
