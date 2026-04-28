'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  deleteLead,
  updateLeadStatus,
  type StatusActionState,
} from '@/app/admin/leads/actions';
import { LEAD_STATUSES, type LeadStatus } from '@/lib/admin/leadStatus';
import StatusBadge from './StatusBadge';

export type AdminLead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city_slug: string | null;
  message: string;
  source_page: string | null;
  status: LeadStatus;
  earned: number;
  notes: string | null;
  created_at: string;
  closed_at: string | null;
  admin_notified_at: string | null;
  user_notified_at: string | null;
};

type FilterKey = 'all' | LeadStatus;
type SortKey = 'newest' | 'oldest' | 'earned_high';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'In progress' },
  { key: 'complete', label: 'Complete' },
  { key: 'lost', label: 'Lost' },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'earned_high', label: 'Highest earned' },
];

const STATUS_AVATAR_RING: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-700 ring-blue-200',
  contacted: 'bg-amber-100 text-amber-800 ring-amber-200',
  complete: 'bg-green-100 text-green-800 ring-green-200',
  lost: 'bg-red-100 text-red-700 ring-red-200',
};

export default function LeadsTable({ leads }: { leads: AdminLead[] }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('newest');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<FilterKey, number> = { all: leads.length, new: 0, contacted: 0, complete: 0, lost: 0 };
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = leads.filter((l) => {
      if (filter !== 'all' && l.status !== filter) return false;
      if (q) {
        const blob = `${l.name} ${l.phone ?? ''} ${l.email ?? ''} ${l.city_slug ?? ''} ${l.message}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
    if (sort === 'oldest') {
      arr = [...arr].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sort === 'earned_high') {
      arr = [...arr].sort((a, b) => Number(b.earned) - Number(a.earned));
    }
    return arr;
  }, [leads, filter, sort, query]);

  const open = filtered.find((l) => l.id === openId) ?? null;

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
              placeholder="Search name, phone, email, city…"
              className="w-full rounded-lg border border-gray-line bg-white py-2 pl-9 pr-3 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-gray-line bg-white py-2 pl-3 pr-8 text-sm font-semibold text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-gray-line bg-white p-12 text-center text-sm text-gray-soft">
          {leads.length === 0
            ? 'No leads yet. Submissions from the contact form, quote popup, or admin will appear here.'
            : 'No leads match the current filter.'}
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {filtered.map((lead) => (
            <li key={lead.id}>
              <LeadCard lead={lead} onOpen={() => setOpenId(lead.id)} />
            </li>
          ))}
        </ul>
      )}

      {open && <LeadDetailModal lead={open} onClose={() => setOpenId(null)} />}
    </>
  );
}

function LeadCard({ lead, onOpen }: { lead: AdminLead; onOpen: () => void }) {
  const initial = (lead.name?.trim()?.[0] || '?').toUpperCase();
  const ring = STATUS_AVATAR_RING[lead.status] ?? STATUS_AVATAR_RING.new;
  const minutesAgo = Math.max(1, Math.round((Date.now() - new Date(lead.created_at).getTime()) / 60000));
  const ago =
    minutesAgo < 60
      ? `${minutesAgo}m ago`
      : minutesAgo < 1440
      ? `${Math.round(minutesAgo / 60)}h ago`
      : `${Math.round(minutesAgo / 1440)}d ago`;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-start gap-4 rounded-xl border border-gray-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-5"
    >
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-bold ring-2 ${ring}`}
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-ink">{lead.name}</h3>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-soft">
              {lead.city_slug && <span className="capitalize">{lead.city_slug}</span>}
              {lead.city_slug && <span aria-hidden>·</span>}
              <span title={new Date(lead.created_at).toLocaleString('en-GB')}>{ago}</span>
              {lead.source_page && (
                <>
                  <span aria-hidden>·</span>
                  <span className="truncate max-w-[180px]" title={lead.source_page}>
                    {lead.source_page}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {lead.status === 'complete' && lead.earned > 0 && (
              <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-bold tabular-nums text-green-800">
                £{lead.earned.toFixed(2)}
              </span>
            )}
            <StatusBadge status={lead.status} />
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {lead.phone && (
            <ContactPill
              tone="green"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                  <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
                </svg>
              }
              label={lead.phone}
              href={`tel:${lead.phone}`}
            />
          )}
          {lead.email && (
            <ContactPill
              tone="blue"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" d="M3 7l9 6 9-6" />
                </svg>
              }
              label={lead.email}
              href={`mailto:${lead.email}`}
            />
          )}
          {!lead.phone && !lead.email && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              no contact info
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-gray-soft">{lead.message}</p>
      </div>
    </button>
  );
}

function ContactPill({
  tone,
  icon,
  label,
  href,
}: {
  tone: 'green' | 'blue';
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const classes =
    tone === 'green'
      ? 'border-green-200 bg-green-50 text-green-800 hover:bg-green-100'
      : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100';
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition ${classes}`}
    >
      {icon}
      <span className="truncate max-w-[180px]">{label}</span>
    </a>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function LeadDetailModal({ lead, onClose }: { lead: AdminLead; onClose: () => void }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [earned, setEarned] = useState<string>(lead.earned ? String(lead.earned) : '');
  const [notes, setNotes] = useState<string>(lead.notes ?? '');
  const [feedback, setFeedback] = useState<StatusActionState>({ ok: false, message: '' });

  const dirty =
    status !== lead.status ||
    notes !== (lead.notes ?? '') ||
    (status === 'complete' && parseFloat(earned || '0') !== Number(lead.earned));

  function onSave() {
    if (status === 'complete') {
      const v = parseFloat(earned || '0');
      if (!Number.isFinite(v) || v < 0) {
        setFeedback({ ok: false, message: 'Enter a valid amount earned (0 or higher).' });
        return;
      }
    }

    const fd = new FormData();
    fd.set('id', lead.id);
    fd.set('status', status);
    fd.set('earned', earned);
    fd.set('notes', notes);
    fd.set('name_hint', lead.name);

    startTransition(async () => {
      const result = await updateLeadStatus({ ok: false, message: '' }, fd);
      if (result.ok) {
        setFeedback({ ok: true, message: 'Saved.' });
        router.refresh();
        setTimeout(onClose, 400);
      } else {
        setFeedback(result);
      }
    });
  }

  function onDelete() {
    if (!window.confirm(`Delete lead from "${lead.name}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.set('id', lead.id);
    fd.set('name_hint', lead.name);
    startTransition(async () => {
      await deleteLead(fd);
      router.refresh();
      onClose();
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-line px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 id="lead-modal-title" className="text-xl font-bold text-ink">
                {lead.name}
              </h2>
              <StatusBadge status={lead.status} />
            </div>
            <p className="mt-1 text-xs text-gray-soft">
              Submitted {formatDate(lead.created_at)}
              {lead.closed_at && ` · Closed ${formatDate(lead.closed_at)}`}
              {lead.source_page && ` · From ${lead.source_page}`}
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

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-6">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Notifications</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <NotifyPill
                label="Admin email"
                sentAt={lead.admin_notified_at}
                fallback="Not sent — admin-created lead"
              />
              <NotifyPill
                label="Customer confirmation"
                sentAt={lead.user_notified_at}
                fallback={lead.email ? 'Not sent — SMTP error or pending' : 'No email captured'}
              />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Contact</h3>
            <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {lead.phone && (
                <div>
                  <dt className="text-xs text-gray-soft">Phone</dt>
                  <dd>
                    <a href={`tel:${lead.phone}`} className="font-semibold text-primary hover:underline">
                      {lead.phone}
                    </a>
                  </dd>
                </div>
              )}
              {lead.email && (
                <div>
                  <dt className="text-xs text-gray-soft">Email</dt>
                  <dd>
                    <a href={`mailto:${lead.email}`} className="font-semibold text-primary hover:underline">
                      {lead.email}
                    </a>
                  </dd>
                </div>
              )}
              {lead.city_slug && (
                <div>
                  <dt className="text-xs text-gray-soft">City</dt>
                  <dd className="font-semibold capitalize text-ink">{lead.city_slug}</dd>
                </div>
              )}
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Message</h3>
            <p className="mt-2 whitespace-pre-line rounded-lg bg-off-white p-3 text-sm text-ink">
              {lead.message}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-soft">Status</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LEAD_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                    status === s
                      ? statusButtonActive(s)
                      : 'border-gray-line bg-white text-ink hover:border-primary hover:text-primary'
                  }`}
                >
                  {statusLabel(s)}
                </button>
              ))}
            </div>

            {status === 'complete' && (
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <label className="block">
                  <span className="text-sm font-semibold text-green-900">
                    How much did we earn from this lead?
                  </span>
                  <p className="mt-1 text-xs text-green-800">
                    Enter the amount in £ (after parts/expenses if you only track profit).
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-green-900">£</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      autoFocus
                      value={earned}
                      onChange={(e) => setEarned(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-green-300 bg-white px-3.5 py-2.5 text-base font-semibold text-ink shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                </label>
              </div>
            )}
          </section>

          <section>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-soft">
                Internal notes
              </span>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add follow-up notes, parts ordered, scheduled date, etc."
                className="mt-2 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </section>

          {feedback.message && (
            <p
              className={`rounded-lg border px-3 py-2 text-sm ${
                feedback.ok
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              {feedback.message}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-gray-line bg-off-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <a
              href={`/admin/leads/${lead.id}`}
              className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              Edit details
            </a>
            <button
              type="button"
              onClick={onDelete}
              disabled={pending}
              className="rounded-lg border border-red-200 bg-white px-3.5 py-2 text-sm font-semibold text-red-700 hover:border-red-400 hover:bg-red-50 disabled:opacity-60"
            >
              Delete
            </button>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={pending || !dirty}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifyPill({
  label,
  sentAt,
  fallback,
}: {
  label: string;
  sentAt: string | null;
  fallback: string;
}) {
  if (sentAt) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-green-900">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
          </svg>
          {label} sent
        </div>
        <div className="mt-0.5 text-[11px] text-green-800">
          {new Date(sentAt).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-gray-line bg-off-white p-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-soft">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 8v5" />
          <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
        </svg>
        {label}
      </div>
      <div className="mt-0.5 text-[11px] text-gray-soft">{fallback}</div>
    </div>
  );
}

function statusLabel(s: LeadStatus): string {
  return s === 'new' ? 'New' : s === 'contacted' ? 'In progress' : s === 'complete' ? 'Complete' : 'Lost';
}

function statusButtonActive(s: LeadStatus): string {
  switch (s) {
    case 'new': return 'border-blue-300 bg-blue-50 text-blue-800';
    case 'contacted': return 'border-amber-300 bg-amber-50 text-amber-900';
    case 'complete': return 'border-green-400 bg-green-50 text-green-900';
    case 'lost': return 'border-red-300 bg-red-50 text-red-800';
  }
}
