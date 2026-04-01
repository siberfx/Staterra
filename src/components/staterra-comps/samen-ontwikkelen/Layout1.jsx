"use client";

import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout1({ keuze: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
  }

  if (apiOnly) {
    const img = c.image_url?.trim() || PLACEHOLDER;
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div>
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h1>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
              {c.cta_text ? (
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
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
            <div>
              <img
                src={img}
                className="w-full object-cover"
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
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Keuze</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Wanneer deze aanpak voor u werkt
            </h1>
            <p className="md:text-md">
              Deze aanpak werkt voor u als u niet wilt wachten op lange
              IT-trajecten, maar snel een werkende oplossing wilt die binnen uw
              organisatie blijft passen. Dit is geen traject op afstand, maar
              samenwerking met uw team vanaf dag één.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <CtaFromUrl url="#" variant="secondary" title="Start verkenning">
                Start verkenning
              </CtaFromUrl>
            </div>
          </div>
          <div>
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
