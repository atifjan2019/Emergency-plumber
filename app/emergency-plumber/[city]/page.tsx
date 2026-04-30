import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
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
import { getSettings } from '@/lib/settings';

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Emergency Plumber ${city.name} | 24/7 Call Out`;
  const description = `24/7 emergency plumber in ${city.name}. Response in ${city.responseTime}. Burst pipes, blocked drains, boiler repairs. Gas Safe. Call now.`;
  return {
    title,
    description,
    alternates: { canonical: `/emergency-plumber/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/emergency-plumber/${city.slug}`,
      type: 'website',
      siteName: BRAND,
      locale: 'en_GB',
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityReviews = await getReviewsByCity(city.slug, 6);
  const recentJobs = getRecentJobsByCity(city.slug);
  const settings = await getSettings();
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
          cityPlumberSchema(city, settings.phoneTel),
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

      {/* Quote section */}
      <section className="section">
        <div className="container-content grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <span className="eyebrow">Free quote</span>
            <h2 className="mt-3">Get a free quote in {city.name}</h2>
            <p className="mt-4 text-gray-soft text-lg leading-relaxed">
              Tell us what is wrong and we will reply with a price within an hour. Or call now for an immediate dispatch.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Same rate for nights, weekends and bank holidays',
                'Gas Safe registered, in-house engineers (no subcontracting)',
                `Average response in ${city.responseTime} across ${city.name}`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-hidden>
                      <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <span className="text-ink font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl border-2 border-gray-line bg-white p-6 md:p-7 shadow-xl self-start md:sticky md:top-28">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
              Quote in 1 hour
            </div>
            <QuoteForm
              sourcePage={`/emergency-plumber/${city.slug}`}
              citySlug={city.slug}
              cityName={city.name}
            />
          </div>
        </div>
      </section>

      {/* Stats stripe */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-content py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg response', value: city.responseTime },
            { label: 'Call-out fee', value: city.callOutFee },
            { label: 'Hourly rate', value: city.hourlyRate },
            { label: 'Postcodes covered', value: `${city.postcodes.length}+` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-5">
              <div className="text-xs uppercase tracking-wider text-white/70 font-bold">{s.label}</div>
              <div className="mt-1 text-2xl md:text-3xl font-extrabold">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Postcodes */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">Coverage</span>
          <h2 className="mt-3">Postcodes we cover in {city.name}</h2>
          <p className="mt-3 max-w-3xl text-gray-soft">
            Engineers based across {city.name} mean we reach most postcodes inside our advertised response time. If your postcode is not listed, call us - we cover further than the listed prefixes in most cases.
          </p>
          <div className="mt-8">
            <PostcodeChips postcodes={city.postcodes} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">Services</span>
          <h2 className="mt-3">Services in {city.name}</h2>
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

      {/* Housing notes */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <span className="eyebrow">Local insight</span>
            <h2 className="mt-3">Why {city.name} residents call us</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-ink">
              {city.housingNotes.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-soft">{para}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-gray-line bg-white p-7 shadow-md">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  <path d="M12 3l10 18H2L12 3z" />
                  <path d="M12 10v5" />
                  <circle cx="12" cy="18" r="0.8" fill="currentColor" />
                </svg>
              </div>
              <h3 className="mt-4">Most common issues in {city.name}</h3>
              <ul className="mt-5 space-y-3">
                {city.commonIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-white text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-ink leading-snug">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-3">Transparent pricing in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Same rate at 3am on Sunday as at midday on Tuesday. No call-out surcharge for nights, weekends or bank holidays.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <PriceCard label="Call-out fee" value={city.callOutFee} note="Covers attendance and the first hour of labour on site." accent="primary" />
            <PriceCard label="Hourly rate" value={city.hourlyRate} note="Standard hourly rate beyond the first hour, same rate 24/7." accent="primary" />
            <PriceCard label="No surcharge" value="0%" note="No surcharge for nights, weekends or bank holidays." accent="green" />
          </div>
          <div className="mt-8 rounded-2xl border border-gray-line bg-white p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg">Payment methods</h3>
                <p className="mt-2 text-sm text-gray-soft leading-relaxed">Card (contactless and chip+pin), Apple Pay, Google Pay, bank transfer or cash. Payment is taken on the job once you are happy with the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent jobs */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">Recent work</span>
          <h2 className="mt-3">Recent jobs in {city.name}</h2>
          <p className="mt-3 text-gray-soft">A snapshot of work completed across {city.name} in recent weeks.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentJobs.map((j, i) => (
              <RecentJobCard key={i} job={j} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {cityReviews.length > 0 && (
        <section className="section bg-off-white">
          <div className="container-content">
            <span className="eyebrow">Reviews</span>
            <h2 className="mt-3">What {city.name} customers say</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coverage map */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">Map</span>
          <h2 className="mt-3">Coverage map</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">Live coverage area for {city.name}. Engineers are dispatched from the closest available van.</p>
          <div
            className="mt-8 relative grid h-[420px] place-items-center rounded-2xl border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 via-off-white to-primary/5 text-gray-soft overflow-hidden"
            data-lat={city.geo.lat}
            data-lng={city.geo.lng}
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative text-center px-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-7.16-7-12a7 7 0 1114 0c0 4.84-7 12-7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <p className="mt-4 text-base font-bold text-ink">Coverage map for {city.name} ({city.geo.lat.toFixed(3)}, {city.geo.lng.toFixed(3)})</p>
              <p className="mt-1 text-sm text-gray-soft">Map embed placeholder. Swap for Google Maps or Mapbox in production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-3">{city.name} FAQ</h2>
          <p className="mt-3 text-gray-soft">Common questions specific to {city.name} customers.</p>
          <div className="mt-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      {/* Future areas */}
      <section className="section">
        <div className="container-content">
          <span className="eyebrow">Areas</span>
          <h2 className="mt-3">Areas we cover in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Sub-area pages coming soon. In the meantime we cover all listed postcodes from this hub.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {city.futureAreas.map((area) => (
              <div
                key={area}
                aria-disabled
                className="rounded-xl border border-gray-line bg-off-white p-5 cursor-not-allowed"
              >
                <div className="font-bold capitalize text-ink">{area.replace(/-/g, ' ')}</div>
                <div className="mt-1 text-xs text-gray-soft inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                  Dedicated page coming soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="eyebrow">More coverage</span>
          <h2 className="mt-3">Other cities we cover</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/emergency-plumber/${c.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-line bg-white px-4 py-2 text-sm font-bold text-ink hover:border-primary hover:text-primary hover:shadow-sm transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-primary" aria-hidden>
                  <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {c.name}
              </Link>
            ))}
            <Link href="/areas" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white px-4 py-2 text-sm font-bold hover:bg-ink/90 shadow-md transition">
              All areas
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
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

function PriceCard({ label, value, note, accent }: { label: string; value: string; note: string; accent: 'primary' | 'green' }) {
  const accentBg = accent === 'green' ? 'bg-green/10 text-green-dark' : 'bg-primary/10 text-primary';
  const accentBorder = accent === 'green' ? 'border-green/30' : 'border-primary/20';
  return (
    <div className={`rounded-2xl border-2 ${accentBorder} bg-white p-7 shadow-sm hover:shadow-md transition`}>
      <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accentBg}`}>{label}</span>
      <div className="mt-3 text-4xl font-extrabold text-ink">{value}</div>
      <p className="mt-3 text-sm text-gray-soft leading-relaxed">{note}</p>
    </div>
  );
}
