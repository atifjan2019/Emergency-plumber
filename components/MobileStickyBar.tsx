import { getSettings } from '@/lib/settings';

export default async function MobileStickyBar() {
  const s = await getSettings();
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-gray-line bg-white px-3 py-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={`tel:${s.phoneTel}`}
        aria-label={`Call ${s.phoneDisplay} - 24/7 emergency plumber`}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-base font-semibold text-white"
      >
        <span className="pulse-dot bg-white" />
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
        </svg>
        Call now · {s.phoneDisplay}
      </a>
    </div>
  );
}
