import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import type { FaqItem } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import LeadMagnetBanner from '@/components/LeadMagnetBanner';
import { WooTierDiagram } from '@/components/sections/WooTierDiagram';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

// -- Kenmerken (vervangt CMS list_items) --

const OPUB_LINK = (
  <a
    href="https://opub.nl"
    target="_blank"
    rel="noopener noreferrer"
    className="text-brand-700 underline decoration-brand-700/40 hover:decoration-brand-700 hover:text-brand-900 transition-colors"
  >
    opub.nl
  </a>
);

const SOLUTION_FEATURES: ReactNode[] = [
  'Specifiek ontwikkeld voor de Wet open overheid',
  'oPub standaard gekoppeld aan de Generieke Woo-voorziening (GWV)',
  'OPMS open source onder EUPL 1.2 — geen vendor lock-in (oPub als gehoste dienst)',
  <>Doorlevering naar publiek portaal {OPUB_LINK}</>,
];

// -- Abonnementsvormen (twee instapniveaus) --

interface SubscriptionTier {
  title: string;
  subtitle: string;
  price: string;
  priceUnit: string;
  priceAddon: string;
  priceNote: string;
  description: string;
  features: string[];
}

const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    title: 'Opub-tier — Bestuursorgaan',
    subtitle: 'Voor zelfstandige bestuursorganen',
    price: '€500',
    priceUnit: 'per maand',
    priceAddon: '+ €250 per maand per API-koppeling',
    priceNote: 'jaarcontract, gehoste dienst, exclusief btw',
    description:
      'Direct publiceren naar opub.nl, KOOP en andere publicatie-platformen — zonder eigen verwerkingslaag en zonder installatie. oPub is een gehoste dienst; handmatige upload is inclusief, API-koppelingen schalen mee met uw bronsystemen.',
    features: [
      'Gehoste dienst — geen installatie of eigen infrastructuur nodig',
      'Publicatie via Opub naar KOOP, open.minvws.nl en andere platformen',
      'Handmatige upload inclusief (geen extra kosten)',
      'API-koppelingen per bronsysteem: €250 per maand per koppeling',
      'Self-service portaal en aanleverformulier',
      'Geschikt voor enkelvoudige bestuursorganen',
    ],
  },
  {
    title: 'OPMS-tier — Centraal Bestuursorgaan',
    subtitle: 'Voor bestuursorganen met meerdere onderdelen',
    price: '€2.500',
    priceUnit: 'per maand',
    priceAddon: '+ €750 per maand per publicatie-eenheid',
    priceNote: 'jaarcontract, on-site, exclusief btw',
    description:
      'Centrale verwerkingslaag voor organisaties met meerdere onderdelen of publicatie-eenheden. OPMS wordt op uw eigen infrastructuur geïnstalleerd en is open source onder EUPL 1.2 — geen vendor lock-in. Per publicatie-eenheid komen één of meer bronsystemen binnen.',
    features: [
      'On-site installatie op uw eigen infrastructuur',
      'Open source onder EUPL 1.2 — geen vendor lock-in',
      'Centrale regie over meerdere publicatie-eenheden',
      'Per publicatie-eenheid: €750 per maand, met eigen bronnen en koppelingen',
      'Doorlevering via Opub naar KOOP, open.minvws.nl en andere platformen',
      'Hogere SLA, named contact, updates inbegrepen',
    ],
  },
];

