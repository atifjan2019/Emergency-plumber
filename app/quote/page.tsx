import type { Metadata } from 'next';
import Image from 'next/image';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CallButton from '@/components/CallButton';
import CTASection from '@/components/CTASection';
import QuoteForm from '@/components/QuoteForm';
import PostcodeChecker from '@/components/PostcodeChecker';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: `Get a free quote | ${s.brand}`,
    description: `Free, no-obligation quote from a Gas Safe plumber. Tell us what's wrong and we'll reply within an hour during the day. For emergencies, call ${s.phoneDisplay}.`,
    alternates: { canonical: '/quote' },
  };
}

export const revalidate = 3600;

export default async function QuotePage() {
  const s = await getSettings();
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Get a quote' },
  ];

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* Hero + Form */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-off-white to-white">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="container-content relative py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-sm font-bold text-primary">
                <span className="pulse-dot" /> Free, no obligation
              </div>
              <h1 className="mt-5">Get a free quote</h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg text-gray-soft leading-relaxed">
                Tell us what is wrong and we will reply with a price within an hour during the day.
                For active emergencies (water coming through a ceiling, no heat in winter, gas smell),
                please call instead so we can dispatch immediately.
              </p>

              <div className="mt-10 grid gap-4">
                <Step
                  n="1"
                  title="Send the details"
                  body="Name, phone, a couple of lines about the issue. Include your postcode or city if you can."
                />
                <Step
                  n="2"
                  title="We reply with a price"
                  body="Within an hour during the day, otherwise first thing the next morning. No obligation, no pressure."
                />
                <Step
                  n="3"
                  title="We book or you walk away"
                  body="If the price works, we agree a slot. If not, no harm done and we keep no record beyond what was sent."
                />
              </div>

              <div className="mt-10 relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary to-primary-dark text-white p-6">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
                <div className="relative">
                  <div className="text-sm font-bold inline-flex items-center gap-2">
                    <span className="pulse-dot bg-white" />
                    Need someone now?
                  </div>
                  <p className="mt-2 text-base text-white/90">
                    Call our 24/7 line for an immediate dispatch. Same rates day or night, no surcharge for nights or weekends.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <CallButton size="md" variant="white" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
                    <span className="text-sm text-white/80">Real dispatcher answers within three rings.</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="quote-form" className="md:sticky md:top-28 md:self-start scroll-mt-28">
              <div className="relative rounded-2xl border-2 border-gray-line bg-white p-6 md:p-7 shadow-xl">
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                  Secure form
                </div>
                <h2 className="text-lg font-extrabold text-ink">Send your details</h2>
                <p className="mt-1 text-sm text-gray-soft">We never share your number or email with third parties.</p>
                <div className="mt-6">
                  <QuoteForm sourcePage="/quote" draftKey="quote-page" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PostcodeChecker />

      <section className="section bg-off-white">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-white shadow-md">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Plumber on site preparing a quote with a clipboard"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
              <span className="mt-6 inline-block eyebrow">Faster quotes</span>
              <h2 className="mt-3">What to include for a faster, more accurate quote</h2>
            </div>

            <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
              <Tip
                title="Where the issue is"
                body="Postcode and which room. Listed building or flat above neighbours? Mention it."
              />
              <Tip
                title="What is happening"
                body="Leak / no heat / blocked drain / boiler error code. A photo helps a lot if you can send one."
              />
              <Tip
                title="What you have already tried"
                body="Bled the radiator, reset the boiler, plunged the loo. Saves us repeating steps."
              />
              <Tip
                title="Boiler or appliance brand"
                body="Worcester, Vaillant, Baxi, Ideal, Glow-worm, etc. Helps us bring the right parts."
              />
              <Tip
                title="When it started"
                body="This morning, after the cold snap, when the new bathroom was fitted - context narrows the cause."
              />
              <Tip
                title="When you are home"
                body="Mornings, evenings, weekends. We will pick a slot that works."
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Plumbing emergency right now?"
        subheading={`Skip the form and call ${s.phoneDisplay}. A Gas Safe engineer can be dispatched in minutes.`}
      />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-line bg-white p-5 shadow-sm">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md font-extrabold">
        {n}
      </div>
      <div>
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-gray-soft leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Tip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gray-line bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-hidden>
          <path strokeLinecap="round" d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-gray-soft leading-relaxed">{body}</p>
    </div>
  );
}
