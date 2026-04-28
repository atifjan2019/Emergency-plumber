export const LEAD_STATUSES = ['new', 'contacted', 'complete', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'In progress',
  complete: 'Complete',
  lost: 'Lost',
};
