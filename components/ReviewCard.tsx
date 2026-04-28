import type { Review } from '@/lib/reviews';

type Props = { review: Review };

export default function ReviewCard({ review }: Props) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-line bg-white p-6">
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
      <p className="mt-3 text-sm leading-relaxed text-ink">"{review.text}"</p>
      <div className="mt-4 flex items-center justify-between border-t border-gray-line pt-4 text-xs text-gray-soft">
        <span className="font-semibold text-ink">{review.name}</span>
        <span>
          {review.service} · {new Date(review.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </article>
  );
}
