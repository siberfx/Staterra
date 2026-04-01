'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HomepageResponse, CompetitionBox } from '@/lib/types';
import { Container } from '@/components/ui/Container';

interface CompetitionBlockProps {
  data: HomepageResponse['competition'];
}

// ── Fallback-beschrijvingen ───────────────────────────────────
// Worden gebruikt zolang het CMS geen `description`-veld stuurt.
// Keys zijn substrings van de werkelijke CMS-labels (lowercase match).
const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  'werkend mvp':
    'In 3 maanden staat een werkend systeem — inclusief publicatiemodule, behandelwerkstroom en eerste integraties. U kunt uw eerste Woo-publicaties doen op dag 91. Geen eindeloze analysefase, geen papieren architecturen.',
  '3 maanden':
    'In 3 maanden staat een werkend systeem — inclusief publicatiemodule, behandelwerkstroom en eerste integraties. U kunt uw eerste Woo-publicaties doen op dag 91. Geen eindeloze analysefase, geen papieren architecturen.',
  'volledig product':
    'Na 9 maanden is het volledige OPMS-platform operationeel: alle categorieën actieve openbaarmaking, koppelingen met uw DMS en zaaksystemen, opgeleide medewerkers en actief beheer. Klaar voor de dagelijkse praktijk.',
  '9 maanden':
    'Na 9 maanden is het volledige OPMS-platform operationeel: alle categorieën actieve openbaarmaking, koppelingen met uw DMS en zaaksystemen, opgeleide medewerkers en actief beheer. Klaar voor de dagelijkse praktijk.',
  'in gebruik':
    'Dit is geen pilot of proof of concept. Het platform wordt dagelijks gebruikt door echte bestuursorganen voor echte Woo-publicaties. De hardste test voor elk systeem — en OPMS doorstaat hem.',
  'opgeleverd':
    'Dit is geen pilot of proof of concept. Het platform wordt dagelijks gebruikt door echte bestuursorganen voor echte Woo-publicaties. De hardste test voor elk systeem — en OPMS doorstaat hem.',
  'eigenaarschap':
    'De broncode is volledig open source en eigendom van de overheid, niet van Staterra. U heeft altijd inzage in de code, u kunt aanpassen, overdragen en doorontwikkelen — onafhankelijk van één leverancier.',
  'open source':
    'De broncode is volledig open source en eigendom van de overheid, niet van Staterra. U heeft altijd inzage in de code, u kunt aanpassen, overdragen en doorontwikkelen — onafhankelijk van één leverancier.',
};

function getDescription(box: CompetitionBox): string {
  if (box.description) return box.description;
  // Zoek in zowel label als value (bijv. "3 maanden" zit in value, niet in label)
  const haystack = `${box.label} ${box.value}`.toLowerCase();
  for (const [fragment, text] of Object.entries(FALLBACK_DESCRIPTIONS)) {
    if (haystack.includes(fragment)) return text;
  }
  return '';
}

// ── Iconen per tab-index ──────────────────────────────────────

const TAB_ICONS = [
  // Raket / snelheid
  <svg key="0" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
  // Vinkje / compleet
  <svg key="1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
  // Gebruikers / in gebruik
  <svg key="2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>,
  // Code / open source
  <svg key="3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
];

// ── Paneel-animatie ───────────────────────────────────────────
// ease als cubic-bezier array (Framer Motion verwacht Easing, niet string)

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const;
const EASE_IN  = [0.4, 0.0, 1.0, 1] as const;

// ── Component ─────────────────────────────────────────────────

