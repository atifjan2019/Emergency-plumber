'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileStickyBar() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets: Element[] = [];
    const hero = document.querySelector<HTMLElement>('[data-hide-sticky="hero"]');
    const footer = document.querySelector('footer');
    if (hero) targets.push(hero);
    if (footer) targets.push(footer);

    if (targets.length === 0) {
      setHidden(false);
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.05, rootMargin: '0px 0px -120px 0px' },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-gray-line bg-white px-3 py-2.5 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        hidden ? 'translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <Link
        href="/quote"
        tabIndex={hidden ? -1 : 0}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-white shadow-md shadow-primary/30 hover:bg-primary-dark transition"
      >
        Get a free quote
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
