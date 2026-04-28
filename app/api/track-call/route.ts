import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  source_page?: unknown;
  city_slug?: unknown;
};

const asString = (v: unknown, max: number) =>
  typeof v === 'string' ? v.slice(0, max) : null;

export async function POST(req: Request) {
  let body: Payload = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text) as Payload;
  } catch {
    body = {};
  }

  const sourcePage = asString(body.source_page, 500);
  const citySlug = asString(body.city_slug, 100);
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null;

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('phone_clicks').insert({
      source_page: sourcePage,
      city_slug: citySlug,
      user_agent: userAgent,
    });
    if (error) {
      console.error('[track-call] insert error:', error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } catch (err) {
    console.error('[track-call] unexpected error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
