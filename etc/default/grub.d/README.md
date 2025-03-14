# 00-kernel-params.cfg
#### Author: 4ndr0666

The 00-kernel-params.cfg file ensures that if any kernel parameter listed within it does not exist in 
the default grub file, it is forced to be written to it. To call it, place the following snippet at 
the end of your `/etc/default/grub` file

```shell
#### This snippet imports drop-in files from /etc/default/grub.d/:
for override_file in /etc/default/grub/grub.d/*.cfg ; do
if [ -e "${override_file}" ]; then
source "${override_file}"
fi
done
```
