"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { IconOrFa } from "../IconOrFa";

/**
 * Volle-viewport uitbraak + binnenste kolom exact gelijk aan PageHeaderAlign,
 * zodat intro-band en fase-kaarten dezelfde linkerrechte rand hebben (geen “shift”).
 */
const bleedAlignOuterClass =
  "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2";
const bleedAlignInnerClass =
  "mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-10";

const phaseCardMutedClass =
  "flex w-full flex-col items-center bg-[#F7F9FB] p-6 text-center md:p-8";
const phaseCardFeaturedClass =
  "flex w-full flex-col items-center bg-primary p-6 text-center text-text-alternative shadow-sm md:p-8 [&_p]:text-text-alternative/90";

function phaseCardClassForIndex(i) {
  return i === 1 ? phaseCardFeaturedClass : phaseCardMutedClass;
}

export function Layout237({ proces: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume" className="pb-16 md:pb-24 lg:pb-28">
        <div className={bleedAlignOuterClass}>
          <div className={bleedAlignInnerClass}>
            <div className="bg-[#F7F9FB] py-16 md:py-24 lg:py-[120px]">
              <div className="rb-12 mx-auto w-full max-w-lg text-center">
                {c.badge ? (
                  <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
                ) : null}
                <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                  {c.title}
                </h2>
                {c.subtitle ? (
                  <p className="md:text-md">{c.subtitle}</p>
                ) : null}
              </div>
            </div>

            <div className="grid w-full grid-cols-1 items-stretch gap-6 pt-12 md:grid-cols-3 md:gap-8 md:pt-16 lg:gap-12 lg:pt-20">
              {items.map((item, i) => (
                <div key={i} className={phaseCardClassForIndex(i)}>
                  <div className="rb-5 mb-5 md:mb-6">
                    <IconOrFa
                      icon={item.icon}
                      faClassName={
                        i === 1
                          ? "text-3xl text-text-alternative"
                          : "text-3xl text-text-primary"
                      }
                      imgClassName={
                        i === 1 ? "size-12 brightness-0 invert" : "size-12"
                      }
                    />
                  </div>
                  <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                    {item.title}
                  </h3>
                  <p
                    className={
                      i === 1 ? "text-text-alternative/90" : "text-text-primary"
                    }
                  >
                    {item.subtitle ?? item.description ?? ""}
                  </p>
                </div>
              ))}
            </div>
            {c.cta_primary_text ? (
              <div className="mt-10 flex justify-center gap-4 md:mt-14 lg:mt-16">
                <CtaFromUrl
                  url={c.cta_primary_url}
                  variant="secondary"
                  title={c.cta_primary_text}
                >
                  {c.cta_primary_text}
                </CtaFromUrl>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="pb-16 md:pb-24 lg:pb-28">
      <div className={bleedAlignOuterClass}>
        <div className={bleedAlignInnerClass}>
          <div className="bg-[#F7F9FB] py-16 md:py-24 lg:py-[120px]">
            <div className="rb-12 mx-auto w-full max-w-lg text-center">
              <p className="mb-3 font-semibold md:mb-4">Proces</p>
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Van vraagstuk naar werkend systeem in drie fasen
              </h2>
              <p className="md:text-md">
                We bouwen niet naar een oplevermoment, maar naar direct gebruik.
                In drie fasen gaat u van inzicht naar een werkend systeem dat uw
                organisatie gebruikt.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 items-stretch gap-6 pt-12 md:grid-cols-3 md:gap-8 md:pt-16 lg:gap-12 lg:pt-20">
            <div className={phaseCardClassForIndex(0)}>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt=""
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase één: verkenning
              </h3>
              <p className="text-text-primary">
                We brengen uw vraagstuk snel terug tot wat echt nodig is. Geen
                uitgebreide plannen, maar direct een concrete aanpak.
              </p>
            </div>
            <div className={phaseCardClassForIndex(1)}>
              <div className="rb-5 mb-5 md:mb-6 [&_img]:brightness-0 [&_img]:invert">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt=""
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase twee: werkend MVP (± 3 maanden)
              </h3>
              <p className="text-text-alternative/90">
                Binnen drie maanden gebruikt u een werkende oplossing. We bouwen
                terwijl u gebruikt — feedback wordt direct verwerkt.
              </p>
            </div>
            <div className={phaseCardClassForIndex(2)}>
              <div className="rb-5 mb-5 md:mb-6">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt=""
                  className="size-12"
                />
              </div>
              <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Fase drie: volledig product (± 9 maanden)
              </h3>
              <p className="text-text-primary">
                De oplossing groeit naar een productieklare omgeving met
                integraties en compliance. Het systeem is volledig van u en
                klaar voor dagelijks gebruik.
              </p>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-4 md:mt-14 lg:mt-16">
            <Button variant="secondary">Start verkenning</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
