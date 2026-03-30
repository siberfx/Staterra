import type { Metadata } from 'next';
import Image from 'next/image';
import { getSolution } from '@/lib/cms';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { ComparisonTable } from '@/components/sections/ComparisonTable';

export const metadata: Metadata = {
  title: 'Woo-oplossing (OPMS)',
  description:
    'De direct inzetbare, open source Woo-oplossing. Bewezen in de praktijk, implementeerbaar in 3 maanden.',
  alternates: { canonical: '/woo-oplossing' },
};

// ── Deelnamemodellen ──────────────────────────────────────────

const PARTICIPATION_MODELS = [
  {
    title: 'Gedeelde omgeving',
    description:
      'Uw organisatie sluit aan op een gedeelde OPMS-omgeving die Staterra beheert. Laagste instapkosten, snel operationeel.',
    price: 'Laagste instapkosten',
    ideal: 'Gemeenten en waterschappen',
  },
  {
    title: 'Eigen omgeving',
    description:
      'OPMS wordt uitgerold in uw eigen infrastructuur. Volledige databescherming en maatwerk-configuratie mogelijk.',
    price: 'Eigen investering',
    ideal: 'Ministeries en provincies',
    featured: true,
  },
  {
    title: 'Gezamenlijke doorontwikkeling',
    description:
      'U participeert actief in de doorontwikkeling van OPMS. Directe invloed op de roadmap en gedeelde kosten.',
    price: 'Samenwerkingsmodel',
    ideal: 'Koepelorganisaties en samenwerkingsverbanden',
  },
  {
    title: 'SaaS',
    description:
      'Volledige ontzorging: Staterra beheert hosting, updates en beveiliging. U gebruikt OPMS als dienst.',
    price: 'Maandelijks abonnement',
    ideal: 'Organisaties zonder eigen IT-capaciteit',
  },
];

// ── Doelgroepen per bestuurslaag ──────────────────────────────

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

export default async function WooOplossing() {
  const solution = await getSolution('woo-oplossing');

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
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
                Woo-oplossing — OPMS
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
                {solution?.subtitle ??
                  'Een bestaande oplossing voor publicaties binnen de Wet open overheid, gereed voor implementatie bij overheden.'}
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
            {solution?.image && (
              <div className="hidden lg:block relative">
                <div className="rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.25)]">
                  <Image
                    src={solution.image}
                    alt="OPMS — Woo-oplossing in gebruik"
                    width={580}
                    height={420}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 2. Markturgentie ─────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20" aria-label="Markturgentie">
        <Container variant="text">
          <div className="text-center">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
              De urgentie
            </span>
            <h2 className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]">
              De klok tikt: 8–18 maanden
            </h2>
            <p className="text-body-lg text-neutral-700 leading-relaxed mb-8">
              Meer dan{' '}
              <strong className="text-neutral-950 font-semibold">
                530 bestuursorganen
              </strong>{' '}
              — 15 ministeries, circa 40 agentschappen, 100 ZBO&apos;s, 12
              provincies, 21 waterschappen en 342 gemeenten — moeten binnen{' '}
              <strong className="text-neutral-950 font-semibold">
                8 tot 18 maanden
              </strong>{' '}
              een werkende Woo-oplossing hebben.
            </p>
            <p className="text-body text-neutral-700 leading-relaxed">
              OPMS is vandaag beschikbaar, bewezen in de praktijk en
              implementeerbaar in{' '}
              <strong className="text-neutral-950 font-semibold">
                3 maanden
              </strong>
              . U hoeft niet te wachten op een nieuw ontwikkeltraject.
            </p>
          </div>
        </Container>

        {/* Urgentie-getallen */}
        <Container variant="content" className="mt-12">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-[16px] overflow-hidden">
            {[
              { value: '530+', label: 'Bestuursorganen', sub: 'verplicht Woo-compliant' },
              { value: '8–18', label: 'Maanden', sub: 'wettelijke deadline' },
              { value: '3 mnd', label: 'Implementatie', sub: 'van start tot werkend' },
              { value: '100%', label: 'Open source', sub: 'eigendom bij de overheid' },
            ].map((s) => (
              <div key={s.value} className="bg-white px-6 py-8 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="block font-heading font-semibold text-brand-700 mb-1"
                    style={{ fontSize: '2.5rem', lineHeight: 1 }}
                  >
                    {s.value}
                  </span>
                  <span className="block text-body-sm font-semibold text-neutral-800">
                    {s.label}
                  </span>
                  <span className="block text-caption text-neutral-500 mt-0.5">
                    {s.sub}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── 3. Wat biedt de oplossing ─────────────────────────── */}
      {solution && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="features-heading"
        >
          <Container variant="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                  De oplossing
                </span>
                <h2
                  id="features-heading"
                  className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]"
                >
                  {solution.title}
                </h2>

                {/* HTML-content uit CMS */}
                <div
                  className="prose prose-neutral max-w-none text-body-sm text-neutral-700 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: solution.long_body }}
                />
              </div>

              {/* Kenmerkenlijst */}
              {solution.list_items?.length > 0 && (
                <div>
                  <Card padding="loose" hover={false}>
                    <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-6">
                      Kenmerken
                    </h3>
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
                        OPMS is opgenomen in het open source ecosysteem van BZK.
                        Het comply-or-explain beleid maakt OPMS de logische
                        eerste keuze voor Woo-compliance.
                      </p>
                      <Button as="link" href="/contact" variant="primary" className="w-full justify-center">
                        Vraag een demo aan
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── 4. Vergelijkingstabel ─────────────────────────────── */}
      <ComparisonTable />

      {/* ── 5. Deelnamemodellen ───────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="models-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Deelname
            </span>
            <h2
              id="models-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Kies het model dat bij u past
            </h2>
            <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
              Van gedeelde omgeving tot volledige eigen installatie. U ervaart
              de waarde van het platform voordat u besluit over een structurele
              samenwerking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PARTICIPATION_MODELS.map((model) => (
              <Card
                key={model.title}
                padding="loose"
                className={
                  model.featured
                    ? 'border-brand-700 ring-1 ring-brand-700 relative'
                    : ''
                }
              >
                {model.featured && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-brand-700 text-white text-caption font-semibold rounded-full">
                    Meest gekozen
                  </span>
                )}
                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
                  {model.title}
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-neutral-100">
                  <span className="inline-flex items-center gap-1.5 text-caption text-brand-700 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {model.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-caption text-neutral-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {model.ideal}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button as="link" href="/contact" variant="primary" size="lg">
              Bespreek het juiste model voor uw organisatie
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 6. Doelgroepen per bestuurslaag ───────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="audience-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
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
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-heading text-h5 font-semibold text-neutral-950">
                    {group.label}
                  </h3>
                  <span className="flex-shrink-0 text-caption text-brand-600 font-medium bg-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
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

      {/* ── 7. FAQ ────────────────────────────────────────────── */}
      {solution?.faq && solution.faq.length > 0 && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="faq-heading"
        >
          <Container variant="text">
            <div className="text-center mb-10">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
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

      {/* ── 8. Sluit-CTA ─────────────────────────────────────── */}
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
                Plan een vrijblijvend gesprek
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
