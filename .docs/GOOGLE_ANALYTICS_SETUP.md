# Google Analytics Setup Guide

## Overview

Google Analytics has been integrated into the Top Tier Restoration website with cookie consent compliance. Analytics will only track users who consent to cookies.

## Setup Steps

### 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name: "Top Tier Restoration"
5. Set up a property:
   - Property name: "Top Tier Restoration Website"
   - Reporting time zone: Eastern Time (Indiana)
   - Currency: USD

### 2. Get Your Measurement ID

1. In Google Analytics, go to **Admin** (gear icon)
2. Under **Property**, click **Data Streams**
3. Click **Add stream** → **Web**
4. Enter:
   - Website URL: `https://ttrindy.vercel.app` (or your domain)
   - Stream name: "Top Tier Restoration Website"
5. Click **Create stream**
6. Copy your **Measurement ID** (starts with `G-`)

### 3. Add Measurement ID to Environment Variables

**For Local Development:**

Add to your `.env` file:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**For Vercel Production:**

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `VITE_GA_MEASUREMENT_ID`
   - **Value:** Your Measurement ID (e.g., `G-XXXXXXXXXX`)
   - **Environment:** Production, Preview, Development (select all)
3. Click **Save**
4. **Redeploy** your application

### 4. Verify Setup

1. Visit your website
2. Accept cookies in the consent banner
3. Navigate through a few pages
4. In Google Analytics, go to **Reports** → **Realtime**
5. You should see your visit appear within 30 seconds

## How It Works

### Cookie Consent Flow

1. **First Visit:** User sees cookie consent banner
2. **User Accepts:** Analytics cookies are enabled, tracking begins
3. **User Declines:** Analytics cookies are disabled, no tracking
4. **Subsequent Visits:** Consent choice is remembered (stored in localStorage)

### What Gets Tracked

- Page views (automatically)
- User interactions (can be added via `trackEvent()`)
- User flow through the website
- Traffic sources
- Device and browser information

### Privacy Compliance

- ✅ Cookie consent required before tracking
- ✅ Users can opt out
- ✅ Consent mode v2 implemented
- ✅ IP anonymization (can be enabled in GA settings)
- ✅ No personal data collected

## Custom Event Tracking

To track custom events (e.g., form submissions, button clicks), use:

```typescript
import { trackEvent } from "@/lib/analytics";

// Example: Track contact form submission
trackEvent("submit", "contact_form", "about_page");
```

## Disabling Analytics (For Testing)

To disable analytics temporarily:
1. Remove or comment out `VITE_GA_MEASUREMENT_ID` from `.env`
2. Or set it to an empty string: `VITE_GA_MEASUREMENT_ID=`

## Privacy Settings in Google Analytics

### Recommended Settings:

1. **IP Anonymization:**
   - Admin → Property → Data Settings → Data Collection
   - Enable "IP anonymization"

2. **Data Retention:**
   - Admin → Property → Data Settings → Data Retention
   - Set to 14 months (or as needed)

3. **User Data Collection:**
   - Admin → Property → Data Settings → Data Collection
   - Review and adjust as needed

## Troubleshooting

### Analytics Not Working

1. **Check Measurement ID:**
   - Verify `VITE_GA_MEASUREMENT_ID` is set correctly
   - Check browser console for errors

2. **Check Cookie Consent:**
   - Analytics only works if user accepted cookies
   - Clear localStorage and test again

3. **Check Browser Extensions:**
   - Ad blockers may block Google Analytics
   - Test in incognito mode

4. **Check Network Tab:**
   - Look for requests to `google-analytics.com`
   - Should see `collect` requests if working

### Cookie Consent Not Showing

- Clear browser localStorage: `localStorage.removeItem("cookie-consent")`
- Refresh the page
- Banner should appear

## Resources

- [Google Analytics Documentation](https://developers.google.com/analytics)
- [Google Analytics Consent Mode](https://developers.google.com/analytics/devguides/collection/ga4/consent-mode)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)

