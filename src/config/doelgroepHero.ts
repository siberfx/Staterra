export interface DoelgroepHeroConfig {
  label: string;
  h1Line1: string;
  h1Accent: string;
  subtitle: string;
  secondaryCta: { text: string; href: string };
  /** Doelgroep-specifieke naam (bijv. "gemeenten") */
  doelgroepNaam: string;
  /** Link naar de Woo-doelgroeppagina (bijv. /woo-gemeenten) */
  wooLink?: string;
  /** Woo-intro tekst voor deze doelgroep */
  wooIntro?: string;
}

export const DOELGROEP_HERO: Record<string, DoelgroepHeroConfig> = {
  // Brede doelgroeppagina's
  'staterra-gemeenten': {
    label: 'Staterra voor Gemeenten',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'waar uw gemeente verder mee kan',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor gemeenten. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'gemeenten',
    wooLink: '/woo-gemeenten',
    wooIntro: 'De Woo verplicht alle 342 gemeenten tot actieve openbaarmaking. OPMS is het bewezen platform dat direct inzetbaar is — van kleine gemeenten in SaaS-model tot grote gemeenten met een eigen omgeving.',
  },
  'staterra-rijkspartijen': {
    label: 'Staterra voor de Rijksoverheid',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'op rijksoverheidsniveau',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor rijksoverheidsorganisaties. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'de rijksoverheid',
    wooLink: '/woo-rijksoverheid',
    wooIntro: 'Met 236 rijksbestuursorganen over 14 departementen is de schaal van de Woo-opgave bij de rijksoverheid enorm. OPMS is ontwikkeld in samenwerking met het ministerie van JenV en sluit aan op bestaande DMS- en zaaksystemen.',
  },
  'staterra-provincies': {
    label: 'Staterra voor Provincies',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'voor provinciaal bestuur',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor provincies. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'provincies',
    wooLink: '/woo-provincies',
    wooIntro: 'Alle 12 provincies vallen onder de Woo. Als provincie heeft u een voorbeeldfunctie in transparantie. OPMS sluit naadloos aan op uw bestaande documentbeheersystemen.',
  },
  'staterra-waterschappen': {
    label: 'Staterra voor Waterschappen',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'voor uw waterschap',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor waterschappen. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'waterschappen',
    wooLink: '/woo-waterschappen',
    wooIntro: 'Alle 21 waterschappen moeten voldoen aan de Woo. OPMS maakt openbaarmaking van besluitdocumenten, vergunningen en beleidsstukken eenvoudig en controleerbaar.',
  },

  // Woo-doelgroeppagina's
  'woo-gemeenten': {
    label: 'Woo-oplossing voor Gemeenten',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw gemeente',
    subtitle: 'Een toegankelijke en schaalbare Woo-oplossing voor gemeenten. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'gemeenten',
  },
  'woo-rijksoverheid': {
    label: 'Woo-oplossing voor de Rijksoverheid',
    h1Line1: 'Woo-compliance',
    h1Accent: 'op rijksoverheidsniveau',
    subtitle: 'Een schaalbare Woo-oplossing voor ministeries en uitvoeringsorganisaties. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'de rijksoverheid',
  },
  'woo-provincies': {
    label: 'Woo-oplossing voor Provincies',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw provincie',
    subtitle: 'Een Woo-oplossing afgestemd op provincies. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'provincies',
  },
  'woo-waterschappen': {
    label: 'Woo-oplossing voor Waterschappen',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw waterschap',
    subtitle: 'Een Woo-oplossing afgestemd op waterschappen. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'waterschappen',
  },
};
