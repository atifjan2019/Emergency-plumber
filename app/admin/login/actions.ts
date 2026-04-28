'use server';

import { redirect } from 'next/navigation';
import { checkPasscode, setAdminCookie } from '@/lib/admin/auth';

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const passcode = String(formData.get('passcode') || '').trim();
  if (!checkPasscode(passcode)) {
    return { error: 'Wrong passcode.' };
  }
  await setAdminCookie();
  redirect('/admin');
}
