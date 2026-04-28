import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import { loadActivity } from '@/lib/admin/activity';
import AdminShell from '@/components/admin/AdminShell';
import StatusBadge from '@/components/admin/StatusBadge';
import type { LeadStatus } from '@/lib/admin/leadStatus';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Dashboard',
  robots: { index: false, follow: false },
};

type DashLead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city_slug: string | null;
  status: LeadStatus;
  earned: number;
  created_at: string;
  closed_at: string | null;
};

async function loadDashboardData() {
  let leads: DashLead[] = [];
  let phoneClicks = 0;
  let drafts = 0;
  try {
    const supabase = getServiceClient();
    const [leadsRes, phoneRes, draftRes] = await Promise.all([
      supabase
        .from('leads')
        .select('id, name, phone, email, city_slug, status, earned, created_at, closed_at')
        .order('created_at', { ascending: false })
        .limit(500),
      supabase.from('phone_clicks').select('*', { count: 'exact', head: true }),
      supabase.from('form_drafts').select('*', { count: 'exact', head: true }),
    ]);
    if (leadsRes.error) console.warn('[dashboard] leads:', leadsRes.error.message);
    leads = (leadsRes.data ?? []).map((r) => ({
      id: String(r.id),
      name: String(r.name),
      phone: r.phone ?? null,
      email: r.email ?? null,
      city_slug: r.city_slug ?? null,
      status: (r.status as LeadStatus) ?? 'new',
      earned: Number(r.earned ?? 0),
      created_at: String(r.created_at),
      closed_at: r.closed_at ?? null,
    }));
    phoneClicks = phoneRes.count ?? 0;
    drafts = draftRes.count ?? 0;
  } catch (err) {
    console.warn('[dashboard] load exception:', err);
  }
  return { leads, phoneClicks, drafts };
}

