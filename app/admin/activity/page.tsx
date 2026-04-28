import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/settings';
import { loadActivity } from '@/lib/admin/activity';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Activity log',
  robots: { index: false, follow: false },
};

const ACTION_BADGE: Record<string, string> = {
  create: 'bg-green-100 text-green-800',
  update: 'bg-amber-100 text-amber-800',
  delete: 'bg-red-100 text-red-800',
  login: 'bg-blue-100 text-blue-800',
  upload: 'bg-purple-100 text-purple-800',
};

export default async function AdminActivityPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const rows = await loadActivity(500);

  return (
    <AdminShell active="activity" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div>
        <h1 className="text-2xl font-bold text-ink">Activity log</h1>
        <p className="mt-1 text-sm text-gray-soft">
          Last 15 days of admin actions. Older entries are deleted automatically on each new write.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-line bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-off-white text-xs uppercase tracking-wide text-gray-soft">
              <tr>
                <th className="px-4 py-3 text-left">When</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Entity</th>
                <th className="px-4 py-3 text-left">Summary</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-soft">
                    No activity recorded yet.
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-line align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-soft">
                    {new Date(row.created_at).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
                        ACTION_BADGE[row.action] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {row.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize text-ink">{row.entity}</td>
                  <td className="px-4 py-3 text-ink">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
