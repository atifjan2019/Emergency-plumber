import 'server-only';
import { cookies } from 'next/headers';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || '524862';
const COOKIE_NAME = 'rf_admin';
const COOKIE_VALUE = '1';
const MAX_AGE_DAYS = 7;

export function checkPasscode(input: string): boolean {
  return input === ADMIN_PASSCODE;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * MAX_AGE_DAYS,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
