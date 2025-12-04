# 🚀 Sanity CMS Migration & Implementation Guide

## Phase 1: Schema Setup (30 minutes)

### Step 1: Create New Schema Files

Create these new files in your `sanity/schemas` directory:

```
sanity/schemas/
├── singletons/
│   ├── siteSettings.ts     ✅ Already exists (enhance it)
│   ├── homePage.ts         ⭐ NEW
│   ├── aboutPage.ts        ⭐ NEW
│   └── servicesPage.ts     ⭐ NEW
├── objects/
│   ├── navigationItem.ts   ⭐ NEW
│   ├── serviceCard.ts      ⭐ NEW
│   ├── featureCard.ts      ⭐ NEW
│   ├── statCard.ts         ⭐ NEW
│   └── seoFields.ts        ⭐ NEW
├── project.ts              ✅ Enhance existing
├── blogPost.ts             ✅ Enhance existing
├── category.ts             ✅ Already good
└── index.ts                📝 Update
```

### Step 2: Update Schema Index

Replace `sanity/schemas/index.ts` with the provided version.

### Step 3: Update Structure

Replace `sanity/structure.ts` with the provided version.

### Step 4: Deploy Schemas to Sanity

```bash
# From your project root
npm run sanity:deploy
```

---

## Phase 2: Content Migration (1-2 hours)

### Step 1: Create Singleton Documents

In Sanity Studio, manually create these documents:

1. **Site Settings** (`siteSettings`)
   - ID: `siteSettings`
   - Fill in all contact info, branding, navigation
   
2. **Home Page** (`homePage`)
   - ID: `homePage`
   - Populate hero section, service cards, CTAs
   
3. **About Page** (`aboutPage`)
   - ID: `aboutPage`
   - Add story, stats, values
   
4. **Services Page** (`servicesPage`)
   - ID: `servicesPage`
   - Add service details with images

### Step 2: Migrate Existing Projects

Your existing projects should continue working! Just verify:
- All projects have at least one image in the `images` array
- The first image in `images` becomes the main/featured image
- Add SEO fields to important projects

### Step 3: Migrate Existing Blog Posts

Your blog posts should work as-is! Optional enhancements:
- Add SEO fields to popular posts
- Link related projects using the new `relatedProjects` field

---

## Phase 3: Update Frontend Code (2-3 hours)

### Step 1: Update Types

Replace `src/types/sanity.ts` with the provided version.

### Step 2: Update Queries

Replace `sanity/lib/queries.ts` with the provided version.

### Step 3: Update Client Functions

Replace `src/lib/sanity.ts` with the provided version.

### Step 4: Update Page Components

#### `src/pages/Index.tsx` (Home Page)

```typescript
import { useState, useEffect } from "react";
import { getHomePage, getSiteSettings, getFeaturedProjects } from "@/lib/sanity";
import type { HomePage, SiteSettings, Project } from "@/types/sanity";

const Index = () => {
  const [pageData, setPageData] = useState<HomePage | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHomePage(),
      getSiteSettings(),
      getFeaturedProjects(6)
    ])
      .then(([page, settings, projects]) => {
        setPageData(page);
        setSiteSettings(settings);
        setFeaturedProjects(projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading || !pageData) {
    return <LoadingState />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={siteSettings} />
      
      {/* Hero Section - now editable! */}
      <Hero data={pageData.hero} />
      
      {/* Services Section - now editable! */}
      <ServicesSection data={pageData.servicesSection} />
      
      {/* Featured Projects - dynamically loaded */}
      {pageData.featuredProjectsSection.showFeaturedProjects && (
        <FeaturedProjects 
          data={pageData.featuredProjectsSection}
          projects={featuredProjects}
        />
      )}
      
      {/* Why Us Section - now editable! */}
      <WhyUsSection data={pageData.whyUsSection} />
      
      {/* Final CTA - now editable! */}
      <FinalCTA data={pageData.finalCta} />
      
      <Footer settings={siteSettings} />
    </div>
  );
};
```

#### `src/components/Navbar.tsx`

Update to use dynamic navigation from Site Settings:

```typescript
import { getSiteSettings } from "@/lib/sanity";
import type { SiteSettings } from "@/types/sanity";

interface NavbarProps {
  settings?: SiteSettings | null;
}

const Navbar = ({ settings }: NavbarProps) => {
  // Use settings.navigation.mainMenu for nav items
  // Use settings.branding.logo for logo
  // Use settings.navigation.ctaButton for CTA
};
```

#### `src/components/Footer.tsx`

Update to use dynamic footer from Site Settings:

```typescript
const Footer = ({ settings }: { settings?: SiteSettings | null }) => {
  // Use settings.footer.aboutText
  // Use settings.footer.quickLinks
  // Use settings.footer.copyrightText
  // Use settings.socialMedia
};
```

### Step 5: Update Hero Component

Create a reusable Hero component:

```typescript
// src/components/Hero.tsx
import { urlFor } from "../../sanity/lib/image";
import type { HomePage } from "@/types/sanity";

interface HeroProps {
  data: HomePage['hero'];
}

export const Hero = ({ data }: HeroProps) => {
  return (
    <section 
      className="hero-section"
      style={{
        backgroundImage: `url(${urlFor(data.backgroundImage).width(1920).url()})`
      }}
    >
      <h1>{data.headline}</h1>
      <p>{data.subheadline}</p>
      <div className="cta-buttons">
        <Button asChild>
          <a href={data.primaryCta.url}>{data.primaryCta.text}</a>
        </Button>
        {data.secondaryCta && (
          <Button variant="outline" asChild>
            <a href={data.secondaryCta.url}>{data.secondaryCta.text}</a>
          </Button>
        )}
      </div>
    </section>
  );
};
```

