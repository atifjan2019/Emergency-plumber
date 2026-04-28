import Link from 'next/link';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CityCard from '@/components/CityCard';
import ReviewCard from '@/components/ReviewCard';
import FaqAccordion from '@/components/FaqAccordion';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { services } from '@/data/services';
import { cities } from '@/data/cities';
import { reviews } from '@/data/reviews';
import { homeFaq } from '@/data/homeFaq';
import { BRAND } from '@/lib/constants';
import { organizationSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `24/7 Emergency Plumber UK | Gas Safe | ${BRAND}`,
  description: `Need an emergency plumber? ${BRAND} is on-call 24/7 across 12 UK cities. Burst pipes, boiler repair, blocked drains. Same rates day or night. Gas Safe registered.`,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featured = [reviews[0], reviews[6], reviews[11], reviews[16], reviews[28], reviews[36]];

  return (
    <>
      <SchemaMarkup data={[organizationSchema(), faqSchema(homeFaq)]} />

      <Hero
        variant="home"
        title="24/7 Emergency Plumber Near You"
        subtitle="Burst pipes, boiler failures, blocked drains - Gas Safe engineers on call across 12 UK cities. No surcharge for nights, weekends or bank holidays."
        responseTime="30 minutes"
      />

      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2>What we fix</h2>
              <p className="mt-3 max-w-xl text-gray-soft">
                Eight emergency services covered by every engineer on every shift. No subcontracting - all work is in-house.
              </p>
            </div>
            <Link href="/services" className="text-sm font-semibold text-primary hover:text-primary-dark">View all services →</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.shortName}
                description={s.shortDescription}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2>UK coverage</h2>
              <p className="mt-3 max-w-xl text-gray-soft">
                Live response in 12 cities, expanding nationwide. Pick your city to see local pricing, postcodes covered and recent jobs.
              </p>
            </div>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">All areas →</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container-content">
          <div className="max-w-2xl">
            <h2>How it works</h2>
            <p className="mt-3 text-gray-soft">Three steps from phone call to fixed. No appointments to wait for, no upselling on the day.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: '01', t: 'Call', d: 'A real dispatcher answers within three rings, 24 hours a day. They take your address, system type and symptoms while we send the closest engineer.' },
              { n: '02', t: 'Diagnose', d: 'On arrival the engineer identifies the failure, explains what needs doing and quotes before any work starts. No surprises later.' },
              { n: '03', t: 'Fix', d: 'Most repairs are completed on the first visit from van stock. We test, clean down and provide a written report you can send to your insurer.' },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-gray-line p-6">
                <div className="text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-gray-soft">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Why people pick us</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Same rates 24/7', d: 'No night, weekend or bank holiday surcharge. The price you would pay at midday on Tuesday is the price at 3am on Sunday.' },
              { t: 'Gas Safe in-house', d: 'Every engineer is directly employed and Gas Safe registered. No subcontracting, no chains of agencies.' },
              { t: 'First-visit fix', d: 'Vans carry common parts for most major boiler brands. Most repairs are completed in one visit, no return trip needed.' },
              { t: 'Insurance reports free', d: 'Itemised written reports for insurance claims included as standard - not as a paid extra.' },
            ].map((b) => (
              <div key={b.t} className="rounded-xl bg-white border border-gray-line p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-gray-soft">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2>What customers say</h2>
          <p className="mt-3 max-w-xl text-gray-soft">2,800+ verified reviews across our 12 cities. Average rating 4.9/5.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content max-w-3xl">
          <h2>Common questions</h2>
          <p className="mt-3 text-gray-soft">If your question is not here, call us - we are happy to answer.</p>
          <div className="mt-8">
            <FaqAccordion items={homeFaq} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
