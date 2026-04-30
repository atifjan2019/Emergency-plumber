'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  brand: string;
  phoneDisplay: string;
  phoneTel: string;
  logoUrl: string;
};

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/areas', label: 'Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ brand, phoneDisplay, phoneTel, logoUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div className="bg-primary-dark text-white text-xs font-medium py-2 hidden md:block">
        <div className="container-content flex items-center justify-between">
          <span className="flex items-center gap-2 text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-green animate-pulse" />
            Available 24/7 · Emergency response within 30 minutes
          </span>
          <div className="flex items-center gap-5 text-white/80">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
              </svg>
              Gas Safe registered
            </span>
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-1.5 text-white hover:text-white/90 font-semibold transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
              </svg>
              {phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={`w-full bg-white transition-all duration-200 ${scrolled ? 'shadow-md border-b border-gray-line' : 'border-b border-gray-line/60'}`}>
        <div className="container-content flex h-[70px] md:h-[84px] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label={brand} className="shrink-0 flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brand}
                width={180}
                height={40}
                className="h-9 md:h-10 w-auto max-w-[180px] object-contain"
              />
            ) : (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/30">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                    <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                  </svg>
                </span>
                <span className="font-extrabold text-base md:text-lg leading-none text-ink">
                  {brand}
                </span>
              </>
            )}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-soft hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/quote"
              className="rounded-lg border-2 border-primary/20 bg-white text-primary px-4 py-2 text-sm font-semibold hover:border-primary hover:bg-primary/5 transition-colors"
            >
              Get a quote
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/30 hover:bg-accent-dark transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
              </svg>
              {phoneDisplay}
            </a>
          </div>

          {/* Mobile: call + burger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
              </svg>
              Call now
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-gray-line text-ink hover:bg-off-white transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
                {open ? (
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 top-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <nav
            aria-label="Mobile"
            className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-primary to-primary-dark text-white">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                  </svg>
                </span>
                <span className="font-bold text-sm leading-tight">{brand}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-semibold text-ink hover:bg-off-white hover:text-primary transition-colors"
                >
                  {label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-soft" aria-hidden>
                    <path strokeLinecap="round" d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
              <div className="my-2 h-px bg-gray-line" />
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                Get a quote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="p-4 border-t border-gray-line space-y-2">
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3.5 text-base font-bold text-white w-full hover:bg-accent-dark shadow-md shadow-accent/30 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                  <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
                </svg>
                Call {phoneDisplay}
              </a>
              <p className="text-center text-xs text-gray-soft">
                Available 24/7 · Emergency response within 30 minutes
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
