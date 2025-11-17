# Top Tier Restoration - Project Review

## Project Overview
This document provides a comprehensive review of the Top Tier Restoration website project, including structure, frameworks, assets, code analysis, and design system details.

## 🆕 Recent Updates - CMS Implementation

### Sanity CMS Integration
- **Headless CMS**: Sanity CMS integrated for content management
- **Content Types**: Projects, Blog Posts, and Categories
- **Live Preview**: Enabled for real-time content preview while editing
- **Auto-Deploy**: Configured for automatic Vercel deployment on content publish

### New Features Added
1. **Project Detail Pages**: Dynamic pages at `/projects/:slug` with image/video carousels
2. **Blog Section**: Blog listing page and detail pages at `/blog` and `/blog/:slug`
3. **Contact Form**: Integrated with Resend API for email delivery
4. **CMS Studio**: Accessible at `/studio` for content management

### New Dependencies
- `@sanity/client` - Sanity API client
- `@sanity/image-url` - Image URL builder
- `sanity` - Sanity Studio
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
│   │   ├── project.ts              # Project schema
│   │   ├── blogPost.ts             # Blog post schema
│   │   ├── category.ts             # Category schema
│   │   └── index.ts                # Schema exports
│   └── lib/                        # Sanity utilities
│       ├── client.ts               # Sanity client setup
│       ├── image.ts                 # Image URL builder
│       └── queries.ts               # GROQ queries
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
│   │   ├── Gallery.tsx              # Now fetches from Sanity
│   │   ├── ProjectDetail.tsx        # NEW: Dynamic project pages
│   │   ├── Blog.tsx                 # NEW: Blog listing page
│   │   ├── BlogDetail.tsx           # NEW: Blog post detail pages
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
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
├── sanity.config.ts                # NEW: Sanity Studio configuration
├── sanity.cli.ts                   # NEW: Sanity CLI configuration
├── vercel.json                     # NEW: Vercel deployment configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
└── components.json                 # shadcn/ui configuration
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
  - Routes: `/`, `/services`, `/gallery`, `/projects/:slug`, `/blog`, `/blog/:slug`, `/about`

### CMS & Content Management
- **Sanity 3.56.0** - Headless CMS
- **@sanity/client 6.15.0** - Sanity API client
- **@sanity/image-url 1.0.2** - Image optimization
- **@sanity/preview-url-secret 1.0.0** - Live preview support
- **@sanity/vision 3.56.0** - GROQ query tool

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
- `toptiericon.png` - Brand icon
- `toptierlogo.png` - Brand logo (PNG)
- `toptierlogo.svg` - Brand logo (SVG)

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
  - `/about` - About page
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
- Statistics cards (15+ years, 2,500+ projects, etc.)
- Values section with icon cards
- Contact form with validation using react-hook-form and zod
- Contact information display

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
- Logo with "TT" monogram
- Active route highlighting
- 24/7 Emergency button

#### Hero.tsx
- Full-screen hero section with background image
- Gradient overlays for text readability
- Animated badge for "24/7 Emergency Response"
- Statistics display (15+ years, 5000+ homes, 24/7)
- Call-to-action buttons

#### Footer.tsx
- Simple footer with brand, copyright, and license info
- Dark background with light text

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
- **Primary Font**: System font stack (default browser fonts)
  - No custom font imports detected in codebase
  - No `@font-face` declarations or `@import` statements for fonts
  - Relies on browser default system fonts: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - This provides fast loading and native OS integration

#### Font Sizes
Based on Tailwind's default scale and usage in components:
- **Hero Headings**: `text-4xl md:text-6xl lg:text-7xl` (2.25rem - 4.5rem)
- **Page Titles**: `text-4xl md:text-5xl` (2.25rem - 3rem)
- **Section Headings**: `text-3xl md:text-4xl` (1.875rem - 2.25rem)
- **Card Titles**: `text-xl` to `text-2xl` (1.25rem - 1.5rem)
- **Body Text**: `text-base` (1rem) / `text-lg` (1.125rem)
- **Small Text**: `text-sm` (0.875rem) / `text-xs` (0.75rem)

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

### Recommendations
1. Replace external Unsplash URLs with local assets
2. Add custom font (e.g., Inter, Poppins) for brand consistency
3. Populate empty asset directories (about/, gallery/)
4. Remove unused App.css styles
5. Consider adding loading states for images
6. Add error boundaries for better error handling
7. Implement proper image optimization (WebP, lazy loading)

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
- Proper meta tags in `index.html`
- Open Graph tags for social sharing
- Twitter card support
- Descriptive title and meta description
- robots.txt file in public directory

---

*Review completed: November 2024*
*Project: Top Tier Restoration Website*
*Technology Stack: React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + shadcn/ui*
*Build Tool: Vite with React SWC*
*Package Manager: npm*

