"use client";

import { Button, Input, Label, Textarea } from "@relume_io/relume-ui";
import React, { useState } from "react";

const selectClass =
  "flex h-11 w-full rounded-md border border-border-primary bg-background-primary px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-primary";

const TOPIC_NAMES = new Set(["topic", "reden", "onderwerp", "subject"]);

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fieldColClass(width) {
  return width === "half" ? "md:col-span-1" : "md:col-span-2";
}

export function DynamicContactFields({
  fields,
  getFieldError,
  topicDraft,
  onTopicChange,
  showAttachmentDynamic,
  submitButtonText,
  submitting,
}) {
  const [fileMeta, setFileMeta] = useState({});

  const setFileFor = (name, file) => {
    setFileMeta((prev) => ({
      ...prev,
      [name]: file && file.size ? { name: file.name, size: file.size } : null,
    }));
  };

  const hiddenFields = fields.filter((f) => f.type === "hidden");
  const visibleFields = fields.filter((f) => f.type !== "hidden");

  return (
    <>
      <div className="hidden md:col-span-2" aria-hidden>
        {hiddenFields.map((f) => (
          <input
            key={f.name}
            type="hidden"
            name={f.name}
            defaultValue={f.defaultValue ?? ""}
          />
        ))}
      </div>

      {visibleFields.map((field) => {
        const span = fieldColClass(field.width);
        const id = `cf-${field.name}`;
        const err = getFieldError(field.name);
        const isTopic = TOPIC_NAMES.has(field.name);

        if (field.type === "checkbox") {
          if (
            field.checkboxOptionValue != null &&
            Array.isArray(field.options) &&
            field.options.length > 0
          ) {
            const optLabel = field.options[0]?.label ?? field.label;
            return (
              <div key={field.name} className="md:col-span-2">
                <p className="mb-2 text-sm font-medium text-text-primary">
                  {field.label}
                  {field.required ? " *" : ""}
                </p>
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    id={id}
                    type="checkbox"
                    name={field.name}
                    value={field.checkboxOptionValue}
                    required={field.required}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-border-primary text-primary focus:ring-border-primary"
                  />
                  <Label htmlFor={id} className="cursor-pointer leading-snug">
                    {optLabel}
                  </Label>
                </div>
                {err ? (
                  <p className="mt-1 text-sm text-red-600">{err}</p>
                ) : null}
              </div>
            );
          }
          return (
            <div key={field.name} className="md:col-span-2">
              <div className="flex items-start space-x-2 text-sm">
                <input
                  id={id}
                  type="checkbox"
                  name={field.name}
                  required={field.required}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-border-primary text-primary focus:ring-border-primary"
                />
                <Label htmlFor={id} className="cursor-pointer leading-snug">
                  {field.label}
                  {field.required ? " *" : ""}
                </Label>
              </div>
              {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
            </div>
          );
        }

        if (field.type === "radio" && field.options?.length) {
          const layoutClass =
            field.radioLayout === "inline"
              ? "flex flex-wrap gap-x-6 gap-y-3"
              : "flex flex-col gap-3";
          return (
            <fieldset key={field.name} className={`w-full ${span}`}>
              <legend className="mb-2 text-sm font-medium text-text-primary">
                {field.label}
                {field.required ? " *" : ""}
              </legend>
              <div className={layoutClass}>
                {field.options.map((o, ri) => {
                  const rid = `${id}-r-${String(o.value)}`;
                  return (
                    <label
                      key={String(o.value)}
                      htmlFor={rid}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        id={rid}
                        type="radio"
                        name={field.name}
                        value={o.value}
                        required={field.required && ri === 0}
                        className="h-4 w-4 shrink-0 border-border-primary text-primary focus:ring-border-primary"
                      />
                      <span>{o.label}</span>
                    </label>
                  );
                })}
              </div>
              {err ? (
                <p className="mt-1 text-sm text-red-600">{err}</p>
              ) : null}
            </fieldset>
          );
        }

        if (field.type === "radio") {
          return null;
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name} className={`grid w-full items-center ${span}`}>
              <Label htmlFor={id} className="mb-2">
                {field.label}
                {field.required ? " *" : ""}
              </Label>
              <Textarea
                id={id}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder || undefined}
                rows={field.rows}
                className="min-h-[11.25rem] overflow-auto"
              />
              {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name} className={`grid w-full items-center ${span}`}>
              <Label htmlFor={id} className="mb-2">
                {field.label}
                {field.required ? " *" : ""}
              </Label>
              {isTopic ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  className={selectClass}
                  value={topicDraft}
                  onChange={(e) => onTopicChange(e.target.value)}
                >
                  <option value="">
                    {field.placeholder || "Kies…"}
                  </option>
                  {field.options.map((o) => (
                    <option key={String(o.value)} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  className={selectClass}
                  defaultValue={field.defaultValue ?? ""}
                >
                  <option value="">
                    {field.placeholder || "Kies…"}
                  </option>
                  {field.options.map((o) => (
                    <option key={String(o.value)} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
            </div>
          );
        }

        if (field.type === "file") {
          const meta = fileMeta[field.name];
          const showReq = field.required || showAttachmentDynamic;
          return (
            <div key={field.name} className={`grid w-full items-center ${span}`}>
              <Label htmlFor={id} className="mb-2">
                {field.label}
                {showReq ? " *" : ""}
              </Label>
              <label
                htmlFor={id}
                className="flex min-h-[5rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border-primary bg-background-primary px-4 py-3 text-center transition-colors hover:border-primary/50"
              >
                <span className="text-sm text-text-secondary">
                  {field.placeholder ||
                    "Klik om een bestand te kiezen (max. 10 MB)"}
                </span>
                <input
                  type="file"
                  id={id}
                  name={field.name}
                  accept={field.accept}
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setFileFor(field.name, f || null);
                    e.target.value = "";
                  }}
                />
              </label>
              {meta ? (
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span className="truncate text-text-primary">{meta.name}</span>
                  <span className="shrink-0 text-text-secondary">
                    {formatFileSize(meta.size)}
                  </span>
                  <button
                    type="button"
                    className="shrink-0 text-red-600 hover:underline"
                    onClick={() => {
                      setFileFor(field.name, null);
                      const el = document.getElementById(id);
                      if (el) el.value = "";
                    }}
                  >
                    Verwijderen
                  </button>
                </div>
              ) : null}
              {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
            </div>
          );
        }

        const inputType =
          field.type === "email"
            ? "email"
            : field.type === "tel"
              ? "tel"
              : field.type === "number"
                ? "number"
                : "text";

        return (
          <div key={field.name} className={`grid w-full items-center ${span}`}>
            <Label htmlFor={id} className="mb-2">
              {field.label}
              {field.required ? " *" : ""}
            </Label>
            <Input
              type={inputType}
              id={id}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder || undefined}
              autoComplete={field.autocomplete || undefined}
            />
            {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
          </div>
        );
      })}

      <div className="md:col-span-2">
        <Button type="submit" title={submitButtonText} disabled={submitting}>
          {submitting ? "…" : submitButtonText}
        </Button>
      </div>
    </>
  );
}
