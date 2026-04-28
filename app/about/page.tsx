import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { BRAND, GAS_SAFE_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About ${BRAND} | UK Emergency Plumbing`,
  description: `${BRAND} is a UK nationwide emergency plumbing company providing Gas Safe registered, 24/7 response across 12 cities with no out-of-hours surcharge.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'About' },
  ];
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      <section className="section">
        <div className="container-content max-w-3xl">
          <h1>About {BRAND}</h1>
          <p className="mt-6 text-lg text-gray-soft leading-relaxed">
            {BRAND} is a UK emergency plumbing company built around one principle - the price you pay for an emergency at 3am on a Sunday should be the same as at midday on a Tuesday. Every engineer is directly employed, Gas Safe registered, and equipped to complete most domestic emergencies on the first visit.
          </p>

          <div className="mt-10">
            <TrustBar responseTime="30 minutes" />
          </div>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-ink">
            <div>
              <h2 className="text-h2-m md:text-h2-d">What we do</h2>
              <p className="mt-4">
                We provide 24/7 emergency plumbing across 12 UK cities - London, Manchester, Birmingham, Glasgow, Leeds, Liverpool, Bristol, Sheffield, Edinburgh, Newcastle, Nottingham and Cardiff. Phase two of our coverage roadmap extends into sub-areas and postcodes within those cities, with the goal of reaching 95% of UK households inside our published response window.
              </p>
            </div>

            <div>
              <h2 className="text-h2-m md:text-h2-d">How we work</h2>
              <p className="mt-4">
                Engineers are on shift around the clock, dispatched from the closest available van to your address. A real person answers the phone within three rings - no call centre routing, no automated menus. Vans carry common parts for major boiler brands, leak detection equipment, drainage tooling and the materials needed to complete the majority of emergency repairs in a single visit.
              </p>
            </div>

            <div>
              <h2 className="text-h2-m md:text-h2-d">Pricing principles</h2>
              <p className="mt-4">
                Same rates 24/7. No surcharge for nights, weekends or bank holidays. Fixed call-out fee covering attendance and the first hour, transparent hourly rate after that, and a quote before any work starts. We do not believe in surprise bills or upselling on the day.
              </p>
            </div>

            <div>
              <h2 className="text-h2-m md:text-h2-d">Credentials</h2>
              <p className="mt-4">
                Gas Safe registered company (registration #{GAS_SAFE_NUMBER}). All gas engineers hold current ACS qualifications. Public liability insurance £5m. Compliance with WRAS, BS EN standards for installation, and G3 unvented qualifications across the engineer pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
