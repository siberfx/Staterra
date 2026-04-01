"use client";

import React from "react";
import { ShimmerBlock } from "../../layout/ShimmerBlock";

/**
 * Placeholder tijdens laden van GET /api/page-sections?page=homepage — geen statische copy.
 */
export function HomePageSkeleton() {
  return (
    <div className="w-full" aria-busy="true" aria-label="Pagina laden">
      {/* Hero — split zoals Header26 (tekst links, beeld rechts, viewport-breed) */}
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

      {/* Herkenning / tabs */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-3">
          <ShimmerBlock className="h-4 w-24" />
          <ShimmerBlock className="h-12 w-full" />
          <ShimmerBlock className="h-4 w-full" />
        </div>
        <div className="flex flex-col gap-2 border border-neutral-200 md:flex-row">
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerBlock key={i} className="h-14 flex-1 rounded-none md:h-16" />
          ))}
        </div>
        <div className="mt-0 grid gap-8 border border-t-0 border-neutral-200 p-6 md:grid-cols-2 md:p-8">
          <div className="space-y-4">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-8 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <div className="flex gap-3 pt-2">
              <ShimmerBlock className="h-11 w-40" />
              <ShimmerBlock className="h-11 w-11 rounded-full" />
            </div>
          </div>
          <ShimmerBlock className="aspect-[4/3] w-full" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 lg:py-28">
        <ShimmerBlock className="mb-10 h-10 max-w-2xl" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-l-2 border-neutral-200 pl-4 sm:pl-6">
              <ShimmerBlock className="mb-2 h-12 w-32 sm:h-16 sm:w-40" />
              <ShimmerBlock className="h-4 w-full max-w-[14rem]" />
            </div>
          ))}
        </div>
      </section>

      {/* Twee grid-secties (aanpak + proces) */}
      {["aanpak", "proces"].map((key) => (
        <section key={key} className="py-16 md:py-24 lg:py-28">
          <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-3">
            <ShimmerBlock className="h-4 w-20" />
            <ShimmerBlock className="h-10 w-full" />
            <ShimmerBlock className="h-4 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-neutral-200 sm:col-span-2">
              <div className="space-y-4 p-6 md:p-10">
                <ShimmerBlock className="h-10 w-10 rounded" />
                <ShimmerBlock className="h-8 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-11 w-44" />
              </div>
            </div>
            <div className="border border-neutral-200 p-6">
              <ShimmerBlock className="mb-4 h-10 w-10 rounded" />
              <ShimmerBlock className="mb-2 h-5 w-full" />
              <ShimmerBlock className="mb-4 h-4 w-full" />
              <ShimmerBlock className="h-4 w-28" />
            </div>
            <div className="border border-neutral-200 p-6">
              <ShimmerBlock className="mb-4 h-10 w-10 rounded" />
              <ShimmerBlock className="mb-2 h-5 w-full" />
              <ShimmerBlock className="mb-4 h-4 w-full" />
              <ShimmerBlock className="h-4 w-28" />
            </div>
          </div>
        </section>
      ))}

      {/* Filosofie */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <ShimmerBlock className="aspect-[4/3] w-full md:order-1" />
          <div className="space-y-4 md:order-2">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-10 w-full max-w-md" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="h-4 w-full" />
            <ShimmerBlock className="mt-4 h-11 w-40" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
          <ShimmerBlock className="h-10 w-full" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-3/4" />
          <div className="mt-4 grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <ShimmerBlock className="h-11 w-full" />
            <ShimmerBlock className="h-11 w-full sm:w-32" />
          </div>
          <ShimmerBlock className="h-3 w-2/3" />
        </div>
      </section>
    </div>
  );
}
