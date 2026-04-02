import { Link } from 'react-router-dom';
import { mapMenuUrl } from '@/services/cms';
import type { FooterMenuResponse, SettingsResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

interface FooterProps {
  menu: FooterMenuResponse | null;
  settings: SettingsResponse | null;
}

const currentYear = new Date().getFullYear();

// ── Kolomtitels op basis van positie ─────────────────────────
// De CMS stuurt alleen een kolomnummer, geen titel.
const KOLOM_TITELS: Record<number, string> = {
  1: 'Oplossingen',
  2: 'Doelgroepen',
  3: 'Organisatie',
  4: 'Juridisch',
};

// ── Statische fallback-navigatie ──────────────────────────────
const FALLBACK_KOLOMMEN = [
  {
    titel: 'Oplossingen',
    links: [
      { href: '/woo-oplossing', label: 'Woo-oplossing' },
      { href: '/samen-ontwikkelen', label: 'Samen ontwikkelen' },
      { href: '/open-source', label: 'Open source' },
      { href: '/oplossingen', label: 'Alle oplossingen' },
    ],
  },
  {
    titel: 'Organisatie',
    links: [
      { href: '/over-ons', label: 'Over Staterra' },
      { href: '/aanpak', label: 'Onze aanpak' },
      { href: '/dienstverlening', label: 'Dienstverlening' },
      { href: '/kennisbank', label: 'Kennisbank' },
    ],
  },
  {
    titel: 'Juridisch',
    links: [
      { href: '/privacy', label: 'Privacybeleid' },
      { href: '/legal/algemene-voorwaarden', label: 'Algemene voorwaarden' },
    ],
  },
];

export function Footer({ menu, settings }: FooterProps) {
  const cmsKolommen = menu?.columns ?? [];
  const site = settings?.site;

  const copyright =
    site?.copyright_footer?.replace('{{year}}', String(currentYear)) ??
    `© ${currentYear} Staterra B.V. Alle rechten voorbehouden.`;

  return (
    <footer
      role="contentinfo"
      className="bg-brand-900 text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Voettekst
      </h2>

      {/* ── Hoofd-rij ──────────────────────────────────────── */}
      <Container variant="page" className="pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">

          {/* ── Linkerkolom: merk + contact ──────────────────── */}
          <div>
            {/* Logo / naam */}
            {site?.footer_logo ? (
              <img
                src={site.footer_logo}
                alt={site?.name ?? 'Staterra'}
                className="object-contain mb-6 h-10 w-auto"
              />
            ) : (
              <span className="font-heading font-semibold text-h4 text-white block mb-6">
                Staterra
              </span>
            )}

            {/* Omschrijving */}
            <p className="text-body-sm text-brand-200/80 mb-7 leading-relaxed max-w-[260px]">
              {site?.description ??
                `Infrastructuurpartner voor de publieke sector. Open source Woo-compliance voor ${BESTUURSORGANEN_STATS.totaal} bestuursorganen.`}
            </p>

            {/* Contactgegevens — helder zichtbaar */}
            <div className="space-y-3">
              {site?.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-body-sm font-medium text-white hover:text-brand-400 transition-colors duration-[180ms] group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  {site.email}
                </a>
              )}
              {site?.phone && site.phone !== '+1234567890' && (
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 text-body-sm font-medium text-white hover:text-brand-400 transition-colors duration-[180ms] group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  {site.phone}
                </a>
              )}
              {site?.address && (
                <address className="flex items-start gap-3 text-body-sm text-brand-200/80 not-italic">
                  <span className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <span className="mt-1.5">{site.address}</span>
                </address>
              )}
            </div>
          </div>

          {/* ── Rechterkolom: navigatie + nieuwsbrief ────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Navigatiekolommen: CMS of fallback */}
            {cmsKolommen.length > 0 ? (
              cmsKolommen.map((kolom) => (
                <div key={kolom.column}>
                  <h3 className="text-caption font-semibold uppercase tracking-widest text-brand-400 mb-4">
                    {KOLOM_TITELS[kolom.column] ?? `Kolom ${kolom.column}`}
                  </h3>
                  <ul className="space-y-2.5">
                    {(kolom.links ?? []).map((item) => (
                      <li key={item.id}>
                        <Link
                          to={mapMenuUrl(item.url)}
                          className="text-body-sm text-brand-200/80 hover:text-white transition-colors duration-[180ms]"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              FALLBACK_KOLOMMEN.map((kolom) => (
                <div key={kolom.titel}>
                  <h3 className="text-caption font-semibold uppercase tracking-widest text-brand-400 mb-4">
                    {kolom.titel}
                  </h3>
                  <ul className="space-y-2.5">
                    {kolom.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className="text-body-sm text-brand-200/80 hover:text-white transition-colors duration-[180ms]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Nieuwsbrief-sectie ──────────────────────────── */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading font-semibold text-h5 text-white mb-2">
                Blijf op de hoogte
              </h3>
              <p className="text-body-sm text-brand-200/80 leading-relaxed">
                Praktische kennis over Woo-compliance en digitale publieke
                infrastructuur. Geen spam — alleen inhoud met waarde.
              </p>
            </div>
            <form
              action="/api/contact-form"
              method="POST"
              aria-label="Nieuwsbrief aanmelding"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="reden" value="Nieuwsbrief" />
              <label htmlFor="footer-email" className="sr-only">
                E-mailadres
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="uw@organisatie.nl"
                required
                autoComplete="email"
                className="flex-1 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2.5 text-body-sm text-white placeholder:text-brand-300/60 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 transition-colors"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-[10px] bg-brand-400 px-5 py-2.5 text-body-sm font-semibold text-brand-900 hover:bg-white hover:text-brand-900 transition-all duration-[180ms] whitespace-nowrap focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
              >
                Aanmelden
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Copyright */}
          <p className="text-caption text-brand-200/60 order-2 md:order-1">
            {copyright}
          </p>

          {/* Snelkoppelingen */}
          <nav
            className="order-1 md:order-2 flex flex-wrap justify-center gap-x-5 gap-y-1"
            aria-label="Voettekst navigatie"
          >
            {[
              { href: '/oplossingen', label: 'Oplossingen' },
              { href: '/aanpak', label: 'Aanpak' },
              { href: '/over-ons', label: 'Over ons' },
              { href: '/contact', label: 'Contact' },
              { href: '/kennisbank', label: 'Kennisbank' },
              { href: '/privacy', label: 'Privacy' },
            ].map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-caption text-brand-200/60 hover:text-white transition-colors duration-[180ms]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* KvK */}
          <p className="text-caption text-brand-200/60 order-3">
            Staterra B.V. — Utrecht
          </p>
        </div>
      </Container>
    </footer>
  );
}
