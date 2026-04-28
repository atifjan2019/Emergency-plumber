import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import CityCard from '@/components/CityCard';
import ReviewCard from '@/components/ReviewCard';
import FaqAccordion from '@/components/FaqAccordion';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import CallButton from '@/components/CallButton';
import RecentJobCard from '@/components/RecentJobCard';
import UtilityIcon from '@/components/UtilityIcon';
import TrustBar from '@/components/TrustBar';
import { services } from '@/data/services';
import { cities } from '@/data/cities';
import { getFeaturedReviews } from '@/lib/reviews';
import { homeFaq } from '@/data/homeFaq';
import { BRAND, PHONE_DISPLAY, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT, GAS_SAFE_NUMBER } from '@/lib/constants';
import { organizationSchema, faqSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';
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

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Plumbing Services UK - Emergency Repairs, Leaks, Drains & Installations | ${BRAND}`,
  description: `${BRAND} provides local and emergency plumbing services across 12 UK cities. Burst pipe repair, leak detection, drain unblocking, toilet and tap repairs, low water pressure diagnosis and bathroom plumbing. Transparent quotes, guaranteed workmanship, Gas Safe registered.`,
  alternates: { canonical: '/' },
};

const processSteps = [
  { n: '01', t: 'Contact us', d: 'A real dispatcher answers within three rings, 24 hours a day. We log your address, system type and symptoms.' },
  { n: '02', t: 'Quick triage', d: 'We check water flow, ask whether escape is active, and talk you through finding the stop tap if needed.' },
  { n: '03', t: 'Inspection', d: 'Engineer inspects pipework, drainage, fixtures, valves and pressure to map the affected system.' },
  { n: '04', t: 'Diagnosis', d: 'We explain the cause, the failed component and the repair options in plain language - no jargon.' },
  { n: '05', t: 'Clear quote', d: 'Transparent fixed quote before any work starts. No surprises, no hidden charges, day or night.' },
  { n: '06', t: 'Repair', d: 'Repair, replace, unblock, seal, flush or install from full van stock. Most jobs done in one visit.' },
  { n: '07', t: 'Test', d: 'We test water flow, drainage, pressure, valves and seals to confirm the repair holds before sign-off.' },
  { n: '08', t: 'Guarantee', d: 'Written workmanship guarantee, itemised receipt for insurance and prevention advice for your property.' },
];

type ServiceAccent = 'accent' | 'primary' | 'green';
const serviceDeepDive: {
  h3: string;
  accent: ServiceAccent;
  what: string;
  when: string;
  checks: string;
  fix: string;
  note?: string;
  ctaHref: string;
}[] = [
  {
    h3: 'Emergency plumbing repairs',
    accent: 'accent',
    what: 'Same-day, 24-hour response for plumbing emergencies that cannot wait until morning.',
    when: 'Burst pipes, major leaks, overflowing toilets, no water supply or any active flooding.',
    checks: 'Stop tap, leak source, pressure, isolation valves and water damage extent.',
    fix: 'Isolate supply, repair or replace failed pipework, dry the affected area and document for insurance.',
    ctaHref: '/services/24-hour-plumber',
  },
  {
    h3: 'Leak detection & pipe repair',
    accent: 'primary',
    what: 'Non-invasive surveys to find hidden leaks before any cutting begins.',
    when: 'Damp patches, unexplained pressure drops, mystery water bills and underfloor heating losses.',
    checks: 'Thermal imaging, acoustic detection, moisture mapping and tracer gas where required.',
    fix: 'Mark the leak source precisely, then repair or replace the failed pipe, joint or valve.',
    ctaHref: '/services/leak-detection',
  },
  {
    h3: 'Drain cleaning & unblocking',
    accent: 'primary',
    what: 'Indoor and outdoor drain unblocking with mechanical, jetting and CCTV equipment.',
    when: 'Slow sinks, blocked showers, blocked toilets, gully overflows and recurring bad smells.',
    checks: 'Drainage layout, inspection chamber flow, pipe material, joint integrity and root activity.',
    fix: 'High-pressure jetting, electric drain rods, root cutting heads and CCTV survey on recurrent blockages.',
    ctaHref: '/services/blocked-drain',
  },
  {
    h3: 'Pipe installation & replacement',
    accent: 'primary',
    what: 'New pipework, rerouted runs and replacement of failed lead, galvanised or aged copper sections.',
    when: 'Renovations, extensions, repeated burst incidents and lead supply pipe upgrades.',
    checks: 'Existing pipe material, layout, pressure, joint condition and access through floors and walls.',
    fix: 'Copper, MDPE or push-fit plastic in standard domestic sizes with a pressure test on completion.',
    ctaHref: '/services/burst-pipe-repair',
  },
  {
    h3: 'Bathroom & kitchen plumbing',
    accent: 'primary',
    what: 'Sink, tap, toilet, shower, bath, dishwasher and washing machine plumbing.',
    when: 'New installations, leaks, dripping taps, flush failures, slow waste runs and renovation work.',
    checks: 'Supply and waste runs, isolation valves, traps, seals and existing access.',
    fix: 'Replace washers, cartridges, valves, traps, taps and waste connections with proper isolation valves.',
    ctaHref: '/services/blocked-toilet',
  },
  {
    h3: 'Hot water & heating-related plumbing',
    accent: 'primary',
    what: 'Cylinders, immersion heaters, motorised valves, radiators, TRVs and heating circuit pipework.',
    when: 'No hot water, lukewarm showers, leaking radiators, cold spots, system pressure faults and sludge.',
    checks: 'System type, pressure, valve operation, radiator surface temperatures and water condition.',
    fix: 'Replace diverter valves, motorised valves, immersion elements, thermostats and TRVs; powerflush sludged systems.',
    note: 'Gas boiler and gas appliance work is carried out only by Gas Safe registered engineers.',
    ctaHref: '/services/no-hot-water',
  },
];

export default async function HomePage() {
  const featured = await getFeaturedReviews(6);
  const settings = await getSettings();

  return (
    <>
      <SchemaMarkup data={[organizationSchema(), faqSchema(homeFaq)]} />

      {/* HERO - image-led, conversion-focused */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-off-white">
        <div className="container-content py-12 md:py-20 grid gap-10 md:grid-cols-12 md:gap-12 items-center">
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm font-semibold text-accent">
              <span className="pulse-dot" /> 24/7 emergency response
            </div>
            <h1 className="mt-5 tracking-tight">
              Local Plumbers Across the UK <span className="text-primary">- Emergency Repairs, Leaks &amp; Drains Fixed Today</span>
            </h1>
            <p className="mt-5 max-w-xl text-base md:text-lg text-gray-soft">
              Burst pipes, blocked drains, dripping taps and low water pressure - fixed by Gas Safe plumbers across 12 UK cities. Transparent quotes, guaranteed workmanship, same rates day or night.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-primary justify-center">
                Get a free quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden><path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
              <CallButton size="lg" variant="primary" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            </div>

            <div className="mt-7">
              <TrustBar responseTime="30 minutes" />
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Local Gas Safe plumber repairing pipework under a kitchen sink"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden sm:block rounded-xl bg-white border border-gray-line shadow-lg p-4 max-w-[260px]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500" aria-hidden>
                        <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-ink">{NATIONWIDE_RATING}/5</span>
                </div>
                <p className="mt-1 text-xs text-gray-soft">{NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ verified reviews across 12 UK cities</p>
              </div>
              <div className="absolute -top-4 -right-4 hidden sm:flex rounded-xl bg-primary text-white shadow-lg px-4 py-3 items-center gap-3">
                <UtilityIcon name="bolt" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-80">Avg response</div>
                  <div className="text-lg font-bold leading-none">~30 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section aria-label="Trust strip" className="border-y border-gray-line bg-white">
        <div className="container-content py-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 text-sm">
          {[
            { t: 'Local plumbers in 12 UK cities', i: 'pin' },
            { t: '24/7 emergency callouts', i: 'bolt' },
            { t: 'Clear quotes before any work', i: 'tag' },
            { t: 'Guaranteed workmanship', i: 'check' },
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

      {/* SECTION 2: PROBLEM SELECTOR */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Find your fix</span>
            <h2 className="mt-3">What plumbing problem do you need help with?</h2>
            <p className="mt-3 text-gray-soft">
              Pick the issue closest to what you are seeing. Each route takes you to the right service, the likely cause, the diagnostic process and the cost. If your problem is urgent, call {PHONE_DISPLAY} - a real dispatcher answers 24 hours a day.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {problemRouter.map((p) => (
              <Link
                key={p.title}
                href={`/services/${p.slug}`}
                className={`group relative flex h-full flex-col rounded-xl border bg-white p-5 transition hover:shadow-lg ${
                  p.tone === 'emergency'
                    ? 'border-accent/30 hover:border-accent'
                    : p.tone === 'maintenance'
                    ? 'border-green/30 hover:border-green'
                    : 'border-gray-line hover:border-primary'
                }`}
              >
                <div className={`mb-3 grid h-11 w-11 place-items-center rounded-lg border transition ${toneClass(p.tone)}`}>
                  <UtilityIcon name={p.icon} />
                </div>
                <h3 className="text-base font-semibold text-ink leading-snug">{p.title}</h3>
                <p className="mt-1.5 text-sm text-gray-soft leading-snug">{p.blurb}</p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${
                    p.tone === 'emergency' ? 'text-accent' : p.tone === 'maintenance' ? 'text-green-dark' : 'text-primary'
                  }`}
                >
                  Get help
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
                {p.tone === 'emergency' && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">Urgent</span>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-primary text-white p-6 sm:p-8 grid gap-5 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <h3 className="text-h3-m md:text-h3-d text-white">Not sure which service fits? Get a free quote.</h3>
              <p className="mt-2 text-sm text-white/85">Tell us the symptom, send a photo or video. We come back with a fixed quote within the hour.</p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-primary hover:bg-off-white">Get a quote</Link>
              <CallButton size="md" variant="primary" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMON ISSUES - icon-led card grid (replaces text-heavy table) */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Symptoms &amp; causes</span>
            <h2 className="mt-3">Common plumbing issues we repair across the UK</h2>
            <p className="mt-3 text-gray-soft">
              Most plumbing problems trace back to a small set of underlying causes. Recognising the symptom is the first step - the cause and the right repair are what stops it coming back.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {issueExplanations.map((row, i) => {
              const iconMap = ['tap', 'droplet', 'pipe', 'toilet', 'leak', 'gauge', 'radiator', 'shield'];
              return (
                <div key={row.symptom} className="group flex h-full flex-col rounded-xl border border-gray-line bg-white p-5 hover:border-primary transition hover:shadow-md">
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <UtilityIcon name={iconMap[i] || 'check'} />
                  </div>
                  <h3 className="text-base font-bold text-ink">{row.symptom}</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-gray-soft">Cause</dt>
                      <dd className="mt-0.5 text-ink leading-snug">{row.cause}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-gray-soft">If ignored</dt>
                      <dd className="mt-0.5 text-gray-soft leading-snug">{row.risk}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-3 text-sm font-semibold text-primary">{row.service}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between rounded-xl border border-accent/30 bg-accent/5 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-white">
                <UtilityIcon name="alert" />
              </span>
              <div>
                <p className="font-bold text-ink">Already flooding or no water at all?</p>
                <p className="text-sm text-gray-soft">Skip the form. Call our 24/7 emergency line and a plumber will be on the way in minutes.</p>
              </div>
            </div>
            <CallButton size="md" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE SERVICES */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Our services</span>
              <h2 className="mt-3">Plumbing services covered in-house</h2>
              <p className="mt-3 text-gray-soft">
                Eight core services, every engineer on every shift, no subcontracting. We diagnose, quote and fix in a single visit where possible.
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

          {/* Alternating image/content rows for service deep-dive */}
          <div className="mt-16 space-y-12 md:space-y-16">
            {serviceDeepDive.map((s, i) => {
              const reverse = i % 2 === 1;
              const accentBorder = s.accent === 'accent' ? 'border-l-accent' : s.accent === 'green' ? 'border-l-green' : 'border-l-primary';
              const accentText = s.accent === 'accent' ? 'text-accent' : s.accent === 'green' ? 'text-green-dark' : 'text-primary';
              const accentBg = s.accent === 'accent' ? 'bg-accent/10 text-accent' : s.accent === 'green' ? 'bg-green/15 text-green-dark' : 'bg-primary/10 text-primary';
              return (
                <article key={s.h3} className={`grid gap-8 lg:gap-10 lg:grid-cols-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-sm">
                      <Image
                        src={PLACEHOLDER_IMAGE}
                        alt={`${s.h3} carried out by a local UK plumber`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className={`lg:col-span-6 rounded-2xl border-l-4 ${accentBorder} bg-white p-1`}>
                    <div className="px-5 md:px-7">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${accentBg}`}>
                        Service
                      </span>
                      <h3 className="mt-3 text-h3-m md:text-h3-d">{s.h3}</h3>
                      <p className="mt-3 text-gray-soft">{s.what}</p>
                      <dl className="mt-5 space-y-3 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-3">
                          <dt className="font-bold text-ink uppercase tracking-wider text-xs sm:text-sm sm:normal-case sm:tracking-normal">When</dt>
                          <dd className="text-gray-soft">{s.when}</dd>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-3">
                          <dt className="font-bold text-ink uppercase tracking-wider text-xs sm:text-sm sm:normal-case sm:tracking-normal">We check</dt>
                          <dd className="text-gray-soft">{s.checks}</dd>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-3">
                          <dt className="font-bold text-ink uppercase tracking-wider text-xs sm:text-sm sm:normal-case sm:tracking-normal">We fix</dt>
                          <dd className="text-gray-soft">{s.fix}</dd>
                        </div>
                      </dl>
                      {s.note && (
                        <p className="mt-4 rounded-lg bg-off-white p-3 text-xs text-gray-soft">
                          <span className="font-semibold text-ink">Note: </span>{s.note}
                        </p>
                      )}
                      <Link href={s.ctaHref} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${accentText}`}>
                        Learn more about this service
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: PROCESS - horizontal connected timeline */}
      <section id="how-it-works" className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">How it works</span>
            <h2 className="mt-3">From your first call to the written guarantee</h2>
            <p className="mt-3 text-gray-soft">
              Eight clear steps. No appointments to wait for, no upselling on the day, no surprise charges.
            </p>
          </div>

          <ol className="mt-12 relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" aria-hidden />
            {processSteps.map((s) => (
              <li key={s.n} className="relative rounded-xl border border-gray-line bg-white p-6">
                <div className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-md">
                  <span className="text-sm font-bold">{s.n}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-gray-soft leading-snug">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CallButton phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            <Link href="/quote" className="btn-ghost">Get a fixed quote</Link>
            <span className="ml-auto hidden sm:flex items-center gap-2 text-sm text-gray-soft">
              <span className="pulse-dot" />
              <span>Available now - typically responding in ~30 minutes</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: EMERGENCY BLOCK - image-supported red urgency band */}
      <section className="relative bg-gradient-to-br from-accent to-accent-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]" aria-hidden />
        <div className="container-content relative py-16 md:py-20 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              <span className="pulse-dot bg-white" /> 24/7 emergency line
            </div>
            <h2 className="mt-4 text-white">Burst pipe, flood or no water? Call now.</h2>
            <p className="mt-3 max-w-xl text-white/90 text-base md:text-lg">
              Burst pipe, serious leak, overflowing toilet, drain backing up indoors or active flooding - turn your internal stop tap clockwise where safe and a Gas Safe engineer will be on the way in minutes.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <CallButton size="xl" variant="white" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                Request callback
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {['Fast response', 'Local plumber', 'Clear quote', 'Same-rate repair'].map((t) => (
                <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Emergency plumber arriving on site with tools and isolation equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING */}
      <section className="section">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Pricing</span>
              <h2 className="mt-3">Plumbing repair costs &amp; clear quotes</h2>
              <p className="mt-3 text-gray-soft">
                Plumbing cost depends on the type of problem, parts, access, urgency and time of day. After diagnosis the engineer explains the issue and confirms a fixed quote before any work begins. The call-out fee covers the first hour on site.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { t: 'No hidden charges', d: 'Quote confirmed before any work starts' },
                  { t: 'Same rate day or night', d: 'No surcharge for evenings, weekends or bank holidays' },
                  { t: 'Itemised receipt', d: 'Insurance-grade written report included as standard' },
                ].map((b) => (
                  <div key={b.t} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-hidden>
                        <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <div>
                      <div className="font-semibold text-ink">{b.t}</div>
                      <div className="text-sm text-gray-soft">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-primary p-5 text-white">
                <p className="font-semibold">Get an exact price for your job</p>
                <p className="mt-1 text-sm text-white/85">Send a photo or video, get a fixed quote within the hour.</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-off-white">Request a quote</Link>
                  <CallButton size="sm" variant="white" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-line bg-white shadow-sm">
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
                      <tr key={row.factor} className="align-top hover:bg-off-white">
                        <td className="px-5 py-4 font-semibold text-ink">{row.factor}</td>
                        <td className="px-5 py-4 text-gray-soft">{row.why}</td>
                        <td className="px-5 py-4 text-gray-soft">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-3 md:hidden">
                {pricingFactors.map((row) => (
                  <div key={row.factor} className="rounded-xl border border-gray-line bg-white p-5">
                    <h3 className="text-base font-semibold text-ink">{row.factor}</h3>
                    <p className="mt-2 text-sm text-gray-soft"><span className="font-semibold text-ink">Why: </span>{row.why}</p>
                    <p className="mt-1 text-sm text-gray-soft"><span className="font-semibold text-ink">Example: </span>{row.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHY CHOOSE US */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Why us</span>
              <h2 className="mt-3">Why homeowners and landlords choose {BRAND}</h2>
              <p className="mt-3 text-gray-soft">
                We are a directly employed team of plumbers, drainage specialists and Gas Safe engineers covering 12 UK cities. No subcontracting, no agency chains, no surcharges and no surprises.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white border border-gray-line p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{NATIONWIDE_RATING}/5</div>
                  <div className="mt-1 text-xs font-semibold text-gray-soft">{NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ reviews</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-line p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="mt-1 text-xs font-semibold text-gray-soft">UK cities covered</div>
                </div>
                <div className="rounded-xl bg-white border border-gray-line p-4 text-center">
                  <div className="text-2xl font-bold text-primary">~30m</div>
                  <div className="mt-1 text-xs font-semibold text-gray-soft">Avg response</div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-3 rounded-xl border border-gray-line bg-white px-4 py-3 text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <UtilityIcon name="shield" />
                </span>
                <div>
                  <div className="font-semibold text-ink">Gas Safe registered</div>
                  <div className="text-xs text-gray-soft">Reg #{GAS_SAFE_NUMBER} - every gas job</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-white shadow-md">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt={`${BRAND} engineer next to a sign-written plumbing van, ready for a 24/7 emergency callout`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustReasons(NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT).map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-line bg-white p-6 hover:border-primary hover:shadow-md transition">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <UtilityIcon name={b.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-gray-soft">{b.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-h3-m md:text-h3-d">What customers say</h3>
            <p className="mt-2 max-w-xl text-sm text-gray-soft">{NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ verified reviews across our 12 cities. Average rating {NATIONWIDE_RATING}/5.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: RECENT JOBS - thumbnail-led cards */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Recent work</span>
              <h2 className="mt-3">Recent plumbing jobs across the UK</h2>
              <p className="mt-3 text-gray-soft">
                A snapshot of work completed across our 12 city coverage zones in the last fortnight. Real symptoms, real diagnoses, real repairs.
              </p>
            </div>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">View by city →</Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentSamples.slice(0, 3).map((j) => (
              <article key={j.postcode + j.date} className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-line bg-white hover:border-primary hover:shadow-md transition">
                <div className="relative aspect-[16/10] overflow-hidden bg-off-white">
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt={`${j.issue} completed in postcode ${j.postcode}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover transition group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 backdrop-blur px-2 py-0.5 font-mono text-xs font-bold text-ink">{j.postcode}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs font-semibold text-gray-soft">
                    {new Date(j.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-ink">{j.issue}</h3>
                  <p className="mt-2 text-sm text-gray-soft">{j.resolution}</p>
                  <div className="mt-auto pt-4 text-xs text-gray-soft border-t border-gray-line">
                    Resolved in <span className="font-semibold text-ink">{j.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {recentSamples.slice(3).map((j) => (
              <RecentJobCard key={j.postcode + j.date} job={j} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: SERVICE AREAS - chips + cards + map illustration */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Service areas</span>
              <h2 className="mt-3">Plumbers across 12 UK cities and surrounding postcodes</h2>
              <p className="mt-3 text-gray-soft">
                We provide plumbing repairs, leak detection, drain unblocking, emergency plumbing and bathroom and kitchen plumbing across the cities below and their surrounding postcodes.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/emergency-plumber/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary hover:text-primary transition"
                  >
                    <UtilityIcon name="pin" />
                    {c.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
                  <UtilityIcon name="pin" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-ink text-sm">Not sure if we cover your area?</p>
                  <p className="text-xs text-gray-soft">Call with your postcode and we will confirm the response time for your street.</p>
                </div>
                <CallButton size="sm" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {cities.slice(0, 6).map((c) => (
                <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
              ))}
              <Link
                href="/areas"
                className="sm:col-span-2 group flex items-center justify-between rounded-xl border-2 border-dashed border-primary/30 bg-white p-5 hover:border-primary hover:bg-primary/5 transition"
              >
                <div>
                  <div className="text-sm font-bold text-primary">View all service areas</div>
                  <div className="text-xs text-gray-soft">{cities.length} cities and surrounding postcodes</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-primary transition group-hover:translate-x-1" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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
            <span className="mt-6 inline-block rounded-full bg-green/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-dark">Prevention</span>
            <h2 className="mt-3">Stop small problems becoming emergencies</h2>
            <p className="mt-3 text-gray-soft">
              Regular plumbing maintenance helps identify worn valves, leaking joints, blocked waste pipes, pressure irregularities and early signs of pipe corrosion before they turn into emergency repairs. A handful of low-effort habits prevents the majority of the call-outs we attend.
            </p>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              See our maintenance service
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
            {preventionTips.map((tip, i) => (
              <li key={tip} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4 hover:border-green/40 transition">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark text-xs font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-ink leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="section bg-off-white">
        <div className="container-content max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">FAQs</span>
          <h2 className="mt-3">Plumbing services FAQs</h2>
          <p className="mt-3 text-gray-soft">If your question is not here, call us - a real dispatcher answers 24 hours a day.</p>
          <div className="mt-8">
            <FaqAccordion items={homeFaq} />
          </div>
          <div className="mt-6 rounded-xl border border-primary/20 bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-ink flex-1">
              <span className="font-semibold">Still got questions?</span>{' '}
              <span className="text-gray-soft">Talk to a real plumber - no call centre script, no upselling.</span>
            </p>
            <CallButton size="md" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section className="section">
        <div className="container-content">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 md:p-12 grid gap-8 lg:grid-cols-12 items-center">
            <div className="absolute inset-0 opacity-20" aria-hidden>
              <Image
                src={PLACEHOLDER_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
            </div>
            <div className="relative lg:col-span-7">
              <h2 className="text-white">Need a local plumber in the UK?</h2>
              <p className="mt-3 text-white/85 text-base md:text-lg">
                Whether you need urgent help with a burst pipe, a blocked drain, a leaking tap, a hidden leak or a planned plumbing installation, {BRAND} can help. Call now or request a quote from a local plumber in your city.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <CallButton size="lg" variant="white" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
                <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                  Request a quote
                </Link>
              </div>
            </div>
            <ul className="relative lg:col-span-5 grid grid-cols-2 gap-3 text-sm">
              {[
                { t: 'Local plumbers', i: 'pin' },
                { t: '24/7 callouts', i: 'bolt' },
                { t: 'Clear quotes', i: 'tag' },
                { t: 'Guaranteed work', i: 'check' },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/20 text-white">
                    <UtilityIcon name={b.i} />
                  </span>
                  <span className="font-semibold text-white">{b.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
