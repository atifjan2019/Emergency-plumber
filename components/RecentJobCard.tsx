import type { RecentJob } from '@/data/recentJobs';

export default function RecentJobCard({ job }: { job: RecentJob }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-line bg-white p-5 transition hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-soft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v4M16 3v4" />
          </svg>
          {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </span>
        <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary">
          {job.postcode}
        </span>
      </div>
      <h4 className="mt-3 font-bold text-ink leading-snug">{job.issue}</h4>
      <p className="mt-2 text-sm text-gray-soft leading-relaxed">{job.resolution}</p>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs text-gray-soft border-t border-gray-line">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-green-dark" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        Resolved in <span className="font-bold text-ink">{job.duration}</span>
      </div>
    </article>
  );
}
