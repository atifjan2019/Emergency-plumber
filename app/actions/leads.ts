'use server';

import { getServiceClient } from '@/lib/supabase/server';
import { getSettings } from '@/lib/settings';
import {
  buildAdminLeadEmail,
  buildUserConfirmationEmail,
  getAlertRecipient,
  sendMail,
} from '@/lib/email';

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
  const userMessage = trim(formData.get('message'));
  const sourcePage = trim(formData.get('source_page'));
  const postcode = trim(formData.get('postcode'));
  const serviceType = trim(formData.get('service_type'));
  const urgency = trim(formData.get('urgency'));

  const metaParts: string[] = [];
  if (postcode) metaParts.push(`Postcode: ${postcode.toUpperCase()}`);
  if (serviceType) metaParts.push(`Service: ${serviceType}`);
  if (urgency) metaParts.push(`Urgency: ${urgency}`);
  const message = metaParts.length
    ? `${metaParts.join(' | ')}\n\n${userMessage}`
    : userMessage;

  if (!name) {
    return { ok: false, message: 'Please tell us your name.' };
  }
  if (!phone && !email) {
    return { ok: false, message: 'Please leave a phone number or email so we can reply.' };
  }
  if (!userMessage) {
    return { ok: false, message: 'Please add a short message about what you need.' };
  }

  if (name.length > 200 || message.length > 4000 || phone.length > 50 || email.length > 200) {
    return { ok: false, message: 'One of those fields is unusually long. Please shorten and resubmit.' };
  }
  if (postcode.length > 12 || serviceType.length > 80 || urgency.length > 80) {
    return { ok: false, message: 'One of those fields is unusually long. Please shorten and resubmit.' };
  }

  const draftId = trim(formData.get('draft_id'));

  let leadId: string | undefined;
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone: phone || null,
        email: email || null,
        city_slug: citySlug || null,
        message,
        source_page: sourcePage || null,
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('[leads] insert error:', error.message);
      return { ok: false, message: 'Something went wrong on our end. Please call us instead.' };
    }
    leadId = data?.id;

    if (draftId) {
      await supabase.from('form_drafts').delete().eq('draft_id', draftId);
    }

    // Fire emails after the lead is saved. Errors are logged but do not fail the user submission.
    const settings = await getSettings();
    const brand = {
      brand: settings.brand,
      phoneDisplay: settings.phoneDisplay,
      phoneTel: settings.phoneTel,
      email: settings.email,
      siteUrl: settings.siteUrl,
    };

    const adminEmail = buildAdminLeadEmail(
      {
        id: leadId,
        name,
        phone,
        email,
        city_slug: citySlug,
        message,
        source_page: sourcePage,
        created_at: data?.created_at,
      },
      brand
    );
    const adminResult = await sendMail({
      to: getAlertRecipient(),
      replyTo: email || undefined,
      brand: settings.brand,
      ...adminEmail,
    });
    if (adminResult.ok && leadId) {
      await supabase
        .from('leads')
        .update({ admin_notified_at: new Date().toISOString() })
        .eq('id', leadId);
    }

    if (email) {
      const userEmail = buildUserConfirmationEmail(
        { name, phone, email, city_slug: citySlug, message, source_page: sourcePage },
        brand
      );
      const userResult = await sendMail({
        to: email,
        replyTo: settings.email,
        brand: settings.brand,
        ...userEmail,
      });
      if (userResult.ok && leadId) {
        await supabase
          .from('leads')
          .update({ user_notified_at: new Date().toISOString() })
          .eq('id', leadId);
      }
    }
  } catch (err) {
    console.error('[leads] unexpected error:', err);
    return { ok: false, message: 'Something went wrong on our end. Please call us instead.' };
  }

  return { ok: true, message: 'Thanks, we have your details and will be in touch shortly.' };
}
