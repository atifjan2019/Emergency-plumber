'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { cities, type City } from '@/data/cities';

type Result =
  | { kind: 'idle' }
  | { kind: 'invalid' }
  | { kind: 'match'; city: City; outward: string }
  | { kind: 'no-match'; outward: string };

const POSTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

function extractOutward(raw: string): string | null {
  const cleaned = raw.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length < 2) return null;
  const match = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
  return match ? match[1] : null;
}

function findCity(outward: string): City | null {
  for (const city of cities) {
    for (const p of city.postcodes) {
      if (outward === p) return city;
      if (/^[A-Z]+$/.test(p) && outward.startsWith(p)) {
        const next = outward[p.length];
        if (next && /\d/.test(next)) return city;
      }
    }
  }
  return null;
}

export default function PostcodeChecker() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Result>({ kind: 'idle' });

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    const isValidShape = POSTCODE_PATTERN.test(trimmed) || /^[A-Z]{1,2}\d{1,2}[A-Z]?$/i.test(trimmed.replace(/\s+/g, ''));
    if (!isValidShape) {
      setResult({ kind: 'invalid' });
      return;
    }
    const outward = extractOutward(trimmed);
    if (!outward) {
      setResult({ kind: 'invalid' });
      return;
    }
    const city = findCity(outward);
    setResult(city ? { kind: 'match', city, outward } : { kind: 'no-match', outward });
  };

  const onClear = () => {
    setValue('');
    setResult({ kind: 'idle' });
  };

  const totalDistricts = useMemo(
    () => cities.reduce((acc, c) => acc + c.postcodes.length, 0),
    []
  );

  return (
    <section id="postcode-checker" className="section">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-primary/10 p-6 md:p-10">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Coverage check
              </span>
              <h2 className="mt-3">Do we cover your postcode?</h2>
              <p className="mt-3 text-gray-soft">
                Type your postcode below to confirm coverage and the typical response time for your area. We currently cover {cities.length} UK cities and {totalDistricts}+ postcode districts.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-gray-soft">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                      <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  Instant answer - no email or phone required
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/15 text-green-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" aria-hidden>
                      <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  Same rate day or night across every covered area
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={onCheck}
                className="rounded-2xl border border-gray-line bg-white p-5 md:p-6 shadow-sm"
              >
                <label htmlFor="pc" className="text-xs font-bold uppercase tracking-wider text-gray-soft">
                  Your postcode
                </label>
                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <input
                    id="pc"
                    name="postcode"
                    type="text"
                    autoComplete="postal-code"
                    inputMode="text"
                    spellCheck={false}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (result.kind !== 'idle') setResult({ kind: 'idle' });
                    }}
                    placeholder="e.g. SW1A 1AA"
                    className="flex-1 rounded-lg border border-gray-line bg-white px-4 py-3.5 text-base font-semibold text-ink placeholder-gray-soft uppercase tracking-wider focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    disabled={value.trim().length === 0}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Check coverage
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                      <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {result.kind === 'idle' && (
                  <p className="mt-3 text-xs text-gray-soft">
                    Tip: just the outward code is enough (e.g. <span className="font-semibold text-ink">SW1A</span> or <span className="font-semibold text-ink">M14</span>).
                  </p>
                )}

                {result.kind === 'invalid' && (
                  <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
                    <p className="text-sm font-bold text-accent-dark">That does not look like a UK postcode</p>
                    <p className="mt-1 text-xs text-gray-soft">
                      Try a format like <span className="font-semibold text-ink">SW1A 1AA</span>, <span className="font-semibold text-ink">M14 4PR</span>, or just the outward code on its own.
                    </p>
                  </div>
                )}

                {result.kind === 'match' && (
                  <div className="mt-4 rounded-xl border border-green/30 bg-green/5 p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-green text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5" aria-hidden>
                          <path strokeLinecap="round" d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-green-dark uppercase tracking-wider">Yes - we cover {result.outward}</p>
                        <h3 className="mt-1 text-lg font-bold text-ink">
                          {result.city.name} - typical response ~{result.city.responseTime}
                        </h3>
                        <p className="mt-1 text-sm text-gray-soft">
                          Local engineers across {result.city.region}. Same rate day or night, fixed quote in writing before any work.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <Link
                            href={`/emergency-plumber/${result.city.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-line bg-white px-4 py-2.5 text-sm font-bold text-ink hover:border-primary hover:text-primary transition"
                          >
                            See {result.city.name} page
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                              <path strokeLinecap="round" d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={onClear}
                            className="text-sm font-semibold text-gray-soft hover:text-ink"
                          >
                            Check another
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {result.kind === 'no-match' && (
                  <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5" aria-hidden>
                          <path strokeLinecap="round" d="M12 8v5M12 17h.01" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-accent-dark uppercase tracking-wider">{result.outward} is outside our 12-city zone</p>
                        <h3 className="mt-1 text-lg font-bold text-ink">We may still be able to help - call to check</h3>
                        <p className="mt-1 text-sm text-gray-soft">
                          Drop us your details on the form below and we will let you know whether we can dispatch, or recommend a trusted local engineer if not.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <Link
                            href="#quote-form"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition"
                          >
                            Send my details
                          </Link>
                          <Link
                            href="/areas"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-line bg-white px-4 py-2.5 text-sm font-bold text-ink hover:border-primary hover:text-primary transition"
                          >
                            See covered cities
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
