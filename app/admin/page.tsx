import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import LeadsTable, { type AdminLead } from '@/components/admin/LeadsTable';
import type { LeadStatus } from '@/app/admin/leads/actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Leads',
  robots: { index: false, follow: false },
};

async function loadLeads(): Promise<AdminLead[]> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, phone, email, city_slug, message, source_page, status, earned, notes, created_at, closed_at')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) {
      console.warn('[admin] load leads:', error.message || JSON.stringify(error));
      return [];
    }
    return (data ?? []).map((row) => ({
      id: String(row.id),
      name: String(row.name),
      phone: row.phone ?? null,
      email: row.email ?? null,
      city_slug: row.city_slug ?? null,
      message: String(row.message),
      source_page: row.source_page ?? null,
      status: (row.status as LeadStatus) ?? 'new',
      earned: Number(row.earned ?? 0),
      notes: row.notes ?? null,
      created_at: String(row.created_at),
      closed_at: row.closed_at ?? null,
    }));
  } catch (err) {
    console.warn('[admin] load leads exception:', err);
    return [];
  }
}

async function loadCounts(): Promise<{ phone: number; drafts: number }> {
  let phone = 0;
  let drafts = 0;
  try {
    const supabase = getServiceClient();
    const [{ count: pc }, { count: dc }] = await Promise.all([
      supabase.from('phone_clicks').select('*', { count: 'exact', head: true }),
      supabase.from('form_drafts').select('*', { count: 'exact', head: true }),
    ]);
    phone = pc ?? 0;
    drafts = dc ?? 0;
  } catch {}
  return { phone, drafts };
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login');

  const settings = await getSettings();
  const [leads, counts] = await Promise.all([loadLeads(), loadCounts()]);

  const now = Date.now();
  const last7 = leads.filter((l) => now - new Date(l.created_at).getTime() < 7 * 86400_000).length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const inProgressCount = leads.filter((l) => l.status === 'contacted').length;
  const completeCount = leads.filter((l) => l.status === 'complete').length;
  const lostCount = leads.filter((l) => l.status === 'lost').length;

  const totalRevenue = leads
    .filter((l) => l.status === 'complete')
    .reduce((sum, l) => sum + (Number(l.earned) || 0), 0);

  const last30Revenue = leads
    .filter(
      (l) =>
        l.status === 'complete' &&
        l.closed_at &&
        now - new Date(l.closed_at).getTime() < 30 * 86400_000
    )
    .reduce((sum, l) => sum + (Number(l.earned) || 0), 0);

  const closed = completeCount + lostCount;
  const winRate = closed > 0 ? Math.round((completeCount / closed) * 100) : 0;

  return (
    <AdminShell active="leads" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Leads</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Click any row to update status. Mark complete to log how much you earned.
          </p>
        </div>
        <Link
          href="/admin/leads/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-primary-dark"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
          New lead
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          tone="primary"
          label="Revenue (all time)"
          value={`£${totalRevenue.toFixed(2)}`}
          sub={`£${last30Revenue.toFixed(2)} in last 30 days`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
            </svg>
          }
        />
        <Stat
          tone="green"
          label="Complete"
          value={completeCount.toString()}
          sub={`${winRate}% win rate of closed leads`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
            </svg>
          }
        />
        <Stat
          tone="blue"
          label="New leads"
          value={newCount.toString()}
          sub={`${last7} arrived in last 7 days`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          }
        />
        <Stat
          tone="amber"
          label="In progress"
          value={inProgressCount.toString()}
          sub={`${counts.drafts} abandoned drafts · ${counts.phone} phone clicks`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
            </svg>
          }
        />
      </div>

      <LeadsTable leads={leads} />
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
