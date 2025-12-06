/**
 * Check Home Page Document Status
 *
 * This script checks if the homePage document exists and is published
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config()

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'o2ba67uq'
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_LOCAL_DEVELOPMENT_API || process.env.SANITY_STUDIO_API_TOKEN

if (!token) {
  console.error('❌ Error: API token required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-12-01',
})

async function checkHomePage() {
  console.log('🔍 Checking Home Page document...\n')

  try {
    // Check for published document
    const published = await client.fetch('*[_type == "homePage"][0]')

    // Check for draft document
    const draft = await client.fetch('*[_type == "homePage" && _id == "drafts.homePage"][0]')

    console.log('📄 Published Document:')
    if (published) {
      console.log('   ✅ Published document exists')
      console.log(`   ID: ${published._id}`)
      console.log(`   Has hero: ${!!published.hero}`)
      console.log(`   Has servicesSection: ${!!published.servicesSection}`)
      console.log(`   Has whyUsSection: ${!!published.whyUsSection}`)
      console.log(`   Has finalCta: ${!!published.finalCta}`)

      if (published.hero) {
        console.log(`   Hero headline: ${published.hero.headline || 'MISSING'}`)
        console.log(`   Hero subheadline: ${published.hero.subheadline ? 'Present' : 'MISSING'}`)
      }

      if (published.servicesSection) {
        console.log(`   Services count: ${published.servicesSection.services?.length || 0}`)
        console.log(`   Services title: ${published.servicesSection.title || 'MISSING'}`)
      }

      if (published.whyUsSection) {
        console.log(`   Features count: ${published.whyUsSection.features?.length || 0}`)
        console.log(`   Why Us title: ${published.whyUsSection.title || 'MISSING'}`)
      }
    } else {
      console.log('   ❌ No published document found')
    }

    console.log('\n📝 Draft Document:')
    if (draft) {
      console.log('   ⚠️  Draft document exists (needs to be published)')
      console.log(`   ID: ${draft._id}`)
    } else {
      console.log('   ℹ️  No draft document found')
    }

    if (!published && draft) {
      console.log('\n⚠️  ISSUE FOUND:')
      console.log('   The Home Page exists as a draft but is not published.')
      console.log('   Go to Sanity Studio and click "Publish" to make it visible on the website.')
    } else if (!published && !draft) {
      console.log('\n⚠️  ISSUE FOUND:')
      console.log('   No Home Page document exists at all.')
      console.log('   Run: npm run sanity:init')
    } else if (published) {
      console.log('\n✅ Home Page is published and should be visible on the website.')
    }

  } catch (error: any) {
    console.error('❌ Error checking home page:', error.message)
    process.exit(1)
  }
}

checkHomePage()


