'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { logActivity } from '@/lib/admin/activity';

const trim = (v: FormDataEntryValue | null) =>
  typeof v === 'string' ? v.trim() : '';

export async function deleteDraft(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const draftId = trim(formData.get('draft_id'));
  const nameHint = trim(formData.get('name_hint'));
  if (!draftId) return;

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('form_drafts').delete().eq('draft_id', draftId);
    if (error) {
      console.error('[drafts] delete error:', error.message);
      return;
    }
    await logActivity(
      'delete',
      'lead',
      nameHint
        ? `Admin deleted abandoned draft from "${nameHint}"`
        : 'Admin deleted abandoned draft',
      { entityId: draftId }
    );
  } catch (err) {
    console.error('[drafts] delete exception:', err);
  }

  revalidatePath('/admin/drafts');
  revalidatePath('/admin');
}
