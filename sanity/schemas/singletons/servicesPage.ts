// sanity/schemas/singletons/servicesPage.ts
import { defineField, defineType } from 'sanity'
import { Wrench } from 'lucide-react'

/**
 * SINGLETON: Services Page
 * All editable content for the Services page
 */
export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: Wrench,
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Services',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Professional restoration and remodeling services',
    }),

    // ==================== SERVICE DETAILS ====================
    defineField({
      name: 'services',
      title: 'Service Details',
      type: 'array',
      description: 'Detailed service sections (Water, Fire, Storm, Remodeling)',
      of: [
        {
          type: 'object',
          name: 'serviceDetail',
          title: 'Service Detail',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Water (Droplets)', value: 'Droplets' },
                  { title: 'Fire (Flame)', value: 'Flame' },
                  { title: 'Storm (CloudRain)', value: 'CloudRain' },
                  { title: 'Remodeling (Hammer)', value: 'Hammer' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'features',
              title: 'Service Features',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of key features/services included',
              validation: (Rule) => Rule.min(3).max(10),
            },
            {
              name: 'image',
              title: 'Service Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
            {
              name: 'faqId',
              title: 'FAQ Section ID',
              type: 'string',
              description: 'Anchor ID for FAQ section (e.g., water-damage-faq)',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(3).max(6),
    }),

    // ==================== EMERGENCY CTA ====================
    defineField({
      name: 'emergencyCta',
      title: 'Emergency Call-to-Action',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Need Emergency Service?',
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          initialValue: "We're available 24/7 for emergency restoration services.",
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Call Now',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Contact Us',
        },
      ],
    }),

    // ==================== SEO ====================
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Services Page',
        subtitle: 'Edit Services page content',
      }
    },
  },
})

