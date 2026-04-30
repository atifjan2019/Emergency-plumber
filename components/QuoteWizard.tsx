'use client';

import { useEffect, useMemo, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitLead, type LeadFormState } from '@/app/actions/leads';
import { useDraftCapture, readFormDraft } from '@/lib/useDraftCapture';
import { cities } from '@/data/cities';
import { isUkPostcodeArea, extractArea } from '@/lib/ukPostcodes';

const initial: LeadFormState = { ok: false, message: '' };

type ServiceOption = { value: string; label: string; icon: string };
const serviceOptions: ServiceOption[] = [
  { value: 'Emergency repair', label: 'Emergency repair', icon: 'bolt' },
  { value: 'Burst pipe / leak', label: 'Burst pipe / leak', icon: 'leak' },
  { value: 'Drain blockage', label: 'Drain blockage', icon: 'drain' },
  { value: 'Boiler / heating', label: 'Boiler / heating', icon: 'flame' },
  { value: 'Bathroom / kitchen plumbing', label: 'Bathroom / kitchen', icon: 'tap' },
  { value: 'Tap, toilet or fixture', label: 'Tap, toilet or fixture', icon: 'toilet' },
  { value: 'Pipe installation / replacement', label: 'Pipe installation', icon: 'pipe' },
  { value: 'Other / not sure', label: 'Other / not sure', icon: 'help' },
];

const urgencyOptions = [
  { value: 'Emergency now', label: 'Emergency now', sub: 'Within 2 hours', color: 'accent' },
  { value: 'Today', label: 'Today', sub: 'Within 24 hours', color: 'primary' },
  { value: 'This week', label: 'This week', sub: 'Flexible weekday', color: 'primary' },
  { value: 'Scheduled / quote only', label: 'Scheduled', sub: 'Just want a quote', color: 'green' },
] as const;

function checkPostcode(raw: string) {
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

function ServiceIcon({ name }: { name: string }) {
  const common = 'h-6 w-6';
  switch (name) {
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case 'leak':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M12 3c2 4 5 6 5 10a5 5 0 11-10 0c0-4 3-6 5-10z" />
        </svg>
      );
    case 'drain':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M12 3s4 5 4 9a4 4 0 11-8 0c0-2 1-3 2-4 0-2-1-4 2-5z" />
        </svg>
      );
    case 'tap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M9 4h6M12 4v4M6 8h12v4H6zM10 12v4a2 2 0 002 2h0a2 2 0 002-2v-4" />
        </svg>
      );
    case 'toilet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M6 4h12v8H6zM7 12l2 8h6l2-8" />
        </svg>
      );
    case 'pipe':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <path d="M3 12h6a3 3 0 003-3V3M21 12h-6a3 3 0 00-3 3v6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9a3 3 0 116 0c0 1.5-3 2-3 4M12 17h.01" />
        </svg>
      );
  }
}

function NextButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? 'Sending...' : label}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
        <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </button>
  );
}

