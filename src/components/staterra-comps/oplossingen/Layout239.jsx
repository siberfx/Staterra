"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { CtaFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg";

export function Layout239({ proces: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim() || !Array.isArray(c?.items) || !c.items.length)
      return null;
  }

  if (apiOnly) {
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
              <div className="w-full max-w-lg">
                {c.badge ? (
                  <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
                ) : null}
                <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  {c.title}
                </h2>
                {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
              </div>
            </div>
            <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
              {c.items.map((item, i) => (
                <div
                  key={i}
                  className="flex w-full flex-col items-center text-center"
                >
                  <div className="rb-6 mb-6 w-full md:mb-8">
                    <img
                      src={
                        (item.image_url ?? item.imageUrl ?? "").trim() ||
                        PLACEHOLDER
                      }
                      alt=""
                      className="mx-auto w-full max-w-md object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                    {item.title}
                  </h3>
                  {item.subtitle ? <p>{item.subtitle}</p> : null}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
              {c.cta_secondary_text ? (
                <CtaFromUrl
                  url={c.cta_secondary_url}
                  variant="secondary"
                  title={c.cta_secondary_text}
                >
                  {c.cta_secondary_text}
                </CtaFromUrl>
              ) : null}
              {c.cta_primary_text ? (
                <CtaFromUrl
                  url={c.cta_primary_url}
                  variant="link"
                  size="link"
                  title={c.cta_primary_text}
                  iconRight={<RxChevronRight />}
                >
                  {c.cta_primary_text}
                </CtaFromUrl>
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
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Proces</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Van vraagstuk naar werkend product
              </h2>
              <p className="md:text-md">
                Geen lange planningsfases. Geen onzekere timelines. We werken in
                drie duidelijke fasen met direct resultaat.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase één: verkenning en ontwerp
              </h3>
              <p>
                We brengen uw vraagstuk snel terug tot een concrete aanpak. Geen
                uitgebreide plannen, maar direct inzicht in wat gebouwd moet
                worden.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase twee: werkend prototype in 3 maanden
              </h3>
              <p>
                Binnen drie maanden gebruikt u een werkende oplossing. We bouwen
                terwijl u gebruikt — niet eerst ontwerpen en dan pas opleveren.
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="rb-6 mb-6 md:mb-8">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase drie: volledig product in 9 maanden
              </h3>
              <p>
                De oplossing groeit door naar een volledig product met
                integraties en compliance. U behoudt eigenaarschap en kunt het
                systeem zelfstandig beheren en doorontwikkelen.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
            <Button variant="secondary">Terug naar oplossingen</Button>
            <Button iconRight={<RxChevronRight />} variant="link" size="link">
              Start verkenning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
