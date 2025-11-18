import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import structure from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Top Tier Restoration CMS',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'o2ba67uq',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})

