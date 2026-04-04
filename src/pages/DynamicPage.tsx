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
        <LeadMagnetBanner />

        {/* Breder dan Woo */}
        <section className="bg-neutral-50 py-10 lg:py-12" aria-label="Meer dan Woo">
          <Container variant="text">
            <p className="text-body text-neutral-700 text-center leading-relaxed">
              Naast Woo-compliance bouwt en beheert Staterra ook andere digitale
              oplossingen voor de publieke sector — op basis van open source, met
              volledige regie.{' '}
              <Link to="/oplossingen" className="font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150">
                Bekijk alle oplossingen →
              </Link>
            </p>
          </Container>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <Container variant="text">
            <div className="text-center">
              <h2 className="type-h2 text-neutral-950 mb-4">
                Meer weten?
              </h2>
              <p className="text-body text-neutral-700 mb-8 max-w-[540px] mx-auto">
                Ontdek hoe Staterra uw organisatie ondersteunt bij Woo-compliance en digitale dienstverlening.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as="link" href="/oplossingen" variant="secondary">
                  Bekijk alle oplossingen
                </Button>
                <Button as="link" href="/contact" variant="primary">
                  Neem contact op
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

      {/* ── 2. Inhoud: long_body + kenmerken ────────────────── */}
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
