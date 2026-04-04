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

      {/* 1 — Hero */}
      <section
        className="relative overflow-hidden min-h-[600px] flex items-center"
        aria-label="Introductie"
        style={{ background: 'linear-gradient(160deg, #163E74 0%, #1B5392 40%, #2568A8 70%, #3A7DB8 100%)' }}
      >
        {/* Decoratieve cirkels */}
        <div className="absolute -top-[120px] -right-[80px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.10) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="absolute -bottom-[200px] right-[200px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.06) 0%, transparent 70%)' }} aria-hidden="true" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-[88px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-[72px] items-center">

            {/* Links: tekst */}
            <div>
              <p className="font-heading text-[13px] font-semibold uppercase tracking-[2px] text-brand-400 mb-5">
                Digitale oplossingen voor de overheid
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[50px] font-bold text-white mb-7 leading-[1.08]">
                Open source oplossingen{' '}
                <span className="text-brand-400">waar u verder mee kunt</span>
              </h1>
              <p className="text-[18px] leading-[1.7] text-white/75 max-w-[520px] mb-10">
                Staterra bouwt, implementeert en beheert digitale oplossingen voor de
                publieke sector.{' '}
                <strong className="text-white/95 font-medium">
                  U houdt regie over uw systemen en broncode
                </strong>{' '}
                — van bewezen Woo-platform tot maatwerk.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="bg-white text-brand-700 rounded-[10px] px-[30px] py-[15px] text-[16px] font-semibold hover:bg-brand-100 hover:-translate-y-px transition-all duration-200"
                >
                  Plan een verkenning
                </a>
                <a
                  href="/oplossingen"
                  className="bg-transparent text-white border border-white/30 rounded-[10px] px-[30px] py-[15px] text-[16px] font-medium hover:border-white/50 hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-2"
                >
                  Bekijk onze oplossingen <span>→</span>
                </a>
              </div>
            </div>

            {/* Rechts: proof cards */}
            <div className="flex flex-col gap-3.5">

              {/* Card 1: Onze aanpakken (2 routes) */}
              <div className="bg-white/[0.06] backdrop-blur-[12px] border border-white/10 rounded-[16px] p-7">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[1.8px] text-brand-400 mb-5">
                  Onze aanpakken
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: 'Samen ontwikkelen',
                      desc: 'Nieuwe oplossingen bouwen, eigendom bij uw organisatie',
                      icon: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
                    },
                    {
                      name: 'Open source implementeren',
                      desc: 'Bestaande platformen uitrollen en beheren',
                      icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
                    },
                  ].map((item) => (
                    <div key={item.name} className="flex gap-3.5 items-start">
                      <div className="flex-shrink-0 w-9 h-9 rounded-[9px] bg-brand-400/10 border border-brand-400/15 flex items-center justify-center text-brand-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {item.icon}
                        </svg>
                      </div>
                      <div className="pt-0.5">
                        <p className="font-heading text-[14px] font-semibold text-white">{item.name}</p>
                        <p className="text-[13px] text-white/50 leading-[1.45]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scheidingslijn + bewezen platform */}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[1.8px] text-white/40 mb-3">
                    Direct beschikbaar
                  </p>
                  <div className="flex gap-3.5 items-start bg-white/[0.04] rounded-[12px] p-3.5 -mx-1">
                    <div className="flex-shrink-0 w-9 h-9 rounded-[9px] bg-brand-400/20 border border-brand-400/25 flex items-center justify-center text-brand-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                    </div>
                    <div className="pt-0.5">
                      <p className="font-heading text-[14px] font-semibold text-white">Woo-oplossing (OPMS)</p>
                      <p className="text-[13px] text-white/50 leading-[1.45]">Ons bewezen platform, direct inzetbaar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Waarom Staterra */}
              <div className="bg-white/[0.04] backdrop-blur-[12px] border border-white/[0.08] rounded-[16px] px-7 py-6">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[1.8px] text-white/35 mb-4">
                  Waarom Staterra
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    'U behoudt volledige regie, geen vendor lock-in',
                    'Onderdeel van het open source ecosysteem',
                    'Implementatie, beheer en doorontwikkeling',
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2.5">
                      <svg className="text-brand-400 opacity-70 flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[14px] text-white/65">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2 — Urgentiesectie */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--neutral-200, #E9EEF2), transparent)' }} />
      <section className="bg-white py-16 lg:py-20" aria-label="Urgentie">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <p className="font-heading text-[13px] font-semibold uppercase tracking-[2px] text-brand-700 mb-4">
            De urgentie
          </p>
          <h2 className="font-heading text-h2 font-bold text-neutral-950 mb-5 leading-[1.15]">
            Steeds meer verplichtingen, steeds minder tijd
          </h2>
          <p className="text-[18px] leading-[1.65] text-neutral-700">
            Meer dan 611 bestuursorganen moeten voldoen aan de Wet open overheid.
            De capaciteit groeit niet mee. Staterra levert oplossingen die vandaag
            werken — niet over twee jaar.
          </p>
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
