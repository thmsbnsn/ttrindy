export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  location: string
  date: string
  description: string
  fullDescription?: any[]
  category?: string
  categorySlug?: string
  mainImage?: SanityImage
  images?: SanityImage[]
  videos?: Array<{
    url: string
    thumbnail?: SanityImage
  }>
  featured?: boolean
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  publishedAt: string
  mainImage?: SanityImage
  body?: any[]
  tags?: string[]
}

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  icon?: string
}

