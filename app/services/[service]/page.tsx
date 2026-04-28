import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CityCard from '@/components/CityCard';
import FaqAccordion from '@/components/FaqAccordion';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CTASection from '@/components/CTASection';
import ServiceIcon from '@/components/ServiceIcon';
import UtilityIcon from '@/components/UtilityIcon';
import SchemaMarkup from '@/components/SchemaMarkup';
import CallButton from '@/components/CallButton';
import RecentJobCard from '@/components/RecentJobCard';
import ReviewCard from '@/components/ReviewCard';
import { services, getServiceBySlug, getServiceSlugs } from '@/data/services';
import { cities } from '@/data/cities';
import { getFeaturedReviews } from '@/lib/reviews';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';
import { BRAND, SITE_URL, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';
import Image from 'next/image';
import {
  problemRouter,
  issueExplanations,
  pricingFactors,
  preventionTips,
  trustReasons,
  recentSamples,
  toneClass,
  PLACEHOLDER_IMAGE,
} from '@/lib/plumbingContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.name} UK - Emergency Plumber, 24/7 Response | ${BRAND}`;
  const description = `${service.shortDescription} Local Gas Safe plumbers across 12 UK cities, 24/7 callouts, transparent quotes and guaranteed workmanship. Call ${BRAND} now.`;
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

  const related = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];

  const settings = await getSettings();
  const featured = await getFeaturedReviews(3);
  const otherServices = services.filter((s) => s.slug !== service.slug);

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

      {/* SECTION 1: HERO */}
      <Hero
        variant="service"
        title={`${service.name} - Local Plumber, 24/7 UK Response`}
        subtitle={`${service.shortDescription} Licensed, insured, Gas Safe registered engineers across 12 UK cities. Transparent quotes, guaranteed workmanship and the same call-out fee day or night.`}
        responseTime="30 minutes"
      />

      {/* TRUST STRIP */}
      <section aria-label="Trust strip" className="border-y border-gray-line bg-white">
        <div className="container-content py-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 text-sm">
          {[
            { t: 'Licensed & insured', i: 'shield' },
            { t: 'Gas Safe registered', i: 'badge' },
            { t: '24/7 emergency callouts', i: 'bolt' },
            { t: `${NATIONWIDE_RATING}/5 from ${NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ reviews`, i: 'star' },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <UtilityIcon name={b.i} />
              </span>
              <span className="font-semibold text-ink">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <section className="container-content pt-10 md:pt-14">
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white">
          <Image
            src={PLACEHOLDER_IMAGE}
            alt={`Local Gas Safe plumber carrying out ${service.shortName.toLowerCase()} in a UK home`}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* QUICK ANSWER + WHAT'S INCLUDED + STARTING PRICE */}
      <section className="section">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2>What this service covers</h2>
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
            <aside className="lg:col-span-5 rounded-xl border border-gray-line bg-off-white p-6 self-start">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-white">
                <ServiceIcon name={service.icon} />
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide font-semibold text-gray-soft">From</p>
              <p className="text-h3-m md:text-h3-d">{service.startingPrice}</p>
              <p className="mt-3 text-sm text-gray-soft">Same rates day or night - no surcharge for evenings, weekends or bank holidays.</p>
              <p className="mt-3 text-sm text-gray-soft">Most repairs completed in a single visit from full van stock. Written report provided for insurance claims at no extra cost.</p>
              <div className="mt-5 flex flex-col gap-2">
                <CallButton size="md" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
                <Link href="/quote" className="btn-ghost text-sm">Request a fixed quote</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM SELECTOR (cross-service router) */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>Other plumbing problems we cover</h2>
            <p className="mt-3 text-gray-soft">
              {service.shortName} is one of eight core services we run in-house. If your issue is closer to one of the problems below, jump straight to the right page or call - a real dispatcher answers 24 hours a day.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemRouter
              .filter((p) => p.slug !== service.slug)
              .slice(0, 9)
              .map((p) => (
                <Link
                  key={p.title}
                  href={`/services/${p.slug}`}
                  className={`group relative flex h-full flex-col rounded-xl border bg-white p-6 transition hover:shadow-lg ${
                    p.tone === 'emergency'
                      ? 'border-accent/30 hover:border-accent'
                      : p.tone === 'maintenance'
                      ? 'border-green/30 hover:border-green'
                      : 'border-gray-line hover:border-primary'
                  }`}
                >
                  <div className={`mb-4 grid h-12 w-12 place-items-center rounded-lg border transition ${toneClass(p.tone)}`}>
                    <UtilityIcon name={p.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-soft">{p.blurb}</p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${
                      p.tone === 'emergency' ? 'text-accent' : p.tone === 'maintenance' ? 'text-green-dark' : 'text-primary'
                    }`}
                  >
                    Get help with this issue
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden>
                      <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMON ISSUES EXPLAINED (table) */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>Common plumbing issues we repair</h2>
            <p className="mt-3 text-gray-soft">
              Most plumbing problems trace back to a small set of underlying causes. Recognising the symptom is the first step - the cause and the right service are what stop it coming back.
            </p>
          </div>

          <div className="mt-10 hidden lg:block overflow-hidden rounded-xl border border-gray-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-off-white text-xs uppercase tracking-wide text-gray-soft">
                <tr>
                  <th className="px-5 py-4 font-semibold">Symptom</th>
                  <th className="px-5 py-4 font-semibold">Likely cause</th>
                  <th className="px-5 py-4 font-semibold">Risk if ignored</th>
                  <th className="px-5 py-4 font-semibold">Recommended service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-line">
                {issueExplanations.map((row) => (
                  <tr key={row.symptom} className="align-top">
                    <td className="px-5 py-4 font-semibold text-ink">{row.symptom}</td>
                    <td className="px-5 py-4 text-gray-soft">{row.cause}</td>
                    <td className="px-5 py-4 text-gray-soft">{row.risk}</td>
                    <td className="px-5 py-4 text-gray-soft">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 lg:hidden">
            {issueExplanations.map((row) => (
              <div key={row.symptom} className="rounded-xl border border-gray-line bg-white p-5">
                <h3 className="text-base font-semibold text-ink">{row.symptom}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div><dt className="font-semibold text-ink">Likely cause</dt><dd className="text-gray-soft">{row.cause}</dd></div>
                  <div><dt className="font-semibold text-ink">Risk if ignored</dt><dd className="text-gray-soft">{row.risk}</dd></div>
                  <div><dt className="font-semibold text-ink">Recommended service</dt><dd className="text-gray-soft">{row.service}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICE DEEP DIVE - the focal service */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <h2>{service.name} explained</h2>
              <p className="mt-3 text-gray-soft">{service.longDescription}</p>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-white">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={`Engineer diagnosing and repairing ${service.shortName.toLowerCase()} on site`}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-white border border-gray-line p-6 md:p-8">
              <h3 className="text-h3-m md:text-h3-d">Common causes</h3>
              <p className="mt-2 text-sm text-gray-soft">The failure modes we see most often when called out for {service.shortName.toLowerCase()}.</p>
              <ul className="mt-5 space-y-4">
                {service.commonCauses.map((c, i) => (
                  <li key={i}>
                    <div className="font-semibold text-ink">{c.title}</div>
                    <p className="mt-1 text-sm text-gray-soft">{c.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white border border-gray-line p-6 md:p-8">
              <h3 className="text-h3-m md:text-h3-d">How we diagnose and repair</h3>
              <p className="mt-2 text-sm text-gray-soft">Our process for {service.shortName.toLowerCase()} - inspection, diagnosis, repair, test.</p>
              <ol className="mt-5 space-y-4">
                {service.process.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white text-sm font-bold">{step.step}</span>
                    <div>
                      <div className="font-semibold text-ink">{step.title}</div>
                      <p className="mt-1 text-sm text-gray-soft">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CallButton phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            <Link href="/quote" className="btn-ghost">Book {service.shortName.toLowerCase()}</Link>
          </div>
        </div>
      </section>

      {/* SECTION 4b: OTHER CORE SERVICES (semantic context) */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>Our other plumbing services</h2>
            <p className="mt-3 text-gray-soft">
              {BRAND} is a full-service plumbing company. Whichever symptom you started with, we cover the whole water supply, drainage and heating-related plumbing system in a single visit where possible.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-xl border border-gray-line bg-white p-6 transition hover:border-primary hover:shadow-md"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.shortName}</h3>
                <p className="mt-2 text-sm text-gray-soft">{s.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PROCESS - 8 step universal */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-2xl">
            <h2>How our plumbing process works</h2>
            <p className="mt-3 text-gray-soft">
              Eight clear steps from your first phone call to the written guarantee. Transparent at every stage - we explain what is happening and confirm cost before any work begins.
            </p>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', t: 'Contact us', d: 'Call our 24/7 line, request a quote online or send the emergency form. A real dispatcher answers - never a call centre.' },
              { n: '02', t: 'Quick triage', d: 'We confirm the symptoms, ask whether water is escaping and talk you through finding and turning off the stop tap if needed.' },
              { n: '03', t: 'On-site inspection', d: 'The engineer inspects the visible pipework, drainage, fixtures, valves and pressure to map the affected system.' },
              { n: '04', t: 'Diagnosis', d: 'We explain the likely cause, the failed component and the repair options in plain language - no jargon.' },
              { n: '05', t: 'Clear quote', d: 'You receive a transparent fixed quote before any work starts. No surprises, no hidden charges.' },
              { n: '06', t: 'Repair', d: 'Repair, replace, unblock, seal, flush or install from full van stock. Most jobs are completed in one visit.' },
              { n: '07', t: 'Test', d: 'We test water flow, drainage, pressure, valves and seals to confirm the repair holds before sign-off.' },
              { n: '08', t: 'Guarantee', d: 'You receive a written workmanship guarantee, an itemised receipt for insurance and prevention advice for your property.' },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border border-gray-line bg-white p-6">
                <div className="text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 6: EMERGENCY BLOCK */}
      <section className="section bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container-content grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              <span className="pulse-dot bg-white" /> 24/7 emergency line
            </div>
            <h2 className="mt-4 text-white">Need an emergency plumber today?</h2>
            <p className="mt-3 max-w-xl text-white/90">
              Burst pipe, serious leak, overflowing toilet, drain backing up indoors, no water supply or active flooding - call us now. Turn your internal stop tap off where safe and a Gas Safe engineer will be on the way in minutes.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <CallButton size="xl" variant="white" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                Request callback
              </Link>
            </div>
          </div>
          <ul className="md:col-span-5 grid grid-cols-2 gap-3 text-sm">
            {[
              { t: 'Fast response', d: '~30 min average' },
              { t: 'Local plumber', d: 'In-house engineers' },
              { t: 'Clear quote', d: 'Before any work' },
              { t: 'Same-rate repair', d: 'Day or night' },
            ].map((b) => (
              <li key={b.t} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                <div className="font-semibold">{b.t}</div>
                <div className="text-white/80">{b.d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 7: PRICING */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>{service.shortName} cost & clear quotes</h2>
            <p className="mt-3 text-gray-soft">
              {service.shortName} starts from <span className="font-semibold text-ink">{service.startingPrice}</span>. Your final price depends on the type of problem, parts required, access, urgency and time of day. After diagnosis the engineer explains the issue and confirms a fixed quote before any work begins - and the call-out fee covers the first hour on site.
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">No hidden charges. Same rate day or night. Quote before work.</p>
          </div>

          <div className="mt-10 hidden md:block overflow-hidden rounded-xl border border-gray-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-off-white text-xs uppercase tracking-wide text-gray-soft">
                <tr>
                  <th className="px-5 py-4 font-semibold">Cost factor</th>
                  <th className="px-5 py-4 font-semibold">Why it matters</th>
                  <th className="px-5 py-4 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-line">
                {pricingFactors.map((row) => (
                  <tr key={row.factor} className="align-top">
                    <td className="px-5 py-4 font-semibold text-ink">{row.factor}</td>
                    <td className="px-5 py-4 text-gray-soft">{row.why}</td>
                    <td className="px-5 py-4 text-gray-soft">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 md:hidden">
            {pricingFactors.map((row) => (
              <div key={row.factor} className="rounded-xl border border-gray-line bg-white p-5">
                <h3 className="text-base font-semibold text-ink">{row.factor}</h3>
                <p className="mt-2 text-sm text-gray-soft"><span className="font-semibold text-ink">Why it matters: </span>{row.why}</p>
                <p className="mt-1 text-sm text-gray-soft"><span className="font-semibold text-ink">Example: </span>{row.example}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href="/quote" className="btn-primary">Request a quote</Link>
            <CallButton variant="ghost" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
          </div>
        </div>
      </section>

      {/* SECTION 8: WHY CHOOSE US */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <h2>Why choose {BRAND} for {service.shortName.toLowerCase()}?</h2>
              <p className="mt-3 text-gray-soft">
                We are a directly employed team of plumbers, drainage specialists and Gas Safe engineers covering 12 UK cities. No subcontracting, no agency chains, no surcharges and no surprises.
              </p>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-white">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={`${BRAND} engineer ready for a 24/7 ${service.shortName.toLowerCase()} callout`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustReasons(NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT).map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-line bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <UtilityIcon name={b.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-soft">{b.body}</p>
              </div>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="mt-12">
              <h3 className="text-h3-m md:text-h3-d">What customers say</h3>
              <p className="mt-2 max-w-xl text-sm text-gray-soft">{NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ verified reviews across our 12 cities. Average rating {NATIONWIDE_RATING}/5.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 9: RECENT JOBS */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <h2>Recent {service.shortName.toLowerCase()} jobs across the UK</h2>
              <p className="mt-3 text-gray-soft">
                A snapshot of plumbing work completed across our 12 city coverage zones in the last fortnight. Real symptoms, real diagnoses, real repairs.
              </p>
            </div>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">View by city →</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {recentSamples.map((j) => (
              <RecentJobCard key={j.postcode + j.date} job={j} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: SERVICE AREA */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <h2>Cities we cover for {service.shortName.toLowerCase()}</h2>
              <p className="mt-3 text-gray-soft">
                {service.name} is available 24/7 across every city below and the surrounding postcodes. Pick your city to see local response times, postcodes covered and recent jobs.
              </p>
            </div>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">All areas →</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.map((c) => (
              <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-ink">
              <span className="font-semibold">Not sure if we cover your area?</span>{' '}
              <span className="text-gray-soft">Call us with your postcode and we will confirm response times for your street.</span>
            </p>
            <CallButton size="md" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
          </div>
        </div>
      </section>

      {/* SECTION 11: PREVENTION */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Plumber inspecting pipework and valves during a routine plumbing maintenance visit"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <h2 className="mt-6">How to prevent common plumbing problems</h2>
            <p className="mt-3 text-gray-soft">
              Regular plumbing maintenance helps identify worn valves, leaking joints, blocked waste pipes, pressure irregularities and early signs of pipe corrosion before they turn into emergency repairs. A handful of low-effort habits prevents most call-outs we attend.
            </p>
            <Link href="/services/24-hour-plumber" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Book a maintenance visit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
            {preventionTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="text-sm text-ink">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2>{service.name} FAQs</h2>
          <p className="mt-3 text-gray-soft">If your question is not here, call us - a real dispatcher answers 24 hours a day.</p>
          <div className="mt-8">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="section">
          <div className="container-content">
            <h2>Related services</h2>
            <p className="mt-3 max-w-2xl text-gray-soft">
              {service.shortName} often overlaps with the services below. We diagnose the whole system, not just the visible symptom.
            </p>
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

      {/* SECTION 13: FINAL CTA */}
      <CTASection
        heading={`Need ${service.shortName.toLowerCase()} help right now?`}
        subheading="A Gas Safe engineer can be on the way in minutes. Same rates day or night, including weekends and bank holidays."
      />
    </>
  );
}
