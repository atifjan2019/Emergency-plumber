import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Leads',
  robots: { index: false, follow: false },
};

type Lead = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city_slug: string | null;
  message: string;
  source_page: string | null;
  created_at: string;
};

async function loadLeads(): Promise<Lead[]> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, phone, email, city_slug, message, source_page, created_at')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) {
      console.warn('[admin] load leads:', error.message || JSON.stringify(error));
      return [];
    }
    return (data ?? []) as Lead[];
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

  const last7 = leads.filter(
    (l) => Date.now() - new Date(l.created_at).getTime() < 7 * 86400_000
  ).length;

  return (
    <AdminShell active="leads" brand={settings.brand}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Leads</h1>
          <p className="mt-1 text-sm text-gray-soft">
            All submissions from the contact form, quote popup and area-page quote forms.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Total leads" value={leads.length.toString()} />
        <Stat label="Last 7 days" value={last7.toString()} />
        <Stat label="Abandoned drafts" value={counts.drafts.toString()} />
        <Stat label="Phone clicks" value={counts.phone.toString()} />
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-off-white text-xs uppercase tracking-wide text-gray-soft">
              <tr>
                <th className="px-4 py-3 text-left">When</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-soft">
                    No leads yet. Submissions will appear here.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-gray-line align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-soft">
                    {new Date(lead.created_at).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">{lead.name}</td>
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3 capitalize text-ink">{lead.city_slug || '-'}</td>
                  <td className="px-4 py-3 text-xs text-gray-soft">{lead.source_page || '-'}</td>
                  <td className="px-4 py-3 max-w-md text-ink">{lead.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}
