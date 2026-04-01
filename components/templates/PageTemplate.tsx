import Image from 'next/image';
import Link from 'next/link';
import type { Page } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DOELGROEP_CONFIG } from '@/lib/doelgroep-config';

interface PageTemplateProps {
  page: Page;
}

// Strip de eerste <h1> — staat al in de hero
function stripFirstH1(html: string): string {
  return html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
}

export function PageTemplate({ page }: PageTemplateProps) {
  const config = DOELGROEP_CONFIG[page.slug];
  const bodyHtml = page.long_body ? stripFirstH1(page.long_body) : '';

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Introductie"
        style={{ background: 'var(--gradient-brand)' }}
      >
        {/* decoratief element */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />

        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Linkerkolom: tekst */}
            <div>
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-caption text-white/60 mb-6"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white/90">{page.title}</span>
              </nav>

              {/* Doelgroep-badge */}
              {config?.badge && (
                <span className={`inline-block text-caption font-semibold px-3 py-1 rounded-full mb-5 ${config.badgeColor}`}>
                  {config.badge}
                </span>
              )}

              <h1 className="font-heading text-h1 font-semibold text-white mb-5 leading-[1.05] max-w-2xl">
                {page.title}
              </h1>

              {page.short_body && (
                <p className="text-body-lg text-brand-200 mb-8 leading-relaxed max-w-xl">
                  {page.short_body}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button as="link" href="/contact" variant="secondary" size="lg">
                  Plan een verkenningsgesprek
                </Button>
                <Button
                  as="link"
                  href={config?.solutionSlug ?? '/oplossingen'}
                  size="lg"
                  className="bg-transparent text-white border border-white/40 hover:bg-white/10"
                >
                  {config?.solutionLabel ?? 'Bekijk oplossingen →'}
                </Button>
              </div>
            </div>

            {/* Rechterkolom: afbeelding */}
            {page.image && (
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.25)]">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1280px) 50vw, 560px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 2. Content + sidebar ─────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24" aria-label="Inhoud">
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">

            {/* Hoofdcontent */}
            {bodyHtml ? (
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
                  [&_h2+h2]:border-t [&_h2~h2]:border-t [&_h2~h2]:border-neutral-200 [&_h2~h2]:pt-8
                "
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : (
              page.short_body && (
                <p className="text-body text-neutral-700 leading-relaxed">
                  {page.short_body}
                </p>
              )
            )}

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-5 h-fit">

              {/* Meer weten */}
              <Card hover={false}>
                <div className="border-l-4 border-brand-700 pl-4">
                  <h3 className="font-heading text-h5 font-semibold text-brand-900 mb-2">
                    Meer weten?
                  </h3>
                  <p className="text-body-sm text-neutral-600 mb-4">
                    Neem vrijblijvend contact op voor meer informatie over uw specifieke situatie.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
                  >
                    Contact opnemen
                    <svg className="ml-2 w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Card>

              {/* Doelgroep-specifieke oplossing */}
              {config && (
                <Card hover={false}>
                  <div className="border-l-4 border-brand-400 pl-4">
                    <h3 className="font-heading text-h5 font-semibold text-brand-900 mb-2">
                      Woo-oplossing
                    </h3>
                    <p className="text-body-sm text-neutral-600 mb-4">
                      Bekijk de Woo-oplossing die specifiek is afgestemd op uw bestuurslaag.
                    </p>
                    <Link
                      href={config.solutionSlug}
                      className="inline-flex items-center text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
                    >
                      Naar de Woo-oplossing
                      <svg className="ml-2 w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              )}

              {/* Aanpak */}
              <Card hover={false}>
                <div className="border-l-4 border-neutral-300 pl-4">
                  <h3 className="font-heading text-h5 font-semibold text-brand-900 mb-2">
                    Onze aanpak
                  </h3>
                  <p className="text-body-sm text-neutral-600 mb-4">
                    Van verkenning tot werkend systeem in drie overzichtelijke fasen.
                  </p>
                  <Link
                    href="/aanpak"
                    className="inline-flex items-center text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
                  >
                    Bekijk de aanpak
                    <svg className="ml-2 w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </Card>

            </aside>
          </div>
        </Container>
      </section>

      {/* ── 3. Bottom CTA ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="page-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="page-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              In gesprek over uw opgave
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Binnen twee werkdagen een inhoudelijke reactie — geen verkoopdruk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href={config?.solutionSlug ?? '/oplossingen'}
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                {config ? `Bekijk de Woo-oplossing →` : 'Bekijk alle oplossingen →'}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
