// sanity/schemas/singletons/aboutPage.ts
import { defineField, defineType } from 'sanity'

/**
 * SINGLETON: About Page
 * All editable content for the About Us page
 */
export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '📄',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Top Tier Restoration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Your trusted partner in home restoration and remodeling',
    }),

    // ==================== OUR STORY SECTION ====================
    defineField({
      name: 'storySection',
      title: 'Our Story Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Story',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'content',
          title: 'Story Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Company story and background',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Story Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),

    // ==================== STATS SECTION ====================
    defineField({
      name: 'statsSection',
      title: 'Statistics Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [{ type: 'statCard' }],
          validation: (Rule) => Rule.min(2).max(6),
        },
      ],
    }),

    // ==================== VALUES SECTION ====================
    defineField({
      name: 'valuesSection',
      title: 'Our Values Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Values',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'values',
          title: 'Values',
          type: 'array',
          of: [{ type: 'featureCard' }],
          validation: (Rule) => Rule.min(3).max(6),
        },
      ],
    }),

    // ==================== CONTACT SECTION ====================
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Get In Touch',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'showContactForm',
          title: 'Show Contact Form',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'formTitle',
          title: 'Form Title',
          type: 'string',
          initialValue: 'Send Us a Message',
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
        title: 'About Page',
        subtitle: 'Edit About Us page content',
      }
    },
  },
})

