import { Button } from '@/components/ui/Button';
import { mapMenuUrl } from '@/services/cms';
import type { HomepageResponse } from '@/lib/types';

interface HeroProps {
  data: HomepageResponse['hero'];
}

export function Hero({ data }: HeroProps) {
  return (
    <section aria-label="Introductie">
      {/*
        Geen py-* op de section — de grid bepaalt de hoogte.
        min-h groeit mee: 76vh op mobile → 84vh op md → 93vh op desktop,
        maar nooit meer dan respectievelijk 620 / 800 / 1000px.
      */}
      <div className="grid grid-cols-1 bg-brand-100 min-h-[min(76vh,620px)] md:min-h-[min(84vh,800px)] lg:min-h-[min(93vh,1000px)] lg:grid-cols-2">

        {/* ── Linkerkolom: tekst ───────────────────────────────────
            xl:pl-[max(...)] centreert de content met de page-container
            breedte op zeer brede schermen, net als een max-width: 1280px
            container zou doen.                                          */}
        <div className="flex min-w-0 flex-col justify-center px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] xl:pr-12">
          <div className="max-w-xl">

            {data.label && (
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
                {data.label}
              </span>
            )}

            <h1 className="type-h1 text-neutral-950 mb-6">
              {data.heading}
            </h1>

            <p className="type-body-lg text-neutral-700 mb-8">
              {data.paragraph}
            </p>

            {data.bullets && data.bullets.length > 0 && (
              <ul className="space-y-3 mb-10" aria-label="Kernpunten">
                {data.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-200 flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-brand-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-body-sm text-neutral-700">
                      {bullet.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {data.cta_primary_text && (
                <Button
                  as="link"
                  href={mapMenuUrl(data.cta_primary_url)}
                  variant="primary"
                  size="lg"
                >
                  {data.cta_primary_text}
                </Button>
              )}
              {data.cta_secondary_text && (
                <Button
                  as="link"
                  href={mapMenuUrl(data.cta_secondary_url)}
                  variant="secondary"
                  size="lg"
                >
                  {data.cta_secondary_text.replace(' \u2192', '')}
                  <span aria-hidden="true"> →</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ── Rechterkolom: foto edge-to-edge ──────────────────────
            position: relative + img fill → foto vult de hele kolom.
            min-h op mobile zodat de foto niet te plat wordt.
            Geen rounded corners, geen shadow, geen card-effect.          */}
        {data.image ? (
          <div className="relative min-h-[min(45vh,420px)] w-full min-w-0 lg:min-h-0">
            <img
              src={data.image}
              alt="Staterra — professionals in gesprek over digitale oplossingen voor de overheid"
              width={960}
              height={640}
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        ) : (
          /* Fallback kleurblok als CMS geen afbeelding levert */
          <div className="bg-brand-200 min-h-[min(45vh,420px)] lg:min-h-0" aria-hidden="true" />
        )}

      </div>
    </section>
  );
}
