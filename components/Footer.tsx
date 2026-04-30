import Link from 'next/link';
import { cities } from '@/data/cities';
import { services } from '@/data/services';
import { getSettings } from '@/lib/settings';
import {
  LEGAL_COMPANY_NAME,
  COMPANY_NUMBER,
  VAT_NUMBER,
  SERVICE_BASE,
  PUBLIC_LIABILITY_COVER,
  INSURANCE_PROVIDER,
} from '@/lib/constants';

export default async function Footer() {
  const s = await getSettings();

  return (
    <footer className="bg-gradient-to-br from-ink to-[#0f0f10] text-white">
      <div className="container-content py-16 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 font-extrabold text-lg">
            {s.logoUrl ? (
              <img
                src={s.logoUrl}
                alt={s.brand}
                width={280}
                height={56}
                className="h-14 w-auto max-w-[280px] object-contain brightness-0 invert"
              />
            ) : (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
                    <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                  </svg>
                </span>
                <span className="text-white">{s.brand}</span>
              </>
            )}
          </div>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            24/7 emergency plumbing across the UK. Gas Safe registered. No call-out surcharge for nights or weekends.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={`tel:${s.phoneTel}`}
              className="flex items-center gap-3 rounded-xl bg-accent px-4 py-3 font-bold text-white shadow-md shadow-accent/30 hover:bg-accent-dark transition-colors w-full max-w-xs"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
              </svg>
              {s.phoneDisplay}
            </a>
            <a href={`mailto:${s.email}`} className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {s.email}
            </a>
            {s.address && (
              <p className="flex items-start gap-2.5 text-sm text-white/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 mt-0.5 shrink-0" aria-hidden>
                  <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                {s.address}
              </p>
            )}
            <p className="flex items-center gap-2.5 text-sm text-white/70">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-green" aria-hidden>
                <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
              </svg>
              Gas Safe Reg: {s.gasSafeNumber}
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link href={`/services/${svc.slug}`} className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {svc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Areas</h3>
          <ul className="mt-5 grid grid-cols-2 gap-y-3 gap-x-3 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/emergency-plumber/${c.slug}`} className="text-white/70 hover:text-white transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/areas" className="text-white/70 hover:text-white transition-colors">All UK Areas</Link></li>
            <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">All Services</Link></li>
          </ul>

          <div className="mt-8 flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-semibold text-white/80">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-green" aria-hidden>
                <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
              Gas Safe registered
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-semibold text-white/80">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-yellow-500" aria-hidden>
                <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
              </svg>
              4.9/5 rating
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-semibold text-white/80">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-primary" aria-hidden>
                <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
              </svg>
              {PUBLIC_LIABILITY_COVER} insured
            </span>
          </div>
        </div>
      </div>

      {/* Company trust details band */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-content py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div>
            <div className="font-bold uppercase tracking-wider text-white/50">Legal company</div>
            <div className="mt-1.5 font-semibold text-white">{LEGAL_COMPANY_NAME}</div>
            <div className="mt-0.5 text-white/60">Company No. {COMPANY_NUMBER}</div>
            <div className="text-white/60">{SERVICE_BASE}</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-white/50">VAT</div>
            <div className="mt-1.5 font-semibold text-white">VAT registered</div>
            <div className="mt-0.5 text-white/60">{VAT_NUMBER}</div>
            <div className="text-white/60">All quotes inclusive of VAT</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-white/50">Insurance</div>
            <div className="mt-1.5 font-semibold text-white">{PUBLIC_LIABILITY_COVER} public liability</div>
            <div className="mt-0.5 text-white/60">Underwritten by {INSURANCE_PROVIDER}</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-white/50">Emergency 24/7</div>
            <a href={`tel:${s.phoneTel}`} className="mt-1.5 inline-block font-semibold text-white hover:text-primary transition">
              {s.phoneDisplay}
            </a>
            <div className="mt-0.5 text-white/60">Real dispatcher answers in &lt; 60s</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} {LEGAL_COMPANY_NAME}. All rights reserved.</p>
          <p>Gas Safe registered #{s.gasSafeNumber} · Company No. {COMPANY_NUMBER} · UK nationwide coverage</p>
        </div>
      </div>
    </footer>
  );
}
