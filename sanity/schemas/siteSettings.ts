import { defineField, defineType } from 'sanity'

import { Cog } from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    // Branding
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Site logo (used in navbar and footer)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Description of the logo for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Full business name',
      initialValue: 'Top Tier Restoration',
      validation: (Rule) => Rule.required(),
    }),
    // Contact Information
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Primary phone number for CTAs (format: (555) 123-4567)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
            name: 'phone',
            invert: false,
          })
          .error('Please use format: (555) 123-4567'),
      placeholder: '(555) 123-4567',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Primary email address for contact form',
      validation: (Rule) => Rule.required().email(),
      placeholder: 'info@toptierrestoration.com',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zip', type: 'string', title: 'ZIP Code' },
      ],
    }),
    // Brand Colors
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (Cyan Blue)',
      type: 'color',
      description: 'Main brand color - used for links, primary buttons',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
      initialValue: { hex: '#00AEEF' },
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color (Orange)',
      type: 'color',
      description: 'Emergency/urgent action color - used for CTAs',
      options: {
        disableAlpha: true,
      },
      initialValue: { hex: '#FF5C33' },
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Default meta description for the site',
          validation: (Rule) => Rule.max(160),
          rows: 3,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Open Graph Image',
          description: 'Default image for social media sharing',
        },
      ],
    }),
    // Business Information
    defineField({
      name: 'businessInfo',
      title: 'Business Information',
      type: 'object',
      fields: [
        {
          name: 'yearsInBusiness',
          type: 'number',
          title: 'Years in Business',
          validation: (Rule) => Rule.required().positive().integer(),
        },
        {
          name: 'projectsCompleted',
          type: 'number',
          title: 'Projects Completed',
          validation: (Rule) => Rule.required().positive().integer(),
        },
        {
          name: 'licenseNumber',
          type: 'string',
          title: 'License Number',
        },
        {
          name: 'insuranceProvider',
          type: 'string',
          title: 'Insurance Provider',
        },
      ],
    }),
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'twitter', type: 'url', title: 'Twitter/X URL' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Configure global site settings',
      }
    },
  },
})

