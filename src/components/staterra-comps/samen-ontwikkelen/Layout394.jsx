"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";
import { CtaLinkFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout394({ proces: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (
      !String(c?.title ?? "").trim() ||
      !Array.isArray(c?.items) ||
      c.items.length < 3
    )
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
            {c.items.slice(0, 3).map((item, i) => (
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
                  {item.cta_text ? (
                    <div className="mt-5 md:mt-6">
                      <CtaLinkFromUrl
                        url={item.cta_url}
                        title={item.cta_text}
                        iconRight={<RxChevronRight />}
                      >
                        {item.cta_text}
                      </CtaLinkFromUrl>
                    </div>
                  ) : null}
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
          <p className="mb-3 font-semibold md:mb-4">Proces</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Van vraagstuk naar werkend systeem in drie stappen
          </h1>
          <p className="md:text-md">
            Geen lange trajecten. Resultaat in maanden, niet jaren — met directe
            waarde voor uw organisatie.
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <div className="flex flex-col border border-border-primary">
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div>
                <p className="mb-2 font-semibold">Stap 1</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Verkenning
                </h2>
                <p>
                  We brengen uw vraagstuk snel terug tot wat echt nodig is. Geen
                  uitgebreide analyses, maar direct een concrete aanpak.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Start verkenning"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Start verkenning
                </Button>
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
                <p className="mb-2 font-semibold">Stap 2</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Werkend MVP (± 3 maanden)
                </h2>
                <p>
                  Binnen drie maanden gebruikt u een werkende oplossing. We
                  bouwen terwijl u gebruikt — feedback wordt direct verwerkt.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Start verkenning"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Start verkenning
                </Button>
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
                <p className="mb-2 font-semibold">Stap 3</p>
                <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Volledig product (± 9 maanden)
                </h2>
                <p>
                  De oplossing groeit naar een productieklare omgeving met
                  integraties en compliance. U kunt het systeem zelfstandig
                  gebruiken en doorontwikkelen.
                </p>
              </div>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Start verkenning"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Start verkenning
                </Button>
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
