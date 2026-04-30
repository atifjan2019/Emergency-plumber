import type { Metadata } from 'next';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/data/services';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

const SERVICES_TITLE = `Emergency Plumbing Services | UK 24/7 | ${BRAND}`;
const SERVICES_DESCRIPTION = `All emergency plumbing services covered 24/7 across the UK - burst pipes, boiler repair, blocked drains, no hot water, leak detection and more.`;
const SERVICES_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    url: SERVICES_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function ServicesIndex() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services' },
  ];
  return (
    <>
      <SchemaMarkup
        data={[
          webPageSchema({ url: SERVICES_URL, name: SERVICES_TITLE, description: SERVICES_DESCRIPTION, type: 'CollectionPage' }),
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
            <span className="eyebrow">Our services</span>
            <h1 className="mt-4">Emergency plumbing services</h1>
            <p className="mt-5 max-w-2xl text-gray-soft text-lg leading-relaxed">
              Eight services, every engineer trained on every one. 24/7 response across 12 UK cities. Same rates day or night.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Local plumber repairing pipework on an emergency callout"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="all-services" className="section">
        <div className="container-content">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.name}
                description={s.shortDescription}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
