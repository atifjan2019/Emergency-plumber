import type { Review } from '@/lib/reviews';

type Props = { review: Review };

export default function ReviewCard({ review }: Props) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-gray-line bg-white p-6 transition hover:shadow-md">
      <svg viewBox="0 0 24 24" fill="currentColor" className="absolute right-5 top-5 h-8 w-8 text-primary/10" aria-hidden>
        <path d="M7 7h4v4H7c0 2 1 3 3 3v3c-3 0-6-2-6-6V7zm10 0h4v4h-4c0 2 1 3 3 3v3c-3 0-6-2-6-6V7z" />
      </svg>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-line'}`}
            aria-hidden
          >
            <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
          </svg>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink">"{review.text}"</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-line pt-4 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary font-bold text-sm">
            {review.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <div className="font-bold text-ink text-sm">{review.name}</div>
            <div className="text-gray-soft">
              {review.service} · {new Date(review.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
