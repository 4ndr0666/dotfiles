Rsync Commands Cheat Sheet:

*  Recursively copy source to dest, skips existing files, merges existing folders
   rsync -av --ignore-existing --ignore-times --update --progress --recursive /source/dir /dest/dir


1. Merge two directories, keeping only the larger files:
   rsync -a --remove-source-files --progress --size-only source_dir/ dest_dir/

2. Copy directory contents:
   rsync -av source_dir/ dest_dir/

3. Sync directories, deleting files in the destination not present in the source:
   rsync -av --delete source_dir/ dest_dir/

4. Sync directories over SSH:
   rsync -av -e ssh source_dir/ user@hostname:/path/to/dest_dir/

5. Show progress while transferring data:
   rsync -av --progress source_dir/ dest_dir/

6. Compress file data during the transfer:
   rsync -avz source_dir/ dest_dir/

7. Sync only specific file types:
   rsync -av --include '*/' --include '*.jpg' --exclude '*' source_dir/ dest_dir/

8. Exclude specific file types:
   rsync -av --exclude '*.jpg' source_dir/ dest_dir/

9. Limit bandwidth usage (in KBytes per second):
   rsync -av --bwlimit=2000 source_dir/ dest_dir/

10. Preserve symbolic links:
   rsync -av -l source_dir/ dest_dir/

11. Sync only newer files:
   rsync -avu source_dir/ dest_dir/

12. Dry run (show what would be transferred):
   rsync -avn source_dir/ dest_dir/
