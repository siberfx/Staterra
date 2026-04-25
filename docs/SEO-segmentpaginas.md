# Duplicate-content analyse `/woo-{segment}` vs `/staterra-{segment}`

**Fase 1, taak 5.6.**
**Aanbeveling: behouden en differentiëren** (Optie 1 uit de prompt). Geen consolidatie nodig.
**Vereiste vervolgactie: nul.** De infrastructuur en content zijn al voldoende gedifferentieerd. Wel een kleine aanscherping voorgesteld in de meta-tekst en interne linking — zie sectie 4.

## 1. Wat hier staat

Acht segmentpagina's, paarsgewijs:

| Segment | Woo-variant | Staterra-variant |
|---|---|---|
| Gemeenten | `/woo-gemeenten` | `/staterra-gemeenten` |
| Provincies | `/woo-provincies` | `/staterra-provincies` |
| Rijksoverheid | `/woo-rijksoverheid` | `/staterra-rijkspartijen` |
| Waterschappen | `/woo-waterschappen` | `/staterra-waterschappen` |

Beide varianten worden gerenderd door dezelfde catch-all in [src/App.tsx:173](../src/App.tsx#L173) (`<Route path=":slug" element={<DynamicPage />} />`); [DynamicPage.tsx](../src/pages/DynamicPage.tsx) routeert vervolgens op basis van het `staterra-` prefix naar verschillende rendertemplates en haalt de configuratie uit [src/config/doelgroepHero.ts](../src/config/doelgroepHero.ts).

## 2. Inhoudelijke vergelijking — proeve uit "Gemeenten"

### Hero-positionering

| Aspect | `/staterra-gemeenten` | `/woo-gemeenten` |
|---|---|---|
| H1 | "Digitale regie voor gemeenten die vooruit willen" | "Woo-compliance voor uw gemeente" |
| Subtitle-thema | Brede digitale opgaven (informatiehuishouding, open source, Woo) | Woo-specifiek (raadsstukken, vergunningen, Woo-verzoeken) |
| Subtitle-systemen | Open source landschap | OpenZaak, Rx.Mission, DMS |

### Herkenbaar-scenario

| `/staterra-gemeenten` | `/woo-gemeenten` |
|---|---|
| **H2:** "Eén informatieadviseur. Vier verplichtingen. Geen tijd." | **H2:** "De Woo-uitdagingen die uw gemeente herkent" |
| Scenario over één informatieadviseur die over Woo, archivering en AVG tegelijk gaat — een capaciteitsverhaal. | Scenario over een collegetoezegging Woo-compliant te zijn, terwijl het zaaksysteem geen publicatiestroom heeft — een procesverhaal. |
| Observatie: "Het probleem is niet dat uw mensen hun werk niet kunnen. Het probleem is dat u te weinig mensen heeft voor te veel verplichtingen." | Observatie: "De toezegging staat. Het werk moet nog beginnen — en de capaciteit is er niet." |

### Uitdagingen-lijst

| `/staterra-gemeenten` | `/woo-gemeenten` |
|---|---|
| 4 punten over werkprocesintegratie, leverancierslock-in, externe partijen, regie over systemen | 4 punten over publicatiecategorieën, handmatige processen, ontbrekende publicatie vanuit zaaksystemen, onduidelijkheid over categorieën |

### Systemen-intro

| `/staterra-gemeenten` | `/woo-gemeenten` |
|---|---|
| Open source breed (Nextcloud, Rocket.Chat, OPMS), GEMMA-referentiearchitectuur | OPMS-specifiek met koppelingen aan OpenZaak, Rx.Mission, Corsa, Decos JOIN |

**Geen enkele zin overlapt letterlijk tussen de twee varianten.** Hetzelfde patroon zien we voor de drie andere segmenten (provincies, rijksoverheid, waterschappen) — zie [doelgroepHero.ts:49-264](../src/config/doelgroepHero.ts#L49-L264).

## 3. Duplicate-content risico — beoordeling

| Criterium | Score | Onderbouwing |
|---|---|---|
| Letterlijke tekstoverlap | **Laag** (~0%) | Geen enkel zin-niveau-fragment komt voor in beide varianten. |
| Identieke H1's | **Geen** | H1's verschillen per pagina ("Digitale regie voor…" vs "Woo-compliance voor…"). |
| Identieke meta-tags | **Geen** | seoConfig.ts heeft per route eigen `title` en `description` ([src/config/seoConfig.ts](../src/config/seoConfig.ts)). |
| Onderwerp-overlap | **Beperkt** | Beide varianten noemen Woo en OPMS. Maar de hoofdthema's verschillen: capaciteit/regie vs procesinrichting. Vergelijkbaar met hoe een leverancier zowel "voor IT-managers" als "voor inkoop" pagina's heeft over hetzelfde product. |
| Doelgroep-overlap | **Hoog** | Beide richten zich op gemeenten (etc.). Dit is normaal voor pillar-pages. |
| Cannibalization risico | **Laag** | Verschillende search intents: brede "open source overheid"-vragen leiden naar staterra-*; specifieke "Woo-publicatieplatform"-vragen leiden naar woo-*. |

Conclusie: dit is geen klassieke duplicate content. Het zijn twee gerelateerde maar inhoudelijk gedifferentieerde pagina's per segment, vergelijkbaar met een TOFU/MOFU-content-matrix.

## 4. Aanbeveling — behouden en differentiëren

### 4.1 Geen technische actie noodzakelijk

- ✅ Routes blijven bestaan zoals ze zijn.
- ✅ Zelf-canonical wordt door [PageMeta.tsx](../src/components/PageMeta.tsx) gezet voor beide varianten.
- ✅ seoConfig.ts heeft per pagina eigen titel/beschrijving (na taak 5.1b).
- ✅ Hero-content, scenario's en uitdagingen-lijsten zijn al voldoende gedifferentieerd.

### 4.2 Wel: subtiele aanscherping in interne linking

Op de Woo-variant staat al een `secondaryCta` naar `/woo-oplossing`. Op de Staterra-variant staat al een `secondaryCta` naar `/woo-{segment}`. Bidirectioneel linken zou hier nog cleaner kunnen — voeg op `/woo-{segment}` ook een tegenovergestelde verwijzing toe naar `/staterra-{segment}` ("Bekijk de bredere positionering voor [segment]"). Dit helpt:

- Google de twee pagina's als gerelateerd-maar-distinct te zien
- Bezoekers de juiste vervolgpagina te vinden afhankelijk van hun intent
- PageRank-flow tussen de pagina's te delen

**Implementatie**: 4 regels toevoegen in `wooKoepelIntro` of een aparte "Bredere context"-sectie. Wordt meegenomen in batch 2 (homepage/segment content), niet in batch 1.

### 4.3 Wel: meta-descriptions in seoConfig.ts beoordelen

De meta-descriptions die in taak 5.1b zijn toegevoegd voor `/woo-*`-routes overlappen mogelijk met de bestaande `/staterra-*`-descriptions. Voorbeeld:

| | Description |
|---|---|
| `/staterra-gemeenten` | "Van griffie tot vergunningenloket: Staterra helpt gemeenten met Woo-compliance. OPMS integreert met OpenZaak, Rx.Mission en uw DMS. Implementatie binnen 3 maanden." |
| `/woo-gemeenten` | "OpenPublicatie voor gemeenten: oPub en OPMS implementeren met Staterra. Aansluiten op KOOP en de Generieke Woo-voorziening, regie op publicatie behouden." |

Verschillen: Staterra-pagina's noemen integratie/implementatie, Woo-pagina's noemen KOOP/GWV/publicatie. Dat is voldoende onderscheidend, maar Staterra zal in [docs/seo-content-brief.yml](./seo-content-brief.yml) de definitieve copy per pagina vaststellen — daar kan de differentiatie verder aangescherpt worden.

## 5. Wanneer wel consolideren?

Voor de volledigheid: scenario's waarin we van koers zouden moeten wisselen.

- **Als analytics laat zien dat één variant <5% van het verkeer trekt** binnen een segment, is consolidatie alsnog te overwegen. Vereist analytics (Plausible/Umami) — komt in batch 2 / fase 2.
- **Als Google Search Console "duplicate, not user-selected canonical"-waarschuwingen geeft**, alsnog herzien. Monitoren door Staterra na deploy.
- **Als de tone of voice converged door content-edits**, opnieuw beoordelen. Onwaarschijnlijk gegeven de huidige duidelijke strategische positionering (TOFU vs Woo-specific).

In het scenario consolidatie nodig zou zijn, is de migratiepad duidelijk:
1. Kies kanonieke variant per segment (waarschijnlijk `/staterra-{segment}` als breder ankermat).
2. Voeg op de te-vervallen variant een cross-canonical toe via een nieuwe `canonicalPath` prop in `PageMeta`.
3. In Fase 2: 301-redirect via Cloudflare/Nginx, zoals de prompt voorschrijft.

## 6. Acceptatiecriteria voor deze aanbeveling

- [x] Aanbeveling onderbouwd met inhoudelijke vergelijking (sectie 2)
- [x] Risicobeoordeling op concrete criteria (sectie 3)
- [x] Geen breaking changes (alle URL's blijven bestaan)
- [x] Pad voor toekomstige consolidatie beschreven (sectie 5)
- [ ] **Goedkeuring Staterra** vereist voordat batch 2 ingaat — bevestig of bidirectionele cross-link in 4.2 wordt opgenomen, of dat de huidige unidirectionele opzet voldoet.
