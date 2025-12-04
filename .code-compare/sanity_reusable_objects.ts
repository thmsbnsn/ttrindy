// sanity/schemas/objects/serviceCard.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: Service Card
 * Individual service card for homepage and services page
 */
export default defineType({
  name: 'serviceCard',
  title: 'Service Card',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., Droplets, Flame, CloudRain, Hammer)',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Water (Droplets)', value: 'Droplets' },
          { title: 'Fire (Flame)', value: 'Flame' },
          { title: 'Storm (CloudRain)', value: 'CloudRain' },
          { title: 'Remodeling (Hammer)', value: 'Hammer' },
          { title: 'Shield', value: 'Shield' },
          { title: 'Award', value: 'Award' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Users', value: 'Users' },
        ],
      },
    },
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'blogSlug',
      title: 'Related Blog Post Slug',
      type: 'string',
      description: 'Slug of related blog post (e.g., water-damage-restoration)',
    },
    {
      name: 'projectCategory',
      title: 'Related Project Category',
      type: 'string',
      description: 'Project category name for filtering (e.g., Water Damage)',
    },
    {
      name: 'faqAnchor',
      title: 'FAQ Anchor Link',
      type: 'string',
      description: 'Anchor ID on services page (e.g., water-damage-faq)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

// sanity/schemas/objects/featureCard.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: Feature Card
 * Feature/benefit card for "Why Choose Us" sections
 */
export default defineType({
  name: 'featureCard',
  title: 'Feature Card',
  type: 'object',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Shield', value: 'Shield' },
          { title: 'Award', value: 'Award' },
          { title: 'Clock', value: 'Clock' },
          { title: 'Users', value: 'Users' },
          { title: 'Heart', value: 'Heart' },
          { title: 'Target', value: 'Target' },
          { title: 'CheckCircle', value: 'CheckCircle2' },
          { title: 'Star', value: 'Star' },
        ],
      },
    },
    {
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(150),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

// sanity/schemas/objects/statCard.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: Stat Card
 * Statistics/numbers display (e.g., "15+ Years Experience")
 */
export default defineType({
  name: 'statCard',
  title: 'Statistic Card',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number/Statistic',
      type: 'string',
      description: 'e.g., "15+", "1000+", "100%", "24/7"',
      validation: (Rule) => Rule.required().max(20),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Years Experience", "Projects Completed"',
      validation: (Rule) => Rule.required().max(50),
    },
  ],
  preview: {
    select: {
      number: 'number',
      label: 'label',
    },
    prepare({ number, label }) {
      return {
        title: `${number} ${label}`,
      }
    },
  },
})

// sanity/schemas/objects/seoFields.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: SEO Fields
 * Reusable SEO metadata object for all pages/posts
 */
export default defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (50-60 characters)',
      validation: (Rule) => 
        Rule.max(60).warning('Titles over 60 characters may be truncated in search results'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO description (150-160 characters)',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions over 160 characters may be truncated'),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    },
  ],
})
