# Build and Deploy Setup

## Overview

The `npm run build` command now performs a complete build and deployment workflow:

1. ✅ Builds the Vite project
2. ✅ Builds/updates Sanity Studio
3. ✅ Commits changes to Git
4. ✅ Pushes to GitHub
5. ✅ Triggers Vercel deployment via GitHub webhook

## Usage

### Basic Build and Deploy

```bash
npm run build
```

This will:
- Build your Vite application
- Build Sanity Studio
- Commit any changes
- Push to GitHub (main/master branch)
- Trigger Vercel deployment automatically

### Build Only (No Git Operations)

If you just want to build without pushing:

```bash
npm run build:only
```

### Manual Deploy Script (PowerShell)

On Windows, you can also run the PowerShell script directly:

```bash
npm run build:deploy
```

## Prerequisites

### 1. Git Repository Setup

Make sure your Git repository is initialized and connected to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add GitHub remote
git remote add origin https://github.com/username/ttrindy.git

# Set default branch
git branch -M main
```

### 2. Vercel GitHub Integration

**Option A: Automatic Integration (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically:
   - Set up webhooks
   - Deploy on every push to main
   - Create preview deployments for PRs

**Option B: Manual Webhook Setup**

If you prefer manual setup:

1. In Vercel Dashboard → Project Settings → Git → Deploy Hooks
2. Create a new deploy hook
3. Copy the hook URL
4. In GitHub → Repository Settings → Webhooks → Add webhook
5. Paste the Vercel deploy hook URL
6. Set events: "Just the push event"
7. Save

### 3. Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_PREVIEW_SECRET` (optional)
- `VITE_SANITY_PREVIEW_TOKEN` (optional)
- `RESEND_API_KEY`

## How It Works

### Local Build Process

1. **Build Vite Project**: Creates production build in `dist/`
2. **Build Sanity Studio**: Creates studio build (if configured)
3. **Git Operations**:
   - Stages all changes
   - Commits with timestamp
   - Pushes to GitHub

### GitHub → Vercel Flow

1. **Push to GitHub**: Triggers webhook
2. **Vercel Webhook**: Receives push notification
3. **Automatic Build**: Vercel pulls latest code
4. **Deploy**: Builds and deploys to production

### GitHub Actions (Alternative)

If you prefer GitHub Actions instead of Vercel's built-in integration:

1. The workflow file (`.github/workflows/deploy.yml`) is already configured
2. Add secrets in GitHub → Settings → Secrets and variables → Actions:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `RESEND_API_KEY`

## Troubleshooting

### "Git repository not initialized"

```bash
git init
git remote add origin <your-github-repo-url>
```

### "No GitHub remote configured"

```bash
git remote add origin https://github.com/username/ttrindy.git
git remote -v  # Verify it was added
```

### "Push failed"

- Check your GitHub credentials
- Ensure you have push access to the repository
- Verify the branch name (main or master)

### Vercel Not Deploying

1. Check Vercel Dashboard → Deployments
2. Verify GitHub integration is connected
3. Check webhook status in GitHub Settings → Webhooks
4. Ensure environment variables are set in Vercel

### Sanity Studio Build Fails

This is non-critical - the script will continue even if Sanity Studio build fails. To fix:

```bash
npm run sanity:dev  # Test studio locally
npm run sanity:deploy  # Deploy studio separately
```

## Scripts Reference

- `npm run build` - Full build and deploy workflow
- `npm run build:only` - Build Vite project only
- `npm run build:deploy` - Run PowerShell deploy script
- `npm run sanity:build` - Build Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio to Sanity hosting

## Notes

- The build script automatically detects your current Git branch
- Changes are committed with a timestamp
- The script will continue even if some steps fail (with warnings)
- Vercel deployment happens automatically via GitHub webhook
- No manual intervention needed after initial setup

