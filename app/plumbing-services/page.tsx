import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import { cities } from '@/data/cities';
import { BRAND, SITE_URL } from '@/lib/constants';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

const PS_TITLE = `Plumbing Services UK | Local Repairs, Leaks, Drains | ${BRAND}`;
const PS_DESCRIPTION = `Local plumbing services across the UK. Emergency repairs, burst pipes, blocked drains, leak detection, tap replacement, bathroom plumbing.`;
const PS_URL = `${SITE_URL}/plumbing-services`;

export const metadata: Metadata = {
  title: PS_TITLE,
  description: PS_DESCRIPTION,
  alternates: { canonical: '/plumbing-services' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
    title: PS_TITLE,
    description: PS_DESCRIPTION,
    url: PS_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PS_TITLE,
    description: PS_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Plumbing Services' },
];

const overview = [
  { label: 'Emergency Repairs', desc: 'Burst pipes, flooding, loss of water supply, overflowing toilets', icon: 'alert' },
  { label: 'Leak Detection', desc: 'Hidden leaks, underfloor leaks, ceiling leaks, radiator leaks', icon: 'search' },
  { label: 'Drain Unblocking', desc: 'Blocked sinks, showers, toilets, external drains, CCTV inspection', icon: 'pipe' },
  { label: 'Pipe Repair & Replacement', desc: 'Damaged sections, corroded joints, old lead or galvanised pipework', icon: 'wrench' },
  { label: 'Bathroom Plumbing', desc: 'Taps, toilets, sinks, showers, baths, waste pipes, isolation valves', icon: 'bath' },
  { label: 'Kitchen Plumbing', desc: 'Sinks, taps, dishwashers, washing machines, waste connections', icon: 'kitchen' },
  { label: 'Water Pressure', desc: 'Diagnosis, valve checks, leak investigation, pressure booster pumps', icon: 'gauge' },
  { label: 'Plumbing Maintenance', desc: 'Routine inspections, valve servicing, seasonal checks, landlord visits', icon: 'shield' },
];

function OverviewIcon({ name }: { name: string }) {
  const c = { className: 'h-5 w-5', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'alert':
      return <svg {...c} aria-hidden><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="0.8" fill="currentColor" /></svg>;
    case 'search':
      return <svg {...c} aria-hidden><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>;
    case 'pipe':
      return <svg {...c} aria-hidden><path d="M3 7h6v4h6V7h6M3 17h18" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>;
    case 'wrench':
      return <svg {...c} aria-hidden><path d="M14 6a4 4 0 105.66 5.66L22 14l-2 2-2.34-2.34A4 4 0 1014 6z" /><path d="M11 11L4 18l3 3 7-7" /></svg>;
    case 'bath':
      return <svg {...c} aria-hidden><path d="M3 12h18v3a3 3 0 01-3 3H6a3 3 0 01-3-3v-3z" /><path d="M7 12V6a2 2 0 014 0" /><path d="M5 21l1-3M19 21l-1-3" /></svg>;
    case 'kitchen':
      return <svg {...c} aria-hidden><path d="M5 4h6l1 4H4l1-4z" /><path d="M8 8v3" /><path d="M4 11h8v9H4z" /><path d="M16 4v16" /><path d="M14 8h4" /></svg>;
    case 'gauge':
      return <svg {...c} aria-hidden><path d="M3 14a9 9 0 0118 0" /><path d="M12 14l4-4" /><circle cx="12" cy="14" r="1.5" fill="currentColor" /></svg>;
    case 'shield':
      return <svg {...c} aria-hidden><path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" /></svg>;
    default:
      return <svg {...c} aria-hidden><circle cx="12" cy="12" r="9" /></svg>;
  }
}

export default function PlumbingServicesIndexPage() {
  return (
    <>
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-off-white to-white">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="container-content relative py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-center">
            <div className="md:col-span-7">
              <span className="eyebrow">Plumbing services</span>
              <h1 className="mt-4">Plumbing Services Across the UK</h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-gray-soft">
                {BRAND} provides local plumbing repairs, emergency callouts, leak detection, drain unblocking, and bathroom and kitchen plumbing across the UK. Select your city below to view pricing, coverage, and book a local plumber.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Services available', value: '8+' },
                  { label: 'Cities covered', value: `${cities.length}+` },
                  { label: 'Rating', value: '4.9★' },
                  { label: 'Out-of-hours surcharge', value: 'None' },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-gray-line bg-white p-4 text-center shadow-sm">
                    <div className="text-2xl font-extrabold text-primary">{value}</div>
                    <div className="mt-1 text-xs font-semibold text-gray-soft leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Local plumber on a UK domestic callout"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="eyebrow">Choose your city</span>
            <h2 className="mt-3">Select Your City</h2>
            <p className="mt-3 text-gray-soft">
              Each city page includes local pricing, postcode coverage, recent jobs, customer reviews, and a full breakdown of plumbing services available in that area.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/plumbing-services/${city.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-line bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
              >
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/5 transition group-hover:bg-primary/10" aria-hidden />
                <div className="relative">
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-soft">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-primary" aria-hidden>
                      <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    City
                  </span>
                  <h3 className="mt-1 text-base font-bold text-ink group-hover:text-primary transition-colors leading-snug">
                    Plumbing Services in {city.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-soft">{city.region}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
                    <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 font-semibold text-gray-soft">
                      From {city.callOutFee}
                    </span>
                    <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 font-semibold text-gray-soft">
                      {city.postcodes.length} postcodes
                    </span>
                    <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 font-semibold text-gray-soft capitalize">
                      {city.waterHardness} water
                    </span>
                  </div>
                </div>
                <div className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  View plumbing services
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="eyebrow">What's included</span>
            <h2 className="mt-3">What Our Plumbing Services Include</h2>
            <p className="mt-3 text-gray-soft">
              Every service is available across all covered cities on the same transparent pricing.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map(({ label, desc, icon }) => (
              <div key={label} className="rounded-2xl border border-gray-line bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/30">
                  <OverviewIcon name={icon} />
                </div>
                <div className="mt-4 text-base font-bold text-ink">{label}</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
