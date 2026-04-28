import 'server-only';
import { cache } from 'react';
import { getServiceClient } from '@/lib/supabase/server';
import {
  BRAND,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  GAS_SAFE_NUMBER,
  SITE_URL,
} from '@/lib/constants';

export type SiteSettings = {
  brand: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  address: string;
  gasSafeNumber: string;
  siteUrl: string;
  faviconUrl: string;
  logoUrl: string;
};

const fallback: SiteSettings = {
  brand: BRAND,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: EMAIL,
  address: '',
  gasSafeNumber: GAS_SAFE_NUMBER,
  siteUrl: SITE_URL,
  faviconUrl: '',
  logoUrl: '',
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('brand, phone_display, phone_tel, email, address, gas_safe_number, site_url, favicon_url, logo_url')
      .eq('id', 1)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error('[settings] load error:', error.message);
      return fallback;
    }

    return {
      brand: data.brand || fallback.brand,
      phoneDisplay: data.phone_display || fallback.phoneDisplay,
      phoneTel: data.phone_tel || fallback.phoneTel,
      email: data.email || fallback.email,
      address: data.address || '',
      gasSafeNumber: data.gas_safe_number || fallback.gasSafeNumber,
      siteUrl: data.site_url || fallback.siteUrl,
      faviconUrl: data.favicon_url || '',
      logoUrl: data.logo_url || '',
    };
  } catch (err) {
    console.error('[settings] unexpected error:', err);
    return fallback;
  }
});
