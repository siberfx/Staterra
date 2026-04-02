import { useState, useEffect } from 'react';
import { getSolution } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

// ── Kernvoordelen ─────────────────────────────────────────────

const VOORDELEN = [
  {
    titel: 'Geen vendor lock-in',
    tekst:
      'Uw organisatie bezit de broncode. Leveranciers zijn vervangbaar en u bent nooit afhankelijk van één partij voor updates, prijsstelling of continuïteit.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    titel: 'Volledige databescherming',
    tekst:
      'Uw data blijft binnen uw eigen infrastructuur of een door u gekozen omgeving. Geen datadeling met derden, geen afhankelijkheid van buitenlandse cloudproviders.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titel: 'Transparantie en audit-mogelijkheid',
    tekst:
      'De broncode is inzichtelijk en auditeerbaar. U kunt zelf of via een onafhankelijke partij controleren wat het systeem doet met uw informatie.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titel: 'Gedeelde doorontwikkeling',
    tekst:
      'Meerdere overheden kunnen samen bijdragen aan één platform. Kosten voor nieuwe functionaliteit worden gedeeld, en verbeteringen komen alle deelnemers ten goede.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    titel: 'Lagere totaalkosten',
    tekst:
      'Geen licentiekosten per gebruiker of module. De initiële investering is lager en structurele kosten zijn voorspelbaarder dan bij commerciële pakketten.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titel: 'Strategische onafhankelijkheid',
    tekst:
      'Digitale soevereiniteit voor de overheid: geen afhankelijkheid van big-tech, buitenlandse wetgeving of commerciële prioriteiten die uw beleid doorkruisen.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.974-4.243m-3.905 2.121A11.249 11.249 0 013 12c0-2.16.608-4.18 1.664-5.898" />
      </svg>
    ),
  },
];

// ── Technologiestack ──────────────────────────────────────────

const TECH_STACK = [
  {
    naam: 'Laravel',
    categorie: 'Backend framework',
    beschrijving: 'PHP-framework voor robuuste en onderhoudbare backend-logica. Actieve community, uitgebreide documentatie en breed geadopteerd in de overheid.',
    url: 'https://laravel.com',
  },
  {
    naam: 'React',
    categorie: 'Frontend framework',
    beschrijving: 'Componentgebaseerde gebruikersinterface-bibliotheek. Snelle rendering, breed ecosysteem en inzetbaar in zowel web- als mobiele omgevingen.',
    url: 'https://react.dev',
  },
  {
    naam: 'PostgreSQL',
    categorie: 'Database',
    beschrijving: 'Open source relationele database met sterke ACID-garanties, uitgebreide datatypes en bewezen schaalbaarheid voor overheidsdatasets.',
    url: 'https://www.postgresql.org',
  },
  {
    naam: 'Typesense',
    categorie: 'Zoekinfrastructuur',
    beschrijving: 'Open source zoekengine met volledige tekst-zoekfunctionaliteit. Snel, tolerant voor typfouten en eenvoudig te hosten zonder externe afhankelijkheden.',
    url: 'https://typesense.org',
  },
  {
    naam: 'Docker',
    categorie: 'Containerisatie',
    beschrijving: 'Gestandaardiseerde container-omgeving zorgt voor consistente uitvoering op elke infrastructuur. Eenvoudig te reproduceren en te beheren.',
    url: 'https://www.docker.com',
  },
  {
    naam: 'Proxmox VE',
    categorie: 'Virtualisatieplatform',
    beschrijving: 'Open source platform voor virtualisatie en containerbeheer. Staterra draait de infrastructuur op Proxmox voor maximale onafhankelijkheid van cloudleveranciers.',
    url: 'https://www.proxmox.com',
  },
];

// ── Vergelijking open source vs. proprietary ─────────────────

const VERGELIJKING = [
  { aspect: 'Eigenaarschap broncode',  os: 'U',         prop: 'Leverancier' },
  { aspect: 'Licentiekosten',          os: 'Geen',      prop: 'Per gebruiker / module' },
  { aspect: 'Leveranciersafhankelijk', os: 'Nee',       prop: 'Hoog' },
  { aspect: 'Databescherming',         os: 'Eigen infra', prop: 'Cloudprovider' },
  { aspect: 'Audit-mogelijkheid',      os: 'Volledig',  prop: 'Beperkt / geen' },
  { aspect: 'Doorontwikkeling',        os: 'Gezamenlijk', prop: 'Roadmap leverancier' },
  { aspect: 'Comply-or-explain',       os: 'Eerste keuze', prop: 'Niet van toepassing' },
];

