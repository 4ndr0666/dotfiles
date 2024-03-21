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
