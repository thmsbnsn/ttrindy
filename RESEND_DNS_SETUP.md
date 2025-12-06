# Resend DNS Setup Guide for Ionos

This guide will help you set up your domain (`ttrindy.com`) in Resend so that the contact form on your website can send emails.

## Step 1: Get DNS Records from Resend

1. Log into your Resend account: https://resend.com
2. Go to **Domains**: https://resend.com/domains
3. Click **"Add Domain"**
4. Enter your domain: `ttrindy.com`
5. Resend will provide you with DNS records that need to be added

## Step 2: Add DNS Records in Ionos

You'll need to add the following types of records (Resend will give you the exact values):

### Required Records:

1. **TXT Record** (for domain verification)
   - Name: `@` or leave blank (depends on Ionos)
   - Value: (provided by Resend)
   - Purpose: Verifies domain ownership

2. **DKIM Records** (for email authentication)
   - Usually 3 CNAME records
   - Name: (provided by Resend, e.g., `resend._domainkey`)
   - Value: (provided by Resend)
   - Purpose: Prevents emails from being marked as spam

3. **SPF Record** (if not already present)
   - Type: TXT
   - Name: `@` or leave blank
   - Value: `v=spf1 include:resend.com ~all`
   - Purpose: Authorizes Resend to send emails on your behalf

4. **DMARC Record** (recommended)
   - Type: TXT
   - Name: `_dmarc`
   - Value: `v=DMARC1; p=none; rua=mailto:Ben@ttrindy.com`
   - Purpose: Email authentication policy

## Step 3: How to Add Records in Ionos

1. Log into your Ionos account
2. Navigate to **Domains** → **ttrindy.com**
3. Click on **DNS** or **DNS Settings**
4. Look for **"Add Record"** or **"Create Record"** button
5. For each record:
   - Select the record type (TXT, CNAME, etc.)
   - Enter the name (leave blank for root domain `@`, or enter the subdomain)
   - Enter the value provided by Resend
   - Set TTL (Time To Live) - default is usually fine (3600 seconds)
   - Click **Save** or **Add**

## Step 4: Verify in Resend

1. After adding all DNS records, go back to Resend
2. Click **"Verify Domain"** or wait for automatic verification
3. DNS propagation can take 5 minutes to 48 hours (usually within 1-2 hours)
4. Once verified, you'll see a green checkmark ✅

## Important Notes:

- **DNS Propagation**: Changes can take up to 48 hours, but usually complete within 1-2 hours
- **TTL**: Lower TTL values (300-600 seconds) make changes propagate faster
- **Record Names**: In Ionos, for root domain records, you may need to:
  - Leave the name field blank, OR
  - Enter `@`, OR
  - Enter just the domain name
  - Check Ionos documentation if unsure

## Troubleshooting:

- If verification fails, double-check that all records match exactly (case-sensitive)
- Make sure there are no extra spaces in the record values
- Wait at least 30 minutes after adding records before checking verification
- Use a DNS checker tool like https://mxtoolbox.com to verify records are live

## After Verification:

Once your domain is verified in Resend:
- The contact form on your website will be able to send emails
- Emails will be sent from: `Ben@ttrindy.com`
- Replies will go directly to the person who submitted the form

## Need Help?

If you encounter any issues:
1. Check Resend's domain status page for specific error messages
2. Verify all DNS records are correctly added in Ionos
3. Wait for DNS propagation to complete
4. Contact your web developer if problems persist

