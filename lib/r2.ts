import 'server-only';
import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {
  buildMediaKey,
  folderFromKey,
  type MediaFolderKey,
} from '@/lib/admin/mediaFolders';

let cached: S3Client | null = null;

const BUCKET = process.env.R2_BUCKET || 'plumbers';
// Strip any accidental path from the public URL — only the origin is valid as a base.
const PUBLIC_URL = (() => {
  const raw = process.env.R2_PUBLIC_URL || 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev';
  try { return `${new URL(raw).origin}`; } catch { return raw; }
})();
const ENDPOINT =
  process.env.R2_ENDPOINT ||
  'https://3c76920fa5848e9b288777b0edae64fa.r2.cloudflarestorage.com';

// Rewrites any old r2.dev or stale custom-domain URLs to the current PUBLIC_URL
export function normalizeR2Url(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('.r2.dev') || u.hostname !== new URL(PUBLIC_URL).hostname) {
      return `${PUBLIC_URL.replace(/\/$/, '')}/${u.pathname.replace(/^\//, '')}`;
    }
  } catch {}
  return url;
}

const SAFE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/x-icon',
  'image/vnd.microsoft.icon',
];
const MAX_BYTES = 15 * 1024 * 1024;

export type MediaItem = {
  key: string;
  url: string;
  size: number;
  contentType: string;
  uploaded_at: string;
  folder: MediaFolderKey | null;
};

export type R2ConfigStatus = {
  configured: boolean;
  reason?: string;
  endpoint: string;
  bucket: string;
  publicUrl: string;
};

export function getR2ConfigStatus(): R2ConfigStatus {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const reasonParts: string[] = [];
  if (!accessKeyId) reasonParts.push('R2_ACCESS_KEY_ID');
  if (!secretAccessKey) reasonParts.push('R2_SECRET_ACCESS_KEY');
  return {
    configured: reasonParts.length === 0,
    reason: reasonParts.length ? `Missing env: ${reasonParts.join(', ')}` : undefined,
    endpoint: ENDPOINT,
    bucket: BUCKET,
    publicUrl: PUBLIC_URL,
  };
}

function getClient(): S3Client {
  if (cached) return cached;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials missing (R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY).');
  }
  cached = new S3Client({
    region: 'auto',
    endpoint: ENDPOINT,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
  return cached;
}

function publicUrlForKey(key: string): string {
  return normalizeR2Url(`${PUBLIC_URL.replace(/\/$/, '')}/${encodeURI(key)}`);
}

export async function listMedia(): Promise<MediaItem[]> {
  if (!getR2ConfigStatus().configured) return [];
  try {
    const c = getClient();
    const out = await c.send(
      new ListObjectsV2Command({ Bucket: BUCKET, MaxKeys: 1000 })
    );
    const items: MediaItem[] = (out.Contents ?? [])
      .filter((o) => o.Key)
      .map((o) => ({
        key: o.Key!,
        url: publicUrlForKey(o.Key!),
        size: Number(o.Size ?? 0),
        contentType: '',
        uploaded_at: o.LastModified?.toISOString() ?? new Date().toISOString(),
        folder: folderFromKey(o.Key!),
      }));
    items.sort((a, b) => b.uploaded_at.localeCompare(a.uploaded_at));
    return items;
  } catch (err) {
    console.warn('[r2] list error:', (err as Error)?.message ?? err);
    return [];
  }
}

export async function uploadToR2(
  file: File,
  folder?: MediaFolderKey | null
): Promise<{ url?: string; key?: string; error?: string }> {
  if (file.size === 0) return { error: 'Empty file.' };
  if (file.size > MAX_BYTES) {
    return { error: `${file.name} exceeds 15 MB limit.` };
  }
  if (file.type && !SAFE_TYPES.includes(file.type)) {
    return { error: `${file.name}: type ${file.type} not allowed.` };
  }

  const safeName =
    file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `file-${Date.now()}`;

  const key = buildMediaKey(folder ?? null, safeName);

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const c = getClient();
    await c.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buf,
        ContentType: file.type || 'application/octet-stream',
        CacheControl: 'public, max-age=86400',
      })
    );
    return { key, url: publicUrlForKey(key) };
  } catch (err) {
    const msg = (err as Error)?.message ?? 'unknown';
    console.error('[r2] upload error:', msg);
    return { error: `Upload failed: ${msg}` };
  }
}

export async function deleteFromR2(key: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const c = getClient();
    await c.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
    return { ok: true };
  } catch (err) {
    const msg = (err as Error)?.message ?? 'unknown';
    console.error('[r2] delete error:', msg);
    return { ok: false, error: msg };
  }
}
