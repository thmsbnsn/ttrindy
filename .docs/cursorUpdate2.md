# Top Tier Restoration - Comprehensive Code Review & Recommendations

## Executive Summary

This is a well-structured restoration services website with Sanity CMS integration. The project demonstrates strong fundamentals but has several areas requiring attention for production readiness, SEO optimization, and enhanced user experience.

---

## 🔴 Critical Issues (Must Fix Before Launch)

### 1. **Placeholder Content Throughout**
**Location**: Multiple files
**Issue**: Placeholder phone numbers `(317) XXX-XXXX` and license `IN-12345-PLACEHOLDER`
**Impact**: Non-functional CTAs, legal compliance issues

**Fix Required**:
```typescript
// Create environment variables for dynamic content
// .env.local
VITE_PHONE_NUMBER=(317) 555-1234
VITE_LICENSE_NUMBER=IN-12345-ACTUAL
VITE_EMAIL=info@toptierrestoration.com
VITE_BUSINESS_ADDRESS=123 Main St, Indianapolis, IN 46204

// Update all hardcoded instances to use env variables
const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '(317) 555-1234';
```

**Files to Update**:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Hero.tsx`
- `src/pages/About.tsx`
- `src/pages/Services.tsx`
- `src/pages/Accessibility.tsx`

### 2. **Missing Error Boundaries**
**Issue**: No React error boundaries to catch component errors
**Impact**: Single component failure crashes entire app

**Solution**:
```typescript
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">Please refresh the page</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap App.tsx routes in ErrorBoundary
<ErrorBoundary>
  <Routes>
    {/* ... routes */}
  </Routes>
</ErrorBoundary>
```

### 3. **Missing Structured Data (Schema.org)**
**Issue**: No JSON-LD structured data for SEO
**Impact**: Poor search engine understanding, missing rich snippets

**Solution**:
```typescript
// src/components/StructuredData.tsx
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Top Tier Restoration",
    "image": "https://ttrindy.com/logo.png",
    "@id": "https://ttrindy.com",
    "url": "https://ttrindy.com",
    "telephone": import.meta.env.VITE_PHONE_NUMBER,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": import.meta.env.VITE_BUSINESS_ADDRESS,
      "addressLocality": "Indianapolis",
      "addressRegion": "IN",
      "postalCode": "46204",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.7684,
      "longitude": -86.1581
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/toptierrestoration",
      "https://www.instagram.com/toptierrestoration"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Indianapolis"
      },
      {
        "@type": "City",
        "name": "Carmel"
      },
      {
        "@type": "City",
        "name": "Greenwood"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// Add to index.html <head>
```

### 4. **Contact Form Validation Issues**
**Location**: `src/pages/About.tsx`
**Issue**: Phone validation regex doesn't match US phone formats properly

**Fix**:
```typescript
// Update contactSchema in About.tsx
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string()
    .trim()
    .regex(/^[\d\s\-\(\)]+$/, "Invalid phone number")
    .min(10, "Phone must be at least 10 digits")
    .max(20),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000)
});
```

---

## 🟡 Important Issues (High Priority)

### 5. **Image Optimization Missing**
**Issue**: No next-gen image formats, no lazy loading optimization
**Impact**: Slow page loads, poor Core Web Vitals

**Solution**:
```typescript
// src/components/OptimizedImage.tsx
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Convert to WebP if supported
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&fm=webp&q=80`;
    }
    return originalSrc;
  };

  useEffect(() => {
    setImgSrc(getOptimizedSrc(src));
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(src); // Fallback to original
        setIsLoading(false);
      }}
    />
  );
};
```

### 6. **Missing Meta Tags for Social Sharing**
**Issue**: Blog and project pages lack dynamic OG tags
**Impact**: Poor social media previews

**Solution**:
```typescript
// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  author?: string;
}

export const SEO = ({
  title,
  description,
  image = '/og-image.webp',
  type = 'website',
  publishedDate,
  author
}: SEOProps) => {
  const siteUrl = 'https://ttrindy.com';
  const fullTitle = `${title} | Top Tier Restoration`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
};

// Install: npm install react-helmet-async
// Wrap App in HelmetProvider
```

### 7. **Sanity Preview Mode Not Implemented**
**Issue**: Preview functionality exists but not fully implemented
**Impact**: Clients can't preview unpublished content

**Solution**:
```typescript
// src/lib/sanity.ts - Update
export const isPreview = () => {
  if (typeof window === 'undefined') return false;
  // Check for preview mode in multiple ways
  return (
    new URLSearchParams(window.location.search).has('preview') ||
    document.cookie.includes('__sanity_preview=true')
  );
};

// Add preview toggle component
// src/components/PreviewBanner.tsx
export const PreviewBanner = () => {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setIsPreview(isPreview());
  }, []);

  const exitPreview = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    window.location.href = url.toString();
  };

  if (!isPreview) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black px-4 py-2 text-center z-[100] text-sm font-medium">
      Preview Mode Active
      <button 
        onClick={exitPreview}
        className="ml-4 underline hover:no-underline"
      >
        Exit Preview
      </button>
    </div>
  );
};
```

### 8. **Accessibility Issues**
**Issues Found**:
- Missing ARIA labels on several interactive elements
- Color contrast issues on some buttons
- No skip-to-content link
- Mobile menu doesn't trap focus

