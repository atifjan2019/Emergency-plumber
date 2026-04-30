import type { Metadata } from 'next';
import Image from 'next/image';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { BRAND, SITE_URL } from '@/lib/constants';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { getSettings } from '@/lib/settings';

const ABOUT_TITLE = `About ${BRAND} | UK Emergency Plumbing`;
const ABOUT_DESCRIPTION = `${BRAND} is a UK nationwide emergency plumbing company providing Gas Safe registered, 24/7 response across 12 cities with no out-of-hours surcharge.`;
const ABOUT_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: ABOUT_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: 'summary_large_image',
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const sections: { h: string; body: string }[] = [];

export default async function AboutPage() {
  const settings = await getSettings();
  const gasSafe = settings.gasSafeNumber;
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'About' },
  ];
  return (
    <>
      <SchemaMarkup
        data={[
          webPageSchema({ url: ABOUT_URL, name: ABOUT_TITLE, description: ABOUT_DESCRIPTION, type: 'AboutPage' }),
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
            <span className="eyebrow">About us</span>
            <h1 className="mt-4">About {BRAND}</h1>
            <p className="mt-6 text-lg text-gray-soft leading-relaxed">
              {BRAND} is a UK emergency plumbing company built around one principle - the price you pay for an emergency at 3am on a Sunday should be the same as at midday on a Tuesday. Every engineer is directly employed, Gas Safe registered, and equipped to complete most domestic emergencies on the first visit.
            </p>
            <div className="mt-8">
              <TrustBar responseTime="30 minutes" gasSafeNumber={gasSafe} />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={`${BRAND} engineer on a UK emergency plumbing callout`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-gray-line bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </span>
                <h2 className="text-h3-m md:text-h3-d">What we do</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-soft">
                We provide 24/7 emergency plumbing across 12 UK cities - London, Manchester, Birmingham, Glasgow, Leeds, Liverpool, Bristol, Sheffield, Edinburgh, Newcastle, Nottingham and Cardiff. Phase two of our coverage roadmap extends into sub-areas and postcodes within those cities, with the goal of reaching 95% of UK households inside our published response window.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-line bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                  </svg>
                </span>
                <h2 className="text-h3-m md:text-h3-d">How we work</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-soft">
                Engineers are on shift around the clock, dispatched from the closest available van to your address. A real person answers the phone within three rings - no call centre routing, no automated menus. Vans carry common parts for major boiler brands, leak detection equipment, drainage tooling and the materials needed to complete the majority of emergency repairs in a single visit.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-line bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path d="M3 12V4h8l10 10-8 8L3 12z" />
                    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                  </svg>
                </span>
                <h2 className="text-h3-m md:text-h3-d">Pricing principles</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-soft">
                Same rates 24/7. No surcharge for nights, weekends or bank holidays. Fixed call-out fee covering attendance and the first hour, transparent hourly rate after that, and a quote before any work starts. We do not believe in surprise bills or upselling on the day.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-line bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                    <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
                  </svg>
                </span>
                <h2 className="text-h3-m md:text-h3-d">Credentials</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-soft">
                Gas Safe registered company (registration #{gasSafe}). All gas engineers hold current ACS qualifications. Public liability insurance £5m. Compliance with WRAS, BS EN standards for installation, and G3 unvented qualifications across the engineer pool.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
