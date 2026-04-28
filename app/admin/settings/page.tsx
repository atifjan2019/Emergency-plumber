import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/settings';
import AdminShell from '@/components/admin/AdminShell';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Site settings',
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const s = await getSettings();

  return (
    <AdminShell active="settings" brand={s.brand} logoUrl={s.logoUrl}>
      <div>
        <h1 className="text-2xl font-bold text-ink">Site settings</h1>
        <p className="mt-1 text-sm text-gray-soft">
          Edit phone, email, address, logo and favicon. Saves apply across the entire site.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-gray-line bg-white p-6 shadow-sm">
        <SettingsForm defaults={s} />
      </div>
    </AdminShell>
  );
}
