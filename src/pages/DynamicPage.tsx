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
        // Staterra-* pages: use PageTemplate
        if (slug.startsWith('staterra-')) {
          const pageData = await getPage(slug);
          if (!cancelled) {
            if (pageData) {
              setPage(pageData);
              document.title = pageData.meta_title || `${pageData.title} \u2014 Staterra`;
            } else {
              setNotFound(true);
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
  if (notFound && doelgroepConfig) {
    return (
      <>
        <PageMeta title={doelgroepConfig.heroTitle} description={doelgroepConfig.heroSubtitle} schemas={ROUTE_SCHEMAS[slug] ?? []} />
        <section
          className="relative overflow-hidden py-20 lg:py-28"
          style={{ background: 'var(--gradient-brand)' }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white" />
          <Container variant="content" className="relative z-10">
            <div className="max-w-[720px]">
              <span className={`inline-block text-caption font-semibold px-3 py-1 rounded-full mb-5 ${doelgroepConfig.badgeColor}`}>
                {doelgroepConfig.badge}
              </span>
              <h1 className="font-heading text-h1 font-semibold text-white mb-6 leading-[1.05]">
                {doelgroepConfig.heroTitle}
              </h1>
              <p className="text-body-lg text-brand-200 mb-8 leading-relaxed">
                {doelgroepConfig.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Plan een verkenningsgesprek
                </Button>
                <Button as="link" href="/woo-oplossing" size="lg" className="bg-transparent text-white border border-white/40 hover:bg-white/10">
                  Bekijk de Woo-oplossing →
                </Button>
              </div>
            </div>
          </Container>
        </section>
        <LeadMagnetBanner />
        <section className="bg-white py-16 lg:py-24">
          <Container variant="text">
            <div className="text-center">
              <h2 className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
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
          <h1 className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
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

  const meta = slug ? LAYER_META[slug] : undefined;
  const ctaHref = solution.link_url ? mapMenuUrl(solution.link_url) : '/contact';

  return (
    <>
      <PageMeta
        title={solution.meta_title || solution.title}
        description={solution.subtitle || undefined}
        schemas={slug ? (ROUTE_SCHEMAS[slug] ?? []) : []}
      />
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Introductie"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />

        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Badge */}
              {meta && (
                <span className={`inline-block text-caption font-semibold px-3 py-1 rounded-full mb-5 ${meta.color}`}>
                  {meta.badge} — {meta.count}
                </span>
              )}
              {!meta && (
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-200 mb-5">
                  Woo-oplossing
                </span>
              )}

              <h1 className="font-heading text-h1 font-semibold text-white mb-4 leading-[1.05]">
                {solution.title}
              </h1>
              <p className="text-body-lg text-brand-200 mb-8 leading-relaxed">
                {solution.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Plan een verkenningsgesprek
                </Button>
                <Button
                  as="link"
                  href="/woo-oplossing"
                  size="lg"
                  className="bg-transparent text-white border border-white/40 hover:bg-white/10"
                >
                  Bekijk de Woo-oplossing →
                </Button>
              </div>
            </div>

            {/* Hero-afbeelding */}
            {solution.image && (
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.25)]">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 2. Inhoud: long_body + kenmerken ────────────────── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="content-heading">
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Tekst */}
            <div>
              {solution.short_body && (
                <p className="text-body-lg text-neutral-700 leading-relaxed mb-8">
                  {solution.short_body}
                </p>
              )}

              {solution.long_body && (
                <div
                  className="
                    prose max-w-none
                    [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand-900 [&_h2]:leading-snug [&_h2]:mt-10 [&_h2]:mb-4
                    [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brand-900 [&_h3]:leading-snug [&_h3]:mt-8 [&_h3]:mb-3
                    [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-brand-900 [&_h4]:mt-6 [&_h4]:mb-2
                    [&_p]:text-base [&_p]:text-neutral-700 [&_p]:leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5
                    [&_li]:text-base [&_li]:text-neutral-700 [&_li]:my-1 [&_li]:marker:text-brand-700
                    [&_strong]:text-neutral-950 [&_strong]:font-semibold
                    [&_a]:text-brand-700 [&_a]:font-medium [&_a]:no-underline hover:[&_a]:text-brand-900
                    [&_h2~h2]:border-t [&_h2~h2]:border-neutral-200 [&_h2~h2]:pt-8
                  "
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
                  <h2 className="font-heading text-h4 font-semibold text-neutral-950 mb-6">
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

              <blockquote className="font-heading text-h3 font-semibold text-white leading-snug mb-6 max-w-[700px] mx-auto">
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
                className="font-heading text-h2 font-semibold text-neutral-950"
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
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Klaar om te starten met OPMS?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
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
