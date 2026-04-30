import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import ServiceCard from '@/components/ServiceCard';
import CityCard from '@/components/CityCard';
import FaqAccordion from '@/components/FaqAccordion';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import CallButton from '@/components/CallButton';
import UtilityIcon from '@/components/UtilityIcon';
import TrustBar from '@/components/TrustBar';
import { services } from '@/data/services';
import { cities } from '@/data/cities';
import { homeFaq } from '@/data/homeFaq';
import {
  BRAND,
  NATIONWIDE_RATING,
  NATIONWIDE_REVIEW_COUNT,
  GAS_SAFE_NUMBER,
  LEGAL_COMPANY_NAME,
  COMPANY_NUMBER,
  VAT_NUMBER,
  SERVICE_BASE,
  EMAIL,
  PUBLIC_LIABILITY_COVER,
  INSURANCE_PROVIDER,
  REVIEWER,
} from '@/lib/constants';
import { organizationSchema, websiteSchema, faqSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';
import {
  problemRouter,
  issueExplanations,
  pricingFactors,
  preventionTips,
  trustReasons,
  PLACEHOLDER_IMAGE,
  detailedRecentJobs,
  certificationBadges,
  pricingTable,
  pricingFinalNote,
  emergencySafetyTips,
  verifiedReviews,
  serviceLimitations,
  localAreaContext,
} from '@/lib/plumbingContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `24/7 Emergency Plumber UK | ${BRAND}`,
  description: `24/7 emergency plumbers across 12 UK cities. Burst pipes, blocked drains, leaks & boiler repairs. Gas Safe registered. Transparent quotes. Call now.`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: BRAND,
    title: `24/7 Emergency Plumber UK | ${BRAND}`,
    description: `24/7 emergency plumbers across 12 UK cities. Burst pipes, blocked drains, leaks & boiler repairs. Gas Safe registered. Transparent quotes. Call now.`,
    url: '/',
  },
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
  imageAlt: string;
  image?: string;
}[] = [
  {
    h3: 'Emergency plumbing repairs',
    accent: 'accent',
    what: 'Same-day, 24-hour response for plumbing emergencies that cannot wait until morning.',
    when: 'Burst pipes, major leaks, overflowing toilets, no water supply or any active flooding.',
    checks: 'Stop tap, leak source, pressure, isolation valves and water damage extent.',
    fix: 'Isolate supply, repair or replace failed pipework, dry the affected area and document for insurance.',
    ctaHref: '/services/24-hour-plumber',
    imageAlt: 'Emergency plumber isolating a burst pipe with a stop tap during a 24/7 callout',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/emergency-plumbing-repairs.png',
  },
  {
    h3: 'Leak detection & pipe repair',
    accent: 'primary',
    what: 'Non-invasive surveys to find hidden leaks before any cutting begins.',
    when: 'Damp patches, unexplained pressure drops, mystery water bills and underfloor heating losses.',
    checks: 'Thermal imaging, acoustic detection, moisture mapping and tracer gas where required.',
    fix: 'Mark the leak source precisely, then repair or replace the failed pipe, joint or valve.',
    ctaHref: '/services/leak-detection',
    imageAlt: 'Thermal imaging camera being used to find a hidden water leak under a kitchen floor',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/leak-detection-pipe-repair.png',
  },
  {
    h3: 'Drain cleaning & unblocking',
    accent: 'primary',
    what: 'Indoor and outdoor drain unblocking with mechanical, jetting and CCTV equipment.',
    when: 'Slow sinks, blocked showers, blocked toilets, gully overflows and recurring bad smells.',
    checks: 'Drainage layout, inspection chamber flow, pipe material, joint integrity and root activity.',
    fix: 'High-pressure jetting, electric drain rods, root cutting heads and CCTV survey on recurrent blockages.',
    ctaHref: '/services/blocked-drain',
    imageAlt: 'Drain engineer using high-pressure jetting to clear a blocked external drain',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/drain-cleaning.png',
  },
  {
    h3: 'Pipe installation & replacement',
    accent: 'primary',
    what: 'New pipework, rerouted runs and replacement of failed lead, galvanised or aged copper sections.',
    when: 'Renovations, extensions, repeated burst incidents and lead supply pipe upgrades.',
    checks: 'Existing pipe material, layout, pressure, joint condition and access through floors and walls.',
    fix: 'Copper, MDPE or push-fit plastic in standard domestic sizes with a pressure test on completion.',
    ctaHref: '/services/burst-pipe-repair',
    imageAlt: 'Plumber soldering a copper pipe joint during a pipe replacement',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/pipe-installation.webp',
  },
  {
    h3: 'Bathroom & kitchen plumbing',
    accent: 'primary',
    what: 'Sink, tap, toilet, shower, bath, dishwasher and washing machine plumbing.',
    when: 'New installations, leaks, dripping taps, flush failures, slow waste runs and renovation work.',
    checks: 'Supply and waste runs, isolation valves, traps, seals and existing access.',
    fix: 'Replace washers, cartridges, valves, traps, taps and waste connections with proper isolation valves.',
    ctaHref: '/services/blocked-toilet',
    imageAlt: 'Plumber repairing a leaking tap and waste under a kitchen sink',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/bathroom-kitchen-plumbing.webp',
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
    imageAlt: 'Gas Safe engineer servicing a combi boiler and motorised valve',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/worker-repairing-water-heater.webp',
  },
];

