"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout25({ relevant: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    const img = pickImg(c, PLACEHOLDER);

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full min-w-0">
          <div className="grid min-w-0 grid-cols-1 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-20">
            <div className="relative z-10 min-w-0 max-w-full">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="mb-5 text-balance break-words text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? (
                <p className="mb-6 md:mb-8 md:text-md">{c.subtitle}</p>
              ) : null}
              {items.length > 0 ? (
                <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-8 py-2 sm:grid-cols-2 sm:gap-x-4 md:gap-x-6">
                  {items.map((item, i) => (
                    <div key={i} className="min-w-0 max-w-full">
                      <h3 className="mb-2 break-words text-3xl font-bold sm:text-4xl md:text-4xl lg:text-4xl">
                        {item.title}
                      </h3>
                      <p className="break-words">
                        {item.subtitle ?? item.description ?? ""}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
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
            <div className="relative z-0 min-w-0 overflow-hidden rounded-md">
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
      <div className="w-full min-w-0">
        <div className="grid min-w-0 grid-cols-1 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-12 lg:gap-x-20">
          <div className="relative z-10 min-w-0 max-w-full">
            <p className="mb-3 font-semibold md:mb-4">Relevant</p>
            <h2 className="mb-5 text-balance break-words text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
              Wanneer open source de juiste keuze is voor uw organisatie
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Open source past bij u wanneer u controle wilt over uw systemen,
              afhankelijkheid wilt vermijden en wilt bouwen aan duurzame
              digitale infrastructuur.
            </p>
            <div className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-8 py-2 sm:grid-cols-2 sm:gap-x-4 md:gap-x-6">
              <div className="min-w-0 max-w-full">
                <h3 className="mb-2 break-words text-3xl font-bold sm:text-4xl md:text-4xl lg:text-4xl">
                  Controle
                </h3>
                <p className="break-words">
                  U bepaalt hoe uw systemen werken en zich ontwikkelen — niet
                  een leverancier.
                </p>
              </div>
              <div className="min-w-0 max-w-full">
                <h3 className="mb-2 break-words text-3xl font-bold sm:text-4xl md:text-4xl lg:text-4xl">
                  Onafhankelijkheid
                </h3>
                <p className="break-words">
                  U zit niet vast aan contracten, licenties of externe keuzes.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Start verkenning" variant="secondary">
                Start verkenning
              </Button>
            </div>
          </div>
          <div className="relative z-0 min-w-0 overflow-hidden rounded-md">
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
