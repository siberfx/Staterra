"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";

export function Header62({ oplossingen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
  }

  if (apiOnly) {
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-lg text-center">
          {c.badge ? (
            <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
          ) : null}
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            {c.title}
          </h1>
          {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            {c.cta_primary_text ? (
              <CtaFromUrl
                url={c.cta_primary_url}
                variant="primary"
                title={c.cta_primary_text}
              >
                {c.cta_primary_text}
              </CtaFromUrl>
            ) : null}
            {c.cta_secondary_text ? (
              <CtaFromUrl
                url={c.cta_secondary_url}
                variant="secondary"
                title={c.cta_secondary_text}
              >
                {c.cta_secondary_text}
              </CtaFromUrl>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-lg text-center">
        <p className="mb-3 font-semibold md:mb-4">Oplossingen</p>
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          Digitale oplossingen, één aanpak
        </h1>
        <p className="md:text-md">
          We bouwen digitale oplossingen die direct toepasbaar zijn binnen de
          overheid. Van Woo-publicatie tot AI en interne systemen — altijd
          vanuit één samenhangende aanpak, gericht op snelheid, eigenaarschap en
          duurzaamheid.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          <Button title="Bekijk oplossingen">Bekijk oplossingen</Button>
          <Button title="Hoe wij werken" variant="secondary">
            Hoe wij werken
          </Button>
        </div>
      </div>
    </section>
  );
}
