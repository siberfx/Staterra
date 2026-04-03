import { Link } from 'react-router-dom';
import type { HomepageResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';
import { mapMenuUrl } from '@/services/cms';

interface AboutBlockProps {
  data: HomepageResponse['about_opms'];
}

export function AboutBlock({ data }: AboutBlockProps) {
  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-labelledby="about-heading"
    >
      <Container variant="content">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">

          {/* ── Tekstkolom (60%) ──────────────────────────── */}
          <div className="order-2 lg:order-1 max-w-[600px]">
            {data.label && (
              <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-4">
                {data.label}
              </span>
            )}

            <h2
              id="about-heading"
              className="font-heading text-h2 font-semibold text-neutral-950 mb-5 leading-[1.1]"
            >
              {data.heading}
            </h2>

            <p className="text-body-lg text-neutral-700 leading-relaxed mb-8">
              {data.paragraph}
            </p>

            {/* Bullet-lijst */}
            {data.bullets && data.bullets.length > 0 && (
              <ul className="space-y-3.5 mb-10" aria-label="Kenmerken">
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-body-sm text-neutral-700 leading-relaxed">
                      {bullet.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            {data.link_text && data.link_url && (
              <Link
                to={mapMenuUrl(data.link_url)}
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors duration-[150ms] group"
              >
                {data.link_text}
                <svg
                  className="w-4 h-4 transition-transform duration-[150ms] group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* ── Afbeeldingkolom (40%) ─────────────────────── */}
          {data.image && (
            <div className="order-1 lg:order-2 w-full lg:w-[420px] flex-shrink-0 relative">
              {/* Lichtblauwe gradient achtergrond achter de afbeelding */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[24px] -z-10"
                style={{
                  background:
                    'linear-gradient(135deg, #F4F8FB 0%, #DCECF5 100%)',
                }}
              />

              <div className="relative rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(22,62,116,0.06)]">
                <img
                  src={data.image}
                  alt={data.heading}
                  width={420}
                  height={360}
                  className="w-full h-auto object-cover"
                />
                {/* Subtiele brand-tint overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(22,62,116,0.03) 0%, rgba(108,182,217,0.05) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
                {/* Gradient onderaan: afbeelding versmelt met caption */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(244,248,251,0.85) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Caption */}
              <p className="mt-3 text-center text-caption italic text-neutral-400">
                Samenwerking tussen Staterra en de overheid
              </p>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
