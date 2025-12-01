# Top Tier Restoration - Comprehensive Project Review & Recommendations

## Executive Summary

This is a well-structured React + TypeScript project with Sanity CMS integration for a restoration services company. The codebase demonstrates good practices in many areas, but there are critical errors, accessibility issues, and opportunities for enhancement that should be addressed before deployment.

---

## 🚨 Critical Issues (Must Fix)

### 1. **Character Encoding Problems Throughout Codebase**
**Severity:** HIGH  
**Location:** Multiple files

**Problem:**
- Corrupted characters appear throughout the code: `â€"`, `â€™`, `â€¢`, `ðŸ"`, etc.
- These are encoding errors where UTF-8 characters were incorrectly converted to their byte sequences

**Impact:**
- Em dashes (—) appear as `â€"`
- Apostrophes (') appear as `â€™`
- Bullets (•) appear as `â€¢`
- Emojis (🔥) appear as `ðŸ"` or `ðŸ—ï¸`

**Files Affected:**
- `src/pages/About.tsx` (lines with "â€™s", "â€"")
- `src/pages/Index.tsx` (service descriptions)
- `src/pages/Services.tsx` (feature descriptions)
- `src/components/Footer.tsx` (copyright symbol)
- `sanity/schemas/blogPost.ts` (emoji icons)
- And many more...

**Solution:**
```typescript
// FIND AND REPLACE across all files:
// â€" → —
// â€™ → '
// â€¢ → •
// ðŸ" → 🔥
// ðŸ—ï¸ → 🏗️
// ðŸ·ï¸ → 🏷️
// Â© → ©
```

**Action Required:**
1. Run a find-and-replace across the entire project
2. Ensure all files are saved with UTF-8 encoding
3. Update your editor settings to default to UTF-8

---

### 2. **Missing Phone Number Configuration**
**Severity:** HIGH  
**Location:** Multiple components

**Problem:**
- Hardcoded placeholder `(317) XXX-XXXX` or `3175551234` in 15+ locations
- No centralized configuration for easy updates
- Links use `tel:3175551234` which won't dial correctly

**Solution:**

Create `src/config/contact.ts`:
```typescript
export const CONTACT_INFO = {
  phone: {
    display: '(317) 555-1234', // Update with real number
    raw: '3175551234',
    href: 'tel:+13175551234',
  },
  email: {
    display: 'info@toptierrestoration.com',
    href: 'mailto:info@toptierrestoration.com',
  },
  address: {
    street: '123 Main Street',
    city: 'Indianapolis',
    state: 'IN',
    zip: '46204',
    full: '123 Main Street, Indianapolis, IN 46204',
  },
  hours: {
    regular: 'Mon - Fri: 8am - 5pm',
    emergency: '24/7 Emergency Service',
  },
  license: 'IN-12345-PLACEHOLDER', // Update with real license
} as const;

export const SERVICE_AREAS = [
  'Indianapolis',
  'Carmel',
  'Noblesville',
  'Greenwood',
  'Mooresville',
  'Avon',
  'Brownsburg',
] as const;
```

Then update all files to import and use this configuration:
```typescript
import { CONTACT_INFO } from '@/config/contact';

// Usage:
<a href={CONTACT_INFO.phone.href}>
  {CONTACT_INFO.phone.display}
</a>
```

**Files to Update:**
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Hero.tsx`
- `src/components/MobileEmergencyBar.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Index.tsx`
- `src/pages/Gallery.tsx`
- All other files with phone references

---

### 3. **Sanity Schema Reference Issues**
**Severity:** MEDIUM  
**Location:** `src/pages/ProjectDetail.tsx`, `src/lib/sanity.ts`

**Problem:**
- Schema uses `images` array, but code references `mainImage`
- Inconsistent field naming between schema and queries

**In `sanity/schemas/project.ts`:**
```typescript
// Has these fields:
mainImage  // ❌ Not in schema
additionalImages  // ✅ In schema
images  // ❌ Not explicitly defined
```

**In queries (`src/lib/sanity.ts`):**
```typescript
"mainImage": images[0],  // Assumes images array exists
```

**Solution:**

Update `sanity/schemas/project.ts`:
```typescript
defineField({
  name: 'images',
  title: 'Project Images',
  type: 'array',
  description: 'All project images (first image will be used as main image)',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
  ],
  validation: (Rule) => Rule.required().min(1),
}),

// Remove mainImage and additionalImages fields
// OR keep mainImage as a separate required field
```

---

### 4. **Google Analytics Configuration Issues**
**Severity:** MEDIUM  
**Location:** `src/lib/analytics.ts`

**Problem:**
```typescript
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";
```

No `.env` file provided, and no `.env.example` to guide configuration.

**Solution:**

Create `.env.example`:
```env
# Sanity CMS
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
VITE_SANITY_PREVIEW_TOKEN=

# Analytics
VITE_GA_MEASUREMENT_ID=

# Email (Resend API)
RESEND_API_KEY=
```

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

Update `src/lib/analytics.ts` with better error handling:
```typescript
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

export const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics not configured: VITE_GA_MEASUREMENT_ID is missing');
    return;
  }
  
  if (typeof window === "undefined") return;
  
  // ... rest of the code
};
```

---

### 5. **Resend API Email Handler Security Issues**
**Severity:** HIGH  
**Location:** `api/contact.ts`

**Problems:**
1. API key exposed in client-side code (if not properly configured)
2. No rate limiting
3. No spam protection
4. No input sanitization beyond basic validation
5. Recipient email hardcoded

**Solution:**

Update `api/contact.ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

