import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import LeadForm from '../LeadForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Edit lead',
  robots: { index: false, follow: false },
};

type LeadRow = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city_slug: string | null;
  message: string;
  source_page: string | null;
  created_at: string;
};

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) redirect('/admin/login');
  const { id } = await params;
  const settings = await getSettings();

  let lead: LeadRow | null = null;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, phone, email, city_slug, message, source_page, created_at')
      .eq('id', id)
      .maybeSingle();
    if (error) console.warn('[admin] load lead:', error.message);
    lead = (data ?? null) as LeadRow | null;
  } catch (err) {
    console.warn('[admin] load lead exception:', err);
  }

  if (!lead) notFound();

  return (
    <AdminShell active="leads" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Edit lead</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Created{' '}
            {new Date(lead.created_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
        >
          ← Back to leads
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-gray-line bg-white p-6 shadow-sm">
        <LeadForm
          mode="edit"
          defaults={{
            id: lead.id,
            name: lead.name,
            phone: lead.phone ?? '',
            email: lead.email ?? '',
            city_slug: lead.city_slug ?? '',
            message: lead.message,
            source_page: lead.source_page ?? '',
          }}
        />
      </div>
    </AdminShell>
  );
}
