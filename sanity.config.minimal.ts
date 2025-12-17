import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

const config = defineConfig({
  name: 'default',
  title: 'Top Tier Restoration CMS',
  projectId: 'o2ba67uq',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: { types: [] },
})

export default config

