import { FaIcon } from "../../Icons/FaIcon";

/** Alleen echte afbeelding-URL's; Font Awesome-klassen (b.v. "fa-solid fa-comments") niet. */
export function isSectionIconImageUrl(icon) {
  if (!icon || typeof icon !== "string") return false;
  const t = icon.trim();
  if (/^https?:\/\//i.test(t)) return true;
  if (t.startsWith("/") && /\.(svg|png|jpe?g|webp|gif)(\?|$)/i.test(t)) return true;
  return false;
}

/**
 * Homepage-new secties: `icon` is een Font Awesome-class string, geen image-URL.
 * Ondersteunt nog steeds een image-URL indien die ooit wordt meegegeven.
 */
export function SectionItemIcon({ icon, className }) {
  if (isSectionIconImageUrl(icon)) {
    return (
      <img
        src={icon.trim()}
        alt=""
        className={["size-12 object-contain", className].filter(Boolean).join(" ")}
      />
    );
  }
  return (
    <span
      className={[
        "inline-flex size-12 items-center justify-center text-text-main",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <FaIcon
        icon={icon}
        fallback="fa-solid fa-layer-group"
        className="text-4xl leading-none"
      />
    </span>
  );
}
