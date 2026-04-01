import { Button } from "@relume_io/relume-ui";
import { Link } from "react-router-dom";

/** Relume Button als interne link, externe link of statische knop (url leeg / #). */
export function CtaFromUrl({
  url,
  variant = "secondary",
  size,
  title,
  iconRight,
  className,
  children,
}) {
  const u = url?.trim();
  if (u && u !== "#") {
    if (u.startsWith("http")) {
      return (
        <Button
          title={title}
          variant={variant}
          size={size}
          iconRight={iconRight}
          className={className}
          asChild
        >
          <a href={u} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Button>
      );
    }
    return (
      <Button
        title={title}
        variant={variant}
        size={size}
        iconRight={iconRight}
        className={className}
        asChild
      >
        <Link to={u}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button
      title={title}
      variant={variant}
      size={size}
      iconRight={iconRight}
      className={className}
    >
      {children}
    </Button>
  );
}

export function CtaLinkFromUrl({ url, variant = "link", size = "link", title, iconRight, className, children }) {
  return (
    <CtaFromUrl
      url={url}
      variant={variant}
      size={size}
      title={title}
      iconRight={iconRight}
      className={className}
    >
      {children}
    </CtaFromUrl>
  );
}
