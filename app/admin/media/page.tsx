import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getSettings } from '@/lib/settings';
import { listMedia, getR2ConfigStatus } from '@/lib/r2';
import AdminShell from '@/components/admin/AdminShell';
import MediaGrid from './MediaGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Media',
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  if (!(await isAdmin())) redirect('/admin/login');
  const settings = await getSettings();
  const config = getR2ConfigStatus();
  const items = config.configured ? await listMedia() : [];

  const totalBytes = items.reduce((s, i) => s + i.size, 0);

  return (
    <AdminShell active="media" brand={settings.brand} logoUrl={settings.logoUrl}>
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-ink">Media library</h1>
          <p className="mt-1 text-sm text-gray-soft">
            Upload images to your Cloudflare R2 bucket. Files are served from the public R2 URL,
            cached at the edge, and ready to drop into pages, services, city heroes, or content.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          tone="primary"
          label="Files in bucket"
          value={items.length.toString()}
          sub={config.configured ? 'Sorted newest first' : 'Connect R2 to load'}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
            </svg>
          }
        />
        <Stat
          tone="green"
          label="Storage used"
          value={formatBytes(totalBytes)}
          sub="R2 free tier: 10 GB / month"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5M12 15V3" />
            </svg>
          }
        />
        <Stat
          tone="blue"
          label="Bucket"
          value={config.bucket}
          sub="Cloudflare R2"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 10c0-3.3-2.7-6-6-6s-6 2.7-6 6c-2.2 0-4 1.8-4 4s1.8 4 4 4h12c2.2 0 4-1.8 4-4s-1.8-4-4-4z" />
            </svg>
          }
        />
        <Stat
          tone={config.configured ? 'green' : 'amber'}
          label="Status"
          value={config.configured ? 'Connected' : 'Not connected'}
          sub={config.reason}
          icon={
            config.configured ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.3 3.86l-8.5 14.71A2 2 0 003.5 22h17a2 2 0 001.71-3.43l-8.5-14.71a2 2 0 00-3.42 0z" />
              </svg>
            )
          }
        />
      </div>

      <MediaGrid items={items} configured={config.configured} />
    </AdminShell>
  );
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
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
      <div className="mt-3 text-xl font-extrabold text-ink truncate" title={value}>{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-soft truncate" title={sub}>{sub}</div>}
    </div>
  );
}
