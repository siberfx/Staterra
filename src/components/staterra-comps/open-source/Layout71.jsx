"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

export function Layout71({ kern: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const bullets = Array.isArray(c.bullets) ? c.bullets : [];

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
            </div>
            <div>
              {c.subtitle ? (
                <p className="mb-5 md:mb-6 md:text-md">{c.subtitle}</p>
              ) : null}
              {bullets.length > 0 ? (
                <ul className="my-4 list-disc pl-5">
                  {bullets.map((b, i) => (
                    <li key={i} className="my-1 self-start pl-2">
                      <p>{b.text ?? b.title ?? ""}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {c.cta_primary_text ? (
                  <CtaFromUrl
                    url={c.cta_primary_url}
                    variant="secondary"
                    title={c.cta_primary_text}
                  >
                    {c.cta_primary_text}
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
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Kernstatement</p>
            <h2 className="text-5xl font-bold md:text-7xl lg:text-8xl">
              Alles wat wij bouwen is open source
            </h2>
          </div>
          <div>
            <p className="mb-5 md:mb-6 md:text-md">
              Open source is geen optie, maar de basis van hoe wij werken. Alles
              wat wij bouwen is vanaf het begin open en transparant — zodat u
              volledige controle houdt over uw systemen. We bouwen,
              implementeren én beheren open source oplossingen — zodat ze niet
              alleen werken, maar ook blijven werken.
            </p>
            <ul className="my-4 list-disc pl-5">
              <li className="my-1 self-start pl-2">
                <p>U bezit de code en bepaalt de richting</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>U houdt controle over uw data</p>
              </li>
              <li className="my-1 self-start pl-2">
                <p>U bent niet afhankelijk van één leverancier</p>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Samen ontwikkelen" variant="secondary">
                Samen ontwikkelen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
