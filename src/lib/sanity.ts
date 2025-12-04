// src/lib/sanity.ts
/**
 * Sanity client functions for fetching CMS content
 * All functions are typed and handle errors gracefully
 */
import { getClient } from '../../sanity/lib/client'
import {
  siteSettingsQuery,
  homePageQuery,
  aboutPageQuery,
  servicesPageQuery,
  projectsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  categoriesQuery,
  constructionPageQuery,
} from '../../sanity/lib/queries'
import type {
  SiteSettings,
  HomePage,
  AboutPage,
  ServicesPage,
  Project,
  BlogPost,
  Category,
  ConstructionPage
} from '@/types/sanity'

// Helper to determine if we're in preview mode
export const isPreview = () => {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has('preview')
}

const getSanityClient = () => {
  return getClient(isPreview())
}

// ==================== SITE SETTINGS ====================
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await getSanityClient().fetch(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// ==================== HOME PAGE ====================
export async function getHomePage(): Promise<HomePage | null> {
  try {
    return await getSanityClient().fetch(homePageQuery)
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

// ==================== ABOUT PAGE ====================
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await getSanityClient().fetch(aboutPageQuery)
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

// ==================== SERVICES PAGE ====================
export async function getServicesPage(): Promise<ServicesPage | null> {
  try {
    return await getSanityClient().fetch(servicesPageQuery)
  } catch (error) {
    console.error('Error fetching services page:', error)
    return null
  }
}

// ==================== PROJECTS ====================
export async function getProjects(): Promise<Project[]> {
  try {
    const query = `*[_type == "project" && defined(slug.current)] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      location,
      date,
      description,
      "category": category->title,
      "categorySlug": category->slug.current,
      "mainImage": images[0]{
        asset,
        alt
      },
      featured
    }`
    return await getSanityClient().fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
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
          asset,
          alt
        }
      },
      featured,
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
    return await getSanityClient().fetch(query, { slug })
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  try {
    const query = `*[_type == "project" && featured == true] | order(date desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      location,
      date,
      description,
      "category": category->title,
      "categorySlug": category->slug.current,
      "mainImage": images[0]{
        asset,
        alt
      },
      featured
    }`
    return await getSanityClient().fetch(query, { limit })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// ==================== BLOG POSTS ====================
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      author,
      publishedAt,
      mainImage {
        asset,
        alt
      },
      tags
    }`
    return await getSanityClient().fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
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
        "slug": slug.current,
        "mainImage": images[0]{
          asset,
          alt
        },
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
    return await getSanityClient().fetch(query, { slug })
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

// ==================== CATEGORIES ====================
export async function getCategories(): Promise<Category[]> {
  try {
    const query = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      icon
    }`
    return await getSanityClient().fetch(query)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// ==================== CONSTRUCTION PAGE ====================
export async function getConstructionPage(): Promise<ConstructionPage | null> {
  try {
    return await getSanityClient().fetch(constructionPageQuery)
  } catch (error) {
    console.error('Error fetching construction page:', error)
    return null
  }
}

// ==================== HELPERS ====================
/**
 * Revalidate time for static generation (in seconds)
 * Adjust based on how often content changes
 */
export const REVALIDATE_TIME = 60 // 1 minute
