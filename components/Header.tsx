'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  brand: string;
  phoneDisplay: string;
  phoneTel: string;
  logoUrl: string;
};

export default function Header({ brand, phoneDisplay, phoneTel, logoUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        scrolled ? 'border-gray-line bg-white/95 backdrop-blur shadow-sm' : 'border-transparent bg-white'
      }`}
    >
      <div className="container-content flex h-20 items-center justify-between md:h-24">
        <Link href="/" aria-label={brand} className="flex items-center gap-2 font-extrabold text-lg md:text-xl">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={brand}
              className="h-16 w-auto max-w-[320px] object-contain md:h-20"
            />
          ) : (
            <>
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
                </svg>
              </span>
              <span className="text-ink">{brand}</span>
            </>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          <Link href="/services" className="text-sm font-medium text-ink hover:text-primary">Services</Link>
          <Link href="/areas" className="text-sm font-medium text-ink hover:text-primary">Areas</Link>
          <Link href="/quote" className="text-sm font-semibold text-primary hover:text-primary-dark">Get a quote</Link>
          <Link href="/about" className="text-sm font-medium text-ink hover:text-primary">About</Link>
          <Link href="/contact" className="text-sm font-medium text-ink hover:text-primary">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneTel}`}
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-dark"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
            </svg>
            {phoneDisplay}
          </a>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-gray-line"
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

      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-gray-line bg-white">
          <div className="container-content py-3 flex flex-col">
            <Link onClick={() => setOpen(false)} href="/services" className="py-3 text-base font-medium border-b border-gray-line">Services</Link>
            <Link onClick={() => setOpen(false)} href="/areas" className="py-3 text-base font-medium border-b border-gray-line">Areas</Link>
            <Link onClick={() => setOpen(false)} href="/quote" className="py-3 text-base font-semibold text-primary border-b border-gray-line">Get a quote</Link>
            <Link onClick={() => setOpen(false)} href="/about" className="py-3 text-base font-medium border-b border-gray-line">About</Link>
            <Link onClick={() => setOpen(false)} href="/contact" className="py-3 text-base font-medium">Contact</Link>
            <a
              href={`tel:${phoneTel}`}
              className="mt-3 mb-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-white"
            >
              Call {phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
