"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";
import { CtaFromUrl } from "../ctaFromUrl";

const plusIcon = (
  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
);

export function Faq5({ vragen: c, apiOnly = false } = {}) {
  if (apiOnly) {
    const items = Array.isArray(c?.items) ? c.items : [];
    if (!items.length) return null;
    const bottom = c?.bottom_cta ?? {};

    return (
      <section id="relume" className="py-16 md:py-24 lg:py-28">
        <div className="w-full">
          <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {c.title ?? "Vragen"}
            </h2>
            {c.subtitle ? <p className="md:text-md">{c.subtitle}</p> : null}
          </div>
          <Accordion
            type="multiple"
            className="grid items-start justify-stretch gap-4"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border-primary px-5 md:px-6"
              >
                <AccordionTrigger
                  icon={plusIcon}
                  className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="md:pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {bottom.title || bottom.cta_text ? (
            <div className="mt-12 md:mt-18 lg:mt-20">
              {bottom.title ? (
                <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  {bottom.title}
                </h4>
              ) : null}
              {bottom.subtitle ? (
                <p className="md:text-md">{bottom.subtitle}</p>
              ) : null}
              {bottom.cta_text ? (
                <div className="mt-6 md:mt-8">
                  <CtaFromUrl
                    url={bottom.cta_url}
                    variant="secondary"
                    title={bottom.cta_text}
                  >
                    {bottom.cta_text}
                  </CtaFromUrl>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Vragen
          </h2>
          <p className="md:text-md">
            Antwoorden op wat u wilt weten over ons proces en werkwijze.
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <AccordionItem
            value="item-0"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={plusIcon}
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Hoe snel gaat dit?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Binnen drie maanden heeft u een werkend systeem in gebruik. Na
              negen maanden is het volledig ontwikkeld en klaar voor productie.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-1"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={plusIcon}
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Wie bepaalt de richting?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              U bepaalt wat gebouwd wordt. Wij zorgen dat het snel en goed
              gebeurt.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={plusIcon}
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Wat gebeurt er na negen maanden?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              U heeft volledige controle over het systeem. U kunt het zelf
              beheren, aanpassen en doorontwikkelen — zonder afhankelijkheid van
              ons.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={plusIcon}
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Werkt dit voor onze organisatie?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Deze aanpak werkt voor ministeries, provincies, gemeenten en
              waterschappen. Groot of klein — we passen ons aan uw situatie aan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={plusIcon}
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Wat kost dit?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              De kosten hangen af van wat u wilt bouwen en hoe complex het is.
              In de verkenning krijgt u een concreet voorstel — zonder
              verrassingen.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Nog meer vragen?
          </h4>
          <p className="md:text-md">We denken graag met u mee.</p>
          <div className="mt-6 md:mt-8">
            <Button title="Neem contact op" variant="secondary">
              Neem contact op
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