// Rate limiting (simple in-memory, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
             req.socket.remoteAddress || 
             'unknown';
  
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { name, email, phone, message } = req.body

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Length validation
    if (name.length > 100 || email.length > 255 || phone.length > 20 || message.length > 1000) {
      return res.status(400).json({ error: 'Input exceeds maximum length' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'thmsbnsn@bnsnsolutions.com';

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Top Tier Restoration <noreply@ttrindy.com>',
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Submitted from: ${ip}<br>
          Time: ${new Date().toISOString()}
        </p>
      `,
      text: `
        New Contact Form Submission

        Name: ${sanitizedName}
        Email: ${email}
        Phone: ${phone}

        Message:
        ${sanitizedMessage}
        
        ---
        IP: ${ip}
        Time: ${new Date().toISOString()}
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
```

Add to `.env`:
```env
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=thmsbnsn@bnsnsolutions.com
ALLOWED_ORIGIN=https://ttrindy.com
```

---

## ⚠️ Important Issues (Should Fix)

### 6. **Accessibility Improvements Needed**

**A. Missing Landmark Roles**
```tsx
// src/pages/Index.tsx - Add semantic HTML
<main role="main">
  <Hero />
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
    {/* ... */}
  </section>
</main>
```

**B. Image Alt Text Issues**

Many images use generic alt text. Update with descriptive text:
```tsx
// ❌ Bad
<img src={heroImage} alt="Home restoration" />

// ✅ Good
<img 
  src={heroImage} 
  alt="Before and after photos of fire damage restoration showing charred walls transformed into a beautiful restored living room in Indianapolis" 
/>
```

**C. Focus Management**

Add focus trap for mobile menu:
```tsx
// src/components/Navbar.tsx
import { useEffect, useRef } from 'react';

const Navbar = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [mobileMenuOpen]);

  return (
    // ... navbar code with ref={mobileMenuRef} on mobile menu
  );
};
```

**D. ARIA Labels Missing**

Add throughout:
```tsx
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle mobile menu"
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-menu"
>
  {/* icon */}
</button>

<div 
  id="mobile-menu"
  role="navigation"
  aria-label="Mobile navigation"
>
  {/* menu items */}
</div>
```

---

### 7. **TypeScript Type Safety Issues**

**A. `any` Types Throughout**
```typescript
// sanity/schemas/blogPost.ts
prepare(selection) {
  const { author, publishedAt } = selection  // any types
  // ...
}
```

**Solution:**
```typescript
interface BlogPostSelection {
  title: string;
  author?: string;
  media?: any; // Can use SanityImageSource
  publishedAt?: string;
}

prepare(selection: BlogPostSelection) {
  const { author, publishedAt } = selection;
  // ...
}
```

**B. Portable Text Rendering**

Replace simplified rendering with proper library:
```bash
npm install @portabletext/react
```

```tsx
// src/pages/BlogDetail.tsx
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../sanity/lib/image';

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        className="rounded-lg my-8"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
    ),
  },
};

// In component:
{post.body && (
  <div className="prose prose-slate max-w-none">
    <PortableText 
      value={post.body} 
      components={portableTextComponents}
    />
  </div>
)}
```

---

### 8. **Performance Optimization Needed**

**A. Image Optimization**

All images should use `loading="lazy"` except above-the-fold:
```tsx
// Hero image - eager loading
<img
  src={heroImage}
  alt="..."
  loading="eager"
  fetchPriority="high"
/>

// Gallery images - lazy loading
<img
  src={urlFor(project.mainImage).width(800).height(450).url()}
  alt={project.title}
  loading="lazy"
  decoding="async"
/>
```

**B. Code Splitting**

Add lazy loading for routes:
```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';

const Index = lazy(() => import('./pages/Index'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ... other routes */}
      </Routes>
    </Suspense>
  );
};
```

**C. Sanity Image URL Optimization**

Update `sanity/lib/image.ts`:
```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').quality(85)
}

