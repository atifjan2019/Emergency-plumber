import Link from 'next/link';

type Props = {
  slug: string;
  name: string;
  region: string;
  responseTime: string;
};

export default function CityCard({ slug, name, region, responseTime }: Props) {
  return (
    <Link
      href={`/emergency-plumber/${slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-line bg-white p-6 transition hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 transition group-hover:bg-primary/10" aria-hidden />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-primary" aria-hidden>
                <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              City
            </span>
            <h3 className="mt-1 text-xl font-bold text-ink group-hover:text-primary transition-colors">{name}</h3>
            <p className="mt-1 text-sm text-gray-soft">{region}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2.5 py-1 text-xs font-bold text-green-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            ~{responseTime}
          </span>
        </div>
      </div>
      <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        View coverage
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
