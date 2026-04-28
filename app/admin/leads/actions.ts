'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { logActivity } from '@/lib/admin/activity';

export type LeadActionState = {
  ok: boolean;
  message: string;
};

const trim = (v: FormDataEntryValue | null) =>
  typeof v === 'string' ? v.trim() : '';
const orNull = (v: string) => (v ? v : null);

async function ensureAdmin(): Promise<boolean> {
  return await isAdmin();
}

export async function createLead(
  _prev: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  if (!(await ensureAdmin())) return { ok: false, message: 'Not authorised.' };

  const name = trim(formData.get('name'));
  const phone = trim(formData.get('phone'));
  const email = trim(formData.get('email'));
  const citySlug = trim(formData.get('city_slug'));
  const message = trim(formData.get('message'));
  const sourcePage = trim(formData.get('source_page'));

  if (!name || !message) {
    return { ok: false, message: 'Name and message are required.' };
  }

  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone: orNull(phone),
        email: orNull(email),
        city_slug: orNull(citySlug),
        message,
        source_page: orNull(sourcePage) ?? 'admin',
      })
      .select('id')
      .single();
    if (error) {
      console.error('[leads] create error:', error.message);
      return { ok: false, message: 'Could not save the lead.' };
    }

    await logActivity('create', 'lead', `Admin created lead "${name}"`, {
      entityId: data?.id,
      metadata: { city_slug: citySlug, source: 'admin' },
    });
  } catch (err) {
    console.error('[leads] create exception:', err);
    return { ok: false, message: 'Could not save the lead.' };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateLead(
  _prev: LeadActionState,
  formData: FormData
): Promise<LeadActionState> {
  if (!(await ensureAdmin())) return { ok: false, message: 'Not authorised.' };

  const id = trim(formData.get('id'));
  if (!id) return { ok: false, message: 'Missing lead id.' };

  const name = trim(formData.get('name'));
  const phone = trim(formData.get('phone'));
  const email = trim(formData.get('email'));
  const citySlug = trim(formData.get('city_slug'));
  const message = trim(formData.get('message'));
  const sourcePage = trim(formData.get('source_page'));

  if (!name || !message) {
    return { ok: false, message: 'Name and message are required.' };
  }

  try {
    const supabase = getServiceClient();
    const { error } = await supabase
      .from('leads')
      .update({
        name,
        phone: orNull(phone),
        email: orNull(email),
        city_slug: orNull(citySlug),
        message,
        source_page: orNull(sourcePage),
      })
      .eq('id', id);
    if (error) {
      console.error('[leads] update error:', error.message);
      return { ok: false, message: 'Could not save changes.' };
    }

    await logActivity('update', 'lead', `Admin updated lead "${name}"`, {
      entityId: id,
    });
  } catch (err) {
    console.error('[leads] update exception:', err);
    return { ok: false, message: 'Could not save changes.' };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteLead(formData: FormData): Promise<void> {
  if (!(await ensureAdmin())) return;
  const id = trim(formData.get('id'));
  const nameHint = trim(formData.get('name_hint'));
  if (!id) return;

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      console.error('[leads] delete error:', error.message);
      return;
    }
    await logActivity(
      'delete',
      'lead',
      nameHint ? `Admin deleted lead "${nameHint}"` : 'Admin deleted a lead',
      { entityId: id }
    );
  } catch (err) {
    console.error('[leads] delete exception:', err);
  }

  revalidatePath('/admin');
}
