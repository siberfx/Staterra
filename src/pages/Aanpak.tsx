import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// ── Data per oplossing ───────────────────────────────────────

type Oplossing = 'woo' | 'samen' | 'opensource';

const OPLOSSINGEN: {
  id: Oplossing;
  titel: string;
  subtitel: string;
  link: string;
  doorlooptijd: string;
  doorlooptijdSub?: string;
  badgeTitel: string;
  investering: string;
  investeringSub?: string;
  samenvatting: string;
  fasen: { titel: string; duur: string; beschrijving: string; deliverables: string[] }[];
}[] = [
  {
    id: 'woo',
    titel: 'Woo-oplossing implementeren',
    badgeTitel: 'Woo-oplossing',
    subtitel: 'OPMS — het bewezen platform voor Woo-compliance',
    link: '/woo-oplossing',
    doorlooptijd: '2 – 4 maanden',
    doorlooptijdSub: '(SaaS direct beschikbaar)',
    investering: 'Vanaf € 40.000',
    investeringSub: '(SaaS vanaf € 800/mnd)',
    samenvatting:
      'Implementatie van het bestaande OPMS-platform. Bewezen, snel inzetbaar en schaalbaar. De meest gekozen route voor organisaties die op korte termijn aan de Woo moeten voldoen.',
    fasen: [
      {
        titel: 'Verkenning & inrichting',
        duur: '4 – 6 weken',
        beschrijving:
          'We analyseren uw processen, systemen en publicatieverplichtingen. Op basis daarvan bepalen we welk schaalmodel (SaaS, eigen omgeving of maatwerk) het beste past.',
        deliverables: [
          'Inventarisatie huidige systemen en informatiestromen',
          'Advies over schaalmodel (SaaS / eigen omgeving / maatwerk)',
          'Inrichtingsplan: categorieën, processen, rollen',
          'Integratieoverzicht (DMS, zaaksysteem, e-mail)',
          'Offerte met vaste prijs voor implementatie',
        ],
      },
      {
        titel: 'Implementatie & koppeling',
        duur: '2 – 4 maanden',
        beschrijving:
          'OPMS wordt uitgerold in uw omgeving, gekoppeld met bestaande systemen en ingericht volgens het verkenningsrapport. Uw team wordt getraind en het systeem gaat live.',
        deliverables: [
          'Werkend OPMS in productieomgeving',
          'Koppelingen met DMS, zaaksysteem en overige bronnen',
          'Ingerichte categorieën en publicatieprocessen',
          'Gebruikerstraining en beheerdocumentatie',
          'Go-live begeleiding en nazorg',
        ],
      },
      {
        titel: 'Beheer & doorontwikkeling',
        duur: 'Doorlopend',
        beschrijving:
          'Na go-live verzorgt Staterra het technisch en functioneel beheer. Updates, beveiligingspatches en nieuwe OPMS-functionaliteit worden automatisch doorgevoerd.',
        deliverables: [
          'Technisch en functioneel beheer',
          'Automatische updates en beveiligingspatches',
          'Helpdesk voor gebruikers en beheerders',
          'Kwartaalrapportage over gebruik en compliance',
          'Toegang tot nieuwe OPMS-functionaliteit',
        ],
      },
    ],
  },
  {
    id: 'samen',
    titel: 'Samen nieuwe oplossingen ontwikkelen',
    badgeTitel: 'Samen ontwikkelen',
    subtitel: 'Op maat gebouwde digitale oplossingen voor de overheid',
    link: '/samen-ontwikkelen',
    doorlooptijd: '6 – 12 maanden',
    investering: 'Op maat',
    samenvatting:
      'Voor vraagstukken waarvoor geen standaard oplossing bestaat. Samen bouwen we een nieuw digitaal product — van eerste verkenning tot werkend systeem in productie.',
    fasen: [
      {
        titel: 'Verkenning',
        duur: '4 – 6 weken · € 7.500 vast',
        beschrijving:
          'We brengen uw vraagstuk, processen, systemen en stakeholders in kaart. U ontvangt een scope-document met advies en beslist zelf of u verdergaat.',
        deliverables: [
          'Vraagstuk-analyse en knelpunten in kaart',
          'Inventarisatie van systemen, data en processen',
          'Scope-document met aanbeveling en begroting',
          'Go/no-go advies zonder verplichtingen',
        ],
      },
      {
        titel: 'MVP',
        duur: '3 maanden · v.a. € 60.000 vast',
        beschrijving:
          'Binnen 3 maanden een werkend systeem in productie. Geen uitgebreide specificaties — maar een MVP waarop u bijstuurt op basis van echte ervaringen.',
        deliverables: [
          'Werkend systeem in productieomgeving',
          'Koppelingen met kernsystemen',
          'Beheermodule en publicatieproces ingericht',
          'Gebruikerstraining en documentatie',
        ],
      },
      {
        titel: 'Volledig product',
        duur: '6 – 9 maanden · op maat',
        beschrijving:
          'Na de MVP bouwen we door tot een volledig product. Op basis van praktijkervaring worden functionaliteit, performance en integraties uitgebreid.',
        deliverables: [
          'Uitgebreide functionaliteit op basis van MVP-ervaringen',
          'Geavanceerde integraties en rapportage',
          'Schaalbare architectuur',
          'Doorlopend beheer en doorontwikkelingsafspraken',
        ],
      },
    ],
  },
  {
    id: 'opensource',
    titel: 'Open source implementatie',
    badgeTitel: 'Open source oplossingen',
    subtitel: 'OPMS als open source fundament met volledige regie',
    link: '/open-source',
    doorlooptijd: '3 – 9 maanden',
    investering: 'Vanaf € 30.000',
    samenvatting:
      'Adoptie van OPMS als open source basis. Uw organisatie behoudt volledige regie over de code, hosting en doorontwikkeling. Staterra ondersteunt bij implementatie, configuratie en kennisoverdracht.',
    fasen: [
      {
        titel: 'Technische verkenning',
        duur: '2 – 4 weken',
        beschrijving:
          'We beoordelen uw technische infrastructuur en ontwikkelcapaciteit. U ontvangt een implementatieplan met keuzes over hosting, configuratie en eventuele aanpassingen.',
        deliverables: [
          'Technische audit van huidige infrastructuur',
          'Implementatieplan (self-hosted, cloud of hybride)',
          'Overzicht benodigde aanpassingen en configuratie',
          'Kennisoverdrachtsplan voor uw ontwikkelteam',
        ],
      },
      {
        titel: 'Implementatie & overdracht',
        duur: '2 – 6 maanden',
        beschrijving:
          'OPMS wordt gedeployed in uw eigen infrastructuur. We configureren het platform, verzorgen koppelingen en dragen alle kennis over aan uw team.',
        deliverables: [
          'OPMS gedeployed in uw eigen omgeving',
          'Configuratie en basisinrichting afgerond',
          'Koppelingen met bestaande systemen',
          'Kennisoverdracht aan uw ontwikkelteam',
          'Documentatie voor zelfstandig beheer',
        ],
      },
      {
        titel: 'Ondersteuning op afroep',
        duur: 'Naar behoefte',
        beschrijving:
          'Na overdracht beheert uw team het systeem zelfstandig. Staterra blijft beschikbaar voor consultancy, complexe integraties of tijdelijke versterking.',
        deliverables: [
          'Consultancy op afroepbasis',
          'Ondersteuning bij complexe upgrades',
          'Toegang tot OPMS community en releases',
          'Optionele SLA voor productieondersteuning',
        ],
      },
    ],
  },
];

