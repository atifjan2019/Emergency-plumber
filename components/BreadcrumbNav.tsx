import Link from 'next/link';

export type Crumb = { label: string; href?: string };

export default function BreadcrumbNav({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-gray-soft">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="rounded-md px-1.5 py-1 hover:bg-primary/5 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`px-1.5 py-1 ${isLast ? 'font-bold text-ink' : ''}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-gray-line" aria-hidden>
                  <path strokeLinecap="round" d="M9 6l6 6-6 6" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
