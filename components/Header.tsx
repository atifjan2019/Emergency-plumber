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

      {/* Top bar — navy */}
      <div className="bg-navy text-white text-xs font-medium py-2 hidden md:block">
        <div className="container-content flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-300">
            <span className="inline-block h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Available 24/7 · Emergency response within 30 minutes
          </span>
          <a
            href={`tel:${phoneTel}`}
            className="flex items-center gap-1.5 text-secondary hover:text-white font-semibold transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
              <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
            </svg>
            {phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-line'
            : 'bg-white border-b border-gray-line'
        }`}
      >
        <div className="container-content flex h-[90px] md:h-[106px] items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" aria-label={brand} className="shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brand}
                className="h-8 w-auto max-w-[150px] object-contain"
              />
            ) : (
              <div className="flex items-center gap-2 font-extrabold text-lg text-navy">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                    <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                  </svg>
                </span>
                {brand}
              </div>
            )}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-soft hover:text-navy hover:bg-gray-50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/quote"
              className="rounded-lg border-2 border-secondary text-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary hover:text-white transition-colors"
            >
              Get a quote
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark transition-colors"
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
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
              </svg>
              Call now
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg border border-gray-line hover:bg-gray-50 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
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
        <div className="md:hidden fixed inset-0 top-0 z-40 bg-black/50" onClick={() => setOpen(false)}>
          <nav
            aria-label="Mobile"
            className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy text-white">
              <span className="font-semibold text-sm">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
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
                  className="px-4 py-3 rounded-lg text-base font-medium text-ink hover:bg-gray-50 hover:text-secondary transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-semibold text-secondary hover:bg-blue-50 transition-colors"
              >
                Get a quote
              </Link>
            </div>

            <div className="p-4 border-t border-gray-line">
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-base font-semibold text-white w-full hover:bg-accent-dark transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                  <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
                </svg>
                Call {phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
