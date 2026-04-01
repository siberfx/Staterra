"use client";

import React from "react";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout394_1({ vertrouwen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim() || !Array.isArray(c?.items) || !c.items.length)
      return null;
  }

  if (apiOnly) {
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            {c.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
            ) : null}
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {c.title}
            </h1>
            {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {c.items.map((item, i) => (
              <div key={i} className="flex flex-col border border-border-primary">
                <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                  <div>
                    {item.badge ? (
                      <p className="mb-2 font-semibold">{item.badge}</p>
                    ) : null}
                    <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                      {item.title}
                    </h2>
                    {item.subtitle ? <p>{item.subtitle}</p> : null}
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-center self-start">
                  <img
                    src={item.image_url?.trim() || PLACEHOLDER}
                    alt=""
                    className="w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
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
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Vertrouwen</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Geen druk, wel duidelijkheid
          </h1>
          <p className="md:text-md">
            We werken transparant en maken direct duidelijk wat werkt — en wat
            niet
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Geen verkoopdruk</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  We zeggen wat wel en niet werkt
                </h2>
                <p>
                  Geen verkooppraat, maar een eerlijk beeld van wat haalbaar is
                  — ook als dat betekent dat het niet past.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Snel antwoord</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Binnen enkele dagen duidelijkheid
                </h2>
                <p>
                  Geen lange voorbereiding. U krijgt snel een concreet voorstel
                  en richting.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Bewezen</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Bewezen in de praktijk
                </h2>
                <p>
                  We bouwen al werkende oplossingen binnen de overheid — geen
                  theorie, maar systemen die echt gebruikt worden.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center self-start">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
