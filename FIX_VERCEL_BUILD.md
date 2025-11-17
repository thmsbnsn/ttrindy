# Fix Vercel Build Error: package.json Not Found

## The Problem

Vercel error: `ENOENT: no such file or directory, open '/vercel/path0/package.json'`

This means Vercel can't find your `package.json` file.

## Solution Steps

### Step 1: Ensure Files Are Committed to Git

```bash
# Check if package.json is tracked
git ls-files package.json

# If it shows nothing, add it
git add package.json package-lock.json vercel.json
git commit -m "Add package.json and config files"
git push origin main
```

### Step 2: Check Vercel Root Directory

**In Vercel Dashboard:**

1. Go to: **Project Settings → General**
2. Find **"Root Directory"** setting
3. Set it to: **`.`** (just a dot) or leave it **empty/blank**
4. Click **Save**

### Step 3: Verify Build Settings

In **Vercel Dashboard → Settings → General**, verify:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build:only`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (or blank)

### Step 4: Verify Files Are in GitHub

1. Go to: `https://github.com/thmsbnsn/ttrindy`
2. Check that these files exist in the **root** of the repository:
   - ✅ `package.json`
   - ✅ `package-lock.json`
   - ✅ `vercel.json`
   - ✅ `vite.config.ts`
   - ✅ `src/` folder

### Step 5: Redeploy

After fixing the root directory:
1. Go to **Vercel Dashboard → Deployments**
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger a new build

## Quick Fix Commands

Run these to ensure everything is committed:

```bash
# Stage all files
git add .

# Commit
git commit -m "Fix: Ensure all files are committed for Vercel"

# Push to GitHub
git push origin main
```

## Most Common Fix

**90% of the time, this is the Root Directory setting:**

1. Vercel Dashboard → Settings → General
2. **Root Directory**: Change to `.` or clear it (make it empty)
3. Save
4. Redeploy

## Still Not Working?

If it still fails:

1. **Disconnect and reconnect the repository:**
   - Vercel Dashboard → Settings → Git
   - Disconnect repository
   - Reconnect it
   - This resets all settings

2. **Check the exact error in Vercel logs:**
   - Look at the build logs
   - See what path Vercel is checking
   - Compare with your GitHub repository structure

3. **Verify repository structure matches:**
   - Your local `TTR/` folder should match GitHub root
   - `package.json` should be at the root level in GitHub

