import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';

// ── Inhoudsopgave ─────────────────────────────────────────────

const SECTIES = [
  { id: 'verwerkingsverantwoordelijke', label: '1. Verwerkingsverantwoordelijke' },
  { id: 'welke-gegevens', label: '2. Welke gegevens verwerken wij?' },
  { id: 'doel-grondslag', label: '3. Doel en grondslag' },
  { id: 'bewaartermijnen', label: '4. Bewaartermijnen' },
  { id: 'derden', label: '5. Derden en verwerkers' },
  { id: 'buiten-eu', label: '6. Doorgifte buiten de EU' },
  { id: 'cookies', label: '7. Cookies' },
  { id: 'rechten', label: '8. Uw rechten' },
  { id: 'klacht', label: '9. Klacht indienen' },
  { id: 'wijzigingen', label: '10. Wijzigingen' },
  { id: 'contact', label: '11. Contact' },
];

// ── Gegevenscategorieen ───────────────────────────────────────

const GEGEVENS_TABEL = [
  {
    categorie: 'Contactgegevens',
    gegevens: 'Voor- en achternaam, e-mailadres, telefoonnummer',
    bron: 'Contactformulier, e-mail',
    grondslag: 'Uitvoering overeenkomst / Gerechtvaardigd belang',
  },
  {
    categorie: 'Organisatiegegevens',
    gegevens: 'Naam organisatie, functie',
    bron: 'Contactformulier, offertetraject',
    grondslag: 'Uitvoering overeenkomst',
  },
  {
    categorie: 'Berichtinhoud',
    gegevens: 'Berichten via contactformulier, bijgevoegde bestanden',
    bron: 'Contactformulier',
    grondslag: 'Uitvoering overeenkomst / Gerechtvaardigd belang',
  },
  {
    categorie: 'Technische gegevens',
    gegevens: 'IP-adres, browsertype, paginabezoeken, tijdstip',
    bron: 'Automatisch bij websitebezoek',
    grondslag: 'Gerechtvaardigd belang (beveiliging, foutopsporing)',
  },
  {
    categorie: 'Contractgegevens',
    gegevens: 'Afspraken, factuuradres, betalingsinformatie',
    bron: 'Klantrelatie',
    grondslag: 'Uitvoering overeenkomst / Wettelijke verplichting',
  },
];

// ── Betrokkenenrechten ─────────────────────────────────────────

const RECHTEN = [
  {
    recht: 'Recht op inzage',
    artikel: 'Art. 15 AVG',
    toelichting:
      'U heeft het recht te weten welke persoonsgegevens wij van u verwerken, voor welk doel en hoe lang we deze bewaren.',
  },
  {
    recht: 'Recht op rectificatie',
    artikel: 'Art. 16 AVG',
    toelichting:
      'Indien uw gegevens onjuist of onvolledig zijn, kunt u ons verzoeken deze te corrigeren.',
  },
  {
    recht: 'Recht op gegevenswissing',
    artikel: 'Art. 17 AVG',
    toelichting:
      'U kunt ons in bepaalde gevallen verzoeken uw persoonsgegevens te verwijderen ("recht om vergeten te worden").',
  },
  {
    recht: 'Recht op beperking',
    artikel: 'Art. 18 AVG',
    toelichting:
      'U kunt de verwerking van uw gegevens tijdelijk laten beperken, bijvoorbeeld terwijl een bezwaar wordt beoordeeld.',
  },
  {
    recht: 'Recht op gegevensoverdraagbaarheid',
    artikel: 'Art. 20 AVG',
    toelichting:
      'U kunt vragen uw gegevens in een gestructureerd, gangbaar en machineleesbaar formaat te ontvangen of door te sturen.',
  },
  {
    recht: 'Recht van bezwaar',
    artikel: 'Art. 21 AVG',
    toelichting:
      'U kunt bezwaar maken tegen de verwerking van uw gegevens op basis van gerechtvaardigd belang of voor direct-marketing doeleinden.',
  },
];

// ── Hulpcomponent ─────────────────────────────────────────────

