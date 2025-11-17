# Sanity CMS Setup Guide

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Sanity Studio** (if not already done)
   ```bash
   npm create sanity@latest -- --project o2ba67uq --dataset production --template clean
   ```

3. **Environment Variables**
   Make sure your `.env` file includes:
   ```
   VITE_SANITY_PROJECT_ID=o2ba67uq
   VITE_SANITY_DATASET=production
   VITE_SANITY_PREVIEW_SECRET=preview.secret
   RESEND_API_KEY=your_resend_api_key
   ```

## Running Sanity Studio Locally

To run the Sanity Studio for content management:

```bash
npm run sanity:dev
```

This will start the studio at `http://localhost:3333/studio`

## Deploying Sanity Studio

To deploy the studio to Sanity's hosting:

```bash
npm run sanity:deploy
```

The studio will be available at: `https://your-project.sanity.studio`

## Setting Up Live Preview

1. In Sanity Studio, go to Settings → API → Add CORS origin
2. Add your Vercel deployment URL (e.g., `https://ttrindy.com`)
3. Add `http://localhost:8080` for local development
4. Create a preview secret in Sanity Studio
5. Add the secret to your `.env` as `VITE_SANITY_PREVIEW_SECRET`

## Content Types

### Projects
- Title, Location, Date
- Category (reference to Category)
- Description and Full Description
- Images (array with alt text)
- Videos (array with URLs)
- Featured flag

### Blog Posts
- Title, Excerpt, Author
- Published Date
- Main Image
- Body (rich text)
- Tags

### Categories
- Title, Slug, Description
- Icon name (for Lucide icons)

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `VITE_SANITY_PREVIEW_SECRET`
   - `RESEND_API_KEY`
3. Deploy - Vercel will auto-deploy on every push to main branch

## Auto-Deploy on Sanity Publish

To enable auto-deploy when content is published in Sanity:

1. Go to Vercel Dashboard → Your Project → Settings → Git
2. Enable "Deploy Hooks"
3. Create a new deploy hook
4. In Sanity Studio, go to Settings → Webhooks
5. Add a new webhook pointing to your Vercel deploy hook URL
6. Set trigger to "Document published" and "Document unpublished"

