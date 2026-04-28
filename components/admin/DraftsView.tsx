'use client';

import { useMemo, useState } from 'react';

export type AdminDraft = {
  draft_id: string;
  form_type: string;
  name: string;
  phone: string;
  email: string;
  city_slug: string;
  message: string;
  source_page: string;
  field_count: number;
  created_at: string;
  updated_at: string;
};

type FilterKey = 'all' | 'recent' | 'phone' | 'email' | 'no_contact';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'recent', label: 'Last 24 hours' },
  { key: 'phone', label: 'Has phone' },
  { key: 'email', label: 'Has email' },
  { key: 'no_contact', label: 'No contact info' },
];

export default function DraftsView({ drafts }: { drafts: AdminDraft[] }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<FilterKey, number> = { all: drafts.length, recent: 0, phone: 0, email: 0, no_contact: 0 };
    const now = Date.now();
    for (const d of drafts) {
      if (now - new Date(d.updated_at).getTime() < 86400_000) c.recent++;
      if (d.phone) c.phone++;
      if (d.email) c.email++;
      if (!d.phone && !d.email) c.no_contact++;
    }
    return c;
  }, [drafts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    return drafts.filter((d) => {
      if (filter === 'recent' && now - new Date(d.updated_at).getTime() >= 86400_000) return false;
      if (filter === 'phone' && !d.phone) return false;
      if (filter === 'email' && !d.email) return false;
      if (filter === 'no_contact' && (d.phone || d.email)) return false;
      if (q) {
        const blob = `${d.name} ${d.phone} ${d.email} ${d.city_slug} ${d.message}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [drafts, filter, query]);

  const open = filtered.find((d) => d.draft_id === openId) ?? null;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                filter === f.key
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-line bg-white text-ink hover:border-primary hover:text-primary'
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${
                  filter === f.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-soft'
                }`}
              >
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-soft"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, contact, city…"
            className="w-full rounded-lg border border-gray-line bg-white py-2 pl-9 pr-3 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-line bg-white p-12 text-center text-sm text-gray-soft">
          {drafts.length === 0
            ? 'No abandoned drafts yet. They will appear here as visitors start filling forms.'
            : 'No drafts match the current filter.'}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d) => (
            <DraftCard key={d.draft_id} draft={d} onOpen={() => setOpenId(d.draft_id)} />
          ))}
        </div>
      )}

      {open && <DraftDetailModal draft={open} onClose={() => setOpenId(null)} />}
    </>
  );
}

function DraftCard({ draft, onOpen }: { draft: AdminDraft; onOpen: () => void }) {
  const minutesAgo = Math.max(1, Math.round((Date.now() - new Date(draft.updated_at).getTime()) / 60000));
  const lastTyped = minutesAgo < 60
    ? `${minutesAgo}m ago`
    : minutesAgo < 1440
    ? `${Math.round(minutesAgo / 60)}h ago`
    : `${Math.round(minutesAgo / 1440)}d ago`;

  const messagePreview = (draft.message || '').slice(0, 120);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-xl border border-gray-line bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {draft.form_type}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-gray-soft">
            {draft.field_count} field{draft.field_count === 1 ? '' : 's'}
          </span>
        </div>
        <span className="text-xs text-gray-soft" title={new Date(draft.updated_at).toLocaleString('en-GB')}>
          {lastTyped}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-ink truncate">
        {draft.name || <span className="font-normal italic text-gray-soft">Unnamed visitor</span>}
      </h3>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {draft.phone && (
          <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-800">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
              <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
            </svg>
            phone
          </span>
        )}
        {draft.email && (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path strokeLinecap="round" d="M3 7l9 6 9-6" />
            </svg>
            email
          </span>
        )}
        {draft.city_slug && (
          <span className="rounded-full border border-gray-line bg-off-white px-2 py-0.5 text-[11px] font-semibold capitalize text-ink">
            {draft.city_slug}
          </span>
        )}
        {!draft.phone && !draft.email && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            no contact info
          </span>
        )}
      </div>

      {messagePreview && (
        <p className="mt-3 line-clamp-3 text-sm text-gray-soft">
          “{messagePreview}{(draft.message || '').length > 120 ? '…' : ''}”
        </p>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-soft">
        <span className="truncate" title={draft.source_page}>
          {draft.source_page || '—'}
        </span>
        <span className="font-semibold text-primary opacity-0 transition group-hover:opacity-100">
          View →
        </span>
      </div>
    </button>
  );
}

function DraftDetailModal({ draft, onClose }: { draft: AdminDraft; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-line px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {draft.form_type}
              </span>
              <span className="text-[11px] uppercase tracking-wide text-gray-soft">
                {draft.field_count} field{draft.field_count === 1 ? '' : 's'} filled
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-ink">
              {draft.name || <span className="font-normal italic text-gray-soft">Unnamed visitor</span>}
            </h2>
            <p className="mt-0.5 text-xs text-gray-soft">
              Started{' '}
              {new Date(draft.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              · Last typed{' '}
              {new Date(draft.updated_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-soft hover:bg-off-white hover:text-ink"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5">
          {(draft.phone || draft.email || draft.city_slug) && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Captured info</h3>
              <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {draft.phone && (
                  <div>
                    <dt className="text-xs text-gray-soft">Phone</dt>
                    <dd>
                      <a href={`tel:${draft.phone}`} className="font-semibold text-primary hover:underline">
                        {draft.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {draft.email && (
                  <div>
                    <dt className="text-xs text-gray-soft">Email</dt>
                    <dd>
                      <a href={`mailto:${draft.email}`} className="font-semibold text-primary hover:underline">
                        {draft.email}
                      </a>
                    </dd>
                  </div>
                )}
                {draft.city_slug && (
                  <div>
                    <dt className="text-xs text-gray-soft">City</dt>
                    <dd className="font-semibold capitalize text-ink">{draft.city_slug}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {draft.message && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Partial message</h3>
              <p className="mt-2 whitespace-pre-line rounded-lg bg-off-white p-3 text-sm text-ink">
                {draft.message}
              </p>
            </section>
          )}

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Page</h3>
            <p className="mt-1 break-all text-sm text-ink">{draft.source_page || '—'}</p>
          </section>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-line bg-off-white px-6 py-4">
          {draft.phone && (
            <a
              href={`tel:${draft.phone}`}
              className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark"
            >
              Call now
            </a>
          )}
          {draft.email && !draft.phone && (
            <a
              href={`mailto:${draft.email}`}
              className="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark"
            >
              Email now
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
