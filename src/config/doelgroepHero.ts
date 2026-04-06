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

  // ── Brede doelgroepherkenning (staterra-* pagina's) ──────────
  /** Brede uitdagingen voor deze doelgroep (niet Woo-specifiek) */
  uitdagingen?: string[];
  /** Intro-tekst boven de uitdagingen */
  uitdagingenIntro?: string;
  /** Concreet herkenbaar scenario (komt direct na de intro) */
  herkenbaarScenario?: string;
  /** Korte afsluitende observatie bij het scenario */
  herkenbaarObservatie?: string;
  /** Brede systemen-intro (niet alleen Woo) */
  systemenIntro?: string;
  /** Koepelorganisatie / bestuurlijk netwerk (brede context) */
  koepelIntro?: string;

  // ── Woo-specifieke herkenning (woo-* pagina's) ──────────────
  /** Woo-specifieke uitdagingen voor deze doelgroep */
  wooUitdagingen?: string[];
  /** Intro-tekst boven de Woo-uitdagingen */
  wooUitdagingenIntro?: string;
  /** Woo-specifieke systemen en integraties */
  wooSystemenIntro?: string;
  /** Koepel in Woo-context */
  wooKoepelIntro?: string;
}

export const DOELGROEP_HERO: Record<string, DoelgroepHeroConfig> = {
  // ══════════════════════════════════════════════════════════════
  //  BREDE DOELGROEPPAGINA'S (staterra-*)
  //  Focus: "Wij snappen uw wereld" + drie pijlers (maatwerk, open source, OPMS)
  // ══════════════════════════════════════════════════════════════

  'staterra-gemeenten': {
    label: 'Staterra voor Gemeenten',
    h1Line1: 'Digitale regie',
    h1Accent: 'voor gemeenten die vooruit willen',
    subtitle:
      'Gemeenten staan voor grote digitale opgaven: van informatiehuishouding en open source tot Woo-compliance. Staterra helpt als langetermijnpartner — met maatwerk, open source implementatie en een bewezen Woo-platform. Passend bij uw schaal, of u nu een compacte gemeente bent of tot de G40 behoort.',
    secondaryCta: { text: 'Woo-oplossing voor gemeenten', href: '/woo-gemeenten' },
    doelgroepNaam: 'gemeenten',
    wooLink: '/woo-gemeenten',
    wooIntro:
      'De Woo verplicht alle 342 gemeenten tot actieve openbaarmaking. OPMS is direct inzetbaar — van kleine gemeenten in een gedeeld SaaS-model tot grote gemeenten met een eigen omgeving. Implementatie binnen 3\u00a0maanden, aansluiting op uw bestaande zaaksysteem inclusief.',
    uitdagingenIntro: 'Dit herkennen gemeenten die hun digitale voorzieningen willen professionaliseren:',
    herkenbaarScenario:
      'Uw gemeente heeft \u00e9\u00e9n informatieadviseur. Die adviseert over Woo-verzoeken, zorgt voor de actieve openbaarmaking, begeleidt de archivering \u00e9n is eerste aanspreekpunt voor de AVG. Tussendoor moet er nog een nieuw zaaksysteem worden ingericht. De wethouder vraagt naar de stand van zaken rond de publicatieverplichting \u2014 want de gemeenteraad heeft er vragen over gesteld.',
    herkenbaarObservatie:
      'Het probleem is niet dat uw mensen hun werk niet kunnen. Het probleem is dat u te weinig mensen heeft voor te veel verplichtingen met te weinig tijd.',
    uitdagingen: [
      'Afhankelijkheid van leveranciers met proprietary systemen, beperkte invloed op doorontwikkeling en hoge licentiekosten',
      'Beperkte interne ICT-capaciteit om grote digitaliseringsprojecten zelfstandig op te pakken',
      'Toenemende druk vanuit wet- en regelgeving: Woo, Wmebv, Digitale Overheid — zonder duidelijk plan van aanpak',
      'Behoefte aan regie over eigen systemen en data, zonder vendor lock-in',
    ],
    systemenIntro:
      'Staterra implementeert en beheert open source oplossingen die aansluiten op de gemeentelijke IT-omgeving: van Nextcloud en Rocket.Chat tot OPMS voor Woo-compliance. Wij werken met de GEMMA-referentiearchitectuur en sluiten aan op zaaksystemen, DMS\'en en bestaande werkprocessen.',
    koepelIntro:
      'De VNG stimuleert gemeenten om samen te werken aan digitale oplossingen. Staterra ondersteunt gemeenten die via samenwerkingsverbanden gezamenlijk investeren in open source en digitale regie.',
  },

  'staterra-provincies': {
    label: 'Staterra voor Provincies',
    h1Line1: 'Digitale voorzieningen',
    h1Accent: 'op provinciaal niveau',
    subtitle:
      'Als middenbestuur heeft de provincie een bijzondere positie: voorbeeldfunctie richting gemeenten, coördinerende rol in de regio en eigen opgaven rond transparantie en informatiehuishouding. Staterra helpt met maatwerk, open source implementatie en een bewezen Woo-platform.',
    secondaryCta: { text: 'Woo-oplossing voor provincies', href: '/woo-provincies' },
    doelgroepNaam: 'provincies',
    wooLink: '/woo-provincies',
    wooIntro:
      'Alle 12 provincies vallen onder de Woo. Als middenbestuur met een voorbeeldfunctie is professionele openbaarmaking geen keuze maar een vereiste. OPMS maakt publicatie onderdeel van het reguliere werkproces — van omgevingsvisies tot Statenbesluiten.',
    uitdagingenIntro: 'Dit herkennen provincies die hun digitale voorzieningen willen versterken:',
    herkenbaarScenario:
      'Een omgevingsvergunning uit 2019 komt opnieuw in beeld omdat een journalist via een Woo-verzoek de onderliggende stukken opvraagt. De behandelaar is inmiddels met pensioen, het dossier is verspreid over het zaaksysteem, een gedeelde schijf en de mailbox van de toenmalig projectleider. Gedeputeerde Staten verwacht binnen vier weken een compleet beeld \u2014 inclusief de afwegingen die destijds zijn gemaakt.',
    herkenbaarObservatie:
      'U weet dat de informatie er ergens is. U weet alleen niet waar, en hoe u erbij komt zonder een week aan handwerk.',
    uitdagingen: [
      'Voorbeeldfunctie richting gemeenten en waterschappen in de regio, die meekijken naar de provinciale aanpak van digitalisering',
      'Grote diversiteit aan applicaties en systemen die historisch gegroeid zijn, zonder eenduidig beheermodel',
      'Behoefte aan transparantie en verantwoording — niet alleen door de Woo, maar ook in het kader van goed provinciaal bestuur',
      'Beperkte capaciteit om naast het dagelijkse werk ook fundamentele digitaliseringsprojecten te draaien',
    ],
    systemenIntro:
      'Staterra implementeert en beheert open source oplossingen die passen in het provinciale IT-landschap. Van samenwerkingsplatformen tot het Woo-publicatieplatform OPMS — wij sluiten aan op bestaande documentbeheersystemen en werkprocessen.',
    koepelIntro:
      'Het Interprovinciaal Overleg (IPO) coördineert de gezamenlijke aanpak van provincies op het gebied van digitalisering. Staterra ondersteunt provincies die hun digitale voorzieningen willen professionaliseren.',
  },

  'staterra-waterschappen': {
    label: 'Staterra voor Waterschappen',
    h1Line1: 'Digitale regie',
    h1Accent: 'voor waterschappen',
    subtitle:
      'Waterschappen beheren een uniek domein met eigen wet- en regelgeving, specifieke systemen en een compacte organisatie. Staterra helpt met open source oplossingen die passen bij de schaal en het werkveld van het waterschap — van samenwerkingstools tot Woo-compliance.',
    secondaryCta: { text: 'Woo-oplossing voor waterschappen', href: '/woo-waterschappen' },
    doelgroepNaam: 'waterschappen',
    wooLink: '/woo-waterschappen',
    wooIntro:
      'Alle 21 waterschappen moeten voldoen aan de Woo. OPMS maakt openbaarmaking van besluitdocumenten, keurvergunningen en beleidsstukken eenvoudig en controleerbaar. Snel implementeerbaar, passend bij de schaal van een waterschap.',
    uitdagingenIntro: 'Dit herkennen waterschappen die hun digitale voorzieningen willen versterken:',
    herkenbaarScenario:
      'Na een calamiteit bij een gemaal komen er binnen een week drie verzoeken binnen: \u00e9\u00e9n van een omwonende, \u00e9\u00e9n van een lokale krant, en \u00e9\u00e9n van een belangengroep. Alle drie willen ze dezelfde stukken \u2014 inspectierapporten, onderhoudsschema\u2019s, communicatie met de aannemer \u2014 maar elk verzoek wordt apart behandeld door een andere medewerker. Niemand heeft tijd om te co\u00f6rdineren, en de informatie zit verspreid over technische systemen die niet voor publicatie zijn gebouwd.',
    herkenbaarObservatie:
      'U bent een uitvoeringsorganisatie met een kerntaak. Informatievoorziening is geen afleiding \u2014 het is inmiddels een tweede baan.',
    uitdagingen: [
      'Compacte organisatie met beperkte ICT-bezetting die toch aan dezelfde digitale eisen moet voldoen als grotere bestuursorganen',
      'Specifiek domein (waterbeheer, waterveiligheid, waterkwaliteit) dat vraagt om oplossingen die aansluiten op het werkveld',
      'Afhankelijkheid van externe leveranciers voor kritieke systemen, met beperkte invloed op kosten en doorontwikkeling',
      'Toenemende eisen rond transparantie en openbaarmaking, naast de reguliere operationele taken',
    ],
    systemenIntro:
      'Staterra implementeert en beheert open source oplossingen die passen bij de schaal van een waterschap. Snel implementeerbaar, eenvoudig te beheren en schaalbaar wanneer nodig — van samenwerkingstools tot het Woo-publicatieplatform OPMS.',
    koepelIntro:
      'De Unie van Waterschappen stimuleert samenwerking op het gebied van digitalisering. Staterra biedt waterschappen de mogelijkheid om gezamenlijk op te trekken bij de implementatie van open source oplossingen.',
  },

  'staterra-rijkspartijen': {
    label: 'Staterra voor de Rijksoverheid',
    h1Line1: 'Digitale regie',
    h1Accent: 'voor ministeries en uitvoeringsorganisaties',
    subtitle:
      'Het comply-or-explain beleid maakt open source de logische eerste keuze voor rijksorganisaties. Staterra helpt met implementatie, beheer en doorontwikkeling van open source oplossingen — van samenwerkingsplatformen tot het bewezen Woo-platform OPMS, ontwikkeld met het ministerie van JenV.',
    secondaryCta: { text: 'Woo-oplossing voor de rijksoverheid', href: '/woo-rijksoverheid' },
    doelgroepNaam: 'de rijksoverheid',
    wooLink: '/woo-rijksoverheid',
    wooIntro:
      'Met ruim 200 rijksbestuursorganen verdeeld over 14 departementen is de schaal van de Woo-opgave bij de rijksoverheid enorm. OPMS is ontwikkeld in samenwerking met het ministerie van JenV en past binnen het comply-or-explain beleid. Voor agentschappen en ZBO\u2019s is een SaaS-model beschikbaar.',
    uitdagingenIntro: 'Dit herkennen rijksorganisaties die hun digitale voorzieningen willen professionaliseren:',
    herkenbaarScenario:
      'Op donderdagmiddag komt er een Kamervraag binnen over een besluit van twee jaar geleden. De beleidsmedewerker zoekt in een gedeelde schijf, vraagt het DMS op, stuurt drie collega\u2019s een mail. Het document wordt uiteindelijk gevonden \u2014 maar de bijbehorende correspondentie ligt ergens anders, de versiehistorie is onduidelijk, en niemand weet zeker of dit de definitieve versie is. De deadline voor de beantwoording is morgen 12:00.',
    herkenbaarObservatie:
      'Dit is geen incident. Dit is dinsdag. En woensdag. En donderdag.',
    uitdagingen: [
      'Het comply-or-explain beleid vereist dat bestaande open source alternatieven worden beoordeeld vóór inkoop van proprietary oplossingen',
      'Complexe en historisch gegroeide IT-landschappen die per organisatieonderdeel verschillen, met hoge beheerkosten',
      'Departementsoverstijgende afstemming die een eenduidige aanpak bemoeilijken',
      'Grote schaalverschillen tussen kerndepartementen, agentschappen en ZBO\u2019s die elk een passend model vragen',
    ],
    systemenIntro:
      'Staterra implementeert en beheert open source oplossingen die passen binnen de rijksoverheid IT-kaders. Van samenwerkingsplatformen tot het Woo-publicatieplatform OPMS — wij sluiten aan op bestaande DMS-landschappen (Corsa, OpenText, DMS Next) en werken conform BZK-richtlijnen.',
    koepelIntro:
      'OPMS is opgenomen in het open source ecosysteem van de overheid. Staterra werkt samen met rijksorganisaties die het comply-or-explain beleid niet als verplichting maar als kans zien om regie terug te pakken op hun digitale voorzieningen.',
  },

  // ══════════════════════════════════════════════════════════════
  //  WOO-DOELGROEPPAGINA'S (woo-*)
  //  Focus: Woo-specifieke herkenning, concrete publicatiecategorieën, integraties
  // ══════════════════════════════════════════════════════════════

  'woo-gemeenten': {
    label: 'Woo-oplossing voor Gemeenten',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw gemeente',
    subtitle:
      'Van raadsstukken en vergunningen tot Woo-verzoeken: OPMS maakt actieve openbaarmaking beheersbaar voor gemeenten van elke omvang. Implementeerbaar binnen 3\u00a0maanden, aansluitend op OpenZaak, Rx.Mission en uw DMS.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'gemeenten',
    wooUitdagingenIntro: 'Dit herkennen gemeenten die met de Woo aan de slag gaan:',
    wooUitdagingen: [
      'Geen centraal overzicht van publicatieverplichtingen per categorie actieve openbaarmaking',
      'Handmatige processen tussen griffie, vergunningen en Woo-coördinator die foutgevoelig en tijdrovend zijn',
      'Zaaksystemen zoals OpenZaak of Rx.Mission die niet automatisch publiceren naar een openbaar register',
      'Onduidelijkheid over welke documenten actief openbaar moeten worden gemaakt en in welke categorie',
    ],
    wooSystemenIntro:
      'OPMS integreert met de systemen die gemeenten dagelijks gebruiken: zaaksystemen als OpenZaak en Rx.Mission, documentmanagementsystemen als Corsa en Decos JOIN, en sluit aan op de GEMMA-referentiearchitectuur. Publicaties worden vanuit het werkproces aangemaakt — niet als extra taak ernaast.',
    wooKoepelIntro:
      'De VNG ondersteunt gemeenten actief bij de Woo-implementatie. Staterra werkt samen met gemeenten die via VNG-samenwerkingsverbanden gezamenlijk openbaarmaking inrichten.',
  },

  'woo-rijksoverheid': {
    label: 'Woo-oplossing voor de Rijksoverheid',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor ministeries en uitvoeringsorganisaties',
    subtitle:
      'Van Kamerstukken en beleidsnotities tot Woo-besluiten: OPMS is de open source Woo-oplossing die past binnen het comply-or-explain beleid. Bewezen bij het ministerie van JenV, schaalbaar naar agentschappen en ZBO\u2019s.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'de rijksoverheid',
    wooUitdagingenIntro: 'Dit herkennen rijksorganisaties die aan de Woo werken:',
    wooUitdagingen: [
      'Veelheid aan publicatiecategorieën: Kamerstukken, beleidsnotities, Woo-besluiten, convenanten en adviezen — elk met eigen procesafspraken',
      'Complexe DMS-landschappen (bijvoorbeeld Corsa, OpenText, DMS Next) die per organisatieonderdeel verschillen en niet automatisch publiceren',
      'Onduidelijkheid over verantwoordelijkheden: wie beoordeelt, wie publiceert, wie controleert?',
      'Schaalverschillen: een kernministerie met duizenden documenten per jaar vraagt een ander model dan een klein agentschap',
    ],
    wooSystemenIntro:
      'OPMS sluit aan op het DMS-landschap van de rijksoverheid: bijvoorbeeld Corsa, OpenText en DMS Next. Voor agentschappen en ZBO\u2019s biedt Staterra een SaaS-model met lagere instapkosten, terwijl kerndepartementen kiezen voor een eigen omgeving met volledige regie.',
    wooKoepelIntro:
      'OPMS is opgenomen in het open source ecosysteem van de overheid. Het comply-or-explain beleid schrijft voor dat bestuursorganen eerst bestaande open source oplossingen beoordelen — OPMS is die oplossing.',
  },

  'woo-provincies': {
    label: 'Woo-oplossing voor Provincies',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw provincie',
    subtitle:
      'Van omgevingsvisies en Statenbesluiten tot subsidietoekenningen: OPMS maakt openbaarmaking onderdeel van het reguliere werkproces. Naadloze aansluiting op uw bestaande documentbeheersystemen.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'provincies',
    wooUitdagingenIntro: 'Dit herkennen provincies die hun Woo-implementatie professionaliseren:',
    wooUitdagingen: [
      'Complexe documentstromen tussen Gedeputeerde Staten, Provinciale Staten en de ambtelijke organisatie die transparant moeten worden',
      'Grote diversiteit aan publicatiecategorieën: omgevingsvisies, verordeningen, subsidiebesluiten en milieu-informatie',
      'Voorbeeldfunctie richting gemeenten en waterschappen in de regio, die meekijken naar de provinciale aanpak van openbaarmaking',
      'Integratie met bestaande provinciale documentbeheer- en archiveringssystemen die niet standaard publiceren',
    ],
    wooSystemenIntro:
      'OPMS sluit aan op de documentbeheersystemen die provincies gebruiken, van Corsa tot OpenText. De koppeling met uw bestaande informatiehuishouding zorgt ervoor dat publicaties vanuit het werkproces worden aangemaakt. Statenbesluiten, omgevingsvisies en verordeningen worden automatisch klaargezet voor openbaarmaking.',
    wooKoepelIntro:
      'Het Interprovinciaal Overleg (IPO) coördineert de gezamenlijke aanpak van provincies op het gebied van openbaarmaking. Staterra ondersteunt provincies die hun Woo-implementatie willen professionaliseren.',
  },

  'woo-waterschappen': {
    label: 'Woo-oplossing voor Waterschappen',
    h1Line1: 'Woo-compliance',
    h1Accent: 'voor uw waterschap',
    subtitle:
      'Van keurvergunningen en peilbesluiten tot waterbeheerplannen: OPMS maakt openbaarmaking eenvoudig en controleerbaar. Snel implementeerbaar, passend bij de schaal van een waterschap.',
    secondaryCta: { text: 'Bekijk het OPMS-platform', href: '/woo-oplossing' },
    doelgroepNaam: 'waterschappen',
    wooUitdagingenIntro: 'Dit herkennen waterschappen die met de Woo aan de slag gaan:',
    wooUitdagingen: [
      'Specifieke publicatiecategorieën die afwijken van andere bestuurslagen: keurvergunningen, peilbesluiten, waterbeheerplannen en calamiteitenplannen',
      'Relatief kleine organisatie met beperkte ICT-capaciteit voor een Woo-implementatietraject',
      'Documentstromen tussen dagelijks bestuur, algemeen bestuur en dijkgraaf die transparant moeten worden',
      'Behoefte aan een werkbare oplossing zonder langdurig IT-project — snel live, eenvoudig te beheren',
    ],
    wooSystemenIntro:
      'OPMS integreert met de document- en zaaksystemen die waterschappen gebruiken. De oplossing is specifiek geschikt voor organisaties met een compacte ICT-bezetting: snel implementeerbaar, eenvoudig te beheren en schaalbaar wanneer het waterschap groeit in publicatievolume.',
    wooKoepelIntro:
      'De Unie van Waterschappen stimuleert samenwerking op het gebied van openbaarmaking. Staterra biedt waterschappen de mogelijkheid om gezamenlijk op te trekken bij de Woo-implementatie.',
  },
};
