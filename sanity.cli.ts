import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'o2ba67uq',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  },
  // Deployment configuration - prevents prompting for app ID on deploy
  appId: 'kygq9jmu4dxmizo7zzfzbv3h',
})

