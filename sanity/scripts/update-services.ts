/**
 * Update and Publish Services Page
 *
 * This script updates the servicesPage document with all required fields
 * (icons, faqId) and publishes it.
 *
 * Usage:
 *   npx tsx sanity/scripts/update-services.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'o2ba67uq'
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_LOCAL_DEVELOPMENT_API || process.env.SANITY_STUDIO_API_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN, SANITY_LOCAL_DEVELOPMENT_API, or SANITY_STUDIO_API_TOKEN environment variable is required')
  console.error('   Get your token from: https://www.sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-12-01',
})

async function updateAndPublishServicesPage() {
  console.log('📝 Updating Services Page...')

  const servicesPage = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    pageTitle: 'Our Services',
    subtitle: 'Comprehensive Restoration and Remodeling Solutions',
    services: [
      {
        icon: 'Droplets',
        title: 'Water Damage Restoration',
        description: 'Fast, professional water damage cleanup and restoration services. We respond quickly to minimize damage and restore your property.',
        features: [
          '24/7 Emergency Response',
          'Water Extraction & Drying',
          'Mold Prevention & Remediation',
          'Structural Drying',
          'Content Restoration',
        ],
        faqId: 'water-damage-faq',
        // Note: Images need to be uploaded manually in Sanity Studio
        // image: null,
      },
      {
        icon: 'Flame',
        title: 'Fire Damage Restoration',
        description: 'Complete fire damage restoration and smoke odor removal. We help you recover from fire damage quickly and completely.',
        features: [
          'Smoke & Soot Removal',
          'Odor Elimination',
          'Structural Repair',
          'Content Cleaning',
          'Full Restoration',
        ],
        faqId: 'fire-damage-faq',
      },
      {
        icon: 'CloudRain',
        title: 'Storm Damage Repair',
        description: 'Expert storm damage assessment and repair services. We handle roof damage, siding repair, and more.',
        features: [
          'Roof Repair & Replacement',
          'Siding & Window Repair',
          'Debris Removal',
          'Structural Assessment',
          'Insurance Coordination',
        ],
        faqId: 'storm-damage-faq',
      },
      {
        icon: 'Hammer',
        title: 'Home Remodeling',
        description: 'Full-service remodeling and renovation solutions. Transform your space with our expert team.',
        features: [
          'Kitchen Remodeling',
          'Bathroom Renovation',
          'Basement Finishing',
          'Room Additions',
          'Complete Home Renovation',
        ],
        faqId: 'home-remodeling-faq',
      },
    ],
    emergencyCta: {
      title: 'Need Emergency Service?',
      description: "We're available 24/7 for emergency restoration needs. Call us now!",
      primaryButtonText: 'Call Now',
      secondaryButtonText: 'Contact Us',
    },
    seo: {
      metaTitle: 'Our Services - Top Tier Restoration | Water, Fire, Storm Damage & Remodeling',
      metaDescription: 'Professional restoration services including water damage, fire damage, storm damage repair, and home remodeling in Indianapolis.',
      keywords: ['water damage restoration', 'fire damage restoration', 'storm damage repair', 'home remodeling', 'Indianapolis'],
      noIndex: false,
    },
  }

  try {
    // Update the document
    await client.createOrReplace(servicesPage)
    console.log('   ✅ Services Page updated successfully!')

    // Publish using mutations API
    const mutations = [
      {
        createOrReplace: {
          ...servicesPage,
          _id: 'servicesPage',
        },
      },
    ]

    const result = await client.mutate(mutations)
    console.log('   ✅ Services Page published successfully!')
    console.log(`   📄 Transaction ID: ${result.transactionId}`)
    console.log(`   🔗 View in Studio: https://ttrindy.sanity.studio/desk/servicesPage`)
  } catch (error: any) {
    console.error('   ❌ Error updating Services Page:', error.message)
    throw error
  }
}

async function main() {
  console.log('🚀 Updating and Publishing Services Page...\n')

  try {
    await updateAndPublishServicesPage()

    console.log('\n✅ Services Page updated and published successfully!')
    console.log('\n📝 Next Steps:')
    console.log('   1. Go to Sanity Studio and upload images for each service')
    console.log('   2. Review and customize the service descriptions if needed')
    console.log('   3. Verify all services are displaying correctly on the website')
  } catch (error: any) {
    console.error('\n❌ Error updating Services Page:', error.message)
    process.exit(1)
  }
}

main()

