"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { CtaFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout1({ aanpak: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
  }

  if (apiOnly) {
    const img = (c.image_url ?? c.imageUrl ?? "").trim() || PLACEHOLDER;
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
                {c.cta_secondary_text ? (
                  <CtaFromUrl
                    url={c.cta_secondary_url}
                    variant="link"
                    size="link"
                    title={c.cta_secondary_text}
                    iconRight={<RxChevronRight />}
                  >
                    {c.cta_secondary_text}
                  </CtaFromUrl>
                ) : null}
              </div>
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
            <p className="mb-3 font-semibold md:mb-4">Aanpak</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Van vraagstuk naar werkend systeem — in drie stappen
            </h1>
            <p className="md:text-md">
              We vertalen uw vraagstuk snel naar een concrete aanpak en bouwen
              direct naar een werkende oplossing. Stap 1 — Verkenning Snel
              inzicht in uw situatie en een concrete aanpak. Stap 2 — Werkend
              MVP Binnen enkele maanden een oplossing die direct gebruikt kan
              worden. Stap 3 — Doorontwikkeling Opschalen naar een volledig
              systeem, passend binnen uw organisatie.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Start verkenning" variant="secondary">
                Start verkenning
              </Button>
              <Button
                title="Bekijk aanpak"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Bekijk aanpak
              </Button>
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
