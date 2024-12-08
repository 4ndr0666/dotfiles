## Make a script of last executed cmd
$ echo "!!" > foo.sh 
```
## Reboot when eveything is hanging
$ <alt> + <print screen/sys rq> + <R> - <S> - <E> - <I> - <U> - <B>
```
## Get all links of a website
$ lynx -dump http://www.domain.com | awk '/http/{print $2}'
```
## Recursively remove all empty directories
$ find . -type d -empty -delete
## sub-directories
$ find . -depth  -type d  -empty -exec rmdir {} \;
```
## Unhide all hiden files in the dir
$ find . -maxdepth 1 -type f -name '\.*' | sed -e 's,^\./\.,,' | sort | xargs -iname mv .name name
```

## recursively remove all "nodemodules" folders
$ find . -name "node_modules" -exec rm -rf '{}' +
```

## Delete orphan vim files
$ find . -type f -iname '*.un~' | while read UNDOFILE ; do FILE=$( echo "$UNDOFILE" | sed -r -e 's/.un~$//' -e 's&/\.([^/]*)&/\1&' ) ; [[ -e "$FILE" ]] || rm "$UNDOFILE" ; done
```

## Show 10 larget open files
$ lsof / | awk '{ if($7 > 1048576) print $7/1048576 "MB" " " $9 " " $1 }' | sort -n -u | tail

## List status of all git repos
$ find ~ -name ".git" 2> /dev/null | sed 's/\/.git/\//g' | awk '{print "-------------------------\n\033[1;32mGit Repo:\033[0m " $1; system("git --git-dir="$1".git --work-tree="$1" status")}'

##Rename all files in dir by capitalizing first letter of every word
 $ ls | perl -ne 'chomp; $f=$_; tr/A-Z/a-z/; s/(?<![.'"'"'])\b\w/\u$&/g; print qq{mv "$f" "$_"\n}'

## Outputs list of PATH dirs sorted by line length
 $ echo -e ${PATH//:/\\n} | awk '{print length, $0}' | sort -n | cut -f2- -d' '

## List all non git committed files and gzip them
 $ GITFOLDER="/srv/some/folder"   ls-files --others --exclude-standard | tar czf ${GITFOLDER}-archives/uploads-$(date '+%Y%m%d%H%M').tar.gz -T -

## Sort and remove dupes from files. Display only uniq lines from files.
  $ sort file1 file2 | uniq -u

## Sort and remove dupes in one files
$ vi +'%!sort | uniq' +wq file.txt

## Find hardlinks to files
 $ find /home -xdev -samefile file1

## Combine movies files with mencoder
 $ mencoder cd1.avi cd2.avi -o movie.avi -ovc copy -oac copy

## Rotate movie files with mencoder
 $ mencoder video.avi -o rotated-right.avi -oac copy -ovc lavc -vf rotate=1

## Use pip list --outdated for install updates
 $ python3 -m pip install -U $(python3 -m pip list outdated 2> /dev/null | grep -v 'Version' | grep -v '\-\-\-\-\-\-' | awk '{printf $1 " " }' && echo)

## Replace sequences of the same character with a single one
 $ echo heeeeeeelllo | sed 's/\(.\)\1\+/\1/g'

## Print file oweners and perms of a dir tree
 $ find /path/to/dir1 -printf "%U %G %m %p\n" > /tmp/dir1.txt

## Get latest versin of file across all dirs
 $ find . -name custlist\* | perl -ne '$path = $_; s?.*/??; $name = $_; $map{$name} = $path; ++$c; END { print $map{(sort(keys(%map)))[$c-1]} }'

 ## Forget all path locations
  $ hash -r

## Copy or create files with specific perms and owners
 $ install -b -m 600 /dev/null NEWFILE


## Find most recent modified files in a dir and all subdirs
 $ find /path/to/dir -type f -mtime -7 -print0 | xargs -0 ls -lt | head

## Color prompt for dev test environment
 $ PS1='\[\e[1;31m\][\u@\h \W]\$\[\e[0m\] '

## Print lines of file2 that are missing in file 1
 $ grep -vxFf file1 file2

## Use rsync instead of cp with progress
 $ rsync --progress largefile.gz somewhere/else/

## Create and restore backups using cpio
 $ find . -xdev -print0 | cpio -oa0V | gzip > path_to_save.cpio.gz

## Get available space on partition as single numeric value
 $ df /path/to/dir | sed -ne 2p | awk '{print $4}'

## Change label of drive without a gui
 $ sudo mlabel -i /dev/sdd1 ::NewLabel

## Create a compressed file for rsync
$ GZIP='--rsyncable' tar cvzf bobsbackup.tar.gz /home/bob

## An fzf package list you can delete from 
$ pacman -Qq | fzf --multi --preview 'pacman -Qi {1}' | xargs -ro sudo pacman -Rns

## Proper intel packages
sudo pacman -S mesa lib32-mesa libva libva-intel-driver libva-mesa-driver 
libva-vdpau-driver libva-utils lib32-libva lib32-libva-intel-driver 
lib32-libva-mesa-driver lib32-libva-vdpau-driver intel-ucode iucode-tool 
vulkan-intel lib32-vulkan-intel intel-gmmlib intel-graphics-compiler 
intel-media-driver intel-media-sdk intel-opencl-clang libmfx
