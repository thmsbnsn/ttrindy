# ⚡ Quick Fix: Schemas Not Loading in Sanity

## Immediate Steps to Fix:

### 0. **Verify Configuration** (Do This First!)

**Critical Check:** Make sure `sanity.config.ts` is properly configured:

```typescript
// sanity.config.ts should have:
import { schemaTypes } from './sanity/schemas'
import structure from './sanity/structure'

// And in the config:
schema: {
  types: schemaTypes,  // NOT empty array!
}
```

If your config has `schema: { types: [] }`, the schemas won't load!

### 1. **Restart Sanity Studio** (Most Important!)

**Windows PowerShell:**
```powershell
# Stop the current Sanity Studio (Ctrl+C in terminal)
# Then restart:
npm run sanity:dev
```

**Alternative (if navigating first):**
```powershell
cd C:\Users\tlben\Desktop\TTR
npm run sanity:dev
```

**Note:** In PowerShell, don't use `&&` - use separate commands or `;` instead.

### 2. **Hard Refresh Browser**
- Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Or close and reopen the browser tab

### 3. **Schema Import Order**
The schema import order in `sanity/schemas/index.ts` is correct - object types come first, which is required.

### 4. **Verify in Studio**
After restarting, you should see in Sanity Studio:
- ✅ **Site Settings** (in Content section)
- ✅ **Site Under Construction** (singleton)
- ✅ **Pages** folder with:
  - Home Page
  - About Page
  - Services Page
- ✅ **Projects**, **Blog Posts**, **Categories** (existing)

## If Still Not Working:

### Verify System Requirements

Check that your system meets the minimum requirements:

**Windows PowerShell:**
```powershell
# Check Node.js version (should be 18.x or higher)
node -v

# Check npm version (should be 9.x or higher)
node -p "require('child_process').execSync('npm -v').toString().trim()"

# Or if PowerShell execution policy allows:
npm -v
```

**Required Versions:**
- ✅ Node.js: 18.x or higher (you have: v22.19.0 ✓)
- ✅ npm: 9.x or higher (you have: 10.9.3 ✓)
- ✅ Sanity: Check `package.json` - should be ^4.19.0 or compatible

**Check Sanity Version in package.json:**
Look for the `sanity` package in dependencies:
```json
"dependencies": {
  "sanity": "^4.19.0"
}
```

If versions are too old, update them:
```powershell
# Update npm to latest
npm install -g npm@latest

# Update Node.js - download from nodejs.org
```

### Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for red errors
4. Share any errors you see

### Check Terminal Output
Look at the terminal where `npm run sanity:dev` is running for any error messages.

### Verify Files Exist

**Windows PowerShell:**
```powershell
# Check if directories exist
Test-Path sanity\schemas\objects
Test-Path sanity\schemas\singletons

# List files in directories
Get-ChildItem sanity\schemas\objects
Get-ChildItem sanity\schemas\singletons
```

Make sure these directories exist:
- `sanity/schemas/objects/` (with 5 files: navigationItem, serviceCard, featureCard, statCard, seoFields)
- `sanity/schemas/singletons/` (with 4 files: homePage, aboutPage, servicesPage, constructionPage)

## Common Causes:

1. **Empty sanity.config.ts** - CRITICAL! Config must import schemaTypes ⚠️
2. **Studio not restarted** - Most common! ⚠️
3. **Browser cache** - Hard refresh needed
4. **Syntax errors** - Check terminal/console

**PowerShell Command Issues:**
- Don't use `&&` - use `;` or separate commands
- Use backslashes `\` in paths, or forward slashes `/` (both work)
- Use `Get-ChildItem` instead of `ls` in some PowerShell versions

Try checking the config first, then restarting - that fixes most issues!

