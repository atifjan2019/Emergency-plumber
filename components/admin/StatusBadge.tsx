import type { LeadStatus } from '@/lib/admin/leadStatus';

const MAP: Record<LeadStatus, { label: string; classes: string }> = {
  new: { label: 'New', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  contacted: { label: 'In progress', classes: 'bg-amber-50 text-amber-800 border-amber-200' },
  complete: { label: 'Complete', classes: 'bg-green-50 text-green-800 border-green-200' },
  lost: { label: 'Lost', classes: 'bg-red-50 text-red-700 border-red-200' },
};

export default function StatusBadge({ status, className = '' }: { status: LeadStatus; className?: string }) {
  const m = MAP[status] ?? MAP.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${m.classes} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {m.label}
    </span>
  );
}
