import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'o2ba67uq'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = '2024-12-01'

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // Use CDN for faster reads
  apiVersion,
})

export const previewClient = createClient({
  projectId,
  dataset,
  useCdn: false, // Don't use CDN for preview
  apiVersion,
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN,
  perspective: 'previewDrafts',
  ignoreBrowserTokenWarning: true, // Only in development
})

// Helper function to get client based on preview mode
export const getClient = (preview = false) =>
  preview ? previewClient : client

