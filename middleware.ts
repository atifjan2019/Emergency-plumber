import { NextResponse, type NextRequest } from 'next/server';

const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_name',
  'utm_brand',
  'utm_social',
  'utm_social-type',
  'fbclid',
  'gclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'yclid',
  'twclid',
  'igshid',
  'ref',
  'ref_src',
  '_hsenc',
  '_hsmi',
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let stripped = false;
  for (const key of TRACKING_PARAMS) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
      stripped = true;
    }
  }
  if (stripped) {
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api|admin).*)',
  ],
};