**Fixes**:
```typescript
// Add skip link to Navbar.tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-[100]"
>
  Skip to main content
</a>

// Add to main content areas
<main id="main-content">
  {/* content */}
</main>

// Fix mobile menu focus trap in Navbar.tsx
useEffect(() => {
  if (mobileMenuOpen) {
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }
}, [mobileMenuOpen]);
```

---

## 🟢 Enhancements (Recommended)

### 9. **Add Loading States**
**Enhancement**: Better loading UX throughout

```typescript
// src/components/LoadingSpinner.tsx
export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-2 border-primary border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

// src/components/SkeletonCard.tsx
export const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-video bg-muted rounded-lg mb-4" />
    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
    <div className="h-4 bg-muted rounded w-1/2" />
  </div>
);

// Use in Gallery.tsx
{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
  </div>
) : (
  // ... actual content
)}
```

### 10. **Add Analytics Events**
**Enhancement**: Track user interactions

```typescript
// Update src/lib/analytics.ts
export const trackEvents = {
  callButtonClick: () => trackEvent('call_click', 'engagement', 'phone_cta'),
  formSubmit: (formName: string) => trackEvent('form_submit', 'conversion', formName),
  projectView: (projectTitle: string) => trackEvent('project_view', 'engagement', projectTitle),
  blogView: (blogTitle: string) => trackEvent('blog_view', 'engagement', blogTitle),
  emergencyButtonClick: () => trackEvent('emergency_click', 'engagement', 'emergency_bar'),
  categoryFilter: (category: string) => trackEvent('filter_click', 'engagement', category),
};

// Add to components
<Button onClick={() => {
  trackEvents.callButtonClick();
  window.location.href = 'tel:...';
}}>
  Call Now
</Button>
```

### 11. **Implement Progressive Web App (PWA)**
**Enhancement**: Enable offline access and app-like experience

```typescript
// public/manifest.json
{
  "name": "Top Tier Restoration",
  "short_name": "TTR",
  "description": "Professional restoration and remodeling services",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00AEEF",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

// Install vite-plugin-pwa
// npm install vite-plugin-pwa -D

// Update vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        // ... manifest config
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ]
});
```

### 12. **Add Contact Form Success Page**
**Enhancement**: Better conversion tracking

```typescript
// src/pages/ThankYou.tsx
export const ThankYou = () => {
  useEffect(() => {
    trackEvent('form_success', 'conversion', 'contact_form');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24">
        <div className="text-center max-w-2xl px-4">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <p className="text-muted-foreground mb-8">
            Need immediate assistance? Call us now at{' '}
            <a href="tel:3175551234" className="text-primary font-semibold">
              (317) 555-1234
            </a>
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Update About.tsx form submission
const onSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to send message');

    // Redirect to thank you page
    navigate('/thank-you');
  } catch (error) {
    // ... error handling
  }
};
```

### 13. **Improve Sanity Studio Customization**
**Enhancement**: Better content management experience

```typescript
// sanity/schemas/siteSettings.ts - Add more fields
defineField({
  name: 'emergencyBanner',
  title: 'Emergency Banner',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Show Emergency Banner',
      initialValue: false
    },
    {
      name: 'message',
      type: 'string',
      title: 'Banner Message',
      description: 'Urgent message to display site-wide'
    },
    {
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text'
    },
    {
      name: 'ctaLink',
      type: 'string',
      title: 'CTA Link (phone or URL)'
    }
  ]
}),

// Add testimonials schema
// sanity/schemas/testimonial.ts
export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      validation: (Rule) => Rule.required().max(500)
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'date',
      title: 'Review Date',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    })
  ]
});

// Add FAQ schema
// sanity/schemas/faq.ts
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    })
  ]
});
```

---

## 🎨 UI/UX Enhancements

### 14. **Improved Mobile Experience**
```typescript
// MobileEmergencyBar.tsx - Add swipe gesture
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedDown: () => setIsOpen(false),
  onSwipedUp: () => setIsOpen(true),
  preventScrollOnSwipe: true,
  trackMouse: false
});

<div {...handlers} className="...">
  {/* drawer content */}
</div>

// Add visual feedback
<div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4" />
```

### 15. **Add Testimonials Section**
```typescript
// src/components/Testimonials.tsx
import { Star } from 'lucide-react';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getFeaturedTestimonials().then(setTestimonials);
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id}>
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
                <p className="font-semibold">{testimonial.customerName}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.projectType?.title || 'Restoration Project'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 16. **Add Live Chat Widget Placeholder**
```typescript
// src/components/ChatWidget.tsx
export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 h-96 mb-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Chat with us</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-4">
              We're here to help! Call us now for immediate assistance:
            </p>
            <Button className="w-full" asChild>
              <a href="tel:3175551234">
                <Phone className="w-4 h-4 mr-2" />
                Call (317) 555-1234
              </a>
            </Button>
            <p className="mt-4 text-center text-xs">
              Or fill out our <Link to="/about#contact" className="text-primary underline">contact form</Link>
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
```

---

## 🔧 Performance Optimizations

### 17. **Implement Code Splitting**
```typescript
// src/App.tsx - Lazy load pages
import {