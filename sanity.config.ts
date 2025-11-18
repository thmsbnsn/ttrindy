import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import structure from './sanity/structure'
import { StudioLogo } from './sanity/components/StudioLogo'

// Get environment variables - works in both Vite and Node.js contexts
const getEnvVar = (key: string, fallback: string) => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback
  }
  return fallback
}

export default defineConfig({
  name: 'default',
  title: 'Top Tier Restoration CMS',

  projectId: getEnvVar('VITE_SANITY_PROJECT_ID', 'o2ba67uq'),
  dataset: getEnvVar('VITE_SANITY_DATASET', 'production'),

  basePath: '/studio',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Branding customization
  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  // Theme customization with brand colors
  theme: {
    '--sanity-color-base-cyan': '#00AEEF', // Primary brand color
    '--sanity-color-base-orange': '#FF6B35', // Accent color
    '--sanity-color-base-focus-color': '#00AEEF',
    '--sanity-color-base-selection-color': '#00AEEF',
  },
})

