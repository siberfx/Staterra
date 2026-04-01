"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout192({ bewezen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const img = pickImg(c, PLACEHOLDER);

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div className="order-2 md:order-1">
              <img src={img} className="w-full object-cover" alt="" />
            </div>
            <div className="order-1 lg:order-2">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
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
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-3 font-semibold md:mb-4">Bewezen</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Al in gebruik binnen de overheid
            </h2>
            <p className="md:text-md">
              Dit is geen experiment. Open source oplossingen zoals
              documentplatformen (bijv. Nextcloud), cloud-infrastructuur
              (OpenStack) en sectorgerichte toepassingen worden al gebruikt
              binnen Nederlandse overheidsorganisaties. Bewezen in de praktijk
              en direct inzetbaar.
            </p>
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
