'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type DraftFields = {
  name?: string;
  phone?: string;
  email?: string;
  city_slug?: string;
  message?: string;
  source_page?: string;
};

const STORAGE_PREFIX = 'rf_draft_';
const DEBOUNCE_MS = 1500;

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `d_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function useDraftCapture(formType: string) {
  const [draftId, setDraftId] = useState<string>('');
  const valuesRef = useRef<DraftFields>({});
  const lastSentRef = useRef<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = STORAGE_PREFIX + formType;
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = makeId();
      window.localStorage.setItem(key, id);
    }
    setDraftId(id);
  }, [formType]);

  const send = useCallback(
    (beacon: boolean) => {
      if (!draftId) return;
      const v = valuesRef.current;
      const hasContent = Boolean(v.name || v.phone || v.email || v.message);
      const payload = JSON.stringify({
        draft_id: draftId,
        form_type: formType,
        name: v.name || '',
        phone: v.phone || '',
        email: v.email || '',
        city_slug: v.city_slug || '',
        message: v.message || '',
        source_page: v.source_page || '',
      });
      if (payload === lastSentRef.current && !beacon) return;
      lastSentRef.current = payload;

      if (!hasContent && !beacon) return;

      try {
        if (beacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('/api/draft', blob);
          return;
        }
      } catch {}

      try {
        fetch('/api/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      } catch {}
    },
    [draftId, formType]
  );

  const update = useCallback(
    (next: DraftFields) => {
      valuesRef.current = { ...valuesRef.current, ...next };
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => send(false), DEBOUNCE_MS);
    },
    [send]
  );

  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return;
    const key = STORAGE_PREFIX + formType;
    const id = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    if (timerRef.current) clearTimeout(timerRef.current);
    valuesRef.current = {};
    lastSentRef.current = '';
    if (id) {
      try {
        fetch(`/api/draft?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
          keepalive: true,
        }).catch(() => {});
      } catch {}
    }
  }, [formType]);

  useEffect(() => {
    if (!draftId) return;
    function onPageHide() {
      send(true);
    }
    function onVisibility() {
      if (document.visibilityState === 'hidden') send(true);
    }
    window.addEventListener('pagehide', onPageHide);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      document.removeEventListener('visibilitychange', onVisibility);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draftId, send]);

  return { draftId, update, clearDraft };
}

export function readFormDraft(form: HTMLFormElement): DraftFields {
  const fd = new FormData(form);
  return {
    name: String(fd.get('name') || ''),
    phone: String(fd.get('phone') || ''),
    email: String(fd.get('email') || ''),
    city_slug: String(fd.get('city_slug') || ''),
    message: String(fd.get('message') || ''),
    source_page: String(fd.get('source_page') || ''),
  };
}
