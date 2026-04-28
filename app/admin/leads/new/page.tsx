import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import LeadForm from '../LeadForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · New lead',
  robots: { index: false, follow: false },
};

export default async function NewLeadPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const s = await getSettings();
  return (
    <AdminShell active="leads" brand={s.brand} logoUrl={s.logoUrl}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">New lead</h1>
          <p className="mt-1 text-sm text-gray-soft">Add a lead manually (e.g. captured by phone).</p>
        </div>
        <Link
          href="/admin"
          className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
        >
          ← Back to leads
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-gray-line bg-white p-6 shadow-sm">
        <LeadForm mode="create" />
      </div>
    </AdminShell>
  );
}
