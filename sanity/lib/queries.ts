// sanity/lib/queries.ts
/**
 * GROQ queries for fetching content from Sanity
 * All queries are typed and optimized for performance
 */

// ==================== SITE SETTINGS ====================
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  branding {
    logo {
      asset,
      alt
    },
    siteName,
    tagline,
    primaryColor,
    accentColor
  },
  contact {
    phoneNumber,
    email,
    address {
      street,
      city,
      state,
      zip
    },
    serviceArea
  },
  businessInfo {
    yearsInBusiness,
    projectsCompleted,
    licenseNumber,
    insuranceProvider,
    emergencyAvailability
  },
  socialMedia {
    facebook,
    instagram,
    twitter,
    linkedin,
    youtube
  },
  navigation {
    mainMenu[] {
      title,
      url,
      openInNewTab
    },
    ctaButton {
      text,
      url
    }
  },
  footer {
    aboutText,
    quickLinks[] {
      title,
      url,
      openInNewTab
    },
    copyrightText
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    }
  }
}`

// ==================== HOME PAGE ====================
export const homePageQuery = `*[_type == "homePage"][0] {
  _id,
  hero {
    headline,
    subheadline,
    backgroundImage {
      asset,
      alt
    },
    primaryCta {
      text,
      url
    },
    secondaryCta {
      text,
      url
    }
  },
  servicesSection {
    title,
    description,
    services[] {
      icon,
      title,
      description,
      blogSlug,
      projectCategory,
      faqAnchor
    },
    ctaText,
    ctaUrl
  },
  featuredProjectsSection {
    title,
    description,
    showFeaturedProjects,
    maxProjects
  },
  whyUsSection {
    title,
    description,
    features[] {
      icon,
      title,
      description
    }
  },
  finalCta {
    title,
    description,
    primaryCta {
      text,
      url
    },
    secondaryCta {
      text,
      url
    }
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
}`

// ==================== ABOUT PAGE ====================
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  _id,
  pageTitle,
  subtitle,
  storySection {
    title,
    content,
    image {
      asset,
      alt
    }
  },
  statsSection {
    stats[] {
      number,
      label
    }
  },
  valuesSection {
    title,
    values[] {
      icon,
      title,
      description
    }
  },
  contactSection {
    title,
    showContactForm,
    formTitle
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
}`

// ==================== SERVICES PAGE ====================
export const servicesPageQuery = `*[_type == "servicesPage"][0] {
  _id,
  pageTitle,
  subtitle,
  services[] {
    icon,
    title,
    description,
    features,
    image {
      asset,
      alt
    },
    faqId
  },
  emergencyCta {
    title,
    description,
    primaryButtonText,
    secondaryButtonText
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
}`

// ==================== PROJECTS ====================
export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  slug,
  location,
  date,
  description,
  "category": category->title,
  "categorySlug": category->slug.current,
  "mainImage": images[0],
  featured
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  location,
  date,
  description,
  fullDescription,
  "category": category->title,
  "categorySlug": category->slug.current,
  images[] {
    asset,
    alt,
    caption
  },
  videos[] {
    url,
    title,
    thumbnail {
      asset
    }
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(date desc) [0...$limit] {
  _id,
  title,
  slug,
  location,
  date,
  description,
  "category": category->title,
  "categorySlug": category->slug.current,
  "mainImage": images[0],
  featured
}`

// ==================== BLOG POSTS ====================
export const blogPostsQuery = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  mainImage {
    asset,
    alt
  },
  tags
}`

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  mainImage {
    asset,
    alt
  },
  body,
  tags,
  relatedProjects[]-> {
    _id,
    title,
    slug,
    "mainImage": images[0],
    "category": category->title
  },
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
}`

// ==================== CATEGORIES ====================
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  icon
}`

// ==================== CONSTRUCTION PAGE ====================
export const constructionPageQuery = `*[_type == "constructionPage"][0] {
  _id,
  isActive,
  heading,
  password,
  subheading
}`

// ==================== HELPER: GET PAGE SEO DATA ====================
export const getPageSeoQuery = (pageType: string) => `
  *[_type == "${pageType}"][0].seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt
    },
    noIndex
  }
`
