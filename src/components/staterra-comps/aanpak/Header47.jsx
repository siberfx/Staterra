"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

/** Compacte visuele weergave van de drie fasen (hero-ondersteuning). */
function AanpakHeroPhaseRail() {
  const steps = [
    { n: 1, label: "Verkenning" },
    { n: 2, label: "MVP" },
    { n: 3, label: "Product" },
  ];
  return (
    <div
      className="mt-8 w-full max-w-lg md:mt-10"
      role="img"
      aria-label="Drie stappen: verkenning, MVP, volledig product"
    >
      <div className="flex w-full items-center gap-1 sm:gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex shrink-0 flex-col items-center gap-2.5">
              <div className="flex size-11 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-bold text-primary shadow-sm sm:size-12 sm:text-base">
                {s.n}
              </div>
              <span className="max-w-[4.5rem] text-center text-[11px] font-semibold leading-tight text-text-secondary sm:max-w-[6rem] sm:text-xs md:text-sm">
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div
                className="mb-7 h-0.5 min-h-px flex-1 bg-primary/25 sm:mb-8"
                aria-hidden
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const heroSectionClass =
  "py-20 md:py-28 lg:py-36 xl:py-40 min-h-[min(52vh,520px)] md:min-h-[min(48vh,480px)] flex flex-col justify-center";

export function Header47({ hero: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;

    return (
      <section id="relume" className={heroSectionClass}>
        <div className="w-full">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 lg:gap-20">
            <div className="w-full max-w-xl md:max-w-lg">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl md:text-8xl lg:text-9xl xl:text-10xl">
                {c.title}
              </h1>
            </div>
            <div className="flex w-full max-w-xl flex-col md:max-w-lg">
              {c.subtitle ? (
                <p className="text-base leading-relaxed text-text-primary md:text-md">
                  {c.subtitle}
                </p>
              ) : null}
              <AanpakHeroPhaseRail />
              <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
                {c.cta_primary_text ? (
                  <CtaFromUrl
                    url={c.cta_primary_url}
                    variant="primary"
                    title={c.cta_primary_text}
                  >
                    {c.cta_primary_text}
                  </CtaFromUrl>
                ) : null}
                {c.cta_secondary_text ? (
                  <CtaFromUrl
                    url={c.cta_secondary_url}
                    variant="secondary"
                    title={c.cta_secondary_text}
                  >
                    {c.cta_secondary_text}
                  </CtaFromUrl>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className={heroSectionClass}>
      <div className="w-full">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 lg:gap-20">
          <div className="w-full max-w-xl md:max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Werkwijze</p>
            <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl md:text-8xl lg:text-9xl xl:text-10xl">
              Onze aanpak
            </h1>
          </div>
          <div className="flex w-full max-w-xl flex-col md:max-w-lg">
            <p className="text-base font-medium leading-relaxed text-text-primary md:text-lg">
              Van vraagstuk naar werkend systeem — in maanden, niet jaren
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-primary md:text-md">
              Voorspelbaar, snel en met volledige regie over uw oplossing. Geen
              lange trajecten, maar direct resultaat dat gebruikt wordt binnen
              uw organisatie.
            </p>
            <AanpakHeroPhaseRail />
            <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
              <Button title="Start verkenning">Start verkenning</Button>
              <Button title="Verkennen" variant="secondary">
                Verkennen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
