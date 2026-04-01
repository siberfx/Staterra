"use client";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@relume_io/relume-ui";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER_IMG =
  "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

/** Actief: primary + witte tekst; inactief: witte achtergrond + primary tekst. */
const tabTriggerClass = [
  "flex w-full items-center justify-center gap-4 whitespace-normal border-0 p-6 text-md font-bold leading-[1.4]",
  "transition-[background-color,color,border-color] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "border-b border-border bg-white text-primary",
  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary",
  "md:border-b-0 md:border-r md:border-border md:px-8 md:py-6 md:text-xl md:last:border-r-0",
  "md:data-[state=active]:border-primary",
].join(" ");

const tabsListClass =
  "flex h-auto w-full flex-col rounded-none border-0 border-b-2 border-primary bg-white p-0 md:flex-row";

const DEFAULT_TAB_PANELS = [
  {
    value: "tab-1",
    label: "Woo-verzoeken stapelen zich op",
    tagline: "Herkenning",
    title: "Woo-verzoeken stapelen zich op",
    paragraphs: [
      "Uw team verwerkt aanvragen handmatig. Termijnen worden gemist.",
      "Wat een proces moet zijn, voelt als een constante achterstand.",
    ],
    primaryCta: "Bekijk hoe wij dit oplossen",
  },
  {
    value: "tab-2",
    label: "NDS-integratie voelt als een berg",
    tagline: "Uw uitdaging",
    title: "NDS-integratie voelt als een berg",
    paragraphs: [
      "Nieuwe standaarden, bestaande systemen. U weet niet waar te beginnen. Leveranciers beloven veel — maar u houdt geen overzicht.",
    ],
    primaryCta: "Bekijk hoe wij dit oplossen",
  },
  {
    value: "tab-3",
    label: "Leveranciers bepalen uw toekomst",
    tagline: "Wat dit betekent in de praktijk",
    title: "Leveranciers bepalen uw toekomst",
    paragraphs: [
      "U bent afhankelijk van externe partijen voor updates, onderhoud en keuzes. Uw organisatie bepaalt niet meer zelf wat er gebeurt — en wanneer.",
    ],
    primaryCta: "Bekijk hoe u controle terugkrijgt",
  },
  {
    value: "tab-4",
    label: "Budgetten staan vast, resultaten blijven uit",
    tagline: "Wat er in de praktijk gebeurt",
    title: "Budgetten staan vast, maar resultaten blijven uit",
    paragraphs: [
      "U investeert, maar ziet geen voortgang. Maanden verstrijken, zonder duidelijk resultaat. Wat levert het u werkelijk op?",
    ],
    primaryCta: "Zo krijgt u weer controle",
  },
  {
    value: "tab-5",
    label: "Uw IT-afdeling heeft geen capaciteit",
    tagline: "De werkelijkheid",
    title: "Uw IT-afdeling heeft geen capaciteit",
    paragraphs: [
      "Regelgeving verandert. Uw systemen volgen niet. Uw IT-afdeling doet wat ze kan — maar heeft simpelweg niet de capaciteit om dit bij te houden.",
      "Daarom nemen wij dit over — zonder dat u uw IT-afdeling hoeft te belasten.",
    ],
    primaryCta: "Laat ons dit overnemen",
  },
  {
    value: "tab-6",
    label: "U weet niet waar u moet beginnen",
    tagline: "Het dilemma",
    title: "Snelheid en kwaliteit lijken tegenstrijdig",
    paragraphs: [
      "Snel bouwen betekent vaak concessies. Goed bouwen kost tijd. Daardoor blijft u kiezen tussen snelheid en kwaliteit.",
      "Wij doorbreken dit dilemma — met een aanpak waarin snelheid en kwaliteit samenkomen.",
    ],
    primaryCta: "Zo combineren wij snelheid en kwaliteit",
  },
];

function subtitleToParagraphs(subtitle) {
  if (subtitle == null || subtitle === "") return [];
  const parts = String(subtitle)
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(subtitle).trim()];
}

function buildTabPanelsFromApi(items) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return items.map((item, i) => ({
    value: `tab-${i + 1}`,
    label: item.title ?? `Item ${i + 1}`,
    tagline: item.badge ?? "",
    title: item.title ?? "",
    paragraphs: subtitleToParagraphs(item.subtitle),
    primaryCta: item.cta_text ?? "",
    ctaUrl: item.cta_url ?? null,
    imageUrl:
      typeof item.image_url === "string" && item.image_url.trim()
        ? item.image_url.trim()
        : null,
  }));
}

