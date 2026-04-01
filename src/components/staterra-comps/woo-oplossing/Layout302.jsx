"use client";

import React from "react";
import { IconOrFa } from "../IconOrFa";

export function Layout302({ organisatie: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="max-w-lg">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
            {items.map((item, i) => (
              <div key={i}>
                <div className="mb-5 md:mb-6">
                  <IconOrFa icon={item.icon} />
                </div>
                <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                  {item.title}
                </h3>
                <p>{item.description ?? item.subtitle ?? ""}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4 md:mt-18 lg:mt-20" />
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">Voor uw organisatie</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Hoe de oplossing aansluit op uw behoeften
            </h2>
            <p className="md:text-md">
              Of u nu rijksoverheid, provincie, gemeente of waterschap bent — de
              uitdaging is hetzelfde: Woo-verzoeken verwerken zonder vertraging,
              handmatig werk en verlies van overzicht.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Voor rijksoverheid
            </h3>
            <p>
              Schaal, veiligheid en compliance op nationaal niveau. Integreert
              met bestaande systemen en ondersteunt complexe processen.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Voor provincies
            </h3>
            <p>
              Efficiënt beheer van verzoeken met inzicht en controle.
              Transparantie richting burgers zonder extra werkdruk.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Voor gemeenten
            </h3>
            <p>
              Een oplossing die past bij uw schaal. Snel inzetbaar, zonder
              complexe implementaties.
            </p>
          </div>
          <div>
            <div className="mb-5 md:mb-6">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                className="size-12"
                alt="Relume logo 1"
              />
            </div>
            <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
              Voor waterschappen
            </h3>
            <p>
              Aansluiting op uw specifieke werkprocessen. Compliance en snelheid
              zonder maatwerktrajecten.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-4 md:mt-18 lg:mt-20" />
      </div>
    </section>
  );
}
