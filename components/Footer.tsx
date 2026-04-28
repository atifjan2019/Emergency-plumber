import Link from 'next/link';
import { cities } from '@/data/cities';
import { services } from '@/data/services';
import { getSettings } from '@/lib/settings';

export default async function Footer() {
  const s = await getSettings();

  return (
    <footer className="mt-16 border-t border-gray-line bg-off-white">
      <div className="container-content py-14 grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg">
            {s.logoUrl ? (
              <img
                src={s.logoUrl}
                alt={s.brand}
                className="h-12 w-auto max-w-[220px] object-contain"
              />
            ) : (
              <>
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                    <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                  </svg>
                </span>
                <span>{s.brand}</span>
              </>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-soft">
            24/7 emergency plumbing across the UK. Gas Safe registered. No call-out surcharge for nights or weekends.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={`tel:${s.phoneTel}`} className="block font-semibold text-primary hover:text-primary-dark">
              {s.phoneDisplay}
            </a>
            <a href={`mailto:${s.email}`} className="block text-gray-soft hover:text-ink">{s.email}</a>
            {s.address && <p className="text-gray-soft">{s.address}</p>}
            <p className="text-gray-soft">Gas Safe Reg: {s.gasSafeNumber}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link href={`/services/${svc.slug}`} className="text-gray-soft hover:text-primary">
                  {svc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Areas</h3>
          <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/emergency-plumber/${c.slug}`} className="text-gray-soft hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="text-gray-soft hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="text-gray-soft hover:text-primary">Contact</Link></li>
            <li><Link href="/areas" className="text-gray-soft hover:text-primary">All UK Areas</Link></li>
            <li><Link href="/services" className="text-gray-soft hover:text-primary">All Services</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-line">
        <div className="container-content py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-soft">
          <p>© {new Date().getFullYear()} {s.brand}. All rights reserved.</p>
          <p>Gas Safe registered #{s.gasSafeNumber} · UK nationwide coverage</p>
        </div>
      </div>
    </footer>
  );
}
