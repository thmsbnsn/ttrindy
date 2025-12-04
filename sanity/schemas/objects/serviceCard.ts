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

