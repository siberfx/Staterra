"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER_LANDSCAPE =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg";

const DEFAULT_HERO = {
  title: "U heeft genoeg aan uw hoofd.",
  subtitle:
    "De Woo, de NDS, de digitale strategie — de verplichtingen groeien. Staterra zorgt dat uw organisatie compliant is en grip houdt, zonder dat u er technisch verstand van hoeft te hebben.",
  badge: "Bewezen binnen de overheid — werkend binnen 3 maanden",
  cta_primary_text: "Plan een verkenningsgesprek",
  cta_primary_url: null,
  cta_secondary_text: "Bekijk hoe wij werken",
  cta_secondary_url: null,
  image_url: PLACEHOLDER_LANDSCAPE,
};

function resolveHref(url) {
  if (url == null || url === "" || url === "#") return null;
  return url;
}

function CtaButton({ url, variant, title, children }) {
  const href = resolveHref(url);
  if (href?.startsWith("http")) {
    return (
      <Button title={title} variant={variant} asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  if (href) {
    return (
      <Button title={title} variant={variant} asChild>
        <Link to={href}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button title={title} variant={variant}>
      {children}
    </Button>
  );
}

/** Breekt uit PageHeaderAlign (max-width) zodat de hero-rechterkolom tot de viewport-rand kan reiken. */
function FullBleedHero({ children }) {
  return (
    <div className="relative left-1/2 right-auto w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip">
      {children}
    </div>
  );
}

export function Header26({ hero: heroProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!heroProp || !String(heroProp.title ?? "").trim()) return null;
  }
  const hero = apiOnly
    ? { ...heroProp }
    : { ...DEFAULT_HERO, ...heroProp };
  const imageSrc = apiOnly
    ? hero.image_url?.trim() || null
    : hero.image_url?.trim() || PLACEHOLDER_LANDSCAPE;

  return (
    <section id="relume" className="py-0">
      <FullBleedHero>
        <div
          className={`grid grid-cols-1 bg-white ${
            imageSrc
              ? "min-h-[min(76vh,620px)] md:min-h-[min(84vh,800px)] lg:min-h-[min(93vh,1000px)] lg:grid-cols-2"
              : ""
          }`}
        >
          {/* Tekst links */}
          <div className="flex min-w-0 flex-col justify-center px-4 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]">
            <div className="max-w-xl text-left">
              {hero.badge ? (
                <p className="mb-4 text-sm font-semibold text-text-main md:mb-5 md:text-base">
                  {hero.badge}
                </p>
              ) : null}
              <h1 className="mb-5 text-4xl font-bold leading-tight text-text-main sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl">
                {hero.title}
              </h1>
              {hero.subtitle ? (
                <p className="text-base text-text-primary md:text-md">
                  {hero.subtitle}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                {hero.cta_primary_text ? (
                  <CtaButton
                    url={hero.cta_primary_url}
                    variant="primary"
                    title={hero.cta_primary_text}
                  >
                    {hero.cta_primary_text}
                  </CtaButton>
                ) : null}
                {hero.cta_secondary_text ? (
                  <CtaButton
                    url={hero.cta_secondary_url}
                    variant="secondary"
                    title={hero.cta_secondary_text}
                  >
                    {hero.cta_secondary_text}
                  </CtaButton>
                ) : null}
              </div>
            </div>
          </div>

          {/* Beeld rechts — volle kolombreedte, niet aan nav-max-width gebonden */}
          {imageSrc ? (
            <div className="relative min-h-[min(45vh,420px)] w-full min-w-0 lg:min-h-0">
              <img
                src={imageSrc}
                className="h-full w-full object-cover object-center"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}
        </div>
      </FullBleedHero>
    </section>
  );
}
