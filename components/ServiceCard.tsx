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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-line bg-white p-6 transition hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5"
    >
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/5 transition group-hover:bg-primary/10" aria-hidden />
      <div className="relative">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/30 transition group-hover:scale-110">
          <ServiceIcon name={icon} className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-lg font-bold text-ink group-hover:text-primary transition-colors">{name}</h3>
        <p className="mt-2 text-sm text-gray-soft leading-relaxed">
          {cityContext ? `${name} in ${cityContext}. ${description}` : description}
        </p>
      </div>
      <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        Learn more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden>
          <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
