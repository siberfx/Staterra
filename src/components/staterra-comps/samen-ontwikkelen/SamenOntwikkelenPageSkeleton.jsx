import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

function CenteredSectionHeader() {
  return (
    <div className="rb-12 mb-10 md:mb-14">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 text-center">
        <ShimmerBlock className="h-4 w-24" />
        <ShimmerBlock className="h-14 w-full md:h-16" />
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-4/5" />
      </div>
    </div>
  );
}

/** Layout358 / 358_1 — rand + 2 kolommen (tekst | beeld) */
function BorderedTwoColCard() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <CenteredSectionHeader />
      <div className="grid grid-cols-1 border border-neutral-200 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-12">
          <ShimmerBlock className="h-3 w-20" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-20 w-full" />
          <ShimmerBlock className="h-11 w-44" />
        </div>
        <ShimmerBlock className="min-h-[240px] w-full rounded-none md:min-h-[320px]" />
      </div>
    </section>
  );
}

/** Layout394 / 394_1 — 3 kaarten, tekst boven afbeelding */
function ThreeColProcessCards() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-3 text-center md:mb-14">
        <ShimmerBlock className="h-4 w-28" />
        <ShimmerBlock className="h-14 w-full" />
        <ShimmerBlock className="h-4 w-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col border border-neutral-200"
          >
            <div className="space-y-3 p-6 md:p-8">
              <ShimmerBlock className="h-3 w-16" />
              <ShimmerBlock className="h-8 w-full" />
              <ShimmerBlock className="h-12 w-full" />
              <ShimmerBlock className="h-4 w-28" />
            </div>
            <ShimmerBlock className="h-40 w-full rounded-none md:h-48" />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Iskelet: GET page-sections samen-ontwikkelen — Header64 split hero, daarna o.a. bordered 2-koloms blokken.
 */
export function SamenOntwikkelenPageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      {/* Header64 — split hero zoals echte component (tekst | SplitHeroImageArea) */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="order-2 space-y-4 text-center lg:order-1 lg:text-left">
            <ShimmerBlock className="mx-auto h-8 w-32 lg:mx-0" />
            <ShimmerBlock className="mx-auto h-24 w-full max-w-md lg:mx-0 lg:h-32 lg:max-w-lg" />
            <ShimmerBlock className="mx-auto h-4 w-full max-w-md lg:mx-0" />
            <ShimmerBlock className="mx-auto h-4 w-full max-w-md lg:mx-0" />
            <ShimmerBlock className="mx-auto h-4 w-5/6 max-w-md lg:mx-0" />
            <div className="flex justify-center pt-2 lg:justify-start">
              <ShimmerBlock className="h-11 w-48" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ShimmerBlock className="mx-auto aspect-[4/3] w-full max-w-xl rounded-2xl border border-neutral-200/80 lg:max-w-none" />
          </div>
        </div>
      </section>

      <BorderedTwoColCard />
      <BorderedTwoColCard />

      <ThreeColProcessCards />

      {/* Layout370 — kaarten met afbeelding boven */}
      <section className="py-16 md:py-24 lg:py-28">
        <CenteredSectionHeader />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col border border-neutral-200"
            >
              <ShimmerBlock className="h-44 w-full rounded-none" />
              <div className="space-y-2 p-6">
                <ShimmerBlock className="h-3 w-14" />
                <ShimmerBlock className="h-6 w-3/4" />
                <ShimmerBlock className="h-14 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Layout1 — tekst | afbeelding */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <div className="flex flex-wrap gap-3">
              <ShimmerBlock className="h-11 w-40" />
              <ShimmerBlock className="h-4 w-32" />
            </div>
          </div>
          <ShimmerBlock className="aspect-[4/3] w-full" />
        </div>
      </section>

      {/* Layout192 — afbeelding | tekst (desktop) */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <ShimmerBlock className="aspect-[4/3] w-full md:order-1" />
          <div className="space-y-4 md:order-2">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-20 w-full" />
            <ShimmerBlock className="h-11 w-44" />
          </div>
        </div>
      </section>

      <ThreeColProcessCards />
    </div>
  );
}
