'use client';

import { useState, useEffect, useCallback, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HomepageResponse, CompetitionBox } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { mapMenuUrl } from '@/lib/cms';

interface PainPointTabsProps {
  data: HomepageResponse['competition'];
}

const AUTO_ROTATE_MS = 8000;

// ── Fallback-beschrijvingen ───────────────────────────────────
// Het CMS levert momenteel milestone-data zonder description-veld.
// We matchen op substrings van label én value (beide lowercase).
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

function getFallbackDescription(box: CompetitionBox): string {
  const haystack = `${box.label} ${box.value}`.toLowerCase();
  for (const [fragment, text] of Object.entries(FALLBACK_DESCRIPTIONS)) {
    if (haystack.includes(fragment)) return text;
  }
  return '';
}

// ── Veld-normaliser ───────────────────────────────────────────
// Huidige CMS levert { value, label } (milestones).
// Toekomstige CMS levert { title, description, image, link_text, link_url }.
// Beide worden hier genormaliseerd naar één intern formaat.

interface NormalizedBox {
  id: number;
  tabLabel: string;        // tekst op de tab
  title: string;           // H3 in paneel
  value: string;           // korte metric (bijv. "3 maanden") als subtitel
  description: string;     // bodytekst
  image: string | null;
  linkText: string | null;
  linkHref: string | null;
}

function normalizeBox(box: CompetitionBox, index: number): NormalizedBox {
  return {
    id: index,
    tabLabel: box.title ?? box.label ?? `Punt ${index + 1}`,
    // label is de beschrijvende zin (bijv. "In gebruik"), value de metric (bijv. "Opgeleverd")
    title:    box.title ?? box.label ?? box.value ?? '',
    value:    box.value ?? '',
    description: box.description ?? getFallbackDescription(box),
    image:    box.image_url ?? box.image ?? null,
    linkText: box.link_text ?? null,
    linkHref: box.link_url ? mapMenuUrl(box.link_url) : null,
  };
}

// ── Paneel-inhoud ─────────────────────────────────────────────

