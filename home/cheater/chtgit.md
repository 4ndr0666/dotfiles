## Reconnect/Clean Old Repo:

**Initialize and handle the old data**

```bash
git init
git stash --all
git stash list
git stash create
git stash show
```

**After reviewing the data you want to keep, either do a** `git stash create` **to save all**
**data locally and not on the reflog. Or explicitly move the files elsewhere (I do both to be safe)**
`git stash clear` **will then delete all the saved data when youre ready**


```bash
git stash clear       
git remote add upstream https://github.com/repo/url.git
git branch --set-upstream-to=upstream/main
gh remote add origin https://github.com/repo/url.git
gh tidy
gh repo sync
```

## Basic LFS Commands

```bash
git lfs untrack "*.zip" # Replace with the file type you need to untrack
git add .gitattributes
git lfs prune            # Clean up old and unused LFS files
git lfs dedup            # Deduplicate LFS files
git lfs fsck             # Check for corrupt or missing LFS files
git push --all origin main  # Push all branches to the remote 'main'
git lfs push --all github.com:4ndr0666/dotfiles.git  # Push all LFS files to the specified remote
```

## Additional LFS Resolutions
```bash
git lfs ls-files  # List all files tracked by LFS
```

Example output:
```plaintext
98464f72e2 * config/...file.zip
98aca01b03 * config/file.tar
99d6e4d676 - home/.................tar.gz
009967702a - pkgs/hooks.......tar.gz
```

### Steps to Resolve
1. **Untrack Specific File Types:**
   ```bash
   git lfs untrack "*.ext/file"  # Replace with the file extension or specific file
   ```

2. **Add changes to `.gitattributes`:**
   ```bash
   git add .gitattributes
   ```

3. **Clean and Check LFS Files:**
   ```bash
   git lfs prune
   git lfs dedup
   git lfs fsck
   ```

4. **Push Changes to Remote:**
   ```bash
   git push --all origin main
   git lfs push --all github.com:4ndr0666/dotfiles.git
   ```

## Git LFS Locking API
If you encounter an error regarding LFS locking, you can disable lock verification with:
```bash
git config lfs.https://github.com/4ndr0666/scr.git/info/lfs.locksverify false
```
This disables the lock verification for the specific repository.

## Restoring Deleted Files

### Step-by-Step Guide:
1. **Checkout the Parent Commit:**
   ```bash
   git checkout cecb069
   ```

2. **Create a New Branch (Recommended):**
   ```bash
   git checkout -b restore-branch
   ```

3. **Merge Changes into Main Branch:**
   ```bash
   git checkout master  # or 'main'
   git merge restore-branch
   ```

4. **Push the Restored Files to Remote:**
   ```bash
   git push origin master  # or 'main'
   ```
