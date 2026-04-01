"use client";

import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout358({ werkwijze: c, apiOnly = false } = {}) {
  if (apiOnly) {
    const card = c?.card;
    if (!String(c?.title ?? "").trim() || !card) return null;
  }

  if (apiOnly) {
    const card = c.card;
    const img = card.image_url?.trim() || PLACEHOLDER;
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto max-w-lg text-center">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 border border-border-primary md:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
              <div>
                {card.badge ? (
                  <p className="mb-2 text-sm font-semibold">{card.badge}</p>
                ) : null}
                <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                  {card.title}
                </h3>
                {card.subtitle ? <p>{card.subtitle}</p> : null}
              </div>
              {card.cta_text ? (
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <CtaFromUrl
                    url={card.cta_url}
                    variant="secondary"
                    title={card.cta_text}
                  >
                    {card.cta_text}
                  </CtaFromUrl>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <img
                src={img}
                className="size-full object-cover"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Werkwijze</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Samen bouwen aan resultaat
            </h2>
            <p className="md:text-md">Uw team werkt vanaf dag één actief mee</p>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 border border-border-primary md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div>
              <p className="mb-2 text-sm font-semibold">Samen</p>
              <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                Dit is geen outsourcing
              </h3>
              <p>
                Traditionele IT-projecten worden gebouwd op afstand en
                opgeleverd aan het einde. Wij bouwen samen met uw team — vanaf
                dag één. Uw mensen beslissen mee, zien voortgang en gebruiken
                het systeem terwijl het ontstaat.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <CtaFromUrl
                url="#"
                variant="secondary"
                title="Hoe we samenwerken"
              >
                Hoe we samenwerken
              </CtaFromUrl>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="size-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
