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
      className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? 'Sending...' : 'Send message'}
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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-900">Message received</h3>
        <p className="mt-2 text-sm text-green-800">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={(e) => update(readFormDraft(e.currentTarget))}
      className="space-y-4"
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
        <span className="text-sm font-semibold text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {state.message && !state.ok && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
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
      <span className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
