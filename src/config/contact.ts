/**
 * Centralized contact information configuration
 * Update these values to change contact details site-wide
 */

export const CONTACT_INFO = {
  // Phone number removed - all contact buttons now link to contact form
  contactFormUrl: '/about#contact', // URL to contact form section
  email: {
    display: 'info@toptierrestoration.com',
    href: 'mailto:info@toptierrestoration.com',
  },
  address: {
    street: '123 Main Street', // Update with actual street address
    city: 'Indianapolis',
    state: 'IN',
    zip: '46204', // Update with actual zip code
    full: 'Indianapolis, IN', // Short format for footer
    fullAddress: '123 Main Street, Indianapolis, IN 46204', // Full address format
  },
  hours: {
    regular: 'Mon - Fri: 8am - 5pm',
  },
  license: 'IN-12345-PLACEHOLDER', // Update with actual license number
  serviceAreas: [
    'Indianapolis',
    'Carmel',
    'Noblesville',
    'Greenwood',
    'Mooresville',
    'Avon',
    'Brownsburg',
  ] as const,
} as const;

/**
 * Helper function to get contact form URL
 */
export const getContactFormUrl = () => CONTACT_INFO.contactFormUrl;

