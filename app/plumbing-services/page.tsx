import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import { cities } from '@/data/cities';
import { BRAND, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Plumbing Services UK | Local Repairs, Leaks, Drains | ${BRAND}`,
  description: `Local plumbing services across the UK. Emergency repairs, burst pipes, blocked drains, leak detection, tap replacement, and bathroom plumbing. Clear quotes. Guaranteed workmanship.`,
  alternates: { canonical: '/plumbing-services' },
  openGraph: {
    title: `Plumbing Services UK | ${BRAND}`,
    description: `Local plumbing services across the UK — emergency repairs, leak detection, drain unblocking, and installations. Clear quotes, guaranteed workmanship.`,
    url: `${SITE_URL}/plumbing-services`,
    type: 'website',
  },
};

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Plumbing Services' },
];

export default function PlumbingServicesIndexPage() {
  return (
    <>
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* Hero */}
      <section className="section bg-off-white border-b border-gray-line">
        <div className="container-content">
          <div className="max-w-2xl">
            <h1>Plumbing Services Across the UK</h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-soft">
              {BRAND} provides local plumbing repairs, emergency callouts, leak detection, drain unblocking, and bathroom and kitchen plumbing across the UK. Select your city below to view pricing, coverage, and book a local plumber.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Services available', value: '8+' },
              { label: 'Cities covered', value: `${cities.length}+` },
              { label: 'Rating', value: '4.9★' },
              { label: 'Out-of-hours surcharge', value: 'None' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-gray-line bg-white p-4 text-center">
                <div className="text-xl font-bold text-ink">{value}</div>
                <div className="mt-1 text-xs text-gray-soft">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City grid */}
      <section className="section">
        <div className="container-content">
          <h2>Select Your City</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Each city page includes local pricing, postcode coverage, recent jobs, customer reviews, and a full breakdown of plumbing services available in that area.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/plumbing-services/${city.slug}`}
                className="group flex flex-col rounded-xl border border-gray-line bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink group-hover:text-primary transition-colors">
                    Plumbing Services in {city.name}
                  </h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-soft group-hover:text-primary transition-colors" aria-hidden>
                    <path strokeLinecap="round" d="M9 6l6 6-6 6" />
                  </svg>
                </div>
                <p className="mt-1.5 text-xs text-gray-soft">{city.region}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 text-gray-soft">
                    From {city.callOutFee}
                  </span>
                  <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 text-gray-soft">
                    {city.postcodes.length} postcodes
                  </span>
                  <span className="rounded-full border border-gray-line bg-off-white px-2.5 py-1 text-gray-soft capitalize">
                    {city.waterHardness} water
                  </span>
                </div>
                <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                  View plumbing services →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2>What Our Plumbing Services Include</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Every service is available across all covered cities on the same transparent pricing.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Emergency Repairs', desc: 'Burst pipes, flooding, loss of water supply, overflowing toilets' },
              { label: 'Leak Detection', desc: 'Hidden leaks, underfloor leaks, ceiling leaks, radiator leaks' },
              { label: 'Drain Unblocking', desc: 'Blocked sinks, showers, toilets, external drains, CCTV inspection' },
              { label: 'Pipe Repair & Replacement', desc: 'Damaged sections, corroded joints, old lead or galvanised pipework' },
              { label: 'Bathroom Plumbing', desc: 'Taps, toilets, sinks, showers, baths, waste pipes, isolation valves' },
              { label: 'Kitchen Plumbing', desc: 'Sinks, taps, dishwashers, washing machines, waste connections' },
              { label: 'Water Pressure', desc: 'Diagnosis, valve checks, leak investigation, pressure booster pumps' },
              { label: 'Plumbing Maintenance', desc: 'Routine inspections, valve servicing, seasonal checks, landlord visits' },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-xl border border-gray-line bg-white p-5">
                <div className="text-sm font-semibold text-ink">{label}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
