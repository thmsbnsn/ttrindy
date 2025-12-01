// sanity/schemas/singletons/homePage.ts
import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

/**
 * SINGLETON: Home Page
 * All editable content for the homepage
 */
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: Home,
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'headline',
          title: 'Main Headline',
          type: 'string',
          description: 'Large hero headline',
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          description: 'Supporting text under headline',
          validation: (Rule) => Rule.max(200),
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'primaryCta',
          title: 'Primary Call-to-Action',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Get Emergency Service' },
            { name: 'url', type: 'string', title: 'URL', initialValue: 'tel:(555)123-4567' },
          ],
        },
        {
          name: 'secondaryCta',
          title: 'Secondary Call-to-Action',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'View Our Work' },
            { name: 'url', type: 'string', title: 'URL', initialValue: '/gallery' },
          ],
        },
      ],
    }),

    // ==================== SERVICES PREVIEW ====================
    defineField({
      name: 'servicesSection',
      title: 'Services Preview Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Services',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Expert restoration and remodeling services to bring your property back to life',
        },
        {
          name: 'services',
          title: 'Service Cards',
          type: 'array',
          description: 'Service cards to display (typically 4)',
          of: [{ type: 'serviceCard' }],
          validation: (Rule) => Rule.max(6),
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'View All Services',
        },
        {
          name: 'ctaUrl',
          title: 'CTA Button URL',
          type: 'string',
          initialValue: '/services',
        },
      ],
    }),

    // ==================== FEATURED PROJECTS ====================
    defineField({
      name: 'featuredProjectsSection',
      title: 'Featured Projects Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Projects',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Explore some of our recent restoration and remodeling projects',
        },
        {
          name: 'showFeaturedProjects',
          title: 'Show Featured Projects',
          type: 'boolean',
          description: 'Toggle to show/hide featured projects section',
          initialValue: true,
        },
        {
          name: 'maxProjects',
          title: 'Maximum Projects to Show',
          type: 'number',
          description: 'Number of featured projects to display',
          initialValue: 6,
          validation: (Rule) => Rule.min(3).max(12),
        },
      ],
    }),

    // ==================== WHY CHOOSE US ====================
    defineField({
      name: 'whyUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Why Choose Top Tier?',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'features',
          title: 'Key Features',
          type: 'array',
          of: [{ type: 'featureCard' }],
          validation: (Rule) => Rule.min(3).max(6),
        },
      ],
    }),

    // ==================== FINAL CTA ====================
    defineField({
      name: 'finalCta',
      title: 'Final Call-to-Action Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Ready to Get Started?',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
          initialValue: 'Let Us Restore Your Property to Its Best Condition',
        },
        {
          name: 'primaryCta',
          title: 'Primary Button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Get a Free Quote' },
            { name: 'url', type: 'string', title: 'URL', initialValue: '/about#contact' },
          ],
        },
        {
          name: 'secondaryCta',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'View Our Work' },
            { name: 'url', type: 'string', title: 'URL', initialValue: '/gallery' },
          ],
        },
      ],
    }),

    // ==================== SEO ====================
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoFields',
      description: 'SEO settings specific to the homepage',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Edit homepage content',
      }
    },
  },
})

