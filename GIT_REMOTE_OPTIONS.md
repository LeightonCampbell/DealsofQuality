# Git Remote Options Guide

## Current Setup
- **Remote name:** `origin`
- **Repository:** `https://github.com/LeightonCampbell/DealsofQuality.git`

---

## Option 1: Add a Second Remote (Push to Multiple Repos)

This allows you to push to both repositories simultaneously.

### Steps:
1. Add the new remote with a different name:
```bash
git remote add backup https://github.com/YourUsername/YourNewRepo.git
```

2. Push to the new remote:
```bash
git push backup main
```

3. To push to both remotes:
```bash
git push origin main
git push backup main
```

### View all remotes:
```bash
git remote -v
```

### Remove a remote:
```bash
git remote remove backup
```

---

## Option 2: Change the Existing Remote

Replace the current remote with a new repository.

### Steps:
1. Remove current remote:
```bash
git remote remove origin
```

2. Add new remote:
```bash
git remote add origin https://github.com/YourUsername/YourNewRepo.git
```

3. Push to new remote:
```bash
git push -u origin main
```

---

## Option 3: Push to Different Repo Temporarily

Push to a different repo without changing your remotes.

### Steps:
1. Push directly to a different URL:
```bash
git push https://github.com/YourUsername/YourNewRepo.git main
```

---

## Option 4: Fork/Mirror to Another Repository

Create a complete copy in another repository.

### Steps:
1. Add new remote:
```bash
git remote add mirror https://github.com/YourUsername/YourNewRepo.git
```

2. Push all branches and tags:
```bash
git push mirror --all
git push mirror --tags
```

---

## Common Commands Reference

```bash
# List all remotes
git remote -v

# Add a new remote
git remote add <name> <url>

# Remove a remote
git remote remove <name>

# Rename a remote
git remote rename <old-name> <new-name>

# Change remote URL
git remote set-url origin <new-url>

# Push to specific remote
git push <remote-name> <branch>

# Push to all remotes (requires git config)
git config --add remote.origin.pushurl <another-url>
```

---

## Which Option Should You Choose?

- **Option 1** - If you want to keep both repositories in sync
- **Option 2** - If you're moving to a completely different repository
- **Option 3** - If you just need to push once to another repo
- **Option 4** - If you want a complete backup/mirror
