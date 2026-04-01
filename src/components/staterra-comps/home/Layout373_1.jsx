"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import { SectionItemIcon } from "./SectionItemIcon";

const DEFAULT_PROCES = {
  badge: "Proces",
  title: "Hoe wij digitale oplossingen realiseren",
  subtitle:
    "Snelheid, voorspelbaarheid en controle zijn randvoorwaarden voor digitale oplossingen",
  items: [
    {
      icon: null,
      title: "Verkenning",
      subtitle:
        "We analyseren uw organisatie, processen en vraagstukken en vertalen deze naar een concrete digitale aanpak. Van Woo tot AI en andere bedrijfsapplicaties.",
      cta_text: "Start verkenning",
      cta_url: null,
    },
    {
      icon: null,
      title: "Werkend MVP in drie maanden",
      subtitle:
        "Werkend MVP in 3 maanden Binnen drie maanden realiseren we een werkende oplossing die direct gebruikt kan worden — bewezen met onder andere Woo-oplossingen.",
      cta_text: "Naar MVP",
      cta_url: null,
    },
    {
      icon: null,
      title: "Volledig product in negen maanden",
      subtitle:
        "Volledig product in 9 maanden - We bouwen door naar een volledige oplossing met integraties, compliance en productieklaar inrichting — geschikt voor uiteenlopende toepassingen zoals Woo, AI en andere digitale systemen.",
      cta_text: "Naar volledige oplossing",
      cta_url: null,
    },
  ],
};

function LinkOrButton({ url, title, variant, size, iconRight, className, children }) {
  const u = url?.trim();
  if (u && u !== "#") {
    if (u.startsWith("http")) {
      return (
        <Button
          title={title}
          variant={variant}
          size={size}
          iconRight={iconRight}
          className={className}
          asChild
        >
          <a href={u} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Button>
      );
    }
    return (
      <Button
        title={title}
        variant={variant}
        size={size}
        iconRight={iconRight}
        className={className}
        asChild
      >
        <Link to={u}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button
      title={title}
      variant={variant}
      size={size}
      iconRight={iconRight}
      className={className}
    >
      {children}
    </Button>
  );
}

export function Layout373_1({ proces: procesProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (
      !String(procesProp?.title ?? "").trim() ||
      !Array.isArray(procesProp?.items) ||
      procesProp.items.length < 3
    ) {
      return null;
    }
  }
  const proces = apiOnly
    ? { ...procesProp, items: procesProp.items }
    : {
        ...DEFAULT_PROCES,
        ...procesProp,
        items:
          Array.isArray(procesProp?.items) && procesProp.items.length >= 3
            ? procesProp.items
            : DEFAULT_PROCES.items,
      };

  const [large, ...rest] = proces.items;
  const smallA = rest[0] ?? DEFAULT_PROCES.items[1];
  const smallB = rest[1] ?? DEFAULT_PROCES.items[2];

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            {proces.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{proces.badge}</p>
            ) : null}
            <h2 className="mb-5 text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
              {proces.title}
            </h2>
            {proces.subtitle ? (
              <p className="md:text-md">{proces.subtitle}</p>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="grid grid-cols-1 border border-border-primary bg-[#FAFBFC] sm:col-span-2 sm:row-span-1">
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
                <div>
                  <div className="mb-5 md:mb-6">
                    <SectionItemIcon icon={large?.icon} />
                  </div>
                  <h3 className="mb-5 text-3xl font-bold leading-[1.2] sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                    {large?.title}
                  </h3>
                  <p>{large?.subtitle}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <LinkOrButton
                    url={large?.cta_url}
                    title={large?.cta_text}
                    variant="secondary"
                  >
                    {large?.cta_text}
                  </LinkOrButton>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-primary bg-primary">
              <div className="flex h-full flex-col justify-between p-6 text-text-alternative md:p-8 lg:p-6">
                <div>
                  <div className="mb-3 md:mb-4">
                    <SectionItemIcon
                      icon={smallA?.icon}
                      className="text-text-alternative [&_i]:text-text-alternative"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {smallA?.title}
                  </h3>
                  <p className="text-text-alternative/90">{smallA?.subtitle}</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <LinkOrButton
                    url={smallA?.cta_url}
                    title={smallA?.cta_text}
                    variant="link"
                    size="link"
                    className="text-text-alternative hover:text-text-alternative hover:opacity-90 [&_svg]:text-text-alternative"
                    iconRight={<RxChevronRight />}
                  >
                    {smallA?.cta_text}
                  </LinkOrButton>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-border-primary bg-[#FAFBFC]">
              <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
                <div>
                  <div className="mb-3 md:mb-4">
                    <SectionItemIcon icon={smallB?.icon} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {smallB?.title}
                  </h3>
                  <p>{smallB?.subtitle}</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <LinkOrButton
                    url={smallB?.cta_url}
                    title={smallB?.cta_text}
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    {smallB?.cta_text}
                  </LinkOrButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
