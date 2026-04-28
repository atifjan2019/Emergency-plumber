import Link from 'next/link';
import type { ReactNode } from 'react';

type NavKey = 'leads' | 'drafts' | 'activity' | 'settings';

const NAV: { key: NavKey; label: string; href: string; icon: ReactNode }[] = [
  {
    key: 'leads',
    label: 'Leads',
    href: '/admin',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    key: 'drafts',
    label: 'Abandoned drafts',
    href: '/admin/drafts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v6h6" />
      </svg>
    ),
  },
  {
    key: 'activity',
    label: 'Activity log',
    href: '/admin/activity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    key: 'settings',
    label: 'Site settings',
    href: '/admin/settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.34 1.86l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.86-.34 1.7 1.7 0 00-1.03 1.56V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1.11-1.56 1.7 1.7 0 00-1.86.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.86 1.7 1.7 0 00-1.56-1.03H3a2 2 0 110-4h.09A1.7 1.7 0 004.65 9a1.7 1.7 0 00-.34-1.86l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.86.34H9a1.7 1.7 0 001.03-1.56V3a2 2 0 114 0v.09a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.86-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.86V9c.18.45.6.92 1.56 1.03H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.51 1z" />
      </svg>
    ),
  },
];

type Props = {
  active: NavKey;
  brand: string;
  children: ReactNode;
};

export default function AdminShell({ active, brand, children }: Props) {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <aside className="md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 border-b md:border-b-0 md:border-r border-gray-line bg-white">
          <div className="flex h-16 items-center gap-2 border-b border-gray-line px-5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M12 2C8 6 6 9 6 13a6 6 0 0012 0c0-4-2-7-6-11z" />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold text-ink">{brand}</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-soft">Admin console</div>
            </div>
          </div>

          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto p-3">
            {NAV.map((item) => {
              const isActive = item.key === active;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-ink hover:bg-off-white hover:text-primary'
                  }`}
                >
                  <span className={isActive ? 'text-primary' : 'text-gray-soft'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-gray-line p-3">
            <form action="/admin/logout" method="post">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-off-white hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5 text-gray-soft" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-5xl px-5 py-8 md:px-10 md:py-12">{children}</div>
        </main>
      </div>
    </div>
  );
}
