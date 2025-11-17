# Git Workflow Guide

## Current Status

Your project has Git initialized, but you need to connect it to GitHub.

## Step-by-Step Git Setup

### 1. Initialize Git (Already Done ✅)

```bash
git init
```
✅ This is already completed in your project.

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `ttrindy` (or your preferred name)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"
6. Copy the repository URL (e.g., `https://github.com/username/ttrindy.git`)

### 3. Connect Local Repository to GitHub

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/username/ttrindy.git

# Verify it was added
git remote -v
```

You should see:
```
origin  https://github.com/username/ttrindy.git (fetch)
origin  https://github.com/username/ttrindy.git (push)
```

### 4. Set Default Branch

```bash
# Set main as default branch
git branch -M main
```

### 5. Initial Commit and Push

```bash
# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Top Tier Restoration website with Sanity CMS"

# Push to GitHub
git push -u origin main
```

## Daily Git Workflow

### Option 1: Using `npm run build` (Automated)

This is the easiest way - it handles everything:

```bash
npm run build
```

**What it does:**
1. ✅ Builds Vite project
2. ✅ Builds Sanity Studio
3. ✅ Stages all changes (`git add .`)
4. ✅ Commits with timestamp (`git commit -m "Build: 2024-11-17 10:30:00"`)
5. ✅ Pushes to GitHub (`git push origin main`)
6. ✅ Triggers Vercel deployment (via GitHub webhook)

### Option 2: Manual Git Commands

If you prefer manual control:

```bash
# 1. Check what changed
git status

# 2. Stage specific files
git add src/pages/About.tsx
# OR stage all changes
git add .

# 3. Commit changes
git commit -m "Update about page content"

# 4. Push to GitHub
git push origin main
```

## Git Branch Strategy

### Main Branch (Production)

```bash
# Work on main branch (default)
git checkout main

# Or create feature branch
git checkout -b feature/new-page
# Make changes...
git add .
git commit -m "Add new page"
git push origin feature/new-page
```

### Recommended: Feature Branches

For larger changes, use feature branches:

```bash
# Create and switch to new branch
git checkout -b feature/contact-form-update

# Make your changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Update contact form validation"

# Push branch to GitHub
git push origin feature/contact-form-update

# Create Pull Request on GitHub
# After PR is merged, switch back to main
git checkout main
git pull origin main
```

## Common Git Commands

### Viewing Status

```bash
# See what files changed
git status

# See detailed changes
git diff

# See commit history
git log --oneline
```

### Undoing Changes

```bash
# Unstage files (keep changes)
git reset

# Discard changes to a file
git checkout -- filename.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Working with Remotes

```bash
# View remotes
git remote -v

# Change remote URL
git remote set-url origin https://github.com/new-url.git

# Remove remote
git remote remove origin

# Fetch latest from GitHub
git fetch origin

# Pull latest changes
git pull origin main
```

## Git Ignore

Your `.gitignore` is already configured to exclude:
- `node_modules/` - Dependencies
- `.env` files - Environment variables (sensitive)
- `dist/` - Build output
- `.sanity/` - Sanity cache
- `.materials/` and `.snapshots/` - Legacy files

## Git Workflow with Build Script

### Automatic Workflow (Recommended)

```bash
# Make changes to your code
# ... edit files ...

# Run build (handles everything)
npm run build
```

**This automatically:**
1. Builds your project
2. Commits changes
3. Pushes to GitHub
4. Triggers Vercel deployment

### Manual Workflow

```bash
# Make changes
# ... edit files ...

# Build only (no git operations)
npm run build:only

# Then manually commit and push
git add .
git commit -m "Your commit message"
git push origin main
```

## Troubleshooting

### "fatal: not a git repository"

```bash
# Initialize git
git init
```

### "fatal: remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/username/repo.git
```

### "error: failed to push"

**Check authentication:**
- GitHub requires authentication (personal access token or SSH key)
- Set up: GitHub → Settings → Developer settings → Personal access tokens

**Or use GitHub CLI:**
```bash
gh auth login
```

### "Your branch is ahead of origin"

```bash
# Push your commits
git push origin main
```

### "Your branch is behind origin"

```bash
# Pull latest changes
git pull origin main
```

## Best Practices

1. **Commit Often**: Small, logical commits are better than large ones
2. **Write Good Commit Messages**:
   - ✅ "Add contact form validation"
   - ❌ "fix stuff"
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Use Feature Branches**: For larger changes, use branches
5. **Don't Commit Secrets**: `.env` files are in `.gitignore` for a reason

## Integration with Vercel

Once connected to GitHub:
- Every push to `main` branch = Automatic Vercel deployment
- Pull Requests = Preview deployments
- No manual deployment needed!

## Quick Reference

```bash
# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# View remotes
git remote -v

# View branches
git branch
```

## Next Steps

1. ✅ Git is initialized
2. ⏳ Create GitHub repository
3. ⏳ Connect remote: `git remote add origin <your-repo-url>`
4. ⏳ Initial commit and push
5. ✅ Then use `npm run build` for automated workflow

