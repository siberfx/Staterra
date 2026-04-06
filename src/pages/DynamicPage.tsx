import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSolution, getPage, mapMenuUrl } from '@/services/cms';
import type { SolutionDetail, Page } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { PageTemplate } from '@/components/templates/PageTemplate';
import { PageMeta } from '@/components/PageMeta';
import LeadMagnetBanner from '@/components/LeadMagnetBanner';
import { DOELGROEP_CONFIG } from '@/lib/doelgroep-config';
import { ROUTE_SCHEMAS } from '@/config/structuredData';
import { DOELGROEP_HERO } from '@/config/doelgroepHero';

// ── Bestuurslaag-specifieke badge-kleuren en aantallen
const LAYER_META: Record<string, { badge: string; count: string; color: string }> = {
  'woo-gemeenten':     { badge: 'Gemeenten',     count: '342 gemeenten',                    color: 'bg-emerald-100 text-emerald-800' },
  'woo-provincies':    { badge: 'Provincies',     count: '12 provincies',                    color: 'bg-purple-100 text-purple-800' },
  'woo-waterschappen': { badge: 'Waterschappen',  count: '21 waterschappen',                 color: 'bg-cyan-100 text-cyan-800' },
  'woo-rijksoverheid': { badge: 'Rijksoverheid',  count: '15 ministeries + ~40 agentschappen', color: 'bg-amber-100 text-amber-800' },
};

