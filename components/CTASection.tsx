import CallButton from './CallButton';
import { getSettings } from '@/lib/settings';

type Props = { heading?: string; subheading?: string };

export default async function CTASection({
  heading = 'Plumbing emergency right now?',
  subheading = 'A Gas Safe engineer can be with you in minutes. Same rates day or night, including weekends and bank holidays.',
}: Props) {
  const s = await getSettings();
  return (
    <section className="bg-primary text-white">
      <div className="container-content py-16 md:py-20 text-center">
        <h2 className="text-white">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base md:text-lg text-white/90">{subheading}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CallButton size="xl" variant="white" phoneTel={s.phoneTel} phoneDisplay={s.phoneDisplay} />
          <span className="text-sm text-white/80">or call <span className="font-semibold text-white">{s.phoneDisplay}</span></span>
        </div>
      </div>
    </section>
  );
}
