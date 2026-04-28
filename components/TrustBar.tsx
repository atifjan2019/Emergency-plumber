import { GAS_SAFE_NUMBER, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';

type Props = { responseTime?: string; variant?: 'light' | 'dark' };

export default function TrustBar({ responseTime, variant = 'light' }: Props) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-ink';
  const subColor = variant === 'dark' ? 'text-white/70' : 'text-gray-soft';
  const borderColor = variant === 'dark' ? 'border-white/15' : 'border-gray-line';

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${textColor}`}>
      <div className={`flex items-center gap-2 border-r ${borderColor} pr-6`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-primary" aria-hidden>
          <path d="M12 2L2 6v6c0 5.5 4 9.7 10 11 6-1.3 10-5.5 10-11V6l-10-4z" />
        </svg>
        <div>
          <div className="text-sm font-semibold leading-tight">Gas Safe</div>
          <div className={`text-xs ${subColor}`}>Reg #{GAS_SAFE_NUMBER}</div>
        </div>
      </div>
      <div className={`flex items-center gap-2 border-r ${borderColor} pr-6`}>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-yellow-500" aria-hidden>
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
            </svg>
          ))}
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">{NATIONWIDE_RATING}/5</div>
          <div className={`text-xs ${subColor}`}>{NATIONWIDE_REVIEW_COUNT.toLocaleString()} reviews</div>
        </div>
      </div>
      {responseTime && (
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <div>
            <div className="text-sm font-semibold leading-tight">Available now</div>
            <div className={`text-xs ${subColor}`}>~{responseTime} response</div>
          </div>
        </div>
      )}
    </div>
  );
}
