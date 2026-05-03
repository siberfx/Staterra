export interface SearchEntry {
  title: string;
  url: string;
  excerpt: string;
  section?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Hoofdpagina's
  { title: 'Home', url: '/', excerpt: 'Woo-compliance oplossing voor de overheid. Direct inzetbaar voor 611 bestuursorganen.', section: 'Hoofdpagina' },
  { title: 'Oplossingen', url: '/oplossingen', excerpt: 'Overzicht van al onze digitale oplossingen — van Woo-compliance tot open source platformen.', section: 'Oplossingen' },
  { title: 'Woo-oplossing (oPub/OPMS)', url: '/woo-oplossing', excerpt: 'De complete Woo-compliance oplossing — oPub als gehost publicatieportaal en OPMS als open source verwerkingslaag op uw eigen infrastructuur.', section: 'Oplossingen' },
  { title: 'Samen ontwikkelen', url: '/samen-ontwikkelen', excerpt: 'Samen met overheden ontwikkelen we digitale oplossingen — van eerste verkenning tot een werkend product.', section: 'Oplossingen' },
  { title: 'Open source', url: '/open-source', excerpt: 'Open source oplossingen voor de overheid. Geen vendor lock-in, geen licentiekosten.', section: 'Oplossingen' },
  { title: 'Aanpak', url: '/aanpak', excerpt: 'Van verkenning tot implementatie. Ontdek hoe Staterra in 3 maanden een werkend systeem oplevert.', section: 'Over Staterra' },
  { title: 'Dienstverlening', url: '/dienstverlening', excerpt: 'Projectmanagement, Woo-consultancy, architectuur, training en DevOps. Het volledige team achter het platform.', section: 'Over Staterra' },
  { title: 'Over ons', url: '/over-ons', excerpt: 'Staterra is infrastructuurpartner voor de publieke sector. Open source Woo-compliance voor 611 bestuursorganen.', section: 'Over Staterra' },
  { title: 'Contact', url: '/contact', excerpt: 'Neem contact op met Staterra. Binnen twee werkdagen een inhoudelijke reactie.', section: 'Over Staterra' },
  { title: 'Kennisbank', url: '/kennisbank', excerpt: 'Artikelen, handleidingen en inzichten over Woo-compliance en open source voor de overheid.', section: 'Kennisbank' },
  { title: 'Privacyverklaring', url: '/privacy', excerpt: 'Hoe Staterra omgaat met uw persoonsgegevens en privacy.', section: 'Juridisch' },
  { title: 'Cookiebeleid', url: '/cookies', excerpt: 'Welke cookies staterra.nl gebruikt en hoe u uw voorkeuren beheert.', section: 'Juridisch' },

  // Doelgroepen
  { title: 'Gemeenten', url: '/staterra-gemeenten', excerpt: 'Van griffie tot vergunningenloket: Woo-compliance voor gemeenten. Integreert met OpenZaak, Rx.Mission en uw DMS.', section: 'Doelgroepen' },
  { title: 'Provincies', url: '/staterra-provincies', excerpt: 'Van omgevingsvisies tot Statenbesluiten: professionele Woo-compliance voor provincies.', section: 'Doelgroepen' },
  { title: 'Waterschappen', url: '/staterra-waterschappen', excerpt: 'Van keurvergunningen tot calamiteitenplannen: Woo-compliance passend bij de schaal van waterschappen.', section: 'Doelgroepen' },
  { title: 'Rijksoverheid', url: '/staterra-rijkspartijen', excerpt: 'Woo-compliance voor ministeries, agentschappen en ZBO\u2019s. Past binnen comply-or-explain, bewezen bij JenV.', section: 'Doelgroepen' },

  // Kennisbank artikelen
  { title: 'Wat is de Woo?', url: '/kennisbank/wat-is-de-woo', excerpt: 'De Wet open overheid verplicht 611 bestuursorganen tot actieve openbaarmaking. Wat houdt dat in?', section: 'Kennisbank' },
  { title: 'OPMS uitgelegd', url: '/kennisbank/opms-uitgelegd', excerpt: 'Zo werkt het open source platform voor openbaarmaking. De vier bouwstenen en implementatie.', section: 'Kennisbank' },
  { title: '5 fouten bij Woo-compliance', url: '/kennisbank/5-fouten-woo-compliance', excerpt: 'De vijf veelgemaakte fouten bij Woo-compliance — en hoe u ze voorkomt.', section: 'Kennisbank' },
];
