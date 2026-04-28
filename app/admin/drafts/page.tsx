import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import DraftsView, { type AdminDraft } from '@/components/admin/DraftsView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Abandoned drafts',
  robots: { index: false, follow: false },
};

async function loadDrafts(): Promise<AdminDraft[]> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('form_drafts')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(500);
    if (error) {
      console.warn('[admin] load drafts:', error.message || JSON.stringify(error));
      return [];
    }
    return (data ?? []).map((row) => ({
      draft_id: String(row.draft_id),
      form_type: String(row.form_type ?? 'quote'),
      name: row.name ?? '',
      phone: row.phone ?? '',
      email: row.email ?? '',
      city_slug: row.city_slug ?? '',
      message: row.message ?? '',
      source_page: row.source_page ?? '',
      field_count: Number(row.field_count ?? 0),
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    }));
  } catch (err) {
    console.warn('[admin] load drafts exception:', err);
    return [];
  }
}

export default async function AdminDraftsPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const drafts = await loadDrafts();

  const now = Date.now();
  const last24h = drafts.filter((d) => now - new Date(d.updated_at).getTime() < 86400_000).length;
  const last7d = drafts.filter((d) => now - new Date(d.updated_at).getTime() < 7 * 86400_000).length;
  const withPhone = drafts.filter((d) => Boolean(d.phone)).length;
  const withEmail = drafts.filter((d) => Boolean(d.email)).length;

  return (
    <AdminShell active="drafts" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-ink">Abandoned drafts</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Visitors who started filling a form but did not submit. Auto-saved every 1.5 seconds and on
            page exit. Drafts with phone or email captured are warm leads worth a quick follow-up call.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          tone="primary"
          label="Total drafts"
          value={drafts.length.toString()}
          sub={`${last7d} active in last 7 days`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v6h6" />
            </svg>
          }
        />
        <Stat
          tone="amber"
          label="Last 24 hours"
          value={last24h.toString()}
          sub={drafts.length > 0 ? `${Math.round((last24h / drafts.length) * 100)}% of all drafts` : 'n/a'}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
          }
        />
        <Stat
          tone="green"
          label="With phone"
          value={withPhone.toString()}
          sub="Direct call opportunities"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
            </svg>
          }
        />
        <Stat
          tone="blue"
          label="With email"
          value={withEmail.toString()}
          sub="Reachable via mailto"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path strokeLinecap="round" d="M3 7l9 6 9-6" />
            </svg>
          }
        />
      </div>

      <DraftsView drafts={drafts} />
    </AdminShell>
  );
}

type Tone = 'primary' | 'green' | 'blue' | 'amber';
const TONE: Record<Tone, { iconWrap: string; iconColor: string; ring: string }> = {
  primary: { iconWrap: 'bg-primary/10', iconColor: 'text-primary', ring: 'ring-primary/10' },
  green: { iconWrap: 'bg-green-100', iconColor: 'text-green-700', ring: 'ring-green-100' },
  blue: { iconWrap: 'bg-blue-100', iconColor: 'text-blue-700', ring: 'ring-blue-100' },
  amber: { iconWrap: 'bg-amber-100', iconColor: 'text-amber-700', ring: 'ring-amber-100' },
};

function Stat({
  label,
  value,
  sub,
  tone = 'primary',
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: Tone;
  icon?: React.ReactNode;
}) {
  const t = TONE[tone];
  return (
    <div className="rounded-xl border border-gray-line bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
        {icon && (
          <div className={`grid h-9 w-9 place-items-center rounded-lg ring-1 ${t.iconWrap} ${t.iconColor} ${t.ring}`}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 text-2xl font-extrabold text-ink tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-soft">{sub}</div>}
    </div>
  );
}
