import type { RecentJob } from '@/data/recentJobs';

export default function RecentJobCard({ job }: { job: RecentJob }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-line bg-white p-5">
      <div className="flex items-center justify-between text-xs font-semibold text-gray-soft">
        <span>
          {new Date(job.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </span>
        <span className="rounded-md bg-off-white px-2 py-0.5 font-mono text-ink">{job.postcode}</span>
      </div>
      <h4 className="mt-3 font-semibold text-ink">{job.issue}</h4>
      <p className="mt-2 text-sm text-gray-soft">{job.resolution}</p>
      <div className="mt-auto pt-4 text-xs text-gray-soft border-t border-gray-line">
        Resolved in <span className="font-semibold text-ink">{job.duration}</span>
      </div>
    </article>
  );
}
