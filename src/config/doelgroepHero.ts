export interface DoelgroepHeroConfig {
  label: string;
  h1Line1: string;
  h1Accent: string;
  subtitle: string;
  secondaryCta: { text: string; href: string };
}

export const DOELGROEP_HERO: Record<string, DoelgroepHeroConfig> = {
  // Brede doelgroeppagina's
  'staterra-gemeenten': {
    label: 'Staterra voor Gemeenten',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'waar uw gemeente verder mee kan',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor gemeenten. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
  },
  'staterra-rijkspartijen': {
    label: 'Staterra voor de Rijksoverheid',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'op rijksoverheidsniveau',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor rijksoverheidsorganisaties. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
  },
  'staterra-provincies': {
    label: 'Staterra voor Provincies',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'voor provinciaal bestuur',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor provincies. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
  },
  'staterra-waterschappen': {
    label: 'Staterra voor Waterschappen',
    h1Line1: 'Open source oplossingen',
    h1Accent: 'voor uw waterschap',
    subtitle: 'Staterra bouwt, implementeert en beheert digitale oplossingen voor waterschappen. U houdt regie over uw systemen en broncode — van bewezen Woo-platform tot maatwerk, werkend binnen 3\u00a0maanden.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
  },

  // Woo-doelgroeppagina's
  'woo-gemeenten': {
    label: 'Woo-oplossing voor Gemeenten',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw gemeente',
    subtitle: 'Een toegankelijke en schaalbare Woo-oplossing voor gemeenten. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
  },
  'woo-rijksoverheid': {
    label: 'Woo-oplossing voor de Rijksoverheid',
    h1Line1: 'Woo-compliance',
    h1Accent: 'op rijksoverheidsniveau',
    subtitle: 'Een schaalbare Woo-oplossing voor ministeries en uitvoeringsorganisaties. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
  },
  'woo-provincies': {
    label: 'Woo-oplossing voor Provincies',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw provincie',
    subtitle: 'Een Woo-oplossing afgestemd op provincies. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
  },
  'woo-waterschappen': {
    label: 'Woo-oplossing voor Waterschappen',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw waterschap',
    subtitle: 'Een Woo-oplossing afgestemd op waterschappen. Van snelle implementatie tot volledige regie over uw publicaties.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
  },
};
