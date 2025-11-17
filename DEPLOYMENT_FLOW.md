# Deployment Flow Explanation

## How It Works

### The Flow: GitHub → Vercel (Not Vercel → GitHub)

```
Local Machine → GitHub → Vercel
     ↓            ↓         ↓
  npm run    Push code   Auto-deploy
   build     (webhook)    (builds & serves)
```

## Setup Options

### Option 1: Vercel GitHub Integration (Recommended - Easiest)

**This is the standard way and requires NO manual webhook setup.**

1. **Connect GitHub to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel automatically:
     - ✅ Sets up GitHub webhook
     - ✅ Configures deployment settings
     - ✅ Deploys on every push to main/master

2. **That's it!** No manual webhook configuration needed.

**How it works:**
- You push to GitHub → GitHub sends webhook to Vercel → Vercel deploys

### Option 2: Manual Webhook Setup (If Not Using GitHub Integration)

If you're not using Vercel's GitHub integration, you can set up webhooks manually:

1. **Get Vercel Deploy Hook:**
   - Vercel Dashboard → Project Settings → Git → Deploy Hooks
   - Create new deploy hook
   - Copy the hook URL (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)

2. **Add to GitHub:**
   - GitHub → Repository Settings → Webhooks → Add webhook
   - Paste Vercel deploy hook URL
   - Content type: `application/json`
   - Events: "Just the push event"
   - Active: ✅

**But this is unnecessary if you use Option 1!**

## What About Sanity → Vercel?

If you want Sanity CMS to trigger Vercel deployments when content is published:

1. **Get Vercel Deploy Hook:**
   - Vercel Dashboard → Project Settings → Git → Deploy Hooks
   - Create deploy hook
   - Copy URL

2. **Add to Sanity:**
   - Sanity Studio → Settings → API → Webhooks
   - Add webhook
   - URL: Your Vercel deploy hook URL
   - Trigger: "Document published" and "Document unpublished"

This way, when you publish content in Sanity, it triggers Vercel to rebuild.

## Summary

### ❌ You DON'T Need:
- Deploy hook FROM Vercel TO GitHub
- Manual webhook setup (if using Vercel GitHub integration)

### ✅ You DO Need:
- **GitHub → Vercel connection** (automatic with Vercel GitHub integration)
- **OR** Manual webhook: GitHub → Vercel (if not using integration)
- **Optional**: Sanity → Vercel deploy hook (for content-triggered deployments)

## Recommended Setup

**Use Vercel's GitHub Integration:**
1. Connect your GitHub repo to Vercel
2. Vercel handles everything automatically
3. Every push to main/master = automatic deployment
4. No manual webhook configuration needed

**Then optionally add Sanity webhook:**
- Only if you want content changes to trigger deployments
- Not required - you can manually trigger via `npm run build`

## Current Setup

Your `npm run build` command:
1. Builds the project
2. Pushes to GitHub
3. GitHub webhook triggers Vercel (if connected)
4. Vercel automatically deploys

No additional configuration needed if you use Vercel's GitHub integration!

