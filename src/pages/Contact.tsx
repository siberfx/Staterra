import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContact, getSettings } from '@/services/cms';
import { PageMeta } from '@/components/PageMeta';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { ContactForm } from '@/components/forms/ContactForm';
import type { FaqItem } from '@/lib/types';

// ── Contactopties ─────────────────────────────────────────────

const CONTACT_OPTIES = [
  {
    label: 'E-mail',
    href: 'mailto:contact@staterra.nl',
    waarde: 'contact@staterra.nl',
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Adres',
    href: 'https://maps.app.goo.gl/staterra',
    waarde: 'Stadsplateau 27, 3521 AZ Utrecht',
    icoon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const REACTIETERMIJN = [
  { label: 'Reactietermijn', waarde: 'Binnen twee werkdagen' },
  { label: 'Eerste gesprek', waarde: 'Vrijblijvend en kosteloos' },
  { label: 'Verkenningsfase', waarde: '2 – 4 weken' },
];

// Dedupliceert FAQ-items op basis van vraag-tekst
function deduplicateFaq(items: FaqItem[]): FaqItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.question)) return false;
    seen.add(item.question);
    return true;
  });
}

export default function ContactPage() {
  const [contact, setContact] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    Promise.all([getContact(), getSettings()]).then(([contactData, settingsData]) => {
      setContact(contactData);
      setSettings(settingsData);
    });
  }, []);

  const subjects = contact?.subjects ?? [];
  const faqItems = deduplicateFaq(contact?.faqs?.items ?? []);
  const bannerUrl = contact?.banner;
  const email = settings?.site?.email ?? 'contact@staterra.nl';
  const phone = settings?.site?.phone;
  const address = settings?.site?.address ?? 'Stadsplateau 27, 3521 AZ Utrecht';

  // Overschrijf hardcoded contactopties met CMS-data indien beschikbaar
  const contactOpties = [
    {
      label: 'E-mail',
      href: `mailto:${email}`,
      waarde: email,
      icoon: CONTACT_OPTIES[0].icoon,
    },
    ...(phone && phone !== '+1234567890'
      ? [
          {
            label: 'Telefoon',
            href: `tel:${phone}`,
            waarde: phone,
            icoon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            ),
          },
        ]
      : []),
    {
      label: 'Adres',
      href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      waarde: address,
      icoon: CONTACT_OPTIES[1].icoon,
    },
  ];

  return (
    <>
      <PageMeta title="Contact" description="Neem contact op met Staterra. Binnen twee werkdagen een inhoudelijke reactie." />
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-brand-900 py-20 lg:py-28"
        aria-label="Contact"
      >
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt=""
            width={1920}
            height={600}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/30"
        />
        <Container variant="content" className="relative z-10">
          <div className="max-w-[640px]">
            <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-400 mb-5">
              Contact
            </span>
            <h1 className="font-heading text-h1 font-semibold text-white mb-5 leading-[1.05]">
              Een gesprek over uw vraagstuk
            </h1>
            <p className="text-body-lg text-brand-200 leading-relaxed">
              We denken graag met u mee. Of u nu een nieuwe digitale oplossing
              wilt bouwen, een open source platform wilt implementeren, of
              direct met onze Woo-oplossing wilt starten — vertel ons waar u
              staat, wij komen met een eerlijke verkenning.
            </p>

            {/* Reactietermijn-badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {REACTIETERMIJN.map((r) => (
                <div
                  key={r.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2"
                >
                  <span className="text-caption text-white/70">{r.label}:</span>
                  <span className="text-caption font-semibold text-white">{r.waarde}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Hoofd-layout: formulier + sidebar ──────────────── */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="contact-form-heading">
        <Container variant="content">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

            {/* ── Formulier (links) ── */}
            <div>
              <h2
                id="contact-form-heading"
                className="font-heading text-h3 font-semibold text-neutral-950 mb-2"
              >
                Stuur ons een bericht
              </h2>
              <p className="text-body-sm text-neutral-600 mb-8">
                Velden gemarkeerd met{' '}
                <span className="text-error font-semibold" aria-label="sterretje">*</span>{' '}
                zijn verplicht.
              </p>

              <Card hover={false} padding="loose">
                <ContactForm subjects={subjects} />
              </Card>
            </div>

            {/* ── Sidebar (rechts) ── */}
            <aside aria-label="Contactgegevens en informatie" className="space-y-6">

              {/* Contactgegevens */}
              <Card hover={false} padding="compact">
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-5">
                  Contactgegevens
                </h3>
                <ul className="space-y-4">
                  {contactOpties.map((o) => (
                    <li key={o.label}>
                      <a
                        href={o.href}
                        className="flex items-start gap-3 group"
                        target={o.href.startsWith('http') ? '_blank' : undefined}
                        rel={o.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded-[8px] bg-brand-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-200 transition-colors duration-[180ms]">
                          {o.icoon}
                        </span>
                        <div>
                          <span className="block text-caption text-neutral-500 mb-0.5">{o.label}</span>
                          <span className="block text-body-sm font-medium text-neutral-800 group-hover:text-brand-700 transition-colors duration-[180ms]">
                            {o.waarde}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Wat kunt u verwachten */}
              <Card hover={false} padding="compact" className="bg-brand-100 border-brand-200">
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-4">
                  Wat kunt u verwachten?
                </h3>
                <ol className="space-y-4">
                  {[
                    {
                      stap: '1',
                      titel: 'Bevestiging',
                      tekst: 'U ontvangt een automatische ontvangstbevestiging.',
                    },
                    {
                      stap: '2',
                      titel: 'Inhoudelijke reactie',
                      tekst: 'Binnen twee werkdagen neemt een adviseur contact op.',
                    },
                    {
                      stap: '3',
                      titel: 'Verkenningsgesprek',
                      tekst: 'Vrijblijvend gesprek over uw vraagstuk en mogelijke aanpak.',
                    },
                  ].map((item) => (
                    <li key={item.stap} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-700 text-white text-caption font-semibold flex items-center justify-center"
                      >
                        {item.stap}
                      </span>
                      <div>
                        <span className="block text-body-sm font-semibold text-neutral-950">
                          {item.titel}
                        </span>
                        <span className="block text-caption text-neutral-600 mt-0.5">
                          {item.tekst}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* Links naar andere pagina's */}
              <Card hover={false} padding="compact">
                <h3 className="font-heading text-h5 font-semibold text-neutral-950 mb-4">
                  Meer lezen
                </h3>
                <ul className="space-y-2">
                  {[
                    { to: '/woo-oplossing', label: 'De Woo-oplossing (oPub/OPMS)' },
                    { to: '/aanpak', label: 'Onze aanpak in 3 fasen' },
                    { to: '/samen-ontwikkelen', label: 'Samen nieuwe oplossingen bouwen' },
                    { to: '/over-ons', label: 'Over Staterra' },
                  ].map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex items-center gap-2 text-body-sm text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] group"
                      >
                        <svg
                          className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-[180ms] group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── 3. FAQ ────────────────────────────────────────────── */}
      {faqItems.length > 0 && (
        <section
          className="bg-brand-100 py-16 lg:py-24"
          aria-labelledby="contact-faq-heading"
        >
          <Container variant="content">
            <div className="text-center mb-10">
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
                {contact?.faqs?.title ?? 'Veelgestelde vragen'}
              </span>
              <h2
                id="contact-faq-heading"
                className="font-heading text-h2 font-semibold text-neutral-950 mb-3"
              >
                Antwoorden op uw vragen
              </h2>
              {contact?.faqs?.subtitle && (
                <p className="text-body text-neutral-700 max-w-[560px] mx-auto">
                  {contact.faqs.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <Card hover={false} padding="loose">
                <FaqAccordion items={faqItems.slice(0, Math.ceil(faqItems.length / 2))} />
              </Card>
              <Card hover={false} padding="loose">
                <FaqAccordion items={faqItems.slice(Math.ceil(faqItems.length / 2))} />
              </Card>
            </div>
          </Container>
        </section>
      )}

    </>
  );
}