export default function QuoteWizard({ sourcePage = '/quote' }: { sourcePage?: string }) {
  const [state, formAction] = useActionState(submitLead, initial);
  const { draftId, update, clearDraft } = useDraftCapture('quote-wizard');

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [serviceType, setServiceType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [postcode, setPostcode] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const coverage = useMemo(() => checkPostcode(postcode), [postcode]);

  useEffect(() => {
    if (state.ok) clearDraft();
  }, [state.ok, clearDraft]);

  if (state.ok) {
    return (
      <div className="rounded-3xl border-2 border-green/40 bg-green/5 p-8 md:p-12 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green text-white shadow-lg shadow-green/30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-8 w-8" aria-hidden>
            <path strokeLinecap="round" d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-ink">Thanks - we have your details</h2>
        <p className="mt-3 text-base text-gray-soft max-w-md mx-auto">{state.message}</p>
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-gray-soft">
          <span className="rounded-full bg-white border border-gray-line px-3 py-1.5">Reply within 1 hour during the day</span>
          <span className="rounded-full bg-white border border-gray-line px-3 py-1.5">No obligation</span>
        </div>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Back to homepage
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    );
  }

  const canAdvance = (() => {
    if (step === 1) return true; // postcode is optional - users can skip if unsure
    if (step === 2) return serviceType.length > 0;
    if (step === 3) return urgency.length > 0;
    if (step === 4) return name.trim().length > 0 && (phone.trim().length > 0 || email.trim().length > 0);
    return false;
  })();

  const onContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canAdvance && step < totalSteps) setStep(step + 1);
  };

  const stepLabels = ['Postcode', 'Service', 'Urgency', 'Contact'];

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-gray-soft">
            Step <span className="text-ink">{step}</span> / {totalSteps} · <span className="text-primary">{stepLabels[step - 1]}</span>
          </span>
          <span className="text-gray-soft">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form
        action={formAction}
        onChange={(e) => update(readFormDraft(e.currentTarget))}
        className="space-y-6"
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

        {/* Hidden fields persist across steps so the final submit has everything */}
        <input type="hidden" name="service_type" value={serviceType} />
        <input type="hidden" name="urgency" value={urgency} />
        <input type="hidden" name="postcode" value={postcode} />
        {step !== 4 && (
          <>
            <input type="hidden" name="message" value={message} />
            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="email" value={email} />
          </>
        )}

        {/* STEP 1: Postcode */}
        {step === 1 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-ink">Your postcode</h2>
            <div className="mt-3 relative">
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. SW1A 1AA"
                autoComplete="postal-code"
                spellCheck={false}
                autoFocus
                className={`w-full rounded-xl border-2 bg-white px-5 py-4 pr-32 text-lg uppercase tracking-wider text-ink shadow-sm focus:outline-none focus:ring-4 transition-colors ${
                  coverage.state === 'city' || coverage.state === 'uk'
                    ? 'border-green/50 focus:border-green focus:ring-green/15'
                    : 'border-gray-line focus:border-primary focus:ring-primary/15'
                }`}
              />
              {(coverage.state === 'city' || coverage.state === 'uk') && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-green/15 px-3 py-1.5 text-xs font-bold text-green-dark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                    <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                  </svg>
                  Yes
                </span>
              )}
            </div>
            {coverage.state === 'city' && (
              <p className="mt-3 text-xs text-green-dark font-semibold">
                We cover {coverage.city.name} · ~{coverage.city.responseTime} response.
              </p>
            )}
            {coverage.state === 'uk' && (
              <p className="mt-3 text-xs text-green-dark font-semibold">
                Yes, we can help in {coverage.outward} - we will confirm response time on call.
              </p>
            )}
            {coverage.state === 'idle' && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-3 text-xs font-semibold text-gray-soft underline-offset-2 hover:underline hover:text-primary"
              >
                Don&apos;t know it? Skip
              </button>
            )}
          </div>
        )}

        {/* STEP 2: Service type */}
        {step === 2 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-ink">What do you need?</h2>
            <div className="mt-3 grid gap-2.5 grid-cols-2 md:grid-cols-4">
              {serviceOptions.map((opt) => {
                const active = serviceType === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setServiceType(opt.value)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
                      active
                        ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                        : 'border-gray-line bg-white hover:border-primary/40'
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl transition ${
                        active ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <ServiceIcon name={opt.icon} />
                    </span>
                    <span className="text-xs font-bold text-ink leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Urgency */}
        {step === 3 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-ink">How urgent?</h2>
            <div className="mt-3 grid gap-2.5 grid-cols-1 sm:grid-cols-2">
              {urgencyOptions.map((opt) => {
                const active = urgency === opt.value;
                const accent = opt.color === 'accent';
                const green = opt.color === 'green';
                const activeClasses = accent
                  ? 'border-accent bg-accent/5'
                  : green
                  ? 'border-green bg-green/5'
                  : 'border-primary bg-primary/5';
                const labelClass = accent ? 'text-accent-dark' : green ? 'text-green-dark' : 'text-primary';
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setUrgency(opt.value)}
                    className={`flex items-center justify-between rounded-2xl border-2 p-5 text-left transition ${
                      active ? `${activeClasses} shadow-md` : 'border-gray-line bg-white hover:border-gray-soft/30'
                    }`}
                  >
                    <div>
                      <span className={`block text-base font-extrabold ${active ? labelClass : 'text-ink'}`}>{opt.label}</span>
                      <span className="mt-0.5 block text-xs text-gray-soft">{opt.sub}</span>
                    </div>
                    {active && (
                      <span className={`grid h-7 w-7 place-items-center rounded-full ${accent ? 'bg-accent' : green ? 'bg-green' : 'bg-primary'} text-white`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-hidden>
                          <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Contact + optional issue description */}
        {step === 4 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-ink">Your details</h2>

            <div className="mt-3 space-y-3">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
                autoFocus
                className="w-full rounded-xl border-2 border-gray-line bg-white px-5 py-3.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
                className="w-full rounded-xl border-2 border-gray-line bg-white px-5 py-3.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                autoComplete="email"
                className="w-full rounded-xl border-2 border-gray-line bg-white px-5 py-3.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
              />
              <p className="text-xs text-gray-soft">
                Either a phone number or an email is fine - whichever you prefer.
              </p>
            </div>

            <div className="mt-6">
              <label className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>What is the issue? <span className="text-gray-soft font-normal">(optional)</span></span>
                <span className="text-xs text-gray-soft font-normal">{message.length}/500</span>
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                rows={4}
                placeholder="e.g. Burst pipe under the kitchen sink since this morning."
                className="mt-2 w-full rounded-xl border-2 border-gray-line bg-white px-5 py-3.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors"
              />
            </div>

            <div className="mt-6 rounded-xl border border-gray-line bg-off-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-soft">Summary</p>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-xs text-gray-soft">Postcode</dt>
                  <dd className="font-semibold text-ink">
                    {postcode.toUpperCase() || '-'}
                    {coverage.state === 'city' && (
                      <span className="ml-2 text-xs text-green-dark">({coverage.city.name})</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-soft">Service</dt>
                  <dd className="font-semibold text-ink">{serviceType || '-'}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-soft">Urgency</dt>
                  <dd className="font-semibold text-ink">{urgency || '-'}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-soft">Issue</dt>
                  <dd className="font-semibold text-ink truncate">{message ? `${message.slice(0, 40)}${message.length > 40 ? '...' : ''}` : 'Not provided'}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {state.message && !state.ok && (
          <p className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {state.message}
          </p>
        )}

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-line bg-white px-5 py-3 text-sm font-bold text-ink hover:border-primary hover:text-primary transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M19 12H5M11 5l-7 7 7 7" />
              </svg>
              Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={onContinue}
              disabled={!canAdvance}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <NextButton label="Send my quote request" />
          )}
        </div>
      </form>
    </div>
  );
}
