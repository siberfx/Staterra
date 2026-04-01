import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Aanpak',
  description:
    'Van verkenning tot werkend systeem. Drie fasen, transparante prijzen, geen verplichtingen.',
  alternates: { canonical: '/aanpak' },
};

// ── Data ──────────────────────────────────────────────────────

const FASEN = [
  {
    nummer: '01',
    titel: 'Verkenning',
    ondertitel: 'Van vraagstuk naar scherpe scope',
    duur: '4 – 6 weken',
    prijs: '€ 7.500',
    prijsToelichting: 'Vaste prijs, geen meerwerk',
    beschrijving:
      'We brengen uw vraagstuk, processen, systemen en stakeholders in kaart. Het resultaat is een heldere projectdefinitie met een concrete aanbeveling voor fase 2 — of de conclusie dat een andere route beter past. Na de verkenning beslist u zelf of u verdergaat.',
    deliverables: [
      'Vraagstuk-analyse en knelpunten in kaart',
      'Inventarisatie van systemen, data en processen',
      'Stakeholder-overzicht en besluitvormingsstructuur',
      'Scope-document met aanbeveling en indicatieve begroting',
      'Go/no-go advies zonder verplichtingen',
    ],
    rollen: [
      { naam: 'Projectmanager', beschrijving: 'Coördineert het traject en bewaakt scope en planning' },
      { naam: 'Woo-consultant', beschrijving: 'Analyseert informatieprocessen en publicatieverplichtingen' },
      { naam: 'Architect', beschrijving: 'Beoordeelt bestaande systemen en integratiekansen' },
    ],
    resultaat: 'Scherpe scope + go/no-go advies',
    kleur: 'brand',
  },
  {
    nummer: '02',
    titel: 'MVP',
    ondertitel: 'Werkend systeem in productie',
    duur: '3 maanden',
    prijs: 'Vanaf € 60.000',
    prijsToelichting: 'Vaste prijs na scope-akkoord',
    beschrijving:
      'Binnen 3 maanden leveren we een werkend systeem op dat direct inzetbaar is in de praktijk. Geen lange voortrajecten, geen uitgebreide specificatiedocumenten — maar een MVP waarop u kunt bijsturen op basis van echte gebruikerservaringen. U ervaart de waarde voordat u besluit over verdere doorontwikkeling.',
    deliverables: [
      'Werkend systeem in productieomgeving',
      'Koppeling met kernsystemen (DMS, zaaksysteem)',
      'Beheermodule en publicatieproces ingericht',
      'Gebruikerstraining en documentatie',
      'Technische overdracht en beheerprocedures',
    ],
    rollen: [
      { naam: 'Projectmanager', beschrijving: 'Eindverantwoordelijk voor oplevering, planning en communicatie' },
      { naam: 'Developer (CodeLabs)', beschrijving: 'Full-stack ontwikkeling van het platform en integraties' },
      { naam: 'Woo-consultant', beschrijving: 'Inrichting van categorieën, processen en publicatieregels' },
      { naam: 'Architect', beschrijving: 'Ontwerp van de integratielaag en infrastructuur' },
    ],
    resultaat: 'Werkend systeem in productie',
    kleur: 'brand',
    featured: true,
  },
  {
    nummer: '03',
    titel: 'Volledig product',
    ondertitel: 'Robuust, schaalbaar en toekomstbestendig',
    duur: '6 – 9 maanden',
    prijs: 'Op maat',
    prijsToelichting: 'Op basis van scope en organisatieomvang',
    beschrijving:
      'Na de MVP bouwen we de oplossing door tot een volledig inzetbaar product. Op basis van praktijkervaring en terugkoppeling van gebruikers worden functionaliteit, performance en integraties verder uitgebreid. De organisatie groeit mee met het systeem.',
    deliverables: [
      'Uitgebreide functionaliteit op basis van MVP-ervaringen',
      'Geavanceerde integraties met GWV en landelijke voorzieningen',
      'Schaalbare architectuur voor meerdere organisatie-eenheden',
      'Geavanceerde rapportage- en beheerfunctionaliteit',
      'Doorlopend beheer en doorontwikkelingsafspraken',
    ],
    rollen: [
      { naam: 'Projectmanager', beschrijving: 'Sturing op roadmap, prioritering en stakeholderbelangen' },
      { naam: 'Developer (CodeLabs)', beschrijving: 'Doorontwikkeling, performance-optimalisatie en integraties' },
      { naam: 'Business consultant', beschrijving: 'Organisatieverandering, procesoptimalisatie en training' },
      { naam: 'Woo-consultant', beschrijving: 'Uitbreiding van categorie-inrichting en actieve openbaarmaking' },
    ],
    resultaat: 'Volledig inzetbaar voor de gehele organisatie',
    kleur: 'neutral',
  },
];

