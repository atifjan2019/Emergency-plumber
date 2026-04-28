import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CallButton from '@/components/CallButton';
import CTASection from '@/components/CTASection';
import QuoteForm from '@/components/QuoteForm';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';

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

      <section className="section">
        <div className="container-content max-w-5xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                <span className="pulse-dot" /> Free, no obligation
              </div>
              <h1 className="mt-4">Get a free quote</h1>
              <p className="mt-5 max-w-xl text-base md:text-lg text-gray-soft">
                Tell us what is wrong and we will reply with a price within an hour during the day.
                For active emergencies (water coming through a ceiling, no heat in winter, gas smell),
                please call instead so we can dispatch immediately.
              </p>

              <div className="mt-8 grid gap-5">
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

              <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-5">
                <div className="text-sm font-semibold text-primary">Need someone now?</div>
                <p className="mt-1 text-sm text-ink">
                  Call our 24/7 line for an immediate dispatch. Same rates day or night, no surcharge for nights or weekends.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <CallButton size="md" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
                  <span className="text-sm text-gray-soft">Real dispatcher answers within three rings.</span>
                </div>
              </div>
            </div>

            <div className="md:sticky md:top-28 md:self-start">
              <div className="rounded-xl border border-gray-line bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-ink">Send your details</h2>
                <p className="mt-1 text-sm text-gray-soft">We never share your number or email with third parties.</p>
                <div className="mt-5">
                  <QuoteForm sourcePage="/quote" draftKey="quote-page" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-content max-w-5xl">
          <h2>What to include for a faster, more accurate quote</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="flex gap-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {n}
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-gray-soft">{body}</p>
      </div>
    </div>
  );
}

function Tip({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-5">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-gray-soft">{body}</p>
    </div>
  );
}
