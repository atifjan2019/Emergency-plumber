import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CityCard from '@/components/CityCard';
import FaqAccordion from '@/components/FaqAccordion';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import ServiceIcon from '@/components/ServiceIcon';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services, getServiceBySlug, getServiceSlugs } from '@/data/services';
import { cities } from '@/data/cities';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.name} | 24/7 UK Emergency | ${BRAND}`;
  const description = `${service.shortDescription} 24/7 nationwide UK coverage. Gas Safe registered. Same rates day or night.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/services/${service.slug}`, type: 'website' },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedServices.map((s) => getServiceBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.name },
  ];

  return (
    <>
      <SchemaMarkup
        data={[serviceSchema(service), faqSchema(service.faq), breadcrumbSchema(crumbs)]}
      />

      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <Hero
        variant="service"
        title={`${service.name} - 24/7 UK Emergency`}
        subtitle={service.longDescription}
        responseTime="30 minutes"
      />

      <section className="section">
        <div className="container-content max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2>What's included</h2>
              <ul className="mt-6 space-y-3">
                {service.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                        <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span className="text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-line bg-off-white p-6">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-white">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="mt-4">{service.startingPrice}</h3>
              <p className="mt-2 text-sm text-gray-soft">Same rates day or night, including weekends and bank holidays.</p>
              <p className="mt-3 text-sm text-gray-soft">Most repairs completed in a single visit from van stock. Written report provided for insurance claims at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Common causes</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">The failure modes we see most often when called out to {service.shortName.toLowerCase()} jobs.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.commonCauses.map((c, i) => (
              <div key={i} className="rounded-xl bg-white border border-gray-line p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path strokeLinecap="round" d="M12 9v3m0 4h.01M5 19h14a2 2 0 001.74-3l-7-12a2 2 0 00-3.48 0l-7 12A2 2 0 005 19z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-soft">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2>Our process</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="rounded-xl border border-gray-line p-6">
                <div className="text-sm font-bold text-primary">0{step.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Cities we cover for {service.shortName}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">{service.name} available 24/7 in every city we cover.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content max-w-3xl">
          <h2>{service.name} FAQ</h2>
          <div className="mt-8">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-off-white">
          <div className="container-content">
            <h2>Related services</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="rounded-xl border border-gray-line bg-white p-6 hover:border-primary hover:shadow-md transition"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <ServiceIcon name={r.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{r.name}</h3>
                  <p className="mt-2 text-sm text-gray-soft">{r.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading={`Need ${service.shortName.toLowerCase()} help right now?`}
        subheading="A Gas Safe engineer can be on the way in minutes. Same rates day or night."
      />
    </>
  );
}
