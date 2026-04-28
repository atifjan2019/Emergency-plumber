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

export const LEAD_STATUSES = ['new', 'contacted', 'complete', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'In progress',
  complete: 'Complete',
  lost: 'Lost',
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
        status: 'new',
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

  revalidatePath('/admin', 'layout');
  redirect('/admin/leads');
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
  const notes = trim(formData.get('notes'));

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
        notes,
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

  revalidatePath('/admin', 'layout');
  redirect('/admin/leads');
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

  revalidatePath('/admin', 'layout');
}

export type StatusActionState = {
  ok: boolean;
  message: string;
};

export async function updateLeadStatus(
  _prev: StatusActionState,
  formData: FormData
): Promise<StatusActionState> {
  if (!(await ensureAdmin())) return { ok: false, message: 'Not authorised.' };

  const id = trim(formData.get('id'));
  const status = trim(formData.get('status')) as LeadStatus;
  const earnedRaw = trim(formData.get('earned'));
  const notes = trim(formData.get('notes'));
  const nameHint = trim(formData.get('name_hint'));

  if (!id) return { ok: false, message: 'Missing lead id.' };
  if (!LEAD_STATUSES.includes(status)) {
    return { ok: false, message: 'Invalid status value.' };
  }

  let earned = 0;
  if (status === 'complete') {
    const parsed = parseFloat(earnedRaw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return { ok: false, message: 'Enter a valid earned amount (0 or higher).' };
    }
    earned = Math.round(parsed * 100) / 100;
  }

  const isTerminal = status === 'complete' || status === 'lost';

  const update: Record<string, unknown> = {
    status,
    earned: status === 'complete' ? earned : 0,
    closed_at: isTerminal ? new Date().toISOString() : null,
  };
  if (notes) update.notes = notes;

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('leads').update(update).eq('id', id);
    if (error) {
      console.error('[leads] status update error:', error.message);
      return { ok: false, message: 'Could not update status.' };
    }

    const label = STATUS_LABEL[status];
    const earnedSuffix =
      status === 'complete' && earned > 0 ? ` (£${earned.toFixed(2)})` : '';
    const personHint = nameHint ? ` "${nameHint}"` : '';
    await logActivity(
      'update',
      'lead',
      `Marked lead${personHint} as ${label}${earnedSuffix}`,
      { entityId: id, metadata: { status, earned } }
    );
  } catch (err) {
    console.error('[leads] status update exception:', err);
    return { ok: false, message: 'Could not update status.' };
  }

  revalidatePath('/admin', 'layout');
  return { ok: true, message: 'Saved.' };
}
