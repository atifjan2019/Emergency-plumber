import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';

let cached: Transporter | null = null;

const ALERT_TO = process.env.ALERT_EMAIL || 'atifjan2019@gmail.com';

function getTransporter(): Transporter | null {
  if (cached) return cached;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return cached;
}

function fromAddress(brand: string): string {
  const explicit = process.env.SMTP_FROM;
  if (explicit) return explicit.includes('<') ? explicit : `${brand} <${explicit}>`;
  const user = process.env.SMTP_USER;
  if (user) return `${brand} <${user}>`;
  return `${brand} <noreply@example.com>`;
}

type SendArgs = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  brand: string;
};

export async function sendMail(args: SendArgs): Promise<{ ok: boolean; reason?: string }> {
  const t = getTransporter();
  if (!t) {
    return { ok: false, reason: 'SMTP not configured' };
  }
  try {
    await t.sendMail({
      from: fromAddress(args.brand),
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
    return { ok: true };
  } catch (err) {
    const msg = (err as Error)?.message ?? 'unknown';
    console.error('[email] send failed:', msg);
    return { ok: false, reason: msg };
  }
}

export function getAlertRecipient(): string {
  return ALERT_TO;
}

const escape = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const lineBreak = (v: string) => escape(v).replace(/\n/g, '<br>');

type LeadPayload = {
  id?: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  city_slug?: string | null;
  message: string;
  source_page?: string | null;
  created_at?: string;
};

type BrandPayload = {
  brand: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  siteUrl: string;
};

function adminUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/admin/leads`;
}

function adminDraftsUrl(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}/admin/drafts`;
}

export function buildAdminLeadEmail(lead: LeadPayload, brand: BrandPayload) {
  const submitted = lead.created_at ? new Date(lead.created_at).toLocaleString('en-GB') : 'just now';
  const subject = `New lead: ${lead.name}${lead.city_slug ? ` (${lead.city_slug})` : ''}`;
  const text = [
    `New lead from your website.`,
    ``,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone || '—'}`,
    `Email: ${lead.email || '—'}`,
    `City: ${lead.city_slug || '—'}`,
    `Source: ${lead.source_page || '—'}`,
    `Submitted: ${submitted}`,
    ``,
    `Message:`,
    lead.message,
    ``,
    `Open in admin: ${adminUrl(brand.siteUrl)}`,
  ].join('\n');

  const html = `
<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;">
  <div style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:20px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">${escape(brand.brand)}</div>
    <h1 style="font-size:20px;margin:6px 0 0;font-weight:800;">New lead</h1>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 0;color:#6b7280;width:90px;">Name</td><td style="padding:6px 0;font-weight:600;">${escape(lead.name)}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;">${lead.phone ? `<a href="tel:${escape(lead.phone)}" style="color:#dc2626;text-decoration:none;font-weight:600;">${escape(lead.phone)}</a>` : '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;">${lead.email ? `<a href="mailto:${escape(lead.email)}" style="color:#dc2626;text-decoration:none;font-weight:600;">${escape(lead.email)}</a>` : '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">City</td><td style="padding:6px 0;text-transform:capitalize;">${escape(lead.city_slug || '—')}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Source</td><td style="padding:6px 0;color:#374151;">${escape(lead.source_page || '—')}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Submitted</td><td style="padding:6px 0;color:#374151;">${escape(submitted)}</td></tr>
  </table>
  <div style="margin-top:18px;padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin-bottom:6px;">Message</div>
    <div style="white-space:pre-wrap;">${lineBreak(lead.message)}</div>
  </div>
  <div style="margin-top:24px;">
    <a href="${escape(adminUrl(brand.siteUrl))}" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Open in admin</a>
  </div>
  <div style="margin-top:24px;color:#6b7280;font-size:12px;">Sent automatically by ${escape(brand.brand)}.</div>
</div>`.trim();

  return { subject, text, html };
}

export function buildUserConfirmationEmail(lead: LeadPayload, brand: BrandPayload) {
  const subject = `We got your message — ${brand.brand}`;
  const text = [
    `Hi ${lead.name},`,
    ``,
    `Thanks for reaching out to ${brand.brand}. We have your details and one of our engineers will reply within an hour during the day, or first thing the next morning if you contacted us overnight.`,
    ``,
    `Your message:`,
    `"${lead.message}"`,
    ``,
    `If this is an emergency right now, please call us on ${brand.phoneDisplay} - we answer 24/7 with no surcharge for nights or weekends.`,
    ``,
    `— ${brand.brand}`,
    `${brand.phoneDisplay} | ${brand.email}`,
  ].join('\n');

  const html = `
<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;">
  <div style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:20px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">${escape(brand.brand)}</div>
    <h1 style="font-size:22px;margin:6px 0 0;font-weight:800;">Thanks, we got your message</h1>
  </div>

  <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">Hi ${escape(lead.name)},</p>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
    Thanks for reaching out to ${escape(brand.brand)}. We have your details and one of our engineers
    will reply with a price <strong>within an hour during the day</strong>, or first thing the next
    morning if you contacted us overnight.
  </p>

  <div style="margin-top:18px;padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin-bottom:6px;">Your message</div>
    <div style="white-space:pre-wrap;font-size:14px;">${lineBreak(lead.message)}</div>
  </div>

  <div style="margin-top:22px;padding:16px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;">
    <div style="font-size:13px;font-weight:700;color:#991b1b;margin-bottom:6px;">Emergency right now?</div>
    <p style="font-size:14px;line-height:1.5;margin:0 0 10px;color:#7f1d1d;">
      Skip the wait and call us. We answer 24/7 with no surcharge for nights or weekends.
    </p>
    <a href="tel:${escape(brand.phoneTel)}" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Call ${escape(brand.phoneDisplay)}</a>
  </div>

  <p style="font-size:13px;color:#6b7280;margin:28px 0 0;">— The ${escape(brand.brand)} team<br>${escape(brand.phoneDisplay)} · ${escape(brand.email)}</p>
</div>`.trim();

  return { subject, text, html };
}

type DraftPayload = {
  draft_id: string;
  form_type: string;
  name: string;
  phone: string;
  email: string;
  city_slug: string;
  message: string;
  source_page: string;
  field_count: number;
  updated_at?: string;
};

export function buildAdminDraftEmail(draft: DraftPayload, brand: BrandPayload) {
  const headline = draft.name || draft.phone || draft.email || 'Unnamed visitor';
  const subject = `Abandoned form — ${headline}`;
  const text = [
    `A visitor started filling a form but did not submit.`,
    ``,
    `Name: ${draft.name || '(no name)'}`,
    `Phone: ${draft.phone || '—'}`,
    `Email: ${draft.email || '—'}`,
    `City: ${draft.city_slug || '—'}`,
    `Form type: ${draft.form_type}`,
    `Source: ${draft.source_page || '—'}`,
    ``,
    `Partial message:`,
    draft.message || '(none yet)',
    ``,
    `${draft.phone || draft.email ? 'Worth a quick callback - they left contact info.' : 'No contact info captured yet.'}`,
    ``,
    `Open in admin: ${adminDraftsUrl(brand.siteUrl)}`,
  ].join('\n');

  const html = `
<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;">
  <div style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:20px;">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#d97706;">${escape(brand.brand)} · Abandoned</div>
    <h1 style="font-size:20px;margin:6px 0 0;font-weight:800;">Visitor started a form and stopped</h1>
  </div>
  <p style="font-size:14px;color:#374151;margin:0 0 14px;">They captured contact info but never submitted. A quick callback often converts these.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:6px 0;color:#6b7280;width:90px;">Name</td><td style="padding:6px 0;font-weight:600;">${escape(draft.name || '(no name)')}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;">${draft.phone ? `<a href="tel:${escape(draft.phone)}" style="color:#dc2626;text-decoration:none;font-weight:600;">${escape(draft.phone)}</a>` : '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;">${draft.email ? `<a href="mailto:${escape(draft.email)}" style="color:#dc2626;text-decoration:none;font-weight:600;">${escape(draft.email)}</a>` : '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">City</td><td style="padding:6px 0;text-transform:capitalize;">${escape(draft.city_slug || '—')}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Form</td><td style="padding:6px 0;text-transform:capitalize;">${escape(draft.form_type)}</td></tr>
    <tr><td style="padding:6px 0;color:#6b7280;">Source</td><td style="padding:6px 0;color:#374151;">${escape(draft.source_page || '—')}</td></tr>
  </table>
  ${draft.message ? `<div style="margin-top:18px;padding:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;margin-bottom:6px;">Partial message</div><div style="white-space:pre-wrap;">${lineBreak(draft.message)}</div></div>` : ''}
  <div style="margin-top:24px;">
    <a href="${escape(adminDraftsUrl(brand.siteUrl))}" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Open in admin</a>
  </div>
</div>`.trim();

  return { subject, text, html };
}
