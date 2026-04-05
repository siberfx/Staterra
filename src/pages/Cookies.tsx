import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { useCookieConsent } from '@/components/cookies/CookieProvider';

// ── Cookie-data ───────────────────────────────────────────────

const FUNCTIONELE_COOKIES = [
  { naam: 'cookie_consent', doel: 'Onthoudt uw cookievoorkeuren', termijn: '12 maanden' },
  { naam: 'XSRF-TOKEN', doel: 'Bescherming tegen cross-site request forgery', termijn: 'Sessie' },
  { naam: 'session', doel: 'Sessiebeheer voor formulieren en contactverzoeken', termijn: '2 uur' },
];

const ANALYTISCHE_COOKIES = [
  { naam: '_ga', doel: 'Google Analytics — onderscheidt unieke bezoekers', termijn: '2 jaar' },
  { naam: '_ga_*', doel: 'Google Analytics — behoudt sessiestatus', termijn: '2 jaar' },
  { naam: '_gid', doel: 'Google Analytics — onderscheidt unieke bezoekers', termijn: '24 uur' },
];

const MARKETING_COOKIES = [
  { naam: 'Momenteel niet actief', doel: 'Staterra plaatst op dit moment geen marketing cookies', termijn: '\u2014' },
];

const BROWSERS = [
  { naam: 'Google Chrome', pad: 'Instellingen \u2192 Privacy en beveiliging \u2192 Cookies en andere sitegegevens' },
  { naam: 'Mozilla Firefox', pad: 'Instellingen \u2192 Privacy & Beveiliging \u2192 Cookies en sitegegevens' },
  { naam: 'Microsoft Edge', pad: 'Instellingen \u2192 Cookies en sitetoestemmingen' },
  { naam: 'Safari', pad: 'Voorkeuren \u2192 Privacy \u2192 Websitegegevens beheren' },
];

// ── Herbruikbare subcomponenten ───────────────────────────────

