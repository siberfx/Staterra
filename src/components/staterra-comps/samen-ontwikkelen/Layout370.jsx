"use client";

import React from "react";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg";

export function Layout370({ resultaat: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim() || !Array.isArray(c?.items) || !c.items.length)
      return null;
  }

  if (apiOnly) {
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto max-w-lg text-center">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {c.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col border border-border-primary"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={item.image_url?.trim() || PLACEHOLDER}
                    alt=""
                    className="w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <div>
                    {item.badge ? (
                      <p className="mb-2 text-sm font-semibold">{item.badge}</p>
                    ) : null}
                    <h3 className="mb-2 text-xl font-bold md:text-2xl">
                      {item.title}
                    </h3>
                    {item.subtitle ? <p>{item.subtitle}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Resultaat</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Direct resultaat, geen traject
            </h2>
            <p className="md:text-md">
              Binnen enkele maanden beschikt u over een werkende oplossing die
              direct gebruikt wordt binnen uw organisatie
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="flex flex-col border border-border-primary">
              <div className="flex items-center justify-center">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 1"
                  className="w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Systeem</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Werkend systeem in maanden
                  </h3>
                  <p>
                    Geen lange voorbereiding, maar direct een oplossing die
                    gebruikt wordt. U ziet resultaat terwijl we bouwen.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col border border-border-primary">
              <div className="flex items-center justify-center">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                  alt="Relume placeholder image 2"
                  className="w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Systeem</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Werkend systeem in maanden
                  </h3>
                  <p>
                    Geen lange voorbereiding, maar direct een oplossing die
                    gebruikt wordt. U ziet resultaat terwijl we bouwen.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 border border-border-primary sm:col-span-2 sm:row-span-1 sm:grid-cols-2">
              <div className="flex items-center justify-center">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-portrait.svg"
                  alt="Relume placeholder image 3"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <div>
                  <p className="mb-2 text-sm font-semibold">Samenwerking</p>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    Uw team bouwt mee en beslist mee
                  </h3>
                  <p>
                    Geen overdracht achteraf — uw mensen sturen het proces en
                    zien direct resultaat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
