import Link from 'next/link';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import CityCard from '@/components/CityCard';
import ReviewCard from '@/components/ReviewCard';
import FaqAccordion from '@/components/FaqAccordion';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import CallButton from '@/components/CallButton';
import RecentJobCard from '@/components/RecentJobCard';
import ServiceIcon from '@/components/ServiceIcon';
import { services } from '@/data/services';
import { cities } from '@/data/cities';
import { getFeaturedReviews } from '@/lib/reviews';
import { homeFaq } from '@/data/homeFaq';
import { BRAND, PHONE_DISPLAY, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';
import { organizationSchema, faqSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Plumbing Services UK - Emergency Repairs, Leaks, Drains & Installations | ${BRAND}`,
  description: `${BRAND} provides local and emergency plumbing services across 12 UK cities. Burst pipe repair, leak detection, drain unblocking, toilet and tap repairs, low water pressure diagnosis and bathroom plumbing. Transparent quotes, guaranteed workmanship, Gas Safe registered.`,
  alternates: { canonical: '/' },
};

const problemRouter = [
  { slug: 'burst-pipe-repair', tone: 'emergency', icon: 'droplet', title: 'Burst pipe repair', blurb: 'Stop the flood, isolate the supply and replace the failed pipework before damage spreads.' },
  { slug: 'blocked-drain', tone: 'standard', icon: 'pipe', title: 'Blocked drain unblocking', blurb: 'Clear sink, shower, soil and external drain blockages with jetting, rods and CCTV survey.' },
  { slug: 'blocked-toilet', tone: 'standard', icon: 'toilet', title: 'Blocked toilet repair', blurb: 'Toilet blockages cleared cleanly past the trap and into the soil pipe without damage.' },
  { slug: 'burst-pipe-repair', tone: 'standard', icon: 'leak', title: 'Leaking pipe repair', blurb: 'Visible drips, joint failures and pinhole leaks identified and repaired in copper or plastic.' },
  { slug: 'burst-pipe-repair', tone: 'standard', icon: 'tap', title: 'Dripping tap repair', blurb: 'Worn washers, failed cartridges and seized valve seats replaced or refurbished.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'gauge', title: 'Low water pressure diagnosis', blurb: 'Diagnose closed valves, hidden leaks, blocked pipework and mains supply restrictions.' },
  { slug: 'no-hot-water', tone: 'emergency', icon: 'shower', title: 'No hot water', blurb: 'Diverter valves, immersion elements, cylinder thermostats and motorised valves repaired.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'bath', title: 'Bathroom plumbing', blurb: 'Sinks, taps, showers, baths, toilets, traps and waste pipework installed and repaired.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'kitchen', title: 'Kitchen plumbing', blurb: 'Kitchen sinks, mixer taps, dishwasher and washing machine connections, isolation valves.' },
  { slug: 'leak-detection', tone: 'maintenance', icon: 'plug', title: 'Appliance connections', blurb: 'Safe water supply and waste connections for dishwashers, washing machines and ice-makers.' },
  { slug: 'central-heating-repair', tone: 'standard', icon: 'radiator', title: 'Radiator leak or valve issue', blurb: 'Leaking radiators, failed TRVs, cold spots, sludge and pressure problems diagnosed.' },
  { slug: '24-hour-plumber', tone: 'emergency', icon: 'alert', title: 'Emergency plumbing callout', blurb: '24-hour response across 12 UK cities for floods, no supply and overflowing drains.' },
];

const issueExplanations = [
  {
    symptom: 'Dripping tap',
    cause: 'Worn washer, failed cartridge, damaged valve seat or loose fitting',
    risk: 'Wasted water, higher water bills, limescale staining and fixture damage',
    service: 'Tap repair or replacement',
  },
  {
    symptom: 'Burst pipe',
    cause: 'Freezing, internal corrosion, pressure surges, joint failure or aged pipework',
    risk: 'Flooding, ceiling collapse, damp, mould and structural damage',
    service: 'Emergency pipe isolation and repair',
  },
  {
    symptom: 'Blocked drain',
    cause: 'Grease, hair, soap, food waste, limescale, foreign objects or root ingress',
    risk: 'Slow drainage, foul smells, overflow at gullies and wastewater backup indoors',
    service: 'Drain unblocking with CCTV survey for recurrence',
  },
  {
    symptom: 'Blocked toilet',
    cause: 'Wipes, paper overload, foreign objects, faulty flush or downstream soil-pipe restriction',
    risk: 'Overflow, hygiene risk and bathroom water damage',
    service: 'Toilet unblocking and soil-pipe clearance',
  },
  {
    symptom: 'Hidden leak',
    cause: 'Failed joint, pinhole pipe corrosion, seal failure or pressure damage in concealed pipework',
    risk: 'Damp, mould, rot, ceiling staining and unexplained pressure loss',
    service: 'Leak detection survey and pipe repair',
  },
  {
    symptom: 'Low water pressure',
    cause: 'Hidden leak, partially closed valve, blocked pipework, failed PRV or mains supply issue',
    risk: 'Weak shower flow, slow-filling appliances and inefficient hot water systems',
    service: 'Water pressure diagnosis and repair',
  },
  {
    symptom: 'Cold radiator spots',
    cause: 'Sludge accumulation, trapped air, restricted circulation or failed radiator valve',
    risk: 'Inefficient heating, higher energy bills and uneven room temperatures',
    service: 'Radiator service, balancing or powerflush',
  },
  {
    symptom: 'Hard water and limescale',
    cause: 'Mineral build-up in hard-water areas affecting pipework, fixtures and heat exchangers',
    risk: 'Blocked aerators, damaged appliances, narrowed pipes and shortened boiler life',
    service: 'Limescale treatment, filters and water softeners',
  },
];

const processSteps = [
  { n: '01', t: 'Contact us', d: 'Call our 24/7 line, request a quote online or submit the emergency form. A real dispatcher answers - never a call centre.' },
  { n: '02', t: 'Quick triage', d: 'We confirm the symptoms, ask whether water is still escaping, and talk you through finding and turning off the stop tap if needed.' },
  { n: '03', t: 'On-site inspection', d: 'The engineer inspects the visible pipework, drainage, fixtures, valves and pressure to map the affected system.' },
  { n: '04', t: 'Diagnosis', d: 'We explain the likely cause, the failed component and the repair options in plain language - no jargon.' },
  { n: '05', t: 'Clear quote', d: 'You receive a transparent fixed quote before any work starts. No surprises, no hidden charges.' },
  { n: '06', t: 'Repair', d: 'Repair, replace, unblock, seal, flush or install from full van stock. Most domestic jobs are completed in a single visit.' },
  { n: '07', t: 'Test', d: 'We test water flow, drainage, pressure, valves and seals to confirm the repair holds before sign-off.' },
  { n: '08', t: 'Guarantee & aftercare', d: 'You receive a written workmanship guarantee, an itemised receipt for insurance and prevention advice tailored to your property.' },
];

const pricingFactors = [
  { factor: 'Type of problem', why: 'A tap washer is not the same job as a hidden leak or a burst supply pipe.', example: 'Tap repair is quicker and cheaper than excavation for a collapsed drain.' },
  { factor: 'Emergency vs scheduled', why: 'Out-of-hours work needs an engineer dispatched immediately rather than booked in.', example: 'We charge the same rate day or night - many other operators surcharge nights.' },
  { factor: 'Parts required', why: 'Replacement components affect the total cost of the repair.', example: 'A diverter valve costs more in parts than a thermostatic radiator valve.' },
  { factor: 'Access to pipework', why: 'Concealed pipework behind tiling, under floors or inside walls takes longer.', example: 'Surface-mounted pipe repair is faster than chasing into masonry.' },
  { factor: 'Water damage complexity', why: 'A long-running hidden leak may need additional drying and reinstatement.', example: 'A simple drip costs less than a leak that has saturated the floor structure.' },
  { factor: 'Drain blockage severity', why: 'A surface blockage clears in minutes; a deep collapse needs excavation.', example: 'Auger clearance is cheaper than a CCTV-confirmed pipe relining job.' },
  { factor: 'Out-of-hours callout', why: 'Some plumbing companies surcharge nights, weekends and bank holidays - we do not.', example: 'Our call-out fee is identical at 3am Sunday and 11am Tuesday.' },
  { factor: 'Domestic vs commercial', why: 'Commercial premises need wider insurance, larger jetting equipment and scheduled access.', example: 'A restaurant grease-trap clearance differs from a domestic kitchen sink.' },
];

const trustReasons = [
  {
    icon: 'shield',
    title: 'Local plumbing experience',
    body: 'In-house plumbers covering 12 UK cities with knowledge of local housing stock, water hardness and common failure modes.',
  },
  {
    icon: 'bolt',
    title: 'Genuine emergency support',
    body: '24/7/365 response including bank holidays. Engineers on shift through the night - not on-call from home.',
  },
  {
    icon: 'tag',
    title: 'Clear, honest pricing',
    body: 'Fixed quotes confirmed before any work starts. The same rate applies day or night, weekday or weekend.',
  },
  {
    icon: 'check',
    title: 'Guaranteed workmanship',
    body: 'Manufacturer parts warranty plus a 90-day workmanship guarantee on every repair we complete.',
  },
  {
    icon: 'badge',
    title: 'Licensed and insured',
    body: 'Every engineer is Gas Safe registered for gas work, fully insured, directly employed and ID-carrying.',
  },
  {
    icon: 'star',
    title: 'Verified customer reviews',
    body: `${NATIONWIDE_RATING}/5 across ${NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ verified customer reviews from real jobs in the cities we serve.`,
  },
];

const recentSamples = [
  { date: '2026-04-26', postcode: 'SW4', issue: 'Burst lead supply pipe in basement', resolution: 'Isolated, replaced 2m lead with copper, made-good', duration: '2 hours' },
  { date: '2026-04-24', postcode: 'M14', issue: 'HMO toilet blockage past the trap', resolution: 'Wipes cleared from soil pipe with electric rods', duration: '45 minutes' },
  { date: '2026-04-22', postcode: 'B17', issue: 'Hidden leak under bathroom floor', resolution: 'Thermal imaging located, pinhole repaired, floor reinstated', duration: '3 hours' },
  { date: '2026-04-19', postcode: 'LS17', issue: 'Cold radiators on first floor', resolution: 'Powerflush completed, sludge removed, inhibitor dosed', duration: '5 hours' },
  { date: '2026-04-17', postcode: 'L18', issue: 'External drain backing up at gully', resolution: 'Jetted, root mat cleared, CCTV survey provided', duration: '90 minutes' },
];

const preventionTips = [
  'Find your internal stop tap now and label it - in a flood you will not have time to search.',
  'Lag exposed pipework in lofts, garages and external walls before the first frost of winter.',
  'Avoid flushing wipes, sanitary products, kitchen roll or fats - they cause most blocked drains we attend.',
  'Check under sinks, around toilets and at radiator valves once a month for early signs of leaks.',
  'Run a water-softening filter or descaler in hard-water areas to protect taps, showers and the boiler.',
  'Replace tap washers and silicone seals at the first sign of a drip - waiting almost always costs more.',
  'Bleed radiators at the start of the heating season and book an annual service for older boilers.',
  'For rental and commercial property, schedule a yearly plumbing inspection so small faults are caught early.',
];

const toneClass = (tone: string) =>
  tone === 'emergency'
    ? 'border-accent/30 bg-accent/5 hover:border-accent group-hover:bg-accent group-hover:text-white'
    : tone === 'maintenance'
    ? 'border-green/30 bg-green/5 hover:border-green group-hover:bg-green group-hover:text-white'
    : 'border-primary/20 bg-primary/5 hover:border-primary group-hover:bg-primary group-hover:text-white';

export default async function HomePage() {
  const featured = await getFeaturedReviews(6);
  const settings = await getSettings();

  return (
    <>
      <SchemaMarkup data={[organizationSchema(), faqSchema(homeFaq)]} />

      <Hero
        variant="home"
        title="Plumbing Services Across the UK - Emergency Repairs, Leaks, Drains & Installations"
        subtitle="Burst pipes, blocked drains, dripping taps, leaking pipes, blocked toilets and low water pressure - fixed by local Gas Safe plumbers across 12 UK cities. Transparent quotes, guaranteed workmanship, same rates day or night."
        responseTime="30 minutes"
      />

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
            <h2>What plumbing problem do you need help with?</h2>
            <p className="mt-3 text-gray-soft">
              Pick the issue closest to what you are seeing. Each route takes you to the right service, the likely cause, the diagnostic process and the cost. If your problem is urgent, call {PHONE_DISPLAY} - a real dispatcher answers 24 hours a day.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemRouter.map((p) => (
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
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CallButton phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            <Link href="/quote" className="btn-ghost">Request a fixed quote</Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMON ISSUES EXPLAINED */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>Common plumbing issues we repair across the UK</h2>
            <p className="mt-3 text-gray-soft">
              Most plumbing problems trace back to a small set of underlying causes. Recognising the symptom is the first step - the cause and the right repair are what stops it coming back.
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

          <p className="mt-6 max-w-3xl text-sm text-gray-soft">
            A blocked drain does not only slow the water flow - it can also create bad odours, overflow at the lowest fitting, and back wastewater into the property if the restriction sits deeper in the drainage system. The same logic applies to pressure loss and hidden leaks: the visible symptom is rarely the full picture.
          </p>
        </div>
      </section>

      {/* SECTION 4: CORE SERVICES */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <h2>Our plumbing services</h2>
              <p className="mt-3 text-gray-soft">
                Eight core services covered in-house by every engineer on every shift. No subcontracting and no upselling on the day - we diagnose, quote and fix.
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

          <div className="mt-12 grid gap-8 md:gap-10 lg:grid-cols-2">
            <ServiceDeepBlock
              h3="Emergency plumbing repairs"
              accent="accent"
              what="Same-day, 24-hour response for plumbing emergencies that cannot wait until morning."
              when="Burst pipes, major leaks, overflowing toilets, no water supply or any active flooding."
              checks="Stop tap function, leak source, pressure, isolation valves and water damage extent."
              fix="Isolate the supply, repair or replace failed pipework, dry the affected area and document the work for insurance."
              ctaHref="/services/24-hour-plumber"
            />
            <ServiceDeepBlock
              h3="Leak detection & pipe repair"
              accent="primary"
              what="Non-invasive surveys to find hidden leaks before any cutting begins."
              when="Damp patches on ceilings, unexplained pressure drops, mystery water bills, ceiling stains and underfloor heating losses."
              checks="Thermal imaging, acoustic detection, moisture mapping and tracer gas where required."
              fix="Mark the leak source precisely, then repair or replace the failed pipe section, joint or valve."
              ctaHref="/services/leak-detection"
            />
            <ServiceDeepBlock
              h3="Drain cleaning & unblocking"
              accent="primary"
              what="Indoor and outdoor drain unblocking with mechanical, jetting and CCTV equipment."
              when="Slow sinks, blocked showers, blocked toilets, gully overflows and recurring bad smells."
              checks="Drainage layout, inspection chamber flow, pipe material, joint integrity and root activity."
              fix="High-pressure jetting, electric drain rods, root cutting heads and CCTV survey on recurrent blockages."
              ctaHref="/services/blocked-drain"
            />
            <ServiceDeepBlock
              h3="Pipe installation & replacement"
              accent="primary"
              what="New pipework, rerouted runs and replacement of failed lead, galvanised or aged copper sections."
              when="Renovations, extensions, kitchen and bathroom rebuilds, repeated burst incidents and lead supply pipe upgrades."
              checks="Existing pipe material, layout, pressure, joint condition and access through floors and walls."
              fix="Copper, MDPE or push-fit plastic in standard domestic sizes with appropriate fittings and a pressure test on completion."
              ctaHref="/services/burst-pipe-repair"
            />
            <ServiceDeepBlock
              h3="Bathroom & kitchen plumbing"
              accent="primary"
              what="Sink, tap, toilet, shower, bath, dishwasher and washing machine plumbing."
              when="New installations, leaks, dripping taps, flush failures, slow waste runs and renovation work."
              checks="Supply and waste runs, isolation valves, traps, seals and existing access."
              fix="Replace washers, cartridges, valves, traps, taps and waste connections with appropriate isolation valves."
              ctaHref="/services/blocked-toilet"
            />
            <ServiceDeepBlock
              h3="Water pressure problems"
              accent="primary"
              what="Diagnosis and repair of weak shower flow, slow taps and inconsistent supply pressure."
              when="Pressure drops at one outlet, all outlets, after a recent repair or after work on the mains."
              checks="Stop tap and isolation valves, hidden leaks, blocked filters and aerators, PRV operation, mains pressure."
              fix="Open closed valves, repair leaks losing pressure, clear blocked sections and replace failed PRVs or booster pumps."
              ctaHref="/services/leak-detection"
            />
            <ServiceDeepBlock
              h3="Hot water & heating-related plumbing"
              accent="primary"
              what="Cylinders, immersion heaters, motorised valves, radiators, TRVs and heating circuit pipework."
              when="No hot water, lukewarm showers, leaking radiators, cold spots, system pressure faults and sludge."
              checks="System type (combi, system, regular), pressure, valve operation, radiator surface temperatures and water condition."
              fix="Replace diverter valves, motorised valves, immersion elements, thermostats and TRVs; powerflush sludged systems."
              note="Gas boiler and gas appliance work is carried out only by Gas Safe registered engineers."
              ctaHref="/services/no-hot-water"
            />
            <ServiceDeepBlock
              h3="General plumbing maintenance"
              accent="green"
              what="Routine inspections, preventive replacements and seasonal checks for homeowners, landlords and businesses."
              when="Annual landlord checks, pre-winter inspections, post-renovation snagging and HMO maintenance."
              checks="Stop tap, isolation valves, visible pipework, traps, taps, toilet flushes, pressure and external drainage."
              fix="Replace worn washers and seals, lag exposed pipework, descale aerators and dose system inhibitor."
              ctaHref="/services"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: DIAGNOSTIC PROCESS */}
      <section id="how-it-works" className="section bg-off-white">
        <div className="container-content">
          <div className="max-w-2xl">
            <h2>How our plumbing repair process works</h2>
            <p className="mt-3 text-gray-soft">
              Eight clear steps from your first phone call to the written guarantee. No appointments to wait for, no upselling on the day, no surprise charges.
            </p>
          </div>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.n} className="rounded-xl border border-gray-line bg-white p-6">
                <div className="text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CallButton phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
            <Link href="/quote" className="btn-ghost">Get a fixed quote</Link>
          </div>
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
              Burst pipe, serious leak, overflowing toilet, drain backing up indoors, no water supply or active flooding - call us now. Turn your internal stop tap clockwise where safe and a Gas Safe engineer will be on the way in minutes.
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

      {/* SECTION 7: PRICING / COST TRANSPARENCY */}
      <section className="section">
        <div className="container-content">
          <div className="max-w-3xl">
            <h2>Plumbing repair costs & clear quotes</h2>
            <p className="mt-3 text-gray-soft">
              Plumbing repair cost depends on the type of problem, the parts required, access to the pipework, urgency, time of day and overall complexity. A simple tap repair is not the same job as burst pipe repair or hidden leak detection. After diagnosis, the engineer explains the issue and confirms a fixed quote before any work begins - and the call-out fee covers the first hour on site.
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
          <div className="max-w-3xl">
            <h2>Why choose {BRAND} for plumbing services in the UK?</h2>
            <p className="mt-3 text-gray-soft">
              We are a directly employed team of plumbers, drainage specialists and Gas Safe engineers covering 12 UK cities. No subcontracting, no agency chains, no surcharges and no surprises.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustReasons.map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-line bg-white p-6">
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

      {/* SECTION 9: RECENT JOBS */}
      <section className="section">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <h2>Recent plumbing jobs across the UK</h2>
              <p className="mt-3 text-gray-soft">
                A snapshot of work completed across our 12 city coverage zones in the last fortnight. Real symptoms, real diagnoses, real repairs.
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

      {/* SECTION 10: LOCAL SERVICE AREAS */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="max-w-2xl">
              <h2>Plumbing services across our UK cities and nearby areas</h2>
              <p className="mt-3 text-gray-soft">
                We provide plumbing repairs, leak detection, drain unblocking, emergency plumbing and bathroom and kitchen plumbing across the cities below and their surrounding postcodes. Not sure if we cover your area? Call - we will tell you straight.
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

      {/* SECTION 11: PREVENTION / MAINTENANCE */}
      <section className="section">
        <div className="container-content grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <h2>How to prevent common plumbing problems</h2>
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
        <div className="container-content max-w-3xl">
          <h2>Plumbing services FAQs</h2>
          <p className="mt-3 text-gray-soft">If your question is not here, call us - we are happy to answer.</p>
          <div className="mt-8">
            <FaqAccordion items={homeFaq} />
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section className="section">
        <div className="container-content">
          <div className="rounded-2xl border border-gray-line bg-white p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <h2>Need a local plumber in the UK?</h2>
              <p className="mt-3 text-gray-soft">
                Whether you need urgent help with a burst pipe, a blocked drain, a leaking tap, a hidden leak or a planned plumbing installation, {BRAND} can help. Call now or request a quote from a local plumber in your city.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <CallButton size="lg" phoneTel={settings.phoneTel} phoneDisplay={settings.phoneDisplay} />
                <Link href="/quote" className="btn-ghost">Request a quote</Link>
              </div>
            </div>
            <ul className="md:col-span-5 grid grid-cols-2 gap-3 text-sm">
              {[
                { t: 'Local plumbers', i: 'pin' },
                { t: '24/7 callouts', i: 'bolt' },
                { t: 'Clear quotes', i: 'tag' },
                { t: 'Guaranteed work', i: 'check' },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3 rounded-xl border border-gray-line bg-off-white p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <UtilityIcon name={b.i} />
                  </span>
                  <span className="font-semibold text-ink">{b.t}</span>
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

function ServiceDeepBlock({
  h3,
  accent,
  what,
  when,
  checks,
  fix,
  note,
  ctaHref,
}: {
  h3: string;
  accent: 'primary' | 'accent' | 'green';
  what: string;
  when: string;
  checks: string;
  fix: string;
  note?: string;
  ctaHref: string;
}) {
  const accentClass =
    accent === 'accent'
      ? 'border-l-accent'
      : accent === 'green'
      ? 'border-l-green'
      : 'border-l-primary';
  const linkClass =
    accent === 'accent' ? 'text-accent' : accent === 'green' ? 'text-green-dark' : 'text-primary';
  return (
    <article className={`rounded-xl border border-gray-line border-l-4 ${accentClass} bg-white p-6 md:p-8`}>
      <h3 className="text-h3-m md:text-h3-d">{h3}</h3>
      <p className="mt-3 text-gray-soft">{what}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex gap-3">
          <dt className="w-32 shrink-0 font-semibold text-ink">When you need it</dt>
          <dd className="text-gray-soft">{when}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-32 shrink-0 font-semibold text-ink">What we check</dt>
          <dd className="text-gray-soft">{checks}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-32 shrink-0 font-semibold text-ink">How we fix it</dt>
          <dd className="text-gray-soft">{fix}</dd>
        </div>
      </dl>
      {note && (
        <p className="mt-4 rounded-lg bg-off-white p-3 text-xs text-gray-soft">
          <span className="font-semibold text-ink">Note: </span>{note}
        </p>
      )}
      <Link href={ctaHref} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${linkClass}`}>
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

function UtilityIcon({ name }: { name: string }) {
  const c = { className: 'h-5 w-5', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'pin':
      return (<svg {...c} aria-hidden><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>);
    case 'bolt':
      return (<svg {...c} aria-hidden><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>);
    case 'tag':
      return (<svg {...c} aria-hidden><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="8" cy="8" r="1.5" fill="currentColor" /></svg>);
    case 'check':
      return (<svg {...c} aria-hidden><path d="M5 12l5 5L20 7" /></svg>);
    case 'shield':
      return (<svg {...c} aria-hidden><path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" /></svg>);
    case 'badge':
      return (<svg {...c} aria-hidden><circle cx="12" cy="10" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></svg>);
    case 'star':
      return (<svg {...c} aria-hidden><path d="M12 3l2.9 6.5L22 11l-5.5 4.5L18 22l-6-3.5L6 22l1.5-6.5L2 11l7.1-1.5L12 3z" /></svg>);
    case 'leak':
      return (<svg {...c} aria-hidden><path d="M12 3v6" /><path d="M8 9h8l-2 6a2 2 0 11-4 0L8 9z" /><circle cx="12" cy="20" r="1.5" fill="currentColor" /></svg>);
    case 'tap':
      return (<svg {...c} aria-hidden><path d="M6 6h6v4M12 8h6M18 6v6h-6" /><path d="M9 10v4M9 14h0M9 18h0" /></svg>);
    case 'gauge':
      return (<svg {...c} aria-hidden><path d="M3 14a9 9 0 0118 0" /><path d="M12 14l4-4" /><circle cx="12" cy="14" r="1.5" fill="currentColor" /></svg>);
    case 'bath':
      return (<svg {...c} aria-hidden><path d="M3 12h18v3a3 3 0 01-3 3H6a3 3 0 01-3-3v-3z" /><path d="M7 12V6a2 2 0 014 0" /><path d="M5 21l1-3M19 21l-1-3" /></svg>);
    case 'kitchen':
      return (<svg {...c} aria-hidden><path d="M5 4h6l1 4H4l1-4z" /><path d="M8 8v3" /><path d="M4 11h8v9H4z" /><path d="M16 4v16" /><path d="M14 8h4" /></svg>);
    case 'plug':
      return (<svg {...c} aria-hidden><path d="M9 4v6M15 4v6" /><path d="M6 10h12v3a6 6 0 01-12 0v-3z" /><path d="M12 19v3" /></svg>);
    case 'alert':
      return (<svg {...c} aria-hidden><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="0.8" fill="currentColor" /></svg>);
    case 'droplet':
    case 'shower':
    case 'pipe':
    case 'toilet':
    case 'radiator':
      return <ServiceIcon name={name} className="h-5 w-5" />;
    default:
      return (<svg {...c} aria-hidden><circle cx="12" cy="12" r="9" /></svg>);
  }
}
