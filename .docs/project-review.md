# Top Tier Restoration - Project Review

## Project Overview
This document provides a comprehensive review of the Top Tier Restoration website project, including structure, frameworks, assets, code analysis, and design system details.

## 🆕 Recent Updates

### Sanity CMS Integration
- **Headless CMS**: Sanity CMS integrated for content management
- **Content Types**: Site Settings, Projects, Blog Posts, and Categories
- **Custom Schemas**: Site settings singleton, separated main/additional images
- **Sidebar Structure**: Custom ordered sidebar (Site Settings → Projects → Blog Posts → Categories)
- **Live Preview**: Enabled for real-time content preview while editing
- **Auto-Deploy**: Configured for automatic Vercel deployment on content publish

### New Features Added
1. **Site Settings**: Singleton document for logo, contact info, and brand colors
2. **Project Detail Pages**: Dynamic pages at `/projects/:slug` with image/video carousels
3. **Blog Section**: Blog listing page and detail pages at `/blog` and `/blog/:slug`
4. **Contact Form**: Integrated with Resend API for email delivery
5. **Legal Pages**: Privacy Policy and Terms of Service for Indiana compliance
6. **CMS Studio**: Accessible at `/studio` for content management

### Typography System
- **Custom Fonts**: Self-hosted WOFF2 fonts (Oswald, Coldiac, Inter)
- **Font Responsibilities**:
  - Oswald for hero H1 headings only (uppercase, bold, min 32px)
  - Coldiac for section headings (H2-H6)
  - Inter for body text and UI elements

### Accessibility & Performance Improvements
- Visible focus indicators for keyboard navigation
- Semantic HTML (dl/dt/dd for stats)
- Clickable phone numbers (tel: links)
- Reduced motion support
- Hero image loading optimization (eager, high priority)
- Improved alt text for images

### Visual Enhancements
- Enhanced hero overlay (darker, better contrast)
- Backdrop blur on hero content area
- Improved stats display with better hierarchy
- Enhanced service card hover effects
- CTA section with gradient background
- Emergency badge with shadow for prominence

