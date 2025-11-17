# GitHub Integration Setup

## Current Status

✅ **Git Repository**: Initialized
✅ **.gitignore**: Configured
⚠️ **GitHub Remote**: Not connected yet

## Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `ttrindy` (or your preferred name)
3. **Don't** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL (e.g., `https://github.com/username/ttrindy.git`)

### 2. Connect Local Repository to GitHub

Run these commands (replace with your actual repository URL):

```bash
# Add remote repository
git remote add origin https://github.com/username/ttrindy.git

# Verify remote was added
git remote -v
```

### 3. Initial Commit and Push

```bash
# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Top Tier Restoration website with Sanity CMS"

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Configure GitHub Secrets (for Vercel deployment)

If you want automatic deployment via GitHub Actions:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_TOKEN` - Get from Vercel Dashboard → Settings → Tokens
   - `VERCEL_ORG_ID` - Get from Vercel Dashboard → Settings → General
   - `VERCEL_PROJECT_ID` - Get from Vercel Dashboard → Project Settings → General
   - `VITE_SANITY_PROJECT_ID` - Your Sanity project ID
   - `VITE_SANITY_DATASET` - Your Sanity dataset (usually "production")
   - `VITE_SANITY_PREVIEW_SECRET` - Optional, for live preview
   - `VITE_SANITY_PREVIEW_TOKEN` - Optional, for live preview

### 5. Vercel GitHub Integration (Recommended)

Instead of GitHub Actions, you can use Vercel's built-in GitHub integration:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically:
   - Deploy on every push to main
   - Create preview deployments for pull requests
   - Set up environment variables

## Current Git Configuration

- **Repository**: Initialized
- **.gitignore**: Configured to exclude:
  - `node_modules/`
  - `.env` files
  - `.sanity/` cache
  - Build outputs (`dist/`)
  - Editor files

## GitHub Workflow

A GitHub Actions workflow file has been created at `.github/workflows/deploy.yml` for automated deployment. This is optional if you're using Vercel's GitHub integration.

## Next Steps

1. Create the GitHub repository
2. Add the remote: `git remote add origin <your-repo-url>`
3. Push the code: `git push -u origin main`
4. Connect to Vercel (either via GitHub integration or manually)

## Notes

- The repository is ready to be pushed to GitHub
- All sensitive files are in `.gitignore`
- Environment variables should be set in Vercel, not committed to Git
- The `.github/workflows/deploy.yml` file is optional if using Vercel's integration

