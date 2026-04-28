import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CallButton from '@/components/CallButton';
import ServiceCard from '@/components/ServiceCard';
import ReviewCard from '@/components/ReviewCard';
import RecentJobCard from '@/components/RecentJobCard';
import PostcodeChips from '@/components/PostcodeChips';
import FaqAccordion from '@/components/FaqAccordion';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import QuoteForm from '@/components/QuoteForm';
import SchemaMarkup from '@/components/SchemaMarkup';
import { cities, getCityBySlug, getCitySlugs } from '@/data/cities';
import { services } from '@/data/services';
import { getReviewsByCity } from '@/lib/reviews';
import { getRecentJobsByCity } from '@/data/recentJobs';
import { buildCityFaq } from '@/lib/cityFaq';
import { cityPlumberSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Emergency Plumber ${city.name} | 24/7 Call Out | ${BRAND}`;
  const description = `Need an emergency plumber in ${city.name}? 24/7 response in ${city.responseTime}. Burst pipes, boiler repairs, blocked drains. Gas Safe registered. Call now.`;
  return {
    title,
    description,
    alternates: { canonical: `/emergency-plumber/${city.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/emergency-plumber/${city.slug}`, type: 'website' },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityReviews = await getReviewsByCity(city.slug, 6);
  const recentJobs = getRecentJobsByCity(city.slug);
  const faq = buildCityFaq(city);
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 6);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Areas', href: '/areas' },
    { label: city.name },
  ];

  return (
    <>
      <SchemaMarkup
        data={[
          cityPlumberSchema(city),
          faqSchema(faq),
          breadcrumbSchema(crumbs),
        ]}
      />

      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <Hero
        variant="city"
        title={`Emergency Plumber in ${city.name}`}
        subtitle={`24/7 response across ${city.name} in around ${city.responseTime}. Burst pipes, boiler failures, blocked drains, no hot water - Gas Safe engineers on call right now. Same rates day or night.`}
        responseTime={city.responseTime}
        cityName={city.name}
      />

      <section className="section">
        <div className="container-content grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2>Get a free quote in {city.name}</h2>
            <p className="mt-3 text-gray-soft">
              Tell us what is wrong and we will reply with a price within an hour. Or call now for an immediate dispatch.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                Same rate for nights, weekends and bank holidays
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                Gas Safe registered, in-house engineers (no subcontracting)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                Average response in {city.responseTime} across {city.name}
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-gray-line bg-white p-5 shadow-sm">
            <QuoteForm
              sourcePage={`/emergency-plumber/${city.slug}`}
              citySlug={city.slug}
              cityName={city.name}
            />
          </div>
        </div>
      </section>

      <section className="bg-off-white border-y border-gray-line">
        <div className="container-content py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg response', value: city.responseTime },
            { label: 'Call-out fee', value: city.callOutFee },
            { label: 'Hourly rate', value: city.hourlyRate },
            { label: 'Postcodes covered', value: `${city.postcodes.length}+` },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white border border-gray-line p-4">
              <div className="text-xs uppercase tracking-wide text-gray-soft font-medium">{s.label}</div>
              <div className="mt-1 text-xl font-bold text-ink">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2>Postcodes we cover in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Engineers based across {city.name} mean we reach most postcodes inside our advertised response time. If your postcode is not listed, call us - we cover further than the listed prefixes in most cases.
          </p>
          <div className="mt-8">
            <PostcodeChips postcodes={city.postcodes} />
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Services in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">Every service available in {city.name}, every hour of every day, on the same call-out rate.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.shortName}
                description={`Response in ${city.responseTime} across ${city.name}.`}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content max-w-4xl">
          <h2>Why {city.name} residents call us</h2>
          <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-ink">
            {city.housingNotes.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-gray-line bg-white p-6">
            <h3>Most common issues in {city.name}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {city.commonIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-ink">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Transparent pricing in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Same rate at 3am on Sunday as at midday on Tuesday. No call-out surcharge for nights, weekends or bank holidays.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <PriceCard label="Call-out fee" value={city.callOutFee} note="Covers attendance and the first hour of labour on site." />
            <PriceCard label="Hourly rate" value={city.hourlyRate} note="Standard hourly rate beyond the first hour, same rate 24/7." />
            <PriceCard label="No surcharge" value="0%" note="No surcharge for nights, weekends or bank holidays." />
          </div>
          <div className="mt-8 rounded-xl border border-gray-line bg-white p-6">
            <h3 className="text-lg">Payment methods</h3>
            <p className="mt-2 text-sm text-gray-soft">Card (contactless and chip+pin), Apple Pay, Google Pay, bank transfer or cash. Payment is taken on the job once you are happy with the work.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2>Recent jobs in {city.name}</h2>
          <p className="mt-3 text-gray-soft">A snapshot of work completed across {city.name} in recent weeks.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentJobs.map((j, i) => (
              <RecentJobCard key={i} job={j} />
            ))}
          </div>
        </div>
      </section>

      {cityReviews.length > 0 && (
        <section className="section bg-off-white">
          <div className="container-content">
            <h2>What {city.name} customers say</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-content">
          <h2>Coverage map</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">Live coverage area for {city.name}. Engineers are dispatched from the closest available van.</p>
          <div
            className="mt-8 grid h-[360px] place-items-center rounded-xl border border-dashed border-gray-line bg-off-white text-gray-soft"
            data-lat={city.geo.lat}
            data-lng={city.geo.lng}
          >
            <div className="text-center px-4">
              <div className="text-3xl">📍</div>
              <p className="mt-3 text-sm">Coverage map for {city.name} ({city.geo.lat.toFixed(3)}, {city.geo.lng.toFixed(3)})</p>
              <p className="text-xs">Map embed placeholder - swap for Google Maps or Mapbox in production.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content max-w-3xl">
          <h2>{city.name} FAQ</h2>
          <p className="mt-3 text-gray-soft">Common questions specific to {city.name} customers.</p>
          <div className="mt-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2>Areas we cover in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Sub-area pages coming soon. In the meantime we cover all listed postcodes from this hub.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {city.futureAreas.map((area) => (
              <div
                key={area}
                aria-disabled
                className="rounded-lg border border-gray-line bg-off-white p-4 text-sm text-gray-soft cursor-not-allowed"
              >
                <div className="font-semibold capitalize text-ink">{area.replace(/-/g, ' ')}</div>
                <div className="mt-1 text-xs">Dedicated page coming soon</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Other cities we cover</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/emergency-plumber/${c.slug}`}
                className="rounded-full border border-gray-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/areas" className="rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold">All areas →</Link>
          </div>
        </div>
      </section>

      <CTASection
        heading={`Plumbing emergency in ${city.name}?`}
        subheading={`A Gas Safe engineer can reach you in around ${city.responseTime}. Same rates day or night.`}
      />
    </>
  );
}

function PriceCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
      <div className="mt-2 text-3xl font-extrabold text-ink">{value}</div>
      <p className="mt-3 text-sm text-gray-soft">{note}</p>
    </div>
  );
}
