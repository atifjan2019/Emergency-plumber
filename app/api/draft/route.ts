import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  draft_id?: unknown;
  form_type?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city_slug?: unknown;
  message?: unknown;
  source_page?: unknown;
};

const asString = (v: unknown, max: number) =>
  (typeof v === 'string' ? v : '').slice(0, max);

export async function POST(req: Request) {
  let body: Payload = {};
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text) as Payload;
  } catch {
    body = {};
  }

  const draftId = asString(body.draft_id, 100).trim();
  if (!draftId) {
    return NextResponse.json({ ok: false, error: 'missing draft_id' }, { status: 400 });
  }

  const formType = asString(body.form_type, 50) || 'quote';
  const name = asString(body.name, 200).trim();
  const phone = asString(body.phone, 50).trim();
  const email = asString(body.email, 200).trim();
  const citySlug = asString(body.city_slug, 100).trim();
  const message = asString(body.message, 4000).trim();
  const sourcePage = asString(body.source_page, 500).trim();
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? '';

  const fieldCount = [name, phone, email, message].filter(Boolean).length;

  try {
    const supabase = getServiceClient();
    if (fieldCount === 0) {
      await supabase.from('form_drafts').delete().eq('draft_id', draftId);
      return NextResponse.json({ ok: true, cleared: true });
    }
    const { error } = await supabase.from('form_drafts').upsert(
      {
        draft_id: draftId,
        form_type: formType,
        name,
        phone,
        email,
        city_slug: citySlug,
        message,
        source_page: sourcePage,
        user_agent: userAgent,
        field_count: fieldCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'draft_id' }
    );
    if (error) {
      console.warn('[draft] upsert error:', error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } catch (err) {
    console.warn('[draft] unexpected error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const draftId = url.searchParams.get('id') || '';
  if (!draftId) return NextResponse.json({ ok: true });
  try {
    const supabase = getServiceClient();
    await supabase.from('form_drafts').delete().eq('draft_id', draftId);
  } catch {}
  return NextResponse.json({ ok: true });
}
