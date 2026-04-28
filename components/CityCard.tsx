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
      className="group flex flex-col justify-between rounded-xl border border-gray-line bg-white p-5 transition hover:border-primary hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink">{name}</h3>
          <span className="pill">~{responseTime}</span>
        </div>
        <p className="mt-1 text-sm text-gray-soft">{region}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-0.5 transition">
        View coverage
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
