'use client';

import { useActionState, useState } from 'react';
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
    metaTitleDefault: string;
    metaDescriptionDefault: string;
    ogImageUrl: string;
    twitterHandle: string;
    googleSiteVerification: string;
    bingSiteVerification: string;
    gtmId: string;
    gaId: string;
    clarityId: string;
    keywords: string;
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
  const [logoRemoved, setLogoRemoved] = useState(false);
  const [faviconRemoved, setFaviconRemoved] = useState(false);

  return (
    <form action={action} className="space-y-10">
      <section>
        <SectionTitle title="Company details" subtitle="Phone, email and address shown across the site." />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Brand / company name" name="brand" defaultValue={defaults.brand} required />
          <Field label="Site URL" name="site_url" defaultValue={defaults.siteUrl} type="url" />
          <Field label="Phone (display)" name="phone_display" defaultValue={defaults.phoneDisplay} required />
          <Field label="Phone (tel: link)" name="phone_tel" defaultValue={defaults.phoneTel} required />
          <Field label="Email" name="email" defaultValue={defaults.email} type="email" required />
          <Field label="Gas Safe number" name="gas_safe_number" defaultValue={defaults.gasSafeNumber} />
        </div>
        <div className="mt-4">
          <Field label="Address" name="address" defaultValue={defaults.address} />
        </div>
      </section>

      <section>
        <SectionTitle title="Brand assets" subtitle="Uploaded to R2 and used across the site." />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Logo with remove option */}
          <div>
            <span className="text-sm font-semibold text-ink">Logo</span>
            <div className="mt-1.5 rounded-lg border border-gray-line bg-white p-3">
              {defaults.logoUrl && !logoRemoved ? (
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={defaults.logoUrl}
                    alt=""
                    className="h-12 w-12 rounded object-contain border border-gray-line"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="break-all text-xs text-gray-soft block">{defaults.logoUrl}</span>
                    <button
                      type="button"
                      onClick={() => setLogoRemoved(true)}
                      className="mt-1.5 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      Remove logo
                    </button>
                  </div>
                </div>
              ) : logoRemoved ? (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs text-gray-soft italic">Logo will be removed on save.</span>
                  <button
                    type="button"
                    onClick={() => setLogoRemoved(false)}
                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <p className="mb-3 text-xs text-gray-soft">No logo uploaded yet.</p>
              )}
              {logoRemoved && <input type="hidden" name="remove_logo" value="1" />}
              <input
                type="file"
                name="logo"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="block w-full text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
              />
              <p className="mt-2 text-xs text-gray-soft">Upload to replace. Max 4 MB. Stored in R2.</p>
            </div>
          </div>

          {/* Favicon with remove option */}
          <div>
            <span className="text-sm font-semibold text-ink">Favicon</span>
            <div className="mt-1.5 rounded-lg border border-gray-line bg-white p-3">
              {defaults.faviconUrl && !faviconRemoved ? (
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={defaults.faviconUrl}
                    alt=""
                    className="h-12 w-12 rounded object-contain border border-gray-line"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="break-all text-xs text-gray-soft block">{defaults.faviconUrl}</span>
                    <button
                      type="button"
                      onClick={() => setFaviconRemoved(true)}
                      className="mt-1.5 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      Remove favicon
                    </button>
                  </div>
                </div>
              ) : faviconRemoved ? (
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs text-gray-soft italic">Favicon will be removed on save.</span>
                  <button
                    type="button"
                    onClick={() => setFaviconRemoved(false)}
                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <p className="mb-3 text-xs text-gray-soft">No favicon uploaded yet.</p>
              )}
              {faviconRemoved && <input type="hidden" name="remove_favicon" value="1" />}
              <input
                type="file"
                name="favicon"
                accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
                className="block w-full text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
              />
              <p className="mt-2 text-xs text-gray-soft">Upload to replace. Max 4 MB. Stored in R2.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle
          title="SEO defaults"
          subtitle="Used as the global fallback. Page-specific titles still override these."
        />
        <div className="mt-5 grid gap-4">
          <Field
            label="Default meta title"
            name="meta_title_default"
            defaultValue={defaults.metaTitleDefault}
            placeholder="Leave blank to use the built-in template"
          />
          <Textarea
            label="Default meta description"
            name="meta_description_default"
            defaultValue={defaults.metaDescriptionDefault}
            rows={3}
            placeholder="Recommended length: 150–160 characters"
          />
          <Textarea
            label="Default keywords (comma-separated)"
            name="keywords"
            defaultValue={defaults.keywords}
            rows={2}
            placeholder="emergency plumber, 24/7 plumber, burst pipe repair, …"
          />
          <FileField
            label="Default Open Graph image (1200×630)"
            name="og_image"
            currentUrl={defaults.ogImageUrl}
            accept="image/png,image/jpeg,image/webp"
          />
          <Field
            label="Twitter / X handle"
            name="twitter_handle"
            defaultValue={defaults.twitterHandle}
            placeholder="@yourbrand"
          />
        </div>
      </section>

      <section>
        <SectionTitle
          title="Search engine verification"
          subtitle="Paste only the verification token. The meta tag is added automatically."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Google Site Verification"
            name="google_site_verification"
            defaultValue={defaults.googleSiteVerification}
            placeholder="abc123…"
          />
          <Field
            label="Bing Webmaster Verification"
            name="bing_site_verification"
            defaultValue={defaults.bingSiteVerification}
            placeholder="abc123…"
          />
        </div>
      </section>

      <section>
        <SectionTitle
          title="Analytics"
          subtitle="Scripts load only when an ID is present. Both run in parallel if both are set."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Google Tag Manager ID" name="gtm_id" defaultValue={defaults.gtmId} placeholder="GTM-XXXXXXX" />
          <Field label="GA4 measurement ID" name="ga_id" defaultValue={defaults.gaId} placeholder="G-XXXXXXXXXX" />
          <Field label="Microsoft Clarity ID" name="clarity_id" defaultValue={defaults.clarityId} placeholder="wjx29fn330" />
        </div>
      </section>

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

      <div className="sticky bottom-0 -mx-6 border-t border-gray-line bg-white/95 px-6 py-4 backdrop-blur">
        <SubmitButton />
      </div>
    </form>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-soft">{subtitle}</p>}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 3,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
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
        <p className="mt-2 text-xs text-gray-soft">Upload to replace. Max 4 MB. Stored in R2.</p>
      </div>
    </label>
  );
}
