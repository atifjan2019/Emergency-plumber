import Link from 'next/link';
import Image from 'next/image';
import CallButton from '@/components/CallButton';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';
import { getSettings } from '@/lib/settings';

export default async function NotFound() {
  const s = await getSettings();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-off-white to-white">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="container-content relative py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">Error 404</span>
            <h1 className="mt-4">Page not found</h1>
            <p className="mt-5 max-w-2xl text-gray-soft text-lg leading-relaxed">
              The page you were looking for has moved or never existed. Try the homepage, our service list or call us directly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
              <CallButton size="lg" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
              <Link href="/" className="btn-ghost">Back to homepage</Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <QuickLink href="/services" title="Services" body="All emergency plumbing services" icon="services" />
              <QuickLink href="/areas" title="Areas" body="UK cities we cover" icon="areas" />
              <QuickLink href="/contact" title="Contact" body="Talk to a real dispatcher" icon="contact" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Local plumber on a UK callout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-4 -left-4 rounded-2xl bg-white border border-gray-line shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-3xl font-extrabold leading-none text-ink">404</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-soft">Not found</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-primary text-white shadow-xl p-4 max-w-[260px]">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="pulse-dot bg-white" />
                  Still need help?
                </div>
                <p className="mt-1.5 text-xs text-white/85 leading-relaxed">
                  A real dispatcher answers within three rings, every hour of every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLink({ href, title, body, icon }: { href: string; title: string; body: string; icon: string }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-2xl border border-gray-line bg-white p-5 hover:border-primary hover:shadow-md transition"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
        <QuickIcon name={icon} />
      </span>
      <div className="flex-1">
        <div className="font-bold text-ink group-hover:text-primary transition-colors">{title}</div>
        <div className="text-xs text-gray-soft">{body}</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mt-1 text-gray-soft group-hover:text-primary group-hover:translate-x-0.5 transition" aria-hidden>
        <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function QuickIcon({ name }: { name: string }) {
  const c = { className: 'h-5 w-5', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'services':
      return <svg {...c} aria-hidden><path d="M14 6a4 4 0 105.66 5.66L22 14l-2 2-2.34-2.34A4 4 0 1014 6z" /><path d="M11 11L4 18l3 3 7-7" /></svg>;
    case 'areas':
      return <svg {...c} aria-hidden><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>;
    case 'contact':
      return <svg {...c} aria-hidden><path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" fill="currentColor" stroke="none" /></svg>;
    default:
      return <svg {...c} aria-hidden><circle cx="12" cy="12" r="9" /></svg>;
  }
}
