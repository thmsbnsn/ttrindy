// sanity/schemas/singletons/constructionPage.ts
import { defineField, defineType } from 'sanity'

/**
 * SINGLETON: Construction Page
 * Site under construction page with password protection
 */
export default defineType({
  name: 'constructionPage',
  title: 'Site Under Construction',
  type: 'document',
  icon: () => '🚧',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'isActive',
      title: 'Enable Construction Mode',
      type: 'boolean',
      description: 'When enabled, all visitors will see the construction page and must enter a password to access the site',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading displayed on the construction page',
      initialValue: 'We\'re Under Construction',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'password',
      title: 'Access Password',
      type: 'string',
      description: 'Password required to access the site when construction mode is active',
      validation: (Rule) => Rule.required().min(4),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (Optional)',
      type: 'text',
      description: 'Additional text displayed below the heading',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Site Under Construction',
        subtitle: 'Manage construction mode and access password',
      }
    },
  },
})

