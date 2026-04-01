"use client";

import React, { Fragment } from "react";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

function isImageOnlyTile(item) {
  const img = pickImg(item);
  if (!img) return false;
  const hasStat =
    String(item?.value ?? "").trim() ||
    String(item?.description ?? "").trim();
  return !hasStat;
}

export function Stats30({ resultaat: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const items = Array.isArray(c.items) ? c.items : [];
    if (!items.length) return null;

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
            <div>
              <h3 className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
                {c.title}
              </h3>
            </div>
            <div>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              if (isImageOnlyTile(item)) {
                return (
                  <Fragment key={i}>
                    <div>
                      <img
                        className="aspect-[3/2] size-full object-cover"
                        src={pickImg(item, PLACEHOLDER)}
                        alt=""
                      />
                    </div>
                  </Fragment>
                );
              }
              const lineTitle = [item.value, item.label]
                .filter(Boolean)
                .join(" ")
                .trim();
              return (
                <Fragment key={i}>
                  <div className="border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
                    {item.value ? (
                      <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                        {item.value}
                      </p>
                    ) : null}
                    <h3 className="mt-auto text-md font-bold leading-[1.4] md:text-xl">
                      {lineTitle || item.description}
                    </h3>
                    {item.description && lineTitle ? (
                      <p className="mt-2">{item.description}</p>
                    ) : null}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mb-12 grid grid-cols-1 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <h3 className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
              Resultaat in maanden, niet jaren
            </h3>
          </div>
          <div>
            <p className="md:text-md">
              U ziet snel resultaat en houdt volledige controle. Geen beloftes,
              maar concrete oplevering die direct gebruikt wordt.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Fragment>
            <div className="border border-border-primary p-8 first:flex first:flex-col first:md:col-span-2 first:md:row-span-1 first:lg:col-span-1 first:lg:row-span-2">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                3
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl mt-auto">
                3 maanden tot werkend systeem
              </h3>
              <p className="mt-2">Direct in gebruik binnen uw organisatie</p>
            </div>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
          <Fragment>
            <div className="border border-border-primary p-8">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                3
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                3 maanden tot werkend systeem
              </h3>
              <p className="mt-2">Direct in gebruik binnen uw organisatie</p>
            </div>
          </Fragment>
          <Fragment>
            <div className="border border-border-primary p-8 [&:nth-last-child(2)]:order-last [&:nth-last-child(2)]:md:order-none">
              <p className="mb-8 text-10xl font-bold leading-[1.3] md:mb-10 md:text-[4rem] lg:mb-12 lg:text-[5rem]">
                3
              </p>
              <h3 className="text-md font-bold leading-[1.4] md:text-xl">
                3 maanden tot werkend systeem
              </h3>
              <p className="mt-2">Direct in gebruik binnen uw organisatie</p>
            </div>
          </Fragment>
          <Fragment>
            <div>
              <img
                className="aspect-[3/2] size-full object-cover"
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image"
              />
            </div>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
