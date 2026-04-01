"use client";

import React from "react";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export function Layout362({ risico: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (items.length < 2) return null;

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto max-w-lg text-center">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h2>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
            {items.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 items-start border border-border-primary sm:grid-cols-2"
              >
                <div className="flex h-full flex-col justify-center p-6">
                  {item.badge ? (
                    <p className="mb-2 text-sm font-semibold">{item.badge}</p>
                  ) : null}
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {item.title}
                  </h3>
                  <p>{item.subtitle ?? item.description ?? ""}</p>
                </div>
                <div className="flex size-full items-center justify-center">
                  <img
                    src={pickImg(item, PLACEHOLDER)}
                    className="size-full object-cover"
                    alt=""
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
        <div className="rb-12 mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Risico</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Gesloten systemen binden u vast
            </h2>
            <p className="md:text-md">
              Traditionele software maakt u afhankelijk. U zit vast aan
              contracten, licenties en de keuzes van één leverancier. Uw
              organisatie past zich aan het systeem aan — niet andersom.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 md:gap-8 lg:grid-cols-2">
          <div className="grid grid-cols-1 items-start border border-border-primary sm:grid-cols-2">
            <div className="flex h-full flex-col justify-center p-6">
              <p className="mb-2 text-sm font-semibold">Gesloten</p>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Afhankelijk van één leverancier
              </h3>
              <p>
                U bent gebonden aan contracten, prijzen en beslissingen van
                buiten. Aanpassingen kosten tijd en geld — en liggen niet in uw
                controle.
              </p>
            </div>
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 items-start border border-border-primary sm:grid-cols-2">
            <div className="flex h-full flex-col justify-center p-6">
              <p className="mb-2 text-sm font-semibold">Open</p>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                U houdt regie over uw systemen
              </h3>
              <p>
                U bezit het systeem en bepaalt hoe het zich ontwikkelt.
                Aanpassen, uitbreiden en integreren gebeurt wanneer u dat nodig
                heeft.
              </p>
            </div>
            <div className="flex size-full items-center justify-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full object-cover"
                alt="Relume placeholder image 1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
