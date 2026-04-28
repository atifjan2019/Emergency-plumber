import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FaqAccordion from '@/components/FaqAccordion';
import ReviewCard from '@/components/ReviewCard';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import QuoteForm from '@/components/QuoteForm';
import CallButton from '@/components/CallButton';
import { getCityBySlug, getCitySlugs, cities, type City } from '@/data/cities';
import { getReviewsByCity } from '@/lib/reviews';
import { faqSchema, breadcrumbSchema } from '@/lib/schema';
import { getSettings, type SiteSettings } from '@/lib/settings';
import { SITE_URL, PHONE_TEL, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  const s = await getSettings();
  if (!city) return {};
  const title = `Plumbing Services ${city.name} | Leaks, Drains, Emergency Repairs | ${s.brand}`;
  const description = `Local plumbing services in ${city.name}. Emergency repairs, burst pipes, blocked drains, leak detection, tap replacement, bathroom plumbing. Clear quotes. Guaranteed workmanship. Call now.`;
  return {
    title,
    description,
    alternates: { canonical: `/plumbing-services/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/plumbing-services/${city.slug}`,
      type: 'website',
    },
  };
}

// ─── FAQ builder ──────────────────────────────────────────────────────────────

function buildFaq(city: City, s: SiteSettings) {
  return [
    {
      question: `What plumbing services do you offer in ${city.name}?`,
      answer: `${s.brand} offers a full range of plumbing services in ${city.name}, including emergency pipe repairs, burst pipe repair, leak detection, drain unblocking, blocked toilet repair, tap replacement, low water pressure diagnosis, bathroom and kitchen plumbing, hot water cylinder repairs, radiator valve services, and routine plumbing maintenance. We cover domestic and commercial properties across ${city.name} and the surrounding postcodes.`,
    },
    {
      question: `When should I call an emergency plumber in ${city.name}?`,
      answer: `Call an emergency plumber immediately if you have a burst pipe, a serious water leak causing property damage, an overflowing toilet that is not clearing, a complete loss of water supply, or water entering your property that cannot be stopped by turning off the stop tap. Turn off the main stop tap first if it is safe to reach, then call us straight away.`,
    },
    {
      question: `Do you offer same-day plumbing repairs in ${city.name}?`,
      answer: `We attend urgent plumbing callouts in ${city.name} and the surrounding areas. For genuine emergencies we aim to respond as quickly as possible. For non-urgent repairs we offer prompt booked appointments. Contact us directly to confirm availability for your specific situation.`,
    },
    {
      question: 'How much does a plumber cost?',
      answer: `Plumbing costs depend on the type of problem, parts required, access difficulty, and how urgent the job is. A straightforward tap repair is significantly less than a hidden leak detection or a burst pipe repair. We assess the job and provide a clear quote before any work begins so you know the cost in advance. Our call-out fee in ${city.name} starts from ${city.callOutFee}.`,
    },
    {
      question: 'What affects emergency plumber cost?',
      answer: `Emergency plumbing typically costs more than a pre-booked appointment because it requires immediate attendance, out-of-hours labour, and parts carried in stock. The complexity of the problem, access to the pipework, extent of water damage, and whether the job is inside or outside normal hours will all affect the total cost.`,
    },
    {
      question: 'Can you repair burst pipes?',
      answer: `Yes. Burst pipe repair is one of the most common emergency callouts we attend in ${city.name}. We isolate the water supply, assess the damaged section, replace the pipe or fitting, test the repair under pressure, and restore the water supply. Where pipes are concealed we work to access the damaged section with minimal disruption to the surrounding area.`,
    },
    {
      question: 'Can you unblock drains and toilets?',
      answer: `Yes. We clear blocked sinks, shower drains, bath drains, toilets, and external gully drains across ${city.name}. For accessible blockages we use rods, plungers, or mechanical clearance tools. For recurring or suspected deep blockages we can arrange a CCTV drain inspection to identify the cause inside the pipework before recommending the correct solution.`,
    },
    {
      question: 'Can you detect hidden leaks?',
      answer: `Yes. We use moisture meters, acoustic listening equipment, and thermal imaging where appropriate to locate leaks that are not visually accessible — inside walls, under floors, or above ceilings. Finding the exact location reduces the amount of disruption needed to access and repair the pipe.`,
    },
    {
      question: 'What should I do before the plumber arrives?',
      answer: `If there is an active leak, turn off the stop tap (usually under the kitchen sink or near the water meter) to stop the flow. If water is near electrics, isolate the circuit if safe to do so. If a drain is overflowing, do not use connected fixtures. Take note of when you first noticed the problem and any unusual sounds, smells, or pressure changes — this helps speed up the diagnosis.`,
    },
    {
      question: 'Do you provide fixed quotes?',
      answer: `We provide a clear quote before beginning any repair. For straightforward jobs we can often give a firm price. For more complex work where the full extent is unknown until inspection, we explain what we have found and the likely cost before proceeding — no work starts without your agreement.`,
    },
    {
      question: 'Are your plumbers licensed and insured?',
      answer: `Yes. All plumbing work is carried out by experienced plumbers who hold public liability insurance. We work in compliance with Water Regulations and notify Building Control where required for notifiable plumbing work.`,
    },
    {
      question: 'Do you guarantee the repair?',
      answer: `Yes. Our repairs are backed by a workmanship guarantee. If the same fault recurs as a result of our repair work within the guarantee period, we will return and put it right at no additional charge.`,
    },
    {
      question: `Can you help landlords and property managers in ${city.name}?`,
      answer: `Yes. We regularly work with landlords and property managers across ${city.name} to carry out routine inspections, emergency repairs, and maintenance between tenancies. We provide job reports and invoices suitable for property management records.`,
    },
    {
      question: 'Do you handle commercial plumbing?',
      answer: `Yes. We carry out plumbing repairs and maintenance for commercial premises including offices, retail units, and mixed-use properties across ${city.name}. Commercial plumbing requirements, including compliance with Water Regulations, are addressed in all work we carry out.`,
    },
    {
      question: 'Can you repair hot water or radiator plumbing issues?',
      answer: `Yes, for the plumbing elements. We repair and replace radiator valves, hot water cylinder valves and connections, immersion heaters, and related plumbing components. Any work involving gas appliances — including gas boilers — must be carried out by a Gas Safe registered engineer.`,
    },
    {
      question: 'What causes low water pressure?',
      answer: `Low water pressure can be caused by a leaking pipe reducing system pressure, a partially closed isolation or service valve, scale buildup restricting flow inside the pipe, a faulty pressure regulator, or a low-pressure supply from the mains. We diagnose the cause before recommending a repair — pressure problems rarely require expensive equipment when the actual cause is a simple valve issue.`,
    },
    {
      question: 'Why does my drain keep blocking?',
      answer: `Recurring drain blockages usually indicate either a behavioural cause — fat, wipes, or hair consistently entering the drain — or a structural drainage problem such as a partial collapse, root intrusion, or a joint defect catching waste. A CCTV drain inspection lets us see inside the pipe and confirm the cause, so the correct solution can be applied rather than clearing the same blockage repeatedly.`,
    },
    {
      question: 'How can I prevent plumbing emergencies?',
      answer: `Know where your stop tap is and make sure it operates freely. Have leaking taps and weeping joints repaired promptly before they fail. Insulate pipes in cold areas before winter. Avoid putting grease, wipes, or food waste into drains. Book an annual plumbing inspection to check valves, pipework, and drainage before problems escalate into emergency repairs.`,
    },
  ];
}

