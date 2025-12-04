// sanity/schemas/index.ts
/**
 * Central schema registry for Sanity Studio
 * Import all document types, object types, and singletons here
 */

// ==================== SINGLETONS ====================
import siteSettings from './singletons/siteSettings'
import homePage from './singletons/homePage'
import aboutPage from './singletons/aboutPage'
import servicesPage from './singletons/servicesPage'

// ==================== DOCUMENT TYPES ====================
import project from './project'
import blogPost from './blogPost'
import category from './category'

// ==================== OBJECT TYPES ====================
import navigationItem from './objects/navigationItem'
import serviceCard from './objects/serviceCard'
import featureCard from './objects/featureCard'
import statCard from './objects/statCard'
import seoFields from './objects/seoFields'

/**
 * Schema types array
 * Order matters for Studio UI - singletons and common types should come first
 */
export const schemaTypes = [
  // Singletons (will appear at top of structure)
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,

  // Main document types
  project,
  blogPost,
  category,

  // Reusable object types
  navigationItem,
  serviceCard,
  featureCard,
  statCard,
  seoFields,
]
