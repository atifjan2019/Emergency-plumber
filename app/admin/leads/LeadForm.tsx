'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createLead, updateLead, type LeadActionState } from './actions';

const initial: LeadActionState = { ok: false, message: '' };

type LeadDefaults = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  city_slug?: string;
  message?: string;
  source_page?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? 'Saving...' : label}
    </button>
  );
}

export default function LeadForm({
  mode,
  defaults = {},
}: {
  mode: 'create' | 'edit';
  defaults?: LeadDefaults;
}) {
  const action = mode === 'edit' ? updateLead : createLead;
  const [state, formAction] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-5">
      {mode === 'edit' && defaults.id && (
        <input type="hidden" name="id" value={defaults.id} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required defaultValue={defaults.name} />
        <Field label="Phone" name="phone" type="tel" defaultValue={defaults.phone} />
        <Field label="Email" name="email" type="email" defaultValue={defaults.email} />
        <Field label="City slug" name="city_slug" defaultValue={defaults.city_slug} placeholder="london" />
      </div>

      <Field label="Source page" name="source_page" defaultValue={defaults.source_page} placeholder="/contact" />

      <label className="block">
        <span className="text-sm font-semibold text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          defaultValue={defaults.message}
          className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {state.message && !state.ok && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SubmitButton label={mode === 'edit' ? 'Save changes' : 'Create lead'} />
        <a href="/admin" className="text-sm font-semibold text-gray-soft hover:text-ink">
          Cancel
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
