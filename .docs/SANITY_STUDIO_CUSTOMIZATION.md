# Sanity Studio Customization Guide

## Current Customization Setup

We've configured:
1. ✅ Custom logo component (`sanity/components/StudioLogo.tsx`)
2. ✅ Brand colors in theme (`sanity.config.ts`)
3. ✅ Custom CSS styles (`sanity/styles/studio.css`)

## Files Configured

- `sanity.config.ts` - Main config with logo and theme
- `sanity/components/StudioLogo.tsx` - Custom logo component
- `sanity/styles/studio.css` - Custom CSS for branding
- `src/studio.tsx` - Studio entry point (imports CSS)

## To See Changes Take Effect

### If Running Locally:

1. **Stop the current Studio** (Ctrl+C in terminal)
2. **Clear the build cache:**
   ```bash
   npm run clean
   # Or manually:
   rm -rf .sanity
   ```
3. **Restart the Studio:**
   ```bash
   npm run sanity:dev
   ```
4. **Hard refresh your browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

### If Using Deployed Studio (sanity.io):

1. **Rebuild the Studio:**
   ```bash
   npm run sanity:build
   ```
2. **Redeploy:**
   ```bash
   npm run sanity:deploy
   ```
3. **Wait 1-2 minutes** for deployment to complete
4. **Refresh your browser**

## What Should Change

After restarting/redeploying, you should see:

1. **Logo:** "TOP TIER Restoration" with TTR icon in the top-left
2. **Colors:** Brand blue (#00AEEF) used for:
   - Focus states
   - Selection highlights
   - Primary UI elements
   - Links and buttons

## Troubleshooting

### Logo Not Showing

- Check browser console for errors
- Verify `StudioLogo` component is exported correctly
- Make sure `sanity.config.ts` imports it correctly
- Try clearing browser cache

### Colors Not Changing

- The theme CSS variables might need browser refresh
- Check if CSS file is being imported in `studio.tsx`
- Verify theme object in `sanity.config.ts`

### Changes Not Appearing

- **Most common issue:** Studio needs to be rebuilt/restarted
- Clear `.sanity` folder and rebuild
- Check that you're viewing the correct Studio (local vs deployed)

## Verification Checklist

- [ ] Studio restarted/redeployed
- [ ] Browser cache cleared
- [ ] No console errors
- [ ] Logo appears in top-left
- [ ] Brand colors visible in UI

## Need Help?

If customization still doesn't work:
1. Check Sanity Studio version: `npm list sanity`
2. Verify all files are saved
3. Check for TypeScript/build errors
4. Review Sanity v4 documentation for latest API changes

