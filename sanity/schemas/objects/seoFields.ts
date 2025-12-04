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

