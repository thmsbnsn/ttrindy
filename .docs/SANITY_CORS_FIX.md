# Fixing CORS Errors - Sanity CMS

## Problem
Your website is showing "No blog posts" even though you have 8 published blog posts in Sanity Studio. The browser console shows CORS errors blocking requests to Sanity API.

## Root Cause
Sanity requires you to configure allowed CORS origins in your project settings. By default, only localhost is allowed, so your Vercel deployment is being blocked.

## Solution: Add CORS Origins in Sanity Dashboard

### Step 1: Access Sanity Project Settings

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Log in with your Sanity account
3. Select your project: **o2ba67uq** (Top Tier Restoration)

### Step 2: Configure CORS Origins

1. In your project dashboard, click **API** in the left sidebar
2. Scroll down to **CORS origins** section
3. Click **"Add CORS origin"** or **"Edit"** if origins already exist

### Step 3: Add Your Vercel Domain

Add these origins (one at a time):

**For Production:**
- **Origin:** `https://ttrindy.vercel.app`
- **Allow credentials:** ✅ Checked (if needed)
- Click **"Save"**

**For Preview Deployments:**
- **Origin:** `https://*.vercel.app` (wildcard for all Vercel preview URLs)
- **Allow credentials:** ✅ Checked (if needed)
- Click **"Save"**

**For Development (if not already added):**
- **Origin:** `http://localhost:8080`
- **Allow credentials:** ✅ Checked
- Click **"Save"**

### Step 4: Verify Settings

Your CORS origins should look like:
```
✅ https://ttrindy.vercel.app
✅ https://*.vercel.app
✅ http://localhost:8080
```

### Step 5: Test

1. Wait 1-2 minutes for changes to propagate
2. Refresh your Vercel deployment
3. Check the blog page - posts should now load!

## Alternative: If You Can't Access Sanity Dashboard

If you don't have access to the Sanity dashboard, you'll need to:

1. Contact the project owner/admin
2. Ask them to add the CORS origins listed above
3. Or request admin access to the project

## Troubleshooting

### Still Getting CORS Errors?

1. **Check the exact domain** in the error message
   - The error shows: `ttrindy-fyswfsr0g-thomas-projects-6401cf21.vercel.app`
   - Make sure you add the wildcard `https://*.vercel.app` to catch all preview URLs

2. **Clear browser cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check Sanity project ID**
   - Verify it matches: `o2ba67uq`
   - Check in `sanity.config.ts` and environment variables

4. **Verify dataset name**
   - Should be: `production`
   - Check in `sanity.config.ts` and environment variables

### Common CORS Origin Patterns

- Production: `https://ttrindy.vercel.app`
- Preview: `https://*.vercel.app` (wildcard)
- Custom domain: `https://yourdomain.com`
- Development: `http://localhost:8080`

## Additional Notes

- CORS changes take effect immediately but may take 1-2 minutes to propagate
- You can add multiple origins
- Wildcards (`*`) are supported for preview deployments
- Make sure to include the protocol (`https://` or `http://`)

## After Fixing CORS

Once CORS is configured:
1. Your blog posts will load on the website
2. Projects will load in the gallery
3. All Sanity content will be accessible from your Vercel deployment

If you need help accessing the Sanity dashboard or have questions, let me know!

