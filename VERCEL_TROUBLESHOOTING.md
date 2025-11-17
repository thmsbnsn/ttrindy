# Vercel Build Error: package.json Not Found

## Error
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, open '/vercel/path0/package.json'
```

## Common Causes & Solutions

### 1. Root Directory Setting (Most Common)

Vercel might be looking in the wrong directory. Check your Vercel project settings:

**Fix:**
1. Go to Vercel Dashboard → Your Project → Settings → General
2. Under "Root Directory", make sure it's set to:
   - **`.`** (dot - means root of repository)
   - Or leave it **empty/blank**
3. Save and redeploy

### 2. Files Not Pushed to GitHub

Make sure `package.json` is actually in your GitHub repository.

**Check:**
1. Go to your GitHub repository: `https://github.com/thmsbnsn/ttrindy`
2. Verify `package.json` exists in the root
3. If missing, push it:
   ```bash
   git add package.json
   git commit -m "Add package.json"
   git push origin main
   ```

### 3. Repository Structure Issue

If your project is in a subdirectory, you need to set the root directory.

**Fix:**
- Vercel Dashboard → Settings → General → Root Directory
- Set to the folder containing `package.json`
- Example: If package.json is in `TTR/`, set root to `TTR`

### 4. Build Command Issue

The build command might be running from wrong directory.

**Current vercel.json:**
```json
{
  "buildCommand": "npm run build:only",
  "installCommand": "npm install"
}
```

This should work, but verify in Vercel Dashboard:
- Build Command: `npm run build:only`
- Install Command: `npm install`
- Output Directory: `dist`

## Step-by-Step Fix

### Step 1: Verify Files Are in GitHub

```bash
# Check what's in your repo
git ls-files | grep package.json

# If missing, add and push
git add package.json
git commit -m "Ensure package.json is committed"
git push origin main
```

### Step 2: Check Vercel Root Directory

1. Vercel Dashboard → Project Settings → General
2. **Root Directory**: Should be `.` or empty
3. **Framework Preset**: Should be `Vite`
4. Save changes

### Step 3: Verify Build Settings

In Vercel Dashboard → Settings → General:

- **Build Command**: `npm run build:only`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Step 4: Redeploy

1. Go to Deployments tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger rebuild

## Quick Fix Commands

```bash
# Ensure package.json is tracked
git add package.json
git commit -m "Fix: Ensure package.json is in repo"
git push origin main
```

## Verify Repository Structure

Your GitHub repo should have this structure:
```
ttrindy/
├── package.json          ← Must be here
├── package-lock.json
├── vercel.json
├── vite.config.ts
├── src/
├── sanity/
└── ...
```

## Alternative: Manual Root Directory

If your repo structure is different, set root directory in Vercel:

1. Vercel Dashboard → Settings → General
2. Root Directory: `TTR` (or whatever folder contains package.json)
3. Save and redeploy

## Still Not Working?

1. **Check Vercel Build Logs**: Look for the exact path it's checking
2. **Verify GitHub**: Make sure all files are actually in the repository
3. **Reconnect Repository**:
   - Vercel Dashboard → Settings → Git
   - Disconnect and reconnect the repository

## Expected File Locations

Vercel should find these files in the root:
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `vercel.json`
- ✅ `vite.config.ts`
- ✅ `src/` directory
- ✅ `sanity/` directory

