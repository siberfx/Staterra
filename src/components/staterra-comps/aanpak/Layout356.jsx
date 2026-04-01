"use client";

import React, { Fragment } from "react";
import { CtaFromUrl } from "../ctaFromUrl";

const STICKY_WRAP = [
  "relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 top-0 lg:mb-32",
  "relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-16 lg:-mt-16 lg:mb-16",
  "relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-32 lg:mb-16",
];

export function Layout356({ fasen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    const items = Array.isArray(c?.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume">
        <div className="sticky top-0">
          {items.map((item, index) => (
            <Fragment key={index}>
              <div className="relative -top-32 h-0" />
              <div
                className={
                  STICKY_WRAP[Math.min(index, STICKY_WRAP.length - 1)]
                }
              >
                <div className="w-full">
                  <div className="w-full">
                    <div className="flex h-16 w-full items-center">
                      <span className="mr-5 font-semibold md:mr-6 md:text-md">
                        {item.step ?? String(index + 1).padStart(2, "0")}
                      </span>
                      <h1 className="font-semibold md:text-md">
                        {item.label ?? ""}
                      </h1>
                    </div>
                    <div className="py-8 md:py-10 lg:py-12">
                      <div className="max-w-3xl">
                        {item.badge ? (
                          <p className="mb-3 font-semibold md:mb-4">
                            {item.badge}
                          </p>
                        ) : null}
                        <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                          {item.title}
                        </h2>
                        {item.subtitle ? (
                          <p className="md:text-md">{item.subtitle}</p>
                        ) : null}
                        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                          {item.cta_text ? (
                            <CtaFromUrl
                              url={item.cta_url}
                              variant="secondary"
                              title={item.cta_text}
                            >
                              {item.cta_text}
                            </CtaFromUrl>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="relume">
      <div className="sticky top-0">
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 top-0 lg:mb-32">
            <div className="w-full">
              <div className="w-full">
                <a href="#" className="flex h-16 w-full items-center underline">
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    01
                  </span>
                  <h1 className="font-semibold md:text-md">Verkenning</h1>
                </a>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="max-w-3xl">
                    <p className="mb-3 font-semibold md:mb-4">Fase één</p>
                    <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                      We koppelen snel terug wat echt nodig is
                    </h2>
                    <p className="md:text-md">
                      Geen uitgebreide analyses, maar snel inzicht in wat werkt.
                      We vertalen uw vraagstuk direct naar een aanpak waar u op
                      kunt sturen. Resultaat: een heldere aanpak en concrete
                      eerste stap
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <CtaFromUrl
                        url={null}
                        variant="secondary"
                        title="Start verkenning"
                      >
                        Start verkenning
                      </CtaFromUrl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-16 lg:-mt-16 lg:mb-16">
            <div className="w-full">
              <div className="w-full">
                <a href="#" className="flex h-16 w-full items-center underline">
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    02
                  </span>
                  <h1 className="font-semibold md:text-md">Werkend MVP</h1>
                </a>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="max-w-3xl">
                    <p className="mb-3 font-semibold md:mb-4">Fase één</p>
                    <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                      We koppelen snel terug wat echt nodig is
                    </h2>
                    <p className="md:text-md">
                      Geen uitgebreide analyses, maar snel inzicht in wat werkt.
                      We vertalen uw vraagstuk direct naar een aanpak waar u op
                      kunt sturen. Resultaat: een heldere aanpak en concrete
                      eerste stap
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <CtaFromUrl
                        url={null}
                        variant="secondary"
                        title="Start verkenning"
                      >
                        Start verkenning
                      </CtaFromUrl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        <Fragment>
          <div className="relative -top-32 h-0" />
          <div className="relative border-t border-border-primary bg-neutral-white pb-8 md:pb-14 lg:sticky lg:pb-0 lg:top-32 lg:mb-16">
            <div className="w-full">
              <div className="w-full">
                <a href="#" className="flex h-16 w-full items-center underline">
                  <span className="mr-5 font-semibold md:mr-6 md:text-md">
                    03
                  </span>
                  <h1 className="font-semibold md:text-md">Volledig product</h1>
                </a>
                <div className="py-8 md:py-10 lg:py-12">
                  <div className="max-w-3xl">
                    <p className="mb-3 font-semibold md:mb-4">Fase één</p>
                    <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                      We koppelen snel terug wat echt nodig is
                    </h2>
                    <p className="md:text-md">
                      Geen uitgebreide analyses, maar snel inzicht in wat werkt.
                      We vertalen uw vraagstuk direct naar een aanpak waar u op
                      kunt sturen. Resultaat: een heldere aanpak en concrete
                      eerste stap
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                      <CtaFromUrl
                        url={null}
                        variant="secondary"
                        title="Start verkenning"
                      >
                        Start verkenning
                      </CtaFromUrl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </section>
  );
}