export function CompetitionBlock({ data }: CompetitionBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tablistId = useId();

  const boxes = data.boxes ?? [];
  const active = boxes[activeIndex];

  if (boxes.length === 0) return null;

  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-labelledby="competition-heading"
    >
      <Container variant="content">

        {/* ── Koptekst ──────────────────────────────────────── */}
        <div className="text-center mb-12 lg:mb-14">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
            Bewezen in de praktijk
          </span>
          <h2
            id="competition-heading"
            className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
          >
            {data.heading}
          </h2>
          <p className="text-body-lg text-neutral-600 leading-relaxed mx-auto max-w-[760px]">
            {data.paragraph}
          </p>
        </div>

        {/* ── Desktop: tabbladen + paneel ───────────────────── */}
        <div className="hidden md:block">
          {/* Tab-balk */}
          <div
            role="tablist"
            aria-label="Mijlpalen"
            id={tablistId}
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${boxes.length}, minmax(0, 1fr))` }}
          >
            {boxes.map((box, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  role="tab"
                  id={`${tablistId}-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`${tablistId}-panel`}
                  onClick={() => setActiveIndex(i)}
                  className={[
                    'relative flex flex-col items-start gap-2 rounded-[14px] border px-5 py-5 text-left',
                    'transition-all duration-[200ms] ease-out',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
                    isActive
                      ? 'bg-brand-900 border-brand-900 text-white shadow-[0_12px_32px_rgba(22,62,116,0.20)]'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-brand-300 hover:shadow-[0_4px_16px_rgba(22,62,116,0.06)]',
                  ].join(' ')}
                >
                  {/* Icoon */}
                  <span
                    className={[
                      'w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0',
                      isActive ? 'bg-white/15' : 'bg-brand-100 text-brand-700',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {TAB_ICONS[i] ?? TAB_ICONS[0]}
                  </span>

                  {/* Metric — zelfde grootte actief/inactief zodat kaartjes stabiel blijven */}
                  <span
                    className={[
                      'font-heading font-semibold text-h5 leading-tight',
                      isActive ? 'text-brand-400' : 'text-brand-700',
                    ].join(' ')}
                  >
                    {box.value}
                  </span>

                  {/* Label */}
                  <span
                    className={[
                      'text-caption font-medium leading-snug',
                      isActive ? 'text-white/90' : 'text-neutral-600',
                    ].join(' ')}
                  >
                    {box.label}
                  </span>

                  {/* Actieve indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 bg-brand-900 border-r border-b border-brand-900"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Inhoudspaneel */}
          <div
            id={`${tablistId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tablistId}-tab-${activeIndex}`}
            className="mt-6 rounded-[20px] border border-neutral-200 bg-neutral-50 overflow-hidden min-h-[160px]"
          >
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE_OUT } }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.14, ease: EASE_IN } }}
                  className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-0"
                >
                  {/* Metric-kolom — tekst schaalt naar de kolombreedte */}
                  <div className="flex flex-col justify-center items-center bg-brand-900 px-5 py-10 overflow-hidden rounded-l-none lg:rounded-l-[20px]">
                    <span className="font-heading font-bold text-brand-400 text-3xl leading-tight text-center break-words w-full">
                      {active.value}
                    </span>
                    <span className="text-[11px] text-white/70 mt-2 text-center font-medium leading-snug">
                      {active.label}
                    </span>
                  </div>

                  {/* Beschrijving-kolom */}
                  <div className="px-8 py-10 flex items-center">
                    <div>
                      {/* value als H3, label als subtitel → geen dubbele tekst */}
                      <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-1 leading-snug">
                        {active.value}
                      </h3>
                      <p className="text-caption text-neutral-500 mb-4 font-medium">
                        {active.label}
                      </p>
                      {getDescription(active) && (
                        <p className="text-body text-neutral-700 leading-relaxed max-w-[560px]">
                          {getDescription(active)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: accordion ─────────────────────────────── */}
        <div
          className="md:hidden space-y-3"
          role="list"
          aria-label="Mijlpalen"
        >
          {boxes.map((box, i) => {
            const isOpen = i === activeIndex;
            return (
              <div
                key={i}
                role="listitem"
                className={[
                  'rounded-[14px] border overflow-hidden transition-all duration-[200ms]',
                  isOpen
                    ? 'border-brand-900 shadow-[0_8px_24px_rgba(22,62,116,0.12)]'
                    : 'border-neutral-200',
                ].join(' ')}
              >
                {/* Accordion-knop */}
                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={[
                    'w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-[180ms]',
                    isOpen ? 'bg-brand-900' : 'bg-white hover:bg-neutral-50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'flex-shrink-0 w-9 h-9 rounded-[8px] flex items-center justify-center',
                      isOpen ? 'bg-white/15 text-white' : 'bg-brand-100 text-brand-700',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {TAB_ICONS[i] ?? TAB_ICONS[0]}
                  </span>

                  <div className="flex-1 min-w-0">
                    <span
                      className={[
                        'block font-heading font-semibold text-h5 leading-none mb-0.5',
                        isOpen ? 'text-brand-400' : 'text-brand-700',
                      ].join(' ')}
                    >
                      {box.value}
                    </span>
                    <span
                      className={[
                        'block text-caption font-medium',
                        isOpen ? 'text-white/80' : 'text-neutral-600',
                      ].join(' ')}
                    >
                      {box.label}
                    </span>
                  </div>

                  {/* Chevron */}
                  <svg
                    className={[
                      'w-5 h-5 flex-shrink-0 transition-transform duration-[200ms]',
                      isOpen ? 'rotate-180 text-brand-400' : 'text-neutral-400',
                    ].join(' ')}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Accordion-inhoud */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-5 bg-neutral-50 border-t border-neutral-200">
                        <p className="text-body-sm text-neutral-700 leading-relaxed">
                          {getDescription(box)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
