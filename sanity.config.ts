import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './sanity/schemas'
import structure from './sanity/structure'
import { StudioLogo } from './sanity/components/StudioLogo'

// Get environment variables - use process.env for Node.js build context
const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'o2ba67uq'
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'

const config = defineConfig({
  name: 'default',
  title: 'Top Tier Restoration CMS',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure,
    }),
    // colorInput(), // Temporarily disabled to test
  ],

  schema: {
    types: schemaTypes,
  },

  // Branding customization - Sanity v4 API
  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  // Theme customization with brand colors using CSS custom properties
  // These will be applied to the Studio UI
  theme: {
    '--sanity-color-base-cyan': '#00AEEF',
    '--sanity-color-base-orange': '#FF6B35',
    '--sanity-color-base-focus-color': '#00AEEF',
    '--sanity-color-base-selection-color': '#00AEEF',
    '--sanity-color-base-primary': '#00AEEF',
    '--sanity-color-base-accent': '#FF6B35',
  },
})

export default config

