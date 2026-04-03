import { useState, useEffect } from 'react';
import { getSolution } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// ── Aanpakfasen ───────────────────────────────────────────────

const FASEN = [
  {
    nummer: '01',
    titel: 'Verkenning',
    duur: '4 – 6 weken',
    prijs: '',
    beschrijving:
      'We brengen uw vraagstuk scherp in kaart: processen, systemen, stakeholders en scope. U beslist daarna of en hoe u verdergaat — zonder verplichting.',
    rollen: ['Projectmanager', 'Woo-consultant', 'Architect'],
    resultaat: 'Helder afgebakende scope en aanpak',
  },
  {
    nummer: '02',
    titel: 'MVP',
    duur: '3 maanden',
    prijs: '',
    beschrijving:
      'Binnen 3 maanden een werkend systeem in productie. Direct inzetbaar, direct waarde. Geen uitgebreide voortrajecten.',
    rollen: ['Projectmanager', 'Developer', 'Woo-consultant'],
    resultaat: 'Werkend systeem in productie',
    featured: true,
  },
  {
    nummer: '03',
    titel: 'Volledig product',
    duur: '6 – 9 maanden',
    prijs: 'Op maat',
    beschrijving:
      'Van MVP naar robuust, schaalbaar product. Doorontwikkeling op basis van praktijkervaring en groeiende gebruikersgroep.',
    rollen: ['Projectmanager', 'Developer', 'Business consultant'],
    resultaat: 'Inzetbaar voor de gehele organisatie',
  },
];

// ── Samenwerkingsvoordelen ────────────────────────────────────

