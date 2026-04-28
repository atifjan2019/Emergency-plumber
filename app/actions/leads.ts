'use server';

import { getServiceClient } from '@/lib/supabase/server';

export type LeadFormState = {
  ok: boolean;
  message: string;
};

const trim = (v: FormDataEntryValue | null) =>
  typeof v === 'string' ? v.trim() : '';

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const honeypot = trim(formData.get('company'));
  if (honeypot) {
    return { ok: true, message: 'Thanks, we will be in touch shortly.' };
  }

  const name = trim(formData.get('name'));
  const phone = trim(formData.get('phone'));
  const email = trim(formData.get('email'));
  const citySlug = trim(formData.get('city_slug'));
  const message = trim(formData.get('message'));
  const sourcePage = trim(formData.get('source_page'));

  if (!name) {
    return { ok: false, message: 'Please tell us your name.' };
  }
  if (!phone && !email) {
    return { ok: false, message: 'Please leave a phone number or email so we can reply.' };
  }
  if (!message) {
    return { ok: false, message: 'Please add a short message about what you need.' };
  }

  if (name.length > 200 || message.length > 4000 || phone.length > 50 || email.length > 200) {
    return { ok: false, message: 'One of those fields is unusually long. Please shorten and resubmit.' };
  }

  const draftId = trim(formData.get('draft_id'));

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('leads').insert({
      name,
      phone: phone || null,
      email: email || null,
      city_slug: citySlug || null,
      message,
      source_page: sourcePage || null,
    });

    if (error) {
      console.error('[leads] insert error:', error.message);
      return { ok: false, message: 'Something went wrong on our end. Please call us instead.' };
    }

    if (draftId) {
      await supabase.from('form_drafts').delete().eq('draft_id', draftId);
    }
  } catch (err) {
    console.error('[leads] unexpected error:', err);
    return { ok: false, message: 'Something went wrong on our end. Please call us instead.' };
  }

  return { ok: true, message: 'Thanks, we have your details and will be in touch shortly.' };
}
