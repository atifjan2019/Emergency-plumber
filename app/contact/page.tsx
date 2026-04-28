import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CallButton from '@/components/CallButton';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { getSettings } from '@/lib/settings';

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

      <section className="section">
        <div className="container-content max-w-4xl">
          <h1>Contact us</h1>
          <p className="mt-4 text-lg text-gray-soft">
            For emergencies call our 24/7 line. For non-urgent enquiries email us and we will reply within one working day.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <span className="pulse-dot" /> 24/7 Emergency Line
              </div>
              <p className="mt-3 text-3xl font-extrabold text-ink">{s.phoneDisplay}</p>
              <p className="mt-2 text-sm text-gray-soft">Real dispatcher answers within three rings, every hour of every day.</p>
              <div className="mt-5">
                <CallButton size="lg" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
              </div>
            </div>

            <div className="rounded-xl border border-gray-line bg-white p-6">
              <h2 className="text-h3-m md:text-h3-d">Non-urgent enquiries</h2>
              <p className="mt-3 text-sm text-gray-soft">For quotes, scheduled work, account queries or general questions:</p>
              <a href={`mailto:${s.email}`} className="mt-4 inline-block text-lg font-semibold text-primary hover:text-primary-dark">
                {s.email}
              </a>
              <p className="mt-6 text-sm text-gray-soft">Reply within 1 working day, Monday to Friday.</p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-gray-line bg-white p-6 shadow-sm">
            <h2 className="text-h3-m md:text-h3-d">Send us a message</h2>
            <p className="mt-2 text-sm text-gray-soft">
              For non-urgent enquiries. If your boiler is leaking right now, please call.
            </p>
            <div className="mt-6">
              <ContactForm sourcePage="/contact" />
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-gray-line bg-off-white p-6">
            <h2 className="text-h3-m md:text-h3-d">Company details</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
              <div><dt className="font-semibold text-ink">Trading name</dt><dd className="text-gray-soft">{s.brand}</dd></div>
              <div><dt className="font-semibold text-ink">Phone</dt><dd><a href={`tel:${s.phoneTel}`} className="text-primary">{s.phoneDisplay}</a></dd></div>
              <div><dt className="font-semibold text-ink">Email</dt><dd><a href={`mailto:${s.email}`} className="text-primary">{s.email}</a></dd></div>
              {s.address && <div><dt className="font-semibold text-ink">Address</dt><dd className="text-gray-soft">{s.address}</dd></div>}
              <div><dt className="font-semibold text-ink">Gas Safe Reg</dt><dd className="text-gray-soft">#{s.gasSafeNumber}</dd></div>
              <div><dt className="font-semibold text-ink">Coverage</dt><dd className="text-gray-soft">UK nationwide (12 live cities)</dd></div>
              <div><dt className="font-semibold text-ink">Hours</dt><dd className="text-gray-soft">24 hours a day, 7 days a week</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