const SCHAALMODELLEN = [
  {
    type: 'Klein',
    doelgroep: 'Kleine gemeenten, waterschappen',
    beschrijving: 'Gedeelde OPMS-omgeving via SaaS-model. Laagste totaalkosten, snel operationeel, beheer door Staterra. Vanaf € 800 per maand.',
    kenmerken: ['Gedeelde omgeving', 'Vanaf € 800/mnd', '< 3 mnd implementatie'],
  },
  {
    type: 'Middelgroot',
    doelgroep: 'Provincies, grotere gemeenten',
    beschrijving: 'Eigen OPMS-installatie met standaard integraties. Hogere configuratievrijheid, eigen databeheer.',
    kenmerken: ['Eigen omgeving', 'Standaard integraties', '3–6 mnd implementatie'],
    featured: true,
  },
  {
    type: 'Groot',
    doelgroep: 'Ministeries, uitvoeringsorganisaties',
    beschrijving: 'Volledig op maat gebouwde oplossing met complexe integraties, volume-verwerking en bestuurlijke rapportage.',
    kenmerken: ['Maatwerk architectuur', 'GWV-koppeling', '6–9+ mnd implementatie'],
  },
];

const PRINCIPES = [
  {
    titel: 'Resultaat eerst, commitment daarna',
    tekst: 'Elke route begint met een verkenning. U beslist pas daarna of u verdergaat. Geen langlopende contracten vooraf.',
  },
  {
    titel: 'Vaste prijzen na scope-akkoord',
    tekst: 'Na de verkenning ontvangt u een offerte met vaste prijs. Geen open-einde budgetten, geen onverwachte meerkosten.',
  },
  {
    titel: 'Eigenaarschap bij de overheid',
    tekst: 'Alle oplossingen zijn open source en worden eigendom van uw organisatie. Staterra verzorgt het beheer, maar u behoudt de regie.',
  },
  {
    titel: 'Bewezen platform, geen experiment',
    tekst: 'OPMS is opgeleverd en in gebruik. Of u het nu implementeert, zelf host of samen doorontwikkelt — u bouwt op een bewezen basis.',
  },
];

