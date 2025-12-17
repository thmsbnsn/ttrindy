import { getSiteSettings } from '@/lib/sanity';
import type { SiteSettings } from '@/types/sanity';

/**
 * Centralized contact information configuration
 * Update these values to change contact details site-wide
 * Note: Phone CTA is now controlled via Sanity CMS - use getPhoneInfo() helper
 */

export const CONTACT_INFO = {
  // Phone CTA controlled via Sanity - see getPhoneInfo() helper
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

/**
 * Phone information interface
 */
export interface PhoneInfo {
  enabled: boolean;
  phoneNumber?: string;
  displayNumber?: string;
  href?: string;
}

/**
 * Get phone CTA information from Sanity
 * Returns whether phone CTA is enabled and the phone number if available
 */
export async function getPhoneInfo(): Promise<PhoneInfo> {
  try {
    const settings = await getSiteSettings();
    
    if (!settings || !settings.contact) {
      return { enabled: false };
    }
    
    const { enablePhoneCTA, phoneNumber } = settings.contact;
    
    if (!enablePhoneCTA || !phoneNumber) {
      return { enabled: false };
    }
    
    // Format phone number for tel: link (remove formatting)
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    return {
      enabled: true,
      phoneNumber: phoneNumber, // Formatted: (555) 123-4567
      displayNumber: phoneNumber,
      href: `tel:+1${cleanNumber}`, // tel:+15551234567
    };
  } catch (error) {
    console.error('Error fetching phone info from Sanity:', error);
    return { enabled: false };
  }
}

