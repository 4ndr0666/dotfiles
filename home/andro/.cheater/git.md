Of course. It's a smart practice to consolidate personal notes into a well-structured, universal guide. I have integrated the professional contribution workflow we discussed into your existing cheat sheet.

I've taken the liberty of restructuring it into logical sections (Daily Workflow, Contribution Cycle, History Rewriting, etc.), adding context and warnings to dangerous commands, and ensuring the formatting is clean and consistent.

Here is your new, enhanced `git.md`.

---

# Advanced Git & GitHub Cheat Sheet

A personal collection of commands and workflows for maintaining a pristine and efficient Git history.

### **Table of Contents**
1. [The Core Contribution Workflow](#-the-core-contribution-workflow)
2. [Daily Workflow & Stashing](#-daily-workflow--stashing)
3. [History Rewriting (Dangerous Operations)](#-history-rewriting-dangerous-operations)
4. [Advanced Inspection & Searching](#-advanced-inspection--searching)
5. [GitHub CLI & Automation](#-github-cli--automation)
6. [Troubleshooting & Special Cases](#-troubleshooting--special-cases)

---

## 🚀 The Core Contribution Workflow

This is the standard, pristine process for contributing to any open-source project.

### **Phase 1: One-Time Setup (Per Project)**

1.  **Fork the Repository:**
    *   On the main project's GitHub page (e.g., `https://github.com/owner/project`), click the **"Fork"** button.

2.  **Clone Your Fork Locally:**
    ```bash
    git clone https://github.com/<your-username>/project.git
    cd project
    ```

3.  **Add the Original Repository as "Upstream":**
    *   This is crucial for keeping your fork synced with the original project.
    ```bash
    git remote add upstream https://github.com/owner/project.git
    ```

### **Phase 2: The Contribution Cycle (For Every Change)**

1.  **Sync Your Fork:**
    *   Before starting new work, ensure your `main` branch matches the upstream project.
    ```bash
    git checkout main
    git pull upstream main
    git push origin main
    ```

2.  **Create a Feature Branch:**
    *   Never work on `main`. Create a new branch with a descriptive name.
    ```bash
    git checkout -b feat/add-user-profile-page
    ```

3.  **Make & Commit Changes:**
    *   After making your code changes, commit them with a clear, conventional message.
    ```bash
    git add .
    git commit -m "feat(profile): add user profile page and API endpoint"
    ```

4.  **Push to Your Fork:**
    ```bash
    # The -u flag sets the upstream for this branch so you can just `git push` next time.
    git push -u origin feat/add-user-profile-page
    ```

5.  **Open the Pull Request:**
    *   Go to the original project's repository on GitHub.
    *   Click the **"Compare & pull request"** button in the yellow banner.
    *   Ensure the base repository is the original project and the head repository is your fork.
    *   Write a clear description using one of the templates below.

6.  **Clean Up After Merging:**
    *   After your PR is merged, sync your fork again (Step 1) and then delete the old branch.
    ```bash
    # Delete the local branch
    git branch -d feat/add-user-profile-page
    # Delete the remote branch on your fork
    git push origin --delete feat/add-user-profile-page
    ```

### **Pull Request Message Templates**

#### **Bug Fix Template**
**Title:** `fix(scope): [Brief description of the fix]`
```markdown
**Closes:** #[issue number]

### Description of the Bug
A clear description of the incorrect behavior and how to reproduce it.

### Changes Made
-   Bulleted list explaining *what* was changed and *why*.
-   Example: "Corrected the API endpoint URL in `src/api.js` to prevent 404 errors."

### How to Test
1. Check out this branch.
2. Run `npm install` and `npm run dev`.
3. Verify that the previously buggy feature now works as expected.
```

#### **New Feature Template**
**Title:** `feat(scope): [Brief description of the feature]`
```markdown
### Description of the Feature
A clear description of what this feature adds and why it's valuable.

### Key Changes
-   **Added new component:** `UserProfile.jsx`
-   **Created new API endpoint:** `/api/user/:id`
-   **Updated main layout** to include a link to the profile page.

### Areas for Feedback
-   I'm looking for feedback on the UI implementation for mobile devices.
```---

## 日常 Daily Workflow & Stashing

Commands for everyday use and managing local changes.

### **Pulling Updates with Local Changes (The Safe Way)**

1.  **Stash All Local Changes (Tracked, Untracked, and Staged):**
    *   This saves your work in a temporary, safe place.
    ```shell
    git stash push -u -m "WIP: Refactoring the user service"
    ```

2.  **Pull and Rebase the Upstream Branch:**
    *   Fetches remote changes and places your local commits cleanly on top.
    ```shell
    git pull --rebase
    ```

3.  **Re-apply Your Stashed Changes:**
    *   Restores your work exactly as it was, including staged files.
    ```shell
    git stash pop --index
    ```

4.  **Resolve Conflicts and Push:**
    *   If there are conflicts during the rebase, fix them, then:
    ```shell
    git add <fixed-files>
    git rebase --continue
    ```
    *   Once everything is clean, commit and push your work.

### **Useful Git Configs for Stashing and Rebasing**

```shell
# Always include untracked files in `git stash` by default
git config --global stash.saveIncludeUntracked true

# Automatically stash and re-apply changes during a rebase/pull
git config --global rebase.autoStash true
```

### **Managing Stashes**

```shell
# See what’s in a specific stash, including file diffs and untracked files
git stash show -p -u stash@{0}

# Name your stashes for better organization
git stash push -u -m "fix-menu-layout"
```

---

## ⚠️ History Rewriting (Dangerous Operations)

**WARNING:** These commands rewrite public history. They can be destructive. Use with extreme caution and communicate with your team before using them on shared branches.

### **Removing Large/Sensitive Files with BFG Repo-Cleaner**

BFG is the best tool for removing unwanted data like large files or credentials from your entire repository history.

**1. Prepare the Repository:**
   *   Clone a fresh, bare copy of your repository. This is where the cleaning will happen.
   ```bash
   git clone --bare https://github.com/owner/project.git
   cd project.git
   ```

**2. Run BFG:**
   *   Download `bfg.jar` from the official site.
   *   This command removes the specified file(s) from every commit in your history.
   ```bash
   # Replace 'credentials.json' with the file to delete
   java -jar /path/to/bfg.jar --delete-files 'credentials.json'
   ```

**3. Clean the Repository:**
   *   After BFG runs, finalize the cleaning process.
   ```bash
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

**4. Force-Push the Cleaned History:**
   *   This overwrites the remote repository's history with your cleaned version. **This is the most dangerous step.**
   ```bash
   git push origin --force --all
   git push origin --force --tags
   ```

### **Interactive Rebase (Cleaning Your Commits)**
Use this to edit, squash, or reword commits on your feature branch *before* creating a pull request.

1.  **Start the Interactive Rebase:**
    *   This opens an editor with a list of all commits on your branch since it diverged from `main`.
    ```bash
    git rebase -i main
    ```

2.  **Edit the Commit List:**
    *   In the editor, change `pick` to `squash` (to combine with the previous commit), `reword` (to change the message), or `edit` (to change the content). Save and close the editor.

3.  **Force-Push the Cleaned Branch:**
    *   Because you've rewritten history, you must force-push to your feature branch.
    ```bash
    git push origin your-feature-branch --force
    ```

---

## 🔍 Advanced Inspection & Searching

### **Searching Through History**

```bash
# Search the entire repo's history for a string (e.g., a private key)
git grep "private_key" $(git rev-list --all)

# Search the entire repo's history for a specific filename
git rev-list --all | xargs git grep "credentials.json"
```

### **Finding Large Files**
Quickly scan for blobs over 90MB.

```bash
git rev-list --objects --all | \
  git cat-file --batch-check='%(objectname) %(objecttype) %(objectsize) %(rest)' | \
  awk '$3 > 90000000 {printf "%.2f MB\t%s\n", $3/1048576, $4}'
```

### **List All Root-Owned Files**
Useful for finding permission issues in a repository.

```bash
git ls-files -s | awk '$3 ~ /^0*0?$/ {next} $4 ~ /^<path-to-search>\// {print $4}'
```
---

## 🤖 GitHub CLI & Automation

### **Automatically Setup Upstream Tracking**
Ensures `git push` works on the first try for new branches.

```shell
git config --global push.autoSetupRemote true
```

### **Manage GitHub Auth Scopes**
Refresh your `gh` token with additional permissions.
```bash
gh auth refresh -s workflow,read:gpg_key,admin:public_key
```

### **Get User Info via API**
Quickly get user details using your stored `gh` token.
```bash
GH_TOKEN=$(gh auth token) gh api /user | jq .login
```

### **Automated Changelog Generation (Commitizen)**
`cz-cli` helps enforce conventional commit messages and automates changelog generation.
*   **More Info:** [Commitizen GitHub](https://github.com/commitizen/cz-cli)
*   **Installation:**
    ```bash
    npm install -g commitizen
    ```

---

## 🔧 Troubleshooting & Special Cases

### **Restoring Deleted Files**
1.  **Find the commit where the deletion happened:**
    ```bash
    git log --diff-filter=D --summary
    ```
2.  **Find the parent commit** (the one *before* the deletion). Copy its hash.
3.  **Checkout the deleted file from that parent commit:**
    ```bash
    # git checkout <parent-commit-hash> -- <path/to/deleted/file>
    git checkout a1b2c3d4 -- src/important-file.js
    ```
4.  Commit the restored file.

### **Git LFS (Large File Storage)**

```bash
# List all files currently tracked by LFS
git lfs ls-files

# Start tracking a new file type
git lfs track "*.psd"

# Stop tracking a file type (does not remove from history)
git lfs untrack "*.zip"

# Add the .gitattributes file to track changes
git add .gitattributes

# Clean up old, unreferenced LFS files from your local .git directory
git lfs prune

# Push all LFS objects to the remote
git lfs push --all origin
```

### **Reconnect a Local Directory to a Remote Repo**

1.  **Initialize Git and save current work:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit of existing files"
    ```
2.  **Add the remote and sync:**
    ```bash
    git remote add origin https://github.com/owner/project.git
    # Pull remote changes, allowing unrelated histories to merge
    git pull origin main --allow-unrelated-histories
    # Resolve any merge conflicts, then push
    git push -u origin main
    ```
