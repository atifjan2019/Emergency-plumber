import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin');

  return (
    <div className="container-content py-16">
      <div className="mx-auto max-w-sm rounded-2xl border border-gray-line bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-ink">Admin login</h1>
        <p className="mt-1 text-sm text-gray-soft">Enter the passcode to view leads.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