// -- FAQ (hardcoded; vervangt CMS solution.faq) --

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Wat is het verschil tussen oPub en OPMS?',
    answer:
      'oPub is het publicatieportaal waarop uw documenten openbaar gemaakt worden en waar burgers, journalisten en advocaten deze kunnen vinden. OPMS is het managementsysteem waarmee u het hele Woo-proces regisseert — intake, beoordeling, metadatering en publicatie. In de Opub-tier publiceert uw bestuursorgaan rechtstreeks via oPub; in de OPMS-tier komt OPMS daarbovenop als centrale verwerkingslaag voor meerdere publicatie-eenheden.',
  },
  {
    question: 'Welke tier past bij mijn organisatie?',
    answer:
      'Heeft u één bestuursorgaan dat zelfstandig publiceert? Dan past de Opub-tier — u koppelt direct vanuit uw bronsystemen of uploadt handmatig. Heeft u een centraal bestuursorgaan met meerdere onderdelen die elk eigen publicaties hebben (zoals een ministerie met agentschappen, of een provincie met meerdere uitvoeringsorganisaties)? Dan biedt de OPMS-tier de centrale regie en schaalt u op publicatie-eenheid.',
  },
  {
    question: 'Wat is een publicatie-eenheid?',
    answer:
      'Binnen de OPMS-tier is een publicatie-eenheid een logisch onderdeel van uw organisatie dat zelfstandig publiceert — bijvoorbeeld een ministerie, een agentschap of een uitvoeringsorganisatie binnen een centraal bestuursorgaan. Elke publicatie-eenheid heeft eigen bronsystemen (handmatig of via API) en publiceert via Opub naar KOOP, open.minvws.nl en andere kanalen. U schaalt OPMS op door eenheden toe te voegen, à €750 per maand per eenheid.',
  },
  {
    question: 'Kan ik tussentijds op- of afschalen?',
    answer:
      'Ja. Binnen één contract kunt u op elk moment opschalen naar een hogere tier of extra publicatie-eenheden / API-koppelingen toevoegen; het meertarief wordt pro rata berekend over de resterende maanden. Afschalen kan per de eerstvolgende kalendermaand, met pro rata verrekening van reeds betaalde maanden.',
  },
  {
    question: 'Wat kost de implementatie?',
    answer:
      'De Woo-oplossing kent twee instapniveaus. Opub-tier (Bestuursorgaan) start vanaf €500 per maand voor zelfstandige bestuursorganen, met €250 per maand per API-koppeling — handmatige upload is inclusief. OPMS-tier (Centraal Bestuursorgaan) start vanaf €2.500 per maand on-site, met €750 per maand per publicatie-eenheid — voor organisaties met meerdere onderdelen. Implementatie, training en projectmanagement worden afzonderlijk geoffreerd op basis van de omvang van uw organisatie. Tarieven zijn exclusief btw, jaarcontract.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

// -- Doelgroepen per bestuurslaag --

const TARGET_GROUPS = [
  {
    label: 'Rijksoverheid',
    count: '15 ministeries + ~40 agentschappen',
    items: [
      'Ministeries met grote hoeveelheden te publiceren documenten',
      'Uitvoeringsorganisaties en agentschappen',
      'Koppeling met GWV en centrale voorzieningen',
      'Ervaring met Woo-verzoeken op hoog volume',
    ],
  },
  {
    label: 'Provincies',
    count: '12 provincies',
    items: [
      'Structurele actieve openbaarmaking',
      'Integratie met provinciale DMS-systemen',
      'Passief publicatieproces voor ingekomen verzoeken',
    ],
  },
  {
    label: 'Gemeenten',
    count: '342 gemeenten',
    items: [
      'Schaalbaar voor elke gemeenteomvang',
      'Gedeelde omgeving beschikbaar via VNG-samenwerkingsverband',
      'Koppeling met zaaksystemen (bijv. OpenZaak)',
    ],
  },
  {
    label: 'Waterschappen',
    count: '21 waterschappen',
    items: [
      'Sectorspecifieke categorieën actieve openbaarmaking',
      'Integratie met waterschapssystemen',
      'Gezamenlijke aanpak via Unie van Waterschappen',
    ],
  },
  {
    label: "ZBO's en agentschappen",
    count: '~100 zelfstandige bestuursorganen',
    items: [
      'Passende oplossing voor kleinere organisaties',
      'Gedeelde omgeving voor kostenefficiëntie',
      'Flexibele implementatie op maat',
    ],
  },
];

export default function WooOplossing() {
  return (
    <>
      <PageMeta
        title="Woo-oplossing: oPub en OPMS"
        description="Staterra levert oPub en OPMS: het bewezen publicatieportaal en managementsysteem voor bestuursorganen onder de Wet open overheid."
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Woo-compliance oplossing',
            provider: { '@type': 'Organization', name: 'Staterra' },
            areaServed: 'NL',
            name: 'oPub en OPMS — Woo-oplossing',
          },
          FAQ_SCHEMA,
        ]}
      />
      {/* -- 1. Hero -- */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Introductie"
        style={{ background: 'var(--gradient-brand)' }}
      >
        {/* Decoratieve achtergrondvorm */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Label */}
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-200 mb-5">
                Woo-oplossing — oPub en OPMS
              </span>

              {/* Krachtige openingszin uit briefing */}
              <h1 className="font-heading text-h1 font-semibold text-white mb-4 leading-[1.05]">
                43 verzoeken.
                <br />
                Geen systeem.
                <br className="hidden sm:block" />
                <span className="text-brand-400"> Wel een deadline.</span>
              </h1>

              <p className="text-body-lg text-brand-200 mb-8 leading-relaxed">
                oPub en OPMS: de bewezen Woo-oplossing van onze partner
                CodeLabs, door Staterra gereed gemaakt voor uw bestuursorgaan.
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

            {/* Hero-afbeelding */}
            <div className="hidden lg:block relative">
              <div className="rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.30)]">
                <img
                  src="/images/woo-oplossing-hero.png"
                  alt="Medewerker werkt met het OPMS-dashboard"
                  width={1024}
                  height={682}
                  fetchPriority="high"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -- 1b. Architectuur: oPub + OPMS -- */}
      <section className="bg-white py-16 lg:py-20" aria-labelledby="architectuur-heading">
        <Container variant="content">
          <div className="max-w-[820px] mx-auto text-center mb-10">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              De architectuur
            </span>
            <h2
              id="architectuur-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.15]"
            >
              Twee samenhangende componenten
            </h2>
            <p className="text-body text-neutral-700 leading-relaxed">
              De Woo-oplossing bestaat uit twee samenhangende componenten,
              ontwikkeld door onze partner{' '}
              <strong className="font-semibold text-neutral-900">CodeLabs B.V.</strong>{' '}
              oPub is een gehoste dienst — u hoeft niets te installeren. OPMS
              draait on-site op uw eigen infrastructuur en is beschikbaar onder
              de open source licentie{' '}
              <strong className="font-semibold text-neutral-900">EUPL 1.2</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[20px] border border-neutral-200 bg-brand-50 p-8">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-2">
                Publicatieportaal — gehoste dienst
              </span>
              <h3 className="font-heading text-h3 font-semibold text-neutral-950 mb-3">
                oPub
              </h3>
              <p className="text-body-sm text-neutral-700 leading-relaxed">
                Het federatieve publicatieportaal waarop bestuursorganen hun
                documenten openbaar maken. oPub is een gehoste dienst — er is
                geen installatie nodig. Standaard gekoppeld aan de Generieke
                Woo-voorziening (GWV) en aan het publieke portaal {OPUB_LINK}.
              </p>
            </div>

            <div className="rounded-[20px] border border-neutral-200 bg-brand-50 p-8">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-2">
                Managementsysteem — on-site, open source
              </span>
              <h3 className="font-heading text-h3 font-semibold text-neutral-950 mb-3">
                OPMS
              </h3>
              <p className="text-body-sm text-neutral-700 leading-relaxed">
                Het managementsysteem dat het volledige Woo-proces ondersteunt,
                van intake en beoordeling tot publicatie. OPMS wordt op uw eigen
                infrastructuur geïnstalleerd, is open source onder EUPL 1.2 en
                koppelt met bestaande zaak- en documentsystemen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* -- 1c. Architectuur-diagram: bron → tier → publicatie-platform → kanalen -- */}
      <section className="bg-brand-50 py-16 lg:py-20" aria-labelledby="diagram-heading">
        <Container variant="content">
          <div className="max-w-[820px] mx-auto text-center mb-10">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Hoe het werkt
            </span>
            <h2
              id="diagram-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.15]"
            >
              Twee tiers, één publicatie-platform
            </h2>
            <p className="text-body text-neutral-700 leading-relaxed">
              Beide instapniveaus leveren publicaties via Opub door naar
              KOOP, open.minvws.nl en andere publicatie-platformen. Het
              verschil zit in de verwerkingslaag: de OPMS-tier biedt
              centrale regie over meerdere publicatie-eenheden, de
              Opub-tier publiceert rechtstreeks vanuit één bestuursorgaan.
            </p>
          </div>

          <div className="bg-white rounded-[20px] border border-neutral-200 p-4 sm:p-8 overflow-x-auto">
            <WooTierDiagram />
          </div>
        </Container>
      </section>

      {/* -- 2. De omvang -- */}
      <section className="bg-brand-50 py-16 lg:py-20" aria-labelledby="omvang-heading">
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              De omvang
            </span>
            <h2
              id="omvang-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              {BESTUURSORGANEN_STATS.totaal} bestuursorganen moeten voldoen aan de Woo
            </h2>
            <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
              Van ministeries tot gemeenten — elk bestuursorgaan is zelfstandig
              verantwoordelijk voor actieve en passieve openbaarmaking.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { value: BESTUURSORGANEN_STATS.rijksbestuursorganen, label: 'Rijksbestuursorganen', detail: `${BESTUURSORGANEN_STATS.kerndepartementen} departementen` },
              { value: BESTUURSORGANEN_STATS.gemeenten, label: 'Gemeenten', detail: 'Alle gemeenten' },
              { value: BESTUURSORGANEN_STATS.waterschappen, label: 'Waterschappen', detail: 'Alle waterschappen' },
              { value: BESTUURSORGANEN_STATS.provincies, label: 'Provincies', detail: 'Alle provincies' },
            ] as const).map((cat) => (
              <div key={cat.label} className="bg-white rounded-[16px] p-6 text-center shadow-sm">
                <span
                  className="block font-heading font-semibold text-brand-700 mb-1"
                  style={{ fontSize: '2.25rem', lineHeight: 1 }}
                >
                  {cat.value}
                </span>
                <span className="block text-body-sm font-semibold text-neutral-800 mt-2">
                  {cat.label}
                </span>
                <span className="block text-caption text-neutral-500 mt-1">
                  {cat.detail}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-caption text-neutral-400 mt-8">
            Bron: gevalideerd overzicht op basis van Rijksoverheid.nl, april 2025
          </p>
        </Container>
      </section>

      {/* -- 3. Wat biedt de oplossing -- */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="features-heading"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
                De oplossing
              </span>
              <h2
                id="features-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]"
              >
                Een bewezen Woo-platform, direct inzetbaar
              </h2>

              <div className="text-body-sm text-neutral-700 leading-relaxed space-y-4">
                <p>
                  Staterra levert en begeleidt de Woo-oplossing bij
                  bestuursorganen: van eerste verkenning en contract tot
                  implementatie, training en eerstelijnssupport. De software
                  zelf — oPub en OPMS — wordt gebouwd en technisch beheerd
                  door onze partner CodeLabs B.V.
                </p>
                <p>
                  Omdat oPub en OPMS open source zijn onder EUPL 1.2, behoudt
                  u volledige regie. U kiest waar het draait, welke
                  koppelingen u legt en in welk tempo u opschaalt. Geen
                  vendor lock-in, geen licentiekosten per gebruiker.
                </p>
              </div>
            </div>

            {/* Kenmerkenlijst */}
            <div>
              <Card padding="loose" hover={false}>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-6">
                  Kenmerken
                </h3>
                <ul className="space-y-4">
                  {SOLUTION_FEATURES.map((item, i) => (
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
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-body-sm text-neutral-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <p className="text-caption text-neutral-500 mb-4">
                    oPub en OPMS zijn opgenomen in het open source ecosysteem
                    van BZK. Het comply-or-explain beleid maakt de oplossing
                    de logische eerste keuze voor Woo-compliance.
                  </p>
                  <Button as="link" href="/contact" variant="primary" className="w-full justify-center">
                    Vraag een demo aan
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* -- 4. Abonnementsvormen -- */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="tiers-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Abonnementsvormen
            </span>
            <h2
              id="tiers-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Twee instapniveaus, één Woo-platform
            </h2>
            <p className="text-body text-neutral-700 max-w-[720px] mx-auto">
              De Woo-oplossing kent twee instapniveaus. Welk model bij u past
              hangt af van uw organisatiestructuur: één bestuursorgaan met
              enkelvoudige publicatie, of een centraal bestuursorgaan met
              meerdere onderdelen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <Card
                key={tier.title}
                padding="loose"
                className="flex flex-col"
              >
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-1">
                  {tier.title}
                </h3>
                <p className="text-caption text-neutral-500 mb-5">
                  {tier.subtitle}
                </p>
                <div className="mb-5 pb-5 border-b border-neutral-200">
                  <p className="font-heading text-h3 font-semibold text-brand-700 leading-none mb-1">
                    {tier.price}
                    <span className="text-body-sm font-normal text-neutral-500 ml-1.5">
                      {tier.priceUnit}
                    </span>
                  </p>
                  <p className="text-body-sm font-medium text-neutral-700 mt-2">
                    {tier.priceAddon}
                  </p>
                  <p className="text-caption text-neutral-500 mt-1">
                    {tier.priceNote}
                  </p>
                </div>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                  {tier.description}
                </p>
                <ul className="space-y-2 flex-1" aria-label={`Inbegrepen bij ${tier.title}`}>
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 items-start text-body-sm text-neutral-700">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-brand-700 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <p className="text-center text-caption text-neutral-500 mt-8 max-w-[640px] mx-auto">
            Tarieven zijn exclusief btw. Contracten worden op jaarbasis
            aangegaan. Implementatie, training en projectmanagement worden
            afzonderlijk geoffreerd.
          </p>

          <div className="text-center mt-10">
            <Button as="link" href="/contact" variant="primary" size="lg">
              Plan een verkenningsgesprek
            </Button>
          </div>
        </Container>
      </section>

      {/* -- 6. Doelgroepen per bestuurslaag -- */}
      <section
        className="bg-neutral-50 py-16 lg:py-24"
        aria-labelledby="audience-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Toepassingsgebied
            </span>
            <h2
              id="audience-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              Geschikt voor alle bestuurslagen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_GROUPS.map((group) => (
              <div
                key={group.label}
                className="rounded-[16px] border border-neutral-200 p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div className="mb-4">
                  <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-1.5">
                    {group.label}
                  </h3>
                  <span className="inline-block text-caption text-brand-600 font-medium bg-brand-100 px-2.5 py-1 rounded-full">
                    {group.count}
                  </span>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-caption text-neutral-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -- 7. FAQ -- */}
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
            <FaqAccordion items={FAQ_ITEMS} />
          </Card>
        </Container>
      </section>

      {/* -- 8. Lead magnet -- */}
      <LeadMagnetBanner />

      {/* -- 9. Breder dan Woo -- */}
      <section className="bg-brand-100 py-14 lg:py-18" aria-label="Breder dan Woo">
        <Container variant="text">
          <div className="text-center">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
              Breder dan Woo
            </span>
            <h2 className="font-heading text-h3 font-semibold text-neutral-950 mb-4 leading-[1.15]">
              Heeft uw organisatie een ander vraagstuk?
            </h2>
            <p className="text-body text-neutral-700 leading-relaxed mb-8 max-w-[560px] mx-auto">
              OPMS is een concrete uitwerking van hoe Staterra samen met de overheid
              digitale oplossingen bouwt. Dezelfde aanpak — open source, gefaseerd,
              met volledige regie — passen we toe op andere vraagstukken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/samen-ontwikkelen"
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group"
              >
                Samen nieuwe oplossingen ontwikkelen
                <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/open-source"
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-150 group"
              >
                Open source platformen implementeren
                <svg className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* -- 10. Sluit-CTA -- */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="woo-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="woo-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Wilt u weten wat OPMS voor uw organisatie kan betekenen?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Plan een vrijblijvend verkenningsgesprek. Binnen twee werkdagen
              een inhoudelijke reactie.
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
            <p className="mt-8 text-caption text-brand-200/70">
              Geen verkoopdruk. U ervaart de waarde voordat u beslist over een
              structurele samenwerking.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
