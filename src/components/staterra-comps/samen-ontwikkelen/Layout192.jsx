"use client";

import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout192({ methode: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
  }

  if (apiOnly) {
    const img = c.image_url?.trim() || PLACEHOLDER;
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div className="order-2 md:order-1">
              <img
                src={img}
                className="w-full object-cover"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
              {c.cta_text ? (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  <CtaFromUrl
                    url={c.cta_url}
                    variant="secondary"
                    title={c.cta_text}
                  >
                    {c.cta_text}
                  </CtaFromUrl>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-3 font-semibold md:mb-4">Methode</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Alle oplossingen, dezelfde aanpak
            </h2>
            <p className="md:text-md">
              Of het nu Woo, AI of een ander systeem is — we bouwen altijd
              samen. Niet eerst plannen, maar direct naar een werkende
              oplossing.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <CtaFromUrl url="#" variant="secondary" title="Bekijk aanpak">
                Bekijk aanpak
              </CtaFromUrl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
