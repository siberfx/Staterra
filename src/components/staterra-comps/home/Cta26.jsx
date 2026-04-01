"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import { post } from "../../../services/api";

const DEFAULT_NEWSLETTER = {
  title: "Binnen enkele maanden naar een werkende oplossing",
  subtitle:
    "Plan een verkenning en krijg direct inzicht in de aanpak, doorlooptijd en haalbaarheid voor uw organisatie",
  email_placeholder: "Uw werk e-mailadres",
  button_text: "Plan verkenning",
  terms_text: "U ontvangt binnen twee werkdagen een eerste voorstel",
  submit_endpoint: null,
};

function normalizeSubscribePath(endpoint) {
  if (endpoint == null || endpoint === "") return null;
  const s = String(endpoint).trim();
  if (s.startsWith("http")) return s;
  return s.replace(/^\/api\//, "").replace(/^\//, "");
}

export function Cta26({ newsletter: newsletterProp, apiOnly = false } = {}) {
  if (apiOnly) {
    if (!String(newsletterProp?.title ?? "").trim()) return null;
  }
  const cfg = apiOnly
    ? { ...newsletterProp }
    : { ...DEFAULT_NEWSLETTER, ...newsletterProp };
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const path = normalizeSubscribePath(cfg.submit_endpoint);
    if (!path) {
      setStatus("error");
      return;
    }
    const form = e.target;
    const email = form.email?.value?.trim();
    if (!email) return;
    setPending(true);
    setStatus(null);
    try {
      await post(path, { email });
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-lg text-center">
        <div>
          <h2 className="rb-5 mb-5 text-4xl font-bold sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
            {cfg.title}
          </h2>
          {cfg.subtitle ? (
            <p className="md:text-md">{cfg.subtitle}</p>
          ) : null}
          <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
            <form
              className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
              onSubmit={onSubmit}
            >
              <Input
                id="home-newsletter-email"
                name="email"
                type="email"
                required
                placeholder={cfg.email_placeholder ?? ""}
                disabled={pending}
              />
              {cfg.button_text ? (
                <Button
                  title={cfg.button_text}
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="items-center justify-center px-6 py-3"
                  disabled={pending}
                >
                  {cfg.button_text}
                </Button>
              ) : null}
            </form>
            {cfg.terms_text ? (
              <p className="text-xs">{cfg.terms_text}</p>
            ) : null}
            {status === "ok" ? (
              <p className="mt-2 text-sm text-green-700" role="status">
                Bedankt — u bent aangemeld.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {cfg.submit_endpoint
                  ? "Aanmelden mislukt. Probeer het later opnieuw."
                  : "Nieuwsbrief is nog niet geconfigureerd."}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
