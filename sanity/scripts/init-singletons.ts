/**
 * Initialize Singleton Documents
 *
 * This script creates the required singleton documents with default/placeholder data.
 * Run this after your schemas are set up in Sanity Studio.
 *
 * Usage:
 *   npx tsx sanity/scripts/init-singletons.ts
 *
 * Or if you have ts-node:
 *   npx ts-node sanity/scripts/init-singletons.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'o2ba67uq'
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_STUDIO_API_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN or SANITY_STUDIO_API_TOKEN environment variable is required')
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

async function initSiteSettings() {
  console.log('📝 Creating Site Settings...')

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    branding: {
      logo: null, // User should upload their logo
      siteName: 'Top Tier Restoration',
      tagline: 'Professional Restoration Services',
      primaryColor: '#00AEEF',
      accentColor: '#FF6B35',
    },
    contact: {
      phoneNumber: '(317) XXX-XXXX', // User should update
      email: 'info@toptierrestoration.com',
      address: {
        street: '',
        city: 'Indianapolis',
        state: 'IN',
        zip: '',
      },
      serviceArea: 'Greater Indianapolis Metro Area',
    },
    businessInfo: {
      yearsInBusiness: 15,
      projectsCompleted: 1000,
      licenseNumber: 'IN-XXXXX', // User should update
      insuranceProvider: '',
      emergencyAvailability: '24/7 Emergency Service',
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
    navigation: {
      mainMenu: [
        { title: 'Home', url: '/', openInNewTab: false },
        { title: 'Services', url: '/services', openInNewTab: false },
        { title: 'Gallery', url: '/gallery', openInNewTab: false },
        { title: 'Blog', url: '/blog', openInNewTab: false },
        { title: 'About', url: '/about', openInNewTab: false },
      ],
      ctaButton: {
        text: 'Get a Free Quote',
        url: '/about#contact',
      },
    },
    footer: {
      aboutText: 'Top Tier Restoration provides professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. We\'re your trusted partner in home restoration and remodeling throughout the Greater Indianapolis area.',
      quickLinks: [
        { title: 'Services', url: '/services', openInNewTab: false },
        { title: 'Gallery', url: '/gallery', openInNewTab: false },
        { title: 'Blog', url: '/blog', openInNewTab: false },
        { title: 'About Us', url: '/about', openInNewTab: false },
        { title: 'Contact', url: '/about#contact', openInNewTab: false },
      ],
      copyrightText: `© ${new Date().getFullYear()} Top Tier Restoration. All rights reserved.`,
    },
    defaultSeo: {
      metaTitle: 'Top Tier Restoration - Professional Restoration Services in Indianapolis',
      metaDescription: 'Professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis and surrounding Indiana areas.',
      keywords: ['water damage restoration', 'fire damage restoration', 'storm damage repair', 'home remodeling', 'Indianapolis restoration'],
      ogImage: null, // User should upload
    },
  }

  try {
    // Check if document exists
    const existing = await client.getDocument('siteSettings')
    if (existing) {
      console.log('   ⚠️  Site Settings already exists. Skipping...')
      return
    }

    // Create document
    await client.createOrReplace(siteSettings)
    console.log('   ✅ Site Settings created successfully!')
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log('   ⚠️  Site Settings already exists. Skipping...')
    } else {
      console.error('   ❌ Error creating Site Settings:', error.message)
      throw error
    }
  }
}

async function initHomePage() {
  console.log('📝 Creating Home Page...')

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      headline: 'Expert Restoration Services You Can Trust',
      subheadline: '24/7 Emergency Response • Licensed & Insured • Serving Greater Indianapolis',
      backgroundImage: null, // User should upload
      primaryCta: {
        text: 'Get a Free Quote',
        url: '/about#contact',
      },
      secondaryCta: {
        text: 'View Our Work',
        url: '/gallery',
      },
    },
    servicesSection: {
      title: 'Our Services',
      description: 'Comprehensive restoration and remodeling solutions for your home',
      services: [
        {
          icon: 'Droplets',
          title: 'Water Damage Restoration',
          description: 'Fast, professional water damage cleanup and restoration services.',
          blogSlug: null,
          projectCategory: null,
          faqAnchor: null,
        },
        {
          icon: 'Flame',
          title: 'Fire Damage Restoration',
          description: 'Complete fire damage restoration and smoke odor removal.',
          blogSlug: null,
          projectCategory: null,
          faqAnchor: null,
        },
        {
          icon: 'CloudRain',
          title: 'Storm Damage Repair',
          description: 'Expert storm damage assessment and repair services.',
          blogSlug: null,
          projectCategory: null,
          faqAnchor: null,
        },
        {
          icon: 'Hammer',
          title: 'Home Remodeling',
          description: 'Full-service remodeling and renovation solutions.',
          blogSlug: null,
          projectCategory: null,
          faqAnchor: null,
        },
      ],
      ctaText: 'View All Services',
      ctaUrl: '/services',
    },
    featuredProjectsSection: {
      title: 'Featured Projects',
      description: 'See our recent work and quality craftsmanship',
      showFeaturedProjects: true,
      maxProjects: 6,
    },
    whyUsSection: {
      title: 'Why Choose Top Tier Restoration?',
      description: 'Experience, expertise, and dedication to excellence',
      features: [
        {
          icon: 'Clock',
          title: '24/7 Emergency Service',
          description: 'We\'re available around the clock for emergency restoration needs.',
        },
        {
          icon: 'Award',
          title: 'Licensed & Insured',
          description: 'Fully licensed and insured for your peace of mind.',
        },
        {
          icon: 'Users',
          title: 'Experienced Team',
          description: 'Years of experience in restoration and remodeling.',
        },
        {
          icon: 'Shield',
          title: 'Quality Guaranteed',
          description: 'We stand behind our work with a satisfaction guarantee.',
        },
      ],
    },
    finalCta: {
      title: 'Ready to Get Started?',
      description: 'Contact us today for a free consultation and quote.',
      primaryCta: {
        text: 'Get Your Free Quote',
        url: '/about#contact',
      },
      secondaryCta: {
        text: 'Call Now',
        url: 'tel:+1317XXXXXXXX',
      },
    },
    seo: {
      metaTitle: 'Top Tier Restoration - Professional Restoration Services in Indianapolis',
      metaDescription: 'Professional 24/7 emergency restoration services for water damage, fire damage, and storm damage. Expert remodeling and renovation services in Indianapolis.',
      keywords: ['restoration services', 'water damage', 'fire damage', 'storm damage', 'Indianapolis'],
      ogImage: null,
      noIndex: false,
    },
  }

  try {
    const existing = await client.getDocument('homePage')
    if (existing) {
      console.log('   ⚠️  Home Page already exists. Skipping...')
      return
    }

    await client.createOrReplace(homePage)
    console.log('   ✅ Home Page created successfully!')
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log('   ⚠️  Home Page already exists. Skipping...')
    } else {
      console.error('   ❌ Error creating Home Page:', error.message)
      throw error
    }
  }
}

async function initAboutPage() {
  console.log('📝 Creating About Page...')

  const aboutPage = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    pageTitle: 'About Top Tier Restoration',
    subtitle: 'Your Trusted Partner in Home Restoration',
    storySection: {
      content: [
        {
          _type: 'block',
          _key: 'intro',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Top Tier Restoration has been serving the Greater Indianapolis area for over 15 years, providing expert restoration and remodeling services. We specialize in water damage restoration, fire damage restoration, storm damage repair, and complete home remodeling.',
            },
          ],
        },
      ],
      image: null, // User should upload
    },
    statsSection: {
      title: 'Our Track Record',
      stats: [
        { number: '15+', label: 'Years in Business' },
        { number: '1000+', label: 'Projects Completed' },
        { number: '24/7', label: 'Emergency Service' },
        { number: '100%', label: 'Satisfaction Guaranteed' },
      ],
    },
    valuesSection: {
      title: 'Our Values',
      values: [
        {
          icon: 'Heart',
          title: 'Customer First',
          description: 'Your satisfaction is our top priority. We work closely with you every step of the way.',
        },
        {
          icon: 'CheckCircle',
          title: 'Quality Workmanship',
          description: 'We use only the best materials and techniques to ensure lasting results.',
        },
        {
          icon: 'Zap',
          title: 'Fast Response',
          description: 'Quick response times for emergency situations to minimize damage.',
        },
        {
          icon: 'DollarSign',
          title: 'Fair Pricing',
          description: 'Transparent, competitive pricing with no hidden fees.',
        },
      ],
    },
    contactSection: {
      showContactForm: true,
      contactFormTitle: 'Get in Touch',
    },
    seo: {
      metaTitle: 'About Us - Top Tier Restoration | Indianapolis Restoration Experts',
      metaDescription: 'Learn about Top Tier Restoration, your trusted partner for professional restoration and remodeling services in Indianapolis. 15+ years of experience.',
      keywords: ['about top tier restoration', 'Indianapolis restoration company', 'restoration experts'],
      ogImage: null,
      noIndex: false,
    },
  }

  try {
    const existing = await client.getDocument('aboutPage')
    if (existing) {
      console.log('   ⚠️  About Page already exists. Skipping...')
      return
    }

    await client.createOrReplace(aboutPage)
    console.log('   ✅ About Page created successfully!')
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log('   ⚠️  About Page already exists. Skipping...')
    } else {
      console.error('   ❌ Error creating About Page:', error.message)
      throw error
    }
  }
}

async function initServicesPage() {
  console.log('📝 Creating Services Page...')

  const servicesPage = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    pageTitle: 'Our Services',
    subtitle: 'Comprehensive Restoration and Remodeling Solutions',
    services: [
      {
        title: 'Water Damage Restoration',
        description: 'Fast, professional water damage cleanup and restoration services. We respond quickly to minimize damage and restore your property.',
        image: null,
        features: [
          '24/7 Emergency Response',
          'Water Extraction & Drying',
          'Mold Prevention & Remediation',
          'Structural Drying',
          'Content Restoration',
        ],
      },
      {
        title: 'Fire Damage Restoration',
        description: 'Complete fire damage restoration and smoke odor removal. We help you recover from fire damage quickly and completely.',
        image: null,
        features: [
          'Smoke & Soot Removal',
          'Odor Elimination',
          'Structural Repair',
          'Content Cleaning',
          'Full Restoration',
        ],
      },
      {
        title: 'Storm Damage Repair',
        description: 'Expert storm damage assessment and repair services. We handle roof damage, siding repair, and more.',
        image: null,
        features: [
          'Roof Repair & Replacement',
          'Siding & Window Repair',
          'Debris Removal',
          'Structural Assessment',
          'Insurance Coordination',
        ],
      },
      {
        title: 'Home Remodeling',
        description: 'Full-service remodeling and renovation solutions. Transform your space with our expert team.',
        image: null,
        features: [
          'Kitchen Remodeling',
          'Bathroom Renovation',
          'Basement Finishing',
          'Room Additions',
          'Complete Home Renovation',
        ],
      },
    ],
    emergencyCta: {
      title: 'Need Emergency Service?',
      description: 'We\'re available 24/7 for emergency restoration needs. Call us now!',
      phoneNumber: '(317) XXX-XXXX', // User should update
    },
    seo: {
      metaTitle: 'Our Services - Top Tier Restoration | Water, Fire, Storm Damage & Remodeling',
      metaDescription: 'Professional restoration services including water damage, fire damage, storm damage repair, and home remodeling in Indianapolis.',
      keywords: ['water damage restoration', 'fire damage restoration', 'storm damage repair', 'home remodeling', 'Indianapolis'],
      ogImage: null,
      noIndex: false,
    },
  }

  try {
    const existing = await client.getDocument('servicesPage')
    if (existing) {
      console.log('   ⚠️  Services Page already exists. Skipping...')
      return
    }

    await client.createOrReplace(servicesPage)
    console.log('   ✅ Services Page created successfully!')
  } catch (error: any) {
    if (error.statusCode === 409) {
      console.log('   ⚠️  Services Page already exists. Skipping...')
    } else {
      console.error('   ❌ Error creating Services Page:', error.message)
      throw error
    }
  }
}

async function main() {
  console.log('🚀 Initializing Singleton Documents...\n')

  try {
    await initSiteSettings()
    await initHomePage()
    await initAboutPage()
    await initServicesPage()

    console.log('\n✅ All singleton documents initialized successfully!')
    console.log('\n📝 Next Steps:')
    console.log('   1. Go to Sanity Studio and review each document')
    console.log('   2. Upload images (logos, hero images, etc.)')
    console.log('   3. Update contact information (phone numbers, addresses)')
    console.log('   4. Customize content to match your brand')
    console.log('   5. Publish all documents')
  } catch (error: any) {
    console.error('\n❌ Error initializing documents:', error.message)
    process.exit(1)
  }
}

main()

