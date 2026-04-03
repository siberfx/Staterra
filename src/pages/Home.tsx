import { useState, useEffect } from 'react';
import { getHomepage } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import { SolutionCards } from '@/components/sections/SolutionCards';
import { AboutBlock } from '@/components/sections/AboutBlock';
import { UserFeaturesBlock } from '@/components/sections/UserFeaturesBlock';
import { CTABlock } from '@/components/sections/CTABlock';
import { HomeFaq } from '@/components/sections/HomeFaq';

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

      {/* 1 — Compacte hero */}
      <section className="relative overflow-hidden" aria-label="Introductie">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(22,62,116,0.03) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-14 lg:pb-20">
          <div className="max-w-[640px]">
            <p className="text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
              Digitale oplossingen voor een overheid in beweging
            </p>
            <h1 className="font-heading text-[1.75rem] sm:text-[2.25rem] lg:text-h1 font-bold text-neutral-950 mb-5 leading-[1.15]">
              Steeds meer verplichtingen,<br className="hidden sm:block" /> steeds minder tijd
            </h1>
            <p className="text-body text-neutral-500 leading-relaxed mb-8 max-w-[520px]">
              Staterra ontwikkelt en implementeert digitale open source oplossingen die
              direct werken in de praktijk — zonder dat u technisch hoeft mee te denken.
              Een werkende oplossing binnen 3 maanden, volledig inzetbaar binnen 9.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="bg-brand-700 text-white rounded-[10px] px-6 py-3.5 text-body-sm font-medium hover:bg-brand-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
              >
                Plan een verkenning
              </a>
              <a
                href="/oplossingen"
                className="bg-white text-brand-700 border border-neutral-200 rounded-[10px] px-6 py-3.5 text-body-sm font-medium hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 group"
              >
                Bekijk onze oplossingen
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Pillar strip */}
      <section className="border-t border-neutral-100 bg-brand-50/40" aria-label="Onze pijlers">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-700 rounded-[10px] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="3" y="1" width="14" height="18" rx="2" stroke="white" strokeWidth="1.5" />
                  <polyline points="7,10 9,12 13,8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-950 text-body-sm">Woo-compliance met OPMS</p>
                <p className="text-neutral-500 text-body-sm mt-1 leading-relaxed">
                  Werkend publicatieplatform direct beschikbaar voor bestuursorganen, gemeenten en waterschappen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-700 rounded-[10px] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="5" r="3" stroke="white" strokeWidth="1.5" />
                  <circle cx="4" cy="15" r="3" stroke="white" strokeWidth="1.5" />
                  <circle cx="16" cy="15" r="3" stroke="white" strokeWidth="1.5" />
                  <line x1="10" y1="8" x2="10" y2="11" stroke="white" strokeWidth="1.5" />
                  <path d="M10,11 Q10,13 4,12" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M10,11 Q10,13 16,12" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-950 text-body-sm">Open source development</p>
                <p className="text-neutral-500 text-body-sm mt-1 leading-relaxed">
                  Eigendom bij de overheid, geen vendor lock-in. Samen bouwen, zelf doorontwikkelen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-brand-700 rounded-[10px] flex items-center justify-center mt-0.5">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <polyline points="6,7 2,10 6,13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14,7 18,10 14,13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="4" x2="8" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-950 text-body-sm">Maatwerk applicaties</p>
                <p className="text-neutral-500 text-body-sm mt-1 leading-relaxed">
                  Open source en ontworpen om schaalbaar door te groeien met uw organisatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Oplossingskaarten */}
      {homepage?.feature_cards && (
        <SolutionCards data={homepage.feature_cards} />
      )}

      {/* 4 — Over Staterra */}
      {homepage?.about_opms && (
        <AboutBlock data={homepage.about_opms} />
      )}

      {/* 5 — Gebruikersvoordelen */}
      {homepage?.user_features && (
        <UserFeaturesBlock data={homepage.user_features} />
      )}

      {/* 6 — FAQ */}
      <HomeFaq />

      {/* 7 — CTA-blok */}
      {homepage?.bottom_cta && <CTABlock data={homepage.bottom_cta} />}
    </>
  );
}
