import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'o2ba67uq',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-12-01',
})

export const previewClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'o2ba67uq',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-12-01',
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN,
  perspective: 'previewDrafts',
})

