import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Abandoned drafts',
  robots: { index: false, follow: false },
};

type Draft = {
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

async function loadDrafts(): Promise<Draft[]> {
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
    return (data ?? []) as Draft[];
  } catch (err) {
    console.warn('[admin] load drafts exception:', err);
    return [];
  }
}

export default async function AdminDraftsPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const drafts = await loadDrafts();

  return (
    <AdminShell active="drafts" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div>
        <h1 className="text-2xl font-bold text-ink">Abandoned drafts</h1>
        <p className="mt-1 text-sm text-gray-soft">
          Visitors who started filling a form but did not submit. Auto-saved every 1.5 seconds and on
          page exit. Drafts are deleted automatically when the form is submitted successfully.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {drafts.length === 0 && (
          <div className="rounded-xl border border-gray-line bg-white p-10 text-center text-gray-soft">
            No abandoned drafts yet.
          </div>
        )}
        {drafts.map((d) => (
          <div key={d.draft_id} className="rounded-xl border border-gray-line bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                    {d.form_type}
                  </span>
                  <span className="text-xs text-gray-soft">
                    {d.field_count} field{d.field_count === 1 ? '' : 's'} filled
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {d.name || <span className="italic text-gray-soft">No name yet</span>}
                </h3>
              </div>
              <div className="text-xs text-gray-soft text-right">
                <div>
                  Last typed:{' '}
                  {new Date(d.updated_at).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div>
                  Started:{' '}
                  {new Date(d.created_at).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {d.phone && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-soft">Phone</dt>
                  <dd>
                    <a href={`tel:${d.phone}`} className="text-primary hover:underline">
                      {d.phone}
                    </a>
                  </dd>
                </div>
              )}
              {d.email && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-soft">Email</dt>
                  <dd>
                    <a href={`mailto:${d.email}`} className="text-primary hover:underline">
                      {d.email}
                    </a>
                  </dd>
                </div>
              )}
              {d.city_slug && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-soft">City</dt>
                  <dd className="capitalize text-ink">{d.city_slug}</dd>
                </div>
              )}
              {d.source_page && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-soft">Source page</dt>
                  <dd className="text-ink break-all">{d.source_page}</dd>
                </div>
              )}
            </dl>

            {d.message && (
              <div className="mt-4 rounded-lg bg-off-white p-3 text-sm text-ink">
                <div className="text-xs uppercase tracking-wide text-gray-soft">Message so far</div>
                <p className="mt-1 whitespace-pre-line">{d.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