---

## Phase 4: SEO Implementation (30 minutes)

### Update MetaTags Component

```typescript
// src/components/SEO/MetaTags.tsx
import { Helmet } from 'react-helmet-async';
import { urlFor } from '../../../sanity/lib/image';
import type { SeoFields } from '@/types/sanity';

interface MetaTagsProps {
  title?: string;
  seo?: SeoFields;
  defaultSeo?: SeoFields;
}

export const MetaTags = ({ title, seo, defaultSeo }: MetaTagsProps) => {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || defaultSeo?.metaDescription;
  const ogImage = seo?.ogImage || defaultSeo?.ogImage;
  const ogImageUrl = ogImage ? urlFor(ogImage).width(1200).height(630).url() : undefined;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      {seo?.keywords && <meta name="keywords" content={seo.keywords.join(', ')} />}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {seo?.noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};
```

---

## Phase 5: Testing & Validation (1 hour)

### Checklist

- [ ] All singleton documents created and populated
- [ ] Navigation menu displays correctly
- [ ] Footer links work
- [ ] Hero section loads with custom content
- [ ] Service cards display properly
- [ ] Featured projects show (if enabled)
- [ ] Contact form still works
- [ ] Projects page loads
- [ ] Blog page loads
- [ ] Project detail pages work
- [ ] Blog detail pages work
- [ ] SEO tags render correctly
- [ ] Images load and display
- [ ] All CTAs link to correct pages

---

## Configuration Files to Update

### 1. Environment Variables

Ensure these are set in `.env`:

```env
VITE_SANITY_PROJECT_ID=o2ba67uq
VITE_SANITY_DATASET=production
VITE_SANITY_PREVIEW_TOKEN=your_preview_token_here
```

### 2. Sanity Config

Your existing `sanity.config.ts` is good! No changes needed.

---

## Common Issues & Solutions

### Issue: "Document with ID already exists"

**Solution**: This means a singleton was created manually. Just use the existing document and update its content.

### Issue: Images not loading

**Solution**: Check that:
1. Images are uploaded to Sanity
2. Image URLs are being constructed with `urlFor()`
3. Alt text is provided for all images

### Issue: Navigation not showing

**Solution**: Ensure Site Settings has navigation items in `navigation.mainMenu`

### Issue: TypeScript errors

**Solution**: 
1. Ensure all types in `src/types/sanity.ts` match your schemas
2. Run `npm run build` to check for type errors
3. Use `any` temporarily while debugging, then fix

---

## Performance Optimization

### 1. Image Optimization

Always use Sanity's image URL builder:

```typescript
// ✅ Good
urlFor(image).width(800).height(450).quality(85).url()

// ❌ Bad
image.asset.url
```

### 2. Query Optimization

Only fetch fields you need:

```groq
// ✅ Good - specific fields
*[_type == "project"][0...10] {
  _id,
  title,
  slug,
  mainImage
}

// ❌ Bad - fetches everything
*[_type == "project"]
```

### 3. Caching Strategy

Use Next.js ISR (if migrating to Next.js):

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## Future Enhancements

### 1. Internationalization (i18n)

When you need multi-language support:

```typescript
// Add to each schema field:
defineField({
  name: 'title',
  type: 'localeString', // Instead of 'string'
})
```

### 2. Draft/Preview Mode

Set up preview mode for editors:

```typescript
// Add preview URL in sanity.config.ts
export default defineConfig({
  // ...
  plugins: [
    productionUrl({
      previewUrl: {
        previewMode: {
          enable: '/api/preview',
        },
      },
    }),
  ],
})
```

### 3. Webhooks for Auto-Rebuild

Trigger rebuilds when content changes:

```typescript
// In your hosting platform (Vercel, Netlify):
// Add webhook URL from Sanity Settings > API > Webhooks
```

---

## Rollback Plan

If something goes wrong:

1. **Keep old code in git branch**: `git checkout -b sanity-migration-backup`
2. **Sanity data is safe**: All CMS content is preserved
3. **Quick rollback**: `git checkout main && npm run build`

---

## Next Steps After Migration

1. **Train editors**: Show non-technical users how to edit content
2. **Document workflows**: Create a guide for common tasks
3. **Monitor performance**: Check page load times
4. **Add more features**: Implement FAQs, testimonials, etc.

---

## Support Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Community**: https://slack.sanity.io/

---

## Estimated Timeline

| Phase | Time | Status |
|-------|------|--------|
| Schema Setup | 30 min | ⏳ |
| Content Migration | 1-2 hours | ⏳ |
| Frontend Updates | 2-3 hours | ⏳ |
| SEO Implementation | 30 min | ⏳ |
| Testing | 1 hour | ⏳ |
| **Total** | **5-7 hours** | |

---

## Post-Migration Benefits

✅ **100% of site content now editable** in Sanity Studio  
✅ **No code changes needed** for content updates  
✅ **SEO fully manageable** by non-technical editors  
✅ **Type-safe** with full TypeScript support  
✅ **Scalable** architecture for future growth  
✅ **Preview mode ready** for draft content  
✅ **Multi-language ready** (with minimal config)

---

🎉 **You're ready to go!** Start with Phase 1 and work through each phase systematically.
