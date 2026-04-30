'use client';

import { useEffect, useMemo, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead, type LeadFormState } from '@/app/actions/leads';
import { useDraftCapture, readFormDraft } from '@/lib/useDraftCapture';
import { cities } from '@/data/cities';
import { isUkPostcodeArea, extractArea } from '@/lib/ukPostcodes';

function checkPostcodeCoverage(raw: string) {
  const cleaned = raw.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length < 2) return { state: 'idle' as const };
  const m = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
  if (!m) return { state: 'idle' as const };
  const outward = m[1];
  for (const city of cities) {
    for (const p of city.postcodes) {
      if (outward === p) return { state: 'city' as const, city, outward };
      if (/^[A-Z]+$/.test(p) && outward.startsWith(p)) {
        const next = outward[p.length];
        if (next && /\d/.test(next)) return { state: 'city' as const, city, outward };
      }
    }
  }
  const area = extractArea(outward);
  if (area && isUkPostcodeArea(area)) {
    return { state: 'uk' as const, outward };
  }
  return { state: 'idle' as const };
}

const initial: LeadFormState = { ok: false, message: '' };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
          </svg>
          Sending...
        </>
      ) : (
        <>
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}

type Props = {
  sourcePage?: string;
  citySlug?: string;
  cityName?: string;
  compact?: boolean;
  submitLabel?: string;
  draftKey?: string;
};

export default function QuoteForm({
  sourcePage = '',
  citySlug = '',
  cityName,
  compact = false,
  submitLabel = 'Get a free quote',
  draftKey = 'quote',
}: Props) {
  const [state, formAction] = useActionState(submitLead, initial);
  const { draftId, update, clearDraft } = useDraftCapture(draftKey);
  const [postcode, setPostcode] = useState('');
  const coverage = useMemo(() => checkPostcodeCoverage(postcode), [postcode]);

  useEffect(() => {
    if (state.ok) clearDraft();
  }, [state.ok, clearDraft]);

  if (state.ok) {
    return (
      <div className="rounded-2xl border-2 border-green/40 bg-green/5 p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green/15 text-green-dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-6 w-6" aria-hidden>
            <path strokeLinecap="round" d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <strong className="mt-3 block text-lg font-bold text-ink">Got it.</strong>
        <p className="mt-1 text-sm text-gray-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onChange={(e) => update(readFormDraft(e.currentTarget))}
      className={compact ? 'space-y-3' : 'space-y-3.5'}
      noValidate
    >
      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="draft_id" value={draftId} />
      {citySlug && <input type="hidden" name="city_slug" value={citySlug} />}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0"
      />

      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        autoComplete="name"
        className="w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        autoComplete="tel"
        className="w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
      />
      {!compact && (
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          autoComplete="email"
          className="w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
        />
      )}

      <div className="relative">
        <input
          type="text"
          name="postcode"
          placeholder="Postcode (e.g. SW1A 1AA)"
          autoComplete="postal-code"
          spellCheck={false}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className={`w-full rounded-xl border-2 bg-white px-4 py-3 pr-32 text-base uppercase tracking-wider text-ink shadow-sm focus:outline-none focus:ring-4 transition-colors ${
            coverage.state === 'city' || coverage.state === 'uk'
              ? 'border-green/50 focus:border-green focus:ring-green/15'
              : 'border-gray-line focus:border-primary focus:ring-primary/15'
          }`}
        />
        {(coverage.state === 'city' || coverage.state === 'uk') && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-green/15 px-2.5 py-1 text-xs font-bold text-green-dark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
              <path strokeLinecap="round" d="M5 12l5 5L20 7" />
            </svg>
            {coverage.state === 'city' ? coverage.city.name : 'Yes'}
          </span>
        )}
      </div>
      {coverage.state === 'city' && (
        <p className="-mt-1 text-xs text-green-dark font-semibold">
          We cover {coverage.city.name} ({coverage.city.region}) - typical response ~{coverage.city.responseTime}.
        </p>
      )}
      {coverage.state === 'uk' && (
        <p className="-mt-1 text-xs text-green-dark font-semibold">
          Yes, we can help in {coverage.outward} - we will confirm response time on call.
        </p>
      )}

      <div className={compact ? 'grid gap-3' : 'grid gap-3.5 sm:grid-cols-2'}>
        <label className="block">
          <span className="sr-only">Service type</span>
          <select
            name="service_type"
            required
            defaultValue=""
            className="w-full appearance-none rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors bg-no-repeat bg-right pr-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23666\' stroke-width=\'2\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="" disabled>Service type</option>
            <option value="Emergency repair">Emergency repair</option>
            <option value="Burst pipe / leak">Burst pipe / leak</option>
            <option value="Drain blockage">Drain blockage</option>
            <option value="Boiler / heating">Boiler / heating</option>
            <option value="Bathroom / kitchen plumbing">Bathroom / kitchen plumbing</option>
            <option value="Tap, toilet or fixture">Tap, toilet or fixture</option>
            <option value="Pipe installation / replacement">Pipe installation / replacement</option>
            <option value="Other / not sure">Other / not sure</option>
          </select>
        </label>
        <label className="block">
          <span className="sr-only">How urgent</span>
          <select
            name="urgency"
            required
            defaultValue=""
            className="w-full appearance-none rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors bg-no-repeat bg-right pr-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23666\' stroke-width=\'2\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <option value="" disabled>How urgent?</option>
            <option value="Emergency now">Emergency now (within 2 hours)</option>
            <option value="Today">Today</option>
            <option value="This week">This week</option>
            <option value="Scheduled / quote only">Scheduled / quote only</option>
          </select>
        </label>
      </div>

      <textarea
        name="message"
        required
        rows={compact ? 2 : 3}
        placeholder={cityName ? `What is the issue in ${cityName}?` : 'What is the issue?'}
        className="w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
      />

      {state.message && !state.ok && (
        <p className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} />
      <p className="text-xs text-gray-soft text-center">
        For emergencies, calling is faster. Quote replies within 1 hour during the day.
      </p>
    </form>
  );
}
