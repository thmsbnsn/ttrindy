// src/types/sanity.ts
/**
 * TypeScript types for Sanity CMS content
 * Keep these in sync with your Sanity schemas
 */

import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ==================== BASE TYPES ====================
export interface SanityImage {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export interface NavigationItem {
  title: string
  url: string
  openInNewTab?: boolean
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: SanityImage
  noIndex?: boolean
}

// ==================== REUSABLE CONTENT BLOCKS ====================
export interface ServiceCard {
  icon: string
  title: string
  description: string
  blogSlug?: string
  projectCategory?: string
  faqAnchor?: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface StatCard {
  number: string
  label: string
}

// ==================== SITE SETTINGS ====================
export interface SiteSettings {
  _id: string
  branding: {
    logo: SanityImage
    siteName: string
    tagline?: string
    primaryColor: { hex: string }
    accentColor: { hex: string }
  }
  contact: {
    phoneNumber: string
    email: string
    address: {
      street?: string
      city: string
      state: string
      zip?: string
    }
    serviceArea: string
  }
  businessInfo: {
    yearsInBusiness: number
    projectsCompleted: number
    licenseNumber: string
    insuranceProvider?: string
    emergencyAvailability: string
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
  }
  navigation: {
    mainMenu: NavigationItem[]
    ctaButton: {
      text: string
      url: string
    }
  }
  footer: {
    aboutText?: string
    quickLinks: NavigationItem[]
    copyrightText: string
  }
  seo?: SeoFields
}

// ==================== HOME PAGE ====================
export interface HomePage {
  _id: string
  hero: {
    headline: string
    subheadline?: string
    backgroundImage: SanityImage
    primaryCta: {
      text: string
      url: string
    }
    secondaryCta?: {
      text: string
      url: string
    }
  }
  servicesSection: {
    title: string
    description?: string
    services: ServiceCard[]
    ctaText: string
    ctaUrl: string
  }
  featuredProjectsSection: {
    title: string
    description?: string
    showFeaturedProjects: boolean
    maxProjects: number
  }
  whyUsSection: {
    title: string
    description?: string
    features: FeatureCard[]
  }
  finalCta: {
    title: string
    description?: string
    primaryCta: {
      text: string
      url: string
    }
    secondaryCta?: {
      text: string
      url: string
    }
  }
  seo?: SeoFields
}

// ==================== ABOUT PAGE ====================
export interface AboutPage {
  _id: string
  pageTitle: string
  subtitle?: string
  storySection: {
    title: string
    content: PortableTextBlock[]
    image?: SanityImage
  }
  statsSection: {
    stats: StatCard[]
  }
  valuesSection: {
    title: string
    values: FeatureCard[]
  }
  contactSection: {
    title: string
    showContactForm: boolean
    formTitle?: string
  }
  seo?: SeoFields
}

// ==================== SERVICES PAGE ====================
export interface ServiceDetail {
  icon: string
  title: string
  description: string
  features: string[]
  image: SanityImage
  faqId?: string
}

export interface ServicesPage {
  _id: string
  pageTitle: string
  subtitle?: string
  services: ServiceDetail[]
  emergencyCta: {
    title: string
    description?: string
    primaryButtonText: string
    secondaryButtonText: string
  }
  seo?: SeoFields
}

// ==================== PROJECT ====================
export interface Project {
  _id: string
  title: string
  slug: string
  location: string
  date: string
  category?: string
  categorySlug?: string
  description: string
  fullDescription?: PortableTextBlock[]
  mainImage?: SanityImage
  images?: SanityImage[]
  videos?: {
    url: string
    title?: string
    thumbnail?: SanityImage
  }[]
  featured?: boolean
  publishedAt?: string
  seo?: SeoFields
}

// ==================== BLOG POST ====================
export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  author?: string
  publishedAt: string
  mainImage: SanityImage
  body: PortableTextBlock[]
  tags?: string[]
  relatedProjects?: Project[]
  seo?: SeoFields
}

// ==================== CATEGORY ====================
export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  icon?: string
}

// ==================== CONSTRUCTION PAGE ====================
export interface ConstructionPage {
  _id: string
  isActive: boolean
  heading: string
  password: string
  subheading?: string
}
