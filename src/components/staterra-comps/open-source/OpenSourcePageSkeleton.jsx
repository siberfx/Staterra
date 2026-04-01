import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

/** Shimmer + tekstregels zoals OplossingenPageSkeleton; volgt open-source sectie-volgorde. */
export function OpenSourcePageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      {/* OpenSourceHero */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
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

      {/* Layout362 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-12 max-w-lg space-y-3 text-center md:mb-18 lg:mb-20">
          <ShimmerBlock className="mx-auto h-4 w-24" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="mx-auto h-4 w-4/5" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="grid grid-cols-1 border border-neutral-200 sm:grid-cols-2"
            >
              <div className="space-y-3 p-6">
                <ShimmerBlock className="h-3 w-20" />
                <ShimmerBlock className="h-7 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
              </div>
              <ShimmerBlock className="min-h-[180px] w-full rounded-none sm:min-h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Layout71 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-32" />
            <ShimmerBlock className="h-16 w-full" />
            <ShimmerBlock className="h-12 w-4/5" />
          </div>
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-5/6" />
            <div className="space-y-2 pl-2 pt-2">
              {[0, 1, 2].map((j) => (
                <ShimmerBlock key={j} className="h-4 w-5/6" />
              ))}
            </div>
            <ShimmerBlock className="h-11 w-52" />
          </div>
        </div>
      </section>

      {/* Layout384 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-12 max-w-lg space-y-3 text-center md:mb-18 lg:mb-20">
          <ShimmerBlock className="mx-auto h-4 w-28" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-4 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col border border-neutral-200">
            <div className="space-y-3 p-6 md:p-8">
              <ShimmerBlock className="h-3 w-16" />
              <ShimmerBlock className="h-10 w-full" />
              <ShimmerBlock className="h-4 w-full" />
              <ShimmerBlock className="h-4 w-full" />
            </div>
            <ShimmerBlock className="h-48 w-full rounded-none" />
          </div>
          <div className="grid border border-neutral-200 sm:grid-cols-2 lg:col-span-2">
            <div className="space-y-3 p-6 md:p-8">
              <ShimmerBlock className="h-3 w-20" />
              <ShimmerBlock className="h-10 w-full" />
              <ShimmerBlock className="h-4 w-full" />
              <ShimmerBlock className="h-4 w-full" />
            </div>
            <ShimmerBlock className="min-h-[200px] w-full rounded-none" />
          </div>
        </div>
      </section>

      {/* Layout192 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <ShimmerBlock className="aspect-[4/3] w-full md:order-1" />
          <div className="space-y-4 md:order-2">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-14 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-11 w-44" />
          </div>
        </div>
      </section>
    </div>
  );
}
