"use client";

import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { useSettings } from "../../../contexts/SiteContext";
import {
  needsAttachmentForReden,
  useContactForm,
} from "../../../hooks/useContactForm";
import { ShimmerBlock } from "../../layout/ShimmerBlock";
import { DynamicContactFields } from "./DynamicContactFields";

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const selectClass =
  "flex h-11 w-full rounded-md border border-border-primary bg-background-primary px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-primary";

const CONTACT_SIDE_IMAGE = "/assets/hero-banner.jpg";

export function Contact6({ verkenning, initialSections }) {
  const { settings, loading } = useSettings();
  const cmsInfo = verkenning?.contact_informations;
  const email = cmsInfo?.email ?? settings.site?.email;
  const phone = cmsInfo?.phone ?? settings.site?.phone;
  const address = cmsInfo?.location ?? settings.site?.address;
  const siteName = settings.site?.name?.trim();
  const sideImage = (verkenning?.image_url ?? "").trim() || CONTACT_SIDE_IMAGE;
  const badgeText = (verkenning?.badge ?? "").trim() || "Verkenning";
  const verkenTitle =
    (verkenning?.title ?? "").trim() ||
    "Samen brengen we uw vraagstuk snel terug tot een concrete aanpak.";
  const verkenSubtitle =
    (verkenning?.subtitle ?? "").trim() || "Uw vraag of uitdaging";

  const {
    config,
    configLoading,
    isDynamic,
    submitting,
    success,
    error,
    reden,
    setReden,
    selectedFile,
    setSelectedFile,
    handleSubmit,
    getFieldError,
    subjects,
    contactPreferences,
    showAttachment,
  } = useContactForm({ initialSections });

  const [topicDraft, setTopicDraft] = useState("");

  useEffect(() => {
    if (success) setTopicDraft("");
  }, [success]);

  const showAttachmentDynamic =
    isDynamic && config
      ? needsAttachmentForReden(topicDraft, config)
      : showAttachment;

  return (
    <section id="relume" className="py-16 md:py-24 lg:py-28">
      <div className="w-full">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:gap-x-20">
          {/* ---- LEFT: info ---- */}
          <div>
            <div className="mb-6 md:mb-8">
              <p className="mb-3 font-semibold md:mb-4">{badgeText}</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {verkenTitle}
              </h2>
              <p className="md:text-md">{verkenSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 py-2">
              {loading ? (
                <div className="space-y-5" aria-busy="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ShimmerBlock className="size-6 shrink-0 rounded-md" />
                      <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                        <ShimmerBlock className="h-4 w-40" />
                        <ShimmerBlock className="h-4 w-full max-w-xs" />
                        <ShimmerBlock className="h-4 w-5/6 max-w-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {email && (
                    <div className="flex items-center gap-4">
                      <BiEnvelope className="size-6 flex-none" />
                      <a href={`mailto:${email}`} className="hover:underline">
                        {email}
                      </a>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center gap-4">
                      <BiPhone className="size-6 flex-none" />
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:underline">
                        {phone}
                      </a>
                    </div>
                  )}
                  {address && (
                    <div className="flex items-center gap-4">
                      <BiMap className="size-6 flex-none" />
                      <p className="whitespace-pre-line">{address}</p>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-10 w-full max-w-lg md:mt-12">
              <img
                src={sideImage}
                alt={
                  siteName
                    ? `Sfeerbeeld — ${siteName}`
                    : "Sfeerbeeld bij contact"
                }
                width={512}
                height={384}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          {/* ---- RIGHT: form ---- */}
          <form
            onSubmit={handleSubmit}
            className={
              isDynamic
                ? "grid max-w-lg grid-cols-1 gap-6 md:grid-cols-2"
                : "grid max-w-lg grid-cols-1 grid-rows-[auto_auto] gap-6"
            }
          >
            {success && (
              <div
                className={`rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900 ${
                  isDynamic ? "md:col-span-2" : ""
                }`}
              >
                {success}
              </div>
            )}
            {error && (
              <div
                className={`rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 ${
                  isDynamic ? "md:col-span-2" : ""
                }`}
              >
                {error}
              </div>
            )}

            {configLoading && (
              <div className="space-y-4 md:col-span-2" aria-busy="true">
                <ShimmerBlock className="h-10 w-full md:col-span-2" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ShimmerBlock className="h-11 w-full" />
                  <ShimmerBlock className="h-11 w-full" />
                </div>
                <ShimmerBlock className="h-24 w-full" />
                <ShimmerBlock className="h-11 w-40" />
              </div>
            )}

            {!configLoading && isDynamic && config?.fields?.length ? (
              <DynamicContactFields
                fields={config.fields}
                getFieldError={getFieldError}
                topicDraft={topicDraft}
                onTopicChange={setTopicDraft}
                showAttachmentDynamic={showAttachmentDynamic}
                submitButtonText={config.submit_button_text ?? "Versturen"}
                submitting={submitting}
              />
            ) : null}

            {!configLoading && !isDynamic ? (
              <>
            {/* voornaam / first_name */}
            <div className="grid grid-cols-2 gap-6">
              <div className="grid w-full items-center">
                <Label htmlFor="first_name" className="mb-2">
                  Voornaam *
                </Label>
                <Input
                  type="text"
                  id="first_name"
                  name="first_name"
                  autoComplete="given-name"
                  required
                />
                {getFieldError("first_name") && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError("first_name")}</p>
                )}
              </div>

              {/* achternaam / last_name */}
              <div className="grid w-full items-center">
                <Label htmlFor="last_name" className="mb-2">
                  Achternaam *
                </Label>
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  autoComplete="family-name"
                  required
                />
                {getFieldError("last_name") && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError("last_name")}</p>
                )}
              </div>
            </div>

            {/* email + phone */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid w-full items-center">
                <Label htmlFor="email" className="mb-2">
                  E-mailadres *
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                />
                {getFieldError("email") && (
                  <p className="mt-1 text-sm text-red-600">{getFieldError("email")}</p>
                )}
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="phone" className="mb-2">
                  Telefoonnummer
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Optioneel"
                />
              </div>
            </div>

            {/* onderwerp / reden */}
            <div className="grid w-full items-center">
              <Label htmlFor="reden" className="mb-2">
                Onderwerp / reden *
              </Label>
              {subjects.length > 0 ? (
                <select
                  id="reden"
                  name="reden"
                  required
                  value={reden}
                  onChange={(e) => setReden(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Kies een onderwerp</option>
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label ?? s.value}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type="text"
                  id="reden"
                  name="reden"
                  required
                  value={reden}
                  onChange={(e) => setReden(e.target.value)}
                  placeholder="Kies een onderwerp"
                />
              )}
              {getFieldError("reden") && (
                <p className="mt-1 text-sm text-red-600">{getFieldError("reden")}</p>
              )}
            </div>

            {/* organisatie / company_name */}
            <div className="grid w-full items-center">
              <Label htmlFor="organisatie" className="mb-2">
                Organisatie
              </Label>
              <Input
                type="text"
                id="organisatie"
                name="organisatie"
                placeholder="Optioneel"
              />
            </div>

            {/* contact_preference */}
            <div className="grid w-full items-center">
              <Label htmlFor="contact_preference" className="mb-2">
                Voorkeur contact
              </Label>
              <select
                id="contact_preference"
                name="contact_preference"
                defaultValue="query"
                className={selectClass}
              >
                {contactPreferences.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label ?? p.value}
                  </option>
                ))}
              </select>
            </div>

            {/* country_code */}
            <div className="grid w-full items-center">
              <Label htmlFor="country_code" className="mb-2">
                Landcode
              </Label>
              <Input
                type="text"
                id="country_code"
                name="country_code"
                placeholder="Optioneel, bijv. NL"
              />
            </div>

            {/* bericht */}
            <div className="grid w-full items-center">
              <Label htmlFor="bericht" className="mb-2">
                Bericht *
              </Label>
              <Textarea
                id="bericht"
                name="bericht"
                required
                placeholder="Beschrijf kort uw vraag of situatie — wij vertalen dit naar een concrete aanpak"
                className="min-h-[11.25rem] overflow-auto"
              />
              {getFieldError("bericht") && (
                <p className="mt-1 text-sm text-red-600">{getFieldError("bericht")}</p>
              )}
            </div>

            {/* bijlage */}
            <div className="grid w-full items-center">
              <Label htmlFor="bijlage" className="mb-2">
                Bijlage{showAttachmentDynamic ? " *" : ""}
              </Label>
              <label
                htmlFor="bijlage"
                className="flex min-h-[5rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border-primary bg-background-primary px-4 py-3 text-center transition-colors hover:border-primary/50"
              >
                <span className="text-sm text-text-secondary">
                  Klik om een bestand te kiezen — PDF, JPG, PNG, DOC, XLS, PPT
                  (max. 10 MB)
                </span>
                <input
                  type="file"
                  id="bijlage"
                  name="bijlage"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setSelectedFile(f || null);
                    e.target.value = "";
                  }}
                />
              </label>
              {selectedFile && (
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span className="truncate text-text-primary">
                    {selectedFile.name}
                  </span>
                  <span className="shrink-0 text-text-secondary">
                    {formatFileSize(selectedFile.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="shrink-0 text-red-600 hover:underline"
                  >
                    Verwijderen
                  </button>
                </div>
              )}
            </div>

            {/* avg-optin (privacy) */}
            <div className="flex items-center space-x-2 text-sm">
              <input
                id="avg-optin"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-border-primary text-primary focus:ring-border-primary"
              />
              <Label htmlFor="avg-optin" className="cursor-pointer">
                Ik ga akkoord met de voorwaarden en privacyverklaring
              </Label>
            </div>
            {getFieldError("avg-optin") && (
              <p className="text-sm text-red-600">{getFieldError("avg-optin")}</p>
            )}

            {/* nieuwsbrief */}
            <div className="-mt-4 flex items-center space-x-2 text-sm">
              <input
                id="nieuwsbrief"
                type="checkbox"
                className="h-4 w-4 rounded border-border-primary text-primary focus:ring-border-primary"
              />
              <Label htmlFor="nieuwsbrief" className="cursor-pointer">
                Ik wil graag de nieuwsbrief ontvangen
              </Label>
            </div>

            {/* submit */}
            <div>
              <Button type="submit" title="Plan verkenning" disabled={submitting}>
                {submitting ? "…" : "Plan verkenning"}
              </Button>
            </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
