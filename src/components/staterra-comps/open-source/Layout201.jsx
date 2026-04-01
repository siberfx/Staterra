"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { IconOrFa, pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout201({ contrast: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (items.length < 2) return null;
    const heroImg = pickImg(c, PLACEHOLDER);

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
            <div className="order-2 md:order-1">
              <img
                src={heroImg}
                className="w-full object-cover"
                alt=""
              />
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
              <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                {items.slice(0, 2).map((item, i) => (
                  <div key={i}>
                    <div className="mb-3 md:mb-4">
                      <IconOrFa icon={item.icon} />
                    </div>
                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                      {item.title}
                    </h6>
                    <p>{item.subtitle ?? item.description ?? ""}</p>
                  </div>
                ))}
              </div>
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
            <p className="mb-3 font-semibold md:mb-4">Contrast</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Waarom open source u meer controle geeft
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Gesloten systemen maken u afhankelijk van één leverancier. Open
              source geeft u controle, transparantie en de vrijheid om uw
              systemen zelf te bepalen.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Gesloten systemen
                </h6>
                <p>
                  U bent afhankelijk van contracten, licenties en de keuzes van
                  één leverancier. Aanpassen kost tijd en geld — en ligt niet in
                  uw controle.
                </p>
              </div>
              <div>
                <div className="mb-3 md:mb-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    className="size-12"
                    alt="Relume logo"
                  />
                </div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Open source
                </h6>
                <p>
                  U bezit het systeem en bepaalt hoe het zich ontwikkelt.
                  Volledig inzicht, geen verborgen processen en geen
                  afhankelijkheid.
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
