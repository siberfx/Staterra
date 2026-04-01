"use client";

import React from "react";

/**
 * Gedeelde hero-beeldkolom (Woo / Samen ontwikkelen / Open source).
 * Zelfde layout, rand, schaduw en object-contain gedrag overal.
 */
export function SplitHeroImageArea({ src, alt = "" }) {
  return (
    <div className="order-1 w-full lg:order-2">
      <div className="relative mx-auto max-w-xl lg:mx-0 lg:max-w-none">
        <figure className="relative overflow-hidden rounded-2xl border border-border-primary bg-white shadow-[var(--shadow-soft)] ring-1 ring-black/5">
          <img
            src={src}
            alt={alt}
            width={960}
            height={720}
            loading="eager"
            decoding="async"
            className="mx-auto block h-auto w-full max-h-[min(56vh,560px)] object-contain object-center"
          />
        </figure>
      </div>
    </div>
  );
}
