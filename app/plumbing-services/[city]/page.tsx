import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import FaqAccordion from '@/components/FaqAccordion';
import ReviewCard from '@/components/ReviewCard';
import RecentJobCard from '@/components/RecentJobCard';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import QuoteForm from '@/components/QuoteForm';
import CallButton from '@/components/CallButton';
import { getCityBySlug, getCitySlugs, cities, type City } from '@/data/cities';
import { getReviewsByCity } from '@/lib/reviews';
import { getRecentJobsByCity } from '@/data/recentJobs';
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
  if (!city) return {};
  const title = `Plumbing Services ${city.name} | Local Plumber`;
  const description = `Local plumbers in ${city.name}. Burst pipes, blocked drains, leak detection, tap & bathroom plumbing. Clear quotes, guaranteed workmanship. Call now.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/emergency-plumber/${city.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/emergency-plumber/${city.slug}`,
      type: 'website',
      locale: 'en_GB',
    },
  };
}

// ─── Schema ───────────────────────────────────────────────────────────────────

function plumbingServicesSchema(city: City, s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Plumber'],
    name: `${s.brand} Plumbing Services ${city.name}`,
    url: `${SITE_URL}/plumbing-services/${city.slug}`,
    telephone: s.phoneTel,
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function buildFaq(city: City, s: SiteSettings) {
  return [
    { question: `What plumbing services do you offer in ${city.name}?`, answer: `${s.brand} offers a full range of plumbing services in ${city.name}, including emergency pipe repairs, burst pipe repair, leak detection, drain unblocking, blocked toilet repair, tap replacement, low water pressure diagnosis, bathroom and kitchen plumbing, hot water cylinder repairs, radiator valve services, and routine plumbing maintenance. We cover domestic and commercial properties across ${city.name} and the surrounding postcodes.` },
    { question: `When should I call an emergency plumber in ${city.name}?`, answer: `Call an emergency plumber immediately if you have a burst pipe, a serious water leak causing property damage, an overflowing toilet that is not clearing, a complete loss of water supply, or water entering your property that cannot be stopped by turning off the stop tap. Turn off the main stop tap first if it is safe to reach, then call us straight away.` },
    { question: `Do you offer same-day plumbing repairs in ${city.name}?`, answer: `We attend urgent plumbing callouts in ${city.name} and the surrounding areas. For genuine emergencies we aim to respond as quickly as possible. For non-urgent repairs we offer prompt booked appointments. Contact us directly to confirm availability for your specific situation.` },
    { question: 'How much does a plumber cost?', answer: `Plumbing costs depend on the type of problem, parts required, access difficulty, and how urgent the job is. A straightforward tap repair is significantly less than a hidden leak detection or a burst pipe repair. We assess the job and provide a clear quote before any work begins. Our call-out fee in ${city.name} starts from ${city.callOutFee}.` },
    { question: 'What affects emergency plumber cost?', answer: `Emergency plumbing typically costs more than a pre-booked appointment because it requires immediate attendance, out-of-hours labour, and parts carried in stock. The complexity of the problem, access to the pipework, extent of water damage, and whether the job is outside normal hours will all affect the total cost.` },
    { question: 'Can you repair burst pipes?', answer: `Yes. Burst pipe repair is one of the most common emergency callouts we attend in ${city.name}. We isolate the water supply, assess the damaged section, replace the pipe or fitting, test the repair under pressure, and restore the water supply. Where pipes are concealed we work to access the damaged section with minimal disruption.` },
    { question: 'Can you unblock drains and toilets?', answer: `Yes. We clear blocked sinks, shower drains, bath drains, toilets, and external gully drains across ${city.name}. For accessible blockages we use rods, plungers, or mechanical clearance tools. For recurring or suspected deep blockages we can arrange a CCTV drain inspection to identify the cause inside the pipework.` },
    { question: 'Can you detect hidden leaks?', answer: `Yes. We use moisture meters, acoustic listening equipment, and thermal imaging where appropriate to locate leaks inside walls, under floors, or above ceilings. Finding the exact location reduces the disruption needed to access and repair the pipe.` },
    { question: 'What should I do before the plumber arrives?', answer: `If there is an active leak, turn off the stop tap (usually under the kitchen sink or near the water meter) to stop the flow. If water is near electrics, isolate the circuit if safe to do so. If a drain is overflowing, do not use connected fixtures. Note when you first noticed the problem and any unusual sounds, smells, or pressure changes.` },
    { question: 'Do you provide fixed quotes?', answer: `We provide a clear quote before beginning any repair. For straightforward jobs we can often give a firm price. For more complex work where the full extent is unknown until inspection, we explain what we have found and the likely cost before proceeding; no work starts without your agreement.` },
    { question: 'Are your plumbers licensed and insured?', answer: `Yes. All plumbing work is carried out by experienced plumbers who hold public liability insurance. We work in compliance with Water Regulations and notify Building Control where required for notifiable plumbing work.` },
    { question: 'Do you guarantee the repair?', answer: `Yes. Our repairs are backed by a workmanship guarantee. If the same fault recurs as a result of our repair work within the guarantee period, we will return and put it right at no additional charge.` },
    { question: `Can you help landlords and property managers in ${city.name}?`, answer: `Yes. We regularly work with landlords and property managers across ${city.name} to carry out routine inspections, emergency repairs, and maintenance between tenancies. We provide job reports and invoices suitable for property management records.` },
    { question: 'Do you handle commercial plumbing?', answer: `Yes. We carry out plumbing repairs and maintenance for commercial premises including offices, retail units, and mixed-use properties across ${city.name}. Commercial plumbing requirements, including compliance with Water Regulations, are addressed in all work we carry out.` },
    { question: 'Can you repair hot water or radiator plumbing issues?', answer: `Yes, for the plumbing elements. We repair and replace radiator valves, hot water cylinder valves and connections, immersion heaters, and related plumbing components. Any work involving gas appliances, including gas boilers, must be carried out by a Gas Safe registered engineer.` },
    { question: 'What causes low water pressure?', answer: `Low water pressure can be caused by a leaking pipe reducing system pressure, a partially closed isolation or service valve, scale buildup restricting flow inside the pipe, a faulty pressure regulator, or a low-pressure supply from the mains. We diagnose the cause before recommending a repair.` },
    { question: 'Why does my drain keep blocking?', answer: `Recurring drain blockages usually indicate either a behavioural cause (fat, wipes, or hair consistently entering the drain) or a structural drainage problem such as a partial collapse, root intrusion, or a joint defect catching waste. A CCTV drain inspection lets us confirm the cause so the correct solution is applied.` },
    { question: 'How can I prevent plumbing emergencies?', answer: `Know where your stop tap is and make sure it operates freely. Have leaking taps and weeping joints repaired promptly. Insulate pipes in cold areas before winter. Avoid putting grease, wipes, or food waste into drains. Book an annual plumbing inspection to check valves, pipework, and drainage before problems escalate.` },
  ];
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconPipe     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M4 6h16M4 6a2 2 0 000 4h16a2 2 0 000-4M4 10v8a2 2 0 002 2h12a2 2 0 002-2v-8" /></svg>;
const IconDrain    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M9 12h6M12 9v6" /></svg>;
const IconToilet   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M7 3h10v4H7zM5 7h14l-2 11H7L5 7z" /></svg>;
const IconLeak     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M12 2c-4 4-6 7-6 10a6 6 0 0012 0c0-3-2-6-6-10z" /><path strokeLinecap="round" d="M8 15s1 2 4 2 4-2 4-2" /></svg>;
const IconTap      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M5 12h6M11 8v8M17 9l-6 3M17 9a3 3 0 000 6" /></svg>;
const IconGauge    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" /></svg>;
const IconFlame    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M12 2c-4 4-6 7-6 10a6 6 0 0012 0c0-3-2-6-6-10z" /></svg>;
const IconBath     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM7 12V6a2 2 0 114 0v6" /></svg>;
const IconSink     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><rect x="3" y="8" width="18" height="10" rx="2" /><path strokeLinecap="round" d="M12 18v3M8 5h8M10 5V8M14 5V8" /></svg>;
const IconPlug     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" d="M4 9h16M9 4v5" /></svg>;
const IconRadiator = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M7 7v10M12 7v10M17 7v10" /></svg>;
const IconAlert    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" /></svg>;
const IconShield   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M12 3l7 4v5c0 5-7 9-7 9S5 17 5 12V7l7-4z" /></svg>;
const IconStar     = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" /></svg>;
const IconCheck    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>;
const IconClock    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" /></svg>;
const IconPhone    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden><path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" /></svg>;
const IconPin      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><path strokeLinecap="round" d="M12 21s-7-7.16-7-12a7 7 0 1114 0c0 4.84-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>;
const IconPrice    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v1m0 8v1M9.5 9.5a2.5 2.5 0 015 0c0 2.5-5 2.5-5 5a2.5 2.5 0 005 0" /></svg>;
const IconImage    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path strokeLinecap="round" d="M21 15l-5-5L5 21" /></svg>;

// ─── Problem cards ────────────────────────────────────────────────────────────

function ProblemCard({ icon, label, desc, urgency, href }: {
  icon: React.ReactNode; label: string; desc: string;
  urgency: 'red' | 'orange' | 'blue'; href?: string;
}) {
  const accent = urgency === 'red' ? 'border-l-accent bg-accent/5 hover:border-l-accent/80'
    : urgency === 'orange' ? 'border-l-orange-400 bg-orange-50/60 hover:border-l-orange-500'
    : 'border-l-primary bg-primary/5 hover:border-l-primary/80';
  const iconBg = urgency === 'red' ? 'bg-accent/10 text-accent'
    : urgency === 'orange' ? 'bg-orange-100 text-orange-600'
    : 'bg-primary/10 text-primary';
  return (
    <div className={`flex flex-col rounded-xl border border-gray-line border-l-4 ${accent} p-5 shadow-sm transition-shadow hover:shadow-md`}>
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>{icon}</div>
      <div className="font-semibold text-ink">{label}</div>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-soft">{desc}</p>
      <Link href={href || '#quote'} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        Get help with this
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden><path strokeLinecap="round" d="M9 6l6 6-6 6" /></svg>
      </Link>
    </div>
  );
}

// ─── Issues table row ─────────────────────────────────────────────────────────

function IssueRow({ symptom, cause, risk, service, alt }: {
  symptom: string; cause: string; risk: string; service: string; alt?: boolean;
}) {
  return (
    <tr className={alt ? 'bg-off-white' : 'bg-white'}>
      <td className="px-5 py-4 font-semibold text-ink align-top whitespace-nowrap">{symptom}</td>
      <td className="px-5 py-4 text-sm text-gray-soft align-top">{cause}</td>
      <td className="px-5 py-4 align-top">
        <div className="flex items-start gap-1.5 text-sm text-ink">
          <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" /></svg>
          {risk}
        </div>
      </td>
      <td className="px-5 py-4 align-top">
        <div className="flex items-start gap-1.5 text-sm text-ink">
          <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
          {service}
        </div>
      </td>
    </tr>
  );
}

// Mobile accordion row
function IssueAccordionRow({ symptom, cause, risk, service }: {
  symptom: string; cause: string; risk: string; service: string;
}) {
  return (
    <details className="group rounded-xl border border-gray-line bg-white overflow-hidden">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-ink list-none">
        {symptom}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0 text-gray-soft transition-transform group-open:rotate-180" aria-hidden><path strokeLinecap="round" d="M6 9l6 6 6-6" /></svg>
      </summary>
      <div className="divide-y divide-gray-line border-t border-gray-line">
        <div className="px-5 py-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Likely Cause</div>
          <p className="text-sm text-gray-soft">{cause}</p>
        </div>
        <div className="px-5 py-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Risk If Ignored</div>
          <div className="flex items-start gap-1.5 text-sm text-ink">
            <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden><path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" /></svg>
            {risk}
          </div>
        </div>
        <div className="px-5 py-3">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-soft">Recommended Service</div>
          <div className="flex items-start gap-1.5 text-sm text-ink">
            <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
            {service}
          </div>
        </div>
      </div>
    </details>
  );
}

// ─── Service block (alternating) ──────────────────────────────────────────────

function ServiceBlock({ id, heading, imageAlt, imageRight, alt, children }: {
  id?: string; heading: string; imageAlt: string; imageRight?: boolean; alt?: boolean; children: React.ReactNode;
}) {
  const imgPlaceholder = (
    <div className="flex h-56 md:h-full min-h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-gray-line bg-off-white text-gray-soft/60">
      <div className="text-center">
        <IconImage />
        <p className="mt-2 text-xs px-4">{imageAlt}</p>
      </div>
    </div>
  );

  return (
    <div id={id} className={`border-b border-gray-line ${alt ? 'bg-off-white' : 'bg-white'}`}>
      <div className="container-content py-12">
        <div className={`grid items-center gap-10 md:grid-cols-2 ${imageRight ? '' : 'md:[&>:first-child]:order-2'}`}>
          <div>
            <h3 className="text-h3-m md:text-h3-d font-semibold text-ink">{heading}</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-soft">
              {children}
            </div>
          </div>
          {imgPlaceholder}
        </div>
      </div>
    </div>
  );
}

// ─── Horizontal process step ──────────────────────────────────────────────────

const processSteps = [
  { title: 'Contact Us',        desc: 'Call, request a quote, or submit an emergency form. We take your details and establish what has happened.' },
  { title: 'Quick Triage',      desc: 'We ask what happened, where the issue is, whether water is still flowing, and if the stop tap has been turned off.' },
  { title: 'Inspection',        desc: 'Our plumber inspects visible pipework, fixtures, drains, valves, pressure, and all affected areas.' },
  { title: 'Diagnosis',         desc: 'We explain the likely cause, the failed component, what options exist for repair, and the risk of delay.' },
  { title: 'Clear Quote',       desc: 'We provide a transparent quote before any work begins. The price you agree is the price you pay.' },
  { title: 'Repair',            desc: 'We carry out the agreed repair, replacing, sealing, clearing, flushing, or installing as required.' },
  { title: 'Testing',           desc: 'Flow, pressure, drainage, seals, valves, and repaired joints are all tested before the job is considered complete.' },
  { title: 'Guarantee',         desc: 'We explain what was done, provide a workmanship guarantee, and advise on preventing recurrence.' },
];

// ─── Trust card ───────────────────────────────────────────────────────────────

function TrustCard({ icon, heading, body }: { icon: React.ReactNode; heading: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-6">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="font-semibold text-ink">{heading}</div>
      <p className="mt-2 text-sm leading-relaxed text-gray-soft">{body}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PlumbingServicesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const [cityReviews, s] = await Promise.all([getReviewsByCity(city.slug, 3), getSettings()]);
  const recentJobs = getRecentJobsByCity(city.slug).slice(0, 4);
  const faq = buildFaq(city, s);
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 8);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Plumbing Services', href: '/plumbing-services' },
    { label: `Plumbing Services in ${city.name}` },
  ];

  const issues = [
    { symptom: 'Dripping Tap',         cause: 'Worn washer, damaged cartridge, corroded valve seat, loose packing nut, or worn O-ring', risk: 'Continuous water loss, higher bills, staining, and eventual fixture damage', service: 'Tap service: washer, cartridge, or valve replacement; full tap replacement if body is corroded' },
    { symptom: 'Burst Pipe',           cause: 'Freezing and expansion in cold weather, internal corrosion, high water pressure, physical impact, deteriorated joints, or aged pipework', risk: 'Rapid flooding, ceiling and floor damage, damp, mould growth, and structural property damage', service: 'Emergency pipe repair: isolate supply, replace damaged section, test and restore' },
    { symptom: 'Blocked Drain',        cause: 'Accumulated grease, food waste, hair, soap residue, limescale buildup, foreign objects, or root intrusion in external drainage', risk: 'Slow drainage leading to overflow, foul odours from trapped waste, wastewater backup, and hygiene hazard', service: 'Drain unblocking using rods, jetting, or mechanical clearance; CCTV inspection for recurring blockages' },
    { symptom: 'Blocked Toilet',       cause: 'Excessive paper, wet wipes, sanitary products, or foreign objects causing a waste restriction; deep sewer-line blockage', risk: 'Overflow onto bathroom floor, hygiene risk, water damage, and backing up from connected drainage', service: 'Toilet drain clearance; replacement of flush mechanism or internal components if faulty' },
    { symptom: 'Hidden Leak',          cause: 'Failed pipe joint, pin-hole corrosion, seal failure on a fitting, deteriorated flexi hose, or slow pressure damage to pipework behind walls or under floors', risk: 'Damp patches, rising mould, rotting timber, damaged plaster, and significant hidden structural damage', service: 'Leak detection using moisture measurement, acoustic equipment, or thermal imaging; targeted pipe repair' },
    { symptom: 'Low Water Pressure',   cause: 'Leaking pipe reducing system pressure, partially closed service valve, blocked or scaled pipework, faulty pressure regulator, or mains supply restriction', risk: 'Poor shower and tap performance, slow-filling appliances, heating inefficiency', service: 'Pressure diagnosis: checking valves, testing at multiple points, identifying leaks, recommending repair' },
    { symptom: 'Cold Radiator Spots',  cause: 'Trapped air at the top of a radiator, sludge and magnetite deposits at the bottom, faulty thermostatic valve, or flow restriction in the circulation system', risk: 'Uneven heating, increased energy consumption, and progressive buildup leading to system damage', service: 'Radiator bleeding for air; powerflush or inhibitor treatment for sludge; valve replacement if faulty' },
    { symptom: `Limescale (${city.waterHardness} water)`, cause: `Dissolved calcium and magnesium minerals from ${city.name}'s ${city.waterHardness} water depositing inside pipework, taps, shower heads, and appliance connections`, risk: 'Restricted flow through scaled pipes and fixtures, reduced appliance efficiency, premature tap and valve failure', service: 'Scale removal from fixtures; water filter or softener installation; limescale inhibitor fitting' },
  ];

  return (
    <>
      <SchemaMarkup data={[plumbingServicesSchema(city, s), faqSchema(faq), breadcrumbSchema(crumbs)]} />

      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Full-width: left dark gradient over image placeholder, right quote form
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Background image placeholder — swap <div> for <Image> in production */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" aria-hidden />
        <div className="absolute inset-0 bg-[url('/images/plumber-hero.webp')] bg-cover bg-center opacity-30" aria-hidden />

        <div className="relative container-content py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_400px]">
            {/* Left — copy */}
            <div>
              {/* Live badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white/90">
                <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
                Available now in {city.name}
              </div>

              <h1 className="text-white text-h1-m md:text-h1-d">
                Plumbing Services in {city.name}
              </h1>
              <p className="mt-2 text-xl font-semibold text-white/70 md:text-2xl">
                Emergency Repairs, Leaks, Drains &amp; Installations
              </p>
              <p className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-white/85">
                Burst pipe? Blocked drain? Leaking tap? {s.brand} provides local plumbing repairs and emergency callouts across {city.name}. Clear quotes before any work starts. Guaranteed workmanship.
              </p>
              <p className="mt-3 max-w-lg text-sm text-white/65">
                Whether you have a dripping tap, a blocked toilet, low water pressure, or a leaking pipe causing property damage, our local plumbers diagnose the problem, explain the cause, and repair it correctly. Domestic and commercial, from routine tap replacements to same-day emergency pipe repairs.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${s.phoneTel}`}
                  className="inline-flex items-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-accent-dark active:scale-[0.98]"
                  aria-label={`Call ${s.phoneDisplay} now`}
                >
                  <IconPhone />
                  Call Now: {s.phoneDisplay}
                </a>
                <Link
                  href="#quote"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Request a Fixed Quote
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { icon: <IconPin />,    label: `Local to ${city.name}` },
                  { icon: <IconAlert />,  label: 'Emergency callouts' },
                  { icon: <IconPrice />,  label: 'Clear quotes first' },
                  { icon: <IconShield />, label: 'Workmanship guaranteed' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-xs font-medium text-white/90">
                    <span className="shrink-0 text-white/60">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              {/* Floating review badge */}
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <IconStar key={i} />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-white">{NATIONWIDE_RATING}</span>
                  <span className="text-white/70"> from {NATIONWIDE_REVIEW_COUNT.toLocaleString()} reviews</span>
                </div>
              </div>
            </div>

            {/* Right — quote form */}
            <div id="quote" className="rounded-2xl border border-white/15 bg-white p-6 shadow-2xl">
              <div className="mb-1 text-base font-bold text-ink">Get a Free Quote in {city.name}</div>
              <p className="mb-5 text-sm text-gray-soft">Tell us the issue and we will reply within 1 hour. For emergencies, call directly.</p>
              <QuoteForm sourcePage={`/plumbing-services/${city.slug}`} citySlug={city.slug} cityName={city.name} submitLabel="Get a free quote" />
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
            <p className="mt-3 text-gray-soft">Select your issue below and we will tell you how we can help, or call us now if it is urgent.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProblemCard icon={<IconPipe />}     label="Burst Pipe Repair"             desc="Water escaping from a split or fractured pipe. Turn off the stop tap and call immediately." urgency="red"    href={`/emergency-plumber/${city.slug}`} />
            <ProblemCard icon={<IconDrain />}    label="Blocked Drain Unblocking"       desc="Slow drainage, bad smells, or water pooling in sinks, showers, or outside gullies." urgency="orange" />
            <ProblemCard icon={<IconToilet />}   label="Blocked Toilet Repair"          desc="Toilet not flushing, overflowing, or backing up despite multiple flushes." urgency="orange" />
            <ProblemCard icon={<IconLeak />}     label="Leaking Pipe Repair"            desc="Visible or suspected pipe leak under floors, behind walls, or under the sink." urgency="orange" />
            <ProblemCard icon={<IconTap />}      label="Dripping Tap Repair"            desc="A tap that will not fully close, wasting water and driving up bills." urgency="blue" />
            <ProblemCard icon={<IconGauge />}    label="Low Water Pressure Diagnosis"   desc="Weak flow from taps or showers, or pressure that has dropped suddenly." urgency="blue" />
            <ProblemCard icon={<IconFlame />}    label="No Hot Water / Hot Water Issue" desc="Hot water cylinder, immersion heater, or heating-related plumbing issue." urgency="orange" />
            <ProblemCard icon={<IconBath />}     label="Bathroom Plumbing"              desc="Sink, toilet, bath, or shower installation, repair, or replacement." urgency="blue" />
            <ProblemCard icon={<IconSink />}     label="Kitchen Plumbing"               desc="Sink, tap, dishwasher, or waste pipe repair or connection." urgency="blue" />
            <ProblemCard icon={<IconPlug />}     label="Appliance Connections"          desc="Washing machine, dishwasher, or appliance water supply and waste connection." urgency="blue" />
            <ProblemCard icon={<IconRadiator />} label="Radiator Leak or Cold Spots"    desc="Leaking radiator valve, air trapped in system, or sludge affecting heat distribution." urgency="blue" />
            <ProblemCard icon={<IconAlert />}    label="Emergency Callout"              desc="Flooding, major leak, or urgent plumbing failure requiring immediate attendance." urgency="red"    href={`/emergency-plumber/${city.slug}`} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — ISSUES EXPLAINED
          Desktop: table | Mobile: accordion
      ══════════════════════════════════════════════════════════ */}
      <section className="section bg-off-white">
        <div className="container-content">
          <h2>Common Plumbing Issues We Repair in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Most plumbing problems do not start without a cause. A dripping tap indicates a worn internal component. A blocked drain signals a restriction building inside the pipework. Understanding the cause helps diagnose the correct repair and prevents the same problem from returning.
          </p>

          {/* Desktop table */}
          <div className="mt-8 hidden md:block overflow-x-auto rounded-xl border border-gray-line shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white text-left">
                  <th className="px-5 py-3.5 font-semibold w-[15%]">Symptom</th>
                  <th className="px-5 py-3.5 font-semibold w-[30%]">Likely Cause</th>
                  <th className="px-5 py-3.5 font-semibold w-[27%]">Risk If Ignored</th>
                  <th className="px-5 py-3.5 font-semibold w-[28%]">Recommended Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-line">
                {issues.map((row, i) => <IssueRow key={row.symptom} {...row} alt={i % 2 === 1} />)}
              </tbody>
            </table>
          </div>

          {/* Mobile accordion */}
          <div className="mt-6 space-y-2 md:hidden">
            {issues.map((row) => <IssueAccordionRow key={row.symptom} {...row} />)}
          </div>

          <p className="mt-6 text-sm italic text-gray-soft">
            Each of these problems follows a chain: a component fails or a restriction develops, a symptom appears, and the risk to the property increases the longer the repair is delayed. Identifying the cause, not just the symptom, is what drives a lasting repair.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — CORE SERVICES (alternating image/text blocks)
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Our Plumbing Services in {city.name}</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">{s.brand} handles a full range of residential and commercial plumbing repairs, installations, and maintenance across {city.name}.</p>
        </div>
      </section>

      <ServiceBlock id="emergency" heading="Emergency Plumbing Repairs" imageAlt={`Emergency plumber repairing burst pipe in ${city.name}`} imageRight alt={false}>
        <p>A plumbing emergency requires fast attendance and a calm, systematic response. Burst pipes, major leaks, toilet overflows, and sudden loss of water supply all carry a risk of property damage that worsens with every minute.</p>
        <p>Our local plumbers respond to urgent callouts across {city.name} for burst or fractured pipes, major leaks requiring immediate isolation, overflowing toilets, loss of cold or hot water supply, and flooding situations where water cannot be safely stopped at the stop tap.</p>
        <p><strong>Before we arrive:</strong> Turn off the main stop tap (usually under the kitchen sink or near the water meter) to stop the flow and limit damage while we travel to you.</p>
        <Link href={`/emergency-plumber/${city.slug}`} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          View emergency plumber {city.name} →
        </Link>
      </ServiceBlock>

      <ServiceBlock id="leak-detection" heading="Leak Detection &amp; Pipe Repair" imageAlt={`Plumber using moisture meter for leak detection in ${city.name}`} imageRight={false} alt>
        <p>A leak is not always visible. Water can travel along joists, seep into insulation, and emerge metres from the actual source. By the time a damp patch appears, the leak may already have caused hidden structural damage.</p>
        <p>We locate leaks using visual inspection of pipework, joints, and fittings; moisture meter readings on walls, floors, and ceilings; acoustic detection to hear water movement inside concealed pipework; and thermal imaging where surface temperature differentials help locate water paths.</p>
        <p>Once located, we repair by replacing the damaged pipe section, resealing a failed joint, replacing a faulty flexi hose or isolation valve, or rerouting pipework where needed.</p>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Request a leak detection visit →</Link>
      </ServiceBlock>

      <ServiceBlock id="drains" heading="Drain Cleaning &amp; Unblocking" imageAlt={`Drain unblocking with rods in ${city.name}`} imageRight alt={false}>
        <p>A blocked drain does not only slow the water flow; it can create foul odours, cause wastewater to back up into the property, and, if the blockage is in external drainage, create overflow at ground level.</p>
        <ul className="ml-4 space-y-1 list-disc marker:text-primary">
          <li>Kitchen sinks: grease, food waste, detergent residue</li>
          <li>Bathroom sinks and showers: hair, soap, conditioner buildup</li>
          <li>Toilets: waste, wipes, foreign objects</li>
          <li>External gulley drains: leaves, silt, root intrusion</li>
        </ul>
        <p>For recurring blockages we recommend a CCTV drain inspection to view the pipework from inside and identify cracks, root penetration, or collapsed sections.</p>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Book drain unblocking →</Link>
      </ServiceBlock>

      <ServiceBlock id="pipes" heading="Pipe Installation &amp; Replacement" imageAlt={`Pipe replacement and installation in ${city.name}`} imageRight={false} alt>
        <p>Plumbing systems deteriorate over time. Old lead pipework, corroded copper joints, damaged waste pipes, and undersized supply pipes all reduce system reliability and water quality.</p>
        <ul className="ml-4 space-y-1 list-disc marker:text-primary">
          <li>Damaged or corroded water supply pipes</li>
          <li>Old waste pipes and traps</li>
          <li>Isolated pipe sections where joints have failed</li>
          <li>Full pipe runs during renovation or extension work</li>
          <li>Valves, isolation valves, service valves, and gate valves</li>
        </ul>
        <p>We work with copper, plastic push-fit, and MDPE blue water supply pipe, selecting the appropriate material for the application and pressure requirements.</p>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Get a quote for pipework →</Link>
      </ServiceBlock>

      <ServiceBlock id="bathroom-kitchen" heading="Bathroom &amp; Kitchen Plumbing" imageAlt={`Bathroom plumbing installation in ${city.name}`} imageRight alt={false}>
        <p><strong>Bathroom:</strong> basin installation and connection, toilet installation and cistern repair, bath installation and waste connection, shower tray and pump plumbing, isolation valve fitting, and bathroom renovation plumbing support.</p>
        <p><strong>Kitchen:</strong> sink installation and waste connection, tap replacement and service, dishwasher water supply and waste connection, washing machine connections, and under-sink pipework and trap maintenance.</p>
        <p>Each installation is tested for flow, drainage, and seal integrity before we leave the property.</p>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Plan your plumbing installation →</Link>
      </ServiceBlock>

      <ServiceBlock id="pressure" heading="Water Pressure Problems" imageAlt={`Water pressure diagnosis in ${city.name}`} imageRight={false} alt>
        <p>Low water pressure affects shower performance, tap flow, appliance function, and if the central heating system is pressure-dependent, it can affect heating too. Pressure problems are rarely random; they have a cause that can be traced.</p>
        <ul className="ml-4 space-y-1 list-disc marker:text-primary">
          <li>Checking all service and isolation valves are fully open</li>
          <li>Testing pressure at multiple outlets to identify where the drop occurs</li>
          <li>Inspecting pipework for partial blockage or scale restriction</li>
          <li>Checking for slow leaks that reduce system pressure</li>
          <li>Assessing the mains supply pressure at the incoming supply point</li>
        </ul>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Book a pressure diagnosis →</Link>
      </ServiceBlock>

      <ServiceBlock id="hot-water" heading="Hot Water &amp; Heating-Related Plumbing" imageAlt={`Hot water cylinder and radiator plumbing in ${city.name}`} imageRight alt={false}>
        <p>Many heating and hot water faults have a plumbing component that does not require a gas engineer. {s.brand} handles hot water cylinders (replacing faulty valves and connections), radiator repairs (leaking valves, TRV replacement), system powerflush to clear sludge and restore circulation efficiency, inhibitor dosing, and pipe connections to heat exchangers, cylinders, and underfloor heating manifolds.</p>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
          <strong>Important:</strong> Any work involving a gas appliance (boiler repair, gas pipe, or gas valve) must be completed by a Gas Safe registered engineer. We will advise clearly which part falls under plumbing and which requires a registered gas engineer.
        </div>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Get help with heating plumbing →</Link>
      </ServiceBlock>

      <ServiceBlock id="maintenance" heading="General Plumbing Maintenance" imageAlt={`Plumbing maintenance inspection in ${city.name}`} imageRight={false} alt>
        <p>Routine plumbing maintenance reduces the risk of emergency repairs. For homeowners, landlords, and property managers in {city.name}, a periodic inspection of valves, pipework, fixtures, and drainage can identify worn components before they fail.</p>
        <ul className="ml-4 space-y-1 list-disc marker:text-primary">
          <li>Tap inspection and washer/cartridge condition</li>
          <li>Toilet flush and valve function</li>
          <li>Check of visible pipework for early corrosion or joint weep</li>
          <li>Drain flow test in bathroom and kitchen</li>
          <li>Isolation valve operation test</li>
          <li>Pipe insulation check in loft or unheated spaces before winter</li>
          <li>Water filter and softener servicing where fitted</li>
        </ul>
        <Link href="#quote" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Book a plumbing maintenance visit →</Link>
      </ServiceBlock>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — PROCESS (horizontal desktop / vertical mobile)
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <div className="text-center">
            <h2>How Our Plumbing Repair Process Works</h2>
            <p className="mt-3 text-gray-soft">Every job follows the same clear process, from your first call to the final test after repair.</p>
          </div>

          {/* Desktop — horizontal timeline */}
          <div className="mt-12 hidden md:block">
            <div className="relative flex items-start">
              {/* connector line */}
              <div className="absolute left-5 right-5 top-5 h-0.5 bg-gray-line" aria-hidden />
              {processSteps.map((step, i) => (
                <div key={i} className="relative flex flex-1 flex-col items-center px-2">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm ring-4 ring-white">
                    {i + 1}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-sm font-semibold text-ink">{step.title}</div>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-soft">{step.desc}</p>
                    {i === 3 && (
                      <a href={`tel:${s.phoneTel}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        Questions? Call us
                      </a>
                    )}
                    {i === 7 && (
                      <Link href="#quote" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        Request a quote →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — vertical */}
          <div className="mt-8 space-y-0 md:hidden">
            {processSteps.map((step, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">{i + 1}</div>
                  {i < processSteps.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-gray-line" />}
                </div>
                <div className="pb-8">
                  <div className="font-semibold text-ink">{step.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-gray-soft">{step.desc}</p>
                  {i === 3 && <a href={`tel:${s.phoneTel}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Questions? Call us</a>}
                  {i === 7 && <Link href="#quote" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Request a quote →</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — EMERGENCY BLOCK
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-accent text-white">
        <div className="container-content py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-white">Need an Emergency Plumber in {city.name} Today?</h2>
              <p className="mt-4 max-w-xl text-base text-white/90">
                If you are dealing with a burst pipe, a serious water leak, a blocked toilet that has overflowed, a flooded room, or a complete loss of water supply, this is a plumbing emergency. Every minute the water continues to run increases the damage to your floors, ceilings, and structure.
              </p>
              <ol className="mt-5 space-y-2 text-sm text-white/90 list-decimal list-inside">
                <li>Find your stop tap (usually under the kitchen sink or near the water meter) and turn it off clockwise to stop the flow.</li>
                <li>Turn off any electrical supplies near the leak if it is safe to do so.</li>
                <li>Call us immediately. We attend {city.name} emergencies as fast as possible.</li>
              </ol>
              <div className="mt-8">
                <a href={`tel:${s.phoneTel}`} className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 text-lg font-bold text-accent shadow-lg transition hover:bg-off-white active:scale-[0.98]">
                  <IconPhone />
                  Call {s.phoneDisplay} for Emergency Help
                </a>
              </div>
            </div>
            <div className="grid self-center grid-cols-2 gap-3 text-center md:grid-cols-1">
              {[
                { icon: <IconClock />,  label: 'Fast local response' },
                { icon: <IconPrice />,  label: 'Clear quote first' },
                { icon: <IconShield />, label: 'Insured & compliant' },
                { icon: <IconCheck />,  label: 'Repair guaranteed' },
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2>Plumbing Repair Costs &amp; Clear Quotes</h2>
            <span className="rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green">No surprise pricing</span>
          </div>
          <p className="mt-3 max-w-2xl text-gray-soft">
            Plumbing repair costs vary depending on the type of problem, how quickly the job is needed, what parts are required, and how accessible the pipework is. We assess the job first and provide a clear quote before any work begins.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-line bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-line bg-off-white text-left">
                    <th className="px-5 py-3.5 font-semibold text-ink">Cost Factor</th>
                    <th className="px-5 py-3.5 font-semibold text-ink">Why It Matters</th>
                    <th className="px-5 py-3.5 font-semibold text-ink hidden lg:table-cell">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-line">
                  {[
                    ['Type of problem',         'Simple fixture repair vs. emergency pipe repair involve very different labour and parts',  'Dripping tap vs. burst pipe'],
                    ['Emergency vs. scheduled', 'Urgent out-of-hours attendance costs more than a booked appointment',                     'Saturday night vs. weekday morning'],
                    ['Parts required',          'Valve, cartridge, or pipe section costs vary by specification and availability',           'Standard fitting vs. specialist section'],
                    ['Access to pipework',      'Concealed pipework behind tiles or under floors requires additional time to access',        'Under-floor leak vs. visible sink leak'],
                    ['Hidden leak complexity',  'Locating a concealed leak adds time and specialist equipment use',                         'Acoustic or thermal leak detection'],
                    ['Blockage severity',       'Partial blockage versus drain collapse or root intrusion',                                 'Drain rods vs. CCTV survey and jetting'],
                    ['Out-of-hours callout',    'Evening, weekend, or bank holiday attendance',                                             'Sunday repair vs. Tuesday booking'],
                    ['Property type',           'Domestic versus commercial property may affect labour rate and access',                    'House vs. multi-storey commercial premises'],
                  ].map(([factor, reason, example], i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-off-white/50' : ''}>
                      <td className="px-5 py-3 font-medium text-ink">{factor}</td>
                      <td className="px-5 py-3 text-gray-soft">{reason}</td>
                      <td className="px-5 py-3 text-gray-soft hidden lg:table-cell">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Stat cards */}
            <div className="space-y-4 self-start">
              {[
                { label: 'Call-out fee',       value: city.callOutFee, note: 'Covers attendance and first hour of labour on site.' },
                { label: 'Hourly rate',         value: city.hourlyRate,  note: 'Standard rate beyond the first hour, same rate 24/7.' },
                { label: 'Out-of-hours extra',  value: 'None',           note: 'No additional charge for nights, weekends, or bank holidays.' },
              ].map(({ label, value, note }) => (
                <div key={label} className="rounded-xl border border-gray-line bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
                  <div className="mt-1 text-3xl font-extrabold text-ink">{value}</div>
                  <p className="mt-2 text-xs text-gray-soft">{note}</p>
                </div>
              ))}
              <Link href="#quote" className="btn-primary w-full justify-center">
                Request a quote →
              </Link>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-soft">We aim to give you a clear and honest cost before we start. If the job turns out to be more complex than the initial assessment, we will explain why and agree on any additional cost before continuing.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 8 — WHY CHOOSE US
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Why Choose {s.brand} for Plumbing Services in {city.name}?</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">Real experience, transparent pricing, and guaranteed workmanship. Not just promises.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <TrustCard icon={<IconPin />}    heading="Local Plumbing Experience"         body={`${s.brand} serves homeowners, landlords, and businesses across ${city.name}. We understand the local property types, housing stock, water hardness (${city.waterHardness}), and drainage infrastructure common to this area.`} />
            <TrustCard icon={<IconAlert />}  heading="Emergency Attendance"              body={`When a plumbing problem cannot wait, we attend urgent callouts across ${city.name} as quickly as possible. We carry common parts and repair materials to handle most urgent repairs on the same visit.`} />
            <TrustCard icon={<IconPrice />}  heading="Clear Pricing, No Hidden Charges" body="We explain the problem, the options, and the cost before we begin. The price you agree is the price you pay. No surprises on the invoice." />
            <TrustCard icon={<IconShield />} heading="Guaranteed Workmanship"            body="All repairs completed by our plumbers are backed by a workmanship guarantee. If the same fault returns due to our repair work, we come back and put it right." />
            <TrustCard icon={<IconCheck />}  heading="Insured &amp; Compliant"           body="Our plumbers carry public liability insurance and carry out all work in compliance with Water Regulations and Building Regulations where applicable." />
            <TrustCard icon={<IconStar />}   heading="Verified Customer Reviews"         body={`${s.brand} is rated ${NATIONWIDE_RATING} stars across ${NATIONWIDE_REVIEW_COUNT.toLocaleString()} verified customer reviews. Real customers, real jobs, real feedback from across the UK.`} />
          </div>

          {/* Review snippets below trust cards */}
          {cityReviews.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 9 — RECENT JOBS
      ══════════════════════════════════════════════════════════ */}
      {recentJobs.length > 0 && (
        <section className="section bg-off-white">
          <div className="container-content">
            <h2>Recent Plumbing Jobs in {city.name}</h2>
            <p className="mt-3 text-gray-soft">Here are examples of plumbing repairs and installations recently completed for customers across {city.name} and nearby areas.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentJobs.map((j, i) => <RecentJobCard key={i} job={j} />)}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SECTION 10 — SERVICE AREA
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
          <h2>Plumbing Services Across {city.name} and Nearby Areas</h2>
          <p className="mt-3 max-w-2xl text-gray-soft">
            {s.brand} provides plumbing repairs, leak detection, drain unblocking, emergency callouts, and bathroom and kitchen plumbing across {city.name} and the surrounding areas. Whether you are in the town centre, a residential area, or a nearby village, our local plumbers can attend your property.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
            <div>
              <div className="mb-3 text-sm font-semibold text-ink">Postcodes we cover in {city.name}</div>
              <div className="flex flex-wrap gap-2">
                {city.postcodes.map((pc) => (
                  <span key={pc} className="rounded-full border border-gray-line bg-white px-3 py-1 text-sm font-medium text-ink">{pc}</span>
                ))}
              </div>
              {city.futureAreas.length > 0 && (
                <div className="mt-6">
                  <div className="mb-3 text-sm font-semibold text-ink">Areas we cover</div>
                  <div className="flex flex-wrap gap-2">
                    {city.futureAreas.slice(0, 8).map((area) => (
                      <span key={area} className="rounded-full border border-gray-line bg-off-white px-3 py-1 text-sm text-gray-soft capitalize">
                        {area.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-4 text-sm text-gray-soft">Not sure if we cover your area? Call us and we will confirm.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CallButton size="sm" variant="primary" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} label="Call to check coverage" />
              </div>
            </div>
            {/* Map placeholder */}
            <div
              className="grid h-[240px] place-items-center rounded-xl border border-dashed border-gray-line bg-off-white text-center text-gray-soft"
              data-lat={city.geo.lat}
              data-lng={city.geo.lng}
            >
              <div className="px-4">
                <IconPin />
                <p className="mt-2 text-sm font-medium">{city.name}</p>
                <p className="text-xs">{city.geo.lat.toFixed(3)}, {city.geo.lng.toFixed(3)}</p>
                <p className="mt-1 text-xs text-gray-soft/60">Replace with Google Maps embed in production</p>
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
            Regular plumbing maintenance helps identify worn valves, leaking joints, blocked waste pipes, pressure irregularities, and early signs of pipe corrosion before they become emergency repairs.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { tip: 'Know where your stop tap is',               desc: 'Test it annually. A seized stop tap cannot shut off the supply during a burst pipe emergency.' },
              { tip: 'Do not pour grease down the kitchen sink',  desc: 'Grease solidifies inside the pipe and causes blockages that worsen over time.' },
              { tip: 'Use a hair trap in your shower',            desc: 'Hair is one of the most common causes of slow shower drain blockages.' },
              { tip: 'Check under sinks monthly',                 desc: 'A slow drip from a waste joint or flexi hose will be invisible until it has caused cabinet damage.' },
              { tip: 'Insulate pipes in unheated spaces',         desc: 'Loft pipes, garage pipes, and pipes on exterior walls are at risk of freezing and bursting in winter.' },
              { tip: 'Check isolation valves operate freely',     desc: 'A stiff or stuck valve may not close in an emergency. Have it replaced before it seizes completely.' },
              { tip: 'Do not flush wipes or sanitary products',   desc: 'They do not dissolve and accumulate in the drainage system, causing recurring blockages.' },
              { tip: 'Bleed radiators annually',                  desc: 'Trapped air reduces radiator efficiency and contributes to corrosion inside the system over time.' },
              { tip: 'Have a leaking tap repaired promptly',      desc: 'A worn washer costs little to replace; the staining, water waste, and eventual tap replacement cost far more.' },
              { tip: 'Test your water pressure periodically',     desc: 'A notable change in pressure can indicate a developing leak or valve problem worth investigating early.' },
              { tip: 'Book a landlord plumbing inspection annually', desc: `Routine inspection of all pipework, valves, drains, and fixtures protects your ${city.name} property and tenancy.` },
              {
                tip: city.waterHardness === 'hard' || city.waterHardness === 'very hard'
                  ? 'Fit a water softener or scale inhibitor'
                  : 'Watch for internal copper pitting',
                desc: city.waterHardness === 'hard' || city.waterHardness === 'very hard'
                  ? `${city.name} has ${city.waterHardness} water. Reducing limescale extends the life of taps, appliances, and pipework significantly.`
                  : `${city.name}'s ${city.waterHardness} water can cause slow internal pipe corrosion. Look for discoloured water or pinhole leaks in older copper installations.`,
              },
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
            <Link href="#quote" className="btn-ghost">Book a maintenance inspection →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 12 — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container-content">
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
      <section className="bg-primary text-white">
        <div className="container-content py-16 md:py-20 text-center">
          <h2 className="text-white">Need a Local Plumber in {city.name}?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg text-white/90">
            Whether you need urgent help with a burst pipe, a blocked drain, a leaking tap, a hidden leak, or a planned plumbing installation, {s.brand} can help. We are local to {city.name}, we give you a clear price before we start, and we stand behind our work.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={`tel:${s.phoneTel}`} className="inline-flex items-center gap-2.5 rounded-lg bg-accent px-7 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-accent-dark active:scale-[0.98]">
              <IconPhone />
              Call Now: {s.phoneDisplay}
            </a>
            <Link href="#quote" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-3.5 text-base font-semibold text-white transition hover:border-white hover:bg-white/10">
              Request a Quote
            </Link>
          </div>
          {/* Trust strip repeated */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            {[
              `Local plumbers in ${city.name}`,
              'Emergency callouts available',
              'Clear quotes, no hidden charges',
              'Guaranteed workmanship',
            ].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <IconCheck />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other cities ── */}
      <section className="section bg-off-white">
        <div className="container-content">
          <div className="text-sm font-semibold text-ink mb-4">Plumbing services in other cities</div>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link key={c.slug} href={`/plumbing-services/${c.slug}`} className="rounded-full border border-gray-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary transition-colors">
                {c.name}
              </Link>
            ))}
            <Link href="/plumbing-services" className="rounded-full bg-ink text-white px-4 py-2 text-sm font-semibold">All cities →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
