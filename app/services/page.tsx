import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/data/services';
import { breadcrumbSchema } from '@/lib/schema';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Emergency Plumbing Services | UK 24/7 | ${BRAND}`,
  description: `All emergency plumbing services covered 24/7 across the UK - burst pipes, boiler repair, blocked drains, no hot water, leak detection and more.`,
  alternates: { canonical: '/services' },
};

export default function ServicesIndex() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services' },
  ];
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <section className="section">
        <div className="container-content">
          <h1>Emergency plumbing services</h1>
          <p className="mt-4 max-w-2xl text-gray-soft text-lg">
            Eight services, every engineer trained on every one. 24/7 response across 12 UK cities. Same rates day or night.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
