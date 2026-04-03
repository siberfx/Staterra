export interface SeoEntry {
  title: string;
  description: string;
}

export const SEO_CONFIG: Record<string, SeoEntry> = {
  '/': {
    title: 'Woo-compliance oplossing voor de overheid — Staterra',
    description: 'Staterra implementeert en beheert OPMS, het open source publicatieplatform voor Woo-compliance. Van installatie tot doorontwikkeling.',
  },
  '/woo-oplossing': {
    title: 'Woo-oplossing (OPMS) — Staterra',
    description: 'OPMS is het open source platform voor actieve openbaarmaking onder de Woo. Staterra verzorgt implementatie, hosting en beheer voor overheidsorganisaties.',
  },
  '/aanpak': {
    title: 'Aanpak — Staterra',
    description: 'Onze aanpak voor Woo-implementatie: van verkenningsgesprek tot livegang in 3 tot 9 maanden. Transparant, agile en samen met uw team.',
  },
  '/contact': {
    title: 'Contact — Staterra',
    description: 'Neem contact op met Staterra voor een vrijblijvend verkenningsgesprek over Woo-compliance en OPMS-implementatie.',
  },
  '/dienstverlening': {
    title: 'Dienstverlening — Staterra',
    description: 'Van OPMS-implementatie tot beheer, hosting en doorontwikkeling. Ontdek hoe Staterra overheidsorganisaties helpt met Woo-compliance.',
  },
  '/kennisbank': {
    title: 'Kennisbank — Staterra',
    description: 'Artikelen en inzichten over Woo-compliance, actieve openbaarmaking en het OPMS-publicatieplatform voor de overheid.',
  },
  '/open-source': {
    title: 'Open source — Staterra',
    description: 'Staterra werkt met open source oplossingen uit het BZK-ecosysteem. Transparant, herbruikbaar en in lijn met het comply-or-explain beleid.',
  },
  '/oplossingen': {
    title: 'Oplossingen — Staterra',
    description: 'Overzicht van Staterra\'s oplossingen voor Woo-compliance: OPMS-implementatie, beheer, hosting en maatwerk voor de overheid.',
  },
  '/over-ons': {
    title: 'Over Staterra — Staterra',
    description: 'Staterra is gespecialiseerd in digitale oplossingen voor de overheid. Wij helpen overheidsorganisaties met Woo-compliance en open source.',
  },
  '/samen-ontwikkelen': {
    title: 'Samen ontwikkelen — Staterra',
    description: 'Samenwerking staat centraal. Staterra ontwikkelt samen met overheidsorganisaties aan open source oplossingen voor de publieke sector.',
  },
  '/staterra-gemeenten': {
    title: 'Staterra voor Gemeenten — Openbaarmaking en open source oplossingen',
    description: 'Ontdek hoe Staterra gemeenten ondersteunt bij actieve openbaarmaking, Woo-compliance en digitale transformatie met open source.',
  },
  '/staterra-provincies': {
    title: 'Staterra voor Provincies — Publieke digitale voorzieningen en open source',
    description: 'Staterra helpt provincies met Woo-compliance, open source platformen en digitale voorzieningen voor de publieke sector.',
  },
  '/staterra-rijkspartijen': {
    title: 'Staterra voor Rijkspartijen — Regie op openbaarmaking',
    description: 'Woo-compliance en open source oplossingen voor rijksorganisaties, uitvoeringsorganisaties en ZBO\'s. Professioneel beheer door Staterra.',
  },
  '/staterra-waterschappen': {
    title: 'Staterra voor Waterschappen — Openbaarmaking en digitale regie',
    description: 'Staterra ondersteunt waterschappen bij Woo-compliance en actieve openbaarmaking met schaalbare open source oplossingen.',
  },
  '/cookies': {
    title: 'Cookiebeleid — Staterra',
    description: 'Informatie over het gebruik van cookies op staterra.nl. Lees hoe wij omgaan met uw privacy en welke cookies wij gebruiken.',
  },
  '/privacy': {
    title: 'Privacyverklaring — Staterra',
    description: 'Privacyverklaring van Staterra. Lees hoe wij omgaan met persoonsgegevens conform de AVG.',
  },
};

const DEFAULT_SEO: SeoEntry = {
  title: 'Staterra — Woo-compliance oplossing voor de overheid',
  description: 'Staterra implementeert en beheert OPMS, het open source publicatieplatform voor Woo-compliance. Direct inzetbaar voor 611 bestuursorganen.',
};

export function getSeoForPath(pathname: string): SeoEntry {
  return SEO_CONFIG[pathname] ?? DEFAULT_SEO;
}
