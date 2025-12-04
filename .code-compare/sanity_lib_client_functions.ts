// src/lib/sanity.ts
/**
 * Sanity client functions for fetching CMS content
 * All functions are typed and handle errors gracefully
 */
import { client } from '../../sanity/lib/client'
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
} from '../../sanity/lib/queries'
import type { 
  SiteSettings, 
  HomePage, 
  AboutPage, 
  ServicesPage, 
  Project, 
  BlogPost, 
  Category 
} from '@/types/sanity'

// ==================== SITE SETTINGS ====================
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// ==================== HOME PAGE ====================
export async function getHomePage(): Promise<HomePage | null> {
  try {
    return await client.fetch(homePageQuery)
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

// ==================== ABOUT PAGE ====================
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await client.fetch(aboutPageQuery)
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

// ==================== SERVICES PAGE ====================
export async function getServicesPage(): Promise<ServicesPage | null> {
  try {
    return await client.fetch(servicesPageQuery)
  } catch (error) {
    console.error('Error fetching services page:', error)
    return null
  }
}

// ==================== PROJECTS ====================
export async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch(projectsQuery)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await client.fetch(projectBySlugQuery, { slug })
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  try {
    return await client.fetch(featuredProjectsQuery, { limit })
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// ==================== BLOG POSTS ====================
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(blogPostBySlugQuery, { slug })
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

// ==================== CATEGORIES ====================
export async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch(categoriesQuery)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// ==================== HELPERS ====================
/**
 * Revalidate time for static generation (in seconds)
 * Adjust based on how often content changes
 */
export const REVALIDATE_TIME = 60 // 1 minute

/**
 * Helper to check if running in preview mode
 */
export function isPreviewMode(): boolean {
  return typeof window !== 'undefined' && 
         window.location.search.includes('preview=true')
}
