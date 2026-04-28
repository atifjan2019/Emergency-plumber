import type { Metadata } from 'next';
import CityCard from '@/components/CityCard';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { cities } from '@/data/cities';
import { breadcrumbSchema } from '@/lib/schema';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: `UK Coverage Areas | 24/7 Emergency Plumbers | ${BRAND}`,
  description: `Live emergency plumbing coverage in 12 UK cities including London, Manchester, Birmingham, Glasgow, Leeds, Liverpool and more. Pick your area for local pricing and response times.`,
  alternates: { canonical: '/areas' },
};

export default function AreasIndex() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Areas' },
  ];
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <section className="section">
        <div className="container-content">
          <h1>UK coverage areas</h1>
          <p className="mt-4 max-w-2xl text-gray-soft text-lg">
            Twelve cities under live coverage. Click any city for local pricing, postcodes, recent jobs and customer reviews.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
