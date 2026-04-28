'use client';
import { useState } from 'react';

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-gray-line rounded-xl border border-gray-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
            >
              <span className="font-semibold text-ink">{item.question}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-5 w-5 shrink-0 text-gray-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              >
                <path strokeLinecap="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-gray-soft">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
