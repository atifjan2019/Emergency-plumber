import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  await clearAdminCookie();
  const url = new URL('/admin/login', req.url);
  return NextResponse.redirect(url, { status: 303 });
}
