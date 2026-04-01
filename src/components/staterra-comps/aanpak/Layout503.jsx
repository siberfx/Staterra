"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React from "react";
import { CtaFromUrl } from "../ctaFromUrl";
import { pickImg } from "../IconOrFa";

const PLACEHOLDER =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

/** Actief: primary + contrasttekst; inactief: lichte achtergrond (zelfde patroon als Layout507). */
const tabTriggerClass = [
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap border px-5 py-2.5 text-sm font-bold leading-tight",
  "transition-[background-color,color,border-color] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2",
  "border-border-primary bg-white text-primary",
  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary",
  "md:px-6 md:py-3 md:text-base",
].join(" ");

const tabsListClass =
  "no-scrollbar relative mb-5 flex h-auto min-h-0 w-screen max-w-full flex-nowrap items-center justify-center gap-2 overflow-x-auto rounded-none border-0 bg-transparent p-0 px-[5vw] md:mb-6 md:w-auto md:flex-wrap md:gap-3 md:px-0";

export function Layout503({ principes: c, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(c?.title ?? "").trim()) return null;
    const tabs = Array.isArray(c.tabs) ? c.tabs : [];
    if (!tabs.length) return null;
    const defaultKey = String(tabs[0].key ?? "tab-0");

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="mb-12 md:mb-18 lg:mb-20">
            <div className="mx-auto max-w-lg text-center">
              {c.badge ? (
                <p className="mb-3 font-semibold md:mb-4">{c.badge}</p>
              ) : null}
              <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {c.title}
              </h1>
              {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
            </div>
          </div>
          <Tabs defaultValue={defaultKey} className="flex flex-col items-center">
            <TabsList className={tabsListClass}>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={String(tab.key)}
                  value={String(tab.key)}
                  className={tabTriggerClass}
                >
                  {tab.label ?? tab.key}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent
                key={String(tab.key)}
                value={String(tab.key)}
                className="data-[state=active]:animate-tabs"
              >
                <div className="grid grid-cols-1 border border-border-primary md:grid-cols-2 md:items-center">
                  <div className="p-6 md:p-8 lg:p-12">
                    {tab.badge ? (
                      <p className="mb-3 font-semibold md:mb-4">{tab.badge}</p>
                    ) : null}
                    <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      {tab.title}
                    </h2>
                    {tab.subtitle ? <p>{tab.subtitle}</p> : null}
                    <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                      {tab.cta_primary_text ? (
                        <CtaFromUrl
                          url={tab.cta_primary_url}
                          variant="secondary"
                          title={tab.cta_primary_text}
                        >
                          {tab.cta_primary_text}
                        </CtaFromUrl>
                      ) : null}
                    </div>
                  </div>
                  <div className="aspect-square">
                    <img
                      src={pickImg(tab, PLACEHOLDER)}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold md:mb-4">Principes</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Wat we anders doen
            </h1>
            <p className="md:text-md">
              Traditionele IT-trajecten zijn vaak traag, ondoorzichtig en
              afhankelijk van leveranciers. Onze aanpak draait om snelheid,
              transparantie en volledige controle — vanaf dag één.
            </p>
          </div>
        </div>
        <Tabs defaultValue="tab-one" className="flex flex-col items-center">
          <TabsList className={tabsListClass}>
            <TabsTrigger value="tab-one" className={tabTriggerClass}>
              Snelheid
            </TabsTrigger>
            <TabsTrigger value="tab-two" className={tabTriggerClass}>
              Transparantie
            </TabsTrigger>
            <TabsTrigger value="tab-three" className={tabTriggerClass}>
              Eigenaarschap
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="tab-one"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 border border-border-primary md:grid-cols-2 md:items-center">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="mb-3 font-semibold md:mb-4">Snelheid</p>
                <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                  Snel resultaat zonder omwegen
                </h2>
                <p>
                  Binnen drie maanden heeft u een werkend systeem dat direct
                  gebruikt wordt. We vermijden lange planningsfases en bouwen
                  direct naar resultaat — samen met uw organisatie.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Start verkenning" variant="secondary">
                    Start verkenning
                  </Button>
                </div>
              </div>
              <div className="aspect-square">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image 1"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="tab-two"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 border border-border-primary md:grid-cols-2 md:items-center">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="mb-3 font-semibold md:mb-4">Snelheid</p>
                <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                  Snel resultaat zonder omwegen
                </h2>
                <p>
                  Binnen drie maanden heeft u een werkend systeem dat direct
                  gebruikt wordt. We vermijden lange planningsfases en bouwen
                  direct naar resultaat — samen met uw organisatie.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Start verkenning" variant="secondary">
                    Start verkenning
                  </Button>
                </div>
              </div>
              <div className="aspect-square">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image 2"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="tab-three"
            className="data-[state=active]:animate-tabs"
          >
            <div className="grid grid-cols-1 border border-border-primary md:grid-cols-2 md:items-center">
              <div className="p-6 md:p-8 lg:p-12">
                <p className="mb-3 font-semibold md:mb-4">Snelheid</p>
                <h2 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                  Snel resultaat zonder omwegen
                </h2>
                <p>
                  Binnen drie maanden heeft u een werkend systeem dat direct
                  gebruikt wordt. We vermijden lange planningsfases en bouwen
                  direct naar resultaat — samen met uw organisatie.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Start verkenning" variant="secondary">
                    Start verkenning
                  </Button>
                </div>
              </div>
              <div className="aspect-square">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  className="w-full object-cover"
                  alt="Relume placeholder image 3"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
