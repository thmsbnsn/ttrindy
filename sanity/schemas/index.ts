// sanity/schemas/index.ts
/**
 * Central schema registry for Sanity Studio
 * Import all document types, object types, and singletons here
 * IMPORTANT: Object types must be imported before document types that reference them
 */

// ==================== OBJECT TYPES (Must come first!) ====================
import navigationItem from './objects/navigationItem'
import serviceCard from './objects/serviceCard'
import featureCard from './objects/featureCard'
import statCard from './objects/statCard'
import seoFields from './objects/seoFields'

// ==================== DOCUMENT TYPES ====================
import project from './project'
import blogPost from './blogPost'
import category from './category'

// ==================== SINGLETONS ====================
import siteSettings from './siteSettings'
import homePage from './singletons/homePage'
import aboutPage from './singletons/aboutPage'
import servicesPage from './singletons/servicesPage'

/**
 * Schema types array
 * Order matters: Object types first, then document types, then singletons
 */
export const schemaTypes = [
  // Reusable object types (MUST come first - referenced by document types)
  navigationItem,
  serviceCard,
  featureCard,
  statCard,
  seoFields,

  // Main document types
  project,
  blogPost,
  category,

  // Singletons (will appear at top of structure)
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
]
