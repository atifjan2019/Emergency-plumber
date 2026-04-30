import 'server-only';
import { cache } from 'react';
import { getServiceClient } from '@/lib/supabase/server';
import { normalizeR2Url } from '@/lib/r2';
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
  // SEO
  metaTitleDefault: string;
  metaDescriptionDefault: string;
  ogImageUrl: string;
  twitterHandle: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  gtmId: string;
  gaId: string;
  clarityId: string;
  keywords: string;
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
  metaTitleDefault: '',
  metaDescriptionDefault: '',
  ogImageUrl: '',
  twitterHandle: '',
  googleSiteVerification: '',
  bingSiteVerification: '',
  gtmId: '',
  gaId: '',
  clarityId: 'wjx29fn330',
  keywords: '',
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
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
      faviconUrl: normalizeR2Url(data.favicon_url || ''),
      logoUrl: normalizeR2Url(data.logo_url || ''),
      metaTitleDefault: data.meta_title_default || '',
      metaDescriptionDefault: data.meta_description_default || '',
      ogImageUrl: normalizeR2Url(data.og_image_url || ''),
      twitterHandle: data.twitter_handle || '',
      googleSiteVerification: data.google_site_verification || '',
      bingSiteVerification: data.bing_site_verification || '',
      gtmId: data.gtm_id || '',
      gaId: data.ga_id || '',
      clarityId: data.clarity_id || fallback.clarityId,
      keywords: data.keywords || '',
    };
  } catch (err) {
    console.error('[settings] unexpected error:', err);
    return fallback;
  }
});
