# Top Tier Restoration - CMS Setup

This project uses Sanity CMS for content management with auto-deployment through Vercel.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with:
```
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
VITE_SANITY_PREVIEW_SECRET=your_preview_secret
VITE_SANITY_PREVIEW_TOKEN=your_preview_token
RESEND_API_KEY=your_resend_api_key
```

### 3. Initialize Sanity Studio
```bash
npm create sanity@latest -- --project o2ba67uq --dataset production --template clean
```

### 4. Run Development Server
```bash
npm run dev
```
Website: http://localhost:8080

### 5. Run Sanity Studio
```bash
npm run sanity:dev
```
Studio: http://localhost:3333/studio

## Project Structure

```
TTR/
├── api/                    # Vercel serverless functions
│   └── contact.ts         # Contact form API endpoint
├── sanity/                 # Sanity CMS configuration
│   ├── schemas/           # Content type schemas
│   │   ├── project.ts
│   │   ├── blogPost.ts
│   │   └── category.ts
│   └── lib/               # Sanity utilities
│       ├── client.ts
│       ├── image.ts
│       └── queries.ts
├── src/
│   ├── pages/             # Page components
│   │   ├── Index.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   └── About.tsx
│   └── lib/
│       └── sanity.ts       # Sanity data fetching
└── vercel.json            # Vercel configuration
```

## Content Management

### Adding Projects
1. Go to Sanity Studio → Projects
2. Click "Create new"
3. Fill in:
   - Title
   - Location
   - Date
   - Category (create if needed)
   - Description
   - Upload images
   - Add videos (optional)
   - Mark as "Featured" to show on homepage
4. Click "Publish"

### Adding Blog Posts
1. Go to Sanity Studio → Blog Posts
2. Click "Create new"
3. Fill in:
   - Title
   - Excerpt (short description)
   - Author
   - Main Image
   - Body (rich text content)
   - Tags (optional)
4. Click "Publish"

### Creating Categories
1. Go to Sanity Studio → Categories
2. Create categories like:
   - Water Damage
   - Fire Damage
   - Storm Damage
   - Remodeling
3. Add icon name (Lucide icon, e.g., "Droplets", "Flame")

## Deployment

### Vercel Setup
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Auto-Deploy on Content Publish
1. In Vercel: Settings → Git → Deploy Hooks → Create hook
2. In Sanity: Settings → API → Webhooks → Add webhook
3. Point webhook to Vercel deploy hook URL
4. Set trigger: "Document published" and "Document unpublished"

## Features

- ✅ Headless CMS with Sanity
- ✅ Live preview while editing
- ✅ Auto-deploy on publish
- ✅ Project gallery with detail pages
- ✅ Blog with detail pages
- ✅ Contact form with Resend email
- ✅ Responsive design
- ✅ Branded styling

## Domain

Temporary domain: ttrindy.com (to be confirmed)

## Contact Form

Contact form sends emails to: thmsbnsn@bnsnsolutions.com (temporary, not displayed on site)

## Support

For issues or questions, contact the development team.

