'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin/auth';
import { uploadToR2, deleteFromR2 } from '@/lib/r2';
import { logActivity } from '@/lib/admin/activity';
import { isMediaFolderKey, type MediaFolderKey } from '@/lib/admin/mediaFolders';

export type UploadActionState = {
  ok: boolean;
  message: string;
  uploaded: { url: string; key: string }[];
};

export async function uploadMedia(
  _prev: UploadActionState,
  formData: FormData
): Promise<UploadActionState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'Not authorised.', uploaded: [] };
  }

  const entries = formData.getAll('files');
  const files = entries.filter((e): e is File => e instanceof File && e.size > 0);

  if (files.length === 0) {
    return { ok: false, message: 'Pick a file first.', uploaded: [] };
  }

  const folderRaw = formData.get('folder');
  const folder: MediaFolderKey | null =
    typeof folderRaw === 'string' && isMediaFolderKey(folderRaw) ? folderRaw : null;

  const uploaded: { url: string; key: string }[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const result = await uploadToR2(file, folder);
    if (result.error) {
      errors.push(result.error);
      continue;
    }
    if (result.url && result.key) uploaded.push({ url: result.url, key: result.key });
  }

  if (uploaded.length > 0) {
    const folderLabel = folder ? `to ${folder}/` : '';
    await logActivity(
      'upload',
      'asset',
      `Uploaded ${uploaded.length} image${uploaded.length === 1 ? '' : 's'} ${folderLabel}`.trim(),
      { metadata: { keys: uploaded.map((u) => u.key), folder } }
    );
  }

  revalidatePath('/admin/media');

  if (uploaded.length === 0) {
    return { ok: false, message: errors[0] || 'No files uploaded.', uploaded: [] };
  }

  if (errors.length > 0) {
    return {
      ok: true,
      message: `Uploaded ${uploaded.length} of ${files.length}. ${errors.join(' ')}`,
      uploaded,
    };
  }

  return {
    ok: true,
    message: `Uploaded ${uploaded.length} file${uploaded.length === 1 ? '' : 's'}.`,
    uploaded,
  };
}

export async function deleteMedia(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const key = formData.get('key');
  if (typeof key !== 'string' || !key) return;

  const result = await deleteFromR2(key);
  if (result.ok) {
    await logActivity('delete', 'asset', `Deleted media: ${key}`, { entityId: key });
  }

  revalidatePath('/admin/media');
}
