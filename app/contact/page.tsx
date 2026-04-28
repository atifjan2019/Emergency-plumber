import type { Metadata } from 'next';
import Image from 'next/image';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CallButton from '@/components/CallButton';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: `Contact ${s.brand} | 24/7 Emergency Line`,
    description: `Contact ${s.brand} - 24/7 emergency plumbing line, email, and live UK coverage details. Call now or send us a non-urgent message.`,
    alternates: { canonical: '/contact' },
  };
}

export const revalidate = 3600;

export default async function ContactPage() {
  const s = await getSettings();
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact' },
  ];
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema(crumbs)} />
      <div className="container-content pt-6">
        <BreadcrumbNav items={crumbs} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-off-white to-white">
        <div className="container-content relative py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <span className="eyebrow">Contact</span>
              <h1 className="mt-4">Contact us</h1>
              <p className="mt-5 text-lg text-gray-soft leading-relaxed max-w-2xl">
                For emergencies call our 24/7 line. For non-urgent enquiries email us and we will reply within one working day.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Plumber dispatcher answering an emergency callout"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-xl">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-sm font-bold">
                  <span className="pulse-dot bg-white" /> 24/7 Emergency Line
                </div>
                <p className="mt-5 text-4xl md:text-5xl font-extrabold">{s.phoneDisplay}</p>
                <p className="mt-3 text-sm text-white/90">Real dispatcher answers within three rings, every hour of every day.</p>
                <div className="mt-6">
                  <CallButton size="lg" variant="white" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-line bg-white p-8 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <h2 className="mt-4 text-h3-m md:text-h3-d">Non-urgent enquiries</h2>
              <p className="mt-3 text-sm text-gray-soft">For quotes, scheduled work, account queries or general questions:</p>
              <a href={`mailto:${s.email}`} className="mt-4 inline-block text-lg font-bold text-primary hover:text-primary-dark">
                {s.email}
              </a>
              <p className="mt-6 text-sm text-gray-soft">Reply within 1 working day, Monday to Friday.</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-line bg-white p-8 md:p-10 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
                  <path d="M21 11.5a8.38 8.38 0 01-9 8.38c-2.05 0-3.93-.74-5.4-1.94L3 20l1.06-3.6a8.38 8.38 0 01-1.94-5.4C2.5 6.85 6.85 2.5 12 2.5s9 4.35 9 9z" />
                </svg>
              </span>
              <div>
                <h2 className="text-h3-m md:text-h3-d">Send us a message</h2>
                <p className="mt-2 text-sm text-gray-soft">
                  For non-urgent enquiries. If your boiler is leaking right now, please call.
                </p>
              </div>
            </div>
            <div className="mt-7">
              <ContactForm sourcePage="/contact" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-line bg-off-white p-8">
            <h2 className="text-h3-m md:text-h3-d">Company details</h2>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <Detail label="Trading name" value={s.brand} />
              <Detail label="Phone" value={<a href={`tel:${s.phoneTel}`} className="text-primary font-bold">{s.phoneDisplay}</a>} />
              <Detail label="Email" value={<a href={`mailto:${s.email}`} className="text-primary font-bold">{s.email}</a>} />
              {s.address && <Detail label="Address" value={s.address} />}
              <Detail label="Gas Safe Reg" value={`#${s.gasSafeNumber}`} />
              <Detail label="Coverage" value="UK nationwide (12 live cities)" />
              <Detail label="Hours" value="24 hours a day, 7 days a week" />
            </dl>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-4">
      <dt className="text-xs font-bold uppercase tracking-wider text-gray-soft">{label}</dt>
      <dd className="mt-1.5 text-ink font-medium">{value}</dd>
    </div>
  );
}
