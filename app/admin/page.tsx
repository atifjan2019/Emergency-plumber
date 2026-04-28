import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';

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
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from('leads')
    .select('id, name, phone, email, city_slug, message, source_page, created_at')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) {
    console.error('[admin] load leads error:', error.message);
    return [];
  }
  return (data ?? []) as Lead[];
}

async function loadPhoneClickCount(): Promise<number> {
  const supabase = getServiceClient();
  const { count, error } = await supabase
    .from('phone_clicks')
    .select('id', { count: 'exact', head: true });
  if (error) {
    console.error('[admin] phone clicks count error:', error.message);
    return 0;
  }
  return count ?? 0;
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login');

  const [leads, phoneClicks] = await Promise.all([loadLeads(), loadPhoneClickCount()]);

  return (
    <div className="container-content py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Leads</h1>
          <p className="mt-1 text-sm text-gray-soft">
            All submissions from the contact form, quote popup and area-page quote forms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings"
            className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
          >
            Site settings
          </Link>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Total leads" value={leads.length.toString()} />
        <Stat
          label="Last 7 days"
          value={leads.filter((l) => Date.now() - new Date(l.created_at).getTime() < 7 * 86400_000).length.toString()}
        />
        <Stat label="Phone clicks (all time)" value={phoneClicks.toString()} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-gray-line bg-white">
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
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-line bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-soft">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}
