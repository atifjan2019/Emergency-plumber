import type { Metadata } from 'next';
import Image from 'next/image';
import CityCard from '@/components/CityCard';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { cities } from '@/data/cities';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

const AREAS_TITLE = `UK Coverage Areas | 24/7 Emergency Plumbers | ${BRAND}`;
const AREAS_DESCRIPTION = `Live emergency plumbing coverage in 12 UK cities including London, Manchester, Birmingham, Glasgow, Leeds, Liverpool. Pick your area for local pricing.`;
const AREAS_URL = `${SITE_URL}/areas`;

export const metadata: Metadata = {
  title: AREAS_TITLE,
  description: AREAS_DESCRIPTION,
  alternates: { canonical: '/areas' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
    title: AREAS_TITLE,
    description: AREAS_DESCRIPTION,
    url: AREAS_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: AREAS_TITLE,
    description: AREAS_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AreasIndex() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Areas' },
  ];
  return (
    <>
      <SchemaMarkup
        data={[
          webPageSchema({ url: AREAS_URL, name: AREAS_TITLE, description: AREAS_DESCRIPTION, type: 'CollectionPage' }),
          breadcrumbSchema(crumbs),
        ]}
      />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-off-white to-white">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="container-content relative py-14 md:py-20 grid gap-10 md:grid-cols-12 md:gap-12 items-center">
          <div className="md:col-span-7">
            <span className="eyebrow">Coverage</span>
            <h1 className="mt-4">UK coverage areas</h1>
            <p className="mt-5 max-w-2xl text-gray-soft text-lg leading-relaxed">
              Twelve cities under live coverage. Click any city for local pricing, postcodes, recent jobs and customer reviews.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="UK plumber van on a local emergency callout"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
