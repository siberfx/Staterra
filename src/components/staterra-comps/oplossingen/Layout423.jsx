"use client";

import { Button } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import { CtaLinkFromUrl } from "../ctaFromUrl";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

const useRelume = () => {
  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState(null);
  const handleMouseEnter = (index) => () => {
    setHoveredFeatureIdx(index);
  };
  const handleMouseLeave = () => {
    setHoveredFeatureIdx(null);
  };
  const startAnimation = (index) => {
    return hoveredFeatureIdx === index ? "visible" : "hidden";
  };
  return {
    handleMouseEnter,
    handleMouseLeave,
    startAnimation,
  };
};

function CardShell({ url, className, children, onMouseOver, onMouseLeave }) {
  const u = url?.trim() || "#";
  const common = { className, onMouseOver, onMouseLeave };
  if (u.startsWith("http")) {
    return (
      <a
        href={u}
        target="_blank"
        rel="noopener noreferrer"
        {...common}
      >
        {children}
      </a>
    );
  }
  if (u && u !== "#") {
    return (
      <Link to={u} {...common}>
        {children}
      </Link>
    );
  }
  return (
    <a href="#" className={className} onClick={(e) => e.preventDefault()} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
}

function ApiCategoryColumn({ item, index, hoverState }) {
  const img =
    (item.image_url ?? item.imageUrl ?? "").trim() || PLACEHOLDER;
  return (
    <CardShell
      url={item.cta_url}
      className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
      onMouseOver={hoverState.handleMouseEnter(index)}
      onMouseLeave={hoverState.handleMouseLeave}
    >
      <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src={img}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
        <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/50" />
        <div className="z-10">
          {item.badge ? (
            <p className="mb-2 font-semibold text-text-alternative">
              {item.badge}
            </p>
          ) : null}
          <h3 className="text-2xl font-bold text-text-alternative md:text-3xl md:leading-[1.3] lg:text-4xl">
            {item.title}
          </h3>
          <div className="lg:hidden">
            {item.subtitle ? (
              <p className="mt-5 text-text-alternative md:mt-6">
                {item.subtitle}
              </p>
            ) : null}
            {item.cta_text ? (
              <div className="mt-6 md:mt-8">
                <CtaLinkFromUrl
                  url={item.cta_url}
                  iconRight={<RxChevronRight />}
                  className="text-text-alternative"
                  title={item.cta_text}
                >
                  {item.cta_text}
                </CtaLinkFromUrl>
              </div>
            ) : null}
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            className="z-10 hidden lg:block lg:w-[340px]"
            variants={{
              hidden: { opacity: 0, height: 0, y: 50 },
              visible: { opacity: 1, height: "auto", y: 0 },
            }}
            initial="hidden"
            animate={hoverState.startAnimation(index)}
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {item.subtitle ? (
              <p className="mt-5 text-text-alternative md:mt-6">
                {item.subtitle}
              </p>
            ) : null}
            {item.cta_text ? (
              <div className="mt-6 md:mt-8">
                <CtaLinkFromUrl
                  url={item.cta_url}
                  iconRight={<RxChevronRight />}
                  className="text-text-alternative"
                  title={item.cta_text}
                >
                  {item.cta_text}
                </CtaLinkFromUrl>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </CardShell>
  );
}

export function Layout423({ categorieen: c, apiOnly = false } = {}) {
  const hoverState = useRelume();

  if (apiOnly) {
    const items = c?.items;
    if (!String(c?.title ?? "").trim() || !Array.isArray(items) || items.length < 3)
      return null;
    const three = items.slice(0, 3);
    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            {c.badge ? (
              <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
            ) : null}
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {c.title}
            </h2>
            {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
          </div>
          <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row">
            {three.map((item, index) => (
              <ApiCategoryColumn
                key={index}
                item={item}
                index={index}
                hoverState={hoverState}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Categorieën</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Drie soorten oplossingen die we realiseren
          </h2>
          <p className="md:text-md">
            Elk gebouwd met dezelfde aanpak: snel, schaalbaar en zonder vendor
            lock-in
          </p>
        </div>
        <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row">
          <a
            href="#"
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(0)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="size-full object-cover"
              />
            </div>
            <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
              <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/50" />
              <div className="z-10">
                <p className="mb-2 font-semibold text-text-alternative">
                  Samen ontwikkelen
                </p>
                <h3 className="text-2xl font-bold text-text-alternative md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Digitale systemen die direct werken
                </h3>
                <div className="lg:hidden">
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Maatwerk oplossingen die binnen maanden inzetbaar zijn. Van
                    idee naar werkend product — samen ontwikkeld en direct
                    toepasbaar binnen uw organisatie.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Bekijk maatwerk
                    </Button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                <motion.div
                  className="z-10 hidden lg:block lg:w-[340px]"
                  variants={{
                    hidden: { opacity: 0, height: 0, y: 50 },
                    visible: { opacity: 1, height: "auto", y: 0 },
                  }}
                  initial="hidden"
                  animate={hoverState.startAnimation(0)}
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Button
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </a>
          <a
            href="#"
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(1)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 2"
                className="size-full object-cover"
              />
            </div>
            <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
              <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/50" />
              <div className="z-10">
                <p className="mb-2 font-semibold text-text-alternative">
                  Samen ontwikkelen
                </p>
                <h3 className="text-2xl font-bold text-text-alternative md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Digitale systemen die direct werken
                </h3>
                <div className="lg:hidden">
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Maatwerk oplossingen die binnen maanden inzetbaar zijn. Van
                    idee naar werkend product — samen ontwikkeld en direct
                    toepasbaar binnen uw organisatie.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Bekijk maatwerk
                    </Button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                <motion.div
                  className="z-10 hidden lg:block lg:w-[340px]"
                  variants={{
                    hidden: { opacity: 0, height: 0, y: 50 },
                    visible: { opacity: 1, height: "auto", y: 0 },
                  }}
                  initial="hidden"
                  animate={hoverState.startAnimation(1)}
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Button
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </a>
          <a
            href="#"
            className="relative flex w-full flex-col overflow-hidden lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
            onMouseOver={hoverState.handleMouseEnter(2)}
            onMouseLeave={hoverState.handleMouseLeave}
          >
            <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
              <div className="absolute inset-0 bg-black/50" />
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 3"
                className="size-full object-cover"
              />
            </div>
            <div className="group relative flex h-full min-h-[70vh] flex-col justify-end p-6 md:p-8">
              <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/50" />
              <div className="z-10">
                <p className="mb-2 font-semibold text-text-alternative">
                  Samen ontwikkelen
                </p>
                <h3 className="text-2xl font-bold text-text-alternative md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Digitale systemen die direct werken
                </h3>
                <div className="lg:hidden">
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Maatwerk oplossingen die binnen maanden inzetbaar zijn. Van
                    idee naar werkend product — samen ontwikkeld en direct
                    toepasbaar binnen uw organisatie.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Bekijk maatwerk
                    </Button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                <motion.div
                  className="z-10 hidden lg:block lg:w-[340px]"
                  variants={{
                    hidden: { opacity: 0, height: 0, y: 50 },
                    visible: { opacity: 1, height: "auto", y: 0 },
                  }}
                  initial="hidden"
                  animate={hoverState.startAnimation(2)}
                  exit="hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="mt-5 text-text-alternative md:mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                  </p>
                  <div className="mt-6 md:mt-8">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      className="text-text-alternative"
                    >
                      Button
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
