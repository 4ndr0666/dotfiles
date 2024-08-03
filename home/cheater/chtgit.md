# --- // GIT_LFS_RESOLUTIONS:
```bash
git lfs untrack "*.zip" #whatever file type is missing
git add .gitattributes
git lfs prune
git lfs dedup
git lfs fsck
git push --all origin main
git lfs push --all github.com:4ndr0666/dotfiles.git
```
# --- // MORE_GIT_LFS_RESOLUTIONS:
```bash
git lfs ls-files

 `98464f72e2 * config/...file.zip
  98aca01b03 * config/file.tar
  99d6e4d676 - home/.................tar.gz
  009967702a - pkgs/hooks.......tar.gz`

# note the files with * then untrack the types or idividual file:

git lfs untrack "*.ext/file" 
git add .gitattributes
git lfs prune
git lfs dedup
git lfs fsck
git push --all origin main
git lfs push --all github.com:4ndr0666/dotfiles.git
```

# --- // Git_LFS_locking_API //
**Remote "origin" does not support this. To disable, enter:**
`git config lfs.https://github.com/4ndr0666/scr.git/info/lfs.locksverify false`


# --- // Restore_deleted_files //
**Checkout the parent commit of the commit in which the deletion occured.**
`git checkout cecb069`

**Create a new branch from this commit** (optional but recommended, to avoid working directly on a detached HEAD):
`git checkout -b restore-branch`

**Merge these changes into your main branch** (assuming your main branch is `master` or `main`):
`git checkout master  # or main git merge restore-branch`

**Push the changes** to your remote repository:
`git push origin master  # or main`
