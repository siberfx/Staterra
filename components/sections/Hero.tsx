import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { mapMenuUrl } from '@/lib/cms';
import type { HomepageResponse } from '@/lib/types';

interface HeroProps {
  data: HomepageResponse['hero'];
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-brand-100 pt-12 pb-16 lg:pt-20 lg:pb-24"
      aria-label="Introductie"
    >
      {/* Subtiele achtergrondvorm */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle, #6CB6D9 0%, transparent 70%)',
        }}
      />

      <Container variant="content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Tekst */}
          <div className="order-2 lg:order-1">
            {data.label && (
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-4">
                {data.label}
              </span>
            )}

            <h1 className="font-heading text-h1 font-semibold text-neutral-950 mb-6 leading-[1.05]">
              {data.heading}
            </h1>

            <p className="text-body-lg text-neutral-700 mb-8 leading-relaxed">
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
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
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

          {/* Afbeelding */}
          {data.image && (
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_16px_48px_rgba(22,62,116,0.12)]">
                <Image
                  src={data.image}
                  alt="Staterra — professionals in gesprek over digitale oplossingen voor de overheid"
                  width={600}
                  height={440}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Gradient: linkerrand versmelt met de brand-100 sectieachtergrond */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                  style={{
                    background:
                      'linear-gradient(to right, #F4F8FB 0%, transparent 100%)',
                  }}
                />
                {/* Subtiele tint-overlay voor illustraties: geeft ze een "foto-achtige" sfeer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(22,62,116,0.04) 0%, rgba(108,182,217,0.06) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>
              {/* Decoratief accent */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-[16px] bg-brand-200 -z-10"
              />
              {/* Decoratief accent rechtsboven */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-brand-400/20 -z-10 hidden lg:block"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
