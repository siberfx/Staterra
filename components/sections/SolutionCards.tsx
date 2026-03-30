import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { mapMenuUrl } from '@/lib/cms';
import type { HomepageResponse } from '@/lib/types';

interface SolutionCardsProps {
  data: HomepageResponse['feature_cards'];
}

const ICON_PATHS: Record<string, React.ReactNode> = {
  rocket: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7a14.93 14.93 0 005.84-2.58"
    />
  ),
  handshake: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  ),
  share: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
    />
  ),
};

function iconForCard(index: number): React.ReactNode {
  const keys = Object.keys(ICON_PATHS);
  const path = ICON_PATHS[keys[index % keys.length]];
  return (
    <svg
      className="w-6 h-6 text-brand-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export function SolutionCards({ data }: SolutionCardsProps) {
  if (!data?.cards?.length) return null;

  return (
    <section
      className="bg-brand-100 py-16 lg:py-24"
      aria-labelledby="solutions-heading"
    >
      <Container variant="content">
        {data.title && (
          <div className="text-center mb-12">
            <h2
              id="solutions-heading"
              className="font-heading text-h2 font-semibold text-neutral-950"
            >
              {data.title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.cards.map((card, i) => {
            const href = mapMenuUrl(card.link_url);
            return (
              <Card
                key={i}
                padding="loose"
                className="flex flex-col group"
              >
                {/* Icoonbadge */}
                <div className="w-12 h-12 rounded-[10px] bg-brand-100 flex items-center justify-center mb-6 group-hover:bg-brand-200 transition-colors duration-[180ms]">
                  {iconForCard(i)}
                </div>

                <h3 className="font-heading text-h4 font-semibold text-neutral-950 mb-3">
                  {card.title}
                </h3>

                <p className="text-body-sm text-neutral-700 leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>

                {card.link_text && (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-brand-700 hover:text-brand-900 transition-colors duration-[180ms] mt-auto"
                    aria-label={`${card.link_text} — ${card.title}`}
                  >
                    {card.link_text}
                    <svg
                      className="w-4 h-4 transition-transform duration-[180ms] group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                )}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
