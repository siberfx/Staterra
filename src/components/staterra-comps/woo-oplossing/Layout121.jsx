"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { IconOrFa } from "../IconOrFa";

const AnimationSection = () => {
  const scrollSection = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollSection,
    offset: ["start 55%", "start start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return React.createElement(
    "div",
    {
      className:
        "absolute left-8 right-auto top-[10%] h-3/4 w-0.5 bg-black/15 md:left-[2.4375rem]",
    },
    React.createElement(motion.div, {
      ref: scrollSection,
      className: "bg-black",
      style: { height },
    }),
  );
};

export function Layout121({ voordelen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 items-start gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.cta_primary_text ? (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  <CtaFromUrl
                    url={c.cta_primary_url}
                    variant="primary"
                    title={c.cta_primary_text}
                  >
                    {c.cta_primary_text}
                  </CtaFromUrl>
                </div>
              ) : null}
            </div>
            <div className="relative">
              <AnimationSection />
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10"
                >
                  <div className="relative flex flex-col items-center justify-start py-10">
                    <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                      <IconOrFa icon={item.icon} />
                    </div>
                  </div>
                  <div className="py-10">
                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                      {item.title}
                    </h6>
                    <p>{item.subtitle ?? item.description ?? ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 items-start gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">Voordelen</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Direct resultaat voor uw organisatie
            </h2>
          </div>
          <div className="relative">
            <AnimationSection />
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
              <div className="relative flex flex-col items-center justify-start py-10">
                <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume icon 1"
                    className="size-12"
                  />
                </div>
              </div>
              <div className="py-10">
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Volledige eigenaarschap
                </h6>
                <p>
                  Uw organisatie houdt volledige controle over code en data.
                  Geen afhankelijkheid van leveranciers — u bepaalt de toekomst.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
              <div className="relative flex flex-col items-center justify-start py-10">
                <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume icon 2"
                    className="size-12"
                  />
                </div>
              </div>
              <div className="py-10">
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Compliance zonder gedoe
                </h6>
                <p>
                  De oplossing ondersteunt Woo-verplichtingen direct. Uw team
                  werkt gestructureerd en voldoet zonder extra handmatig werk.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
              <div className="relative flex flex-col items-center justify-start py-10">
                <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume icon 3"
                    className="size-12"
                  />
                </div>
              </div>
              <div className="py-10">
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Snel operationeel
                </h6>
                <p>
                  Binnen enkele maanden beschikt u over een werkende oplossing
                  die direct gebruikt wordt. Voor kleinere bestuursorganen is
                  een SaaS-variant beschikbaar — snel aansluiten en gebruikmaken
                  van een oplossing die continu wordt doorontwikkeld.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 lg:gap-x-10">
              <div className="relative flex flex-col items-center justify-start py-10">
                <div className="relative z-10 -mt-4 bg-white px-2 py-4 md:px-4">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                    alt="Relume icon 4"
                    className="size-12"
                  />
                </div>
              </div>
              <div className="py-10">
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Transparantie ingebouwd
                </h6>
                <p>
                  Volledig inzicht in processen en voortgang. Geen verrassingen
                  achteraf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