const reviewSourceMeta: Record<string, { color: string; bg: string; label: string }> = {
  Google: { color: 'text-[#1a73e8]', bg: 'bg-[#1a73e8]/10', label: 'Google Reviews' },
  Trustpilot: { color: 'text-[#00b67a]', bg: 'bg-[#00b67a]/10', label: 'Trustpilot' },
  Checkatrade: { color: 'text-[#0093d0]', bg: 'bg-[#0093d0]/10', label: 'Checkatrade' },
  TrustATrader: { color: 'text-[#e63946]', bg: 'bg-[#e63946]/10', label: 'TrustATrader' },
  Facebook: { color: 'text-[#1877f2]', bg: 'bg-[#1877f2]/10', label: 'Facebook' },
};

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <SchemaMarkup data={[organizationSchema(settings.phoneTel), websiteSchema(), faqSchema(homeFaq)]} />

      {/* HERO - image-led, conversion-focused */}
      <section
        data-hide-sticky="hero"
        className="relative overflow-hidden bg-gradient-to-br from-white via-white to-off-white"
      >
        <div className="container-content py-12 md:py-20 grid gap-10 md:grid-cols-12 md:gap-12 items-center">
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm font-semibold text-accent">
              <span className="pulse-dot" /> 24/7 emergency response
            </div>
            <h1 className="mt-5 tracking-tight">
              Local Emergency Plumbers <span className="text-primary">Across the UK, Available Now</span>
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
                  src="https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/hero.png"
                  alt="Local Gas Safe plumber repairing pipework under a kitchen sink in a UK home"
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

      {/* EXPERT REVIEWER BOX (E-E-A-T) */}
      <section aria-label="Expert reviewer" className="section bg-white">
        <div className="container-content">
          <div className="overflow-hidden rounded-3xl border border-gray-line bg-gradient-to-br from-white to-off-white shadow-sm">
            <div className="grid md:grid-cols-12">
              <div className="relative md:col-span-5 lg:col-span-4">
                <div className="relative aspect-[4/5] md:h-full md:aspect-auto md:min-h-[460px]">
                  <Image
                    src={REVIEWER.photoUrl}
                    alt={`${REVIEWER.name}, ${REVIEWER.role} at ${BRAND}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent p-5 sm:p-6">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                      <UtilityIcon name="badge" />
                      Expert reviewed
                    </div>
                    <div className="mt-3 text-lg sm:text-xl font-extrabold text-white leading-tight">
                      {REVIEWER.name}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white/85">
                      {REVIEWER.role}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 rounded-xl bg-white/95 backdrop-blur px-3 py-2 shadow-md">
                    <div className="text-2xl font-extrabold text-primary leading-none">
                      {REVIEWER.yearsExperience}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-soft mt-0.5">
                      Years on tools
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 lg:col-span-8 p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Reviewed by an engineer, not a marketer
                  </span>
                  <span className="text-xs font-medium text-gray-soft">
                    Last reviewed{' '}
                    {new Date(REVIEWER.lastReviewed).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="mt-3 text-h3-m md:text-h2-m">
                  Reviewed by {REVIEWER.name}, {REVIEWER.yearsExperience} years on the tools
                </h2>

                <p className="mt-4 text-sm md:text-base text-gray-soft">
                  Every plumbing guide, price and recommendation on this page is reviewed and signed off by a working engineer - not a marketing team. Below are the qualifications, registrations and specialist areas the review covers.
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-soft">Qualifications &amp; registrations</div>
                    <ul className="mt-3 space-y-2 text-sm text-ink">
                      {REVIEWER.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                              <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                            </svg>
                          </span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-soft">Specialist areas</div>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {REVIEWER.specialistAreas.map((s) => (
                        <li
                          key={s}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-line bg-white px-3 py-1 text-xs font-semibold text-ink"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS & CERTIFICATIONS BADGE ROW */}
      <section aria-label="Qualifications and certifications" className="border-y border-gray-line bg-off-white">
        <div className="container-content py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-h3-m md:text-h3-d">Qualifications &amp; trade memberships</h2>
            <p className="text-xs font-semibold text-gray-soft">
              All registrations independently verifiable. Every engineer ID-carrying.
            </p>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {certificationBadges.map((c) => (
              <li
                key={c.name}
                className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3 rounded-xl border border-gray-line bg-white p-4 hover:border-primary transition"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <UtilityIcon name={c.icon} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink leading-tight">{c.name}</div>
                  <div className="mt-0.5 text-xs text-gray-soft leading-snug">{c.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION: PROBLEM SELECTOR */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Find your fix</span>
            <h2 className="mt-3">What plumbing problem do you need help with?</h2>
            <p className="mt-3 text-gray-soft">
              Pick the issue closest to what you are seeing. Each route takes you to the right service, the likely cause, the diagnostic process and the cost. If your problem is urgent, call {settings.phoneDisplay} - a real dispatcher answers 24 hours a day.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {problemRouter.map((p) => {
              const isEmergency = p.tone === 'emergency';
              const isMaintenance = p.tone === 'maintenance';
              const cardBorder = isEmergency
                ? 'border-accent/20 hover:border-accent'
                : isMaintenance
                ? 'border-green/30 hover:border-green'
                : 'border-gray-line hover:border-primary';
              const iconBg = isEmergency
                ? 'bg-accent shadow-lg shadow-accent/30'
                : isMaintenance
                ? 'bg-green shadow-lg shadow-green/30'
                : 'bg-primary shadow-lg shadow-primary/30';
              const linkColor = isEmergency ? 'text-accent' : isMaintenance ? 'text-green-dark' : 'text-primary';
              const cardBlob = isEmergency
                ? 'bg-accent/5 group-hover:bg-accent/10'
                : isMaintenance
                ? 'bg-green/5 group-hover:bg-green/10'
                : 'bg-primary/5 group-hover:bg-primary/10';
              return (
                <Link
                  key={p.title}
                  href={`/services/${p.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-5 transition hover:shadow-xl hover:-translate-y-0.5 ${cardBorder}`}
                >
                  <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full transition ${cardBlob}`} aria-hidden />
                  <div className="relative">
                    <div className={`grid h-12 w-12 place-items-center rounded-xl text-white transition group-hover:scale-110 ${iconBg}`}>
                      <UtilityIcon name={p.icon} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink leading-snug">{p.title}</h3>
                    <p className="mt-1.5 text-sm text-gray-soft leading-snug">{p.blurb}</p>
                  </div>
                  <span className={`relative mt-4 inline-flex items-center gap-1 text-sm font-bold ${linkColor}`}>
                    Get help
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden>
                      <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                  {isEmergency && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-accent/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Urgent
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-primary/20">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" aria-hidden />
            <div className="relative grid gap-6 md:gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
                  </svg>
                  Free quote
                </span>
                <h3 className="mt-3 text-h3-m md:text-h3-d text-white">Not sure which service fits? Get a free quote.</h3>
                <p className="mt-3 text-base text-white/85 leading-relaxed">Tell us the symptom, send a photo or video. We come back with a fixed quote within the hour.</p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-bold text-primary shadow-lg hover:bg-off-white transition whitespace-nowrap"
                >
                  Get a free quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition whitespace-nowrap"
                >
                  Send photos &amp; symptoms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: COMMON ISSUES */}
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

      {/* SECTION: CORE SERVICES */}
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
                        src={s.image ?? PLACEHOLDER_IMAGE}
                        alt={s.imageAlt}
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

      {/* SECTION: PROCESS */}
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
            <Link href="/quote" className="btn-primary">
              Get a fixed quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/quote#photos" className="btn-ghost">Send photos for a price</Link>
            <span className="ml-auto hidden sm:flex items-center gap-2 text-sm text-gray-soft">
              <span className="pulse-dot" />
              <span>Quotes typically returned within the hour</span>
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: EMERGENCY BLOCK */}
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
                src="https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/plumbing-professional-doing-his-job.webp"
                alt="Emergency plumber arriving on site with tools and isolation equipment for a 24/7 callout"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EMERGENCY SAFETY ADVICE */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">Stay safe</span>
              <h2 className="mt-3">What to do before the plumber arrives</h2>
              <p className="mt-3 text-gray-soft">
                If you have an active leak, a flood or no water at all, the right first steps can stop thousands of pounds of damage. Take a breath, work through this list, then call us. We will keep you on the line and walk you through anything you are unsure about.
              </p>
              <div className="mt-6 rounded-xl border border-accent/30 bg-white p-5">
                <p className="font-bold text-ink">Live emergency right now?</p>
                <p className="mt-1 text-sm text-gray-soft">A real dispatcher answers in under 60 seconds. We will stay with you until the engineer arrives.</p>
                <div className="mt-4">
                  <CallButton size="md" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
                </div>
              </div>
            </div>
            <ol className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
              {emergencySafetyTips.map((tip, i) => (
                <li
                  key={tip.title}
                  className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4 hover:border-accent/40 hover:shadow-md transition"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                    <UtilityIcon name={tip.icon} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-sm font-bold text-ink">{tip.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-soft leading-snug">{tip.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION: TRANSPARENT PRICING */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="container-content relative">
          {/* Header */}
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Pricing</span>
            <h2 className="mt-3">Transparent plumbing prices - no hidden charges</h2>
            <p className="mt-4 text-gray-soft md:text-lg">
              Published rates, fixed quotes confirmed in writing before any work starts, and the same rate at 3am Sunday as at 11am Tuesday.
            </p>
          </div>

          {/* Trust pill row */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { t: 'No hidden charges', d: 'Written quote before work starts' },
              { t: 'Same rate day or night', d: 'No nights or weekend surcharge' },
              { t: 'Itemised receipt', d: 'Insurance-grade documentation' },
              { t: 'Fixed-price guarantee', d: 'We cover any overrun' },
            ].map((b) => (
              <div key={b.t} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-hidden>
                    <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-bold text-ink">{b.t}</div>
                  <div className="text-xs text-gray-soft mt-0.5">{b.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured pricing tiles */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pricingTable.slice(0, 3).map((row, i) => {
              const featured = i === 2;
              return (
                <div
                  key={row.item}
                  className={`relative rounded-2xl border p-6 md:p-7 transition shadow-sm hover:shadow-md ${
                    featured
                      ? 'bg-primary text-white border-primary lg:scale-[1.03]'
                      : 'bg-white border-gray-line'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                      Most asked about
                    </span>
                  )}
                  <p className={`text-xs font-bold uppercase tracking-wider ${featured ? 'text-white/80' : 'text-gray-soft'}`}>
                    {row.item}
                  </p>
                  <p className={`mt-3 text-3xl md:text-4xl font-extrabold tracking-tight ${featured ? 'text-white' : 'text-primary'}`}>
                    {row.price}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-gray-soft'}`}>
                    {row.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Secondary rates strip */}
          <div className="mt-6 rounded-2xl border border-gray-line bg-white overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-3 border-b border-gray-line bg-off-white">
              <h3 className="text-sm font-bold text-ink">Other published rates</h3>
              <span className="text-xs text-gray-soft">Incl. VAT - {VAT_NUMBER}</span>
            </div>
            <ul className="divide-y divide-gray-line md:divide-y-0 md:grid md:grid-cols-2 md:divide-x">
              {pricingTable.slice(3).map((row) => (
                <li key={row.item} className="p-5 md:p-6 hover:bg-off-white transition">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-semibold text-ink">{row.item}</h4>
                    <div className="text-base font-bold text-primary whitespace-nowrap">{row.price}</div>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-soft leading-snug">{row.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-xs text-gray-soft max-w-3xl leading-relaxed">
            <span className="font-semibold text-ink">What affects the final price:</span> {pricingFinalNote}
          </p>

          {/* Cost factor tiles */}
          <div className="mt-12">
            <div className="max-w-2xl">
              <h3 className="text-h3-m md:text-h3-d">Cost factors that shape your quote</h3>
              <p className="mt-2 text-sm text-gray-soft">Each fixed quote is calculated against these inputs - so two similar-sounding jobs can sit at different price points.</p>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pricingFactors.slice(0, 6).map((f, i) => (
                <li key={f.factor} className="rounded-2xl border border-gray-line bg-white p-5 hover:border-primary/30 hover:shadow-sm transition">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-bold text-ink">{f.factor}</h4>
                  </div>
                  <p className="mt-3 text-xs text-gray-soft leading-relaxed">{f.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Final CTA stripe */}
          <div className="mt-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white p-6 md:p-8">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)] pointer-events-none" aria-hidden />
            <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">Free fixed quote</p>
                <h3 className="mt-2 text-white text-h3-m md:text-h3-d">Get an exact price for your job - usually within the hour</h3>
                <p className="mt-2 text-sm md:text-base text-white/85">Send a photo or short video and a few details. A real engineer comes back with a written, fixed quote - no obligation.</p>
              </div>
              <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-primary hover:bg-off-white transition"
                >
                  Get my free quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <CallButton variant="white" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY CHOOSE US */}
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
                  src="https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/promotional-image-repair-experts-posing-with-their-tools-equipment-exuding-confidence.jpg"
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
        </div>
      </section>

      {/* SECTION: RECENT PLUMBING JOBS */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Recent work</span>
              <h2 className="mt-3">Recent plumbing jobs we completed</h2>
              <p className="mt-3 text-gray-soft">
                Real symptoms, real diagnoses, real repairs. A snapshot of recent jobs from our 12 city coverage zones - the same engineers and the same fixed-quote process you would get if you called now.
              </p>
            </div>
            <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">View by city →</Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {detailedRecentJobs.map((j) => (
              <article
                key={j.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-line bg-white hover:border-primary hover:shadow-lg transition"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-off-white">
                  <Image
                    src={j.image ?? PLACEHOLDER_IMAGE}
                    alt={j.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover transition group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-ink shadow-sm">
                    <UtilityIcon name="pin" />
                    {j.location} · {j.postcode}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-primary/90 backdrop-blur px-3 py-1 text-xs font-bold text-white">
                    {new Date(j.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-ink">{j.title}</h3>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-accent">Problem</dt>
                      <dd className="mt-0.5 text-ink leading-snug">{j.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-primary">Diagnosis</dt>
                      <dd className="mt-0.5 text-ink leading-snug">{j.diagnosis}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-primary">Repair completed</dt>
                      <dd className="mt-0.5 text-ink leading-snug">{j.repair}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-wider text-green-dark">Outcome</dt>
                      <dd className="mt-0.5 text-ink leading-snug">{j.outcome}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-line text-xs">
                    <span className="inline-flex items-center gap-1.5 text-gray-soft">
                      <UtilityIcon name="bolt" />
                      <span className="font-semibold text-ink">{j.timeTaken}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 font-semibold text-green-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-dark" />
                      Resolved &amp; guaranteed
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-lg font-bold">Got a similar problem? Get a free fixed quote.</p>
              <p className="mt-1 text-sm text-white/85">Send a photo or short video. The same engineers behind the jobs above will come back with a price - usually within the hour.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-primary hover:bg-off-white shadow-md"
              >
                Get a free quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VERIFIED REVIEWS */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-700">
                Verified reviews
              </span>
              <h2 className="mt-3">{NATIONWIDE_RATING}/5 from {NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ verified customers</h2>
              <p className="mt-3 text-gray-soft">
                Every review below is published on a third-party platform - we cannot edit them, hide them or write them ourselves. Click through to read the original review on the source platform.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(['Google', 'Trustpilot', 'Checkatrade', 'TrustATrader', 'Facebook'] as const).map((p) => (
                <span key={p} className={`rounded-full px-3 py-1 text-xs font-bold ${reviewSourceMeta[p].bg} ${reviewSourceMeta[p].color}`}>
                  {reviewSourceMeta[p].label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedReviews.map((r, idx) => {
              const meta = reviewSourceMeta[r.source];
              return (
                <article
                  key={`${r.name}-${idx}`}
                  className="relative flex h-full flex-col rounded-2xl border border-gray-line bg-white p-6 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.bg} ${meta.color}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {meta.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-dark">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                      Verified
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`h-4 w-4 ${i < r.rating ? 'text-yellow-500' : 'text-gray-line'}`}
                        aria-hidden
                      >
                        <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink">"{r.text}"</p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-line pt-4 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <div className="font-bold text-ink text-sm">{r.name}</div>
                        <div className="text-gray-soft">
                          {r.service} · {r.city} ·{' '}
                          {new Date(r.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: SERVICE AREAS - chips + cards + map illustration + local proof */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="container-content relative">
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Service areas</span>
              <h2 className="mt-3">Plumbers across {cities.length} UK cities and surrounding postcodes</h2>
              <p className="mt-3 text-gray-soft md:text-lg max-w-3xl">
                Emergency plumbing, leak detection, drain unblocking and full bathroom and kitchen plumbing - delivered by directly employed engineers across the cities below. Each city has its own page with local jobs, postcodes and reviews.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/areas"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition"
              >
                View all service areas
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { v: cities.length.toString(), l: 'UK cities covered', i: 'pin' },
              { v: '~30m', l: 'Average response time', i: 'clock' },
              { v: '24/7', l: '365 days a year', i: 'bolt' },
              { v: '90-day', l: 'Workmanship guarantee', i: 'shield' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-gray-line bg-white p-5 flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <UtilityIcon name={s.i} />
                </span>
                <div>
                  <div className="text-2xl font-extrabold text-ink leading-none">{s.v}</div>
                  <div className="mt-1 text-xs font-semibold text-gray-soft">{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero row: enlarged map + sidebar */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-gray-line bg-gradient-to-br from-primary/5 via-off-white to-primary/10 aspect-[5/3]">
                <svg
                  viewBox="0 0 500 300"
                  className="absolute inset-0 h-full w-full"
                  aria-label="Map of UK service area cities"
                >
                  <path
                    d="M180 30 Q160 20 150 50 Q140 80 130 110 Q110 140 130 170 Q140 200 160 230 Q180 260 220 270 Q260 275 290 260 Q320 245 330 215 Q345 185 345 155 Q350 125 335 95 Q320 65 290 50 Q260 35 220 30 Z M210 280 Q220 290 240 290 Q260 290 270 280 Z"
                    fill="rgba(30, 115, 190, 0.08)"
                    stroke="rgba(30, 115, 190, 0.3)"
                    strokeWidth="1.5"
                  />
                  {[
                    { x: 240, y: 240, name: 'London', big: true },
                    { x: 215, y: 165, name: 'Birmingham', big: true },
                    { x: 215, y: 130, name: 'Manchester', big: true },
                    { x: 230, y: 120, name: 'Leeds' },
                    { x: 198, y: 130, name: 'Liverpool' },
                    { x: 220, y: 220, name: 'Bristol' },
                    { x: 235, y: 140, name: 'Sheffield' },
                    { x: 200, y: 75, name: 'Edinburgh' },
                    { x: 175, y: 80, name: 'Glasgow' },
                    { x: 240, y: 100, name: 'Newcastle' },
                    { x: 235, y: 175, name: 'Nottingham' },
                    { x: 195, y: 215, name: 'Cardiff' },
                  ].map((c) => (
                    <g key={c.name}>
                      <circle cx={c.x} cy={c.y} r={c.big ? 7 : 5} fill="#1E73BE" />
                      <circle cx={c.x} cy={c.y} r={c.big ? 12 : 9} fill="#1E73BE" fillOpacity="0.2">
                        <animate attributeName="r" values={`${c.big ? 12 : 9};${c.big ? 18 : 14};${c.big ? 12 : 9}`} dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <text x={c.x + (c.big ? 12 : 10)} y={c.y + 4} fontSize="11" fontWeight="700" fill="#222">
                        {c.name}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="absolute top-3 left-3 rounded-lg bg-white/95 backdrop-blur px-3 py-2 text-xs font-bold text-ink shadow-md flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Live coverage map
                </div>
                <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 backdrop-blur px-3 py-2 text-xs font-bold text-ink shadow-md">
                  {cities.length} cities · {cities.reduce((acc, c) => acc + c.postcodes.length, 0)}+ postcode districts
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-gray-line bg-white p-6 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Quick navigation</p>
                <h3 className="mt-2 text-lg font-bold text-ink">Jump to your city</h3>
                <p className="mt-1 text-sm text-gray-soft">Tap a city for local jobs, postcodes and reviews from real customers.</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/emergency-plumber/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-primary hover:text-primary hover:bg-primary/5 transition"
                    >
                      <UtilityIcon name="pin" />
                      {c.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/20 text-white">
                        <UtilityIcon name="pin" />
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">Not sure if we cover your area?</p>
                        <p className="mt-1 text-xs text-white/85">Drop in your postcode and we will confirm the response time for your street.</p>
                      </div>
                    </div>
                    <Link
                      href="/quote"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-primary hover:bg-off-white transition"
                    >
                      Check my postcode
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                        <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full city card grid */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h3 className="text-h3-m md:text-h3-d">All {cities.length} service areas</h3>
              <Link href="/areas" className="text-sm font-semibold text-primary hover:text-primary-dark">
                View all →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cities.map((c) => (
                <CityCard key={c.slug} slug={c.slug} name={c.name} region={c.region} responseTime={c.responseTime} />
              ))}
            </div>
          </div>

          {/* Local property-type context cards - unique per city, anti-doorway */}
          <div className="mt-12">
            <h3 className="text-h3-m md:text-h3-d">Local property knowledge in every city</h3>
            <p className="mt-2 max-w-3xl text-sm text-gray-soft">
              Different housing stock means different plumbing problems. Our engineers know the quirks of each area - the pipework, the common failures and the property-type context.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {localAreaContext.map((a) => (
                <Link
                  key={a.city}
                  href={`/emergency-plumber/${a.city.toLowerCase()}`}
                  className="group rounded-xl border border-gray-line bg-white p-5 hover:border-primary hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-ink">{a.city}</h4>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                      <UtilityIcon name="pin" />
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-soft leading-snug">{a.context}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    See local jobs &amp; reviews
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 transition group-hover:translate-x-1" aria-hidden>
                      <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PREVENTION */}
      <section className="section bg-off-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-green/8 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="container-content relative">
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="inline-block rounded-full bg-green/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-dark">Prevention</span>
              <h2 className="mt-3">Stop small problems becoming emergencies</h2>
              <p className="mt-3 text-gray-soft md:text-lg max-w-3xl">
                Regular plumbing maintenance catches worn valves, leaking joints, blocked waste pipes, pressure faults and early pipe corrosion before they turn into emergency call-outs. A handful of low-effort habits prevents most of the jobs we attend.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-green/40 bg-white px-5 py-3 text-sm font-semibold text-green-dark hover:bg-green/10 transition"
              >
                See our maintenance service
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Tip cards */}
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preventionTips.map((tip, i) => {
              const meta = [
                { icon: 'shield', label: 'Stop tap' },
                { icon: 'pipe', label: 'Frost protection' },
                { icon: 'toilet', label: 'Drain care' },
                { icon: 'search', label: 'Monthly check' },
                { icon: 'droplet', label: 'Water quality' },
                { icon: 'tap', label: 'Tap upkeep' },
                { icon: 'radiator', label: 'Heating system' },
                { icon: 'clock', label: 'Annual service' },
              ][i] ?? { icon: 'check', label: 'Tip' };
              return (
                <li
                  key={tip}
                  className="group relative flex flex-col rounded-2xl border border-gray-line bg-white p-5 hover:border-green/50 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-green/12 text-green-dark group-hover:bg-green group-hover:text-white transition">
                      <UtilityIcon name={meta.icon} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-soft">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-green-dark">{meta.label}</p>
                  <p className="mt-2 text-sm text-ink leading-relaxed flex-1">{tip}</p>
                </li>
              );
            })}
          </ul>

          {/* Maintenance CTA banner */}
          <div className="mt-10 relative overflow-hidden rounded-2xl border border-green/25 bg-white">
            <div className="grid gap-0 md:grid-cols-12 items-stretch">
              <div className="md:col-span-4 relative min-h-[180px] md:min-h-0">
                <Image
                  src="https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/promotional-image-repair-experts-posing-with-their-tools-equipment-exuding-confidence.jpg"
                  alt="Plumber inspecting pipework and valves during a routine plumbing maintenance visit"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-8 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-green-dark">Annual maintenance plan</p>
                  <h3 className="mt-2 text-h3-m md:text-h3-d">Catch problems early - one yearly visit, fixed price</h3>
                  <p className="mt-2 text-sm text-gray-soft">A scheduled plumbing inspection across pipework, valves, drainage and the boiler. Most repeat call-outs we attend would have been prevented at this stage.</p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:shrink-0">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green text-white px-5 py-3 text-sm font-bold hover:bg-green-dark transition"
                  >
                    Book a check-up
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                      <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-line px-5 py-3 text-sm font-semibold text-ink hover:bg-off-white transition"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SERVICE LIMITATIONS */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">Scope of work</span>
            <h2 className="mt-3">What we cover - and what we do not</h2>
            <p className="mt-3 text-gray-soft">
              Honest scope, no time-wasting callouts. If your job sits outside our coverage we will tell you on the phone before sending an engineer.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {serviceLimitations.map((s, i) => {
              const isCover = i === 0;
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl border p-6 ${isCover ? 'border-green/30 bg-green/5' : 'border-accent/20 bg-accent/5'}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-lg ${
                        isCover ? 'bg-green text-white' : 'bg-accent text-white'
                      }`}
                    >
                      {isCover ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5" aria-hidden>
                          <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5" aria-hidden>
                          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      )}
                    </span>
                    <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            isCover ? 'bg-green' : 'bg-accent'
                          }`}
                        />
                        <span className="text-ink leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-xs text-gray-soft max-w-3xl">
            Gas Safe: gas appliance work (boilers, gas hobs, gas fires) is carried out only by our Gas Safe registered engineers (Reg #{GAS_SAFE_NUMBER}). All gas work is logged on the Gas Safe register on completion.
          </p>
        </div>
      </section>

      {/* SECTION: TRUST DETAILS BAND */}
      <section aria-label="Company trust details" className="bg-ink text-white">
        <div className="container-content py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/60">Legal company</div>
            <div className="mt-2 text-base font-bold">{LEGAL_COMPANY_NAME}</div>
            <div className="mt-1 text-xs text-white/70">Company number {COMPANY_NUMBER} · {SERVICE_BASE}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/60">VAT &amp; tax</div>
            <div className="mt-2 text-base font-bold">VAT registered</div>
            <div className="mt-1 text-xs text-white/70">{VAT_NUMBER} · prices include VAT</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/60">Insurance</div>
            <div className="mt-2 text-base font-bold">{PUBLIC_LIABILITY_COVER} public liability</div>
            <div className="mt-1 text-xs text-white/70">Underwritten by {INSURANCE_PROVIDER}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/60">Emergency contact</div>
            <a href={`tel:${settings.phoneTel}`} className="mt-2 inline-block text-base font-bold text-white hover:text-primary transition">
              {settings.phoneDisplay}
            </a>
            <div className="mt-1 text-xs text-white/70">24/7 · email <a className="underline hover:text-white" href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">FAQs</span>
          <h2 className="mt-3">Plumbing services FAQs</h2>
          <p className="mt-3 text-gray-soft">If your question is not here, call us - a real dispatcher answers 24 hours a day.</p>
          <div className="mt-8">
            <FaqAccordion items={homeFaq} />
          </div>
          <div className="mt-6 rounded-xl border border-primary/20 bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-ink flex-1">
              <span className="font-semibold">Still got questions?</span>{' '}
              <span className="text-gray-soft">Send your details and a real plumber will reply with a free, no-obligation quote.</span>
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark transition whitespace-nowrap"
            >
              Get a free quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: FINAL CTA */}
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
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-4 text-base font-bold text-primary shadow-lg hover:bg-off-white transition"
                >
                  Get my free quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                    <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/quote#photos"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
                >
                  Send photos &amp; details
                </Link>
              </div>
              <p className="mt-4 text-xs text-white/70">
                Active flooding right now? Call our 24/7 emergency line: {' '}
                <a href={`tel:${settings.phoneTel}`} className="underline font-semibold text-white">
                  {settings.phoneDisplay}
                </a>
              </p>
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
