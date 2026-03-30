'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/types';

interface FaqAccordionProps {
  items: FaqItem[];
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = `faq-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <h3>
        <button
          id={id}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        >
          <span className="text-body-sm font-semibold text-neutral-950 group-hover:text-brand-700 transition-colors duration-[180ms]">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={[
              'flex-shrink-0 w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center',
              'transition-all duration-[180ms]',
              isOpen
                ? 'bg-brand-700 border-brand-700 rotate-45'
                : 'bg-white group-hover:border-brand-300',
            ].join(' ')}
          >
            <svg
              className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-neutral-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        hidden={!isOpen}
        className={[
          'overflow-hidden transition-all duration-[180ms]',
          isOpen ? 'pb-5' : '',
        ].join(' ')}
      >
        <p className="text-body-sm text-neutral-700 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items?.length) return null;

  return (
    <div role="list" aria-label="Veelgestelde vragen">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          index={i}
        />
      ))}
    </div>
  );
}
