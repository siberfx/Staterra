import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSolutions } from '@/services/cms';
import type { Solution, SolutionsListResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Anchors in vaste volgorde
const MAIN_ANCHORS = ['samen-ontwikkelen', 'woo-oplossing', 'open-source'] as const;
const TARGET_ANCHORS = [
  'woo-gemeenten',
  'woo-rijksoverheid',
  'woo-provincies',
  'woo-waterschappen',
] as const;

// Iconen per hoofdoplossing
const SOLUTION_ICONS: Record<string, React.ReactNode> = {
  'samen-ontwikkelen': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  'woo-oplossing': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  'open-source': (
    <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
};

// Labels per doelgroep-oplossing
const TARGET_META: Record<string, { badge: string; count: string; href: string }> = {
  'woo-gemeenten':     { badge: 'Gemeenten',    count: '342 gemeenten',                     href: '/staterra-gemeenten' },
  'woo-rijksoverheid': { badge: 'Rijksoverheid', count: '15 ministeries + ~40 agentschappen', href: '/staterra-rijkspartijen' },
  'woo-provincies':    { badge: 'Provincies',    count: '12 provincies',                     href: '/staterra-provincies' },
  'woo-waterschappen': { badge: 'Waterschappen', count: '21 waterschappen',                  href: '/staterra-waterschappen' },
};

// Lokale fallback-afbeeldingen als het CMS geen werkende URL levert
const FALLBACK_IMAGES: Record<string, string> = {
  'samen-ontwikkelen': '/images/samen-ontwikkelen-hero-2.png',
  'woo-oplossing': '/images/woo-oplossing-hero.png',
  'open-source': '/images/open-source-hero.png',
};

// -- Kaartcomponenten --

function MainSolutionCard({ solution }: { solution: Solution }) {
  const to = `/${solution.anchor}`;
  const icon = SOLUTION_ICONS[solution.anchor];
  const imageSrc = solution.image || FALLBACK_IMAGES[solution.anchor];

  return (
    <article>
      <Card
        padding="none"
        className="flex flex-col h-full overflow-hidden group"
      >
        {/* Afbeelding */}
        {imageSrc && (
          <div className="relative h-52 overflow-hidden">
            <img
              src={imageSrc}
              alt={solution.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const fallback = FALLBACK_IMAGES[solution.anchor];
                if (fallback && e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-8">
          {/* Icoon */}
          {icon && (
            <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5 group-hover:bg-brand-200 transition-colors duration-[180ms]">
              {icon}
            </div>
          )}

          <h2 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
            {solution.title}
          </h2>

          <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
            {solution.subtitle}
          </p>

          <Link
            to={to}
            className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] mt-auto group/link"
            aria-label={`Meer over ${solution.title}`}
          >
            Meer informatie
            <svg
              className="w-4 h-4 transition-transform duration-[180ms] group-hover/link:translate-x-0.5"
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
      </Card>
    </article>
  );
}

function TargetSolutionCard({ solution }: { solution: Solution }) {
  const meta = TARGET_META[solution.anchor];
  const to = meta?.href ?? `/${solution.anchor}`;

  return (
    <article>
      <Link
        to={to}
        className="group flex flex-col h-full rounded-[16px] border border-neutral-200 bg-white p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.08)] transition-all duration-[180ms]"
        aria-label={solution.title}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {solution.image && (
            <div className="relative w-12 h-12 rounded-[10px] overflow-hidden flex-shrink-0">
              <img
                src={solution.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
          )}
          {meta && (
            <span className="text-caption font-semibold text-brand-600 bg-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
              {meta.count}
            </span>
          )}
        </div>

        {/* Tekst */}
        <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2 group-hover:text-brand-700 transition-colors duration-[180ms]">
          {solution.nav_title
            ? `Woo-oplossing voor ${solution.nav_title.toLowerCase()}`
            : solution.title}
        </h3>

        <p className="text-caption text-neutral-600 leading-relaxed flex-1">
          {solution.subtitle}
        </p>

        {/* Pijl */}
        <div className="flex items-center gap-1 mt-4 text-caption font-medium text-brand-700">
          Bekijk oplossing
          <svg
            className="w-3.5 h-3.5 transition-transform duration-[180ms] group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </article>
  );
}

// -- Pagina --

export default function OplossingsoverzichtPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [bannerUrl, setBannerUrl] = useState<string | undefined>();

  useEffect(() => {
    document.title = 'Oplossingen — Digitale oplossingen voor de overheid | Staterra';
  }, []);

  useEffect(() => {
    getSolutions().then((result: SolutionsListResponse | null) => {
      setSolutions(result?.data ?? []);
      setBannerUrl(result?.banner);
    });
  }, []);

  const mainSolutions = MAIN_ANCHORS
    .map((a) => solutions.find((s) => s.anchor === a))
    .filter((s): s is Solution => !!s);

  const targetSolutions = TARGET_ANCHORS
    .map((a) => solutions.find((s) => s.anchor === a))
    .filter((s): s is Solution => !!s);

  return (
    <>
      {/* -- 1. Hero -- */}
      <section
        className="relative overflow-hidden bg-brand-900 py-20 lg:py-28"
        aria-label="Introductie oplossingen"
      >
        {/* Banner-afbeelding als overlay */}
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        )}
        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/40"
        />

        <Container variant="content" className="relative z-10">
          <div className="max-w-[720px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-400 mb-5">
              Oplossingen
            </span>
            <h1 className="font-heading text-h1 font-semibold text-white mb-6 leading-[1.05]">
              Digitale oplossingen voor
              <span className="text-brand-400"> de overheid</span>
            </h1>
            <p className="text-body-lg text-brand-200 mb-8 leading-relaxed max-w-[600px]">
              Van Woo-compliance tot open source platformen en maatwerk
              digitale dienstverlening. Staterra bouwt, implementeert en
              beheert oplossingen die passen bij uw organisatie — zonder
              vendor lock-in, met volledige regie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href="/aanpak"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Bekijk de aanpak →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* -- 2. Drie hoofdoplossingen -- */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="main-solutions-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Onze aanpak
            </span>
            <h2
              id="main-solutions-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Drie routes naar digitale regie
            </h2>
            <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
              Elke organisatie heeft een andere situatie. Kies de aanpak die
              past bij uw vraagstuk, tijdlijn en organisatieomvang.
            </p>
          </div>

          {mainSolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainSolutions.map((s) => (
                <MainSolutionCard key={s.id} solution={s} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[20px] border border-neutral-200 overflow-hidden animate-pulse">
                  <div className="h-52 bg-neutral-100" />
                  <div className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-[10px] bg-neutral-100" />
                    <div className="h-6 bg-neutral-100 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-neutral-100 rounded w-full" />
                      <div className="h-4 bg-neutral-100 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* -- 3. Waarom open source -- */}
      <section className="bg-brand-100 py-14 lg:py-20" aria-label="Waarom open source">
        <Container variant="text">
          <div className="text-center">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
              Onze overtuiging
            </span>
            <h2 className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]">
              Open source als fundament
            </h2>
            <p className="text-body text-neutral-700 leading-relaxed mb-4">
              Al onze oplossingen zijn gebouwd op open source technologie. Het
              <strong className="text-neutral-950 font-semibold">
                {' '}comply-or-explain beleid{' '}
              </strong>
              van BZK schrijft voor dat bestuursorganen eerst bestaande open
              source oplossingen beoordelen voordat zij alternatieven inkopen.
              Dat geldt voor Woo-compliance, maar net zo goed voor
              documentbeheer, publicatieplatformen en digitale dienstverlening.
            </p>
            <p className="text-body text-neutral-700 leading-relaxed mb-6">
              Staterra implementeert en beheert deze oplossingen professioneel
              — van OPMS voor Woo-compliance tot bredere open source
              platformen. Geen vendor lock-in, geen licentiekosten, wel
              eigenaarschap van uw broncode.
            </p>
            <Link
              to="/open-source"
              className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
            >
              Meer over onze open source aanpak
              <svg
                className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* -- 4. Doelgroep-oplossingen -- */}
      {targetSolutions.length > 0 && (
        <section
          className="bg-white py-16 lg:py-24"
          aria-labelledby="target-solutions-heading"
        >
          <Container variant="content">
            <div className="text-center mb-12">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
                Per bestuurslaag
              </span>
              <h2
                id="target-solutions-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
              >
                Oplossingen op maat voor uw organisatietype
              </h2>
              <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
                Elke bestuurslaag heeft eigen processen, systemen en
                schaalgrootte. Staterra levert voor elke doelgroep een
                specifieke invulling — van Woo-compliance tot bredere
                digitale dienstverlening.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {targetSolutions.map((s) => (
                <TargetSolutionCard key={s.id} solution={s} />
              ))}
            </div>

            {/* In gesprek met */}
            <div className="mt-12 rounded-[16px] bg-brand-100 border border-brand-200 px-8 py-6 text-center">
              <p className="text-body-sm text-neutral-700">
                <strong className="text-neutral-950 font-semibold">
                  In gesprek met:
                </strong>{' '}
                Ministerie van Justitie en Veiligheid, drie andere departementen
                en twee overheids ICT-organisaties. Details volgen zodra akkoord is bereikt.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* -- 5. Sluit-CTA -- */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="oplossingen-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="oplossingen-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Welke oplossing past bij uw organisatie?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Bespreek uw vraagstuk in een vrijblijvend verkenningsgesprek.
              Binnen twee werkdagen een inhoudelijke reactie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een gesprek
              </Button>
              <Button
                as="link"
                href="/open-source"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Bekijk onze open source aanpak →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
