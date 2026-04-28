import 'server-only';
import { getServiceClient } from '@/lib/supabase/server';

export type ActivityAction = 'create' | 'update' | 'delete' | 'login' | 'upload';
export type ActivityEntity = 'lead' | 'settings' | 'session' | 'asset';

export type ActivityRow = {
  id: string;
  action: string;
  entity: string;
  entity_id: string;
  summary: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

const RETENTION_DAYS = 15;

async function trim(): Promise<void> {
  try {
    const supabase = getServiceClient();
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400_000).toISOString();
    await supabase.from('admin_activity').delete().lt('created_at', cutoff);
  } catch {}
}

export async function logActivity(
  action: ActivityAction,
  entity: ActivityEntity,
  summary: string,
  options: { entityId?: string; metadata?: Record<string, unknown> } = {}
): Promise<void> {
  try {
    const supabase = getServiceClient();
    await supabase.from('admin_activity').insert({
      action,
      entity,
      entity_id: options.entityId ?? '',
      summary,
      metadata: options.metadata ?? {},
    });
  } catch (err) {
    console.warn('[activity] log failed:', err);
  }
  // best-effort cleanup of old entries on each write
  trim().catch(() => {});
}

export async function loadActivity(limit = 200): Promise<ActivityRow[]> {
  await trim();
  try {
    const supabase = getServiceClient();
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 86400_000).toISOString();
    const { data, error } = await supabase
      .from('admin_activity')
      .select('*')
      .gte('created_at', cutoff)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) {
      console.warn('[activity] load:', error.message || JSON.stringify(error));
      return [];
    }
    return (data ?? []) as ActivityRow[];
  } catch (err) {
    console.warn('[activity] load exception:', err);
    return [];
  }
}