function CookieTabel({ rows }: { rows: { naam: string; doel: string; termijn: string }[] }) {
  return (
    <div className="overflow-x-auto my-5 rounded-[12px] border border-neutral-200">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="bg-neutral-50 border-b border-neutral-200">
            <th className="text-left px-4 py-3 font-semibold text-brand-900 whitespace-nowrap">Cookie</th>
            <th className="text-left px-4 py-3 font-semibold text-brand-900">Doel</th>
            <th className="text-left px-4 py-3 font-semibold text-brand-900 whitespace-nowrap">Bewaartermijn</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <tr key={row.naam} className="hover:bg-neutral-50 transition-colors duration-[120ms]">
              <td className="px-4 py-3 font-mono text-caption text-neutral-800 whitespace-nowrap align-top">
                {row.naam}
              </td>
              <td className="px-4 py-3 text-neutral-700 align-top">{row.doel}</td>
              <td className="px-4 py-3 text-neutral-500 whitespace-nowrap align-top">{row.termijn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectieKop({ nummer, titel }: { nummer: string; titel: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span aria-hidden="true" className="flex-shrink-0 font-heading font-bold text-h4 text-brand-200">
        {nummer}
      </span>
      <h2 className="font-heading text-[1.375rem] font-semibold text-neutral-950 leading-snug">
        {titel}
      </h2>
    </div>
  );
}

function CategorieBlok({
  titel,
  badge,
  badgeColor,
  beschrijving,
  rows,
  noot,
}: {
  titel: string;
  badge: string;
  badgeColor: string;
  beschrijving: string;
  rows: { naam: string; doel: string; termijn: string }[];
  noot?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2.5">
        <h3 className="font-heading text-lg font-semibold text-neutral-950">{titel}</h3>
        <span className={`text-caption font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <p className="text-body-sm text-neutral-700 leading-relaxed mb-1">{beschrijving}</p>
      <CookieTabel rows={rows} />
      {noot && (
        <p className="text-caption text-neutral-500 italic mt-2 flex items-start gap-1.5">
          <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          {noot}
        </p>
      )}
    </div>
  );
}

// ── Pagina ────────────────────────────────────────────────────

export default function CookiesPage() {
  const { showSettings } = useCookieConsent();

  return (
    <>
      <PageMeta title="Cookiebeleid" />
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="border-b border-neutral-200 bg-neutral-50 py-14 lg:py-20"
        aria-label="Cookiebeleid"
      >
        <Container variant="content">
          <div className="max-w-[680px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
              Juridisch
            </span>
            <h1 className="font-heading text-h1 font-semibold text-neutral-950 mb-4 leading-[1.05]">
              Cookiebeleid
            </h1>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-6">
              Staterra respecteert uw privacy. Op deze pagina leest u welke cookies
              wij gebruiken, waarom, en hoe u uw voorkeuren kunt aanpassen.
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                AVG / ePrivacy-richtlijn
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Hoofdcontent ────────────────────────────────────── */}
      <Container variant="content" className="py-12 lg:py-20">
        <div className="max-w-[760px]">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-caption text-neutral-500 mb-10" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-700 transition-colors duration-[150ms]">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-700">Cookiebeleid</span>
          </nav>

          {/* § 1 */}
          <section id="wat-zijn-cookies" className="mb-10 scroll-mt-28">
            <SectieKop nummer="1" titel="Wat zijn cookies?" />
            <p className="text-body-sm text-neutral-700 leading-relaxed">
              Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer
              u onze website bezoekt. Ze helpen de website goed te laten functioneren, de
              gebruikerservaring te verbeteren en ons inzicht te geven in hoe de website
              wordt gebruikt.
            </p>
          </section>

          {/* § 2 */}
          <section id="welke-cookies" className="mb-10 scroll-mt-28">
            <SectieKop nummer="2" titel="Welke cookies gebruikt Staterra?" />
            <p className="text-body-sm text-neutral-700 leading-relaxed mb-6">
              Staterra gebruikt drie categorieën cookies:
            </p>

            <CategorieBlok
              titel="Functionele cookies"
              badge="Altijd actief"
              badgeColor="bg-emerald-100 text-emerald-800"
              beschrijving="Deze cookies zijn noodzakelijk voor het goed functioneren van de website. Zonder deze cookies werken basisfuncties zoals paginanavigatie, formulierverwerking en sessiebeheer niet correct."
              rows={FUNCTIONELE_COOKIES}
            />

            <CategorieBlok
              titel="Analytische cookies"
              badge="Optioneel"
              badgeColor="bg-brand-100 text-brand-700"
              beschrijving="Deze cookies helpen ons inzicht te krijgen in het gebruik van de website, zodat we deze kunnen verbeteren. De gegevens worden geanonimiseerd verwerkt."
              rows={ANALYTISCHE_COOKIES}
              noot="Analytische cookies worden alleen geplaatst als u hiervoor toestemming geeft via de cookie-banner."
            />

            <CategorieBlok
              titel="Marketing cookies"
              badge="Optioneel"
              badgeColor="bg-neutral-100 text-neutral-600"
              beschrijving="Deze cookies worden gebruikt om relevante content en informatie te tonen via externe diensten. Ze zijn standaard uitgeschakeld."
              rows={MARKETING_COOKIES}
              noot="Mochten wij in de toekomst marketingcookies inzetten, dan worden deze eerst aan dit overzicht toegevoegd en wordt uw toestemming gevraagd."
            />
          </section>

          {/* § 3 */}
          <section id="voorkeuren" className="mb-10 scroll-mt-28">
            <SectieKop nummer="3" titel="Uw voorkeuren aanpassen" />
            <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
              U kunt uw cookievoorkeuren op elk moment aanpassen door op het cookie-icoon
              linksonder in uw scherm te klikken, of via de knop hieronder.
            </p>
            <button
              type="button"
              onClick={showSettings}
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-5 py-3 text-body-sm font-medium text-white hover:bg-brand-900 transition-colors duration-[180ms]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.34-.02-.674-.057-1.002a1.5 1.5 0 01-1.943-1.44 1.5 1.5 0 01.057-.408A8.003 8.003 0 0012 4a1.5 1.5 0 01-.002-2zm-2.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm2-5a1 1 0 110-2 1 1 0 010 2zm-5 4a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              Cookievoorkeuren aanpassen
            </button>
          </section>

          {/* § 4 */}
          <section id="verwijderen" className="mb-10 scroll-mt-28">
            <SectieKop nummer="4" titel="Cookies verwijderen" />
            <p className="text-body-sm text-neutral-700 leading-relaxed mb-5">
              U kunt cookies ook verwijderen via uw browser. Hieronder vindt u instructies
              voor de meest gebruikte browsers:
            </p>
            <ul className="space-y-3 mb-5">
              {BROWSERS.map((b) => (
                <li key={b.naam} className="flex items-start gap-3 text-body-sm">
                  <span aria-hidden="true" className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="text-neutral-700">
                    <strong className="font-semibold text-neutral-950">{b.naam}:</strong>{' '}
                    {b.pad}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-body-sm text-neutral-500 leading-relaxed p-4 rounded-[10px] bg-neutral-50 border border-neutral-200">
              Na het verwijderen van cookies wordt u bij uw volgende bezoek opnieuw gevraagd
              om uw voorkeuren in te stellen.
            </p>
          </section>

          {/* § 5 */}
          <section id="contact" className="mb-10 scroll-mt-28">
            <SectieKop nummer="5" titel="Contact" />
            <p className="text-body-sm text-neutral-700 leading-relaxed mb-4">
              Heeft u vragen over ons cookiebeleid? Neem contact met ons op:
            </p>
            <div className="rounded-[14px] border border-neutral-200 bg-neutral-50 p-6 text-body-sm text-neutral-700 leading-relaxed">
              <strong className="block font-semibold text-neutral-950 mb-3">Staterra B.V.</strong>
              <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1.5">
                <dt className="text-neutral-500">Adres</dt>
                <dd>Stadsplateau 27, 3521 AZ Utrecht</dd>
                <dt className="text-neutral-500">E-mail</dt>
                <dd>
                  <a href="mailto:contact@staterra.nl" className="text-brand-700 hover:underline">
                    contact@staterra.nl
                  </a>
                </dd>
                <dt className="text-neutral-500">Website</dt>
                <dd>
                  <a href="https://staterra.nl" className="text-brand-700 hover:underline">
                    staterra.nl
                  </a>
                </dd>
              </dl>
            </div>
          </section>

          {/* § 6 */}
          <section id="wijzigingen" className="mb-10 scroll-mt-28">
            <SectieKop nummer="6" titel="Wijzigingen" />
            <p className="text-body-sm text-neutral-700 leading-relaxed">
              Dit cookiebeleid is voor het laatst bijgewerkt op{' '}
              <time dateTime="2025-01">januari 2025</time>. Staterra behoudt
              zich het recht voor om dit beleid te wijzigen. Wijzigingen worden
              op deze pagina gepubliceerd.
            </p>
          </section>

          {/* Gerelateerde links */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-caption font-semibold uppercase tracking-widest text-neutral-500 mb-4">
              Zie ook
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[150ms]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Privacyverklaring
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[150ms]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Contactpagina
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </>
  );
}
