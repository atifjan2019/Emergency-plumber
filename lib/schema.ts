import { BRAND, SITE_URL, PHONE_TEL, EMAIL, GAS_SAFE_NUMBER, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from './constants';
import { cities as allCities } from '@/data/cities';
import type { City } from '@/data/cities';
import type { Service } from '@/data/services';

const ORG_DESCRIPTION =
  `${BRAND} provides 24/7 emergency plumbing services across 12 UK cities. Gas Safe registered engineers handling burst pipes, blocked drains, leak detection, boiler repairs and more.`;

const ORG_IMAGE =
  'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png';

export const organizationSchema = (phoneTel: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  url: SITE_URL,
  telephone: phoneTel,
  email: EMAIL,
  description: ORG_DESCRIPTION,
  image: ORG_IMAGE,
  logo: ORG_IMAGE,
  priceRange: '££',
  openingHours: 'Mo-Su 00:00-23:59',
  areaServed: allCities.map((c) => ({ '@type': 'City', name: c.name })),
  hasCredential: { '@type': 'EducationalOccupationalCredential', name: `Gas Safe Registered #${GAS_SAFE_NUMBER}` },
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

export const cityPlumberSchema = (city: City, phoneTel: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: `${BRAND} Emergency Plumber ${city.name}`,
  url: `${SITE_URL}/emergency-plumber/${city.slug}`,
  telephone: phoneTel,
  priceRange: '££',
  openingHours: 'Mo-Su 00:00-23:59',
  areaServed: { '@type': 'City', name: city.name },
  geo: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
  address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.region, addressCountry: 'GB' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: NATIONWIDE_RATING,
    reviewCount: Math.floor(NATIONWIDE_REVIEW_COUNT / 12),
  },
});

export const serviceSchema = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.shortDescription,
  url: `${SITE_URL}/services/${service.slug}`,
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  serviceType: 'Emergency Plumbing',
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