function ContentPanel({ box }: { box: NormalizedBox }) {
  const hasImage = !!box.image;

  return (
    <div className="animate-[fadeIn_220ms_ease-out]">
      <div
        className={[
          'grid h-full',
          hasImage ? 'grid-cols-1 md:grid-cols-[55fr_45fr]' : 'grid-cols-1',
        ].join(' ')}
      >
        {/* Tekst */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-10 lg:py-12">
          {/* Metric als subtitel boven de titel */}
          {box.value && (
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-2">
              {box.value}
            </span>
          )}
          <h3 className="font-heading text-h4 font-semibold text-brand-900 mb-4 leading-snug">
            {box.title}
          </h3>
          {box.description && (
            <p className="text-body text-neutral-700 leading-relaxed mb-6 max-w-[560px]">
              {box.description}
            </p>
          )}
          {box.linkHref && box.linkText && (
            <Link
              href={box.linkHref}
              className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-600 hover:text-brand-900 transition-colors duration-[150ms] group mt-auto"
            >
              {box.linkText}
              <svg
                className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Afbeelding */}
        {hasImage && (
          <div className="relative hidden md:block overflow-hidden rounded-r-[20px]">
            <Image
              src={box.image!}
              alt={box.title}
              fill
              className="object-cover"
              sizes="45vw"
            />
            <div
              className="absolute inset-y-0 left-0 w-8 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, white 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Hoofd-component ───────────────────────────────────────────

export function PainPointTabs({ data }: PainPointTabsProps) {
  const boxes = data.boxes ?? [];

  // Debug: log de ruwe box-structuur zodat de CMS-velden zichtbaar zijn
  useEffect(() => {
    if (boxes.length > 0) {
      console.log('[PainPointTabs] competition.boxes (raw CMS data):', boxes);
      console.log('[PainPointTabs] Beschikbare velden per box:', Object.keys(boxes[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (boxes.length === 0) return null;

  const normalized = boxes.map(normalizeBox);
  return <PainPointTabsInner data={data} boxes={normalized} />;
}

// Inner component — gescheiden zodat hooks altijd na de early-return staan

function PainPointTabsInner({
  data,
  boxes,
}: {
  data: HomepageResponse['competition'];
  boxes: NormalizedBox[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tablistId = useId();

  // Auto-rotate
  useEffect(() => {
    if (paused || boxes.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boxes.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, boxes.length]);

  const handleTabClick = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setPaused(true); // stop auto-rotate na handmatige klik
    },
    []
  );

  const gridCols = Math.min(boxes.length, 6);

  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-labelledby="pain-points-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container variant="content">

        {/* ── Koptekst ──────────────────────────────────────── */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
            Herkenbaar?
          </span>
          <h2
            id="pain-points-heading"
            className="font-heading text-h2 font-semibold text-brand-900 mb-5 leading-[1.1]"
          >
            {data.heading}
          </h2>
          {data.paragraph && (
            <p className="text-body-lg text-neutral-500 leading-relaxed mx-auto max-w-[760px]">
              {data.paragraph}
            </p>
          )}
        </div>

        {/* ── Tab-container ─────────────────────────────────── */}
        <div className="rounded-[20px] border border-neutral-200 overflow-hidden shadow-[0_8px_24px_rgba(22,62,116,0.06)]">

          {/* Tab-rij — desktop: grid; mobile: horizontaal scroll */}
          <div
            className="overflow-x-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div
              role="tablist"
              aria-label="Pijnpunten"
              id={tablistId}
              className="grid min-w-max"
              style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(140px, 1fr))` }}
            >
              {boxes.map((box, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={box.id}
                    role="tab"
                    id={`${tablistId}-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls={`${tablistId}-panel`}
                    onClick={() => handleTabClick(i)}
                    className={[
                      // min-h zodat alle tabs even hoog zijn ook als tekst ombreekt
                      'min-h-[64px] px-4 py-4 text-center text-sm font-semibold leading-snug',
                      'flex items-center justify-center',
                      'border-r border-neutral-200 last:border-r-0',
                      'transition-colors duration-[150ms] focus-visible:outline-none',
                      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-400',
                      isActive
                        ? 'bg-brand-900 text-white'
                        : 'bg-white text-brand-900 hover:bg-brand-50',
                    ].join(' ')}
                  >
                    {box.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content-paneel — groeit mee met de inhoud (geen vaste hoogte) */}
          <div
            id={`${tablistId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tablistId}-tab-${activeIndex}`}
            className="relative border-t border-neutral-200 bg-white"
          >
            {/* Voortgangsbalk voor auto-rotate */}
            {!paused && boxes.length > 1 && (
              <div
                key={`progress-${activeIndex}`}
                className="absolute top-0 inset-x-0 h-0.5 bg-brand-400 origin-left"
                style={{
                  animation: `progress-bar ${AUTO_ROTATE_MS}ms linear forwards`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Alleen actief paneel renderen → container past automatisch zijn hoogte aan */}
            {boxes[activeIndex] && (
              <ContentPanel key={`panel-${activeIndex}`} box={boxes[activeIndex]} />
            )}
          </div>
        </div>

        {/* ── Tab-paginering (mobile) ────────────────────────── */}
        <div
          className="flex items-center justify-center gap-1.5 mt-4 md:hidden"
          aria-hidden="true"
        >
          {boxes.map((_, i) => (
            <button
              key={i}
              onClick={() => handleTabClick(i)}
              className={[
                'w-2 h-2 rounded-full transition-all duration-[150ms]',
                i === activeIndex ? 'bg-brand-700 w-4' : 'bg-neutral-300',
              ].join(' ')}
              aria-label={`Ga naar punt ${i + 1}`}
            />
          ))}
        </div>

      </Container>

      {/* Keyframes */}
      <style>{`
        @keyframes progress-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
