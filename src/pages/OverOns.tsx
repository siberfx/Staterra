import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// ── Waarden ───────────────────────────────────────────────────

const WAARDEN = [
  {
    titel: 'Langetermijn\u00ADpartnerschap',
    tekst: 'We investeren in duurzame relaties, niet in eenmalige opdrachten. Onze verdiensten zijn gekoppeld aan het succes van uw oplossing.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a14.93 14.93 0 005.84-2.58" />
      </svg>
    ),
  },
  {
    titel: 'Eigenaarschap bij de overheid',
    tekst: 'Alles wat we bouwen is open source en wordt juridisch eigendom van de overheidsorganisatie. Geen black-box oplossingen, geen verborgen afhankelijkheden.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    titel: 'Transparantie over aanpak en prijs',
    tekst: 'Vaste prijzen na scope-akkoord, geen meerwerk, geen open-einde contracten. U weet altijd wat u krijgt en wat het kost.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.59 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
  },
  {
    titel: 'Publieke sector als missie',
    tekst: 'We werken uitsluitend voor overheidsorganisaties. Onze kennis, netwerk en oplossingen zijn volledig toegespitst op de publieke sector.',
    icoon: (
      <svg className="w-6 h-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function OverOnsPage() {
  useEffect(() => {
    document.title = 'Over Staterra';
  }, []);

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-label="Over Staterra"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.07] bg-white"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-[0.05] bg-white"
        />

        <Container variant="content" className="relative z-10">
          <div className="max-w-[760px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-400 mb-5">
              Over Staterra
            </span>
            <h1 className="font-heading text-h1 font-semibold text-white mb-6 leading-[1.05]">
              Staterra: infrastructuurpartner
              <span className="text-brand-400"> voor de publieke sector</span>
            </h1>
            <p className="text-body-lg text-brand-200 leading-relaxed mb-10 max-w-[640px]">
              Staterra B.V. is opgericht met een duidelijke missie:
              overheidsorganisaties helpen hun digitale transparantie en
              informatiehuishouding structureel te verbeteren. Niet als
              traditionele IT-leverancier, maar als langetermijnpartner die
              regie, kennis en technologie combineert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Neem contact op
              </Button>
              <Button
                as="link"
                href="/woo-oplossing"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Bekijk onze oplossing →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Positionering ("drie negaties") ────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="positie-heading"
      >
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Tekst */}
            <div>
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                Positionering
              </span>
              <h2
                id="positie-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-6 leading-[1.1]"
              >
                Wat Staterra is — en wat niet
              </h2>
              <p className="text-body text-neutral-700 leading-relaxed mb-8">
                De overheid verdient een partij die investeert in een duurzame
                samenwerking, niet in eenmalige transacties. Staterra kiest
                bewust voor een andere rol dan de traditionele IT-markt biedt.
              </p>
              <Button as="link" href="/aanpak" variant="primary">
                Bekijk onze aanpak
              </Button>
            </div>

            {/* Drie negaties */}
            <div className="space-y-4" role="list" aria-label="Positionering van Staterra">
              {/* Negatie 1 */}
              <div
                role="listitem"
                className="rounded-[16px] border border-neutral-200 bg-neutral-50 px-6 py-5 opacity-60"
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-neutral-300 flex items-center justify-center">
                    <svg className="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-body-sm text-neutral-500 line-through leading-relaxed">
                    Staterra is geen consultancybureau dat adviseert en vertrekt.
                  </p>
                </div>
              </div>

              {/* Negatie 2 */}
              <div
                role="listitem"
                className="rounded-[16px] border border-neutral-200 bg-neutral-50 px-6 py-5 opacity-60"
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-neutral-300 flex items-center justify-center">
                    <svg className="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <p className="text-body-sm text-neutral-500 line-through leading-relaxed">
                    Staterra is geen softwareleverancier die een product aflevert
                    en factureert.
                  </p>
                </div>
              </div>

              {/* Positieve stelling */}
              <div
                role="listitem"
                className="rounded-[16px] border-2 border-brand-700 bg-brand-100 px-6 py-5"
              >
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-body-sm font-semibold text-brand-900 leading-relaxed">
                    Staterra is een infrastructuurpartner die investeert in een
                    gedeeld platform en daar samen met overheidsorganisaties de
                    vruchten van plukt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Visie & missie ─────────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="missie-heading"
      >
        <Container variant="content">
          <div className="text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Missie
            </span>
            <h2
              id="missie-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-5"
            >
              Waarom Staterra bestaat
            </h2>
            <p className="text-body-lg text-neutral-700 leading-relaxed max-w-[680px] mx-auto">
              De overheid staat voor een fundamentele digitale transitie. Wetten
              als de Wet open overheid stellen nieuwe eisen aan transparantie en
              informatiehuishouding. Tegelijkertijd zijn overheidsorganisaties
              kwetsbaar voor vendor lock-in, hoge kosten en trage implementaties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WAARDEN.map((w) => (
              <div
                key={w.titel}
                className="rounded-[16px] bg-white border border-neutral-200 p-6 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <div className="w-11 h-11 rounded-[10px] bg-brand-100 flex items-center justify-center mb-4">
                  {w.icoon}
                </div>
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-2 leading-snug">
                  {w.titel}
                </h3>
                <p className="text-body-sm text-neutral-700 leading-relaxed">{w.tekst}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Partnerschapsmodel ─────────────────────────────── */}
      <section
        className="bg-brand-100 py-16 lg:py-24"
        aria-labelledby="samenwerking-heading"
      >
        <Container variant="content">
          <div className="text-center mb-14">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Samenwerking
            </span>
            <h2
              id="samenwerking-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-4"
            >
              Staterra + CodeLabs
            </h2>
            <p className="text-body text-neutral-700 max-w-[560px] mx-auto">
              Staterra en CodeLabs B.V. vormen een complementair partnerschap.
              Samen leveren we de volledige keten — van bestuurlijk advies tot
              technische realisatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Staterra */}
            <Card padding="loose" hover={false} className="border-brand-700 ring-1 ring-brand-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-[12px] bg-brand-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-white text-h5">S</span>
                </div>
                <div>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950">
                    Staterra
                  </h3>
                  <p className="text-caption text-brand-600 font-medium">
                    Front-office
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Projectmanagement en coordinatie',
                  'Woo-consultancy en procesadvies',
                  'Governance en bestuurlijke begeleiding',
                  'Klantrelatie en stakeholder management',
                  'Dienstverlening en training (Academy)',
                ].map((taak) => (
                  <li key={taak} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-brand-700"
                    />
                    <span className="text-body-sm text-neutral-700">{taak}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CodeLabs */}
            <Card padding="loose" hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-[12px] bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-white text-h5">C</span>
                </div>
                <div>
                  <h3 className="font-heading text-h4 font-semibold text-neutral-950">
                    CodeLabs B.V.
                  </h3>
                  <p className="text-caption text-neutral-500 font-medium">
                    Back-office — technische partner
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Softwareontwikkeling en realisatie',
                  'Technische architectuur en integraties',
                  'Infrastructuur en DevOps',
                  'Technisch beheer en doorontwikkeling',
                  'Security en performance',
                ].map((taak) => (
                  <li key={taak} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-neutral-400"
                    />
                    <span className="text-body-sm text-neutral-700">{taak}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Gezamenlijk resultaat */}
          <div className="max-w-[900px] mx-auto mt-5">
            <div className="rounded-[16px] bg-brand-900 px-8 py-6">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-400/20 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </span>
                <div>
                  <p className="text-body-sm font-semibold text-white mb-1">
                    Gezamenlijk resultaat voor uw organisatie
                  </p>
                  <p className="text-body-sm text-brand-200/80">
                    Eén aanspreekpunt, één team, één traject — van eerste verkenning
                    tot werkend systeem in productie en doorlopend beheer daarna.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Rechtspersoon ─────────────────────────────────── */}
      <section
        className="bg-white py-16 lg:py-24"
        aria-labelledby="referenties-heading"
      >
        <Container variant="content">
          {/* Kvk / rechtspersoon */}
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-[16px] border border-neutral-200 bg-neutral-50 px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="text-caption text-neutral-500">
                <strong className="text-neutral-800 font-semibold">Staterra B.V.</strong>
                {' '}— gevestigd in Utrecht
              </span>
              <span className="text-caption text-neutral-500">
                Adres: Stadsplateau 27, 3521 AZ Utrecht
              </span>
              <Link
                to="/contact"
                className="text-caption font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] ml-auto"
              >
                Neem contact op →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 7. CTA ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        aria-labelledby="over-ons-cta-heading"
        style={{ background: 'var(--gradient-brand)' }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"
        />
        <Container variant="text">
          <div className="text-center relative z-10">
            <h2
              id="over-ons-cta-heading"
              className="font-heading text-h2 font-semibold text-white mb-4 leading-[1.1]"
            >
              Wil u kennismaken met ons team?
            </h2>
            <p className="text-body-lg text-brand-200 mb-10 leading-relaxed">
              Plan een vrijblijvend gesprek en ontdek hoe Staterra uw organisatie
              kan ondersteunen. Binnen twee werkdagen een inhoudelijke reactie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as="link" href="/contact" variant="secondary" size="lg">
                Plan een verkenningsgesprek
              </Button>
              <Button
                as="link"
                href="/dienstverlening"
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                Bekijk onze dienstverlening →
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
