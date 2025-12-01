# Troubleshooting Guide

## Sanity Studio Build Errors

### Error: "Could not resolve 'react-is'"

This error occurs when Sanity Studio's build process can't find the `react-is` dependency.

**Solution:**
1. Install the missing dependency:
   ```bash
   npm install react-is styled-components
   ```

2. Clear Vite cache and node_modules cache:
   ```bash
   rm -rf node_modules/.vite
   rm -rf .sanity
   npm cache clean --force
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

4. Restart the Sanity Studio:
   ```bash
   npm run sanity:dev
   ```

### Module Resolution Issues

If you see errors about resolving `@/` imports in Sanity Studio:

**Note:** Sanity Studio runs its own Vite instance and should NOT import from the main app's `src/` directory. The schemas in `sanity/schemas/` should only import from Sanity packages.

**Solution:**
- Ensure no Sanity schema files import from `@/` or `src/`
- Sanity schemas should only import from:
  - `sanity` packages
  - Other files in the `sanity/` directory
  - Node modules

### Port Conflicts

If port 3333 is already in use:

**Solution:**
1. Change the port in `sanity.config.ts`:
   ```ts
   export default defineConfig({
     // ... other config
     server: {
       port: 3334, // or another available port
     },
   })
   ```

2. Or kill the process using port 3333:
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :3333
   taskkill /PID <PID> /F
   ```

### Environment Variables Not Loading

If Sanity Studio can't read environment variables:

**Solution:**
1. Ensure `.env` file exists in the root directory
2. Variables must be prefixed with `VITE_` for Vite to expose them
3. Restart the dev server after changing `.env`

### Build Fails on Vercel

If the build fails on Vercel:

**Solution:**
1. Check Vercel build logs
2. Ensure all environment variables are set in Vercel dashboard
3. Verify `package.json` has all required dependencies
4. Check that `vercel.json` is configured correctly

## Common Issues

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Check that `node_modules` exists and is complete
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Sanity Studio won't start
- Verify you're authenticated: `npm run sanity -- login`
- Check that `sanity.config.ts` has correct project ID and dataset
- Ensure all Sanity packages are installed

### Contact form not sending emails
- Verify `RESEND_API_KEY` is set in environment variables
- Check Vercel function logs for errors
- Ensure the email address is verified in Resend dashboard

### Images not loading from Sanity
- Check CORS settings in Sanity project settings
- Verify image URLs are being generated correctly
- Check browser console for specific errors

