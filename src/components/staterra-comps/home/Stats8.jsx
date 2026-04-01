"use client";

import React from "react";

const DEFAULT_ITEMS = [
  {
    value: "3",
    label: "maanden",
    description: "Werkend MVP Snel starten",
  },
  {
    value: "9",
    label: "maanden",
    description: "Volledig product Doorontwikkelen",
  },
  {
    value: "Open",
    label: "source",
    description: "Eigenaarschap Zelf in control",
  },
];

const DEFAULT_GRID = {
  title: "Werkende Woo-oplossing — snel realiseerbaar in de praktijk",
  items: DEFAULT_ITEMS,
};

function statLine(item) {
  const v = item?.value != null ? String(item.value).trim() : "";
  const l = item?.label != null ? String(item.label).trim() : "";
  if (v && l) return `${v} ${l}`;
  return v || l || "";
}

export function Stats8({ gridFeature: gridProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (
      !String(gridProp?.title ?? "").trim() ||
      !Array.isArray(gridProp?.items) ||
      gridProp.items.length === 0
    ) {
      return null;
    }
  }
  const grid = apiOnly
    ? { ...gridProp }
    : { ...DEFAULT_GRID, ...gridProp };
  const items = apiOnly
    ? grid.items ?? []
    : Array.isArray(grid.items) && grid.items.length > 0
      ? grid.items
      : DEFAULT_ITEMS;

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="flex w-full min-w-0 flex-col items-stretch">
        <div className="rb-12 mb-12 w-full min-w-0 max-w-full md:mb-18 lg:mb-20">
          <h3 className="text-balance break-words text-2xl font-bold leading-[1.2] sm:text-3xl md:text-5xl lg:text-6xl">
            {grid.title}
          </h3>
        </div>
        <div className="grid w-full min-w-0 grid-cols-1 items-start justify-start gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-16 lg:gap-x-12">
          {items.map((item, i) => (
            <div
              key={i}
              className="min-w-0 max-w-full border-l-2 border-border-primary pl-4 sm:pl-6 md:pl-8"
            >
              <p className="mb-2 break-words text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl sm:leading-[1.3] md:text-[4rem] lg:text-[5rem]">
                {statLine(item)}
              </p>
              <h3 className="text-sm font-bold leading-snug sm:text-md md:text-xl">
                {item.description ?? ""}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
