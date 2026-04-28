'use client';

import { usePathname } from 'next/navigation';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'ghost' | 'white';
  label?: string;
  className?: string;
  ariaLabel?: string;
  phoneTel?: string;
  phoneDisplay?: string;
};

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3.5 text-base',
  lg: 'px-7 py-4 text-lg',
  xl: 'px-8 py-5 text-xl md:text-2xl',
};

const variantMap: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-accent text-white shadow-lg hover:bg-accent-dark',
  ghost: 'bg-white border border-gray-line text-ink hover:border-ink',
  white: 'bg-white text-accent hover:bg-off-white',
};

function citySlugFromPath(pathname: string | null): string | null {
  if (!pathname) return null;
  const m = pathname.match(/^\/emergency-plumber\/([^/]+)/);
  return m ? m[1] : null;
}

function fireTrack(pathname: string | null) {
  if (typeof window === 'undefined') return;
  const payload = JSON.stringify({
    source_page: pathname || '/',
    city_slug: citySlugFromPath(pathname),
  });
  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/track-call', blob);
      return;
    }
  } catch {}
  try {
    fetch('/api/track-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export default function CallButton({
  size = 'lg',
  variant = 'primary',
  label,
  className = '',
  ariaLabel,
  phoneTel,
  phoneDisplay,
}: Props) {
  const pathname = usePathname();
  const tel = phoneTel || PHONE_TEL;
  const display = phoneDisplay || PHONE_DISPLAY;

  return (
    <a
      href={`tel:${tel}`}
      onClick={() => fireTrack(pathname)}
      aria-label={ariaLabel || `Call ${display} - 24/7 emergency plumber`}
      className={`inline-flex items-center justify-center gap-3 rounded-lg font-semibold transition active:scale-[0.98] ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 shrink-0"
        aria-hidden
      >
        <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
      </svg>
      <span>{label || `Call ${display}`}</span>
    </a>
  );
}
