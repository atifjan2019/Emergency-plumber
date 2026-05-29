import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import PostcodeChips from '@/components/PostcodeChips';
import FaqAccordion from '@/components/FaqAccordion';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import QuoteForm from '@/components/QuoteForm';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getCityBySlug } from '@/data/cities';
import { getAreaBySlug, getAreasByCity, getAreaParams } from '@/data/areas';
import { services } from '@/data/services';
import { buildAreaFaq } from '@/lib/areaFaq';
import { areaPlumberSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';
import { getSettings } from '@/lib/settings';
import { ogImageFor } from '@/lib/seo';

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getAreaParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; area: string }> }): Promise<Metadata> {
  const { city: citySlug, area: areaSlug } = await params;
  const city = getCityBySlug(citySlug);
  const area = getAreaBySlug(citySlug, areaSlug);
  if (!city || !area) return {};

  const s = await getSettings();
  const path = `/emergency-plumber/${city.slug}/${area.slug}`;
  const url = `${SITE_URL}${path}`;
  const title = `Emergency Plumber ${area.name} | 24/7 in ${city.name} | ${BRAND}`;
  const description = `24/7 emergency plumber in ${area.name}, ${city.name}. Response in around ${area.responseTime} across ${area.postcodes.slice(0, 4).join(', ')}. Burst pipes, leaks, blocked drains, boiler repairs. Gas Safe. Call now.`;
  const image = ogImageFor(s.ogImageUrl, `Emergency plumber in ${area.name}, ${city.name}`);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: BRAND,
      locale: 'en_GB',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ city: string; area: string }> }) {
  const { city: citySlug, area: areaSlug } = await params;
  const city = getCityBySlug(citySlug);
  const area = getAreaBySlug(citySlug, areaSlug);
  if (!city || !area) notFound();

  const settings = await getSettings();
  const faq = buildAreaFaq(area, city, settings.gasSafeNumber);

  // Sibling areas for internal linking: prefer the curated nearby list, then
  // top up with any other areas in the same city.
  const siblings = getAreasByCity(city.slug).filter((a) => a.slug !== area.slug);
  const nearby = [
    ...area.nearbyAreas
      .map((slug) => siblings.find((a) => a.slug === slug))
      .filter((a): a is NonNullable<typeof a> => Boolean(a)),
    ...siblings.filter((a) => !area.nearbyAreas.includes(a.slug)),
  ].slice(0, 6);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Areas', href: '/areas' },
    { label: city.name, href: `/emergency-plumber/${city.slug}` },
    { label: area.name },
  ];

  return (
    <>
      <SchemaMarkup
        data={[
          areaPlumberSchema(area, city, settings.phoneTel),
          faqSchema(faq),
          breadcrumbSchema(crumbs),
        ]}
      />

      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <Hero
        variant="city"
        title={`Emergency Plumber in ${area.name}`}
        subtitle={`${area.intro} 24/7 Gas Safe response across ${area.name} in around ${area.responseTime} - burst pipes, leaks, blocked drains and boiler failures, on the same rate day or night.`}
        responseTime={area.responseTime}
        cityName={area.name}
      />

      {/* Local insight + quote form */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
          <div>
            <span className="eyebrow">Local insight</span>
            <h2 className="mt-3">Why {area.name} homes call us</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed">
              {area.housingNotes.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-soft">{para}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-soft">
              {area.name} is part of our wider{' '}
              <Link href={`/emergency-plumber/${city.slug}`} className="font-bold text-primary hover:underline">
                {city.name} emergency plumbing coverage
              </Link>
              , supplied by {city.waterBoard} with {city.waterHardness} water.
            </p>
          </div>
          <div className="relative rounded-2xl border-2 border-gray-line bg-white p-6 md:p-7 shadow-xl self-start lg:sticky lg:top-28">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
              Quote in 1 hour
            </div>
            <div className="mb-1 text-base font-bold text-ink">Get a free quote in {area.name}</div>
            <p className="mb-5 text-sm text-gray-soft">Tell us what is wrong and we will reply within the hour. For emergencies, call now for immediate dispatch.</p>
            <QuoteForm
              sourcePage={`/emergency-plumber/${city.slug}/${area.slug}`}
              citySlug={city.slug}
              cityName={area.name}
            />
          </div>
        </div>
      </section>

      {/* Stats stripe */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-content py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg response', value: area.responseTime },
            { label: 'Call-out fee', value: city.callOutFee },
            { label: 'Hourly rate', value: city.hourlyRate },
            { label: 'Postcodes', value: `${area.postcodes.length}` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-5">
              <div className="text-xs uppercase tracking-wider text-white/70 font-bold">{stat.label}</div>
              <div className="mt-1 text-2xl md:text-3xl font-extrabold">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Common issues */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">What we fix</span>
          <h2 className="mt-3">Common plumbing problems in {area.name}</h2>
          <p className="mt-3 max-w-3xl text-gray-soft">
            The faults we are called to most often in {area.name} reflect its local property stock and the {city.waterBoard} {city.waterHardness}-water supply. Our engineers carry the parts and detection kit these jobs typically need.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {area.commonIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-gray-line bg-white p-5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-ink font-medium leading-snug">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Postcodes */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">Coverage</span>
          <h2 className="mt-3">Postcodes we cover in {area.name}</h2>
          <p className="mt-3 max-w-3xl text-gray-soft">
            We reach most {area.name} postcodes inside our advertised response time. If yours is not listed, call us - we cover further than the prefixes shown in most cases.
          </p>
          <div className="mt-8">
            <PostcodeChips postcodes={area.postcodes} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">Services</span>
          <h2 className="mt-3">Emergency services in {area.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">Every service available in {area.name}, around the clock, on the same call-out rate.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                name={service.shortName}
                description={`Response in around ${area.responseTime} across ${area.name}.`}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-3">{area.name} plumbing FAQ</h2>
          <p className="mt-3 text-gray-soft">Common questions from {area.name} customers.</p>
          <div className="mt-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      {nearby.length > 0 && (
        <section className="section">
          <div className="container-content">
            <span className="eyebrow">Nearby</span>
            <h2 className="mt-3">Areas near {area.name}</h2>
            <p className="mt-3 max-w-2xl text-gray-soft">We also cover these neighbouring parts of {city.name}.</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {nearby.map((a) => (
                <Link
                  key={a.slug}
                  href={`/emergency-plumber/${city.slug}/${a.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-line bg-white px-4 py-2 text-sm font-bold text-ink hover:border-primary hover:text-primary hover:shadow-sm transition"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-primary" aria-hidden>
                    <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {a.name}
                </Link>
              ))}
              <Link href={`/emergency-plumber/${city.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white px-4 py-2 text-sm font-bold hover:bg-ink/90 shadow-md transition">
                All of {city.name}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading={`Plumbing emergency in ${area.name}?`}
        subheading={`A Gas Safe engineer can reach you in around ${area.responseTime}. Same rates day or night across ${area.name} and the rest of ${city.name}.`}
      />
    </>
  );
}
