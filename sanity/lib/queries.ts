// GROQ queries for Sanity

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
    alt
  },
  videos[] {
    url,
    "thumbnail": thumbnail.asset
  }
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(date desc) [0...6] {
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

export const blogPostsQuery = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  "mainImage": mainImage {
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
  "mainImage": mainImage {
    asset,
    alt
  },
  body,
  tags
}`

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  icon
}`