function CtaRow({ primaryCta, ctaUrl }) {
  if (!primaryCta) return null;
  const url = ctaUrl?.trim();
  const hasLink = url && url !== "#";

  const chevronBtn = (
    <Button
      title="Pijl"
      variant="link"
      size="link"
      type="button"
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-0 border-0 p-0"
      aria-label="Pijl"
    >
      <ChevronRightIcon />
    </Button>
  );

  if (hasLink && url.startsWith("http")) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
        <Button title={primaryCta} variant="secondary" type="button" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {primaryCta}
          </a>
        </Button>
        {chevronBtn}
      </div>
    );
  }
  if (hasLink) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
        <Button title={primaryCta} variant="secondary" type="button" asChild>
          <Link to={url}>{primaryCta}</Link>
        </Button>
        {chevronBtn}
      </div>
    );
  }
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
      <Button title={primaryCta} variant="secondary" type="button">
        {primaryCta}
      </Button>
      {chevronBtn}
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="0"
      viewBox="0 0 15 15"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TabPanelGrid({
  tagline,
  title,
  paragraphs,
  primaryCta,
  ctaUrl,
  imageUrl,
}) {
  const imgSrc =
    typeof imageUrl === "string" && imageUrl.trim()
      ? imageUrl.trim()
      : PLACEHOLDER_IMG;

  return (
    <div className="grid grid-cols-1 gap-y-12 p-6 md:grid-cols-2 md:items-center md:gap-x-12 md:p-8 lg:gap-x-20 lg:p-12">
      <div>
        {tagline ? (
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
        ) : null}
        <h2 className="mb-5 text-3xl font-bold leading-[1.2] sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <div className="space-y-4 text-text-primary">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <CtaRow primaryCta={primaryCta} ctaUrl={ctaUrl} />
      </div>
      <div>
        <img
          src={imgSrc}
          className="w-full object-cover"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

const DEFAULT_HERKENNING = {
  badge: "Herkenning",
  title: "Herkent u zichzelf?",
  subtitle:
    "Veel organisaties lopen tegen dezelfde knelpunten aan. Herkent u een van deze situaties?",
};

export function Layout507({ herkenning: herkenningProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!herkenningProp?.items?.length) return null;
    if (!String(herkenningProp?.title ?? "").trim()) return null;
  }

  const herkenning = apiOnly
    ? { ...herkenningProp }
    : { ...DEFAULT_HERKENNING, ...herkenningProp };

  const tabPanels = useMemo(() => {
    if (apiOnly) {
      const fromApi = buildTabPanelsFromApi(herkenningProp?.items);
      return (fromApi ?? []).map((p) => ({
        ...p,
        ctaUrl: p.ctaUrl ?? null,
      }));
    }
    const fromApi = buildTabPanelsFromApi(herkenningProp?.items);
    if (fromApi?.length) {
      return fromApi.map((p) => ({
        ...p,
        ctaUrl: p.ctaUrl ?? null,
      }));
    }
    return DEFAULT_TAB_PANELS.map((p) => ({ ...p, ctaUrl: null }));
  }, [herkenningProp?.items, apiOnly]);

  if (!tabPanels.length) return null;

  const defaultTab = tabPanels[0]?.value ?? "tab-1";

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          {herkenning.badge ? (
            <p className="mb-3 font-semibold md:mb-4">{herkenning.badge}</p>
          ) : null}
          {herkenning.title ? (
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
              {herkenning.title}
            </h1>
          ) : null}
          {herkenning.subtitle ? (
            <p className="md:text-md">{herkenning.subtitle}</p>
          ) : null}
        </div>

        <div className="relative grid auto-cols-fr grid-cols-1 gap-x-12 border border-border-primary bg-white lg:gap-x-0">
          <Tabs key={defaultTab} defaultValue={defaultTab} className="w-full">
            <TabsList
              aria-orientation="horizontal"
              className={tabsListClass}
            >
              {tabPanels.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className={tabTriggerClass}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabPanels.map((panel) => (
              <TabsContent
                key={panel.value}
                value={panel.value}
                className="focus-visible:outline-none data-[state=active]:animate-tabs"
              >
                <TabPanelGrid
                  tagline={panel.tagline}
                  title={panel.title}
                  paragraphs={panel.paragraphs}
                  primaryCta={panel.primaryCta}
                  ctaUrl={panel.ctaUrl}
                  imageUrl={panel.imageUrl}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
