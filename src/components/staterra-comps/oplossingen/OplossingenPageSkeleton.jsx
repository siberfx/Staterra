import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

/**
 * Iskelet: GET page-sections oplossingen.
 * Header26: zelfde split hero als homepage (tekst links, beeld rechts, full-bleed).
 */
export function OplossingenPageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      <section className="py-0">
        <div className="relative left-1/2 right-auto w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip">
          <div className="grid min-h-[min(76vh,620px)] grid-cols-1 bg-white md:min-h-[min(84vh,800px)] lg:min-h-[min(93vh,1000px)] lg:grid-cols-2">
            <div className="flex min-w-0 flex-col justify-center gap-4 px-4 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
              <div className="max-w-xl space-y-4">
                <ShimmerBlock className="h-4 w-2/3" />
                <ShimmerBlock className="h-12 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <ShimmerBlock className="h-12 w-full sm:w-44" />
                  <ShimmerBlock className="h-12 w-full sm:w-44" />
                </div>
              </div>
            </div>
            <div className="min-h-[min(45vh,420px)] w-full min-w-0 lg:min-h-0">
              <ShimmerBlock className="h-full min-h-[min(45vh,420px)] w-full rounded-none lg:min-h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Header62 — smalle gecentreerde kop */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 text-center">
          <ShimmerBlock className="h-4 w-28" />
          <ShimmerBlock className="h-24 w-full md:h-32" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-5/6" />
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ShimmerBlock className="h-11 w-40" />
            <ShimmerBlock className="h-11 w-44" />
          </div>
        </div>
      </section>

      {/* Layout423 — twee hoge categorie-kolommen (mobiel gestapeld) */}
      <section className="py-0 md:py-8 lg:py-12">
        <div className="flex min-h-[55vh] flex-col gap-0 border border-neutral-200 lg:flex-row lg:min-h-[65vh]">
          <ShimmerBlock className="min-h-[45vh] flex-1 rounded-none lg:min-h-full" />
          <ShimmerBlock className="min-h-[45vh] flex-1 rounded-none border-t border-neutral-200 lg:min-h-full lg:border-l lg:border-t-0" />
        </div>
      </section>

      {/* Layout1 — tekst | afbeelding */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-5/6" />
            <div className="flex flex-wrap gap-3 pt-2">
              <ShimmerBlock className="h-11 w-36" />
              <ShimmerBlock className="h-4 w-32" />
            </div>
          </div>
          <ShimmerBlock className="aspect-[4/3] w-full md:min-h-[280px]" />
        </div>
      </section>

      {/* Layout239 — gecentreerde intro + 3 kolommen */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-3 text-center">
          <ShimmerBlock className="h-4 w-20" />
          <ShimmerBlock className="h-14 w-full" />
          <ShimmerBlock className="h-4 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center">
              <ShimmerBlock className="aspect-[4/3] w-full max-w-md" />
              <ShimmerBlock className="h-8 w-4/5" />
              <ShimmerBlock className="h-16 w-full" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ShimmerBlock className="h-11 w-40" />
          <ShimmerBlock className="h-4 w-36" />
        </div>
      </section>
    </div>
  );
}
