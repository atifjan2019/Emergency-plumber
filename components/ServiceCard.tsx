import Link from 'next/link';
import ServiceIcon from './ServiceIcon';

type Props = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  cityContext?: string;
  href?: string;
};

export default function ServiceCard({ slug, name, description, icon, cityContext, href }: Props) {
  return (
    <Link
      href={href || `/services/${slug}`}
      className="group relative flex h-full flex-col rounded-xl border border-gray-line bg-white p-6 transition hover:border-primary hover:shadow-lg"
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
        <ServiceIcon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{name}</h3>
      <p className="mt-2 text-sm text-gray-soft">
        {cityContext ? `${name} in ${cityContext}. ${description}` : description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
