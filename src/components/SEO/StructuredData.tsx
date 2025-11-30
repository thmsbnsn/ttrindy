import { CONTACT_INFO } from '@/config/contact';

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'BlogPosting';
  data?: Record<string, any>;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  let schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  if (type === 'LocalBusiness' || type === 'Organization') {
    schema = {
      ...schema,
      '@id': 'https://ttrindy.com',
      name: 'Top Tier Restoration',
      image: 'https://ttrindy.com/og-image.webp',
      url: 'https://ttrindy.com',
      telephone: CONTACT_INFO.phone.href.replace('tel:', ''),
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_INFO.address.street,
        addressLocality: CONTACT_INFO.address.city,
        addressRegion: CONTACT_INFO.address.state,
        postalCode: CONTACT_INFO.address.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 39.7684, // Indianapolis coordinates
        longitude: -86.1581,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      sameAs: [
        // Add social media URLs when available
        // 'https://www.facebook.com/toptierrestoration',
        // 'https://www.instagram.com/toptierrestoration',
      ],
    };

    // Add service areas
    schema.areaServed = CONTACT_INFO.serviceAreas.map((city) => ({
      '@type': 'City',
      name: city,
      addressRegion: 'IN',
      addressCountry: 'US',
    }));
  }

  if (type === 'Article' || type === 'BlogPosting') {
    schema = {
      ...schema,
      ...data,
      publisher: {
        '@type': 'Organization',
        name: 'Top Tier Restoration',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ttrindy.com/logo-icon.png',
        },
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

