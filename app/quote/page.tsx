import type { Metadata } from 'next';
import Link from 'next/link';
import CallButton from '@/components/CallButton';
import QuoteWizard from '@/components/QuoteWizard';
import { getSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: `Get a free quote | ${s.brand}`,
    description: `Free, no-obligation quote from a Gas Safe plumber. Tell us what's wrong and we'll reply within an hour during the day. For emergencies, call ${s.phoneDisplay}.`,
    alternates: { canonical: '/quote' },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 3600;

export default async function QuotePage() {
  const s = await getSettings();

  return (
    <div className="flex min-h-[100svh] flex-col bg-gradient-to-br from-off-white via-white to-primary/5">
      {/* Minimal top bar */}
      <header className="border-b border-gray-line bg-white/85 backdrop-blur sticky top-0 z-30">
        <div className="container-content flex items-center justify-between py-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-ink hover:text-primary transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
              <path strokeLinecap="round" d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            <span className="hidden sm:inline">Back to {s.brand}</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-gray-soft">Or call us</span>
            <CallButton size="sm" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="container-content py-6 md:py-12">
          <div className="rounded-2xl md:rounded-3xl border border-gray-line bg-white p-5 sm:p-7 md:p-10 lg:p-12 shadow-xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold text-primary">
                <span className="pulse-dot" /> Free, no obligation
              </span>
              <span className="text-xs text-gray-soft">Takes about 60 seconds</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink leading-tight">Get a free fixed quote</h1>
            <p className="mt-2 text-sm md:text-base text-gray-soft">
              Not sure what is wrong? That is fine - just pick the closest option. A Gas Safe engineer will follow up.
            </p>

            <div className="mt-6 md:mt-8">
              <QuoteWizard sourcePage="/quote" />
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { t: 'Gas Safe registered', d: 'Every gas job' },
              { t: 'Same rate 24/7', d: 'No surcharge' },
              { t: 'Fixed-price', d: 'Written quote' },
              { t: '90-day guarantee', d: 'Workmanship' },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-gray-line bg-white p-3 text-center">
                <div className="text-[11px] sm:text-xs font-bold text-ink leading-tight">{b.t}</div>
                <div className="mt-0.5 text-[10px] sm:text-[11px] text-gray-soft">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-line bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-soft">
          <p>For active emergencies (flooding, no heat in winter, gas smell), please call instead.</p>
          <p>{s.brand} - 24/7 across 12 UK cities</p>
        </div>
      </footer>
    </div>
  );
}