// ─── Schema builder ───────────────────────────────────────────────────────────

function plumbingServicesSchema(city: City, s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber'],
    name: `${s.brand} Plumbing Services ${city.name}`,
    url: `${SITE_URL}/plumbing-services/${city.slug}`,
    telephone: PHONE_TEL,
    priceRange: '££',
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: { '@type': 'City', name: city.name },
    geo: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.region, addressCountry: 'GB' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: NATIONWIDE_RATING,
      reviewCount: Math.floor(NATIONWIDE_REVIEW_COUNT / 12),
      bestRating: 5,
    },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-ink">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      {label}
    </div>
  );
}

function ProblemCard({
  icon,
  label,
  desc,
  urgency,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  urgency: 'emergency' | 'standard' | 'maintenance';
  href?: string;
}) {
  const borderColour =
    urgency === 'emergency'
      ? 'border-l-accent'
      : urgency === 'maintenance'
      ? 'border-l-green'
      : 'border-l-primary';
  const iconBg =
    urgency === 'emergency'
      ? 'bg-accent/10 text-accent'
      : urgency === 'maintenance'
      ? 'bg-green/10 text-green'
      : 'bg-primary/10 text-primary';

  return (
    <div className={`flex flex-col rounded-xl border border-gray-line border-l-4 ${borderColour} bg-white p-5 shadow-sm transition hover:shadow-md`}>
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-ink">{label}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-soft">{desc}</p>
      <Link
        href={href || '#quote'}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        Get help with this
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <path strokeLinecap="round" d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}

function IssueRow({
  symptom,
  cause,
  risk,
  service,
  alt,
}: {
  symptom: string;
  cause: string;
  risk: string;
  service: string;
  alt?: boolean;
}) {
  return (
    <div className={`grid gap-3 rounded-xl border border-gray-line p-5 md:grid-cols-4 ${alt ? 'bg-off-white' : 'bg-white'}`}>
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Symptom</div>
        <div className="font-semibold text-ink">{symptom}</div>
      </div>
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Likely Cause</div>
        <div className="text-sm text-ink">{cause}</div>
      </div>
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Risk If Ignored</div>
        <div className="flex items-start gap-1.5 text-sm text-ink">
          <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden>
            <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
          </svg>
          {risk}
        </div>
      </div>
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Recommended Service</div>
        <div className="flex items-start gap-1.5 text-sm text-ink">
          <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          {service}
        </div>
      </div>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  desc,
}: {
  number: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
          {number}
        </div>
        {number < 8 && <div className="mt-1 w-0.5 flex-1 bg-gray-line" />}
      </div>
      <div className="pb-8">
        <div className="font-semibold text-ink">{title}</div>
        <p className="mt-1 text-sm leading-relaxed text-gray-soft">{desc}</p>
      </div>
    </div>
  );
}

function TrustCard({ icon, heading, body }: { icon: React.ReactNode; heading: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-6">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-ink">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-soft">{body}</p>
    </div>
  );
}

function ServiceBlock({
  heading,
  children,
  alt,
}: {
  heading: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <div className={alt ? 'bg-off-white' : 'bg-white'}>
      <div className="container-content py-10">
        <h3 className="text-h3-m md:text-h3-d font-semibold text-ink">{heading}</h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-soft">{children}</div>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconPipe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M4 6h16M4 6a2 2 0 000 4h16a2 2 0 000-4M4 10v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
  </svg>
);
const IconDrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M9 12h6M12 9v6" />
  </svg>
);
const IconToilet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M7 3h10v4H7zM5 7h14l-2 11H7L5 7z" />
  </svg>
);
const IconLeak = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M12 2c-4 4-6 7-6 10a6 6 0 0012 0c0-3-2-6-6-10z" />
    <path strokeLinecap="round" d="M8 15s1 2 4 2 4-2 4-2" />
  </svg>
);
const IconTap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M5 12h6M11 8v8M17 9l-6 3M17 9a3 3 0 000 6" />
  </svg>
);
const IconPressure = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 7v5l3 3" />
  </svg>
);
const IconHotWater = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M12 2v4M8.5 5.5l2 2M15.5 5.5l-2 2M6 14a6 6 0 1012 0c0-4-6-8-6-8s-6 4-6 8z" />
  </svg>
);
const IconBath = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM7 12V6a2 2 0 114 0v6" />
  </svg>
);
const IconSink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <rect x="3" y="8" width="18" height="10" rx="2" />
    <path strokeLinecap="round" d="M12 18v3M8 5h8M10 5V8M14 5V8" />
  </svg>
);
const IconAppliance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path strokeLinecap="round" d="M4 9h16M9 4v5" />
  </svg>
);
const IconRadiator = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <rect x="2" y="7" width="20" height="10" rx="2" />
    <path strokeLinecap="round" d="M7 7v10M12 7v10M17 7v10" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M12 3l7 4v5c0 5-7 9-7 9S5 17 5 12V7l7-4z" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 7v5l3 3" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
  </svg>
);
const IconPrice = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 7v1m0 8v1M9.5 9.5a2.5 2.5 0 015 0c0 2.5-5 2.5-5 5a2.5 2.5 0 005 0" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" d="M12 21s-7-7.16-7-12a7 7 0 1114 0c0 4.84-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PlumbingServicesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const [cityReviews, s] = await Promise.all([
    getReviewsByCity(city.slug, 6),
    getSettings(),
  ]);

  const faq = buildFaq(city, s);
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 8);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Plumbing Services', href: '/plumbing-services' },
    { label: `Plumbing Services in ${city.name}` },
  ];

  return (
    <>
      <SchemaMarkup
        data={[
          plumbingServicesSchema(city, s),
          faqSchema(faq),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* ── Breadcrumb ── */}
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-primary text-white">
        <div className="container-content py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_380px]">
            {/* Left: copy */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90">
                <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
                Local plumbers available in {city.name}
              </div>
              <h1 className="text-white">
                Plumbing Services in {city.name}
                <span className="block text-white/80 text-h2-m md:text-h2-d font-normal mt-1">
                  Emergency Repairs, Leaks, Drains &amp; Installations
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/90">
                Burst pipe? Blocked drain? Leaking tap? {s.brand} provides local plumbing repairs and emergency callouts across {city.name}. Clear quotes before any work starts. Guaranteed workmanship.
              </p>
              <p className="mt-3 max-w-xl text-sm text-white/75">
                Whether you have a dripping tap, a blocked toilet, low water pressure, or a leaking pipe causing property damage, our local plumbers diagnose the problem, explain the cause, and repair it correctly — for domestic and commercial properties across {city.name}.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CallButton size="lg" variant="white" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} label={`Call Now: ${s.phoneDisplay}`} />
                <Link
                  href="#quote"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Request a Fixed Quote
                </Link>
              </div>
              {/* Trust strip */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: <IconPin />, label: `Local plumbers in ${city.name}` },
                  { icon: <IconAlert />, label: 'Emergency callouts available' },
                  { icon: <IconPrice />, label: 'Clear quotes before work starts' },
                  { icon: <IconShield />, label: 'Guaranteed workmanship' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg bg-white/10 p-3 text-sm font-medium text-white/90">
                    <span className="shrink-0 text-white/70">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: quote form */}
            <div id="quote" className="rounded-xl border border-white/20 bg-white p-6 shadow-xl">
              <div className="mb-4">
                <div className="text-base font-semibold text-ink">Get a Free Quote in {city.name}</div>
                <p className="mt-1 text-sm text-gray-soft">Tell us the issue — we reply within 1 hour. For emergencies, call directly.</p>
              </div>
              <QuoteForm
                sourcePage={`/plumbing-services/${city.slug}`}
                citySlug={city.slug}
                cityName={city.name}
                submitLabel="Get a free quote"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — PROBLEM SELECTOR
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <div className="text-center">
            <h2>What Plumbing Problem Do You Need Help With?</h2>
            <p className="mt-3 text-gray-soft">
              Select your issue below — or call us now if it is urgent.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProblemCard
              icon={<IconPipe />}
              label="Burst Pipe Repair"
              desc="Water escaping from a split or fractured pipe — turn off the stop tap and call immediately."
              urgency="emergency"
              href={`/emergency-plumber/${city.slug}`}
            />
            <ProblemCard
              icon={<IconDrain />}
              label="Blocked Drain Unblocking"
              desc="Slow drainage, bad smells, or water pooling in sinks, showers, or outside gullies."
              urgency="emergency"
            />
            <ProblemCard
              icon={<IconToilet />}
              label="Blocked Toilet Repair"
              desc="Toilet not flushing, overflowing, or backing up despite multiple attempts to clear it."
              urgency="emergency"
            />
            <ProblemCard
              icon={<IconLeak />}
              label="Leaking Pipe Repair"
              desc="Visible or suspected pipe leak under floors, behind walls, or under the kitchen sink."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconTap />}
              label="Dripping Tap Repair"
              desc="A tap that will not fully close — wasting water and increasing your bills month by month."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconPressure />}
              label="Low Water Pressure Diagnosis"
              desc="Weak flow from taps or showers, or pressure that has dropped noticeably across the property."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconHotWater />}
              label="No Hot Water / Hot Water Issue"
              desc="Hot water cylinder, immersion heater, or heating-related plumbing fault affecting hot supply."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconBath />}
              label="Bathroom Plumbing"
              desc="Sink, toilet, bath, or shower installation, repair, or replacement — new or existing properties."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconSink />}
              label="Kitchen Plumbing"
              desc="Sink, tap, dishwasher, or waste pipe repair, replacement, or new connection."
              urgency="standard"
            />
            <ProblemCard
              icon={<IconAppliance />}
              label="Appliance Plumbing Connections"
              desc="Washing machine, dishwasher, or appliance water supply and waste connection or reconnection."
              urgency="maintenance"
            />
            <ProblemCard
              icon={<IconRadiator />}
              label="Radiator Leak or Cold Spots"
              desc="Leaking radiator valve, air trapped in the system, or sludge affecting heat distribution."
              urgency="maintenance"
            />
            <ProblemCard
              icon={<IconAlert />}
              label="Emergency Plumbing Callout"
              desc="Flooding, major leak, or urgent plumbing failure requiring immediate local attendance."
              urgency="emergency"
              href={`/emergency-plumber/${city.slug}`}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — COMMON ISSUES EXPLAINED
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Common Plumbing Issues We Repair in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Most plumbing problems do not start without a cause. A dripping tap indicates a worn internal component. A blocked drain signals a restriction building inside the pipework. Understanding the cause helps diagnose the correct repair and prevents the same problem from returning.
          </p>
          <div className="mt-8 space-y-3">
            <IssueRow
              symptom="Dripping Tap"
              cause="Worn washer, damaged cartridge, corroded valve seat, loose packing nut, or worn O-ring"
              risk="Continuous water loss, higher bills, staining, and eventual fixture damage"
              service="Tap service — washer, cartridge, or valve replacement; full tap replacement if body is corroded"
            />
            <IssueRow
              symptom="Burst Pipe"
              cause="Freezing and expansion in cold weather, internal corrosion, high water pressure, physical impact, or aged pipework joints"
              risk="Rapid flooding, ceiling and floor damage, damp, mould growth, and structural property damage"
              service="Emergency pipe repair — isolate water supply, replace damaged section, test and restore supply"
              alt
            />
            <IssueRow
              symptom="Blocked Drain"
              cause="Accumulated grease, food waste, hair, soap residue, limescale buildup, foreign objects, or root intrusion in external drainage"
              risk="Slow drainage leading to overflow, foul odours from trapped waste, wastewater backup, and hygiene hazard"
              service="Drain unblocking using rods, jetting, or mechanical clearance; CCTV inspection for recurring blockages"
            />
            <IssueRow
              symptom="Blocked Toilet"
              cause="Excessive paper, wet wipes, sanitary products, or foreign objects causing a solid waste restriction; deep sewer-line blockage"
              risk="Overflow onto bathroom floor, hygiene risk, water damage, and backing up from connected drainage"
              service="Toilet drain clearance; replacement of flush mechanism or internal components if faulty"
              alt
            />
            <IssueRow
              symptom="Hidden Leak"
              cause="Failed pipe joint, pin-hole corrosion, seal failure on a fitting, deteriorated flexi hose, or slow pressure damage inside walls or floors"
              risk="Damp patches, rising mould, rotting timber, damaged plaster, and significant hidden structural damage"
              service="Leak detection using moisture measurement, acoustic equipment, or thermal imaging; targeted pipe repair"
            />
            <IssueRow
              symptom="Low Water Pressure"
              cause="Leaking pipe reducing system pressure, partially closed service valve, blocked or scaled pipework, or mains supply restriction"
              risk="Poor shower and tap performance, slow-filling appliances, heating inefficiency if system is pressure-dependent"
              service="Pressure diagnosis — checking valves, testing at multiple points, identifying leaks, recommending repair"
              alt
            />
            <IssueRow
              symptom="Cold Radiator Spots"
              cause="Trapped air at the top of a radiator, sludge and magnetite deposits at the bottom, faulty thermostatic valve, or circulation restriction"
              risk="Uneven heating across the property, increased energy consumption, and progressive system damage"
              service="Radiator bleeding for air; powerflush or inhibitor treatment for sludge; valve replacement if faulty"
            />
            <IssueRow
              symptom="Limescale &amp; Hard Water"
              cause={`Dissolved calcium and magnesium minerals depositing inside pipework, taps, shower heads, and appliances — ${city.waterHardness} water area`}
              risk="Restricted flow through scaled pipes and fixtures, reduced appliance efficiency, premature tap and valve failure"
              service="Scale removal from fixtures; water filter or softener installation; limescale inhibitor fitting"
              alt
            />
          </div>
          <p className="mt-6 text-sm text-gray-soft italic">
            Each of these problems follows a chain: a component fails or a restriction develops, a symptom appears, and the risk to the property increases the longer the repair is delayed. Identifying the cause — not just the symptom — is what drives a lasting repair.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — CORE SERVICES
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Our Plumbing Services in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            {s.brand} handles a full range of residential and commercial plumbing repairs, installations, and maintenance across {city.name}.
          </p>
        </div>
      </section>

      <div className="divide-y divide-gray-line border-y border-gray-line">
        {/* Emergency */}
        <ServiceBlock heading="Emergency Plumbing Repairs" alt={false}>
          <p>
            A plumbing emergency requires fast attendance and a calm, systematic response. Burst pipes, major leaks, toilet overflows, and sudden loss of water supply all carry a risk of property damage that worsens with every minute.
          </p>
          <p>
            Our local plumbers respond to urgent callouts across {city.name} for burst or fractured pipes, major leaks requiring immediate isolation, overflowing toilets, loss of cold or hot water supply, and flooding situations where water cannot be safely stopped at the stop tap.
          </p>
          <p>
            <strong>What to do before we arrive:</strong> If you can safely reach it, turn off the main stop tap — usually under the kitchen sink or near the water meter — to stop the flow and limit damage while we travel to you.
          </p>
          <div className="pt-2">
            <Link href={`/emergency-plumber/${city.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              View our emergency plumber page for {city.name} →
            </Link>
          </div>
        </ServiceBlock>

        {/* Leak Detection */}
        <ServiceBlock heading="Leak Detection &amp; Pipe Repair" alt>
          <p>
            A leak is not always visible. Water can travel along joists, seep into insulation, and emerge metres from the actual source. By the time a damp patch appears on a ceiling or wall, the leak may already have caused hidden structural damage.
          </p>
          <p>
            We locate leaks using visual inspection of pipework, joints, and fittings; moisture meter readings on walls, floors, and ceilings; acoustic detection to hear water movement inside concealed pipework; and thermal imaging where surface temperature differentials help locate water paths.
          </p>
          <p>
            Once located, we repair by replacing the damaged pipe section, resealing a failed joint, replacing a faulty flexi hose or isolation valve, or rerouting pipework that cannot be accessed without disproportionate disruption.
          </p>
        </ServiceBlock>

        {/* Drain Cleaning */}
        <ServiceBlock heading="Drain Cleaning &amp; Unblocking" alt={false}>
          <p>
            A blocked drain does not only slow the water flow — it can create foul odours, cause wastewater to back up into the property, and, if the blockage is in external drainage, create overflow at ground level.
          </p>
          <p>
            We clear blockages in kitchen sinks (grease and food waste), bathroom sinks and showers (hair and soap), toilets (waste, wipes, and foreign objects), and external gully drains (leaves, silt, and root intrusion). For recurring blockages or suspected drainage damage, we recommend a CCTV drain inspection to view the pipework from inside and identify cracks, root penetration, or collapsed sections.
          </p>
        </ServiceBlock>

        {/* Pipe Installation */}
        <ServiceBlock heading="Pipe Installation &amp; Replacement" alt>
          <p>
            Plumbing systems deteriorate over time. Old lead pipework, corroded copper joints, damaged waste pipes, and undersized supply pipes all reduce system reliability and water quality. We replace damaged or corroded water supply pipes, old waste pipes and traps, isolated pipe sections where joints have failed, and full pipe runs during renovation or extension work.
          </p>
          <p>
            We work with copper, plastic push-fit, and MDPE blue water supply pipe, selecting the appropriate material for the application, access, and pressure requirements.
          </p>
        </ServiceBlock>

        {/* Bathroom & Kitchen */}
        <ServiceBlock heading="Bathroom &amp; Kitchen Plumbing" alt={false}>
          <p>
            <strong>Bathroom:</strong> basin installation and connection, toilet installation and cistern repair, bath installation and waste connection, shower tray and pump plumbing, isolation valve fitting, and bathroom renovation plumbing support.
          </p>
          <p>
            <strong>Kitchen:</strong> sink installation and waste connection, tap replacement and service, dishwasher water supply and waste connection, washing machine connections, and under-sink pipework and trap maintenance.
          </p>
          <p>
            Each installation is tested for flow, drainage, and seal integrity before we leave the property.
          </p>
        </ServiceBlock>

        {/* Water Pressure */}
        <ServiceBlock heading="Water Pressure Problems" alt>
          <p>
            Low water pressure affects shower performance, tap flow, and appliance function. Pressure problems are rarely random — they have a cause that can be traced and corrected.
          </p>
          <p>
            We diagnose low water pressure by checking all relevant service and isolation valves, testing pressure at multiple outlets to identify where the drop occurs, inspecting pipework for partial blockage or scale restriction, checking for slow leaks that reduce system pressure, and assessing the mains supply pressure at the incoming supply point. Where low pressure is confirmed as a building supply issue, we can advise on and install pressure booster pumps where appropriate.
          </p>
        </ServiceBlock>

        {/* Hot Water */}
        <ServiceBlock heading="Hot Water &amp; Heating-Related Plumbing" alt={false}>
          <p>
            Many heating and hot water faults have a plumbing component that does not require a gas engineer. We handle hot water cylinders (replacing faulty valves and connections), radiator repairs (leaking valves, TRV replacement, balancing valves), system powerflush to clear sludge and restore circulation efficiency, inhibitor dosing to protect the system from corrosion and scale, and pipe connections to heat exchangers, cylinders, and underfloor heating manifolds.
          </p>
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            <strong>Important:</strong> Any work involving a gas appliance — boiler repair, gas pipe, or gas valve — must be completed by a Gas Safe registered engineer. We will advise clearly which part of the repair falls under plumbing and which requires a registered gas engineer.
          </p>
        </ServiceBlock>

        {/* Maintenance */}
        <ServiceBlock heading="General Plumbing Maintenance" alt>
          <p>
            Routine plumbing maintenance reduces the risk of emergency repairs. For homeowners, landlords, and property managers in {city.name}, a periodic inspection of valves, pipework, fixtures, and drainage can identify worn components before they fail.
          </p>
          <p>
            Our maintenance visits cover tap inspection and washer/cartridge condition, toilet flush and valve function, check of visible pipework for early corrosion or joint weep, drain flow testing, isolation valve operation test (seized valves cannot shut off supply in an emergency), pipe insulation check in loft or unheated spaces, and water filter and softener servicing where fitted.
          </p>
        </ServiceBlock>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — PROCESS
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <div className="grid gap-12 md:grid-cols-[1fr_420px]">
            <div>
              <h2>How Our Plumbing Repair Process Works</h2>
              <p className="mt-3 text-gray-soft">
                Every job follows the same clear process — from your first call to the final test after repair.
              </p>
              <div className="mt-10">
                <ProcessStep number={1} title="Contact Us" desc="Call, submit a quote form, or request an emergency callout. We take your details and establish what has happened." />
                <ProcessStep number={2} title="Quick Triage" desc="We ask about the problem, its location in the property, whether water is still flowing, and whether the stop tap has been turned off." />
                <ProcessStep number={3} title="Inspection" desc="Our plumber inspects visible pipework, fixtures, affected areas, drainage, valves, and pressure where relevant." />
                <ProcessStep number={4} title="Diagnosis" desc="We explain what has failed, why it happened, what options exist for repair, and what will happen if it is not repaired." />
                <ProcessStep number={5} title="Clear Quote" desc="We provide a written or verbal quote before any work begins. No hidden costs — the price you agree is the price you pay." />
                <ProcessStep number={6} title="Repair" desc="We carry out the agreed repair — replacing, sealing, clearing, installing, or testing as required." />
                <ProcessStep number={7} title="Testing" desc="Flow, pressure, drainage, seals, and repaired joints are all tested before we consider the job complete." />
                <ProcessStep number={8} title="Guarantee &amp; Aftercare" desc="We explain what was done, provide a workmanship guarantee, and advise on preventing recurrence." />
              </div>
            </div>
            <div className="space-y-4 self-start md:sticky md:top-24">
              <div className="rounded-xl border border-gray-line bg-white p-6 shadow-sm">
                <div className="text-base font-semibold text-ink">Ready to book?</div>
                <p className="mt-1 text-sm text-gray-soft">Tell us the problem and we will get back to you within the hour.</p>
                <div className="mt-5 space-y-3">
                  <CallButton size="md" variant="primary" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} className="w-full" />
                  <Link
                    href="#quote"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
              <div className="rounded-xl border border-gray-line bg-off-white p-5">
                <div className="text-sm font-semibold text-ink">Pricing in {city.name}</div>
                <div className="mt-3 space-y-2 text-sm text-gray-soft">
                  <div className="flex justify-between">
                    <span>Call-out fee</span>
                    <span className="font-semibold text-ink">{city.callOutFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hourly rate</span>
                    <span className="font-semibold text-ink">{city.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Out-of-hours surcharge</span>
                    <span className="font-semibold text-green">None</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — EMERGENCY CALLOUT BLOCK
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-accent text-white">
        <div className="container-content py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-white">Need an Emergency Plumber in {city.name} Today?</h2>
              <p className="mt-4 max-w-xl text-base text-white/90">
                If you are dealing with a burst pipe, a serious water leak, a blocked toilet that has overflowed, a flooded room, or a complete loss of water supply — this is a plumbing emergency. Every minute the water continues to run increases the damage to your floors, ceilings, and structure.
              </p>
              <div className="mt-6 space-y-2 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 shrink-0 text-white/60"><IconCheck /></span>
                  Find your stop tap and turn it off clockwise to stop the flow
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 shrink-0 text-white/60"><IconCheck /></span>
                  Isolate nearby electrics if it is safe to do so
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 shrink-0 text-white/60"><IconCheck /></span>
                  Call us immediately — we attend {city.name} emergencies as fast as possible
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={`tel:${s.phoneTel}`}
                  className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 text-lg font-bold text-accent shadow-lg transition hover:bg-off-white active:scale-[0.98]"
                  aria-label={`Call ${s.phoneDisplay} for emergency plumbing help`}
                >
                  <IconPhone />
                  Call {s.phoneDisplay} — Emergency Help
                </a>
              </div>
            </div>
            <div className="grid self-center grid-cols-2 gap-3 text-center md:grid-cols-1">
              {[
                { icon: <IconClock />, label: 'Fast local response' },
                { icon: <IconPin />, label: `Local to ${city.name}` },
                { icon: <IconPrice />, label: 'Clear quote given' },
                { icon: <IconShield />, label: 'Repair guaranteed' },
              ].map(({ icon, label }) => (
                <div key={label} className="rounded-xl border border-white/20 bg-white/10 p-4">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-white">{icon}</div>
                  <div className="text-xs font-medium text-white/90">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — PRICING
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-10 md:grid-cols-[1fr_300px]">
            <div>
              <div className="flex items-center justify-between gap-4">
                <h2>Plumbing Repair Costs &amp; Clear Quotes</h2>
                <span className="hidden shrink-0 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green sm:inline-flex">
                  No surprise pricing
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-gray-soft">
                Plumbing repair costs depend on the type of problem, how quickly the job is needed, what parts are required, and how accessible the pipework is. We assess the job first and provide a clear quote before any work begins.
              </p>
              <div className="mt-8 overflow-x-auto rounded-xl border border-gray-line bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-line bg-off-white">
                      <th className="px-5 py-3 text-left font-semibold text-ink">Cost Factor</th>
                      <th className="px-5 py-3 text-left font-semibold text-ink">Why It Matters</th>
                      <th className="px-5 py-3 text-left font-semibold text-ink hidden md:table-cell">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-line">
                    {[
                      ['Type of problem', 'Simple fixture repair vs. emergency pipe repair involve different labour and parts', 'Dripping tap vs. burst pipe'],
                      ['Emergency vs. scheduled', 'Urgent out-of-hours attendance costs more than a booked appointment', 'Saturday night vs. weekday morning'],
                      ['Parts required', 'Valve, cartridge, or pipe section costs vary by specification', 'Standard fitting vs. specialist section'],
                      ['Access to pipework', 'Concealed pipework behind tiles or under floors requires additional time', 'Under-floor leak vs. visible sink leak'],
                      ['Hidden leak complexity', 'Locating a concealed leak adds time and specialist equipment', 'Acoustic detection vs. visual inspection'],
                      ['Blockage severity', 'Partial blockage vs. drain collapse or root intrusion', 'Drain rods vs. CCTV survey and jetting'],
                      ['Out-of-hours callout', 'Evening, weekend, or bank holiday attendance', 'Sunday repair vs. Tuesday booking'],
                      ['Commercial vs. domestic', 'Property type may affect access, compliance, and labour', 'House vs. multi-floor commercial premises'],
                    ].map(([factor, reason, example], i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-off-white/50' : ''}>
                        <td className="px-5 py-3 font-medium text-ink">{factor}</td>
                        <td className="px-5 py-3 text-gray-soft">{reason}</td>
                        <td className="px-5 py-3 text-gray-soft hidden md:table-cell">{example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-soft">
                If the job turns out to be more complex than the initial assessment, we will explain why and agree on any additional cost before continuing.
              </p>
              <div className="mt-6">
                <Link href="#quote" className="btn-primary">
                  Request a quote for your plumbing job
                </Link>
              </div>
            </div>
            {/* Pricing stat cards */}
            <div className="space-y-4 self-start">
              {[
                { label: 'Call-out fee', value: city.callOutFee, note: 'Covers attendance and first hour of labour on site.' },
                { label: 'Hourly rate', value: city.hourlyRate, note: 'Standard rate beyond the first hour, same rate 24/7.' },
                { label: 'No surcharge', value: '0%', note: 'No additional charge for nights, weekends, or bank holidays.' },
              ].map(({ label, value, note }) => (
                <div key={label} className="rounded-xl border border-gray-line bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
                  <div className="mt-1 text-3xl font-extrabold text-ink">{value}</div>
                  <p className="mt-2 text-xs text-gray-soft">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 8 — WHY CHOOSE US
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Why Choose {s.brand} for Plumbing Services in {city.name}?</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Real experience, transparent pricing, and guaranteed workmanship — not just promises.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <TrustCard
              icon={<IconPin />}
              heading="Local Plumbing Experience"
              body={`${s.brand} serves homeowners, landlords, and businesses across ${city.name}. We understand the local property types, housing stock, water hardness (${city.waterHardness}), and drainage infrastructure common to this area.`}
            />
            <TrustCard
              icon={<IconAlert />}
              heading="Emergency Attendance"
              body={`When a plumbing problem cannot wait, we attend urgent callouts across ${city.name} as quickly as possible. We carry common parts and repair materials to handle most urgent repairs on the same visit.`}
            />
            <TrustCard
              icon={<IconPrice />}
              heading="Clear Pricing — No Hidden Charges"
              body="We explain the problem, the options, and the cost before we begin. The price you agree is the price you pay. No surprises on the invoice."
            />
            <TrustCard
              icon={<IconShield />}
              heading="Guaranteed Workmanship"
              body="All repairs completed by our plumbers are backed by a workmanship guarantee. If the same fault returns due to our repair work, we come back and put it right."
            />
            <TrustCard
              icon={<IconCheck />}
              heading="Insured &amp; Compliant"
              body="Our plumbers carry public liability insurance and carry out all work in compliance with Water Regulations and Building Regulations where applicable."
            />
            <TrustCard
              icon={<IconStar />}
              heading="Verified Customer Reviews"
              body={`${s.brand} is rated ${NATIONWIDE_RATING} stars across ${NATIONWIDE_REVIEW_COUNT.toLocaleString()} verified customer reviews. Real customers, real jobs, real feedback from across the UK.`}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 9 — REVIEWS
      ══════════════════════════════════════════════════════════ */}
      {cityReviews.length > 0 && (
        <section className="section bg-off-white">
          <div className="container-content">
            <h2>What {city.name} Customers Say</h2>
            <p className="mt-3 text-gray-soft">Verified reviews from local plumbing jobs across {city.name} and surrounding areas.</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SECTION 10 — LOCAL SERVICE AREA
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Plumbing Services Across {city.name} and Nearby Areas</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            We provide plumbing repairs, leak detection, drain unblocking, emergency callouts, and bathroom and kitchen plumbing across {city.name} and the surrounding areas. Our local plumbers can attend domestic and commercial properties throughout the postcodes listed below.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="text-sm font-semibold text-ink mb-3">Postcodes we cover in {city.name}</div>
              <div className="flex flex-wrap gap-2">
                {city.postcodes.map((pc) => (
                  <span key={pc} className="pill">
                    {pc}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-soft">
                Not sure if we cover your postcode? Call us and we will confirm.
              </p>
              <div className="mt-5">
                <CallButton size="sm" variant="primary" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} label="Call to check coverage" />
              </div>
            </div>
            {/* Map placeholder */}
            <div
              className="grid h-[220px] w-full place-items-center rounded-xl border border-dashed border-gray-line bg-off-white md:w-[280px] text-gray-soft"
              data-lat={city.geo.lat}
              data-lng={city.geo.lng}
            >
              <div className="text-center px-4">
                <IconPin />
                <p className="mt-2 text-xs">{city.name} ({city.geo.lat.toFixed(3)}, {city.geo.lng.toFixed(3)})</p>
                <p className="text-xs text-gray-soft/60">Map embed — replace with Google Maps in production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 11 — PREVENTION
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2>How to Prevent Common Plumbing Problems</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Regular plumbing maintenance helps identify worn valves, leaking joints, blocked waste pipes, pressure irregularities, and early signs of pipe corrosion before they turn into emergency repairs.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { tip: 'Know where your stop tap is', desc: 'Test it annually. A seized stop tap cannot shut off the supply during a burst pipe emergency.' },
              { tip: 'Do not pour grease down the kitchen sink', desc: 'Grease solidifies inside the pipe and causes blockages that worsen over time.' },
              { tip: 'Use a hair trap in your shower', desc: 'Hair is one of the most common causes of slow shower drain blockages.' },
              { tip: 'Check under sinks monthly', desc: 'A slow drip from a waste joint or flexi hose will be invisible until it has caused damage.' },
              { tip: 'Insulate pipes in unheated spaces', desc: 'Loft pipes and pipes on exterior walls are at risk of freezing and bursting in winter.' },
              { tip: 'Check isolation valves operate freely', desc: 'If a valve is stiff or stuck it may not close in an emergency. Have it replaced.' },
              { tip: 'Do not flush wipes or sanitary products', desc: 'They do not dissolve and accumulate in the drainage system, causing recurring blockages.' },
              { tip: 'Bleed radiators annually', desc: 'Trapped air reduces radiator efficiency and contributes to corrosion inside the system over time.' },
              { tip: 'Have a leaking tap repaired promptly', desc: 'A worn washer costs little to replace; the staining and eventual tap replacement costs far more.' },
              { tip: 'Book an annual plumbing inspection', desc: `Routine inspection of valves, pipework, and drainage protects your property and reduces emergency call-out costs in ${city.name}.` },
              {
                tip: city.waterHardness === 'hard' || city.waterHardness === 'very hard'
                  ? 'Fit a water softener or scale inhibitor'
                  : 'Watch for signs of internal copper pitting',
                desc: city.waterHardness === 'hard' || city.waterHardness === 'very hard'
                  ? `${city.name} has ${city.waterHardness} water. Reducing limescale extends the life of taps, appliances, and pipework significantly.`
                  : `${city.name}'s ${city.waterHardness} water can cause slow internal pipe corrosion. Look for discoloured water or pinhole leaks in older copper installations.`,
              },
              { tip: 'Monitor water pressure', desc: 'A notable change in pressure can indicate a developing leak or valve problem worth investigating early.' },
            ].map(({ tip, desc }) => (
              <div key={tip} className="flex items-start gap-3 rounded-xl border border-gray-line bg-white p-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                  <IconCheck />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{tip}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-soft">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="#quote" className="btn-ghost">
              Book a maintenance inspection →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 12 — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content max-w-3xl">
          <h2>Plumbing Services FAQs</h2>
          <p className="mt-3 text-gray-soft">Common questions about our plumbing services in {city.name}.</p>
          <div className="mt-8">
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 13 — FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <CTASection
        heading={`Need a Local Plumber in ${city.name}?`}
        subheading={`Whether you need urgent help with a burst pipe, a blocked drain, a leaking tap, a hidden leak, or a planned plumbing installation, ${s.brand} can help. Call now or request a quote from a local plumber in ${city.name}.`}
      />

      {/* ── Other cities ── */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2 className="text-lg font-semibold text-ink">Plumbing services in other cities</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/plumbing-services/${c.slug}`}
                className="rounded-full border border-gray-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/plumbing-services" className="rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold">
              All cities →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
