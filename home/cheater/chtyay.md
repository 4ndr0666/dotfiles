# --- // USEFULL_FLAGS:
--nodeps              #Skip dependency checks
--noconfirm
--confirm             #Always ask for confirmation
--assume-installed    #Add virtual package to satisfy deps.
--dbonly              #Do not remove files, only db entry.
--downloadonly        #Download pkgs only.
--groups              #View all members of a pkg group.
--ignoregroup         #Ignore a group upgrade.
--ignore              #Ignore a pkg upgrade.
--clean               #Remove old pkgs

# --- // DEFAULT:
yay -S --color=always --nomakepkgconf --norebuild --noredownload --useask=false --batchinstall=false --bottomup --cleanafter --cleanmenu --needed --provides --refresh --sudoloop --sysupgrade --timeupdate --askremovemake

# --- // OVERWRITE:
yay -S --color=always --recursive --cleanafter=false --combinedupgrade=false --noconfirm --nopgpfetch --nomakepkgconf --noprovides  --rebuildall --rebuildtree --refresh --useask=true --overwrite='A-Z,a-z,0-9,-,.,_'

# --- // -Ss:
yay -Ss --color=always --sortby=votes --doublelineresults
