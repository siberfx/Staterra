"use client";

import React from "react";

const DEFAULT_TITLE =
  "Binnen twee dagen duidelijkheid over uw digitale oplossing";
const DEFAULT_SUBTITLE =
  "Plan een verkenning en ontvang een concreet voorstel voor aanpak, doorlooptijd en mogelijkheden voor uw organisatie";

export function Header64({ content }) {
  const title = (content?.title ?? "").trim() || DEFAULT_TITLE;
  const subtitle = (content?.subtitle ?? "").trim() || DEFAULT_SUBTITLE;

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-lg text-center">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {title}
        </h1>
        <p className="md:text-md">{subtitle}</p>
      </div>
    </section>
  );
}
