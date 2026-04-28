'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  deleteLead,
  updateLeadStatus,
  LEAD_STATUSES,
  type LeadStatus,
  type StatusActionState,
} from '@/app/admin/leads/actions';
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
};

type FilterKey = 'all' | LeadStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'In progress' },
  { key: 'complete', label: 'Complete' },
  { key: 'lost', label: 'Lost' },
];

export default function LeadsTable({ leads }: { leads: AdminLead[] }) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<FilterKey, number> = { all: leads.length, new: 0, contacted: 0, complete: 0, lost: 0 };
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    if (filter === 'all') return leads;
    return leads.filter((l) => l.status === filter);
  }, [leads, filter]);

  const open = filtered.find((l) => l.id === openId) ?? null;

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
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

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-off-white text-xs uppercase tracking-wide text-gray-soft">
              <tr>
                <th className="px-4 py-3 text-left">When</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Earned</th>
                <th className="px-4 py-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-soft">
                    No leads in this view yet.
                  </td>
                </tr>
              )}
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setOpenId(lead.id)}
                  className="border-t border-gray-line align-top cursor-pointer transition hover:bg-off-white/70"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-gray-soft">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">{lead.name}</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} className="block text-primary hover:underline">
                        {lead.phone}
                      </a>
                    )}
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="block text-primary hover:underline">
                        {lead.email}
                      </a>
                    )}
                    {!lead.phone && !lead.email && <span className="text-gray-soft">—</span>}
                  </td>
                  <td className="px-4 py-3 capitalize text-ink">{lead.city_slug || '-'}</td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">
                    {lead.status === 'complete' && lead.earned > 0 ? `£${lead.earned.toFixed(2)}` : <span className="text-gray-soft">—</span>}
                  </td>
                  <td className="px-4 py-3 max-w-md text-ink truncate">{lead.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <LeadDetailModal lead={open} onClose={() => setOpenId(null)} />}
    </>
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
