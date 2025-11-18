# Top Tier Restoration

Professional home restoration and remodeling services website for Top Tier Restoration.

## 🏠 About

Top Tier Restoration is a full-service restoration company specializing in:
- Water Damage Restoration
- Fire Damage Restoration
- Storm Damage Repair
- Complete Remodeling Services

## 🚀 Features

- **Modern React Application** - Built with React 18, TypeScript, and Vite
- **Headless CMS** - Sanity CMS for easy content management with custom schemas
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Custom Typography** - Oswald (hero), Coldiac (headings), Inter (body text)
- **Project Gallery** - Dynamic project showcase with detail pages
- **Blog System** - Content management for blog posts with SEO-friendly slugs
- **Contact Form** - Integrated email service via Resend
- **Legal Pages** - Privacy Policy and Terms of Service for compliance
- **Accessibility** - WCAG compliant with focus states and semantic HTML
- **Performance Optimized** - Image loading optimization and reduced motion support
- **Auto-Deployment** - Automatic Vercel deployment on content publish

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite 7
- **Styling**: Tailwind CSS, shadcn/ui components
- **Typography**: Oswald, Coldiac, Inter (self-hosted WOFF2 fonts)
- **CMS**: Sanity v4 with custom schemas
- **Routing**: React Router v6
- **Email**: Resend API
- **Deployment**: Vercel (auto-deploy on push)
- **Legal**: Privacy Policy & Terms of Service pages

## 📦 Getting Started

### Prerequisites

- Node.js 20+ and npm
- Sanity account (for CMS)
- Resend account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TTR
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_PREVIEW_SECRET=your_preview_secret
   VITE_SANITY_PREVIEW_TOKEN=your_preview_token
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Website will be available at: http://localhost:8080

5. **Start Sanity Studio** (in a separate terminal)
   ```bash
   npm run sanity:dev
   ```
   Studio will be available at: http://localhost:3333/studio

## 📝 Content Management

Content is managed through Sanity Studio. Access it at `/studio` when running locally or deploy it separately.

### Sanity Studio Content Types

1. **Site Settings** (Singleton)
   - Logo upload
   - Phone number (for CTAs)
   - Email (for contact form)
   - Primary, Secondary, and CTA color pickers

2. **Projects**
   - Title, location, date (chronological ordering)
   - Main image (for card display)
   - Additional images (for detail page)
   - Short description
   - Full description (rich text)
   - Videos (optional)
   - Category reference

3. **Blog Posts**
   - Title, author (defaults to "Top Tier Team")
   - Date of posting (chronological ordering)
   - Slug (includes title + location context)
   - Short description
   - Main image (for card display)
   - Additional images (for detail page)
   - Blog content (rich text)
   - Tags (optional)

4. **Categories**
   - Used to categorize projects
   - Examples: Water Damage, Fire Damage, Storm Damage, Remodeling

## 🚢 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Sanity Studio Deployment

Deploy the studio separately:
```bash
npm run sanity:deploy
```

## 📁 Project Structure

```
TTR/
├── api/                    # Vercel serverless functions
│   └── contact.ts          # Contact form endpoint
├── sanity/                 # Sanity CMS configuration
│   ├── schemas/            # Content type schemas
│   │   ├── siteSettings.ts # Site configuration
│   │   ├── project.ts      # Project schema
│   │   ├── blogPost.ts     # Blog post schema
│   │   ├── category.ts     # Category schema
│   │   └── index.ts        # Schema exports
│   ├── lib/                # Sanity utilities
│   └── structure.ts        # Sidebar structure config
├── src/
│   ├── assets/             # Images and fonts
│   │   ├── brand/          # Brand assets (logo, icon)
│   │   └── pagesImages/    # Page-specific images
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── WhyUs.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── NotFound.tsx
│   ├── lib/                # Utilities
│   │   ├── sanity.ts       # Sanity data fetching
│   │   └── utils.ts        # Helper functions
│   └── types/              # TypeScript types
└── public/                 # Static assets
    ├── fonts/              # Self-hosted fonts (WOFF2)
    └── robots.txt          # SEO robots file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (http://localhost:8080)
- `npm run build` - Build for production (includes build-and-deploy script)
- `npm run build:only` - Build Vite project only
- `npm run preview` - Preview production build
- `npm run sanity:dev` - Start Sanity Studio (http://localhost:3333/studio)
- `npm run sanity:deploy` - Deploy Sanity Studio to sanity.studio
- `npm run sanity:build` - Build Sanity Studio
- `npm run lint` - Run ESLint

## 🎨 Design System

### Typography
- **Oswald** - Hero H1 headings only (uppercase, bold, min 32px)
- **Coldiac** - Section headings (H2-H6), card titles, subheadings
- **Inter** - Body text, UI elements, navigation, buttons, forms

### Colors
- **Primary**: Bright cyan-blue (#00AEEF) - Brand color
- **Accent**: Vibrant orange (#FF6B35) - CTAs and emergency badges
- **Secondary**: Light grays for backgrounds and borders

### Accessibility
- Visible focus indicators for keyboard navigation
- Semantic HTML (dl/dt/dd for stats)
- Clickable phone numbers (tel: links)
- Reduced motion support
- Proper alt text for images

## 📄 Legal Pages

- **Privacy Policy** - `/privacy-policy` - Data collection and usage policies
- **Terms of Service** - `/terms-of-service` - Service terms and conditions

Both pages are accessible from the footer and comply with Indiana business requirements.

## 📄 License

All rights reserved. Top Tier Restoration © 2025

## 🤝 Support

For questions or support, contact the development team.