const VOORDELEN = [
  {
    titel: 'Geen langdurig aanbestedingstraject',
    tekst:
      'U ervaart de waarde van het platform voordat u besluit over een structurele samenwerking. Starten met een verkenning duurt 4 tot 6 weken.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titel: 'Eigenaarschap bij uw organisatie',
    tekst:
      'De oplossingen zijn open source en worden juridisch eigendom van de overheid. Staterra verzorgt beheer en doorontwikkeling — maar u bestuurt.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titel: 'Schaalbaar van gemeente tot ministerie',
    tekst:
      'Dezelfde aanpak werkt voor een gemeente van 20.000 inwoners én voor een ministerie. We passen scope en doorlooptijd aan op uw organisatieomvang.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
];

// ── Samenwerkingsmodel ────────────────────────────────────────

const ROLLEN = [
  {
    partij: 'Uw organisatie',
    kleur: 'bg-brand-100 border-brand-300',
    labelKleur: 'text-brand-700',
    taken: [
      'Inhoudelijk opdrachtgever',
      'Domeinkennis en procesverantwoordelijkheid',
      'Eigenaarschap van de oplossing',
      'Stuurgroep en besluitvorming',
    ],
  },
  {
    partij: 'Staterra',
    kleur: 'bg-brand-700 border-brand-700',
    labelKleur: 'text-white',
    taken: [
      'Projectmanagement en coördinatie',
      'Architectuur en technische realisatie',
      'Woo-consultancy en implementatie',
      'Beheer en doorontwikkeling na oplevering',
    ],
    wit: true,
  },
];

export default function SamenOntwikkelenPage() {
  const [solution, setSolution] = useState<any>(null);

  useEffect(() => {
    getSolution('samen-ontwikkelen').then((data) => {
      if (data) setSolution(data);
    });
  }, []);

  return (
    <>
      <PageMeta
        title="Samen ontwikkelen"
        description="Samen met overheden ontwikkelen we digitale oplossingen — van eerste verkenning tot een werkend product."
        schemas={[{ '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Co-creatie digitale oplossingen', provider: { '@type': 'Organization', name: 'Staterra' }, areaServed: 'NL', name: 'Samen ontwikkelen' }]}
      />
      {/* ── 1. Hero ─────────────────────────────────────────── */}
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
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-200 mb-5">
                Samen ontwikkelen
              </span>
              <h1 className="font-heading text-h1 font-semibold text-white mb-5 leading-[1.05]">
                Uw digitale opgave wacht niet op
                <span className="text-brand-400"> uw IT-afdeling</span>
              </h1>
              <p className="text-body-lg text-brand-200 mb-8 leading-relaxed">
                {solution?.subtitle ??
                  'Samen met overheden ontwikkelen we digitale oplossingen — van eerste verkenning tot een werkend product.'}
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

            <div className="hidden lg:block">
              <div className="rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.30)]">
                <img
                  src="/images/samen-ontwikkelen-hero-2.png"
                  alt="Twee professionals overleggen over een digitale oplossing"
                  width={1024}
                  height={682}
                  fetchPriority="high"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Omgekeerd verkoopmodel ────────────────────────── */}
      <section className="bg-white py-14 lg:py-20" aria-labelledby="model-heading">
        <Container variant="content">
          {/* Intro-citaat */}
          <div className="max-w-[760px] mx-auto text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
              Onze aanpak
            </span>
            <h2
              id="model-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
            >
              U ervaart de waarde voordat u beslist
            </h2>
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              Geen langlopende contracten vooraf, geen uitgebreide pitprocedures.{' '}
              <strong className="text-neutral-950 font-semibold">
                U ervaart de waarde van het platform voordat u besluit over een
                structurele samenwerking.
              </strong>{' '}
              Dat is ons omgekeerde verkoopmodel: resultaat eerst, commitment daarna.
            </p>
          </div>

          {/* Drie voordelen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOORDELEN.map((v) => (
              <div
                key={v.titel}
                className="rounded-[16px] border border-neutral-200 p-7 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div className="w-11 h-11 rounded-[10px] bg-brand-100 flex items-center justify-center mb-5">
                  {v.icoon}
                </div>
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-3">
                  {v.titel}
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed">
                  {v.tekst}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Wat we realiseren (CMS-inhoud) ───────────────── */}
      {solution && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="realiseren-heading"
        >
          <Container variant="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
                  Wat wij realiseren
                </span>
                <h2
                  id="realiseren-heading"
                  className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]"
                >
                  {solution.title}
                </h2>
                <div
                  className="text-body-sm text-neutral-700 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: solution.long_body }}
                />
              </div>

              {solution.list_items?.length > 0 && (
                <Card padding="loose" hover={false}>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-6">
                    Wat u krijgt
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {solution.list_items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-body-sm text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-neutral-200 pt-6">
                    <Button as="link" href="/contact" variant="primary" className="w-full justify-center">
                      Bespreek uw vraagstuk
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── 4. Aanpak in 3 fasen ─────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="fasen-heading"
      >
        <Container variant="content">
          <div className="text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Tijdlijn
            </span>
            <h2
              id="fasen-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Van verkenning naar werkend product
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto">
              Drie fasen met heldere doorlooptijden en indicatieprijzen. Na elke
              fase beslist u zelf of u verdergaat.
            </p>
          </div>

          {/* Stappenlijn */}
          <div className="relative">
            {/* Verbindingslijn (desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[52px] left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-0.5 bg-neutral-200"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {FASEN.map((fase) => (
                <div
                  key={fase.nummer}
                  className={[
                    'relative flex flex-col rounded-[20px] border p-8',
                    fase.featured
                      ? 'border-brand-700 shadow-[0_12px_32px_rgba(22,62,116,0.10)]'
                      : 'border-neutral-200',
                  ].join(' ')}
                >
                  {fase.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-700 text-white text-caption font-semibold rounded-full whitespace-nowrap">
                      Snelste route
                    </span>
                  )}

                  {/* Nummer */}
                  <div
                    className={[
                      'w-14 h-14 rounded-full flex items-center justify-center mb-6 font-heading font-semibold text-h5',
                      fase.featured
                        ? 'bg-brand-700 text-white'
                        : 'bg-brand-100 text-brand-700',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {fase.nummer}
                  </div>

                  <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-1">
                    {fase.titel}
                  </h3>

                  {/* Doorlooptijd + prijs */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-caption font-medium text-brand-700">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {fase.duur}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-caption font-medium text-neutral-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {fase.prijs}
                    </span>
                  </div>

                  <p className="text-body-sm text-neutral-700 leading-relaxed mb-5 flex-1">
                    {fase.beschrijving}
                  </p>

                  {/* Rollen */}
                  <div className="border-t border-neutral-100 pt-4 mt-auto">
                    <p className="text-caption text-neutral-500 mb-2">Betrokken rollen</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fase.rollen.map((rol) => (
                        <span
                          key={rol}
                          className="text-caption bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full"
                        >
                          {rol}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resultaat */}
                  <div
                    className={[
                      'mt-4 rounded-[10px] px-4 py-3 text-caption font-medium flex items-center gap-2',
                      fase.featured ? 'bg-brand-700/10 text-brand-700' : 'bg-brand-100 text-brand-700',
                    ].join(' ')}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {fase.resultaat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-caption text-neutral-500 text-center mt-6">
            * Prijzen zijn indicatief en afhankelijk van scope en organisatieomvang.
            Na de verkenning ontvangt u een vaste offerte.
          </p>
        </Container>
      </section>

      {/* ── 5. Samenwerkingsmodel ─────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="samenwerking-heading"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Tekst */}
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
                Samenwerking
              </span>
              <h2
                id="samenwerking-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
              >
                Staterra is geen leverancier die aflevert en factureert
              </h2>
              <p className="text-body text-neutral-700 leading-relaxed mb-4">
                Wij investeren in een gedeeld platform en werken als
                infrastructuurpartner samen met uw organisatie. Dat betekent:
                gezamenlijke besluitvorming over de roadmap, gedeelde kosten voor
                doorontwikkeling en blijvende regie aan uw kant.
              </p>
              <p className="text-body text-neutral-700 leading-relaxed">
                <strong className="text-neutral-950 font-semibold">
                  CodeLabs B.V.
                </strong>{' '}
                is onze vaste technische partner en verzorgt architectuur,
                development en technisch beheer. Staterra beheert de
                samenwerking, het projectmanagement en de Woo-consultancy.
              </p>
            </div>

            {/* Rollen-kaarten */}
            <div className="space-y-4">
              {ROLLEN.map((r) => (
                <div
                  key={r.partij}
                  className={[
                    'rounded-[16px] border p-6',
                    r.kleur,
                  ].join(' ')}
                >
                  <h3
                    className={[
                      'font-heading text-h5 font-semibold mb-4',
                      r.wit ? 'text-white' : 'text-neutral-950',
                    ].join(' ')}
                  >
                    {r.partij}
                  </h3>
                  <ul className="space-y-2">
                    {r.taken.map((taak) => (
                      <li
                        key={taak}
                        className={[
                          'flex items-start gap-2.5 text-body-sm',
                          r.wit ? 'text-brand-100' : 'text-neutral-700',
                        ].join(' ')}
                      >
                        <span
                          aria-hidden="true"
                          className={[
                            'mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full',
                            r.wit ? 'bg-brand-300' : 'bg-brand-400',
                          ].join(' ')}
                        />
                        {taak}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. FAQ ────────────────────────────────────────────── */}
      {solution?.faq && solution.faq.length > 0 && (
        <section
          className="bg-white py-16 lg:py-24"
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

      {/* ── 7. CTA ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="sd-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="sd-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Klaar om te starten?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Een verkenning duurt 4 tot 6 weken. U beslist daarna zelf of u
              verdergaat. Geen verplichtingen, geen verkoopdruk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <p className="mt-8 text-caption text-brand-200/70">
              Binnen twee werkdagen een inhoudelijke reactie van een Staterra-adviseur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
