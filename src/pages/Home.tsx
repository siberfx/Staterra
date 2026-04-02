import { useState, useEffect } from 'react';
import { getHomepage } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import { Hero } from '@/components/sections/Hero';
import { StatsBlock } from '@/components/sections/StatsBlock';
import { SolutionCards } from '@/components/sections/SolutionCards';
import { AboutBlock } from '@/components/sections/AboutBlock';
import { UserFeaturesBlock } from '@/components/sections/UserFeaturesBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

export default function HomePage() {
  const [homepage, setHomepage] = useState<any>(null);

  useEffect(() => {
    getHomepage().then(setHomepage);
  }, []);

  return (
    <>
      <PageMeta title="Woo-compliance oplossing voor de overheid" description="Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 611 bestuursorganen." />
      {/* 1 — Hero: brand-100 achtergrond */}
      {homepage?.hero && <Hero data={homepage.hero} />}

      {/* 2 — Statistieken: witte achtergrond */}
      <StatsBlock />

      {/* 3 — Herkenbaar? compact doorlink: neutral-50 achtergrond */}
      <section className="bg-neutral-50 py-16 lg:py-20" aria-label="Herkenbaar?">
        <div className="max-w-3xl mx-auto text-center px-6">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
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

      {/* 4 — Oplossingskaarten: brand-100 achtergrond */}
      {homepage?.feature_cards && (
        <SolutionCards data={homepage.feature_cards} />
      )}

      {/* 6 — Over Staterra: witte achtergrond */}
      {homepage?.about_opms && (
        <AboutBlock data={homepage.about_opms} />
      )}

      {/* 7 — Vergelijking doorlink: brand-100 achtergrond */}
      <section className="bg-brand-100 py-16 lg:py-20" aria-label="Vergelijking">
        <div className="max-w-3xl mx-auto text-center px-6">
          <p className="text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
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

      {/* 8 — Gebruikersvoordelen: brand-100 achtergrond */}
      {homepage?.user_features && (
        <UserFeaturesBlock data={homepage.user_features} />
      )}

      {/* 9 — CTA-blok: brand-gradient achtergrond */}
      {homepage?.bottom_cta && <CTABlock data={homepage.bottom_cta} />}
    </>
  );
}
