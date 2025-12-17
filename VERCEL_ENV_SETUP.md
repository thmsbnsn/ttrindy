# 🔧 Vercel Environment Variables Setup

Your site needs these environment variables to work properly with Sanity CMS.

---

## Required Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### 1. Sanity Configuration

```bash
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
```

### 2. Resend API (for contact form)

```bash
RESEND_API_KEY=your_resend_api_key_here
```

---

## How to Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Select your project

2. **Go to Settings:**
   - Click "Settings" in the top navigation
   - Click "Environment Variables" in the left sidebar

3. **Add Each Variable:**
   - Click "Add New"
   - **Name:** `VITE_SANITY_PROJECT_ID`
   - **Value:** `o2ba67uq`
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

4. **Repeat for each variable:**
   - `VITE_SANITY_DATASET` = `production`
   - `RESEND_API_KEY` = (get from resend.com)

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click ⋯ (three dots) on latest deployment
   - Click "Redeploy"
   - **Uncheck** "Use existing Build Cache"
   - Click "Redeploy"

---

## Why These Are Needed

- **VITE_SANITY_PROJECT_ID:** Connects your site to your Sanity CMS
- **VITE_SANITY_DATASET:** Which Sanity dataset to use (production vs staging)
- **RESEND_API_KEY:** Sends contact form emails

Without these, the app can't fetch content from Sanity and the construction page won't render properly.

---

## Quick Fix for Now

If you want the site live immediately:

**Option 1: Keep Construction Mode Off**
- In Sanity Studio: Set "Construction Mode" to OFF
- Site will be fully visible

**Option 2: Add Environment Variables**
- Add the variables above to Vercel
- Construction mode will work properly
- You can toggle it on/off in Sanity as needed

---

## Verify Environment Variables Are Set

After adding them:
1. Go to Settings → Environment Variables
2. You should see all 3 variables listed
3. Redeploy the site
4. Test both with construction mode ON and OFF

