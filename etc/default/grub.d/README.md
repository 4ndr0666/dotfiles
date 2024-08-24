This config line imports drop-in files from /etc/default/grub.d/
for garuda_grub_d in ${sysconfdir}/default/grub.d/*.cfg ; do if [ -e "${garuda_grub_d}" ]; then source "${garuda_grub_d}"; fi; done
