# Resend Email Setup Guide

This guide will help you set up Resend for the Top Tier Restoration contact form.

## Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **"Create API Key"**
4. Give it a name (e.g., "Top Tier Restoration")
5. Copy the API key (you'll only see it once!)

## Step 3: Set Up Your Domain (Optional but Recommended)

**For Production Use:**

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `ttrindy.com`
4. Resend will provide DNS records to add:
   - **SPF Record** - for email authentication
   - **DKIM Record** - for email signing
   - **DMARC Record** (optional) - for email security

5. Add these DNS records to your domain's DNS settings (wherever you manage DNS)
6. Wait for verification (usually takes a few minutes to 24 hours)

**Note:** For testing, you can use Resend's default domain `onboarding.resend.dev`, but emails may go to spam.

## Step 4: Verify Email Addresses

1. In Resend dashboard, go to **Emails** → **Recipients**
2. Add and verify the recipient email: `thmsbnsn@bnsnsolutions.com`
3. Resend will send a verification email - click the link to verify

## Step 5: Add API Key to Environment Variables

### For Local Development:

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add your Resend API key:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   ```

### For Vercel Production:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Production, Preview, Development (select all)
5. Click **"Save"**
6. **Redeploy** your application for the changes to take effect

## Step 6: Update Email Addresses (If Needed)

The contact form currently sends emails to:
- **From:** `noreply@ttrindy.com` (or use Resend's test domain for testing)
- **To:** `thmsbnsn@bnsnsolutions.com`

To change these:
1. Edit `api/contact.ts`
2. Update the `from` and `to` fields in the email send function
3. Or better yet, use Sanity Site Settings to manage these dynamically

## Step 7: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the About page: `http://localhost:8080/about`
3. Fill out the contact form
4. Submit the form
5. Check:
   - Browser console for any errors
   - Resend dashboard → **Emails** to see sent emails
   - The recipient email inbox

## Troubleshooting

### Emails Not Sending

1. **Check API Key:**
   - Verify `RESEND_API_KEY` is set correctly
   - Make sure there are no extra spaces or quotes
   - Check Vercel function logs for errors

2. **Check Domain Status:**
   - In Resend dashboard → **Domains**, verify domain is verified
   - If using test domain, make sure it's allowed

3. **Check Email Addresses:**
   - Verify recipient email is verified in Resend
   - Check spam folder
   - Try a different email address for testing

4. **Check Vercel Logs:**
   - Go to Vercel dashboard → Your project → **Functions** tab
   - Check `/api/contact` function logs for errors

### Common Errors

- **"Invalid API key"** - Check that your API key is correct and not expired
- **"Domain not verified"** - Add DNS records and wait for verification
- **"Email address not verified"** - Verify the recipient email in Resend dashboard
- **"Rate limit exceeded"** - Free tier has limits; upgrade if needed

## Resend Free Tier Limits

- **3,000 emails/month**
- **100 emails/day**
- Perfect for small businesses and testing

## Upgrading (If Needed)

If you need more emails:
1. Go to Resend dashboard → **Billing**
2. Choose a plan that fits your needs
3. Plans start at $20/month for 50,000 emails

## Security Best Practices

1. **Never commit API keys to Git**
   - Keep `.env` in `.gitignore` (already configured)
   - Use environment variables in Vercel

2. **Rotate API keys periodically**
   - Create new keys in Resend dashboard
   - Update environment variables
   - Delete old keys

3. **Use domain verification**
   - Prevents email spoofing
   - Improves deliverability
   - Builds sender reputation

## Next Steps

Once Resend is set up:
1. Test the contact form thoroughly
2. Monitor email delivery in Resend dashboard
3. Consider setting up email templates for better formatting
4. Add email notifications for form submissions

For more help, visit [Resend Documentation](https://resend.com/docs)