function SectieKop({ nummer, titel }: { nummer: string; titel: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span
        aria-hidden="true"
        className="flex-shrink-0 font-heading font-bold text-h4 text-brand-200"
      >
        {nummer}
      </span>
      <h2 className="font-heading text-[1.375rem] font-semibold text-neutral-950 leading-snug">
        {titel}
      </h2>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageMeta title="Privacyverklaring" path="/privacy" />
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="border-b border-neutral-200 bg-neutral-50 py-14 lg:py-20"
        aria-label="Privacyverklaring"
      >
        <Container variant="content">
          <div className="max-w-[680px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
              Juridisch
            </span>
            <h1 className="font-heading text-h1 font-semibold text-neutral-950 mb-4 leading-[1.05]">
              Privacyverklaring
            </h1>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-6">
              Staterra B.V. hecht grote waarde aan de bescherming van
              persoonsgegevens. In deze verklaring legt u uit welke gegevens
              wij verwerken, waarom, hoe lang en welke rechten u heeft.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-caption text-neutral-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                </svg>
                Versie 1.0 — januari 2025
              </span>
              <span aria-hidden="true">&middot;</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                AVG (GDPR) — Verordening (EU) 2016/679
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hoofdcontent: sidebar + artikel ─────────────────── */}
      <Container variant="page" className="py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Sidebar: sticky TOC ────────────────────────── */}
          <aside
            className="hidden lg:block lg:sticky lg:top-28"
            aria-label="Inhoudsopgave"
          >
            <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Inhoudsopgave
            </p>
            <nav>
              <ol className="space-y-1">
                {SECTIES.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-md px-3 py-2 text-caption text-neutral-600 hover:bg-brand-50 hover:text-brand-700 transition-colors duration-[150ms]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 rounded-[12px] border border-brand-200 bg-brand-50 p-5">
              <p className="text-caption font-semibold text-brand-800 mb-2">
                Vragen over privacy?
              </p>
              <p className="text-caption text-brand-700 leading-relaxed mb-3">
                Neem direct contact op via{' '}
                <a
                  href="mailto:privacy@staterra.nl"
                  className="font-medium underline hover:no-underline"
                >
                  privacy@staterra.nl
                </a>
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-caption font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms]"
              >
                Contactpagina →
              </Link>
            </div>
          </aside>

          {/* ── Artikel ───────────────────────────────────── */}
          <article className="max-w-none [&>section:not(:first-child)]:border-t [&>section:not(:first-child)]:border-neutral-200 [&>section:not(:first-child)]:pt-8">

            {/* § 1 */}
            <section id="verwerkingsverantwoordelijke" className="mb-14 scroll-mt-28">
              <SectieKop nummer="1" titel="Verwerkingsverantwoordelijke" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                De verwerkingsverantwoordelijke in de zin van de Algemene
                Verordening Gegevensbescherming (AVG) is:
              </p>
              <div className="rounded-[14px] border border-neutral-200 bg-neutral-50 p-6 text-body-sm text-neutral-700 leading-relaxed">
                <strong className="block font-semibold text-neutral-950 mb-3">
                  Staterra B.V.
                </strong>
                <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1.5">
                  <dt className="text-neutral-500">Adres</dt>
                  <dd>Stadsplateau 27, 3521 AZ Utrecht</dd>
                  <dt className="text-neutral-500">E-mail</dt>
                  <dd>
                    <a href="mailto:privacy@staterra.nl" className="text-brand-700 hover:underline">
                      privacy@staterra.nl
                    </a>
                  </dd>
                  <dt className="text-neutral-500">Website</dt>
                  <dd>
                    <a href="https://staterra.nl" className="text-brand-700 hover:underline">
                      staterra.nl
                    </a>
                  </dd>
                  <dt className="text-neutral-500">KvK</dt>
                  <dd>Wordt gepubliceerd na inschrijving</dd>
                </dl>
              </div>
            </section>

            {/* § 2 */}
            <section id="welke-gegevens" className="mb-14 scroll-mt-28">
              <SectieKop nummer="2" titel="Welke gegevens verwerken wij?" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                Staterra verwerkt persoonsgegevens uitsluitend voor zover dat
                noodzakelijk is voor de bedrijfsvoering en dienstverlening. De
                onderstaande tabel geeft een overzicht van de categorieen
                persoonsgegevens die wij verwerken.
              </p>

              {/* Tabel */}
              <div className="overflow-x-auto rounded-[12px] border border-neutral-200">
                <table className="w-full text-caption text-left">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold text-neutral-700 whitespace-nowrap">Categorie</th>
                      <th className="px-5 py-3.5 font-semibold text-neutral-700">Gegevens</th>
                      <th className="px-5 py-3.5 font-semibold text-neutral-700 whitespace-nowrap">Bron</th>
                      <th className="px-5 py-3.5 font-semibold text-neutral-700 whitespace-nowrap">Grondslag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {GEGEVENS_TABEL.map((r) => (
                      <tr key={r.categorie} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="px-5 py-4 font-medium text-neutral-900 align-top whitespace-nowrap">
                          {r.categorie}
                        </td>
                        <td className="px-5 py-4 text-neutral-600 align-top">{r.gegevens}</td>
                        <td className="px-5 py-4 text-neutral-600 align-top whitespace-nowrap">{r.bron}</td>
                        <td className="px-5 py-4 text-neutral-600 align-top">{r.grondslag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-caption text-neutral-500 leading-relaxed">
                Wij verwerken geen bijzondere categorieen persoonsgegevens
                (zoals gezondheidsgegevens, ras of geloofsovertuiging) tenzij u
                deze zelf vrijwillig verstrekt in een bericht.
              </p>
            </section>

            {/* § 3 */}
            <section id="doel-grondslag" className="mb-14 scroll-mt-28">
              <SectieKop nummer="3" titel="Doel en grondslag" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                Staterra verwerkt persoonsgegevens op basis van een of meer van
                de volgende rechtsgronden (art. 6 AVG):
              </p>

              <ul className="space-y-4">
                {[
                  {
                    grondslag: 'Uitvoering van een overeenkomst',
                    toelichting:
                      'Wanneer u een overeenkomst met ons aangaat of stappen onderneemt ter voorbereiding daarop, verwerken wij de daarvoor benodigde gegevens.',
                  },
                  {
                    grondslag: 'Gerechtvaardigd belang',
                    toelichting:
                      'Voor het beantwoorden van contactverzoeken, het beveiligen van onze systemen en het verbeteren van onze dienstverlening hebben wij een gerechtvaardigd belang bij de verwerking.',
                  },
                  {
                    grondslag: 'Wettelijke verplichting',
                    toelichting:
                      'Voor fiscale en administratieve verplichtingen (bijv. bewaarplicht voor facturen, art. 52 AWR) zijn wij wettelijk verplicht bepaalde gegevens te bewaren.',
                  },
                  {
                    grondslag: 'Toestemming',
                    toelichting:
                      'Voor het gebruik van analytische cookies of het verzenden van nieuwsbrieven vragen wij vooraf uw toestemming. U kunt deze altijd intrekken.',
                  },
                ].map((g) => (
                  <li key={g.grondslag} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-brand-400"
                    />
                    <div>
                      <span className="block text-body-sm font-semibold text-neutral-950 mb-0.5">
                        {g.grondslag}
                      </span>
                      <span className="block text-body-sm text-neutral-600 leading-relaxed">
                        {g.toelichting}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* § 4 */}
            <section id="bewaartermijnen" className="mb-14 scroll-mt-28">
              <SectieKop nummer="4" titel="Bewaartermijnen" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor
                het doel waarvoor ze zijn verkregen, of zo lang als wettelijk
                vereist. Onderstaande termijnen zijn van toepassing:
              </p>

              <div className="space-y-3">
                {[
                  { label: 'Contactformulieren en e-mail', termijn: '2 jaar na het laatste contact' },
                  { label: 'Klantdossiers (overeenkomsten, projecten)', termijn: '7 jaar na afronding' },
                  { label: 'Factuur- en betalingsgegevens', termijn: '7 jaar (fiscale bewaarplicht)' },
                  { label: 'Technische logbestanden (IP, toegangslogs)', termijn: '90 dagen, tenzij vereist voor onderzoek' },
                  { label: 'Analysegegevens (geanonimiseerd)', termijn: '26 maanden' },
                  { label: 'Sollicitatiegegevens (indien van toepassing)', termijn: '4 weken na afronding procedure, of 1 jaar met toestemming' },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-2 sm:gap-6 rounded-[10px] border border-neutral-200 px-5 py-4 hover:bg-neutral-50/50 transition-colors"
                  >
                    <span className="text-body-sm text-neutral-700">{t.label}</span>
                    <span className="text-body-sm font-medium text-neutral-950 sm:text-right">{t.termijn}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-caption text-neutral-500 leading-relaxed">
                Na afloop van de bewaartermijn worden gegevens op beveiligde
                wijze vernietigd of definitief geanonimiseerd.
              </p>
            </section>

            {/* § 5 */}
            <section id="derden" className="mb-14 scroll-mt-28">
              <SectieKop nummer="5" titel="Derden en verwerkers" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                Staterra deelt uw persoonsgegevens niet met derden, tenzij dit
                noodzakelijk is voor de dienstverlening of wettelijk verplicht.
                Wanneer wij gebruikmaken van verwerkers (partijen die in onze
                opdracht gegevens verwerken), sluiten wij een
                verwerkersovereenkomst af conform art. 28 AVG.
              </p>

              <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                Wij maken gebruik van de volgende categorieen verwerkers:
              </p>

              <ul className="space-y-2.5 mb-5">
                {[
                  'Hostingproviders (servers en infrastructuur)',
                  'E-mailproviders (communicatie)',
                  'Boekhoudsoftware (financiele administratie)',
                  'Analysetools (geanonimiseerde websitestatistieken)',
                ].map((v) => (
                  <li key={v} className="flex items-start gap-3 text-body-sm text-neutral-700">
                    <span aria-hidden="true" className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {v}
                  </li>
                ))}
              </ul>

              <div className="rounded-[12px] bg-amber-50 border border-amber-200 px-5 py-4 text-body-sm text-amber-800 leading-relaxed">
                <strong>Let op:</strong> Wij verkopen uw persoonsgegevens nooit
                aan derden en verstrekken deze niet voor commerciele doeleinden
                aan andere partijen.
              </div>
            </section>

            {/* § 6 */}
            <section id="buiten-eu" className="mb-14 scroll-mt-28">
              <SectieKop nummer="6" titel="Doorgifte buiten de EU" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                Staterra streeft ernaar persoonsgegevens uitsluitend te
                verwerken binnen de Europese Economische Ruimte (EER). Waar wij
                gebruikmaken van diensten waarbij gegevens buiten de EER worden
                verwerkt, waarborgen wij de rechtmatigheid hiervan door middel
                van:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Een adequaatheidsbesluit van de Europese Commissie (art. 45 AVG)',
                  "Standaard contractbepalingen (Standard Contractual Clauses — SCC's) (art. 46 lid 2 sub c AVG)",
                  'Bindende bedrijfsregels (art. 47 AVG), indien van toepassing',
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3 text-body-sm text-neutral-700">
                    <span aria-hidden="true" className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400" />
                    {m}
                  </li>
                ))}
              </ul>
            </section>

            {/* § 7 */}
            <section id="cookies" className="mb-14 scroll-mt-28">
              <SectieKop nummer="7" titel="Cookies" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
                Staterra.nl maakt gebruik van cookies en vergelijkbare
                technieken. Wij onderscheiden drie categorieen:
              </p>

              <div className="space-y-4">
                {[
                  {
                    type: 'Functionele cookies',
                    klasse: 'Geen toestemming vereist',
                    kleur: 'bg-green-50 border-green-200 text-green-800',
                    beschrijving:
                      'Noodzakelijk voor het functioneren van de website (sessiemanagement, voorkeuren). Deze cookies worden altijd geplaatst.',
                  },
                  {
                    type: 'Analytische cookies',
                    klasse: 'Toestemming vereist',
                    kleur: 'bg-amber-50 border-amber-200 text-amber-800',
                    beschrijving:
                      'Geanonimiseerde statistieken over websitegebruik om onze dienstverlening te verbeteren. Gegevens worden niet gebruikt voor profilering.',
                  },
                  {
                    type: 'Marketing-cookies',
                    klasse: 'Toestemming vereist',
                    kleur: 'bg-red-50 border-red-200 text-red-800',
                    beschrijving:
                      'Staterra plaatst momenteel geen marketing- of trackingcookies van derden.',
                  },
                ].map((c) => (
                  <div key={c.type} className="rounded-[12px] border border-neutral-200 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3 border-b border-neutral-200 bg-neutral-50">
                      <span className="font-semibold text-body-sm text-neutral-950">{c.type}</span>
                      <span className={`ml-auto text-caption font-medium px-2.5 py-0.5 rounded-full border ${c.kleur}`}>
                        {c.klasse}
                      </span>
                    </div>
                    <p className="px-5 py-4 text-body-sm text-neutral-600 leading-relaxed">
                      {c.beschrijving}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-body-sm text-neutral-600 leading-relaxed">
                U kunt cookies te allen tijde verwijderen via de instellingen
                van uw browser. Houd er rekening mee dat het uitschakelen van
                functionele cookies de werking van de website kan beinvloeden.
              </p>
              <p className="mt-3 text-body-sm text-neutral-600 leading-relaxed">
                Lees meer in ons{' '}
                <Link to="/cookies" className="text-brand-700 font-medium hover:text-brand-900 transition-colors duration-[150ms]">
                  uitgebreide cookiebeleid
                </Link>
                , inclusief een volledig overzicht van alle cookies per categorie.
              </p>
            </section>

            {/* § 8 */}
            <section id="rechten" className="mb-14 scroll-mt-28">
              <SectieKop nummer="8" titel="Uw rechten als betrokkene" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-6">
                Als betrokkene heeft u op grond van de AVG de volgende rechten.
                U kunt deze uitoefenen door contact op te nemen via{' '}
                <a
                  href="mailto:privacy@staterra.nl"
                  className="text-brand-700 hover:underline font-medium"
                >
                  privacy@staterra.nl
                </a>
                . Wij reageren binnen vier weken na ontvangst van uw verzoek.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RECHTEN.map((r) => (
                  <div
                    key={r.recht}
                    className="rounded-[14px] border border-neutral-200 p-5 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-[180ms]"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 mt-0.5 w-2 h-2 rounded-full bg-brand-600"
                      />
                      <span className="font-semibold text-body-sm text-neutral-950">
                        {r.recht}
                      </span>
                    </div>
                    <span className="block ml-5 text-caption text-brand-600 font-medium mb-2">
                      {r.artikel}
                    </span>
                    <p className="ml-5 text-caption text-neutral-600 leading-relaxed">
                      {r.toelichting}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[12px] bg-brand-50 border border-brand-200 px-5 py-4 text-body-sm text-brand-800 leading-relaxed">
                <strong>Identiteitsverificatie:</strong> Om uw rechten te
                beschermen, zijn wij verplicht uw identiteit te verifieren
                voordat wij een verzoek behandelen. Wij kunnen hiervoor vragen
                een kopie van een geldig identiteitsbewijs te overleggen.
                Maak hierop uw BSN, pasfoto en MRZ onleesbaar.
              </div>
            </section>

            {/* § 9 */}
            <section id="klacht" className="mb-14 scroll-mt-28">
              <SectieKop nummer="9" titel="Klacht indienen" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                Als u van mening bent dat wij uw persoonsgegevens onrechtmatig
                verwerken, heeft u het recht een klacht in te dienen bij de
                toezichthoudende autoriteit. In Nederland is dat de:
              </p>

              <div className="rounded-[14px] border border-neutral-200 bg-neutral-50 p-6">
                <strong className="block font-semibold text-neutral-950 mb-3 text-body-sm">
                  Autoriteit Persoonsgegevens (AP)
                </strong>
                <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1.5 text-caption text-neutral-700">
                  <dt className="text-neutral-500">Postadres</dt>
                  <dd>Postbus 93374, 2509 AJ Den Haag</dd>
                  <dt className="text-neutral-500">Website</dt>
                  <dd>
                    <a
                      href="https://www.autoriteitpersoonsgegevens.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 hover:underline"
                    >
                      autoriteitpersoonsgegevens.nl
                    </a>
                  </dd>
                  <dt className="text-neutral-500">Telefoon</dt>
                  <dd>088 - 1805 250</dd>
                </dl>
              </div>

              <p className="mt-4 text-body-sm text-neutral-600 leading-relaxed">
                Wij verzoeken u echter eerst contact met ons op te nemen als u
                een klacht heeft. Wij lossen problemen graag direct op.
              </p>
            </section>

            {/* § 10 */}
            <section id="wijzigingen" className="mb-14 scroll-mt-28">
              <SectieKop nummer="10" titel="Wijzigingen" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
                Staterra kan deze privacyverklaring te allen tijde aanpassen.
                Wijzigingen worden gepubliceerd op deze pagina met een
                bijgewerkte versiedatum. Wij raden u aan deze verklaring
                periodiek te raadplegen. Bij wezenlijke wijzigingen informeren
                wij u actief via e-mail (voor zover van toepassing).
              </p>
              <p className="text-body-sm text-neutral-500">
                Huidige versie: <strong className="text-neutral-700">1.0</strong> — gepubliceerd januari 2025.
              </p>
            </section>

            {/* § 11 */}
            <section id="contact" className="scroll-mt-28">
              <SectieKop nummer="11" titel="Contact" />
              <p className="text-body-sm text-neutral-700 leading-relaxed mb-6">
                Heeft u vragen over deze privacyverklaring of wilt u een van uw
                rechten uitoefenen? Neem dan contact op:
              </p>

              <div className="rounded-[16px] border border-neutral-200 overflow-hidden">
                <div className="bg-brand-700 px-6 py-4">
                  <p className="font-heading font-semibold text-white text-h4">
                    Privacy-contactpunt
                  </p>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white">
                  {[
                    {
                      label: 'E-mail',
                      waarde: 'privacy@staterra.nl',
                      href: 'mailto:privacy@staterra.nl',
                    },
                    {
                      label: 'Adres',
                      waarde: 'Stadsplateau 27\n3521 AZ Utrecht',
                      href: null,
                    },
                    {
                      label: 'Contactformulier',
                      waarde: 'staterra.nl/contact',
                      href: '/contact',
                    },
                    {
                      label: 'Reactietermijn',
                      waarde: 'Binnen vier weken',
                      href: null,
                    },
                  ].map((c) => (
                    <div key={c.label}>
                      <dt className="text-caption font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                        {c.label}
                      </dt>
                      <dd className="text-body-sm text-neutral-700">
                        {c.href ? (
                          <a
                            href={c.href}
                            className="text-brand-700 hover:underline font-medium"
                          >
                            {c.waarde}
                          </a>
                        ) : (
                          <span className="whitespace-pre-line">{c.waarde}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </article>
        </div>
      </Container>

      {/* ── Gerelateerde pagina's ────────────────────────────── */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-12" aria-label="Gerelateerde pagina's">
        <Container variant="content">
          <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mb-5">
            Gerelateerd
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[680px]">
            {[
              { label: 'Contactpagina', href: '/contact', omschrijving: 'Neem direct contact op' },
              { label: 'Over Staterra', href: '/over-ons', omschrijving: 'Wie wij zijn' },
              { label: 'Open source', href: '/open-source', omschrijving: 'Transparantie in techniek' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="group rounded-[12px] border border-neutral-200 bg-white px-5 py-4 hover:border-brand-300 hover:shadow-[0_4px_16px_rgba(22,62,116,0.06)] transition-all duration-[180ms]"
              >
                <span className="block text-body-sm font-semibold text-neutral-950 group-hover:text-brand-700 transition-colors duration-[150ms] mb-0.5">
                  {l.label}
                </span>
                <span className="block text-caption text-neutral-500">{l.omschrijving}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
