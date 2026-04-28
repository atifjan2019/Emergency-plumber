import Image from 'next/image';
import CallButton from './CallButton';
import { getSettings } from '@/lib/settings';
import { PLACEHOLDER_IMAGE } from '@/lib/plumbingContent';

type Props = { heading?: string; subheading?: string };

export default async function CTASection({
  heading = 'Plumbing emergency right now?',
  subheading = 'A Gas Safe engineer can be with you in minutes. Same rates day or night, including weekends and bank holidays.',
}: Props) {
  const s = await getSettings();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark text-white">
      <div className="absolute inset-0 opacity-15" aria-hidden>
        <Image src={PLACEHOLDER_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
      </div>
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <div className="container-content relative py-20 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-bold mb-6">
          <span className="pulse-dot bg-white" /> 24/7 emergency line
        </div>
        <h2 className="text-white max-w-3xl mx-auto">{heading}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/90 leading-relaxed">{subheading}</p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CallButton size="xl" variant="white" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
          <span className="text-sm text-white/80">or call <span className="font-bold text-white">{s.phoneDisplay}</span></span>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs">
          {['Fast response', 'Local plumber', 'Clear quote', 'Same-rate repair'].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 font-bold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                <path strokeLinecap="round" d="M5 12l5 5L20 7" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
