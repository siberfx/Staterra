import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

/** Shimmer + tekstregels zoals OplossingenPageSkeleton; volgt aanpak-secties. */
export function AanpakPageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      {/* Header47 */}
      <section className="flex min-h-[min(52vh,520px)] flex-col justify-center py-20 md:min-h-[min(48vh,480px)] md:py-28 lg:py-36 xl:py-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 lg:gap-20">
          <div className="w-full max-w-xl space-y-4 md:max-w-lg">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-32 w-full sm:h-36 md:h-40" />
          </div>
          <div className="w-full max-w-xl space-y-4 md:max-w-lg">
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-5/6" />
            <div className="flex w-full max-w-lg items-center gap-2 pt-2">
              <ShimmerBlock className="size-11 shrink-0 rounded-full sm:size-12" />
              <ShimmerBlock className="h-0.5 min-w-4 flex-1" />
              <ShimmerBlock className="size-11 shrink-0 rounded-full sm:size-12" />
              <ShimmerBlock className="h-0.5 min-w-4 flex-1" />
              <ShimmerBlock className="size-11 shrink-0 rounded-full sm:size-12" />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <ShimmerBlock className="h-11 w-44" />
              <ShimmerBlock className="h-11 w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* Layout237 proces — zelfde bleed + inner als live */}
      <section className="pb-16 md:pb-24 lg:pb-28">
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-10">
            <div className="bg-[#F7F9FB] py-16 md:py-24 lg:py-[120px]">
              <div className="mx-auto max-w-lg space-y-3 text-center">
                <ShimmerBlock className="mx-auto h-4 w-24" />
                <ShimmerBlock className="h-12 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="mx-auto h-4 w-5/6" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3 md:gap-8 md:pt-16 lg:gap-12 lg:pt-20">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-4 rounded-2xl p-6 text-center md:p-8 ${
                    i === 1 ? "bg-primary/90" : "bg-[#F7F9FB]"
                  }`}
                >
                  <ShimmerBlock
                    className={`size-12 rounded-md ${i === 1 ? "opacity-40" : ""}`}
                  />
                  <ShimmerBlock
                    className={`h-8 w-full max-w-xs ${i === 1 ? "opacity-40" : ""}`}
                  />
                  <ShimmerBlock
                    className={`h-4 w-full max-w-sm ${i === 1 ? "opacity-40" : ""}`}
                  />
                  <ShimmerBlock
                    className={`h-4 w-full max-w-sm ${i === 1 ? "opacity-40" : ""}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center md:mt-14 lg:mt-16">
              <ShimmerBlock className="h-11 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats30 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <ShimmerBlock className="h-16 w-full max-w-md" />
          <div className="space-y-3">
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-5/6" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`space-y-3 border border-neutral-200 p-6 md:p-8 ${i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
            >
              <ShimmerBlock className="h-14 w-24" />
              <ShimmerBlock className="h-6 w-full" />
              <ShimmerBlock className="h-4 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Layout503 tabs */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-10 max-w-lg space-y-3 text-center md:mb-16">
          <ShimmerBlock className="mx-auto h-4 w-28" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-4 w-full" />
        </div>
        <div className="mb-10 flex justify-center gap-6 overflow-x-auto px-4 md:mb-12">
          {[0, 1, 2].map((i) => (
            <ShimmerBlock key={i} className="h-10 w-28 shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 border border-neutral-200 md:grid-cols-2">
          <div className="space-y-4 p-6 md:p-8 lg:p-12">
            <ShimmerBlock className="h-4 w-32" />
            <ShimmerBlock className="h-10 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-11 w-44" />
          </div>
          <ShimmerBlock className="aspect-square min-h-[240px] w-full rounded-none" />
        </div>
      </section>

      {/* Layout356 fasen */}
      <section className="pb-8 md:pb-12">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`border-t border-border-primary/40 py-8 md:py-10 ${
              i % 2 === 0 ? "bg-white" : "bg-[#F7F9FB]/50"
            }`}
          >
            <div className="mb-6 flex items-center gap-4 border-b border-border-primary/10 pb-4 md:pb-5">
              <ShimmerBlock className="size-11 shrink-0 rounded-full md:size-12" />
              <ShimmerBlock className="h-6 w-40 md:h-7 md:w-48" />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-20">
              <div className="space-y-4">
                <ShimmerBlock className="h-4 w-28" />
                <ShimmerBlock className="h-12 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-11 w-44" />
              </div>
              <ShimmerBlock className="h-[280px] w-full rounded-2xl sm:h-[320px] lg:h-[50vh]" />
            </div>
          </div>
        ))}
      </section>

      {/* Faq5 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mb-10 max-w-lg space-y-4 md:mb-18 lg:mb-20">
          <ShimmerBlock className="h-12 w-48" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-4/5" />
        </div>
        <div className="grid gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border border-neutral-200 px-5 py-5 md:px-6"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <ShimmerBlock className="h-5 w-3/4 max-w-md" />
                <ShimmerBlock className="h-4 w-full max-w-lg" />
              </div>
              <ShimmerBlock className="size-8 shrink-0 rounded" />
            </div>
          ))}
        </div>
        <div className="mt-12 space-y-4 md:mt-18 lg:mt-20">
          <ShimmerBlock className="h-8 w-64" />
          <ShimmerBlock className="h-4 w-full max-w-md" />
          <ShimmerBlock className="h-11 w-48" />
        </div>
      </section>
    </div>
  );
}
