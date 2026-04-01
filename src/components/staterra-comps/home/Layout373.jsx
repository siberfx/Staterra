"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import { SectionItemIcon } from "./SectionItemIcon";

const DEFAULT_AANPAK = {
  badge: "Aanpak",
  title: "Drie manieren om samen te werken",
  subtitle: "Kies de aanpak die past bij uw organisatie en ambitie",
  items: [
    {
      icon: null,
      title: "Samen nieuwe oplossingen ontwikkelen",
      subtitle:
        "Digitale transformatie is een bestuurlijke keuze — geen IT-keuze. Staterra ontwikkelt samen met overheden oplossingen die direct toepasbaar zijn in de praktij",
      cta_text: "Samen ontwikkelen",
      cta_url: null,
    },
    {
      icon: null,
      title: "Bestaande Woo-oplossing inzetten",
      subtitle:
        "Start direct met een oplossing die al werkt binnen de overheid. Geen lange ontwikkeltrajecten, maar direct toepasbaar en bewezen in de praktijk.",
      cta_text: "Direct starten",
      cta_url: null,
    },
    {
      icon: null,
      title: "Open source als fundament",
      subtitle:
        "Behoud controle over uw eigen digitale infrastructuur. Geen afhankelijkheid van leveranciers, maar volledige transparantie en eigenaarschap",
      cta_text: "Meer over open source",
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

export function Layout373({ aanpak: aanpakProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (
      !String(aanpakProp?.title ?? "").trim() ||
      !Array.isArray(aanpakProp?.items) ||
      aanpakProp.items.length < 3
    ) {
      return null;
    }
  }
  const aanpak = apiOnly
    ? { ...aanpakProp, items: aanpakProp.items }
    : {
        ...DEFAULT_AANPAK,
        ...aanpakProp,
        items:
          Array.isArray(aanpakProp?.items) && aanpakProp.items.length >= 3
            ? aanpakProp.items
            : DEFAULT_AANPAK.items,
      };

  const [large, ...rest] = aanpak.items;
  const smallA = rest[0] ?? DEFAULT_AANPAK.items[1];
  const smallB = rest[1] ?? DEFAULT_AANPAK.items[2];

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            {aanpak.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{aanpak.badge}</p>
            ) : null}
            <h2 className="mb-5 text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
              {aanpak.title}
            </h2>
            {aanpak.subtitle ? (
              <p className="md:text-md">{aanpak.subtitle}</p>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="grid grid-cols-1 border border-primary bg-primary sm:col-span-2 sm:row-span-1">
              <div className="flex flex-1 flex-col justify-center p-6 text-text-alternative md:p-8 lg:p-12">
                <div>
                  <div className="mb-5 md:mb-6">
                    <SectionItemIcon
                      icon={large?.icon}
                      className="text-text-alternative [&_i]:text-text-alternative"
                    />
                  </div>
                  <h3 className="mb-5 text-3xl font-bold leading-[1.2] sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                    {large?.title}
                  </h3>
                  <p className="text-text-alternative/90">{large?.subtitle}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  <LinkOrButton
                    url={large?.cta_url}
                    title={large?.cta_text}
                    variant="secondary"
                    className="border-0 bg-white text-primary hover:bg-neutral-100"
                  >
                    {large?.cta_text}
                  </LinkOrButton>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-border-primary bg-[#FAFBFC]">
              <div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
                <div>
                  <div className="mb-3 md:mb-4">
                    <SectionItemIcon icon={smallA?.icon} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {smallA?.title}
                  </h3>
                  <p>{smallA?.subtitle}</p>
                </div>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <LinkOrButton
                    url={smallA?.cta_url}
                    title={smallA?.cta_text}
                    variant="link"
                    size="link"
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
