# ⚡ Quick Fix: Schemas Not Loading in Sanity

## Immediate Steps to Fix:

### 1. **Restart Sanity Studio** (Most Important!)

```bash
# Stop the current Sanity Studio (Ctrl+C in terminal)
# Then restart:
npm run sanity:dev
```

### 2. **Hard Refresh Browser**
- Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Or close and reopen the browser tab

### 3. **Check What's Fixed**
I've already fixed the schema import order in `sanity/schemas/index.ts`. Object types now come first, which is required.

### 4. **Verify in Studio**
After restarting, you should see in Sanity Studio:
- ✅ **Site Settings** (in Content section)
- ✅ **Pages** folder with:
  - Home Page
  - About Page
  - Services Page
- ✅ **Projects**, **Blog Posts**, **Categories** (existing)

## If Still Not Working:

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for red errors
4. Share any errors you see

### Check Terminal Output
Look at the terminal where `npm run sanity:dev` is running for any error messages.

### Verify Files Exist
Make sure these directories exist:
- `sanity/schemas/objects/` (with 5 files)
- `sanity/schemas/singletons/` (with 3 files)

## Common Causes:

1. **Studio not restarted** - Most common! ⚠️
2. **Browser cache** - Hard refresh needed
3. **Import order** - ✅ Already fixed
4. **Syntax errors** - Check terminal/console

Try restarting first - that fixes it 90% of the time!