export default async function AdminDashboardPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const [{ leads, phoneClicks, drafts }, activity] = await Promise.all([
    loadDashboardData(),
    loadActivity(10),
  ]);

  const now = Date.now();
  const inWindow = (iso: string | null, days: number) =>
    iso ? now - new Date(iso).getTime() < days * 86400_000 : false;

  const last7 = leads.filter((l) => inWindow(l.created_at, 7)).length;
  const last30 = leads.filter((l) => inWindow(l.created_at, 30)).length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const inProgressCount = leads.filter((l) => l.status === 'contacted').length;
  const completeCount = leads.filter((l) => l.status === 'complete').length;
  const lostCount = leads.filter((l) => l.status === 'lost').length;
  const totalLeads = leads.length;

  const totalRevenue = leads
    .filter((l) => l.status === 'complete')
    .reduce((s, l) => s + (Number(l.earned) || 0), 0);

  const last30Revenue = leads
    .filter((l) => l.status === 'complete' && inWindow(l.closed_at, 30))
    .reduce((s, l) => s + (Number(l.earned) || 0), 0);

  const last7Revenue = leads
    .filter((l) => l.status === 'complete' && inWindow(l.closed_at, 7))
    .reduce((s, l) => s + (Number(l.earned) || 0), 0);

  const closed = completeCount + lostCount;
  const winRate = closed > 0 ? Math.round((completeCount / closed) * 100) : 0;

  const avgDealSize = completeCount > 0 ? totalRevenue / completeCount : 0;

  // Pipeline distribution as percentages of total
  const pct = (n: number) => (totalLeads > 0 ? (n / totalLeads) * 100 : 0);

  // Last 7 days revenue trend (one bar per day)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const dayRevenues = days.map((d) => {
    const start = d.getTime();
    const end = start + 86400_000;
    return leads
      .filter((l) => l.status === 'complete' && l.closed_at)
      .filter((l) => {
        const t = new Date(l.closed_at!).getTime();
        return t >= start && t < end;
      })
      .reduce((s, l) => s + (Number(l.earned) || 0), 0);
  });
  const maxDayRevenue = Math.max(...dayRevenues, 1);

  const recentLeads = leads.slice(0, 5);

  return (
    <AdminShell active="dashboard" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Overview of leads, revenue, and recent activity.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
        >
          View all leads
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          tone="primary"
          label="Revenue (all time)"
          value={`£${totalRevenue.toFixed(2)}`}
          sub={`£${last30Revenue.toFixed(2)} last 30d · £${last7Revenue.toFixed(2)} last 7d`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
            </svg>
          }
        />
        <Stat
          tone="green"
          label="Average deal size"
          value={`£${avgDealSize.toFixed(2)}`}
          sub={`Across ${completeCount} completed lead${completeCount === 1 ? '' : 's'}`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-4 4 4 7-7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 6h6v6" />
            </svg>
          }
        />
        <Stat
          tone="blue"
          label="Total leads"
          value={totalLeads.toString()}
          sub={`${last7} arrived in last 7 days · ${last30} in last 30`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 00-3-3.87" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          }
        />
        <Stat
          tone="amber"
          label="Win rate"
          value={`${winRate}%`}
          sub={`${completeCount} won · ${lostCount} lost · ${closed} closed`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 21l4-4 4 4M8 3l4 4 4-4" />
            </svg>
          }
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-ink">Pipeline</h2>
              <p className="mt-0.5 text-xs text-gray-soft">Distribution of all leads by current status.</p>
            </div>
            <Link href="/admin/leads" className="text-xs font-semibold text-primary hover:underline">
              Open leads →
            </Link>
          </div>

          <div className="mt-5 flex h-3 w-full overflow-hidden rounded-full bg-off-white">
            {totalLeads === 0 ? (
              <div className="w-full bg-gray-line" />
            ) : (
              <>
                <div className="bg-blue-400" style={{ width: `${pct(newCount)}%` }} />
                <div className="bg-amber-400" style={{ width: `${pct(inProgressCount)}%` }} />
                <div className="bg-green-500" style={{ width: `${pct(completeCount)}%` }} />
                <div className="bg-red-400" style={{ width: `${pct(lostCount)}%` }} />
              </>
            )}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <PipelineCell color="bg-blue-400" label="New" count={newCount} />
            <PipelineCell color="bg-amber-400" label="In progress" count={inProgressCount} />
            <PipelineCell color="bg-green-500" label="Complete" count={completeCount} />
            <PipelineCell color="bg-red-400" label="Lost" count={lostCount} />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">Revenue · last 7 days</h3>
              <span className="text-xs font-semibold text-primary tabular-nums">£{last7Revenue.toFixed(2)}</span>
            </div>
            <div className="mt-4 grid grid-cols-7 items-end gap-2">
              {days.map((d, i) => {
                const v = dayRevenues[i];
                const h = Math.max(4, (v / maxDayRevenue) * 100);
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="relative flex h-32 w-full items-end">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-primary to-primary/60 transition"
                        style={{ height: `${h}%` }}
                        title={`£${v.toFixed(2)}`}
                      />
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-gray-soft">
                      {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                    </div>
                    <div className="text-[10px] tabular-nums text-ink">£{v.toFixed(0)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink">Engagement</h2>
          </div>
          <div className="mt-4 space-y-4">
            <KvRow
              label="Phone clicks"
              value={phoneClicks.toString()}
              hint="All-time tap-to-call events on your CallButton."
            />
            <KvRow
              label="Abandoned drafts"
              value={drafts.toString()}
              hint="Visitors who started typing in a form but did not submit."
              href="/admin/drafts"
            />
            <KvRow
              label="New this week"
              value={last7.toString()}
              hint="Leads submitted in the last 7 days."
            />
            <KvRow
              label="Closed this month"
              value={(completeCount + lostCount).toString()}
              hint="Both wins and losses count as closed."
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-line bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-line px-6 py-4">
            <h2 className="text-base font-bold text-ink">Recent leads</h2>
            <Link href="/admin/leads" className="text-xs font-semibold text-primary hover:underline">
              See all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-gray-soft">No leads yet.</div>
          ) : (
            <ul className="divide-y divide-gray-line">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <Link
                      href="/admin/leads"
                      className="font-semibold text-ink hover:text-primary"
                    >
                      {l.name}
                    </Link>
                    <div className="mt-0.5 truncate text-xs text-gray-soft">
                      {l.city_slug && <span className="capitalize">{l.city_slug} · </span>}
                      {new Date(l.created_at).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {l.phone && <span> · {l.phone}</span>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {l.status === 'complete' && l.earned > 0 && (
                      <span className="text-sm font-bold tabular-nums text-green-700">
                        £{l.earned.toFixed(2)}
                      </span>
                    )}
                    <StatusBadge status={l.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-gray-line bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-line px-6 py-4">
            <h2 className="text-base font-bold text-ink">Recent activity</h2>
            <Link href="/admin/activity" className="text-xs font-semibold text-primary hover:underline">
              See all
            </Link>
          </div>
          {activity.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-gray-soft">No activity yet.</div>
          ) : (
            <ul className="divide-y divide-gray-line">
              {activity.slice(0, 8).map((row) => (
                <li key={row.id} className="px-6 py-3.5">
                  <div className="text-sm text-ink">{row.summary}</div>
                  <div className="mt-0.5 text-xs text-gray-soft">
                    {new Date(row.created_at).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    <span className="capitalize"> · {row.action} {row.entity}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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

function PipelineCell({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div className="rounded-lg border border-gray-line bg-off-white p-3">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</span>
      </div>
      <div className="mt-1.5 text-xl font-bold tabular-nums text-ink">{count}</div>
    </div>
  );
}

function KvRow({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="text-xl font-extrabold tabular-nums text-ink">{value}</span>
      </div>
      {hint && <p className="mt-0.5 text-xs text-gray-soft">{hint}</p>}
    </>
  );
  if (href) {
    return (
      <Link href={href} className="block rounded-lg p-3 -mx-3 transition hover:bg-off-white">
        {inner}
      </Link>
    );
  }
  return <div className="rounded-lg p-3 -mx-3">{inner}</div>;
}
