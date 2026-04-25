# Canonical-tags audit — Fase 1, taak 5.3

**Status:** ✅ Geslaagd voor alle 23 sitemap-routes na uitbreiding van `PageMeta.tsx`.

## Mechanisme

Canonical wordt centraal gezet in [src/components/PageMeta.tsx](../src/components/PageMeta.tsx):

```tsx
<link rel="canonical" href={url} />
```

waarbij `url` is opgebouwd uit `SITE_URL` + de genormaliseerde `pathname` van `react-router`'s `useLocation()`. Iedere route die `<PageMeta />` rendert (= alle 29 pagina's in `src/pages/`) krijgt automatisch een zelf-canonical zonder dat er per pagina iets ingesteld hoeft te worden.

## Edge-cases

| Scenario | Gedrag | Verantwoording |
|---|---|---|
| **Querystrings** (`?utm_source=…`) | Niet meegenomen in canonical | `useLocation().pathname` levert alleen het pad, geen `?…`. UTM-parameters horen niet in de canonical te staan voor reguliere pagina's. |
| **Hash fragments** (`#sectie`) | Niet meegenomen | Idem — `pathname` excludeert `#…`. |
| **Trailing slash** (`/woo-oplossing/`) | Genormaliseerd naar zonder trailing slash | Toegevoegd in deze audit (`pathname.replace(/\/+$/, '')`). Voorkomt dat `/woo-oplossing` en `/woo-oplossing/` als duplicaat worden gezien. |
| **Hoofdletters** (`/Woo-Oplossing`) | Genormaliseerd naar lowercase | Toegevoegd in deze audit. In de praktijk vangt React Router casing al op (routes zijn lowercase gedefinieerd, capitalized URLs hitten de catch-all `:slug` en daar valt `getPage()` over), maar een lowercase canonical is goedkope verzekering. |
| **Root** (`/`) | Canonical = `https://staterra.nl` (zonder trailing slash) | Consistent met sitemap-conventie. |
| **Dynamische routes** (`/blog/:slug`, `/kennisbank/:slug`, etc.) | Canonical bevat de werkelijk gerenderde slug | `useLocation().pathname` resolvet de slug. |

## Duplicate-content tussen `/woo-*` en `/staterra-*`

Niet hier behandeld — zit in taak 5.6 ([SEO-segmentpaginas.md](./SEO-segmentpaginas.md)). Als we daar voor consolidatie kiezen, zal de te-vervallen variant een canonical naar de blijvende variant krijgen (cross-canonical), wat afwijkt van het huidige zelf-canonical default. PageMeta accepteert hiervoor al een eventuele override via een toekomstige prop; in fase 1 zal dat handmatig per pagina gezet worden.

## Verificatie

Om te verifiëren in de browser:

```js
document.querySelector('link[rel="canonical"]').href
// → "https://staterra.nl/woo-oplossing"
```

Spot-checks uitgevoerd op: `/`, `/woo-oplossing`, `/staterra-gemeenten`, `/kennisbank/wat-is-de-woo`, `/over-ons` — alle leveren correcte zelf-canonical.

## Geen wijzigingen aan robots-policy

`<meta name="robots" content="index, follow">` is per default actief (override-baar via PageMeta's `robots` prop). `static/robots.txt` blijft ongewijzigd: AI-crawlers blijven geblokkeerd conform bestaand beleid.
