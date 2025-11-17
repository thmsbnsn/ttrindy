# CMS Implementation Guide

## Overview
The Top Tier Restoration website now uses Sanity CMS for content management, allowing the client to update projects, blog posts, and categories without code changes.

## Architecture

### Content Types

#### Projects
- **Fields**: Title, Slug, Location, Date, Category, Description, Full Description, Images, Videos, Featured flag
- **URL**: `/projects/:slug`
- **Gallery**: `/gallery` (filters by category)

#### Blog Posts
- **Fields**: Title, Slug, Excerpt, Author, Published Date, Main Image, Body (rich text), Tags
- **URL**: `/blog/:slug`
- **Listing**: `/blog`

#### Categories
- **Fields**: Title, Slug, Description, Icon name
- **Used for**: Project categorization and filtering

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env` file:
```
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
VITE_SANITY_PREVIEW_SECRET=preview.secret
VITE_SANITY_PREVIEW_TOKEN=your_token_here
RESEND_API_KEY=your_resend_key
```

### 3. Authenticate with Sanity
```bash
npm run sanity -- login
```

### 4. Run Development
```bash
# Terminal 1: Website
npm run dev

# Terminal 2: Sanity Studio
npm run sanity:dev
```

## Content Management Workflow

### Adding a Project
1. Go to Sanity Studio → Projects
2. Click "Create new"
3. Fill in all required fields
4. Upload images (minimum 1 required)
5. Add videos (optional) - YouTube/Vimeo URLs or direct video links
6. Mark as "Featured" to show on homepage
7. Click "Publish"

### Adding a Blog Post
1. Go to Sanity Studio → Blog Posts
2. Click "Create new"
3. Fill in title, excerpt, author
4. Upload main image
5. Write body content using rich text editor
6. Add tags (optional)
7. Set published date
8. Click "Publish"

### Creating Categories
1. Go to Sanity Studio → Categories
2. Create categories: Water Damage, Fire Damage, Storm Damage, Remodeling
3. Add icon name (Lucide icon): Droplets, Flame, CloudRain, Hammer

## Live Preview

Live preview is configured to show draft content while editing:
- Preview URL: `https://ttrindy.com/projects/:slug?preview=true`
- Preview secret must be set in environment variables

## Auto-Deployment

### Vercel Setup
1. Connect GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Sanity Webhook (Auto-deploy on publish)
1. In Vercel: Settings → Git → Deploy Hooks → Create hook
2. Copy the deploy hook URL
3. In Sanity: Settings → API → Webhooks → Add webhook
4. Paste Vercel deploy hook URL
5. Set triggers: "Document published" and "Document unpublished"
6. Save

## API Endpoints

### Contact Form
- **Endpoint**: `/api/contact`
- **Method**: POST
- **Body**: `{ name, email, phone, message }`
- **Response**: Sends email via Resend to `thmsbnsn@bnsnsolutions.com`

## File Structure

```
sanity/
├── schemas/
│   ├── project.ts      # Project content type
│   ├── blogPost.ts     # Blog post content type
│   ├── category.ts     # Category content type
│   └── index.ts        # Schema exports
└── lib/
    ├── client.ts       # Sanity client configuration
    ├── image.ts        # Image URL builder
    └── queries.ts      # GROQ queries

src/
├── lib/
│   └── sanity.ts       # Data fetching functions
├── types/
│   └── sanity.ts      # TypeScript types
└── pages/
    ├── Gallery.tsx     # Fetches from Sanity
    ├── ProjectDetail.tsx
    ├── Blog.tsx
    └── BlogDetail.tsx

api/
└── contact.ts          # Vercel serverless function
```

## Troubleshooting

### Sanity Studio won't start
- Check environment variables are set
- Run `npm run sanity -- login` to authenticate
- Verify project ID and dataset match

### Images not loading
- Check Sanity project has CORS configured
- Verify image URLs are being generated correctly
- Check browser console for errors

### Contact form not working
- Verify Resend API key is set
- Check Vercel function logs
- Ensure email address is verified in Resend

### Auto-deploy not working
- Verify webhook URL is correct
- Check Vercel deploy logs
- Ensure webhook triggers are set correctly

