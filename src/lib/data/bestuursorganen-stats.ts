/**
 * Gevalideerde aantallen bestuursorganen die onder de Woo vallen.
 * Bron: Bestuursorganen-Compleet.xlsx (april 2025)
 *
 * Deze cijfers worden op meerdere plekken in de website gebruikt.
 * Wijzig ze hier centraal als de dataset wordt bijgewerkt.
 */

export const BESTUURSORGANEN_STATS = {
  // Hoofdcategorieën
  totaal: 611,
  rijksbestuursorganen: 236,
  provincies: 12,
  waterschappen: 21,
  gemeenten: 342,

  // Rijksoverheid detailniveau
  kerndepartementen: 14,

  // Gemeenten per provincie
  gemeentenPerProvincie: {
    'Drenthe': 12,
    'Flevoland': 6,
    'Friesland': 18,
    'Gelderland': 51,
    'Groningen': 10,
    'Limburg': 31,
    'Noord-Brabant': 56,
    'Noord-Holland': 44,
    'Overijssel': 25,
    'Utrecht': 26,
    'Zeeland': 13,
    'Zuid-Holland': 50,
  },
} as const;

export type Provincie = keyof typeof BESTUURSORGANEN_STATS.gemeentenPerProvincie;