export default function DynamicPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [solution, setSolution] = useState<SolutionDetail | null>(null);
  const [page, setPage] = useState<Page | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setNotFound(false);
      setSolution(null);
      setPage(null);

      try {
        // Staterra-* pages: als er een heroConfig bestaat, gebruik doelgroep-template
        if (slug.startsWith('staterra-')) {
          if (DOELGROEP_HERO[slug]) {
            // Doelgroep met unified hero — markeer als notFound zodat de fallback rendert
            if (!cancelled) setNotFound(true);
          } else {
            // Geen heroConfig — probeer CMS PageTemplate
            const pageData = await getPage(slug);
            if (!cancelled) {
              if (pageData) {
                setPage(pageData);
                document.title = pageData.meta_title || `${pageData.title} \u2014 Staterra`;
              } else {
                setNotFound(true);
              }
            }
          }
          return;
        }

        // Try as solution first
        const solutionData = await getSolution(slug);
        if (!cancelled && solutionData) {
          setSolution(solutionData);
          document.title = solutionData.meta_title || `${solutionData.title} \u2014 Staterra`;
          return;
        }

        // Try as generic CMS page
        const pageData = await getPage(slug);
        if (!cancelled && pageData) {
          setPage(pageData);
          document.title = pageData.meta_title || `${pageData.title} \u2014 Staterra`;
          return;
        }

        if (!cancelled) {
          setNotFound(true);
          document.title = 'Pagina niet gevonden \u2014 Staterra';
        }
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Container variant="text">
          <p className="text-body text-neutral-500">Laden...</p>
        </Container>
      </div>
    );
  }

  // Fallback voor staterra-* doelgroeppagina's als CMS niet beschikbaar is
  const doelgroepConfig = slug ? DOELGROEP_CONFIG[slug] : undefined;
  const heroConfig = slug ? DOELGROEP_HERO[slug] : undefined;
  if (notFound && doelgroepConfig && heroConfig) {
    return (
      <>
        <PageMeta title={doelgroepConfig.heroTitle} description={heroConfig.subtitle} schemas={ROUTE_SCHEMAS[slug] ?? []} />
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #163E74 0%, #1B5392 40%, #2568A8 70%, #3A7DB8 100%)' }}
        >
          <div className="absolute -top-[100px] -right-[100px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.12) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="absolute -bottom-[80px] right-[200px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
          <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20 lg:pb-[88px]">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.5px] text-brand-400 mb-5">
              {heroConfig.label}
            </p>
            <h1 className="font-heading text-[32px] lg:text-[48px] font-bold text-white leading-[1.08] max-w-[720px] mb-6">
              {heroConfig.h1Line1}<br />
              <span className="text-brand-400">{heroConfig.h1Accent}</span>
            </h1>
            <p className="text-[17px] lg:text-[19px] leading-[1.6] text-white/[0.82] max-w-[640px] mb-9">
              {heroConfig.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="bg-white text-brand-900 rounded-[10px] px-7 py-4 text-[16px] font-semibold hover:bg-brand-100 hover:-translate-y-px transition-all duration-200">
                Plan een verkenningsgesprek
              </a>
              <a href={heroConfig.secondaryCta.href} className="bg-white/[0.08] text-white border border-white/25 rounded-[10px] px-7 py-4 text-[16px] font-medium hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 flex items-center gap-1.5">
                {heroConfig.secondaryCta.text} <span>→</span>
              </a>
            </div>
          </div>
        </section>
        {/* Herkenbare uitdagingen voor deze doelgroep (breed, niet Woo-specifiek) */}
        {heroConfig.uitdagingen && heroConfig.uitdagingen.length > 0 && (
          <section className="bg-white py-16 lg:py-24" aria-labelledby="uitdagingen-heading">
            <Container variant="content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                    Herkenbaar?
                  </span>
                  <h2 id="uitdagingen-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]">
                    De uitdagingen die {heroConfig.doelgroepNaam} herkennen
                  </h2>
                  {heroConfig.uitdagingenIntro && (
                    <p className="text-body text-neutral-700 leading-relaxed">
                      {heroConfig.uitdagingenIntro}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  {heroConfig.uitdagingen.map((uitdaging, i) => (
                    <div key={i} className="rounded-[16px] border border-neutral-200 bg-neutral-50 p-5 flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                        <span className="text-body-sm font-semibold text-brand-700">{i + 1}</span>
                      </span>
                      <p className="text-body-sm text-neutral-700 leading-relaxed">{uitdaging}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concreet herkenbaar scenario */}
              {heroConfig.herkenbaarScenario && (
                <aside
                  aria-label="Herkenbaar scenario"
                  className="max-w-[760px] mx-auto mt-12 lg:mt-14 rounded-[16px] bg-brand-100 border-l-4 border-brand-400 px-5 py-6 sm:px-10 sm:py-8"
                >
                  <p className="text-[17px] sm:text-[19px] leading-[1.6] text-neutral-800">
                    {heroConfig.herkenbaarScenario}
                  </p>
                  {heroConfig.herkenbaarObservatie && (
                    <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.55] font-medium text-brand-700">
                      {heroConfig.herkenbaarObservatie}
                    </p>
                  )}
                </aside>
              )}
            </Container>
          </section>
        )}

        {/* Wat wij bieden — drie pijlers */}
        <section className="bg-brand-100 py-16 lg:py-24" aria-labelledby="aanbod-heading">
          <Container variant="content">
            <div className="text-center mb-12">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                Wat wij bieden
              </span>
              <h2 id="aanbod-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
                Drie aanpakken, passend bij uw vraagstuk
              </h2>
              <p className="text-body text-neutral-700 max-w-[560px] mx-auto">
                Elk traject is anders. Staterra biedt de aanpak die past bij uw organisatie — van maatwerkoplossingen tot een bewezen Woo-platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pijler 1: Samen ontwikkelen */}
              <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
                <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Samen ontwikkelen</h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                  Heeft uw organisatie een specifiek vraagstuk? Wij bouwen samen met u
                  nieuwe digitale oplossingen — van eerste verkenning tot werkend product.
                  Open source, volledig eigendom bij uw organisatie.
                </p>
                <Link to="/samen-ontwikkelen" className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group/link">
                  Meer over samen ontwikkelen
                  <svg className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>

              {/* Pijler 2: Open source */}
              <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
                <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Open source implementatie</h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                  Wij implementeren en beheren open source platformen zoals Nextcloud,
                  Rocket.Chat en OPMS — op uw eigen infrastructuur, met professioneel
                  beheer, updates en ondersteuning.
                </p>
                <Link to="/open-source" className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group/link">
                  Meer over open source
                  <svg className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>

              {/* Pijler 3: OPMS / Woo-oplossing — met link naar woo-doelgroeppagina */}
              <div className="rounded-[20px] border-2 border-brand-700 bg-white p-8 flex flex-col relative">
                <span className="absolute -top-3 left-6 px-3 py-1 bg-brand-700 text-white text-caption font-semibold rounded-full">
                  Direct beschikbaar
                </span>
                <div className="w-12 h-12 rounded-[10px] bg-brand-700 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Woo-compliance (OPMS)</h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                  {heroConfig.wooIntro}
                </p>
                {heroConfig.wooLink && (
                  <Link to={heroConfig.wooLink} className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group/link">
                    Woo-oplossing voor {heroConfig.doelgroepNaam}
                    <svg className="w-4 h-4 transition-transform duration-150 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Systemen en integraties + koepelverwijzing (breed) */}
        {(heroConfig.systemenIntro || heroConfig.koepelIntro) && (
          <section className="bg-white py-16 lg:py-24" aria-labelledby="systemen-heading">
            <Container variant="content">
              <div className="text-center mb-12">
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                  Aansluiting op uw omgeving
                </span>
                <h2 id="systemen-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
                  Integratie met de systemen die u al gebruikt
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {heroConfig.systemenIntro && (
                  <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-8 flex flex-col">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Systemen en integraties</h3>
                    <p className="text-body-sm text-neutral-700 leading-relaxed flex-1">
                      {heroConfig.systemenIntro}
                    </p>
                  </div>
                )}

                {heroConfig.koepelIntro && (
                  <div className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-8 flex flex-col">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Bestuurlijk netwerk</h3>
                    <p className="text-body-sm text-neutral-700 leading-relaxed flex-1">
                      {heroConfig.koepelIntro}
                    </p>
                  </div>
                )}
              </div>
            </Container>
          </section>
        )}

        <LeadMagnetBanner />

        {/* CTA */}
        <section
          className="relative overflow-hidden py-20 lg:py-28"
          style={{ background: 'var(--gradient-brand)' }}
        >
          <Container variant="text">
            <div className="text-center relative z-10">
              <h2 className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]">
                Wat kan Staterra voor {heroConfig.doelgroepNaam} betekenen?
              </h2>
              <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
                Bespreek uw vraagstuk in een vrijblijvend verkenningsgesprek.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Plan een gesprek
                </Button>
                <Button as="link" href={heroConfig.wooLink || '/oplossingen'} size="lg" className="bg-transparent text-white border border-white/40 hover:bg-white/10">
                  {heroConfig.wooLink ? `Woo-oplossing voor ${heroConfig.doelgroepNaam} →` : 'Bekijk alle oplossingen →'}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }

  if (notFound) {
    return (
      <div className="py-20 text-center">
        <Container variant="text">
          <h1 className="type-h2 text-neutral-950 mb-4">
            Pagina niet gevonden
          </h1>
          <p className="text-body text-neutral-600 mb-8">
            De pagina die u zoekt bestaat niet of is verplaatst.
          </p>
          <Button as="link" href="/" variant="primary">
            Terug naar home
          </Button>
        </Container>
      </div>
    );
  }

  // Render PageTemplate for CMS pages
  if (page) {
    return <PageTemplate page={page} />;
  }

  // Render solution page
  if (!solution) return null;

  const solutionHero = slug ? DOELGROEP_HERO[slug] : undefined;
  const ctaHref = solution.link_url ? mapMenuUrl(solution.link_url) : '/contact';

  return (
    <>
      <PageMeta
        title={solution.meta_title || solution.title}
        description={solutionHero?.subtitle || solution.subtitle || undefined}
        schemas={slug ? (ROUTE_SCHEMAS[slug] ?? []) : []}
      />
      {/* ── 1. Hero (unified doelgroep template) ──────────────── */}
      <section
        className="relative overflow-hidden"
        aria-label="Introductie"
        style={{ background: 'linear-gradient(160deg, #163E74 0%, #1B5392 40%, #2568A8 70%, #3A7DB8 100%)' }}
      >
        <div className="absolute -top-[100px] -right-[100px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.12) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="absolute -bottom-[80px] right-[200px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(108,182,217,0.08) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20 lg:pb-[88px]">
          {solutionHero ? (
            <>
              <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.5px] text-brand-400 mb-5">
                {solutionHero.label}
              </p>
              <h1 className="font-heading text-[32px] lg:text-[48px] font-bold text-white leading-[1.08] max-w-[720px] mb-6">
                {solutionHero.h1Line1}<br />
                <span className="text-brand-400">{solutionHero.h1Accent}</span>
              </h1>
              <p className="text-[17px] lg:text-[19px] leading-[1.6] text-white/[0.82] max-w-[640px] mb-9">
                {solutionHero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="bg-white text-brand-900 rounded-[10px] px-7 py-4 text-[16px] font-semibold hover:bg-brand-100 hover:-translate-y-px transition-all duration-200">
                  Plan een verkenningsgesprek
                </a>
                <a href={solutionHero.secondaryCta.href} className="bg-white/[0.08] text-white border border-white/25 rounded-[10px] px-7 py-4 text-[16px] font-medium hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 flex items-center gap-1.5">
                  {solutionHero.secondaryCta.text} <span>→</span>
                </a>
              </div>
            </>
          ) : (
            <>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-200 mb-5">
                {solution.nav_title || solution.title}
              </span>
              <h1 className="font-heading text-[32px] lg:text-[48px] font-bold text-white leading-[1.08] max-w-[720px] mb-6">
                {solution.title}
              </h1>
              <p className="text-[17px] lg:text-[19px] leading-[1.6] text-white/[0.82] max-w-[640px] mb-9">
                {solution.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="bg-white text-brand-900 rounded-[10px] px-7 py-4 text-[16px] font-semibold hover:bg-brand-100 hover:-translate-y-px transition-all duration-200">
                  Plan een verkenningsgesprek
                </a>
                <a href="/woo-oplossing" className="bg-white/[0.08] text-white border border-white/25 rounded-[10px] px-7 py-4 text-[16px] font-medium hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 flex items-center gap-1.5">
                  Bekijk de Woo-oplossing <span>→</span>
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── 2. Woo-specifieke uitdagingen (alleen op woo-doelgroeppagina's) ── */}
      {solutionHero?.wooUitdagingen && solutionHero.wooUitdagingen.length > 0 && (
        <section className="bg-white py-16 lg:py-24" aria-labelledby="woo-uitdagingen-heading">
          <Container variant="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                  Herkenbaar?
                </span>
                <h2 id="woo-uitdagingen-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]">
                  De Woo-uitdagingen die {solutionHero.doelgroepNaam} herkennen
                </h2>
                {solutionHero.wooUitdagingenIntro && (
                  <p className="text-body text-neutral-700 leading-relaxed">
                    {solutionHero.wooUitdagingenIntro}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {solutionHero.wooUitdagingen.map((uitdaging, i) => (
                  <div key={i} className="rounded-[16px] border border-neutral-200 bg-neutral-50 p-5 flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                      <span className="text-body-sm font-semibold text-brand-700">{i + 1}</span>
                    </span>
                    <p className="text-body-sm text-neutral-700 leading-relaxed">{uitdaging}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── 2b. Woo-specifieke systemen en koepel ─────────────── */}
      {(solutionHero?.wooSystemenIntro || solutionHero?.wooKoepelIntro) && (
        <section className="bg-brand-100 py-16 lg:py-24" aria-labelledby="woo-systemen-heading">
          <Container variant="content">
            <div className="text-center mb-12">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                Integratie en samenwerking
              </span>
              <h2 id="woo-systemen-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
                OPMS sluit aan op uw bestaande systemen
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solutionHero.wooSystemenIntro && (
                <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Systemen en integraties</h3>
                  <p className="text-body-sm text-neutral-700 leading-relaxed flex-1">
                    {solutionHero.wooSystemenIntro}
                  </p>
                </div>
              )}

              {solutionHero.wooKoepelIntro && (
                <div className="rounded-[20px] border border-neutral-200 bg-white p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">Samenwerking</h3>
                  <p className="text-body-sm text-neutral-700 leading-relaxed flex-1">
                    {solutionHero.wooKoepelIntro}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── 3. Inhoud: long_body + kenmerken ────────────────── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="content-heading">
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Tekst */}
            <div>
              {solution.short_body && (
                <p className="type-body-lg text-neutral-700 mb-8">
                  {solution.short_body}
                </p>
              )}

              {solution.long_body && (
                <div
                  className="rich-text [&_h2~h2]:border-t [&_h2~h2]:border-neutral-200 [&_h2~h2]:pt-8"
                  dangerouslySetInnerHTML={{ __html: solution.long_body
                    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
                    .replace(/<h3([^>]*)>/g, '<h2$1>')
                    .replace(/<\/h3>/g, '</h2>')
                    .replace(/<h4([^>]*)>/g, '<h3$1>')
                    .replace(/<\/h4>/g, '</h3>')
                    .replace(/\s*\([A-C]\)/g, '')
                  }}
                />
              )}
            </div>

            {/* Kenmerken-kaart */}
            {solution.list_items?.length > 0 && (
              <div>
                <Card padding="loose" hover={false}>
                  <h2 className="type-h3 text-neutral-950 mb-6">
                    Wat u krijgt
                  </h2>
                  <ul className="space-y-4">
                    {solution.list_items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-body-sm text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <Button as="link" href={ctaHref} variant="primary" className="w-full justify-center">
                      {solution.link_text || 'Plan een verkenningsgesprek'}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 3. Testimonial ───────────────────────────────────── */}
      {solution.testimonial_quote && (
        <section className="bg-brand-900 py-16 lg:py-20" aria-label="Testimonial">
          <Container variant="text">
            <figure className="text-center">
              {/* Quote-icoon */}
              <svg
                className="w-10 h-10 text-brand-400 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="type-h3 text-white mb-6 max-w-[700px] mx-auto">
                &ldquo;{solution.testimonial_quote}&rdquo;
              </blockquote>

              <figcaption>
                {solution.testimonial_author && (
                  <span className="block text-body-sm font-semibold text-brand-300">
                    {solution.testimonial_author}
                  </span>
                )}
                {solution.testimonial_company && (
                  <span className="block text-caption text-brand-400/70 mt-1">
                    {solution.testimonial_company}
                  </span>
                )}
              </figcaption>
            </figure>
          </Container>
        </section>
      )}

      {/* ── 4. FAQ ───────────────────────────────────────────── */}
      {solution.faq?.length > 0 && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="faq-heading"
        >
          <Container variant="text">
            <div className="text-center mb-10">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                Vragen
              </span>
              <h2
                id="faq-heading"
                className="type-h2 text-neutral-950"
              >
                Veelgestelde vragen
              </h2>
            </div>

            <Card hover={false} padding="loose">
              <FaqAccordion items={solution.faq} />
            </Card>
          </Container>
        </section>
      )}

      {/* ── 5. CTA ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="solution-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="solution-cta-heading"
              className="type-h2 text-white mb-4"
            >
              Klaar om te starten met OPMS?
            </h2>
            <p className="type-body-lg text-brand-200 mb-10">
              Plan een vrijblijvend verkenningsgesprek. Binnen twee werkdagen een
              inhoudelijke reactie — geen verkoopdruk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href="/oplossingen"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Bekijk alle oplossingen
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