### New Dependencies
- `@sanity/client` - Sanity API client
- `@sanity/image-url` - Image URL builder
- `sanity` - Sanity Studio v4
- `@sanity/preview-url-secret` - Live preview support
- `resend` - Email service
- `@vercel/node` - Vercel serverless functions

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Frameworks & Technologies](#frameworks--technologies)
3. [Assets & Images](#assets--images)
4. [Code Review](#code-review)
5. [Design System](#design-system)
   - [Typography](#typography)
   - [Colors](#colors)
   - [Line Spacing](#line-spacing)
6. [Summary](#summary)

---

## Project Structure

### Directory Layout
```
TTR/
├── .docs/                          # Documentation folder
├── public/                         # Public assets
│   └── robots.txt
├── api/                            # Vercel serverless functions
│   └── contact.ts                  # Contact form API endpoint
├── sanity/                         # Sanity CMS configuration
│   ├── schemas/                    # Content type schemas
│   │   ├── siteSettings.ts         # Site settings (singleton)
│   │   ├── project.ts              # Project schema
│   │   ├── blogPost.ts             # Blog post schema
│   │   ├── category.ts             # Category schema
│   │   └── index.ts                # Schema exports
│   ├── lib/                        # Sanity utilities
│   │   ├── client.ts               # Sanity client setup
│   │   ├── image.ts                 # Image URL builder
│   │   └── queries.ts               # GROQ queries
│   └── structure.ts                # Sidebar structure configuration
├── src/
│   ├── assets/                     # Image and brand assets
│   │   ├── brand/                  # Brand logos and icons
│   │   └── pagesImages/            # Page-specific images
│   ├── components/                 # React components
│   │   ├── ui/                     # shadcn/ui component library
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   └── WhyUs.tsx
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions
│   ├── pages/                      # Page components
│   │   ├── About.tsx
│   │   ├── Gallery.tsx              # Fetches from Sanity
│   │   ├── ProjectDetail.tsx        # Dynamic project pages
│   │   ├── Blog.tsx                 # Blog listing page
│   │   ├── BlogDetail.tsx           # Blog post detail pages
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── PrivacyPolicy.tsx        # Legal: Privacy Policy
│   │   ├── TermsOfService.tsx       # Legal: Terms of Service
│   │   └── Services.tsx
│   ├── lib/
│   │   └── sanity.ts               # NEW: Sanity data fetching functions
│   ├── types/
│   │   └── sanity.ts               # NEW: TypeScript types for Sanity
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Global styles & design system
│   └── main.tsx                    # Application entry point
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── sanity.config.ts                # Sanity Studio configuration
├── sanity.cli.ts                   # Sanity CLI configuration (with appId)
├── vercel.json                     # Vercel deployment configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
├── components.json                 # shadcn/ui configuration
└── public/
    └── fonts/                      # Self-hosted fonts (WOFF2)
        ├── Coldiac.woff2
        ├── Inter-VariableFont_opsz,wght.woff2
        └── Oswald-VariableFont_wght.woff2
```

### Application Architecture
- **Entry Point**: `src/main.tsx` - Initializes React app
- **Routing**: React Router v6 with BrowserRouter
- **State Management**: React Query for server state
- **Component Structure**: Functional components with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming

---

## Frameworks & Technologies

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### Routing
- **react-router-dom 6.30.1** - Client-side routing
  - Routes:
    - `/` - Homepage
    - `/services` - Services page
    - `/gallery` - Project gallery
    - `/projects/:slug` - Project detail pages
    - `/blog` - Blog listing
    - `/blog/:slug` - Blog post detail pages
    - `/about` - About page with contact form
    - `/privacy-policy` - Privacy Policy (legal)
    - `/terms-of-service` - Terms of Service (legal)
    - `*` - 404 Not Found catch-all

### CMS & Content Management
- **Sanity 4.15.0** - Headless CMS (v4)
- **@sanity/client 7.12.1** - Sanity API client
- **@sanity/image-url 1.0.2** - Image optimization
- **@sanity/preview-url-secret** - Live preview support
- Custom schemas: Site Settings, Projects, Blog Posts, Categories

### Email & API
- **resend 3.2.0** - Email delivery service
- **@vercel/node 3.0.0** - Serverless functions

### UI Framework & Components
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Headless UI primitives (accordion, dialog, dropdown, etc.)
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **@tailwindcss/typography** - Typography plugin

### Form Handling
- **react-hook-form 7.61.1** - Form state management
- **@hookform/resolvers 3.10.0** - Form validation resolvers
- **zod 3.25.76** - Schema validation

### Icons & UI Elements
- **lucide-react 0.462.0** - Icon library
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

### Additional Libraries
- **@tanstack/react-query 5.83.0** - Server state management
- **date-fns 3.6.0** - Date utilities
- **recharts 2.15.4** - Chart library
- **sonner 1.7.4** - Toast notifications
- **next-themes 0.3.0** - Theme management (dark mode support)

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **@vitejs/plugin-react-swc** - Fast React refresh
- **lovable-tagger** - Development tooling

---

## Assets & Images

### Brand Assets
Located in `src/assets/brand/`:
- `toptiericon.png` - Brand icon (used in navbar and footer)
- `toptierlogo.png` - Brand logo (PNG)
- `toptierlogo.svg` - Brand logo (SVG)

### Fonts
Located in `public/fonts/` (self-hosted WOFF2):
- `Coldiac.woff2` - Section headings font
- `Inter-VariableFont_opsz,wght.woff2` - Body text font (variable)
- `Oswald-VariableFont_wght.woff2` - Hero headings font (variable)

### Page Images
Located in `src/assets/pagesImages/`:

#### Index/Hero
- `index/hero.webp` - Hero section background image

#### Services
- `services/firedamage_services.png` - Fire damage service image
- `services/moldremediation.png` - Mold remediation service image
- `services/remodel.jpg` - Remodeling service image
- `services/stormdamagerestoration.png` - Storm damage restoration image

#### About & Gallery
- `about/` - Directory exists but appears empty
- `gallery/` - Directory exists but appears empty

### External Images
The project also uses Unsplash images via URLs in several components:
- Services page uses Unsplash images for service cards
- About page uses Unsplash for team image
- Gallery page uses Unsplash for project images

### Other Assets
- `DemoPreview.png` - Project preview/demo image (root level)
- `public/robots.txt` - SEO robots file

---

## Code Review

### Application Entry (`src/main.tsx`)
- Clean entry point using React 18's `createRoot` API
- Imports global styles from `index.css`

### Main App Component (`src/App.tsx`)
- Well-structured with proper provider hierarchy:
  1. QueryClientProvider (React Query)
  2. TooltipProvider (Radix UI)
  3. Toaster components (Toast notifications)
  4. BrowserRouter (React Router)
- Routes defined clearly:
  - `/` - Index/Home page
  - `/services` - Services page
  - `/gallery` - Gallery page
  - `/projects/:slug` - Project detail pages
  - `/blog` - Blog listing page
  - `/blog/:slug` - Blog post detail pages
  - `/about` - About page with contact form
  - `/privacy-policy` - Privacy Policy (legal compliance)
  - `/terms-of-service` - Terms of Service (legal compliance)
  - `*` - 404 Not Found catch-all

### Page Components

#### Index.tsx
- Homepage with Hero, Services preview, WhyUs, and CTA sections
- Uses Card components from shadcn/ui
- Responsive grid layout for services
- Clean component composition

#### Services.tsx
- Detailed service pages with alternating image/text layout
- Feature lists with checkmark icons
- Emergency service CTA section
- Uses fade-in animations with staggered delays

#### About.tsx
- Company story section
- Statistics cards (15+ years, 1000+ projects, etc.) - consistent across site
- Values section with icon cards
- Contact form with validation using react-hook-form and zod
- Contact information display (phone number clickable via tel: link)

#### Gallery.tsx
- Filterable project gallery (now fetches from Sanity CMS)
- Dynamic category filtering based on Sanity categories
- Card-based layout with hover effects
- Links to individual project detail pages
- Uses Badge components for categories

#### ProjectDetail.tsx (NEW)
- Dynamic project detail pages at `/projects/:slug`
- Displays project title, location, date, and description
- Image/video carousel using Embla Carousel
- Supports YouTube, Vimeo, and direct video URLs
- Full description section with rich text
- CTA section matching site branding

#### Blog.tsx (NEW)
- Blog post listing page at `/blog`
- Card-based layout matching gallery design
- Shows post title, excerpt, author, date, and tags
- Links to individual blog post detail pages
- Responsive grid layout

#### BlogDetail.tsx (NEW)
- Dynamic blog post detail pages at `/blog/:slug`
- Displays post title, author, date, and tags
- Main image display
- Rich text body content rendering
- CTA section matching site branding

### Component Analysis

#### Navbar.tsx
- Fixed navigation with backdrop blur
- Responsive mobile menu
- Logo using toptiericon.png image
- Active route highlighting
- 24/7 Emergency button (clickable via tel: link)
- All navigation links use Inter font

#### Hero.tsx
- Full-screen hero section with background image
- Enhanced gradient overlay (darker for better contrast)
- Backdrop blur on content area
- Animated badge for "24/7 Emergency Response" (with shadow)
- Statistics display using semantic HTML (dl/dt/dd) - 15+ years, 1000+ homes, 24/7
- Call-to-action buttons (phone number clickable via tel: link)
- Hero H1 uses Oswald font (uppercase, bold, drop-shadow)
- Performance optimized (loading="eager", fetchPriority="high")

#### Footer.tsx
- Footer with brand logo (using toptiericon.png)
- Copyright and license info
- Legal page links (Privacy Policy, Terms of Service)
- Dark background with light text
- Flexbox layout for proper spacing

#### WhyUs.tsx
- Benefits section with icon cards
- Grid layout for benefits
- Hover effects on cards

### Code Quality Observations
✅ **Strengths:**
- TypeScript throughout for type safety
- Consistent component structure
- Good use of React hooks (useState, useEffect, useLocation)
- Form validation with zod schemas
- Responsive design patterns with mobile-first approach
- Accessibility considerations (semantic HTML, proper ARIA)
- Custom NavLink component for React Router integration
- Error logging in NotFound component
- Clean separation of concerns (pages, components, hooks, lib)
- **NEW**: Sanity CMS integration for content management
- **NEW**: Serverless API functions for contact form
- **NEW**: Loading states and error handling for async operations
- **NEW**: Type-safe Sanity data fetching

⚠️ **Areas for Improvement:**
- Some hardcoded phone numbers and emails (should be in config/env)
- External image URLs (Unsplash) in Services page should be moved to Sanity
- Empty asset directories (about/, gallery/) - can be removed as content is now in Sanity
- App.css contains unused default Vite styles (logo-spin animation, etc.)
- Portable text rendering could be enhanced with custom components
- Error boundaries should be implemented for better error handling

---

## Design System

### Typography

#### Font Family
- **Custom Fonts**: Self-hosted WOFF2 fonts for brand consistency
  - **Oswald** (Variable Font) - Hero H1 headings only
    - Uppercase transformation
    - Bold weight (700)
    - Minimum 32px size
    - Letter spacing for readability
  - **Coldiac** - Section headings (H2-H6), card titles, subheadings
    - Geometric, modern, clean
    - Bold weight (700)
  - **Inter** (Variable Font) - Body text and UI elements
    - All paragraphs, spans, lists
    - Navigation links
    - Buttons and forms
    - Captions and footers
    - Regular weight (400)

#### Font Sizes
Based on Tailwind's default scale and usage in components:
- **Hero Headings**: `text-3xl sm:text-4xl md:text-6xl lg:text-7xl` (1.875rem - 4.5rem)
  - Uses Oswald font, uppercase, with drop-shadow-2xl
  - Minimum 32px enforced via CSS clamp
- **Page Titles**: `text-4xl md:text-5xl` (2.25rem - 3rem) - Uses Coldiac
- **Section Headings**: `text-3xl md:text-4xl` (1.875rem - 2.25rem) - Uses Coldiac
- **Card Titles**: `text-xl` to `text-2xl` (1.25rem - 1.5rem) - Uses Coldiac
- **Body Text**: `text-base` (1rem) / `text-lg` (1.125rem) - Uses Inter
- **Small Text**: `text-sm` (0.875rem) / `text-xs` (0.75rem) - Uses Inter

#### Font Weights
- **Bold**: `font-bold` (700) - Used for headings
- **Semibold**: `font-semibold` (600) - Used for emphasis
- **Medium**: `font-medium` (500) - Used for navigation
- **Regular**: Default (400) - Body text

#### Line Height
- Default line heights from Tailwind CSS scale
- **Tight**: `leading-tight` (1.25) - Used in hero headings and compact text
- **Relaxed**: `leading-relaxed` (1.625) - Used in body text and descriptions
- **None**: `leading-none` (1) - Used in compact layouts (logo text)
- **Normal**: Default (1.5) - Standard body text line height
- No custom line-height values defined in CSS

### Colors

#### Primary Color Palette
Defined in `src/index.css` using HSL color variables:

**Primary Blue** (Brand Color):
- `--primary: 197 100% 47%` - `hsl(197, 100%, 47%)` - Bright cyan-blue (#00AEEF)
- `--primary-dark: 197 100% 36%` - `hsl(197, 100%, 36%)` - Darker blue variant
- `--primary-foreground: 0 0% 100%` - White text on primary

**Accent Orange**:
- `--accent: 15 100% 60%` - `hsl(15, 100%, 60%)` - Vibrant orange (#FF6B35)
- `--accent-foreground: 0 0% 100%` - White text on accent

**Neutral Colors**:
- `--background: 0 0% 100%` - White background
- `--foreground: 0 0% 10%` - Near-black text
- `--muted: 0 0% 90%` - Light gray backgrounds
- `--muted-foreground: 0 0% 45%` - Medium gray text
- `--secondary: 0 0% 97%` - Very light gray
- `--border: 0 0% 90%` - Light gray borders

**Semantic Colors**:
- `--destructive: 0 84.2% 60.2%` - Red for errors/warnings
- `--card: 0 0% 100%` - White card backgrounds
- `--popover: 0 0% 100%` - White popover backgrounds

#### Dark Mode Colors
Dark mode support is configured:
- `--background: 0 0% 10%` - Dark background
- `--foreground: 0 0% 98%` - Light text
- `--card: 0 0% 15%` - Dark card backgrounds
- Primary and accent colors remain consistent

#### Color Usage Patterns
- **Primary Blue**: Used for buttons, icons, links, brand elements
- **Accent Orange**: Used for emergency badges and CTAs
- **Muted Grays**: Used for secondary text and subtle backgrounds
- **White/Black**: High contrast for readability

#### Color Reference (Hex Values)
For quick reference, HSL values converted to hex:
- **Primary Blue**: `#00AEEF` (hsl(197, 100%, 47%))
- **Primary Dark**: `#0088B8` (hsl(197, 100%, 36%))
- **Accent Orange**: `#FF6B35` (hsl(15, 100%, 60%))
- **Background (Light)**: `#FFFFFF` (hsl(0, 0%, 100%))
- **Foreground (Light)**: `#1A1A1A` (hsl(0, 0%, 10%))
- **Muted (Light)**: `#E6E6E6` (hsl(0, 0%, 90%))
- **Muted Text (Light)**: `#737373` (hsl(0, 0%, 45%))
- **Border (Light)**: `#E6E6E6` (hsl(0, 0%, 90%))
- **Background (Dark)**: `#1A1A1A` (hsl(0, 0%, 10%))
- **Foreground (Dark)**: `#FAFAFA` (hsl(0, 0%, 98%))

### Line Spacing

#### Vertical Spacing (Padding/Margin)
Based on Tailwind spacing scale and component usage:

**Section Spacing**:
- `py-16 md:py-24` - Section padding (4rem - 6rem vertical)
- `py-20` - Large section spacing (5rem)
- `mb-12` to `mb-16` - Section bottom margins (3rem - 4rem)

**Component Spacing**:
- `gap-4` to `gap-8` - Grid/flex gaps (1rem - 2rem)
- `space-y-4` to `space-y-6` - Vertical spacing between children
- `p-4` to `p-8` - Component padding (1rem - 2rem)

**Text Spacing**:
- `mb-2` to `mb-6` - Heading bottom margins (0.5rem - 1.5rem)
- `leading-tight` - Tight line height for headings
- `leading-relaxed` - Relaxed line height for body text

#### Horizontal Spacing
- Container padding: `px-4 sm:px-6 lg:px-8` (1rem - 2rem)
- Card padding: `p-5` to `p-6` (1.25rem - 1.5rem)
- Button padding: Varies by size (sm, default, lg)

#### Border Radius
- `--radius: 0.5rem` - Base border radius (8px)
- `rounded-lg` - Large radius (var(--radius))
- `rounded-md` - Medium radius (calc(var(--radius) - 2px))
- `rounded-sm` - Small radius (calc(var(--radius) - 4px))
- `rounded-full` - Full circle (for badges, pills)

---

## Summary

### Project Strengths
1. **Modern Tech Stack**: Uses latest React, TypeScript, and Vite
2. **Component Library**: Well-integrated shadcn/ui components
3. **Type Safety**: TypeScript throughout with proper typing
4. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
5. **Form Validation**: Proper validation with zod schemas
6. **Accessibility**: Semantic HTML and ARIA considerations
7. **Design System**: Consistent color palette and spacing
8. **Performance**: Vite for fast builds, React Query for state management

### Design System Summary

**Typography**:
- System fonts (no custom fonts)
- Clear hierarchy with size scale
- Appropriate font weights for emphasis
- Good line height usage

**Colors**:
- Primary: Bright cyan-blue (#00AEEF) - Professional, trustworthy
- Accent: Vibrant orange (#FF6B35) - Attention-grabbing for emergencies
- Neutral grays for text and backgrounds
- Dark mode support configured

**Spacing**:
- Consistent spacing scale using Tailwind
- Generous padding for readability
- Proper section spacing
- Responsive spacing adjustments

### Recent Improvements Completed
1. ✅ Custom fonts implemented (Oswald, Coldiac, Inter)
2. ✅ Legal pages added (Privacy Policy, Terms of Service)
3. ✅ Accessibility improvements (focus states, semantic HTML, tel: links)
4. ✅ Performance optimizations (image loading, reduced motion)
5. ✅ Visual enhancements (hero overlay, stats hierarchy, hover effects)
6. ✅ SEO improvements (enhanced meta tags, Open Graph)
7. ✅ Stats consistency (1000+ across all pages)
8. ✅ Sanity schemas updated (siteSettings, separated images)

### Recommendations
1. Replace external Unsplash URLs with local assets or Sanity images
2. Populate empty asset directories (about/, gallery/) or remove if unused
3. Remove unused App.css styles
4. Consider adding loading states for images
5. Add error boundaries for better error handling
6. Update frontend queries to use new mainImage/additionalImages schema structure

---

## Additional Notes

### Component Details

#### NotFound.tsx
- Simple 404 page with centered layout
- Error logging to console for debugging
- Link back to home page
- Uses muted background for visual distinction

#### NavLink.tsx
- Custom wrapper around React Router's NavLink
- Supports active and pending states
- Uses `cn` utility for conditional class merging
- Properly typed with TypeScript interfaces

### Build Configuration
- **Vite**: Configured with React SWC plugin for fast refresh
- **Port**: Development server runs on port 8080
- **Path Aliases**: `@/` maps to `./src/` for cleaner imports
- **PostCSS**: Configured with Tailwind and Autoprefixer
- **TypeScript**: Relaxed strict mode for faster development

### SEO & Meta Tags
- Enhanced meta tags in `index.html`
- Comprehensive Open Graph tags (title, description, image, site_name)
- Twitter card support with images
- Descriptive title and meta description with location keywords
- Keywords meta tag for SEO
- robots.txt file in public directory
- Semantic HTML structure for better SEO

---

*Review completed: January 2025*
*Project: Top Tier Restoration Website*
*Technology Stack: React 18 + TypeScript 5 + Vite 7 + Tailwind CSS 3 + shadcn/ui*
*Typography: Oswald + Coldiac + Inter (self-hosted WOFF2)*
*CMS: Sanity v4 with custom schemas*
*Build Tool: Vite with React SWC*
*Package Manager: npm*
*Deployment: Vercel (auto-deploy) + Sanity Studio (sanity.studio)*

