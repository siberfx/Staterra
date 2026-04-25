# Alt-attribuut audit — Fase 1, taak 5.4

**Status:** ✅ Geen WCAG 2.1 SC 1.1.1-overtredingen in live code. Aria-hidden toegevoegd op 3 representatieve hero-banners.

## Cijfers

Geautomatiseerde scan over `src/` (excl. `staterra-comps/`, zie hieronder):

| Categorie | Aantal | Beoordeling |
|---|---:|---|
| Alt-attribuut volledig ontbrekend | **0** | ✅ |
| Alt = `""` (decoratief) | 31 | ✅ Correct voor de gevallen die we hebben — kaartthumbnails, avatars, hero-overlays, placeholders |
| Alt = `{dynamic expression}` | 17 | ✅ Code is correct, kwaliteit hangt af van CMS-content |
| Alt = `"<vague string>"` (logo / image / photo / placeholder) | **0** in live code | ✅ |
| Alt met betekenisvolle tekst | 5 | ✅ |
| **Totaal in live code** | **53** | |

## Dode scaffold-code: `src/components/staterra-comps/`

Deze map bevat **83 extra `<img>`-elementen** (waarvan 18 met `alt="Relume placeholder image"` of `alt="Relume logo 1"`) — duidelijk overgebleven uit een Relume-template. **Geen enkel bestand in `src/` importeert hieruit**, dus deze code wordt nooit gerenderd en heeft geen SEO-impact.

**Aanbeveling**: verwijder `src/components/staterra-comps/` in een aparte cleanup-PR. Buiten scope voor batch 1 (zou de diff onnodig opblazen en is geen SEO-werk in strikte zin), maar het is gratis loose-end opruimen voor zowel build-tijd als bundle-omvang.

## Wat is gefixt in deze audit

Drie hero-/banner-images krijgen `aria-hidden="true"` als expliciete signal voor screen readers, omdat het puur visuele overlays zijn waarvan de inhoud al in de tekstblokken naast de afbeelding staat:

| Bestand | Reden |
|---|---|
| [src/components/hero/HomeHero.jsx:81](../src/components/hero/HomeHero.jsx#L81) | Homepage-hero: tekst met pay-off staat in naburige `<div>`. |
| [src/components/hero/PageHero.jsx:9](../src/components/hero/PageHero.jsx#L9) | Generieke pagina-hero met dark overlay; titel zit boven. |
| [src/pages/Contact.tsx:110](../src/pages/Contact.tsx#L110) | Banner met `opacity-20` — gedraagt zich als achtergrond. |

`alt=""` zonder `aria-hidden` was strikt genomen al WCAG-compliant. Toevoeging volgt de prompt-aanbeveling ("bij voorkeur aria-hidden=true").

## Wat NIET is aangeraakt en waarom

### Card-thumbnails en avatars (`alt=""`)

Bestanden zoals [TeaserCard.jsx](../src/components/cards/TeaserCard.jsx), [HorizontalCard.jsx](../src/components/cards/HorizontalCard.jsx), [ActueelCard.jsx](../src/components/cards/ActueelCard.jsx), [DetailHeader.jsx](../src/components/content/DetailHeader.jsx), [MediaHub.jsx](../src/components/content/MediaHub.jsx) renderen kaarten waar de titel/auteur naast de afbeelding al de informatie levert. WCAG SC 1.1.1 staat een leeg alt-attribuut hier expliciet toe (decoratief). Aria-hidden toevoegen is cosmetisch en kan gevaarlijk zijn als de afbeelding in een interactief element zit (zoals een link). **Geen wijziging.**

### Dynamic alts (`alt={...}`)

17 plekken zetten alt via een prop of CMS-veld. Voorbeelden:

| Bestand | Expressie | Risico |
|---|---|---|
| [layout/Footer.tsx:158](../src/components/layout/Footer.tsx#L158) | `alt={site?.name ?? 'Staterra'}` | Laag — fallback aanwezig |
| [layout/Header.tsx:413](../src/components/layout/Header.tsx#L413) | `alt={siteName}` | Laag — siteName altijd gezet |
| [pages/Kennisbank.tsx:103](../src/pages/Kennisbank.tsx#L103) | `alt={post.title}` | Laag — post.title is verplicht veld |
| [content/BlockRenderer.jsx:74](../src/components/content/BlockRenderer.jsx#L74) | `alt={block.alt ?? ''}` | Middel — auteur moet veld vullen |
| [pages/ArticleDetail.jsx:83](../src/pages/ArticleDetail.jsx#L83) | `alt={content.heroAlt ?? ''}` | Middel — auteur moet veld vullen |

**Dit is een content-management vraagstuk, geen code-issue.** Aanbeveling voor Staterra: zorg dat het CMS een verplicht alt-veld heeft op image-blokken, of in elk geval een placeholder die auteurs prikkelt om iets in te vullen. Code blijft ongewijzigd.

### Logo-alt-conventies

De prompt waarschuwt voor `alt="logo"`. **Geen enkele live `<img>` gebruikt deze pattern.** Het logo in [Header.tsx:413](../src/components/layout/Header.tsx#L413) en [Footer.tsx:158](../src/components/layout/Footer.tsx#L158) krijgt `alt={siteName}` resp. `alt={site?.name ?? 'Staterra'}` — exact zoals de prompt voorschrijft.

## Verificatie

Lighthouse Accessibility-audit op `/`, `/woo-oplossing`, `/staterra-gemeenten` na deze wijzigingen — verwacht ≥90 (acceptatiecriterium 7.3). Niet uitgevoerd in deze audit (geen browser); wordt door Staterra gedaan na deploy van batch 1.

## Geautomatiseerde scan reproduceren

```bash
node -e '
const fs=require("fs"),path=require("path");
function*walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
  if(e.name==="staterra-comps")continue;
  const p=path.join(d,e.name);
  if(e.isDirectory())yield*walk(p);else if(/\.(tsx?|jsx?)$/.test(e.name))yield p;}}
const re=/<img\b([^>]*?)\/?>/gms;
for(const f of walk("src")){const t=fs.readFileSync(f,"utf8");let m;
  while((m=re.exec(t))!==null){const a=m[1],ln=t.slice(0,m.index).split("\n").length;
    if(!/\balt\s*=/.test(a))console.log(`MISSING ${f}:${ln}`);}}'
```
