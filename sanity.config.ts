import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
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

  // Vite configuration - exclude React app from dependency scanning
  vite: (config: any) => ({
    ...config,
    server: {
      ...config.server,
      fs: {
        ...config.server?.fs,
        deny: ['**/src/**', '**/public/**', '**/dist/**', '**/vite.config.ts'],
      },
    },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // Don't resolve @/ paths - they're for the React app, not Sanity Studio
        // Setting to false might cause build issues, so we'll just not define it
      },
    },
    optimizeDeps: {
      ...config.optimizeDeps,
      exclude: ['@/*'],
    },
  }),
})

export default config