export default function OpenSourcePage() {
  const [solution, setSolution] = useState<any>(null);

  useEffect(() => {
    getSolution('open-source').then((data) => {
      if (data) setSolution(data);
    });
  }, []);

  return (
    <>
      <PageMeta title="Open source" description="Open source oplossingen voor de overheid. Geen vendor lock-in, geen licentiekosten, wel eigenaarschap van uw broncode." path="/open-source" />
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
        {/* Decoratief raster-patroon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 50%), repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '40px 40px',
          }}
        />

        <Container variant="content" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-200 mb-5">
                Open source
              </span>
              {/* Hero-kop uit briefing */}
              <h1 className="font-heading text-h1 font-semibold text-white mb-5 leading-[1.05]">
                Volledige regie over uw
                <span className="text-brand-400"> digitale systemen</span>
              </h1>
              <p className="text-body-lg text-brand-200 mb-8 leading-relaxed">
                De Woo verplicht {BESTUURSORGANEN_STATS.totaal} bestuursorganen tot actieve openbaarmaking — van de {BESTUURSORGANEN_STATS.gemeenten} gemeenten tot alle {BESTUURSORGANEN_STATS.provincies} provincies en {BESTUURSORGANEN_STATS.waterschappen} waterschappen. <strong>Staterra implementeert en beheert open source oplossingen met volledige regie. Geen vendor lock-in, geen licentiekosten — wel eigenaarschap van uw broncode.</strong>
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

            <div className="hidden lg:block">
              <div className="rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.30)]">
                <img
                  src="/images/open-source-hero.png"
                  alt="IT-professional inspecteert serverinfrastructuur"
                  width={1024}
                  height={682}
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Kernvoordelen ─────────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="voordelen-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Voordelen
            </span>
            <h2
              id="voordelen-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Waarom open source voor de overheid
            </h2>
            <p className="text-body text-neutral-700 max-w-[640px] mx-auto">
              Open source is geen compromis — het is een strategische keuze voor
              organisaties die langdurige onafhankelijkheid, transparantie en
              kostenbeheersing prioriteren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VOORDELEN.map((v) => (
              <div
                key={v.titel}
                className="rounded-[16px] border border-neutral-200 p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div className="w-11 h-11 rounded-[10px] bg-brand-100 flex items-center justify-center mb-4">
                  {v.icoon}
                </div>
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2">
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

      {/* ── 3. CMS-inhoud + kenmerken ─────────────────────────── */}
      {solution && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="aanpak-heading"
        >
          <Container variant="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                  Staterra&apos;s aanpak
                </span>
                <h2
                  id="aanpak-heading"
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
                    Kenmerken
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
                      Plan een verkenningsgesprek
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── 4. Comply-or-explain ──────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="comply-heading"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Citaatblok */}
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                Comply-or-explain
              </span>
              <h2
                id="comply-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]"
              >
                Beleid dat open source voorschrijft
              </h2>
              {/* Briefing-toevoeging */}
              <p className="text-body text-neutral-700 leading-relaxed mb-5">
                Het comply-or-explain beleid van de rijksoverheid schrijft voor
                dat bestuursorganen{' '}
                <strong className="text-neutral-950 font-semibold">
                  eerst bestaande open source oplossingen moeten beoordelen
                </strong>{' '}
                voordat zij alternatieven inkopen. OPMS is opgenomen in het{' '}
                <strong className="text-neutral-950 font-semibold">
                  BZK open source ecosysteem
                </strong>
                .
              </p>
              <p className="text-body text-neutral-700 leading-relaxed">
                Dit maakt een open source Woo-oplossing niet alleen een technische
                keuze, maar een bestuurlijke verplichting. Organisaties die een
                commerciële aanbieder kiezen zonder eerst OPMS te beoordelen,
                moeten dit verantwoorden — de zogeheten &lsquo;explain&rsquo;.
              </p>
            </div>

            {/* Info-kaarten */}
            <div className="space-y-4">
              <div className="rounded-[16px] bg-brand-100 border border-brand-200 p-6">
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2">
                  Comply
                </h3>
                <p className="text-body-sm text-neutral-700">
                  Uw organisatie sluit aan op OPMS — een bestaande, bewezen
                  open source oplossing uit het BZK-ecosysteem. U voldoet direct
                  aan de eis zonder explain-procedure.
                </p>
              </div>
              <div className="rounded-[16px] bg-neutral-100 border border-neutral-200 p-6">
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2">
                  Explain
                </h3>
                <p className="text-body-sm text-neutral-700">
                  Uw organisatie kiest voor een andere oplossing en moet
                  onderbouwen waarom OPMS niet passend is. Dit verlengt de
                  aanbestedingsprocedure en vereist bestuurlijke verantwoording.
                </p>
              </div>

              <div className="rounded-[16px] border border-brand-700 bg-white p-5 flex items-start gap-4">
                <span aria-hidden="true" className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </span>
                <p className="text-body-sm text-neutral-700">
                  <strong className="text-neutral-950 font-semibold block mb-1">
                    Let op: de klok tikt
                  </strong>
                  {BESTUURSORGANEN_STATS.totaal} bestuursorganen moeten binnen 8 tot 18 maanden
                  voldoen aan de Woo. De explain-route kost tijd die u niet hebt.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. Vergelijking ───────────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="vergelijking-heading"
      >
        <Container variant="content">
          <div className="text-center mb-12">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Vergelijking
            </span>
            <h2
              id="vergelijking-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              Open source vs. proprietary software
            </h2>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[560px] px-4 sm:px-0">
              <table
                className="w-full border-collapse"
                aria-label="Open source versus proprietary vergelijking"
              >
                <thead>
                  <tr>
                    <th scope="col" className="text-left py-3.5 px-5 text-body-sm font-semibold text-neutral-500 w-1/2">
                      Aspect
                    </th>
                    <th scope="col" className="py-3.5 px-5 text-center text-body-sm font-semibold text-white bg-brand-700 rounded-t-[12px]">
                      Open source
                    </th>
                    <th scope="col" className="py-3.5 px-5 text-center text-body-sm font-semibold text-neutral-700 border-b border-neutral-200">
                      Proprietary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VERGELIJKING.map((rij, i) => {
                    const isLast = i === VERGELIJKING.length - 1;
                    return (
                      <tr key={rij.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                        <td className="py-3.5 px-5 text-body-sm font-medium text-neutral-800 border-b border-neutral-200">
                          {rij.aspect}
                        </td>
                        <td className={[
                          'py-3.5 px-5 text-center text-body-sm font-medium text-success',
                          'bg-brand-100 border-x border-brand-200 border-b border-brand-200',
                          isLast ? 'rounded-b-[12px]' : '',
                        ].join(' ')}>
                          <svg className="inline w-4 h-4 mr-1 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {rij.os}
                        </td>
                        <td className="py-3.5 px-5 text-center text-body-sm text-neutral-500 border-b border-neutral-200">
                          <svg className="inline w-4 h-4 mr-1 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {rij.prop}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Technologiestack ───────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="techstack-heading"
      >
        <Container variant="content">
          <div className="text-center mb-4">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Transparantie
            </span>
            <h2
              id="techstack-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-3"
            >
              Wat er onder de motorkap zit
            </h2>
            <p className="text-body text-neutral-700 max-w-[600px] mx-auto mb-2">
              Wij publiceren de volledige technologiestack. Geen verborgen
              componenten, geen black-box oplossingen.
            </p>
          </div>

          {/* Stack-label */}
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 border border-neutral-200 px-4 py-2 text-caption text-neutral-600">
              <svg className="w-3.5 h-3.5 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 7.293l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L11 12.586l4.293-4.293a1 1 0 011.414 1.414z" />
              </svg>
              100% open source — geen proprietary onderdelen
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TECH_STACK.map((tech) => (
              <a
                key={tech.naam}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[16px] border border-neutral-200 bg-white p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-heading text-h5 font-semibold text-neutral-950 group-hover:text-brand-700 transition-colors duration-[180ms]">
                      {tech.naam}
                    </h3>
                    <span className="text-caption text-brand-600 font-medium">
                      {tech.categorie}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-1 transition-transform duration-[180ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </div>
                <p className="text-caption text-neutral-600 leading-relaxed">
                  {tech.beschrijving}
                </p>
              </a>
            ))}
          </div>

          <p className="text-caption text-neutral-500 text-center mt-6">
            De volledige broncode van OPMS is beschikbaar via het BZK open source ecosysteem.
          </p>
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

      {/* ── 8. CTA ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="os-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="os-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Neem de regie over uw digitale systemen
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Ontdek welke open source oplossingen passen bij uw organisatie.
              Binnen twee werkdagen een inhoudelijke reactie.
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
          </div>
        </Container>
      </section>
    </>
  );
}
