// sanity/schemas/objects/navigationItem.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: Navigation Item
 * Reusable navigation link used in header, footer, and other menus
 */
export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display text for the link',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal path (e.g., /services) or external URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Check for external links',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({ title, url }) {
      return {
        title: title,
        subtitle: url,
      }
    },
  },
})

