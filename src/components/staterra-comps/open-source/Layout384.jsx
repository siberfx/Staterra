"use client";

import React from "react";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg";
const PLACEHOLDER2 =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-bento-portrait2.svg";

export function Layout384({ toepassingen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    const a = items[0];
    const b = items[1];

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            {c.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
            ) : null}
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {c.title}
            </h1>
            {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {a ? (
              <div className="flex flex-col border border-border-primary">
                <div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8">
                  <div>
                    {a.badge ? (
                      <p className="mb-2 font-semibold">{a.badge}</p>
                    ) : null}
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      {a.title}
                    </h2>
                    <p>{a.subtitle ?? a.description ?? ""}</p>
                  </div>
                </div>
                <div className="flex size-full flex-col items-center justify-center self-start">
                  <img
                    src={pickImg(a, PLACEHOLDER)}
                    alt=""
                    className="size-full object-cover"
                  />
                </div>
              </div>
            ) : null}
            {b ? (
              <div className="grid auto-cols-fr grid-cols-1 flex-col border border-border-primary sm:grid-cols-2 lg:col-span-2">
                <div className="block p-6 sm:flex sm:flex-col sm:justify-center md:p-8">
                  <div>
                    {b.badge ? (
                      <p className="mb-2 font-semibold">{b.badge}</p>
                    ) : null}
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      {b.title}
                    </h2>
                    <p>{b.subtitle ?? b.description ?? ""}</p>
                  </div>
                </div>
                <div className="flex size-full flex-col items-center justify-center self-start">
                  <img
                    src={pickImg(b, PLACEHOLDER2)}
                    alt=""
                    className="size-full object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Toepassingen</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Twee manieren om met open source te starten
          </h1>
          <p className="md:text-md">
            Afhankelijk van uw situatie kiest u hoe u open source toepast —
            bouwen vanaf nul of starten met een bestaande oplossing.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <div className="flex flex-col border border-border-primary">
            <div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8">
              <div>
                <p className="mb-2 font-semibold">Nieuw</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Nieuwe systemen, vanaf de basis open source
                </h2>
                <p>
                  We ontwikkelen samen een oplossing die volledig aansluit op uw
                  organisatie — open source vanaf dag één. Volledig maatwerk,
                  maximale controle en toekomstbestendig.
                </p>
              </div>
            </div>
            <div className="flex size-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                alt="Relume placeholder image 1"
                className="size-full object-cover"
              />
            </div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 flex-col border border-border-primary sm:grid-cols-2 lg:col-span-2">
            <div className="block p-6 sm:flex sm:flex-col sm:justify-center md:p-8">
              <div>
                <p className="mb-2 font-semibold">Bestaand</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Bewezen open source oplossingen inzetten
                </h2>
                <p>
                  We implementeren en integreren bestaande oplossingen zoals
                  Nextcloud, OpenStack of andere tools — aangepast aan uw
                  context. Snelle start, minder risico en direct gebruik van
                  bestaande functionaliteit.
                </p>
              </div>
            </div>
            <div className="flex size-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-bento-portrait2.svg"
                alt="Relume placeholder image 2"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
