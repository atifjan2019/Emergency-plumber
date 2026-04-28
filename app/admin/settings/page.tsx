import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/settings';
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
    <div className="container-content py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Site settings</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Edit phone, email, address, logo and favicon. Saves apply across the entire site.
          </p>
        </div>
        <Link
          href="/admin"
          className="rounded-lg border border-gray-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-primary hover:text-primary"
        >
          ← Back to leads
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-gray-line bg-white p-6">
        <SettingsForm defaults={s} />
      </div>
    </div>
  );
}
