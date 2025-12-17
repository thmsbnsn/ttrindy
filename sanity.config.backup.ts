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

})



export default config

