'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import QuoteForm from './QuoteForm';

const DISMISS_KEY = 'rf_quote_popup_dismissed_at';
const DISMISS_HOURS = 24;

function isRecentlyDismissed() {
  if (typeof window === 'undefined') return true;
  try {
    const v = window.localStorage.getItem(DISMISS_KEY);
    if (!v) return false;
    const ts = Number(v);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_HOURS * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function QuotePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    if (isRecentlyDismissed()) return;
    setHidden(false);
  }, [pathname]);

  if (hidden) return null;

  const close = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
    setHidden(true);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden md:inline-flex fixed bottom-6 right-4 z-40 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-primary-dark"
        >
          Get a free quote
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-popup-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-gray-soft hover:bg-off-white hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <h2 id="quote-popup-title" className="text-xl font-bold text-ink">
              Get a free quote
            </h2>
            <p className="mt-1 text-sm text-gray-soft">
              Tell us what is wrong and we will reply with a price within an hour.
            </p>
            <div className="mt-4">
              <QuoteForm sourcePage={pathname || '/'} compact draftKey="popup" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
