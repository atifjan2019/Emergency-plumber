import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import LeadsTable, { type AdminLead } from '@/components/admin/LeadsTable';
import type { LeadStatus } from '@/lib/admin/leadStatus';

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
      .select('id, name, phone, email, city_slug, message, source_page, status, earned, notes, created_at, closed_at, admin_notified_at, user_notified_at')
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
      admin_notified_at: row.admin_notified_at ?? null,
      user_notified_at: row.user_notified_at ?? null,
    }));
  } catch (err) {
    console.warn('[admin] load leads exception:', err);
    return [];
  }
}

export default async function AdminLeadsPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const leads = await loadLeads();

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

      <LeadsTable leads={leads} />
    </AdminShell>
  );
}
