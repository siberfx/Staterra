import React from "react";

const RELUME_ICON =
  "https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg";

/** Font Awesome-klassen (fa-solid …) of afbeeldings-URL. */
export function IconOrFa({ icon, imgClassName = "size-12", faClassName = "text-3xl text-text-primary" }) {
  const s = (icon ?? "").trim();
  if (!s) {
    return <img src={RELUME_ICON} className={imgClassName} alt="" />;
  }
  if (s.includes("fa-")) {
    return <i className={`${s} ${faClassName}`} aria-hidden />;
  }
  return <img src={s} className={imgClassName} alt="" />;
}

export function pickImg(obj, fallback = "") {
  const u = (obj?.image_url ?? obj?.imageUrl ?? "").trim();
  return u || fallback;
}
