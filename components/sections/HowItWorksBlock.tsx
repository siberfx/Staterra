import { Fragment } from 'react';
import Link from 'next/link';
import type { HomepageResponse, HowItWorksStep } from '@/lib/types';
import { Container } from '@/components/ui/Container';

interface HowItWorksBlockProps {
  data: HomepageResponse['how_it_works'];
}

// ── Fallback-CTA per stapnummer ───────────────────────────────
// Worden gebruikt zolang het CMS geen link-velden stuurt.
const STEP_CTAS: Record<string, { text: string; href: string }> = {
  '1': { text: 'Over de verkenningsfase', href: '/aanpak#verkenning' },
  '2': { text: 'Over het MVP-traject', href: '/aanpak#mvp' },
  '3': { text: 'Over de doorontwikkeling', href: '/aanpak#product' },
};

// ── Illustratieve iconen per stap ────────────────────────────
const STEP_ICONS: Record<string, React.ReactNode> = {
  '1': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  '2': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  '3': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

// ── Pijl-connector tussen stappen ────────────────────────────

function StepConnector() {
  return (
    <div
      className="hidden lg:flex items-center justify-center self-start mt-[76px] px-1"
      aria-hidden="true"
    >
      <svg
        width="40"
        height="16"
        viewBox="0 0 40 16"
        fill="none"
        className="text-brand-300"
      >
        {/* Horizontale lijn */}
        <line
          x1="0"
          y1="8"
          x2="32"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        {/* Pijlpunt */}
        <path
          d="M30 3L38 8L30 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ── Stap-card ─────────────────────────────────────────────────

function StepCard({ step, index, total }: { step: HowItWorksStep; index: number; total: number }) {
  const cta = step.link_url
    ? { text: step.link_text ?? 'Meer informatie', href: step.link_url }
    : STEP_CTAS[step.number];

  const icon = STEP_ICONS[step.number];

  return (
    <article className="relative bg-white rounded-[20px] shadow-[0_8px_24px_rgba(22,62,116,0.06)] border border-neutral-200 p-8 flex flex-col hover:shadow-[0_12px_32px_rgba(22,62,116,0.10)] hover:-translate-y-0.5 transition-all duration-[200ms]">

      {/* Mobiele stapindicator (lijn links) */}
      {index < total - 1 && (
        <div
          className="lg:hidden absolute left-[2.375rem] top-full w-px h-6 bg-brand-200"
          aria-hidden="true"
        />
      )}

      {/* Kop: badge + icoon */}
      <div className="flex items-start justify-between mb-6">
        {/* Stapnummer badge */}
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-200 text-brand-900 font-heading font-bold text-body-sm select-none flex-shrink-0">
          {step.number}
        </span>

        {/* Icoon rechtsboven */}
        {icon && (
          <span className="w-12 h-12 rounded-[12px] bg-brand-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </span>
        )}
      </div>

      {/* Titel */}
      <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3 leading-snug">
        {step.title}
      </h3>

      {/* Beschrijving */}
      <p className="text-body-sm text-neutral-700 leading-relaxed flex-1">
        {step.description}
      </p>

      {/* CTA */}
      {cta && (
        <div className="mt-6 pt-5 border-t border-neutral-100">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 text-caption font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
          >
            {cta.text}
            <svg
              className="w-3.5 h-3.5 transition-transform duration-[150ms] group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      )}
    </article>
  );
}

// ── Sectie ────────────────────────────────────────────────────

export function HowItWorksBlock({ data }: HowItWorksBlockProps) {
  const steps = data.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section
      className="bg-brand-100 py-16 lg:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <Container variant="content">

        {/* ── Koptekst ──────────────────────────────────────── */}
        <div className="mb-12 lg:mb-14">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
            De aanpak
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              id="how-it-works-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 leading-[1.1] max-w-[540px]"
            >
              {data.title}
            </h2>
            <Link
              href="/aanpak"
              className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group flex-shrink-0"
              aria-label="Bekijk de volledige aanpakpagina"
            >
              Volledige aanpak bekijken
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
          </div>
        </div>

        {/* ── Grid: cards + pijlen ──────────────────────────── */}
        {/*
          Desktop: [card] [pijl] [card] [pijl] [card]
          Template: 1fr auto 1fr auto 1fr  (voor 3 stappen)
          Dynamisch opgebouwd op basis van het aantal stappen.
        */}
        <div
          className="hidden lg:grid items-start gap-0"
          style={{
            gridTemplateColumns: steps
              .map((_, i) => (i < steps.length - 1 ? '1fr 48px' : '1fr'))
              .join(' '),
          }}
          role="list"
          aria-label="Stappen"
        >
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <div role="listitem">
                <StepCard step={step} index={i} total={steps.length} />
              </div>
              {i < steps.length - 1 && <StepConnector />}
            </Fragment>
          ))}
        </div>

        {/* Mobile: gestapeld */}
        <div
          className="lg:hidden flex flex-col gap-4"
          role="list"
          aria-label="Stappen"
        >
          {steps.map((step, i) => (
            <div key={step.number} role="listitem" className="relative">
              <StepCard step={step} index={i} total={steps.length} />
            </div>
          ))}
        </div>

        {/* ── Tijdlijn-balk ─────────────────────────────────── */}
        <div
          className="mt-10 lg:mt-12 flex items-center gap-0"
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-brand-200" />
          <div className="flex items-center gap-1 px-4">
            <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-caption text-brand-600 font-medium">
              Van verkenning tot volledig product: ~9 maanden
            </span>
          </div>
          <div className="flex-1 h-px bg-brand-200" />
        </div>

      </Container>
    </section>
  );
}
