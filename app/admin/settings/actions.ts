'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { uploadToR2 } from '@/lib/r2';
import { logActivity } from '@/lib/admin/activity';

export type SettingsFormState = {
  ok: boolean;
  message: string;
};

const trim = (v: FormDataEntryValue | null) =>
  typeof v === 'string' ? v.trim() : '';

async function uploadAsset(
  file: File,
  prefix: 'logo' | 'favicon' | 'og'
): Promise<{ url?: string; error?: string }> {
  if (file.size === 0) return {};
  const result = await uploadToR2(file, null);
  if (result.error) return { error: `Failed to upload ${prefix}: ${result.error}` };
  return { url: result.url };
}

export async function saveSettings(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'Not authorised.' };
  }

  const brand = trim(formData.get('brand'));
  const phoneDisplay = trim(formData.get('phone_display'));
  const phoneTel = trim(formData.get('phone_tel'));
  const email = trim(formData.get('email'));
  const address = trim(formData.get('address'));
  const gasSafeNumber = trim(formData.get('gas_safe_number'));
  const siteUrl = trim(formData.get('site_url'));

  const metaTitleDefault = trim(formData.get('meta_title_default'));
  const metaDescriptionDefault = trim(formData.get('meta_description_default'));
  const twitterHandle = trim(formData.get('twitter_handle'));
  const googleSiteVerification = trim(formData.get('google_site_verification'));
  const bingSiteVerification = trim(formData.get('bing_site_verification'));
  const gtmId = trim(formData.get('gtm_id'));
  const gaId = trim(formData.get('ga_id'));
  const keywords = trim(formData.get('keywords'));

  if (!brand || !phoneDisplay || !phoneTel || !email) {
    return { ok: false, message: 'Brand, phone and email are required.' };
  }

  const update: Record<string, string> = {
    brand,
    phone_display: phoneDisplay,
    phone_tel: phoneTel,
    email,
    address,
    gas_safe_number: gasSafeNumber,
    site_url: siteUrl,
    meta_title_default: metaTitleDefault,
    meta_description_default: metaDescriptionDefault,
    twitter_handle: twitterHandle,
    google_site_verification: googleSiteVerification,
    bing_site_verification: bingSiteVerification,
    gtm_id: gtmId,
    ga_id: gaId,
    keywords,
  };

  if (formData.get('remove_logo') === '1') {
    update.logo_url = '';
  }
  if (formData.get('remove_favicon') === '1') {
    update.favicon_url = '';
  }

  const logoFile = formData.get('logo');
  if (logoFile instanceof File && logoFile.size > 0) {
    const r = await uploadAsset(logoFile, 'logo');
    if (r.error) return { ok: false, message: r.error };
    if (r.url) update.logo_url = r.url;
  }

  const faviconFile = formData.get('favicon');
  if (faviconFile instanceof File && faviconFile.size > 0) {
    const r = await uploadAsset(faviconFile, 'favicon');
    if (r.error) return { ok: false, message: r.error };
    if (r.url) update.favicon_url = r.url;
  }

  const ogFile = formData.get('og_image');
  if (ogFile instanceof File && ogFile.size > 0) {
    const r = await uploadAsset(ogFile, 'og');
    if (r.error) return { ok: false, message: r.error };
    if (r.url) update.og_image_url = r.url;
  }

  try {
    const supabase = getServiceClient();
    const { error } = await supabase
      .from('site_settings')
      .update({ ...update, updated_at: new Date().toISOString() })
      .eq('id', 1);

    if (error) {
      console.error('[settings] save error:', error.message);
      return { ok: false, message: 'Save failed. Try again.' };
    }
  } catch (err) {
    console.error('[settings] unexpected error:', err);
    return { ok: false, message: 'Save failed. Try again.' };
  }

  const changed = Object.keys(update).filter((k) => k !== 'updated_at');
  await logActivity('update', 'settings', `Updated site settings (${changed.length} fields)`, {
    metadata: { fields: changed },
  });

  revalidatePath('/', 'layout');
  return { ok: true, message: 'Saved. The site will refresh on the next page load.' };
}