const SCHAALMODELLEN = [
  {
    type: 'Klein',
    doelgroep: 'Kleine gemeenten, waterschappen',
    beschrijving: 'Gedeelde OPMS-omgeving via SaaS-model. Laagste totaalkosten, snel operationeel, beheer door Staterra.',
    kenmerken: ['Gedeelde omgeving', 'SaaS-abonnement', '< 3 mnd implementatie'],
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
    tekst: 'U betaalt € 7.500 voor een verkenning en beslist dan pas of u verdergaat. Geen langlopende contracten vooraf.',
  },
  {
    titel: 'Vaste prijzen na scope-akkoord',
    tekst: 'Na de verkenning ontvangt u een offerte met vaste prijs. Geen open-einde budgetten, geen onverwachte meerkosten.',
  },
  {
    titel: 'Eigenaarschap bij de overheid',
    tekst: 'De oplossing is open source en wordt eigendom van uw organisatie. Staterra verzorgt het beheer, maar u behoudt de regie.',
  },
  {
    titel: 'Bewezen aanpak, niet experimenteel',
    tekst: 'OPMS is opgeleverd en in gebruik bij een overheidsorganisatie. Uw implementatie profiteert van die ervaring.',
  },
];

// ── Hulpcomponenten ───────────────────────────────────────────

function RolBadge({ naam, beschrijving }: { naam: string; beschrijving: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </span>
      <div>
        <span className="block text-body-sm font-semibold text-neutral-950">{naam}</span>
        <span className="block text-caption text-neutral-500 mt-0.5">{beschrijving}</span>
      </div>
    </div>
  );
}

// ── Pagina ────────────────────────────────────────────────────

