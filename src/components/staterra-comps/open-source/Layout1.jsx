"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout1({ praktijk: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const img = pickImg(c, PLACEHOLDER);

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-20">
            <div className="min-w-0">
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
              </div>
            </div>
            <div className="min-w-0 overflow-hidden">
              <img
                src={img}
                className="h-auto w-full max-w-full object-cover"
                alt=""
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
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-20">
          <div className="min-w-0">
            <p className="mb-3 font-semibold md:mb-4">In de praktijk</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Wat dit concreet voor uw organisatie betekent
            </h1>
            <p className="md:text-md">
              Open source betekent dat uw organisatie niet vastzit aan systemen
              die niet meer passen. U houdt controle, kunt sneller aanpassen en
              voorkomt langdurige afhankelijkheid.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Start verkenning" variant="secondary">
                Start verkenning
              </Button>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="h-auto w-full max-w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
