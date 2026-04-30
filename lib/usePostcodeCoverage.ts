'use client';

import { useEffect, useState } from 'react';
import { cities, type City } from '@/data/cities';
import { isUkPostcodeArea, extractArea } from '@/lib/ukPostcodes';

export type Coverage =
  | { state: 'idle' }
  | { state: 'city'; city: City; outward: string; areaName: string }
  | { state: 'uk'; outward: string; areaName: string };

const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

function localCheck(raw: string): Coverage {
  const cleaned = raw.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length < 2) return { state: 'idle' };
  const m = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
  if (!m) return { state: 'idle' };
  const outward = m[1];
  for (const city of cities) {
    for (const p of city.postcodes) {
      if (outward === p) return { state: 'city', city, outward, areaName: city.name };
      if (/^[A-Z]+$/.test(p) && outward.startsWith(p)) {
        const next = outward[p.length];
        if (next && /\d/.test(next)) return { state: 'city', city, outward, areaName: city.name };
      }
    }
  }
  const area = extractArea(outward);
  if (area && isUkPostcodeArea(area)) {
    return { state: 'uk', outward, areaName: outward };
  }
  return { state: 'idle' };
}

export function usePostcodeCoverage(raw: string): Coverage {
  const [coverage, setCoverage] = useState<Coverage>({ state: 'idle' });

  useEffect(() => {
    const local = localCheck(raw);
    setCoverage(local);
    if (local.state === 'idle') return;

    const cleaned = raw.replace(/\s+/g, '').toUpperCase();
    // Only call the API when the postcode looks complete (outward + inward).
    if (!POSTCODE_REGEX.test(raw.trim())) return;

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`,
          { signal: ctrl.signal }
        );
        if (!res.ok) return;
        const data = await res.json();
        const r = data?.result;
        if (!r) return;
        const apiArea: string =
          r.admin_district || r.parish || r.region || local.outward;
        const matchedCity = cities.find(
          (c) => c.name.toLowerCase() === String(r.admin_district ?? '').toLowerCase()
        );
        if (matchedCity) {
          setCoverage({
            state: 'city',
            city: matchedCity,
            outward: local.outward,
            areaName: apiArea,
          });
        } else {
          setCoverage({
            state: 'uk',
            outward: local.outward,
            areaName: apiArea,
          });
        }
      } catch {
        // network/abort - keep local result
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [raw]);

  return coverage;
}
