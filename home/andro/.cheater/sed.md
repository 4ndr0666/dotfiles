# Sed Cheat-sheet

## Uncomment all the "Server = ..." lines:

```bash
sudo sed -i 's/^#Server/Server/' /etc/pacman.d/mirrorlist
```

---

## Remove all backslashes from a file 

```shell
sed 's/\\//g' input.txt > output.txt
```

---

## Place single-quotes around every word in a file

```shell
sed -E "s/^'?([^']+)'?$/\'\1\'/" input.txt > output.txt
```

---

# Find all instances of something and comment it out

* `grep`: finds all files that reference `example` under your home and `/etc`.
* `awk -F:`: extracts just filenames.
* `sort -u`: deduplicates.
* `sed -i`: comments out any line that contains `example`.

```bash
sudo grep -R "example" ~ /etc 2>/dev/null | awk -F: '{print $1}' | sort -u | while read f; do
  sudo sed -i 's/^\(.*example.*\)$/# \1/' "$f"
done
```