export default function AanpakPage() {
  return (
    <>
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
              Van verkenning naar
              <span className="text-brand-400"> werkend product</span>
            </h1>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Staterra realiseert samen met overheden digitale oplossingen — van
              eerste verkenning tot een werkend product. Met een bewezen aanpak
              leveren we snel resultaat en blijven oplossingen doorontwikkelen.
            </p>

            {/* Overzicht-badges */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { fase: 'Verkenning', duur: '4 – 6 weken', prijs: '€ 7.500' },
                { fase: 'MVP', duur: '3 maanden', prijs: 'v.a. € 60K', accent: true },
                { fase: 'Product', duur: '6 – 9 maanden', prijs: 'Op maat' },
              ].map((b) => (
                <div
                  key={b.fase}
                  className={[
                    'rounded-[12px] border px-4 py-3 text-center',
                    b.accent
                      ? 'bg-white/15 border-white/40'
                      : 'bg-white/8 border-white/20',
                  ].join(' ')}
                >
                  <span className="block text-caption font-semibold text-brand-200 mb-1">{b.fase}</span>
                  <span className="block text-body-sm font-semibold text-white">{b.duur}</span>
                  <span className="block text-caption text-white/90 mt-0.5">{b.prijs}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href="/samen-ontwikkelen"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Meer over samenwerking →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Werkprincipes ──────────────────────────────────── */}
      <section
        className="bg-white py-14 lg:py-20"
        aria-labelledby="principes-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Uitgangspunten
            </span>
            <h2
              id="principes-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              Hoe wij werken
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

      {/* ── 3. Drie fasen ─────────────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="fasen-heading"
      >
        <Container variant="content">
          <div className="text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Het traject
            </span>
            <h2
              id="fasen-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Drie fasen, één richting
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto">
              Elke fase heeft een helder doel, een vaste prijs en een go/no-go moment.
              U behoudt op elk punt de regie over uw investering.
            </p>
          </div>

          <div className="space-y-8">
            {FASEN.map((fase, index) => (
              <article
                key={fase.nummer}
                className={[
                  'rounded-[20px] border overflow-hidden',
                  fase.featured
                    ? 'border-brand-700 shadow-[0_12px_32px_rgba(22,62,116,0.12)]'
                    : 'border-neutral-200 bg-white shadow-[0_8px_24px_rgba(22,62,116,0.04)]',
                ].join(' ')}
              >
                {fase.featured && (
                  <div className="bg-brand-700 text-white text-center py-2.5 px-4">
                    <span className="text-caption font-semibold tracking-wide">
                      Snelste route naar Woo-compliance — werkend systeem in 3 maanden
                    </span>
                  </div>
                )}

                <div className="bg-white p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-8 lg:gap-12">

                    {/* Linker kolom: fase-info */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={[
                            'w-14 h-14 rounded-full flex items-center justify-center font-heading font-semibold text-h4 flex-shrink-0',
                            fase.featured
                              ? 'bg-brand-700 text-white'
                              : 'bg-brand-100 text-brand-700',
                          ].join(' ')}
                          aria-hidden="true"
                        >
                          {fase.nummer}
                        </div>
                        <div>
                          <h3 className="font-heading text-h3 font-semibold text-neutral-950 leading-tight">
                            {fase.titel}
                          </h3>
                          <p className="text-body-sm text-neutral-500 mt-0.5">{fase.ondertitel}</p>
                        </div>
                      </div>

                      {/* Doorlooptijd en prijs */}
                      <div className="space-y-3 mt-6">
                        <div className="flex items-center gap-2.5">
                          <span className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-brand-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <div>
                            <span className="block text-caption text-neutral-500">Doorlooptijd</span>
                            <span className="block text-body-sm font-semibold text-neutral-950">{fase.duur}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-brand-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <div>
                            <span className="block text-caption text-neutral-500">Investering</span>
                            <span className="block text-body-sm font-semibold text-neutral-950">{fase.prijs}</span>
                            <span className="block text-caption text-neutral-400">{fase.prijsToelichting}</span>
                          </div>
                        </div>

                        {/* Resultaat-badge */}
                        <div className={[
                          'mt-2 rounded-[10px] px-3.5 py-2.5 text-caption font-medium flex items-center gap-2',
                          fase.featured ? 'bg-brand-700/10 text-brand-700' : 'bg-brand-100 text-brand-700',
                        ].join(' ')}>
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {fase.resultaat}
                        </div>
                      </div>
                    </div>

                    {/* Midden: beschrijving + deliverables */}
                    <div>
                      <h4 className="text-body-sm font-semibold text-neutral-950 mb-3">
                        Aanpak
                      </h4>
                      <p className="text-body-sm text-neutral-700 leading-relaxed mb-6">
                        {fase.beschrijving}
                      </p>
                      <h4 className="text-body-sm font-semibold text-neutral-950 mb-3">
                        Wat we opleveren
                      </h4>
                      <ul className="space-y-2.5">
                        {fase.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-400 mt-2"
                            />
                            <span className="text-body-sm text-neutral-700">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Rechter kolom: rollen */}
                    <div>
                      <h4 className="text-body-sm font-semibold text-neutral-950 mb-4">
                        Betrokken rollen
                      </h4>
                      <div className="space-y-4">
                        {fase.rollen.map((r) => (
                          <RolBadge key={r.naam} naam={r.naam} beschrijving={r.beschrijving} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Go/no-go marker */}
                {index < FASEN.length - 1 && (
                  <div className="bg-neutral-50 border-t border-neutral-100 px-8 lg:px-10 py-3.5 flex items-center gap-3">
                    <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-caption text-neutral-600">
                      <strong className="font-semibold text-neutral-800">Go/no-go moment</strong>
                      {' '}— u besluit na deze fase zelf of u verdergaat. Geen verplichting.
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>

          <p className="text-caption text-neutral-500 text-center mt-6">
            * Prijzen zijn indicatief en afhankelijk van scope en organisatieomvang.
            Na de verkenning ontvangt u een offerte met vaste prijs.
          </p>
        </Container>
      </section>

      {/* ── 4. Schaalgrootte ──────────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="schaal-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Schaalgrootte
            </span>
            <h2
              id="schaal-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Van kleine gemeente tot ministerie
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto">
              Dezelfde aanpak en hetzelfde platform, afgestemd op de omvang en
              complexiteit van uw organisatie. Van SaaS voor kleine gemeenten tot
              volledig maatwerk voor ministeries.
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

      {/* ── 5. Rollen & team ──────────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="team-heading"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                Het team
              </span>
              <h2
                id="team-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
              >
                Altijd de juiste expertise op het juiste moment
              </h2>
              <p className="text-body text-neutral-700 leading-relaxed mb-4">
                Per fase schalen we de betrokken rollen op en af. U heeft altijd
                één vaste contactpersoon (de projectmanager) — maar in de
                achtergrond werkt een team van specialisten aan uw oplossing.
              </p>
              <p className="text-body text-neutral-700 leading-relaxed">
                <strong className="text-neutral-950 font-semibold">CodeLabs B.V.</strong> is
                onze vaste technische partner en verzorgt architectuur, development
                en technisch beheer. Staterra beheert het project, de Woo-consultancy
                en de relatie met uw organisatie.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  rol: 'Projectmanager',
                  beschrijving: 'Eindverantwoordelijk voor planning, oplevering en communicatie. Spreekt de taal van IT én bestuurstafel.',
                  fasen: ['Verkenning', 'MVP', 'Product'],
                },
                {
                  rol: 'Woo-consultant',
                  beschrijving: 'Advies over publicatieprocessen, categorieën actieve openbaarmaking, informatiehuishouding en werkprocessen.',
                  fasen: ['Verkenning', 'MVP', 'Product'],
                },
                {
                  rol: 'Architect',
                  beschrijving: 'Ontwerp van de integratielaag met DMS, zaaksystemen, e-mail, GWV en landelijke voorzieningen.',
                  fasen: ['Verkenning', 'MVP'],
                },
                {
                  rol: 'Developer (CodeLabs)',
                  beschrijving: 'Full-stack ontwikkeling, integraties en technisch beheer van het platform.',
                  fasen: ['MVP', 'Product'],
                },
                {
                  rol: 'Business consultant',
                  beschrijving: 'Begeleiding bij organisatieverandering, procesoptimalisatie en stakeholder management.',
                  fasen: ['Product'],
                },
                {
                  rol: 'Trainer (Academy)',
                  beschrijving: 'Basistraining, gevorderd beheer en train-de-trainer. Klassikaal, e-learning of on-site.',
                  fasen: ['MVP', 'Product'],
                },
              ].map((r) => (
                <div
                  key={r.rol}
                  className="rounded-[16px] bg-white border border-neutral-200 p-5"
                >
                  <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2">
                    {r.rol}
                  </h3>
                  <p className="text-caption text-neutral-600 leading-relaxed mb-3">
                    {r.beschrijving}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.fasen.map((f) => (
                      <span
                        key={f}
                        className="text-caption bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Veelgestelde vragen ────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="faq-aanpak-heading"
      >
        <Container variant="content">
          <div className="text-center mb-10">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Vragen
            </span>
            <h2
              id="faq-aanpak-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              Praktische vragen
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                vraag: 'Moet ik alle drie de fasen afnemen?',
                antwoord: 'Nee. Na elke fase besluit u zelf of u verdergaat. De verkenning is een op zichzelf staand product — u ontvangt een scope-document met advies, ongeacht het vervolg.',
              },
              {
                vraag: 'Wat als onze organisatie al een systeem heeft?',
                antwoord: 'Dan starten we de verkenning met een analyse van het bestaande systeem. In veel gevallen kan OPMS naast of bovenop bestaande systemen worden uitgerold.',
              },
              {
                vraag: 'Hoe snel kunnen we daadwerkelijk starten?',
                antwoord: 'Na uw akkoord starten we de verkenning doorgaans binnen twee tot vier weken. De planning hangt af van beschikbaarheid van uw eigen organisatie.',
              },
              {
                vraag: 'Is er een aanbestedingsverplichting?',
                antwoord: 'Voor de verkenning (€ 7.500) geldt geen aanbestedingsdrempel. Voor de MVP en het volledige product adviseren wij in de verkenning welke contractvorm het beste past bij uw situatie en drempelwaarden.',
              },
              {
                vraag: 'Wat gebeurt er na oplevering?',
                antwoord: 'Staterra biedt doorlopend beheer en doorontwikkeling. De organisatie groeit mee met het systeem. U kunt ook kiezen voor een overdrachtmodel waarbij u volledig zelf beheert.',
              },
              {
                vraag: 'Werken jullie met vaste of uurprijzen?',
                antwoord: 'Na de verkenning werken we met vaste projectprijzen. Geen open-einde budgetten of nacalculatie — u weet vooraf wat u betaalt.',
              },
            ].map((faq) => (
              <div
                key={faq.vraag}
                className="rounded-[16px] border border-neutral-200 p-6 hover:border-brand-300 transition-colors duration-[180ms]"
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

      {/* ── 7. CTA ────────────────────────────────────────────── */}
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
              Start met een verkenning
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Binnen 4 tot 6 weken weet u exact wat de beste aanpak is voor uw
              organisatie — en beslist u zelf of u verdergaat. Geen verplichtingen,
              geen verkoopdruk.
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
