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
    title: 'Woo-oplossing: oPub en OPMS — Staterra',
    description: 'Staterra levert oPub en OPMS: het bewezen publicatieportaal en managementsysteem voor bestuursorganen onder de Wet open overheid.',
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
    description: 'Projectmanagement, Woo-consultancy, architectuur, training en DevOps. Het volledige team achter het platform — in samenwerking met CodeLabs.',
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
    title: 'Staterra voor Gemeenten — Woo-compliance en digitale regie',
    description: 'Van griffie tot vergunningenloket: Staterra helpt gemeenten met Woo-compliance. OPMS integreert met OpenZaak, Rx.Mission en uw DMS. Implementatie binnen 3 maanden.',
  },
  '/staterra-provincies': {
    title: 'Staterra voor Provincies — Transparantie op provinciaal niveau',
    description: 'Van omgevingsvisies tot Statenbesluiten: Staterra helpt provincies met professionele Woo-compliance. Aansluiting op uw documentbeheersystemen.',
  },
  '/staterra-rijkspartijen': {
    title: 'Staterra voor de Rijksoverheid — Regie op openbaarmaking',
    description: 'Woo-compliance voor ministeries, agentschappen en ZBO\'s. OPMS past binnen het comply-or-explain beleid. Bewezen bij het ministerie van JenV.',
  },
  '/staterra-waterschappen': {
    title: 'Staterra voor Waterschappen — Van keur tot calamiteitenplan',
    description: 'Woo-compliance voor waterschappen: keurvergunningen, peilbesluiten en waterbeheerplannen publiceren met OPMS. Snel implementeerbaar, passend bij uw schaal.',
  },

  // ── Woo-doelgroep pagina's (provisional — definitive copy via docs/seo-content-brief.yml)
  '/woo-gemeenten': {
    title: 'Woo-oplossing voor gemeenten — Staterra',
    description: 'OpenPublicatie voor gemeenten: oPub en OPMS implementeren met Staterra. Aansluiten op KOOP en de Generieke Woo-voorziening, regie op publicatie behouden.',
  },
  '/woo-provincies': {
    title: 'Woo-oplossing voor provincies — Staterra',
    description: 'OpenPublicatie bij provincies: van Statenbesluiten tot omgevingsvisies actief openbaar maken. Staterra verzorgt aanbesteding, inrichting en adoptie.',
  },
  '/woo-rijksoverheid': {
    title: 'Woo-oplossing voor de Rijksoverheid — Staterra',
    description: 'OpenPublicatie voor ministeries, agentschappen en ZBO\'s. Comply-or-explain-conform, EUPL 1.2 open source, gekoppeld aan KOOP en de GWV.',
  },
  '/woo-waterschappen': {
    title: 'Woo-oplossing voor waterschappen — Staterra',
    description: 'OpenPublicatie bij waterschappen: keurvergunningen, peilbesluiten en waterbeheerplannen actief openbaar maken via oPub en OPMS.',
  },

  // ── Kennisbank-artikelen (provisional — definitive copy via docs/seo-content-brief.yml)
  '/kennisbank/wat-is-de-woo': {
    title: 'Wat is de Wet open overheid? — Staterra Kennisbank',
    description: 'De Wet open overheid (Woo) verplicht actieve openbaarmaking. Wat de Woo betekent voor bestuursorganen, de elf categorieën, en hoe u praktisch aansluit.',
  },
  '/kennisbank/opms-uitgelegd': {
    title: 'OPMS uitgelegd — Staterra Kennisbank',
    description: 'OPMS is de open source publicatie-regietool van OpenPublicatie. Hoe OPMS werkt, hoe het samenhangt met OPUB.nl, en wat het betekent voor uw organisatie.',
  },
  '/kennisbank/5-fouten-woo-compliance': {
    title: 'Vijf veelgemaakte fouten bij Woo-compliance — Staterra Kennisbank',
    description: 'De vijf valkuilen waar bestuursorganen tegenaan lopen bij het organiseren van actieve openbaarmaking — en hoe ze te vermijden.',
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
