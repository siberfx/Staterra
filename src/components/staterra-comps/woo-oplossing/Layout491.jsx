"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

const TabItem = ({ tabItem, index, activeTab }) => {
  if (index !== activeTab) {
    return null;
  }
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      {tabItem.image && (
        <img
          src={tabItem.image.src}
          alt={tabItem.image.alt}
          className="object-cover size-full"
        />
      )}
      {tabItem.video && (
        <Dialog>
          <DialogTrigger className="relative flex items-center justify-center w-full">
            <img
              src={tabItem.video.image.src}
              alt={tabItem.video.image.alt}
              className="object-cover size-full"
            />
            <span className="absolute inset-0 z-10 bg-black/50" />
            <FaCirclePlay className="absolute z-20 text-white size-16" />
          </DialogTrigger>
          <DialogContent>
            <VideoIframe video={tabItem.video.url} />
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

const useRelume = () => {
  const [activeTab, setActiveTab] = useState(0);
  const setActiveTabSetter = (index) => () => setActiveTab(index);
  const getActiveTabButtonStyles = (index) => {
    return clsx("cursor-pointer border-b border-border-primary py-6", {
      "opacity-100": activeTab === index,
      "opacity-25": activeTab !== index,
    });
  };
  const getActiveTabButtonContentStyles = (index) => {
    return {
      height: activeTab === index ? "auto" : 0,
      opacity: activeTab === index ? 1 : 0,
    };
  };
  return {
    setActiveTabSetter,
    getActiveTabButtonStyles,
    getActiveTabButtonContentStyles,
    activeTab,
  };
};

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

function ApiTabImage({ src, index, activeTab }) {
  if (index !== activeTab) return null;
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <img src={src} alt="" className="size-full object-cover" />
    </motion.div>
  );
}

function Layout491Api({ c }) {
  const useActive = useRelume();
  const items = c?.items;
  if (!String(c?.title ?? "").trim() || !Array.isArray(items) || items.length < 2)
    return null;
  const imageSrc =
    (c.image_url ?? c.imageUrl ?? "").trim() || PLACEHOLDER;

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          {c.badge ? (
            <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
          ) : null}
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {c.title}
          </h1>
          {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
        </div>
        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2 lg:gap-x-20">
          <div className="relative mb-8 grid auto-cols-fr grid-cols-1 items-start md:mb-0 md:items-stretch">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={useActive.setActiveTabSetter(index)}
                className={useActive.getActiveTabButtonStyles(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    useActive.setActiveTabSetter(index)();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                  {item.title}
                </h2>
                <motion.div
                  initial={false}
                  animate={useActive.getActiveTabButtonContentStyles(index)}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {item.description ? (
                    <p className="mt-3 md:mt-4">{item.description}</p>
                  ) : null}
                </motion.div>
              </div>
            ))}
          </div>
          <div className="flex max-h-full min-h-[240px] w-full items-center justify-center overflow-hidden md:min-h-[320px]">
            <AnimatePresence initial={false}>
              {items.map((_, index) => (
                <ApiTabImage
                  key={index}
                  src={imageSrc}
                  index={index}
                  activeTab={useActive.activeTab}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Layout491({ woo: c, apiOnly = false } = {}) {
  if (apiOnly) {
    return <Layout491Api c={c} />;
  }

  const useActive = useRelume();
  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Woo</p>
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Een Woo-oplossing die al werkt in de praktijk
          </h1>
          <p className="md:text-md">
            De Woo-oplossing van Staterra is geen concept. Deze draait al binnen
            overheidsorganisaties en wordt dagelijks gebruikt. De complexiteit
            is al opgelost — u kunt direct starten.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2 lg:gap-x-20">
          <div className="relative mb-8 grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start md:mb-0 md:items-stretch">
            <div
              onClick={useActive.setActiveTabSetter(0)}
              className={useActive.getActiveTabButtonStyles(0)}
            >
              <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Wat het doet
              </h2>
              <motion.div
                initial={false}
                animate={useActive.getActiveTabButtonContentStyles(0)}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-3 md:mt-4">
                  De oplossing ondersteunt de volledige Woo-werkstroom — van
                  aanvraag tot publicatie. Uw team werkt gestructureerd,
                  overzichtelijk en zonder handmatige stappen.
                </p>
              </motion.div>
            </div>
            <div
              onClick={useActive.setActiveTabSetter(1)}
              className={useActive.getActiveTabButtonStyles(1)}
            >
              <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Wat het doet
              </h2>
              <motion.div
                initial={false}
                animate={useActive.getActiveTabButtonContentStyles(1)}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-3 md:mt-4">
                  De oplossing ondersteunt de volledige Woo-werkstroom — van
                  aanvraag tot publicatie. Uw team werkt gestructureerd,
                  overzichtelijk en zonder handmatige stappen.
                </p>
              </motion.div>
            </div>
            <div
              onClick={useActive.setActiveTabSetter(2)}
              className={useActive.getActiveTabButtonStyles(2)}
            >
              <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                Wat het doet
              </h2>
              <motion.div
                initial={false}
                animate={useActive.getActiveTabButtonContentStyles(2)}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-3 md:mt-4">
                  De oplossing ondersteunt de volledige Woo-werkstroom — van
                  aanvraag tot publicatie. Uw team werkt gestructureerd,
                  overzichtelijk en zonder handmatige stappen.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="flex max-h-full w-full items-center justify-center overflow-hidden">
            <AnimatePresence initial={false}>
              <TabItem
                tabItem={{
                  heading: "Short heading goes here",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
                  image: {
                    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                    alt: "Relume placeholder image 1",
                  },
                }}
                index={0}
                activeTab={useActive.activeTab}
              />
              <TabItem
                tabItem={{
                  heading: "Short heading goes here",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
                  video: {
                    image: {
                      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg",
                      alt: "Relume placeholder image 2",
                    },
                    url: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
                  },
                }}
                index={1}
                activeTab={useActive.activeTab}
              />
              <TabItem
                tabItem={{
                  heading: "Short heading goes here",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
                  image: {
                    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
                    alt: "Relume placeholder image 3",
                  },
                }}
                index={2}
                activeTab={useActive.activeTab}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
