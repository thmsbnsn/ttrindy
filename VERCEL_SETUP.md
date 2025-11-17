# Vercel Setup Guide

## Framework Setting

**Set Framework to: `Vite`**

Vercel will automatically detect Vite projects, but you can manually set it in the Vercel Dashboard.

## Vercel Dashboard Configuration

### 1. Framework Preset
- **Framework Preset**: `Vite`
- Vercel will automatically detect this from `vercel.json` or you can select it manually

### 2. Build Settings

**Build Command**: `npm run build:only`
- This builds only the Vite project (not the deploy script)
- The deploy script is for local use only

**Output Directory**: `dist`
- This is where Vite outputs the built files

**Install Command**: `npm install`
- Standard npm install

**Development Command**: `npm run dev`
- For Vercel's development preview

### 3. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

**Required:**
- `VITE_SANITY_PROJECT_ID` - Your Sanity project ID
- `VITE_SANITY_DATASET` - Your Sanity dataset (usually "production")
- `RESEND_API_KEY` - Your Resend API key for contact form

**Optional (for live preview):**
- `VITE_SANITY_PREVIEW_SECRET` - Preview secret for draft content
- `VITE_SANITY_PREVIEW_TOKEN` - Preview token for draft content

### 4. Root Directory
- Leave as default (root of repository)

## Automatic Detection

Vercel will automatically:
- ✅ Detect Vite framework from `vercel.json`
- ✅ Use the build command from `vercel.json`
- ✅ Set output directory to `dist`
- ✅ Configure routing for SPA (Single Page Application)

## Manual Override (if needed)

If you need to manually set in Vercel Dashboard:

1. Go to Project Settings → General
2. Under "Build & Development Settings":
   - Framework Preset: **Vite**
   - Build Command: `npm run build:only`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Important Notes

⚠️ **Build Command Difference:**
- **Local**: `npm run build` - Runs full deploy script (build + git push)
- **Vercel**: `npm run build:only` - Only builds the Vite project

This is intentional:
- Local builds push to GitHub and trigger Vercel
- Vercel builds only compile the code (no git operations)

## API Routes

The `api/` folder contains serverless functions that Vercel will automatically deploy:
- `/api/contact` - Contact form endpoint

These are configured in `vercel.json` with proper CORS headers.

## Deployment Flow

1. **Local**: Run `npm run build`
   - Builds Vite project
   - Builds Sanity Studio
   - Commits and pushes to GitHub

2. **GitHub**: Receives push
   - Triggers Vercel webhook

3. **Vercel**: Automatically
   - Pulls latest code
   - Runs `npm run build:only`
   - Deploys to production

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify `npm run build:only` works locally
- Check Vercel build logs

### Framework Not Detected
- Manually select "Vite" in Vercel Dashboard
- Or ensure `vercel.json` has `"framework": "vite"`

### API Routes Not Working
- Verify `api/` folder is in root directory
- Check CORS headers in `vercel.json`
- Ensure function exports default handler