// ── Pagina ────────────────────────────────────────────────────

export default function AanpakPage() {
  const [actief, setActief] = useState<Oplossing>('woo');

  const huidige = OPLOSSINGEN.find((o) => o.id === actief)!;

  return (
    <>
      <PageMeta title="Aanpak" description="Van verkenning tot implementatie. Ontdek hoe Staterra in 3 maanden een werkend systeem oplevert." />
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Introductie aanpak"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />
        <Container variant="content" className="relative z-10">
          <div className="max-w-[720px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-400 mb-5">
              Aanpak
            </span>
            <h1 className="font-heading text-h1 font-semibold text-white mb-5 leading-[1.05]">
              Drie oplossingen,
              <span className="text-brand-400"> één heldere aanpak</span>
            </h1>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Staterra biedt drie routes naar digitale oplossingen voor de overheid.
              Elke route heeft een eigen aanpak, maar dezelfde werkprincipes:
              transparant, gefaseerd en met volledige regie bij uw organisatie.
            </p>

            {/* Drie routes als badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {OPLOSSINGEN.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setActief(o.id)}
                  className={[
                    'rounded-[12px] border px-4 py-3 text-left transition-all duration-[180ms] cursor-pointer',
                    actief === o.id
                      ? 'bg-white/15 border-white/60 ring-1 ring-white/30'
                      : 'bg-white/5 border-white/20 hover:bg-white/10',
                  ].join(' ')}
                >
                  <span className="block text-caption font-semibold text-white mb-0.5">{o.badgeTitel}</span>
                  <span className="block text-caption text-brand-200/80">{o.doorlooptijd}</span>
                  {o.doorlooptijdSub && (
                    <span className="block text-caption text-brand-200/60 mt-0.5">{o.doorlooptijdSub}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href={huidige.link}
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Meer over {huidige.badgeTitel.toLowerCase()} →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Werkprincipes ──────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20" aria-labelledby="principes-heading">
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Uitgangspunten
            </span>
            <h2 id="principes-heading" className="font-heading text-h2 font-semibold text-neutral-950">
              Hoe wij werken — bij elke oplossing
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPES.map((p, i) => (
              <div
                key={p.titel}
                className="rounded-[16px] border border-neutral-200 p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full bg-brand-700 text-white text-caption font-semibold flex items-center justify-center mb-4"
                >
                  {i + 1}
                </div>
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2 leading-snug">
                  {p.titel}
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed">{p.tekst}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Aanpak per oplossing (tabs) ────────────────────── */}
      <section className="bg-brand-100 py-16 lg:py-24" aria-labelledby="aanpak-per-oplossing">
        <Container variant="content">
          <div className="text-center mb-10">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              De aanpak
            </span>
            <h2 id="aanpak-per-oplossing" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
              Kies uw route
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto">
              Elke oplossing heeft een eigen traject. Klik op een route om de
              specifieke aanpak, fasen en deliverables te bekijken.
            </p>
          </div>

          {/* Tab-knoppen */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
            {OPLOSSINGEN.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActief(o.id)}
                className={[
                  'px-5 py-3 rounded-[12px] text-body-sm font-semibold transition-all duration-[180ms] cursor-pointer',
                  actief === o.id
                    ? 'bg-brand-700 text-white shadow-[0_4px_16px_rgba(22,62,116,0.25)]'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand-300 hover:text-brand-700',
                ].join(' ')}
              >
                {o.titel}
              </button>
            ))}
          </div>

          {/* Samenvatting van gekozen route */}
          <div className="rounded-[20px] bg-white border border-neutral-200 shadow-[0_8px_24px_rgba(22,62,116,0.06)] p-8 lg:p-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h3 className="font-heading text-h3 font-semibold text-neutral-950 mb-2">
                  {huidige.titel}
                </h3>
                <p className="text-body-sm text-neutral-500 mb-4">{huidige.subtitel}</p>
                <p className="text-body text-neutral-700 leading-relaxed">{huidige.samenvatting}</p>
              </div>
              <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 flex-shrink-0">
                <div className="rounded-[10px] bg-brand-100 px-4 py-3 text-center">
                  <span className="block text-caption text-neutral-500">Doorlooptijd</span>
                  <span className="block text-body-sm font-semibold text-neutral-950">{huidige.doorlooptijd}</span>
                  {huidige.doorlooptijdSub && (
                    <span className="block text-caption text-neutral-400 mt-0.5">{huidige.doorlooptijdSub}</span>
                  )}
                </div>
                <div className="rounded-[10px] bg-brand-100 px-4 py-3 text-center">
                  <span className="block text-caption text-neutral-500">Investering</span>
                  <span className="block text-body-sm font-semibold text-neutral-950">{huidige.investering}</span>
                  {huidige.investeringSub && (
                    <span className="block text-caption text-neutral-400 mt-0.5">{huidige.investeringSub}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fasen van gekozen route */}
          <div className="space-y-6">
            {huidige.fasen.map((fase, i) => (
              <article
                key={fase.titel}
                className="rounded-[20px] bg-white border border-neutral-200 overflow-hidden"
              >
                <div className="p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
                    {/* Links: fase-info */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-brand-700 text-white font-heading font-semibold text-body-sm flex items-center justify-center flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h4 className="font-heading text-h4 font-semibold text-neutral-950 leading-tight">
                            {fase.titel}
                          </h4>
                          <span className="text-caption text-neutral-500">{fase.duur}</span>
                        </div>
                      </div>
                      <p className="text-body-sm text-neutral-700 leading-relaxed">
                        {fase.beschrijving}
                      </p>
                    </div>

                    {/* Rechts: deliverables */}
                    <div>
                      <h5 className="text-body-sm font-semibold text-neutral-950 mb-3">Wat we opleveren</h5>
                      <ul className="space-y-2">
                        {fase.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 flex-shrink-0 text-brand-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-body-sm text-neutral-700">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Go/no-go markering */}
                {i < huidige.fasen.length - 1 && (
                  <div className="bg-neutral-50 border-t border-neutral-100 px-8 lg:px-10 py-3 flex items-center gap-3">
                    <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-caption text-neutral-600">
                      <strong className="font-semibold text-neutral-800">Go/no-go moment</strong>
                      {' '}— u besluit zelf of u verdergaat.
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Link naar detail-pagina */}
          <div className="text-center mt-8">
            <Link
              to={huidige.link}
              className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
            >
              Meer over {huidige.badgeTitel.toLowerCase()}
              <svg className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── 4. Schaalgrootte (Woo-oplossing) ─────────────────── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="schaal-heading">
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Schaalgrootte
            </span>
            <h2 id="schaal-heading" className="font-heading text-h2 font-semibold text-neutral-950 mb-4">
              Van kleine gemeente tot ministerie
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto">
              Bij de Woo-oplossing stemt Staterra de aanpak af op de omvang en
              complexiteit van uw organisatie. Hetzelfde platform, aangepast aan uw schaal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHAALMODELLEN.map((model) => (
              <Card
                key={model.type}
                padding="loose"
                className={model.featured ? 'border-brand-700 ring-1 ring-brand-700 relative' : ''}
              >
                {model.featured && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-brand-700 text-white text-caption font-semibold rounded-full">
                    Meest voorkomend
                  </span>
                )}
                <div className="mb-5">
                  <span className="inline-block text-caption font-semibold uppercase tracking-wider text-brand-600 mb-1">
                    {model.type}
                  </span>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950">
                    {model.doelgroep}
                  </h3>
                </div>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                  {model.beschrijving}
                </p>
                <ul className="space-y-2">
                  {model.kenmerken.map((k) => (
                    <li key={k} className="flex items-center gap-2 text-caption text-neutral-600">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {k}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Veelgestelde vragen ────────────────────────────── */}
      <section className="bg-brand-100 py-16 lg:py-24" aria-labelledby="faq-aanpak-heading">
        <Container variant="content">
          <div className="text-center mb-10">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Vragen
            </span>
            <h2 id="faq-aanpak-heading" className="font-heading text-h2 font-semibold text-neutral-950">
              Praktische vragen
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                vraag: 'Welke route past bij onze organisatie?',
                antwoord: 'Dat hangt af van uw situatie. De Woo-oplossing is de snelste route als u snel aan de Woo moet voldoen. Samen ontwikkelen past bij unieke vraagstukken. Open source is voor organisaties met eigen ontwikkelcapaciteit. Twijfelt u? Start met een verkenningsgesprek — wij adviseren kosteloos.',
              },
              {
                vraag: 'Moet ik alle fasen afnemen?',
                antwoord: 'Nee. Elke route start met een verkenning. Daarna besluit u zelf of u verdergaat. De verkenning is een op zichzelf staand product met concreet advies.',
              },
              {
                vraag: 'Wat als we al een systeem hebben?',
                antwoord: 'Dan starten we de verkenning met een analyse van het bestaande systeem. In veel gevallen kan OPMS naast of bovenop bestaande systemen worden uitgerold.',
              },
              {
                vraag: 'Hoe snel kunnen we starten?',
                antwoord: 'Na akkoord starten we de verkenning doorgaans binnen twee tot vier weken. De planning hangt af van beschikbaarheid van uw organisatie.',
              },
              {
                vraag: 'Is er een aanbestedingsverplichting?',
                antwoord: 'Voor de verkenning niet. Voor de implementatiefase adviseren wij welke contractvorm het beste past bij uw drempelwaarden.',
              },
              {
                vraag: 'Werken jullie met vaste of uurprijzen?',
                antwoord: 'Na de verkenning werken we met vaste projectprijzen. Geen open-einde budgetten of nacalculatie.',
              },
            ].map((faq) => (
              <div
                key={faq.vraag}
                className="rounded-[16px] border border-neutral-200 bg-white p-6 hover:border-brand-300 transition-colors duration-[180ms]"
              >
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2 leading-snug">
                  {faq.vraag}
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed">{faq.antwoord}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="aanpak-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="aanpak-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Welke route past bij u?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              In een vrijblijvend verkenningsgesprek bespreken we uw situatie en
              adviseren we welke aanpak het beste past. Binnen twee werkdagen een
              inhoudelijke reactie.
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
                Bekijk alle oplossingen →
              </Button>
            </div>
            <p className="mt-8 text-caption text-brand-200/70">
              Geen verkoopdruk. Binnen twee werkdagen een inhoudelijke reactie.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
