'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead, type LeadFormState } from '@/app/actions/leads';
import { useDraftCapture, readFormDraft } from '@/lib/useDraftCapture';

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
