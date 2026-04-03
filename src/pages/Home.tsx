import { useState, useEffect } from 'react';
import { getHomepage } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import AbstractShapes from '@/components/AbstractShapes';
import { StatsBlock } from '@/components/sections/StatsBlock';
import { SolutionCards } from '@/components/sections/SolutionCards';
import { AboutBlock } from '@/components/sections/AboutBlock';
import { UserFeaturesBlock } from '@/components/sections/UserFeaturesBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { HomeFaq } from '@/components/sections/HomeFaq';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

// ── Pillar card ──────────────────────────────────────────────

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  woo: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="1" width="14" height="18" rx="2" stroke="white" strokeWidth="1.5" />
      <polyline points="7,10 9,12 13,8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  opensource: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="5" r="3" stroke="white" strokeWidth="1.5" />
      <circle cx="4" cy="15" r="3" stroke="white" strokeWidth="1.5" />
      <circle cx="16" cy="15" r="3" stroke="white" strokeWidth="1.5" />
      <line x1="10" y1="8" x2="10" y2="11" stroke="white" strokeWidth="1.5" />
      <path d="M10,11 Q10,13 4,12" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M10,11 Q10,13 16,12" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  maatwerk: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <polyline points="6,7 2,10 6,13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14,7 18,10 14,13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="4" x2="8" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function PillarCard({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-[20px] px-5 py-4 transition-all duration-300 hover:border-brand-200 hover:shadow-sm">
      <div className="flex-shrink-0 w-10 h-10 bg-brand-700 rounded-[10px] flex items-center justify-center">
        {PILLAR_ICONS[icon]}
      </div>
      <div>
        <p className="font-semibold text-neutral-950 text-body-sm">{title}</p>
        <p className="text-neutral-400 text-body-sm mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [homepage, setHomepage] = useState<any>(null);

  useEffect(() => {
    getHomepage().then(setHomepage);
  }, []);

  return (
    <>
      <PageMeta
        title="Woo-compliance oplossing voor de overheid"
        description="Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 611 bestuursorganen."
        schemas={[{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Staterra', url: 'https://staterra.nl' }]}
      />
      {/* 1 — Hero */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        aria-label="Introductie"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 75% 30%, rgba(22,62,116,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 25% 70%, rgba(46,123,191,0.03) 0%, transparent 50%)
          `,
        }}
      >
        {/* Abstract shapes — alleen desktop */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
          <AbstractShapes />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
          <div className="max-w-xl lg:max-w-[540px]">
            <p className="text-caption font-semibold uppercase tracking-widest text-brand-600 mb-5">
              Digitale oplossingen voor de overheid
            </p>

            <h1 className="font-heading text-h1 font-bold text-neutral-950 mb-6 leading-[1.1]">
              Wij bouwen en beheren wat de overheid nodig heeft
            </h1>

            <p className="text-body text-neutral-500 leading-relaxed mb-10 max-w-[480px]">
              Van Woo-compliance tot maatwerk platformen. Staterra ontwerpt, bouwt en
              beheert open source oplossingen — zodat u de regie houdt zonder zelf een
              ontwikkelteam op te bouwen.
            </p>

            {/* Drie pijler-kaarten */}
            <div className="space-y-3 mb-10">
              <PillarCard icon="woo" title="Woo-compliance met OPMS" subtitle="Werkend publicatieplatform direct beschikbaar" />
              <PillarCard icon="opensource" title="Open source development" subtitle="Eigendom bij de overheid, geen vendor lock-in" />
              <PillarCard icon="maatwerk" title="Maatwerk applicaties" subtitle="Gebouwd op de standaarden van de publieke sector" />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-brand-700 text-white rounded-[10px] px-7 py-4 text-body-sm font-medium hover:bg-brand-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
              >
                Laten we kennismaken
              </a>
              <a
                href="/oplossingen"
                className="bg-white text-brand-700 border border-brand-700 rounded-[10px] px-7 py-4 text-body-sm font-medium hover:bg-brand-50 transition-all duration-200 group"
              >
                Bekijk onze oplossingen
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* 2 — Statistieken */}
      <StatsBlock />

      {/* 3 — Herkenbaar? */}
      <section className="bg-neutral-50 py-12 lg:py-16" aria-label="Herkenbaar?">
        <div className="max-w-3xl mx-auto text-center px-6">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
            Herkenbaar?
          </span>
          <h2 className="font-heading text-h2 font-semibold text-brand-900 mb-4 leading-[1.1]">
            {homepage?.competition?.heading ?? 'De verplichtingen groeien. De capaciteit niet.'}
          </h2>
          <p className="text-body text-neutral-700 leading-relaxed mb-8">
            Steeds meer verplichtingen, beperkte capaciteit, en een deadline die nadert.
            U bent niet de enige — {BESTUURSORGANEN_STATS.totaal} bestuursorganen staan voor dezelfde uitdaging.
          </p>
          <a
            href="/woo-oplossing"
            className="inline-flex items-center justify-center rounded-[10px] bg-brand-700 px-6 py-3 text-white font-semibold text-body-sm hover:bg-brand-900 transition-colors duration-[150ms]"
          >
            Bekijk de oplossing
          </a>
        </div>
      </section>

      {/* 4 — Oplossingskaarten */}
      {homepage?.feature_cards && (
        <SolutionCards data={homepage.feature_cards} />
      )}

      {/* 5 — Over Staterra */}
      {homepage?.about_opms && (
        <AboutBlock data={homepage.about_opms} />
      )}

      {/* 6 — Vergelijking doorlink */}
      <section className="bg-brand-100 py-12 lg:py-16" aria-label="Vergelijking">
        <div className="max-w-3xl mx-auto text-center px-6">
          <p className="text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
            Vergelijking
          </p>
          <h2 className="font-heading text-h2 font-semibold text-brand-900 mb-4 leading-[1.1]">
            Waarom organisaties kiezen voor OPMS
          </h2>
          <p className="text-body text-neutral-700 leading-relaxed mb-8">
            OPMS is opgenomen in het BZK open source ecosysteem. Het comply-or-explain
            beleid maakt OPMS de logische eerste keuze voor Woo-compliance.
          </p>
          <a
            href="/woo-oplossing#vergelijking"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
          >
            Bekijk de volledige vergelijking
            <svg
              className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* 7 — Gebruikersvoordelen */}
      {homepage?.user_features && (
        <UserFeaturesBlock data={homepage.user_features} />
      )}

      {/* 8 — FAQ */}
      <HomeFaq />

      {/* 9 — CTA-blok */}
      {homepage?.bottom_cta && <CTABlock data={homepage.bottom_cta} />}
    </>
  );
}
