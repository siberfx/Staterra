import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// ── Diensten ──────────────────────────────────────────────────

const DIENSTEN = [
  {
    id: 'projectmanagement',
    nummer: '01',
    titel: 'Projectmanagement',
    subtitel: 'Van vraagstuk tot oplevering',
    beschrijving:
      'Een ervaren projectmanager die planning, communicatie en oplevering coordineert — van eerste verkenning tot werkend systeem in productie. Spreekt de taal van zowel IT als bestuurstafel.',
    details: [
      'Coordinatie van alle betrokken partijen (intern en extern)',
      'Planning, voortgangsbewaking en risicobeheer',
      'Communicatie met bestuur, management en werkgroepen',
      'Scopebeheer en kwaliteitsborging',
      'Rapportage en documentatie',
    ],
    passend: 'Bij elk traject: verkenning, MVP en doorontwikkeling',
    icoon: (
      <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    kleur: 'bg-brand-700',
  },
  {
    id: 'woo-consultancy',
    nummer: '02',
    titel: 'Woo-consultancy',
    subtitel: 'Domeinkennis voor Woo-compliance',
    beschrijving:
      'Specialistisch advies over de Wet open overheid: publicatieprocessen, informatiehuishouding, categorieen actieve openbaarmaking en werkprocessen. Van beleid naar praktijk.',
    details: [
      'Analyse van publicatieverplichtingen per categorie actieve openbaarmaking',
      'Inrichting van publicatieprocessen en informatiestromen',
      'Advies over informatiehuishouding en archivering',
      'Werkprocedures voor medewerkers en behandelaars',
      'Voorbereiding op toezicht en verantwoording',
    ],
    passend: 'Verkenning, MVP-inrichting en doorlopend advies',
    icoon: (
      <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    kleur: 'bg-brand-600',
  },
  {
    id: 'architectuur',
    nummer: '03',
    titel: 'Architectuur & integratie',
    subtitel: 'Aansluiting op uw bestaande systemen',
    beschrijving:
      'Ontwerp van de integratielaag tussen OPMS en de bestaande IT-omgeving van uw organisatie. Van DMS en zaaksystemen tot de Generieke Woo-voorziening en andere landelijke voorzieningen.',
    details: [
      'Integratieontwerp met DMS (bijv. OpenText, Corsa, Decos)',
      'Koppeling met zaaksystemen (bijv. OpenZaak, Rx.Mission)',
      'Integratie met e-mailsystemen en werkstromen',
      'Aansluiting op de Generieke Woo-voorziening (GWV) van Logius',
      'Koppeling met andere landelijke voorzieningen (KOOP, e.d.)',
    ],
    passend: 'Verkenning en MVP-fase',
    icoon: (
      <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    kleur: 'bg-brand-900',
  },
  {
    id: 'business-consultancy',
    nummer: '04',
    titel: 'Business consultancy',
    subtitel: 'Organisatieverandering en procesoptimalisatie',
    beschrijving:
      'Begeleiding bij de organisatorische kant van digitale transitie. Een nieuwe Woo-oplossing vraagt meer dan techniek — het vraagt om nieuwe werkwijzen, heldere verantwoordelijkheden en draagvlak.',
    details: [
      'Analyse en herontwerp van werkprocessen',
      'Stakeholder management en communicatieplan',
      'Draagvlakontwikkeling bij management en medewerkers',
      'Organisatorische inrichting rondom de Woo-functie',
      'Monitoring en evaluatie na implementatie',
    ],
    passend: 'MVP-fase en doorontwikkeling',
    icoon: (
      <svg className="w-7 h-7 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    kleur: 'bg-neutral-700',
  },
];

// ── Academy trainingsvormen ────────────────────────────────────

const TRAININGEN = [
  {
    titel: 'Basistraining OPMS',
    duur: '1 dag',
    doelgroep: 'Medewerkers en behandelaars',
    inhoud: 'Gebruik van het platform: publiceren, beheren en verwerken van Woo-verzoeken. Praktijkgericht, direct toepasbaar.',
    vorm: ['Klassikaal', 'On-site'],
  },
  {
    titel: 'Gevorderd beheer',
    duur: '1\u20132 dagen',
    doelgroep: 'Beheerders en functioneel beheerders',
    inhoud: 'Inrichting, configuratie en beheer van OPMS. Categorieen, gebruikersbeheer, rapportages en integratiebeheer.',
    vorm: ['Klassikaal', 'On-site'],
  },
  {
    titel: 'Train-de-trainer',
    duur: '2 dagen',
    doelgroep: 'Interne opleidingsfunctionarissen',
    inhoud: 'Zelfstandig uw organisatie opleiden. Inclusief lesmateriaal, oefeningen en begeleiding bij de eerste interne trainingen.',
    vorm: ['Klassikaal'],
    featured: true,
  },
  {
    titel: 'E-learning',
    duur: 'Zelfstandig',
    doelgroep: 'Alle medewerkers',
    inhoud: 'Online modules op eigen tempo. Geschikt als voorbereiding op klassikale training of als zelfstandig leertraject.',
    vorm: ['E-learning'],
  },
];

// ── Dienst-fase-koppeling ─────────────────────────────────────

const FASE_DIENSTEN = [
  {
    fase: 'Verkenning',
    kleur: 'text-brand-700 bg-brand-100',
    diensten: ['Projectmanagement', 'Woo-consultancy', 'Architectuur & integratie'],
  },
  {
    fase: 'MVP',
    kleur: 'text-white bg-brand-700',
    diensten: ['Projectmanagement', 'Woo-consultancy', 'Architectuur & integratie', 'Training'],
  },
  {
    fase: 'Volledig product',
    kleur: 'text-neutral-700 bg-neutral-100',
    diensten: ['Projectmanagement', 'Business consultancy', 'Woo-consultancy', 'Training'],
  },
];

export default function DienstverleningPage() {
  return (
    <>
      <PageMeta title="Dienstverlening" description="Van implementatie tot beheer. Staterra biedt volledige dienstverlening voor open source Woo-compliance." />
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Dienstverlening"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />
        <Container variant="content" className="relative z-10">
          <div className="max-w-[720px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-400 mb-5">
              Dienstverlening
            </span>
            {/* Hero-kop uit briefing */}
            <h1 className="font-heading text-h1 font-semibold text-white mb-6 leading-[1.05]">
              Niet alleen software,
              <span className="text-brand-400"> maar het team eromheen</span>
            </h1>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed max-w-[600px]">
              Een digitale oplossing slagen of falen hangt niet af van de techniek —
              maar van de mensen die het implementeren, inrichten en verankeren
              in de organisatie. Staterra levert het volledige team.
            </p>

            {/* Vijf diensten als badges */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {['Projectmanagement', 'Woo-consultancy', 'Architectuur', 'Business consultancy', 'Training'].map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-caption font-medium text-white"
                >
                  {d}
                </span>
              ))}
            </div>

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

      {/* ── 2. Intro: waarom team naast software ──────────────── */}
      <section className="bg-white py-14 lg:py-20" aria-label="Introductie dienstverlening">
        <Container variant="text">
          <div className="text-center">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
              Onze visie
            </span>
            <h2 className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]">
              Software is het begin, niet het eindpunt
            </h2>
            <p className="text-body-lg text-neutral-700 leading-relaxed mb-5">
              Veel implementaties mislukken niet door de technologie, maar door
              gebrek aan domeinkennis, onvoldoende procesbegeleiding of een team
              dat na oplevering vertrekt. Staterra blijft.
            </p>
            <p className="text-body text-neutral-700 leading-relaxed">
              Wij leveren niet alleen het platform, maar ook de projectmanager die
              de oplevering coordineert, de Woo-consultant die de inrichting
              begeleidt, de architect die de integraties ontwerpt en de trainer
              die uw medewerkers klaarstoomt. Alles onder één dak, in één
              geïntegreerd team.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 3. Vier kerndiensten ──────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="diensten-heading"
      >
        <Container variant="content">
          <div className="text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Kerndiensten
            </span>
            <h2
              id="diensten-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Vier disciplines, één team
            </h2>
            <p className="text-body text-neutral-700 max-w-[560px] mx-auto">
              Elk traject vraagt om een andere samenstelling. Staterra schakelt
              de juiste expertise in op het juiste moment.
            </p>
          </div>

          <div className="space-y-6">
            {DIENSTEN.map((dienst) => (
              <article
                key={dienst.id}
                id={dienst.id}
                className="rounded-[20px] bg-white border border-neutral-200 overflow-hidden shadow-[0_8px_24px_rgba(22,62,116,0.04)] hover:shadow-[0_12px_32px_rgba(22,62,116,0.08)] transition-shadow duration-[180ms]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[72px_1fr_320px] gap-0">
                  {/* Gekleurde zijbalk */}
                  <div
                    className={`${dienst.kleur} flex items-center justify-center py-6 lg:py-0 lg:rounded-l-[20px]`}
                    aria-hidden="true"
                  >
                    <span className="font-heading font-bold text-white/40 text-h2 rotate-180 [writing-mode:vertical-lr] hidden lg:block">
                      {dienst.nummer}
                    </span>
                    <span className="font-heading font-bold text-white/40 text-h4 lg:hidden">
                      {dienst.nummer}
                    </span>
                  </div>

                  {/* Hoofdinhoud */}
                  <div className="p-7 lg:p-9">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center flex-shrink-0">
                        {dienst.icoon}
                      </div>
                      <div>
                        <h3 className="font-heading text-h3 font-semibold text-neutral-950 leading-tight">
                          {dienst.titel}
                        </h3>
                        <p className="text-body-sm text-neutral-500 mt-0.5">
                          {dienst.subtitel}
                        </p>
                      </div>
                    </div>

                    <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                      {dienst.beschrijving}
                    </p>

                    <div className="flex items-center gap-2 text-caption">
                      <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-neutral-500">
                        <strong className="text-neutral-700 font-medium">Inzetbaar bij:</strong>{' '}
                        {dienst.passend}
                      </span>
                    </div>
                  </div>

                  {/* Detaillijst */}
                  <div className="border-t lg:border-t-0 lg:border-l border-neutral-100 p-7 lg:p-9 bg-neutral-50/50 lg:rounded-r-[20px]">
                    <h4 className="text-body-sm font-semibold text-neutral-950 mb-4">
                      Wat u krijgt
                    </h4>
                    <ul className="space-y-2.5">
                      {dienst.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400"
                          />
                          <span className="text-caption text-neutral-600 leading-relaxed">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Staterra Academy ───────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="academy-heading"
      >
        <Container variant="content">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-[12px] bg-brand-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <span className="font-heading font-semibold text-h4 text-neutral-950">
                  Staterra Academy
                </span>
              </div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                Vijfde dienst
              </span>
              <h2
                id="academy-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
              >
                Training voor iedereen
                <span className="text-brand-700"> die met OPMS werkt</span>
              </h2>
              <p className="text-body text-neutral-700 leading-relaxed mb-4">
                Een werkend systeem heeft pas waarde als de mensen die ermee
                werken het begrijpen en vertrouwen. De Staterra Academy biedt
                trainingen op elk niveau — van de medewerker die dagelijks
                publiceert tot de functioneel beheerder die het systeem inricht.
              </p>
              <p className="text-body text-neutral-700 leading-relaxed">
                Trainingen worden on-site gegeven, klassikaal of via e-learning.
                Het train-de-trainer programma stelt uw eigen organisatie in
                staat om nieuwe medewerkers zelfstandig op te leiden.
              </p>
            </div>

            {/* Leveringsvormen */}
            <div>
              <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-5">
                Leveringsvormen
              </h3>
              <div className="space-y-4">
                {[
                  {
                    vorm: 'Klassikaal',
                    beschrijving: 'Groepstraining op locatie van Staterra. Maximaal 12 deelnemers per groep voor optimale interactie.',
                    icoon: '\uD83D\uDC65',
                  },
                  {
                    vorm: 'On-site',
                    beschrijving: 'Training bij uw organisatie, afgestemd op uw systeem, uw processen en uw medewerkers.',
                    icoon: '\uD83C\uDFE2',
                  },
                  {
                    vorm: 'E-learning',
                    beschrijving: 'Online modules op eigen tempo. Altijd beschikbaar als naslagwerk na een klassikale training.',
                    icoon: '\uD83D\uDCBB',
                  },
                ].map((v) => (
                  <div
                    key={v.vorm}
                    className="rounded-[12px] border border-neutral-200 bg-neutral-50 px-5 py-4 flex items-start gap-4"
                  >
                    <span className="text-h4 flex-shrink-0" role="img" aria-label={v.vorm}>
                      {v.icoon}
                    </span>
                    <div>
                      <span className="block text-body-sm font-semibold text-neutral-950 mb-0.5">
                        {v.vorm}
                      </span>
                      <span className="block text-caption text-neutral-600">{v.beschrijving}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trainingskaarten */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAININGEN.map((t) => (
              <div
                key={t.titel}
                className={[
                  'rounded-[16px] border p-6 flex flex-col',
                  t.featured
                    ? 'border-brand-700 ring-1 ring-brand-700 relative'
                    : 'border-neutral-200 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)]',
                  'transition-all duration-[180ms]',
                ].join(' ')}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-5 px-3 py-1 bg-brand-700 text-white text-caption font-semibold rounded-full">
                    Meest gevraagd
                  </span>
                )}

                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-1">
                  {t.titel}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-caption text-brand-700 font-medium">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.duur}
                  </span>
                </div>

                <p className="text-caption font-semibold text-neutral-500 mb-2">
                  Voor: {t.doelgroep}
                </p>

                <p className="text-caption text-neutral-600 leading-relaxed flex-1 mb-4">
                  {t.inhoud}
                </p>

                {/* Beschikbare vormen */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-neutral-100">
                  {t.vorm.map((v) => (
                    <span
                      key={v}
                      className="text-caption bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button as="link" href="/contact?reden=Demo" variant="primary" size="lg">
              Vraag een trainingsaanbod aan
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 5. Diensten per fase ──────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="fase-diensten-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Inzetbaarheid
            </span>
            <h2
              id="fase-diensten-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              De juiste dienst op het juiste moment
            </h2>
            <p className="text-body text-neutral-700 max-w-[540px] mx-auto">
              Per fase van het traject schakelen we de relevante diensten in.
              U betaalt nooit voor expertise die u op dat moment niet nodig hebt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FASE_DIENSTEN.map((f) => (
              <Card key={f.fase} padding="loose" hover={false}>
                <div className={`inline-flex px-3 py-1.5 rounded-full text-caption font-semibold mb-5 ${f.kleur}`}>
                  {f.fase}
                </div>
                <ul className="space-y-3">
                  {f.diensten.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-body-sm text-neutral-700">
                      <svg className="w-4 h-4 flex-shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/aanpak"
              className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] group"
            >
              Meer over de drie fasen
              <svg className="w-4 h-4 transition-transform duration-[180ms] group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="dv-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="dv-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Welke dienst past bij uw situatie?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              In een vrijblijvend gesprek bespreken we uw vraagstuk en welke
              combinatie van diensten het meest passend is. Binnen twee werkdagen
              een inhoudelijke reactie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href="/over-ons"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Meer over ons team →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