// Helper functions for common sizes
export const imageHelpers = {
  thumbnail: (source: SanityImageSource) => 
    urlFor(source).width(400).height(300),
  
  card: (source: SanityImageSource) => 
    urlFor(source).width(800).height(600),
  
  hero: (source: SanityImageSource) => 
    urlFor(source).width(1920).height(1080),
  
  detail: (source: SanityImageSource) => 
    urlFor(source).width(1200).height(800),
};
```

---

### 9. **SEO Enhancements**

**A. Create Sitemap**

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ttrindy.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ttrindy.com/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ttrindy.com/gallery</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ttrindy.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ttrindy.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

**B. Add Structured Data**

Create `src/components/SEO/StructuredData.tsx`:
```tsx
interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'BlogPosting';
  data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  let schema = {};

  if (type === 'LocalBusiness') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://ttrindy.com',
      name: 'Top Tier Restoration',
      image: 'https://ttrindy.com/og-image.webp',
      url: 'https://ttrindy.com',
      telephone: '+1-317-555-1234',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Indianapolis',
        addressRegion: 'IN',
        postalCode: '46204',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 39.7684,
        longitude: -86.1581,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      sameAs: [
        'https://www.facebook.com/toptierrestoration',
        'https://www.instagram.com/toptierrestoration',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '100',
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
```

Add to pages:
```tsx
// src/pages/Index.tsx
<Helmet>
  <StructuredData type="LocalBusiness" data={{}} />
</Helmet>
```

**C. Meta Tags Component**

Create `src/components/SEO/MetaTags.tsx`:
```tsx
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export const MetaTags = ({
  title,
  description,
  canonical,
  ogImage = 'https://ttrindy.com/og-image.webp',
  ogType = 'website',
  noindex = false,
}: MetaTagsProps) => {
  const fullTitle = `${title} | Top Tier Restoration`;
  const url = canonical || typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Top Tier Restoration" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
```

Install react-helmet-async:
```bash
npm install react-helmet-async
```

---

### 10. **Mobile UX Improvements**

**A. Safe Area Insets**

Update `src/index.css`:
```css
@layer base {
  /* iOS safe area support */
  :root {
    --safe-area-inset-top: env(safe-area-inset-top);
    --safe-area-inset-right: env(safe-area-inset-right);
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
    --safe-area-inset-left: env(safe-area-inset-left);
  }

  body {
    padding-top: var(--safe-area-inset-top);
    padding-right: var(--safe-area-inset-right);
    padding-bottom: var(--safe-area-inset-bottom);
    padding-left: var(--safe-area-inset-left);
  }
}
```

Update mobile emergency bar:
```tsx
// src/components/MobileEmergencyBar.tsx
<button
  style={{
    paddingBottom: `calc(0.75rem + var(--safe-area-inset-bottom))`,
  }}
  className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-accent..."
>
  {/* ... */}
</button>
```

**B. Touch Targets**

Ensure all interactive elements are at least 44x44px:
```css
@layer components {
  .touch-target {
    @apply min-h-[44px] min-w-[44px] flex items-center justify-center;
  }
}
```

Apply to buttons:
```tsx
<button className="touch-target">
  {/* icon */}
</button>
```

---

## 💡 Enhancement Recommendations

### 11. **Sanity Studio Improvements**

**A. Add Preview URLs**

Update `sanity.config.ts`:
```typescript
export default defineConfig({
  // ... existing config
  
  document: {
    productionUrl: async (prev, { document }) => {
      const baseUrl = 'https://ttrindy.com'; // Update when domain is ready
      
      if (document._type === 'project') {
        return `${baseUrl}/projects/${document.slug?.current}`;
      }
      
      if (document._type === 'blogPost') {
        return `${baseUrl}/blog/${document.slug?.current}`;
      }
      
      return prev;
    },
  },
});
```

**B. Custom Input Components**

Create `sanity/components/PhoneInput.tsx`:
```tsx
import { TextInput } from '@sanity/ui';
import { forwardRef } from 'react';

export const PhoneInput = forwardRef((props: any, ref) => {
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <TextInput
      {...props}
      ref={ref}
      value={formatPhone(props.value || '')}
    />
  );
});
```

Use in schema:
```typescript
defineField({
  name: 'phoneNumber',
  title: 'Phone Number',
  type: 'string',
  components: {
    input: PhoneInput,
  },
}),
```

**C. Better Preview Component**

Create `sanity/components/Preview.tsx`:
```tsx
import { Card, Flex, Stack, Text } from '@sanity/ui';

export const ProjectPreview = ({ title, location, category, mainImage }: any) => {
  return (
    <Card padding={3}>
      <Flex gap={3}>
        {mainImage && (
          <div style={{ width: 100, height: 100, flexShrink: 0 }}>
            <img
              src={mainImage}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
            />
          </div>
        )}
        <Stack space={2}>
          <Text size={2} weight="bold">{title}</Text>
          <Text size={1} muted>{location}</Text>
          {category && (
            <Text size={1} style={{ color: '#00AEEF' }}>
              {category}
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  );
};
```

---

### 12. **Additional Features to Consider**

**A. Loading States**

Create a reusable skeleton