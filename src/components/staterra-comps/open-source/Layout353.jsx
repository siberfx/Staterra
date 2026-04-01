"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { IconOrFa } from "../IconOrFa";

export function Layout353({ voordelen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div className="static md:sticky md:top-[30%]">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                {c.cta_primary_text ? (
                  <CtaFromUrl
                    url={c.cta_primary_url}
                    variant="secondary"
                    title={c.cta_primary_text}
                  >
                    {c.cta_primary_text}
                  </CtaFromUrl>
                ) : null}
              </div>
            </div>
            <div>
              {items.map((item, i) => (
                <div
                  key={i}
                  className="sticky mb-8 border border-border-primary bg-background-primary p-8"
                  style={{ top: `${30 + i * 2}%` }}
                >
                  <div className="mb-3 md:mb-4">
                    <IconOrFa icon={item.icon} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                    {item.title}
                  </h3>
                  <p>{item.subtitle ?? item.description ?? ""}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <p className="mb-3 font-semibold md:mb-4">Voordelen</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Wat open source concreet voor u betekent
            </h2>
            <p className="md:text-md">
              Open source is geen technisch detail, maar een strategische keuze.
              U houdt controle over uw systemen, voorkomt afhankelijkheid van
              leveranciers en kunt blijven aanpassen wanneer uw organisatie
              verandert.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Start verkenning" variant="secondary">
                Start verkenning
              </Button>
            </div>
          </div>
          <div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "30%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Volledig eigenaarschap
              </h3>
              <p>
                U bezit de code en de data. Geen leverancier bepaalt wat u wel
                of niet kunt doen.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "32%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Geen vendor lock-in
              </h3>
              <p>
                U kunt altijd overstappen of aanpassen — zonder verlies van data
                of functionaliteit.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "34%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Volledig inzicht
              </h3>
              <p>
                U weet hoe uw systemen werken en wat ze doen. Geen verborgen
                processen of afhankelijkheden.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "36%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Blijvend beschikbaar
              </h3>
              <p>
                Uw systemen blijven werken, ongeacht leveranciers of contracten.
                Geen risico op stilstand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
