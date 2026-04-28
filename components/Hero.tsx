import CallButton from './CallButton';
import TrustBar from './TrustBar';
import { getSettings } from '@/lib/settings';

type Props = {
  variant?: 'home' | 'city' | 'service';
  title: string;
  subtitle?: string;
  responseTime?: string;
  cityName?: string;
};

export default async function Hero({ variant = 'home', title, subtitle, responseTime }: Props) {
  const s = await getSettings();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-off-white">
      <div className="container-content py-14 md:py-24 grid gap-10 md:grid-cols-12 md:gap-12 items-center">
        <div className="md:col-span-7">
          {variant !== 'home' && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
              <span className="pulse-dot" /> 24/7 Emergency Response
            </div>
          )}
          <h1 className="tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-base md:text-lg text-gray-soft">{subtitle}</p>
          )}
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <CallButton size="xl" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
            <a href="#how-it-works" className="btn-ghost">How it works</a>
          </div>
          <div className="mt-8">
            <TrustBar responseTime={responseTime} />
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative rounded-2xl border border-gray-line bg-white p-6 shadow-xl md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="text-sm font-semibold text-primary">Live availability</span>
              </div>
              <div className="text-xs font-medium text-gray-soft">Updated just now</div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Stat label="Avg response" value={responseTime || '30 min'} />
              <Stat label="Today's jobs" value="42" />
              <Stat label="Engineers on call" value="120+" />
              <Stat label="Coverage" value="UK-wide" />
            </div>
            <div className="mt-6 rounded-lg bg-primary/5 p-4 text-sm text-ink">
              <p className="font-semibold">Burst pipe? Boiler dead? Drain backed up?</p>
              <p className="mt-1 text-gray-soft">A Gas Safe engineer can be on the way in minutes. No call-out surcharge for nights or weekends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-line p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-soft">{label}</div>
      <div className="mt-1 text-xl font-bold text-ink">{value}</div>
    </div>
  );
}
