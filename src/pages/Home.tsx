import { useState, useEffect } from 'react';
import { getHomepage } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
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
            Meer dan 600 bestuursorganen moeten voldoen aan de Wet open overheid.
            Staterra levert oplossingen die vandaag
            werken — niet over twee jaar.
          </p>
        </div>
      </section>

      {/* 3 — Ons aanbod (2+1 model) */}
      <section className="bg-brand-100 py-16 lg:py-24" aria-labelledby="aanbod-heading">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Ons aanbod
            </span>
            <h2 id="aanbod-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
              Twee routes naar digitale regie
            </h2>
            <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
              Staterra werkt op twee manieren: wij bouwen samen met u nieuwe
              oplossingen, of wij implementeren en beheren bestaande open source
              platformen voor uw organisatie.
            </p>
          </div>

          {/* Twee route-kaarten */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
              <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
                Samen ontwikkelen
              </h3>
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                Voor organisaties met specifieke vraagstukken of ambitie. Samen
                bouwen we nieuwe digitale oplossingen — van eerste verkenning tot
                werkend product. Het resultaat is open source en volledig van u.
              </p>
              <a
                href="/samen-ontwikkelen"
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group/link"
              >
                Ontdek het ontwikkelproces
                <svg className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
              <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
                Open source implementeren en beheren
              </h3>
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                Gebruik bestaande oplossingen zonder afhankelijkheid. Wij
                implementeren en beheren platformen zoals Nextcloud, Rocket.Chat
                en OPMS — op uw eigen infrastructuur, met professioneel beheer.
              </p>
              <a
                href="/open-source"
                className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group/link"
              >
                Ontdek de open source aanpak
                <svg className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Woo-oplossing highlight — zelfde stijl als /oplossingen */}
          <div className="rounded-[20px] border border-brand-200 bg-brand-50 p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="flex-1">
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-2">
                  Direct beschikbaar
                </span>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
                  Woo-compliance met OPMS
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed">
                  Onze Woo-oplossing is een concrete uitwerking van wat we samen met
                  en voor de overheid hebben ontwikkeld. Het OPMS-platform is bewezen
                  in de praktijk en direct inzetbaar — zonder langdurig ontwikkeltraject.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/woo-oplossing"
                  className="inline-flex items-center gap-2 bg-brand-700 text-white rounded-[10px] px-6 py-3.5 text-body-sm font-medium hover:bg-brand-900 transition-colors duration-150"
                >
                  Bekijk de Woo-oplossing
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
