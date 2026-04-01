"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

const DEFAULT_FILOSOFIE = {
  image_url: PLACEHOLDER,
  badge: "Filosofie",
  title: "Geen IT-bedrijf. Een partner.",
  subtitle:
    "Wij bouwen digitale oplossingen samen met de overheid — niet ernaast. Geen lange trajecten zonder resultaat, maar werkende systemen die snel gebruikt kunnen worden en blijven doorontwikkelen. Uw organisatie houdt de regie. Wij zorgen dat het werkt. Wij bouwen geen systemen die u afhankelijk maken — maar oplossingen die u zelf kunt doorontwikkelen.",
  cta_text: "Start verkenning",
  cta_url: null,
};

export function Layout192({ filosofie: filosofieProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(filosofieProp?.title ?? "").trim()) return null;
  }
  const f = apiOnly
    ? { ...filosofieProp }
    : { ...DEFAULT_FILOSOFIE, ...filosofieProp };
  const imgSrc = apiOnly
    ? f.image_url?.trim() || null
    : f.image_url?.trim() || PLACEHOLDER;

  const cta = (() => {
    const url = f.cta_url?.trim();
    const label = f.cta_text?.trim();
    if (!label) return null;
    if (url && url !== "#") {
      if (url.startsWith("http")) {
        return (
          <Button title={label} variant="secondary" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </Button>
        );
      }
      return (
        <Button title={label} variant="secondary" asChild>
          <Link to={url}>{label}</Link>
        </Button>
      );
    }
    return <Button title={label} variant="secondary">{label}</Button>;
  })();

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          {imgSrc ? (
            <div className="order-2 min-w-0 md:order-1">
              <img
                src={imgSrc}
                className="w-full object-cover"
                alt=""
              />
            </div>
          ) : null}
          <div
            className={`order-1 min-w-0 lg:order-2 ${!imgSrc ? "md:col-span-2" : ""}`}
          >
            {f.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{f.badge}</p>
            ) : null}
            <h2 className="rb-5 mb-5 text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
              {f.title}
            </h2>
            {f.subtitle ? <p className="md:text-md">{f.subtitle}</p> : null}
            {cta ? (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">{cta}</div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
