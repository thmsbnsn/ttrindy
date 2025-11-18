import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: () => '🏗️',
  fields: [
    defineField({
      name: 'title',
      title: 'Title of Project',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, State or full address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Project date (projects displayed in chronological order on webpage)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Short description for project card preview',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Main image that displays on the project card',
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
      description: 'Additional images for the project detail page',
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
      name: 'videos',
      title: 'Project Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'Video URL',
              description: 'YouTube, Vimeo, or direct video URL',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage gallery',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'mainImage',
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Oldest First',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})

