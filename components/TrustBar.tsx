import { GAS_SAFE_NUMBER, NATIONWIDE_RATING, NATIONWIDE_REVIEW_COUNT } from '@/lib/constants';

type Props = { responseTime?: string; variant?: 'light' | 'dark'; gasSafeNumber?: string };

export default function TrustBar({ responseTime, variant = 'light', gasSafeNumber }: Props) {
  const gasSafe = gasSafeNumber || GAS_SAFE_NUMBER;
  const dark = variant === 'dark';
  const textColor = dark ? 'text-white' : 'text-ink';
  const subColor = dark ? 'text-white/70' : 'text-gray-soft';
  const divider = dark ? 'bg-white/15' : 'bg-gray-line';
  const wrap = dark
    ? 'border border-white/15 bg-white/5'
    : 'border border-gray-line bg-white';

  return (
    <div className={`flex items-stretch overflow-hidden rounded-xl shadow-sm ${wrap} ${textColor}`}>
      {/* Gas Safe - desktop/tablet only */}
      <div className="hidden sm:flex flex-1 items-center gap-2.5 px-4 py-3 min-w-0">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${dark ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
          </svg>
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-sm font-bold truncate">Gas Safe</div>
          <div className={`text-[11px] truncate ${subColor}`}>#{gasSafe}</div>
        </div>
      </div>

      <span className={`hidden sm:block my-2 w-px ${divider}`} aria-hidden />

      {/* Rating */}
      <div className="flex flex-1 items-center gap-2 px-2.5 py-2.5 sm:gap-2.5 sm:px-4 sm:py-3 min-w-0">
        <span className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg bg-yellow-500/15 text-yellow-600">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
          </svg>
        </span>
        <div className="min-w-0 leading-tight">
          <div className="text-xs sm:text-sm font-bold truncate">{NATIONWIDE_RATING}/5</div>
          <div className={`text-[10px] sm:text-[11px] truncate ${subColor}`}>{NATIONWIDE_REVIEW_COUNT.toLocaleString()}+ reviews</div>
        </div>
      </div>

      {responseTime && (
        <>
          <span className={`my-2 w-px ${divider}`} aria-hidden />
          <div className="flex flex-1 items-center gap-2 px-2.5 py-2.5 sm:gap-2.5 sm:px-4 sm:py-3 min-w-0">
            <span className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg bg-green/15 text-green-dark">
              <span className="block h-2 w-2 rounded-full bg-green-dark animate-pulse" />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="text-xs sm:text-sm font-bold truncate">Available now</div>
              <div className={`text-[10px] sm:text-[11px] truncate ${subColor}`}>~{responseTime}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
