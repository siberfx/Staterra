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
  /** Herkenbare uitdagingen voor deze doelgroep */
  uitdagingen?: string[];
  /** Intro-tekst boven de uitdagingen */
  uitdagingenIntro?: string;
  /** Systemen en integraties relevant voor deze doelgroep */
  systemenIntro?: string;
  /** Koepelorganisatie / bestuurlijk netwerk */
  koepelIntro?: string;
}

export const DOELGROEP_HERO: Record<string, DoelgroepHeroConfig> = {
  // ── Brede doelgroeppagina's ─────────────────────────────────

  'staterra-gemeenten': {
    label: 'Staterra voor Gemeenten',
    h1Line1: 'Woo-compliance en digitale regie',
    h1Accent: 'voor gemeenten die vooruit willen',
    subtitle:
      'Van griffie tot vergunningenloket: de Woo raakt de hele gemeentelijke organisatie. Staterra helpt met een werkende oplossing die past bij uw schaal, uw systemen en uw organisatie — of u nu een compacte gemeente bent of tot de G40 behoort.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'gemeenten',
    wooLink: '/woo-gemeenten',
    wooIntro:
      'De Woo verplicht alle 342 gemeenten tot actieve openbaarmaking. OPMS is direct inzetbaar — van kleine gemeenten in een gedeeld SaaS-model tot grote gemeenten met een eigen omgeving. Implementatie binnen 3\u00a0maanden, aansluiting op uw bestaande zaaksysteem inclusief.',
    uitdagingenIntro: 'Dit herkennen gemeenten die met de Woo aan de slag gaan:',
    uitdagingen: [
      'Geen centraal overzicht van publicatieverplichtingen per categorie actieve openbaarmaking',
      'Handmatige processen tussen griffie, vergunningen en Woo-co\u00f6rdinator',
      'Zaaksystemen zoals OpenZaak of Rx.Mission die niet automatisch publiceren naar een openbaar register',
      'Onduidelijkheid over welke documenten actief openbaar moeten worden gemaakt',
    ],
    systemenIntro:
      'OPMS integreert met de systemen die gemeenten dagelijks gebruiken: zaaksystemen als OpenZaak en Rx.Mission, documentmanagementsystemen als Corsa en Decos JOIN, en sluit aan op de GEMMA-referentiearchitectuur. Publicaties worden vanuit het werkproces aangemaakt — niet als extra taak ernaast.',
    koepelIntro:
      'De VNG ondersteunt gemeenten actief bij de Woo-implementatie. Staterra werkt samen met gemeenten die via VNG-samenwerkingsverbanden gezamenlijk openbaarmaking inrichten.',
  },

  'staterra-provincies': {
    label: 'Staterra voor Provincies',
    h1Line1: 'Transparantie en openbaarmaking',
    h1Accent: 'op provinciaal niveau',
    subtitle:
      'Als provincie heeft u een voorbeeldfunctie richting gemeenten en waterschappen in uw regio. De Woo vraagt om een professionele aanpak van openbaarmaking — van omgevingsvisies tot Statenbesluiten. Staterra levert de oplossing \u00e9n het team.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'provincies',
    wooLink: '/woo-provincies',
    wooIntro:
      'Alle 12 provincies vallen onder de Woo. Als middenbestuur met een voorbeeldfunctie is professionele openbaarmaking geen keuze maar een vereiste. OPMS sluit naadloos aan op uw bestaande documentbeheersystemen en maakt publicatie onderdeel van het reguliere werkproces.',
    uitdagingenIntro: 'Dit herkennen provincies die hun Woo-implementatie professionaliseren:',
    uitdagingen: [
      'Complexe documentstromen tussen Gedeputeerde Staten, Provinciale Staten en de ambtelijke organisatie',
      'Grote diversiteit aan publicatiecategorie\u00ebn: omgevingsvisies, verordeningen, subsidiebesluiten en milieu-informatie',
      'Voorbeeldfunctie richting gemeenten en waterschappen in de regio, die meekijken naar de provinciale aanpak',
      'Integratie met bestaande provinciale documentbeheer- en archiveringssystemen',
    ],
    systemenIntro:
      'OPMS sluit aan op de documentbeheersystemen die provincies gebruiken, van Corsa tot OpenText. De koppeling met uw bestaande informatiehuishouding zorgt ervoor dat publicaties vanuit het werkproces worden aangemaakt. Statenbesluiten, omgevingsvisies en verordeningen worden automatisch klaargezet voor openbaarmaking.',
    koepelIntro:
      'Het Interprovinciaal Overleg (IPO) co\u00f6rdineert de gezamenlijke aanpak van provincies op het gebied van digitalisering en openbaarmaking. Staterra ondersteunt provincies die hun Woo-implementatie willen professionaliseren.',
  },

  'staterra-waterschappen': {
    label: 'Staterra voor Waterschappen',
    h1Line1: 'Woo-compliance voor waterschappen',
    h1Accent: 'van keur tot calamiteitenplan',
    subtitle:
      'Waterschappen beheren een uniek domein: van watervergunningen en peilbesluiten tot projectplannen en calamiteitenplannen. Staterra levert een Woo-oplossing die aansluit op de specifieke publicatiebehoeften van het waterschap.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'waterschappen',
    wooLink: '/woo-waterschappen',
    wooIntro:
      'Alle 21 waterschappen moeten voldoen aan de Woo. OPMS maakt openbaarmaking van besluitdocumenten, keurvergunningen en beleidsstukken eenvoudig en controleerbaar. De oplossing is snel implementeerbaar en past bij de schaal van een waterschap.',
    uitdagingenIntro: 'Dit herkennen waterschappen die met de Woo aan de slag gaan:',
    uitdagingen: [
      'Specifieke publicatiecategorie\u00ebn die afwijken van andere bestuurslagen: keurvergunningen, peilbesluiten, waterbeheerplannen en calamiteitenplannen',
      'Relatief kleine organisatie met beperkte ICT-capaciteit voor een groot implementatietraject',
      'Documentstromen tussen dagelijks bestuur, algemeen bestuur en dijkgraaf die transparant moeten worden',
      'Behoefte aan een werkbare oplossing zonder langdurig IT-project',
    ],
    systemenIntro:
      'OPMS integreert met de document- en zaaksystemen die waterschappen gebruiken. De oplossing is specifiek geschikt voor organisaties met een beperkte ICT-bezetting: snel implementeerbaar, eenvoudig te beheren en schaalbaar wanneer het waterschap groeit in publicatievolume.',
    koepelIntro:
      'De Unie van Waterschappen stimuleert samenwerking op het gebied van digitalisering en openbaarmaking. Staterra biedt waterschappen de mogelijkheid om gezamenlijk op te trekken bij de Woo-implementatie.',
  },

  'staterra-rijkspartijen': {
    label: 'Staterra voor de Rijksoverheid',
    h1Line1: 'Regie op openbaarmaking',
    h1Accent: 'voor ministeries en uitvoeringsorganisaties',
    subtitle:
      'Met 236 rijksbestuursorganen over 14 departementen is de Woo-opgave bij de rijksoverheid de grootste van het land. Het comply-or-explain beleid van BZK maakt open source de logische eerste keuze. OPMS is ontwikkeld in samenwerking met het ministerie van JenV.',
    secondaryCta: { text: 'Bekijk onze oplossingen', href: '/oplossingen' },
    doelgroepNaam: 'de rijksoverheid',
    wooLink: '/woo-rijksoverheid',
    wooIntro:
      'Met 236 rijksbestuursorganen verdeeld over 14 departementen is de schaal van de Woo-opgave bij de rijksoverheid enorm. OPMS is ontwikkeld in samenwerking met het ministerie van JenV en sluit aan op het bestaande DMS-landschap. Voor agentschappen en ZBO\u2019s is een SaaS-model beschikbaar met lagere instapkosten.',
    uitdagingenIntro: 'Dit herkennen rijksorganisaties die aan de Woo werken:',
    uitdagingen: [
      'Het comply-or-explain beleid vereist dat bestaande open source alternatieven worden beoordeeld v\u00f3\u00f3r inkoop van proprietary oplossingen',
      'Departementsoverstijgende afstemming met CIO Rijk en BZK-kaders voor informatiehuishouding',
      'Complexe DMS-landschappen (Corsa, OpenText, DMS Next) die per organisatieonderdeel verschillen',
      'Grote schaalverschillen tussen kerndepartementen, agentschappen en ZBO\u2019s die elk een passende aanpak vragen',
    ],
    systemenIntro:
      'OPMS sluit aan op het DMS-landschap van de rijksoverheid: Corsa, OpenText en DMS Next. De integratie is bewezen bij het ministerie van JenV. Voor agentschappen en ZBO\u2019s biedt Staterra een SaaS-model met lagere instapkosten, terwijl kerndepartementen kiezen voor een eigen omgeving met volledige regie.',
    koepelIntro:
      'OPMS is opgenomen in het open source ecosysteem van BZK. Het comply-or-explain beleid van de rijksoverheid schrijft voor dat bestuursorganen eerst bestaande open source oplossingen beoordelen — OPMS is die oplossing.',
  },

  // ── Woo-doelgroeppagina's ──────────────────────────────────

  'woo-gemeenten': {
    label: 'Woo-oplossing voor Gemeenten',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw gemeente',
    subtitle:
      'Van raadsstukken en vergunningen tot Woo-verzoeken: OPMS maakt actieve openbaarmaking beheersbaar voor gemeenten van elke omvang. Implementeerbaar binnen 3\u00a0maanden, aansluitend op OpenZaak, Rx.Mission en uw DMS.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'gemeenten',
  },

  'woo-rijksoverheid': {
    label: 'Woo-oplossing voor de Rijksoverheid',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor ministeries en uitvoeringsorganisaties',
    subtitle:
      'Van Kamerstukken en beleidsnotities tot Woo-besluiten: OPMS is de open source Woo-oplossing die past binnen het comply-or-explain beleid. Bewezen bij het ministerie van JenV, schaalbaar naar agentschappen en ZBO\u2019s.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'de rijksoverheid',
  },

  'woo-provincies': {
    label: 'Woo-oplossing voor Provincies',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw provincie',
    subtitle:
      'Van omgevingsvisies en Statenbesluiten tot subsidietoekenningen: OPMS maakt openbaarmaking onderdeel van het reguliere werkproces. Naadloze aansluiting op uw bestaande documentbeheersystemen.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'provincies',
  },

  'woo-waterschappen': {
    label: 'Woo-oplossing voor Waterschappen',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw waterschap',
    subtitle:
      'Van keurvergunningen en peilbesluiten tot waterbeheerplannen: OPMS maakt openbaarmaking eenvoudig en controleerbaar. Snel implementeerbaar, passend bij de schaal van een waterschap.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'waterschappen',
  },
};
