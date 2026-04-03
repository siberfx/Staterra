import type { HomepageResponse } from '@/lib/types';
import { Container } from '@/components/ui/Container';

interface UserFeaturesBlockProps {
  data: HomepageResponse['user_features'];
}

function CheckIcon() {
  return (
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
  );
}

export function UserFeaturesBlock({ data }: UserFeaturesBlockProps) {
  const hasLeft = data.left_items?.length > 0;
  const hasRight = data.right_items?.length > 0;
  if (!hasLeft && !hasRight) return null;

  return (
    <section
      className="bg-brand-100 py-16 lg:py-20"
      aria-labelledby="user-features-heading"
    >
      <Container variant="content">

        {/* ── Koptekst ──────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
            Wat u eraan heeft
          </span>
          <h2
            id="user-features-heading"
            className="font-heading text-h2 font-semibold text-neutral-950 leading-[1.1]"
          >
            Voordelen voor organisatie én uitvoering
          </h2>
        </div>

        {/* ── Twee kolommen ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Linkerkolom */}
          {hasLeft && (
            <div className="rounded-[20px] bg-white border border-neutral-200 shadow-[0_8px_24px_rgba(22,62,116,0.05)] p-8">
              {/* Kolomkoptekst */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-neutral-100">
                <span
                  className="w-10 h-10 rounded-[10px] bg-brand-700 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </span>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950">
                  {data.left_title}
                </h3>
              </div>

              <ul className="space-y-3.5" aria-label={data.left_title}>
                {data.left_items.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-body-sm text-neutral-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rechterkolom */}
          {hasRight && (
            <div className="rounded-[20px] bg-white border border-neutral-200 shadow-[0_8px_24px_rgba(22,62,116,0.05)] p-8">
              {/* Kolomkoptekst */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-neutral-100">
                <span
                  className="w-10 h-10 rounded-[10px] bg-brand-600 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <h3 className="font-heading text-h4 font-semibold text-neutral-950">
                  {data.right_title}
                </h3>
              </div>

              <ul className="space-y-3.5" aria-label={data.right_title}>
                {data.right_items.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-body-sm text-neutral-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
