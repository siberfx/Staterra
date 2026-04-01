"use client";

import React, { useState } from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";
import { SplitHeroImageArea } from "../SplitHeroImageArea";

/** CMS’de `image_url` yoksa: her mount’ta Picsum’dan farklı bir foto. */
function useRandomHeroFallback() {
  const [url] = useState(() => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    return `https://picsum.photos/960/720?random=${encodeURIComponent(id)}`;
  });
  return url;
}

const DEFAULT_HERO = {
  badge: "",
  title: "Van vraagstuk naar werkend systeem",
  subtitle:
    "U bouwt samen met ons — niet na maanden plannen, maar direct naar een werkende oplossing. Uw organisatie blijft betrokken, het resultaat wordt direct gebruikt. U ziet resultaat terwijl we bouwen — niet pas aan het einde.",
  cta_primary_text: null,
  cta_primary_url: null,
  cta_secondary_text: null,
  cta_secondary_url: null,
};

function SamenHeroSplit({ content, imageSrc }) {
  const {
    badge,
    title,
    subtitle,
    cta_primary_text,
    cta_primary_url,
    cta_secondary_text,
    cta_secondary_url,
  } = content;

  return (
    <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
      <div className="order-2 max-w-xl text-center lg:order-1 lg:max-w-lg lg:text-left">
        {badge ? (
          <p className="mb-3 font-semibold text-primary md:mb-4">{badge}</p>
        ) : null}
        <h1 className="mb-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl xl:text-9xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-base leading-relaxed text-text-primary md:text-md">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:mt-10 lg:justify-start">
          {cta_primary_text ? (
            <CtaFromUrl
              url={cta_primary_url}
              variant="primary"
              title={cta_primary_text}
            >
              {cta_primary_text}
            </CtaFromUrl>
          ) : null}
          {cta_secondary_text ? (
            <CtaFromUrl
              url={cta_secondary_url}
              variant="secondary"
              title={cta_secondary_text}
            >
              {cta_secondary_text}
            </CtaFromUrl>
          ) : null}
        </div>
      </div>

      <SplitHeroImageArea src={imageSrc} alt="" />
    </div>
  );
}

export function Header64({ hero: c, apiOnly = false } = {}) {
  const content = apiOnly ? c : DEFAULT_HERO;
  const randomFallback = useRandomHeroFallback();

  if (apiOnly && !String(content?.title ?? "").trim()) return null;

  const imageSrc = pickImg(content, randomFallback);

  return (
    <section
      id="relume"
      className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-28"
    >
      <div className="relative w-full">
        <SamenHeroSplit content={content} imageSrc={imageSrc} />
      </div>
    </section>
  );
}
