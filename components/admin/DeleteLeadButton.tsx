'use client';

import { useTransition } from 'react';
import { deleteLead } from '@/app/admin/leads/actions';

export default function DeleteLeadButton({ id, nameHint }: { id: string; nameHint: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm(`Delete lead from "${nameHint || 'this person'}"? This cannot be undone.`)) {
      e.preventDefault();
      return;
    }
    const fd = new FormData(e.currentTarget);
    e.preventDefault();
    startTransition(async () => {
      await deleteLead(fd);
    });
  }

  return (
    <form onSubmit={onSubmit} className="inline">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="name_hint" value={nameHint} />
      <button
        type="submit"
        disabled={pending}
        className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-60"
      >
        {pending ? 'Deleting…' : 'Delete'}
      </button>
    </form>
  );
}
