"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout216({ bewezen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    const img = pickImg(c, PLACEHOLDER);

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
            <div className="order-2 md:order-1">
              <img src={img} className="w-full object-cover" alt="" />
            </div>
            <div className="order-1 md:order-2">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? (
                <p className="mb-6 md:mb-8 md:text-md">{c.subtitle}</p>
              ) : null}
              {items.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                  {items.map((it, i) => (
                    <div key={i}>
                      {it.value ? (
                        <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                          {it.value}
                        </h3>
                      ) : null}
                      {it.description ? <p>{it.description}</p> : null}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold md:mb-4">Bewezen</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Dit werkt al in de praktijk
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              De Woo-oplossing van Staterra is geen belofte. Deze draait vandaag
              bij overheidsorganisaties met dezelfde uitdagingen als u.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  3 maanden
                </h3>
                <p>van vraagstuk naar werkend systeem in productie</p>
              </div>
              <div>
                <h3 className="mb-2 text-5xl font-bold md:text-7xl lg:text-8xl">
                  100%
                </h3>
                <p>
                  volledige controle over code en data binnen uw organisatie
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Start verkenning" variant="secondary">
                Start verkenning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
