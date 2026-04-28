import Image from 'next/image';
import CallButton from './CallButton';
import TrustBar from './TrustBar';
import { getSettings } from '@/lib/settings';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';

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
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(30,115,190) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="container-content relative py-14 md:py-20 grid gap-10 md:grid-cols-12 md:gap-12 items-center">
        <div className="md:col-span-7">
          {variant !== 'home' && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5 text-sm font-bold text-accent shadow-sm">
              <span className="pulse-dot" /> 24/7 Emergency Response
            </div>
          )}
          <h1 className="tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-base md:text-lg text-gray-soft leading-relaxed">{subtitle}</p>
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
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-line bg-off-white shadow-xl">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Local Gas Safe plumber on a UK emergency callout"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-4 hidden sm:block rounded-2xl bg-white border border-gray-line shadow-xl p-4 max-w-[260px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" />
                  <span className="text-sm font-bold text-primary">Live availability</span>
                </div>
                <div className="text-xs font-medium text-gray-soft">Updated just now</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <Stat label="Avg response" value={responseTime || '30 min'} />
                <Stat label="Today's jobs" value="42" />
                <Stat label="On call" value="120+" />
                <Stat label="Coverage" value="UK-wide" />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 hidden sm:flex rounded-xl bg-accent text-white shadow-lg px-3 py-2 items-center gap-2 text-xs font-bold">
              <span className="pulse-dot bg-white" />
              Available now
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-off-white p-2.5">
      <div className="text-[10px] font-bold uppercase tracking-wide text-gray-soft">{label}</div>
      <div className="mt-0.5 text-sm font-extrabold text-ink leading-tight">{value}</div>
    </div>
  );
}
