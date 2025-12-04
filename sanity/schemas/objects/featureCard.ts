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

