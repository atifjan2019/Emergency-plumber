'use client';

import { useEffect, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead, type LeadFormState } from '@/app/actions/leads';
import { useDraftCapture, readFormDraft } from '@/lib/useDraftCapture';

const initial: LeadFormState = { ok: false, message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60"
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
          Send message
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function ContactForm({ sourcePage = '/contact' }: { sourcePage?: string }) {
  const [state, formAction] = useActionState(submitLead, initial);
  const { draftId, update, clearDraft } = useDraftCapture('contact');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) clearDraft();
  }, [state.ok, clearDraft]);

  if (state.ok) {
    return (
      <div className="rounded-2xl border-2 border-green/40 bg-green/5 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green-dark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-7 w-7" aria-hidden>
            <path strokeLinecap="round" d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">Message received</h3>
        <p className="mt-2 text-sm text-gray-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={(e) => update(readFormDraft(e.currentTarget))}
      className="space-y-5"
      noValidate
    >
      <input type="hidden" name="source_page" value={sourcePage} />
      <input type="hidden" name="draft_id" value={draftId} />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field label="City or postcode" name="city_slug" />

      <label className="block">
        <span className="text-sm font-bold text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
        />
      </label>

      {state.message && !state.ok && (
        <p className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {state.message}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <SubmitButton />
        <p className="text-xs text-gray-soft">
          Reply within 1 working day. For emergencies, please call.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-xl border-2 border-gray-line bg-white px-4 py-3 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
      />
    </label>
  );
}
