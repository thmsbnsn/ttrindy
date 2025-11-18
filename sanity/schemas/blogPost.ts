import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          // Include title and Indianapolis, Greenwood, Indiana area in slug
          const baseSlug = doc.title || ''
          return baseSlug
        },
        slugify: (input: string) => {
          // Custom slugify to include location context
          const slug = input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 80) // Leave room for location suffix
          return slug
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Short description about the blog for card preview',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Top Tier Team',
      description: 'Blog post author',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date of Posting',
      type: 'datetime',
      description: 'Date of posting (blogs displayed in chronological order on webpage)',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Main image that displays on the blog card',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      description: 'Additional images for the blog post detail page',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'The Blog',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { author, publishedAt } = selection
      return {
        ...selection,
        subtitle: author && publishedAt
          ? `${author} • ${new Date(publishedAt).toLocaleDateString()}`
          : author || publishedAt,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})

