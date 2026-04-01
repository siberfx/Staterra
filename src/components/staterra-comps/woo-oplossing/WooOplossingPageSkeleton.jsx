import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

/**
 * Layout volgt woo-oplossing: Header62 (split hero) → 491 → 216 → 121 → 302.
 */
export function WooOplossingPageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      {/* Header62 — split hero zoals echte component (tekst | SplitHeroImageArea) */}
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

      {/* Layout491 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-12 max-w-lg space-y-3 text-center md:mb-18 lg:mb-20">
          <ShimmerBlock className="mx-auto h-4 w-20" />
          <ShimmerBlock className="h-14 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="mx-auto h-4 w-4/5" />
        </div>
        <div className="grid grid-cols-1 items-start gap-x-12 md:grid-cols-2 lg:gap-x-20">
          <div className="mb-8 space-y-6 md:mb-0">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3 border-b border-neutral-200 pb-6 last:border-0">
                <ShimmerBlock className="h-8 w-4/5" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <ShimmerBlock className="min-h-[240px] w-full md:min-h-[320px]" />
        </div>
      </section>

      {/* Layout216 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <ShimmerBlock className="order-2 aspect-[4/3] w-full md:order-1" />
          <div className="order-1 space-y-4 md:order-2">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-5/6" />
            <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
              <div className="space-y-2">
                <ShimmerBlock className="h-12 w-24" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
              </div>
              <div className="space-y-2">
                <ShimmerBlock className="h-12 w-20" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
              </div>
            </div>
            <ShimmerBlock className="h-11 w-48" />
          </div>
        </div>
      </section>

      {/* Layout121 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <div className="flex flex-wrap gap-3 pt-2">
              <ShimmerBlock className="h-11 w-44" />
            </div>
          </div>
          <div className="space-y-0">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="grid grid-cols-[max-content_1fr] gap-x-6 border-b border-neutral-100 py-8 last:border-0 lg:gap-x-10"
              >
                <ShimmerBlock className="size-12 shrink-0 rounded-md" />
                <div className="space-y-3">
                  <ShimmerBlock className="h-6 w-3/4" />
                  <ShimmerBlock className="h-4 w-full" />
                  <ShimmerBlock className="h-4 w-full" />
                  <ShimmerBlock className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layout302 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mb-12 max-w-lg space-y-4 md:mb-18 lg:mb-20">
          <ShimmerBlock className="h-4 w-40" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-5/6" />
        </div>
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <ShimmerBlock className="size-12 rounded-md" />
              <ShimmerBlock className="h-7 w-4/5" />
              <ShimmerBlock className="h-4 w-full" />
              <ShimmerBlock className="h-4 w-full" />
              <ShimmerBlock className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
