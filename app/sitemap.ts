import type { MetadataRoute } from 'next';
import { cities } from '@/data/cities';
import { services } from '@/data/services';
import { SITE_URL } from '@/lib/constants';

const HOME_LASTMOD = new Date('2026-04-30T00:00:00Z');
const SERVICES_LASTMOD = new Date('2026-04-15T00:00:00Z');
const AREAS_LASTMOD = new Date('2026-04-15T00:00:00Z');
const CITY_LASTMOD = new Date('2026-04-25T00:00:00Z');
const SERVICE_DETAIL_LASTMOD = new Date('2026-04-10T00:00:00Z');
const ABOUT_LASTMOD = new Date('2026-03-01T00:00:00Z');
const CONTACT_LASTMOD = new Date('2026-03-15T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: HOME_LASTMOD, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: SERVICES_LASTMOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/areas`, lastModified: AREAS_LASTMOD, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: ABOUT_LASTMOD, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: CONTACT_LASTMOD, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/emergency-plumber/${c.slug}`,
    lastModified: CITY_LASTMOD,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: SERVICE_DETAIL_LASTMOD,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...servicePages];
}
