import { BRAND, SITE_URL, EMAIL, GAS_SAFE_NUMBER, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from './constants';
import { cities as allCities } from '@/data/cities';
import type { City } from '@/data/cities';
import type { Service } from '@/data/services';

const ORG_DESCRIPTION =
  `${BRAND} provides 24/7 emergency plumbing services across 12 UK cities. Gas Safe registered engineers handling burst pipes, blocked drains, leak detection, boiler repairs and more.`;

const ORG_HERO_IMAGE =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png';

const ORG_LOGO =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/emergency-plumber-now-logo-a.png';

const ORG_SAME_AS = [
  'https://www.google.com/search?q=Emergency+Plumber+Now',
  'https://www.facebook.com/emergencyplumbernow',
  'https://www.trustpilot.com/review/emergencyplumbernow.co.uk',
];

const priceNumber = (s: string): number | undefined => {
  const m = s.match(/£\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : undefined;
};

export const organizationSchema = (phoneTel: string, logoUrl?: string, gasSafeNumber?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  url: SITE_URL,
  telephone: phoneTel,
  email: EMAIL,
  description: ORG_DESCRIPTION,
  image: ORG_HERO_IMAGE,
  logo: logoUrl || ORG_LOGO,
  priceRange: '££',
  openingHours: 'Mo-Su 00:00-23:59',
  areaServed: allCities.map((c) => ({ '@type': 'City', name: c.name })),
  hasCredential: { '@type': 'EducationalOccupationalCredential', name: `Gas Safe Registered #${gasSafeNumber || GAS_SAFE_NUMBER}` },
  sameAs: ORG_SAME_AS,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: NATIONWIDE_RATING,
    reviewCount: NATIONWIDE_REVIEW_COUNT,
    bestRating: 5,
  },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const cityPlumberSchema = (city: City, phoneTel: string) => {
  const url = `${SITE_URL}/emergency-plumber/${city.slug}`;
  const callOutPrice = priceNumber(city.callOutFee);
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${url}#plumber`,
    name: `${BRAND} Emergency Plumber ${city.name}`,
    url,
    telephone: phoneTel,
    image: ORG_HERO_IMAGE,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    priceRange: '££',
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: { '@type': 'City', name: city.name },
    geo: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.region, addressCountry: 'GB' },
    hasMap: `https://www.google.com/maps/search/?api=1&query=emergency+plumber+${encodeURIComponent(city.name)}`,
    ...(callOutPrice !== undefined && {
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'GBP',
          price: callOutPrice,
          minPrice: callOutPrice,
          valueAddedTaxIncluded: true,
        },
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: NATIONWIDE_RATING,
      reviewCount: Math.floor(NATIONWIDE_REVIEW_COUNT / 12),
      bestRating: 5,
    },
  };
};

export const serviceSchema = (service: Service) => {
  const start = priceNumber(service.startingPrice);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    serviceType: 'Emergency Plumbing',
    ...(start !== undefined && {
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'GBP',
          price: start,
          minPrice: start,
          valueAddedTaxIncluded: true,
        },
      },
    }),
  };
};

export const webPageSchema = (input: {
  url: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'ContactPage' | 'AboutPage' | 'CollectionPage';
}) => ({
  '@context': 'https://schema.org',
  '@type': input.type || 'WebPage',
  '@id': `${input.url}#webpage`,
  url: input.url,
  name: input.name,
  description: input.description,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
});

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((q) => ({
    '@type': 'Question',
    name: q.question,
    acceptedAnswer: { '@type': 'Answer', text: q.answer },
  })),
});

export const breadcrumbSchema = (items: { label: string; href?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
  })),
});
