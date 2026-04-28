'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveSettings, type SettingsFormState } from './actions';

const initial: SettingsFormState = { ok: false, message: '' };

type Props = {
  defaults: {
    brand: string;
    phoneDisplay: string;
    phoneTel: string;
    email: string;
    address: string;
    gasSafeNumber: string;
    siteUrl: string;
    faviconUrl: string;
    logoUrl: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? 'Saving...' : 'Save settings'}
    </button>
  );
}

export default function SettingsForm({ defaults }: Props) {
  const [state, action] = useActionState(saveSettings, initial);
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Brand / company name" name="brand" defaultValue={defaults.brand} required />
        <Field label="Site URL" name="site_url" defaultValue={defaults.siteUrl} type="url" />
        <Field label="Phone (display)" name="phone_display" defaultValue={defaults.phoneDisplay} required />
        <Field label="Phone (tel: link)" name="phone_tel" defaultValue={defaults.phoneTel} required />
        <Field label="Email" name="email" defaultValue={defaults.email} type="email" required />
        <Field label="Gas Safe number" name="gas_safe_number" defaultValue={defaults.gasSafeNumber} />
      </div>

      <Field label="Address" name="address" defaultValue={defaults.address} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FileField
          label="Logo"
          name="logo"
          currentUrl={defaults.logoUrl}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
        />
        <FileField
          label="Favicon"
          name="favicon"
          currentUrl={defaults.faviconUrl}
          accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
        />
      </div>

      {state.message && (
        <p
          className={`rounded-lg border px-3 py-2 text-sm ${
            state.ok
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
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
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function FileField({
  label,
  name,
  currentUrl,
  accept,
}: {
  label: string;
  name: string;
  currentUrl: string;
  accept: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-1.5 rounded-lg border border-gray-line bg-white p-3">
        {currentUrl ? (
          <div className="mb-3 flex items-center gap-3">
            <img src={currentUrl} alt="" className="h-12 w-12 rounded object-contain border border-gray-line" />
            <span className="break-all text-xs text-gray-soft">{currentUrl}</span>
          </div>
        ) : (
          <p className="mb-3 text-xs text-gray-soft">No {label.toLowerCase()} uploaded yet.</p>
        )}
        <input
          type="file"
          name={name}
          accept={accept}
          className="block w-full text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
        />
        <p className="mt-2 text-xs text-gray-soft">Upload to replace. Max 2 MB.</p>
      </div>
    </label>
  );
}
