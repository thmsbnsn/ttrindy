/**
 * Centralized contact information configuration
 * Update these values to change contact details site-wide
 */

export const CONTACT_INFO = {
  phone: {
    display: '(317) 469-6504', // Display format for UI
    raw: '3174696504', // Raw number without formatting
    href: 'tel:+13174696504', // Proper tel: link format with country code
  },
  email: {
    display: 'Ben@ttrindy.com',
    href: 'mailto:Ben@ttrindy.com',
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
    emergency: '24/7 Emergency Service',
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
 * Helper function to get phone number in different formats
 */
export const getPhoneNumber = {
  display: () => CONTACT_INFO.phone.display,
  raw: () => CONTACT_INFO.phone.raw,
  href: () => CONTACT_INFO.phone.href,
  tel: () => CONTACT_INFO.phone.href, // Alias for href
};

