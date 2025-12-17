// sanity/schemas/siteSettings.ts
import { defineField, defineType } from 'sanity'

/**
 * SINGLETON: Site Settings
 * Global configuration and branding that appears across all pages
 * This is the single source of truth for company info, contact details, and brand colors
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  // Singleton pattern - only one document allowed
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ==================== BRANDING ====================
    defineField({
      name: 'branding',
      title: 'Branding',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          description: 'Main logo (used in navbar and footer)',
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
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          description: 'Full business name',
          initialValue: 'Top Tier Restoration',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Short tagline (e.g., "Professional Restoration Services")',
          validation: (Rule) => Rule.max(100),
        },
        {
          name: 'primaryColor',
          title: 'Primary Color (Cyan Blue)',
          type: 'string',
          description: 'Main brand color - used for links, primary buttons (hex format: #00AEEF)',
          validation: (Rule) => Rule.required().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color'),
          initialValue: '#00AEEF',
        },
        {
          name: 'accentColor',
          title: 'Accent Color (Orange)',
          type: 'string',
          description: 'Emergency/urgent action color - used for CTAs (hex format: #FF6B35)',
          validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Please enter a valid hex color'),
          initialValue: '#FF6B35',
        },
      ],
    }),

    // ==================== CONTACT INFORMATION ====================
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'enablePhoneCTA',
          title: 'Enable Phone Call CTA',
          type: 'boolean',
          description: 'Toggle to show/hide phone number call-to-action buttons throughout the site',
          initialValue: false,
        },
        {
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          description: 'Primary phone number for CTAs (format: (555) 123-4567). Required if Phone CTA is enabled.',
          validation: (Rule) =>
            Rule.custom((phoneNumber, context) => {
              // @ts-ignore - accessing parent context
              const enablePhoneCTA = context.parent?.enablePhoneCTA;
              
              // If phone CTA is enabled, phone number is required
              if (enablePhoneCTA && !phoneNumber) {
                return 'Phone number is required when Phone CTA is enabled';
              }
              
              // If phone number is provided, validate format
              if (phoneNumber && !/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
                return 'Please use format: (555) 123-4567';
              }
              
              return true;
            }),
          placeholder: '(555) 123-4567',
          hidden: ({ parent }) => !parent?.enablePhoneCTA,
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Primary email address',
          validation: (Rule) => Rule.required().email(),
          placeholder: 'info@toptierrestoration.com',
        },
        {
          name: 'address',
          title: 'Business Address',
          type: 'object',
          fields: [
            { name: 'street', type: 'string', title: 'Street Address' },
            { name: 'city', type: 'string', title: 'City', validation: (Rule) => Rule.required() },
            { name: 'state', type: 'string', title: 'State', validation: (Rule) => Rule.required() },
            { name: 'zip', type: 'string', title: 'ZIP Code' },
          ],
        },
        {
          name: 'serviceArea',
          title: 'Service Area Description',
          type: 'string',
          description: 'e.g., "Greater Indianapolis Metro Area"',
          initialValue: 'Greater Indianapolis Metro Area',
        },
      ],
    }),

    // ==================== BUSINESS INFORMATION ====================
    defineField({
      name: 'businessInfo',
      title: 'Business Information',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'yearsInBusiness',
          type: 'number',
          title: 'Years in Business',
          validation: (Rule) => Rule.required().positive().integer(),
          initialValue: 15,
        },
        {
          name: 'projectsCompleted',
          type: 'number',
          title: 'Projects Completed',
          validation: (Rule) => Rule.required().positive().integer(),
          initialValue: 1000,
        },
        {
          name: 'licenseNumber',
          type: 'string',
          title: 'License Number',
          description: 'State license number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'insuranceProvider',
          type: 'string',
          title: 'Insurance Provider',
        },
        {
          name: 'emergencyAvailability',
          type: 'string',
          title: 'Emergency Availability',
          initialValue: '24/7 Emergency Service',
        },
      ],
    }),

    // ==================== SOCIAL MEDIA ====================
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'twitter', type: 'url', title: 'Twitter/X URL' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'youtube', type: 'url', title: 'YouTube URL' },
      ],
    }),

    // ==================== NAVIGATION ====================
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'mainMenu',
          title: 'Main Menu Items',
          type: 'array',
          of: [{ type: 'navigationItem' }],
          validation: (Rule) => Rule.max(8).warning('Consider limiting menu items for better UX'),
        },
        {
          name: 'ctaButton',
          title: 'Call-to-Action Button',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text', initialValue: 'Get a Free Quote' },
            { name: 'url', type: 'string', title: 'URL', initialValue: '/about#contact' },
          ],
        },
      ],
    }),

    // ==================== FOOTER ====================
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'aboutText',
          title: 'About Text',
          type: 'text',
          rows: 3,
          description: 'Brief description that appears in footer',
          validation: (Rule) => Rule.max(200),
        },
        {
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'array',
          of: [{ type: 'navigationItem' }],
          validation: (Rule) => Rule.max(6),
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© {year} Top Tier Restoration. All rights reserved.',
          description: 'Use {year} for current year',
        },
      ],
    }),

    // ==================== SEO DEFAULTS ====================
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      description: 'Default SEO settings used when page-specific SEO is not set',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Default Meta Title',
          description: 'Default title for pages without specific title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Default Meta Description',
          description: 'Default description for the site',
          validation: (Rule) => Rule.max(160),
          rows: 3,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Default Keywords',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Default Open Graph Image',
          description: 'Default image for social media sharing (1200x630px)',
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})
