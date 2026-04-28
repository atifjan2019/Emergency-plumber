import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import CallButton from '@/components/CallButton';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import { breadcrumbSchema } from '@/lib/schema';
import { BRAND, PHONE_DISPLAY, PHONE_TEL, EMAIL, GAS_SAFE_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Contact ${BRAND} | 24/7 Emergency Line`,
  description: `Contact ${BRAND} - 24/7 emergency plumbing line, email, and live UK coverage details. Call now or send us a non-urgent message.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
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
              <p className="mt-3 text-3xl font-extrabold text-ink">{PHONE_DISPLAY}</p>
              <p className="mt-2 text-sm text-gray-soft">Real dispatcher answers within three rings, every hour of every day.</p>
              <div className="mt-5">
                <CallButton size="lg" />
              </div>
            </div>

            <div className="rounded-xl border border-gray-line bg-white p-6">
              <h2 className="text-h3-m md:text-h3-d">Non-urgent enquiries</h2>
              <p className="mt-3 text-sm text-gray-soft">For quotes, scheduled work, account queries or general questions:</p>
              <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-lg font-semibold text-primary hover:text-primary-dark">
                {EMAIL}
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
              <div><dt className="font-semibold text-ink">Trading name</dt><dd className="text-gray-soft">{BRAND}</dd></div>
              <div><dt className="font-semibold text-ink">Phone</dt><dd><a href={`tel:${PHONE_TEL}`} className="text-primary">{PHONE_DISPLAY}</a></dd></div>
              <div><dt className="font-semibold text-ink">Email</dt><dd><a href={`mailto:${EMAIL}`} className="text-primary">{EMAIL}</a></dd></div>
              <div><dt className="font-semibold text-ink">Gas Safe Reg</dt><dd className="text-gray-soft">#{GAS_SAFE_NUMBER}</dd></div>
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
