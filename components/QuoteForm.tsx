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
      className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? 'Sending...' : label}
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
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
        <strong className="block text-base">Got it.</strong>
        <span>{state.message}</span>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onChange={(e) => update(readFormDraft(e.currentTarget))}
      className={compact ? 'space-y-3' : 'space-y-4'}
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
        className="w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        autoComplete="tel"
        className="w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {!compact && (
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          autoComplete="email"
          className="w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      )}
      <textarea
        name="message"
        required
        rows={compact ? 2 : 3}
        placeholder={cityName ? `What is the issue in ${cityName}?` : 'What is the issue?'}
        className="w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />

      {state.message && !state.ok && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} />
      <p className="text-xs text-gray-soft">
        For emergencies, calling is faster. Quote replies within 1 hour during the day.
      </p>
    </form>
  );
}
