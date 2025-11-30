import { client, previewClient } from '../../sanity/lib/client'
import type { Project, BlogPost, Category } from '../types/sanity'

// Helper to determine if we're in preview mode
export const isPreview = () => {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has('preview')
}

export const getClient = () => {
  return isPreview() ? previewClient : client
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    location,
    date,
    description,
    "category": category->title,
    "categorySlug": category->slug.current,
    "mainImage": mainImage {
      asset,
      alt
    },
    featured
  }`

  return await getClient().fetch(query)
}

// Fetch project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
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
    "mainImage": mainImage {
      asset,
      alt
    },
    "additionalImages": additionalImages[] {
      asset,
      alt
    },
    videos[] {
      url,
      "thumbnail": thumbnail.asset
    }
  }`

  const project = await getClient().fetch(query, { slug })

  // Combine mainImage and additionalImages into images array for compatibility
  if (project) {
    const images = []
    if (project.mainImage) {
      images.push(project.mainImage)
    }
    if (project.additionalImages && project.additionalImages.length > 0) {
      images.push(...project.additionalImages)
    }
    return {
      ...project,
      images: images.length > 0 ? images : undefined
    }
  }

  return project
}

// Fetch featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(date desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    location,
    date,
    description,
    "category": category->title,
    "categorySlug": category->slug.current,
    "mainImage": mainImage {
      asset,
      alt
    },
    featured
  }`

  return await getClient().fetch(query)
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    publishedAt,
    "mainImage": mainImage {
      asset,
      alt
    },
    tags
  }`

  return await getClient().fetch(query)
}

// Fetch blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    publishedAt,
    "mainImage": mainImage {
      asset,
      alt
    },
    body,
    tags
  }`

  return await getClient().fetch(query, { slug })
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon
  }`

  return await getClient().fetch(query)
}

