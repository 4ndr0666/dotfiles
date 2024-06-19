```bash
# --- // Change_username:
sudo usermod -l "old-name" "new-name"

# --- // Change_userhome:
sudo usermod -d "/new/userhome" "/old/usrhome"

# --- // Create_symlinks_for_old_hardcoded_paths:
sudo ln -s "/new/userhome" "/old/userhome" 

# --- // Update_sudoers_w_newname:
visudo

# --- // List_all_files_using_oldname:
grep -r old_username * 
```


```bash
# --- // Add_user_to_group:
gpasswd -a user group

# --- // Delete_user_from_group:
gpasswd -d user group

# --- // Change_groupname:
groupmod -n new_group old_group
```
