"use client";

import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { CtaLinkFromUrl } from "../ctaFromUrl";
import { IconOrFa } from "../IconOrFa";

const DEFAULT_BADGE = "Vertrouwen";
const DEFAULT_TITLE = "Wat u van ons kunt verwachten";
const DEFAULT_SUBTITLE =
  "We werken zonder verborgen agenda en zonder verkoopdruk";

const DEFAULT_ITEMS = [
  {
    icon: "",
    title: "Snelle reactie",
    subtitle:
      "Binnen twee werkdagen ontvangt u een inhoudelijke reactie — geen standaard antwoord.",
    cta_text: "Meer",
    cta_url: "#",
  },
  {
    icon: "",
    title: "Geen verkoopdruk",
    subtitle:
      "We adviseren eerlijk en kijken samen wat past — ook als dat betekent dat we niet samenwerken.",
    cta_text: "Meer",
    cta_url: "#",
  },
  {
    icon: "",
    title: "Vertrouwelijkheid",
    subtitle:
      "Uw vraagstuk blijft vertrouwelijk en wordt alleen gebruikt om tot een passende oplossing te komen.",
    cta_text: "Meer",
    cta_url: "#",
  },
  {
    icon: "",
    title: "Alleen verkenning",
    subtitle:
      "Het eerste gesprek is gericht op inzicht — niet op verkoop. U bepaalt daarna zelf het vervolg.",
    cta_text: "Meer",
    cta_url: "#",
  },
];

export function Layout401({ content }) {
  const badge = (content?.badge ?? "").trim() || DEFAULT_BADGE;
  const title = (content?.title ?? "").trim() || DEFAULT_TITLE;
  const subtitle = (content?.subtitle ?? "").trim() || DEFAULT_SUBTITLE;
  const items = Array.isArray(content?.items) && content.items.length > 0
    ? content.items
    : DEFAULT_ITEMS;

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">{badge}</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {title}
            </h2>
            <p className="md:text-md">{subtitle}</p>
          </div>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {items.map((item, i) => {
            const ctaText = item.cta_text ?? "Meer";
            const ctaUrl = item.cta_url ?? "#";
            const cardTitle = item.title ?? "";
            const cardSubtitle = item.subtitle ?? "";
            return (
              <div
                key={`${cardTitle}-${i}`}
                className="flex flex-col justify-center border border-border-primary p-6"
              >
                <div className="mb-3 md:mb-4">
                  <IconOrFa icon={item.icon} />
                </div>
                <h3 className="mb-2 text-lg font-bold leading-[1.4] md:text-2xl">
                  {cardTitle}
                </h3>
                <p>{cardSubtitle}</p>
                <div className="mt-5 md:mt-6">
                  <CtaLinkFromUrl
                    url={ctaUrl}
                    title={ctaText}
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    {ctaText}
                  </CtaLinkFromUrl>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
