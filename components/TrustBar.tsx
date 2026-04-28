import { GAS_SAFE_NUMBER, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';

type Props = { responseTime?: string; variant?: 'light' | 'dark' };

export default function TrustBar({ responseTime, variant = 'light' }: Props) {
  const dark = variant === 'dark';
  const textColor = dark ? 'text-white' : 'text-ink';
  const subColor = dark ? 'text-white/70' : 'text-gray-soft';
  const cardBg = dark ? 'bg-white/5 border-white/15' : 'bg-white border-gray-line';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${textColor}`}>
      <div className={`flex items-center gap-2.5 rounded-xl border ${cardBg} px-3.5 py-2.5 shadow-sm`}>
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${dark ? 'bg-white/10' : 'bg-primary/10'} text-primary`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden>
            <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
          </svg>
        </span>
        <div>
          <div className="text-sm font-bold leading-tight">Gas Safe</div>
          <div className={`text-[11px] ${subColor}`}>Reg #{GAS_SAFE_NUMBER}</div>
        </div>
      </div>

      <div className={`flex items-center gap-2.5 rounded-xl border ${cardBg} px-3.5 py-2.5 shadow-sm`}>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-yellow-500" aria-hidden>
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
            </svg>
          ))}
        </div>
        <div>
          <div className="text-sm font-bold leading-tight">{NATIONWIDE_RATING}/5</div>
          <div className={`text-[11px] ${subColor}`}>{NATIONWIDE_REVIEW_COUNT.toLocaleString()} reviews</div>
        </div>
      </div>

      {responseTime && (
        <div className={`flex items-center gap-2.5 rounded-xl border ${cardBg} px-3.5 py-2.5 shadow-sm`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-green/15 text-green-dark">
            <span className="pulse-dot bg-green-dark" />
          </span>
          <div>
            <div className="text-sm font-bold leading-tight">Available now</div>
            <div className={`text-[11px] ${subColor}`}>~{responseTime} response</div>
          </div>
        </div>
      )}
    </div>
  );
}
