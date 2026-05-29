import type { MetadataRoute } from 'next';
import { cities } from '@/data/cities';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/areas`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/emergency-plumber/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = areas.map((a) => ({
    url: `${SITE_URL}/emergency-plumber/${a.citySlug}/${a.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...areaPages, ...servicePages];
}
