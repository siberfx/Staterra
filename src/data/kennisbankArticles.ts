export interface KennisbankArticle {
  slug: string;
  title: string;
  category: string;
  description: string;
  intro: string;
  sections: { heading: string; content: string }[];
  cta: string;
}

export const KENNISBANK_ARTICLES: KennisbankArticle[] = [
  {
    slug: 'wat-is-de-woo',
    title: 'Wat is de Woo en wat betekent het voor uw organisatie?',
    category: 'Woo-compliance',
    description: 'De Wet open overheid verplicht 611 bestuursorganen tot actieve openbaarmaking. Wat houdt dat in en hoe ziet het tijdpad eruit?',
    intro: 'De Wet open overheid verplicht overheden om informatie actief openbaar te maken. Wat houdt dat precies in, welke verplichtingen heeft uw organisatie, en hoe ziet het tijdpad eruit?',
    sections: [
      {
        heading: 'Van Wob naar Woo: een fundamentele verschuiving',
        content: `Op 1 mei 2022 trad de Wet open overheid (Woo) in werking als opvolger van de Wet openbaarheid van bestuur (Wob). Waar de Wob vooral draaide om het recht van burgers om informatie op te vragen — de zogenaamde passieve openbaarmaking — gaat de Woo een stap verder. De wet verplicht overheden om bepaalde informatie uit eigen beweging openbaar te maken, zonder dat iemand erom hoeft te vragen.

Die verschuiving is fundamenteel. Onder de Wob kon een gemeente afwachten tot een burger een verzoek indiende. Onder de Woo moet diezelfde gemeente proactief documenten, besluiten en beleidsstukken publiceren op een digitaal platform. Het uitgangspunt is niet langer "openbaar tenzij", maar "openbaar, mits goed georganiseerd".`,
      },
      {
        heading: 'Voor welke organisaties geldt de Woo?',
        content: 'De Woo is van toepassing op alle bestuursorganen in Nederland. In de praktijk gaat het om meer dan 600 organisaties, waaronder het Rijk (ministeries en uitvoeringsorganisaties), alle 12 provincies, 342 gemeenten, 21 waterschappen en een groot aantal zelfstandige bestuursorganen. Of uw organisatie groot of klein is, maakt geen verschil — de wet geldt voor iedereen.',
      },
      {
        heading: 'De 17 informatiecategorieën',
        content: `De kern van de Woo bestaat uit 17 categorieën informatie die bestuursorganen actief openbaar moeten maken. Denk aan wetten en regelgeving, organisatie-informatie, Woo-verzoeken en hun besluiten, convenanten, jaarplannen, onderzoeksrapporten en adviezen van adviescolleges.

Om de implementatie haalbaar te maken, voert de overheid de verplichte openbaarmaking gefaseerd in via vier tranches.

Tranche 1 is op 1 november 2024 ingegaan en omvat vijf categorieën: wet- en regelgeving, overige besluiten van algemene strekking, organisatie en werkwijze, bereikbaarheidsgegevens, en parlementaire stukken.

Tranche 2 staat gepland voor 2025-2026 en voegt daar onder meer Woo-verzoeken, convenanten en klachtoordelen aan toe. De precieze invoeringsdatum is nog in beweging — het ministerie van BZK werkt aan een aangepaste planning.

Tranche 3 en 4 volgen daarna en completeren het geheel met categorieën als onderzoeksrapporten, jaarplannen en adviezen.`,
      },
      {
        heading: 'Wat moet uw organisatie concreet doen?',
        content: `De Woo stelt drie hoofdverplichtingen aan bestuursorganen.

Ten eerste de actieve openbaarmaking. Uw organisatie moet de informatie uit de van toepassing zijnde categorieën publiceren op een digitaal toegankelijk platform. Documenten moeten doorzoekbaar en vindbaar zijn voor burgers. Dit vereist niet alleen een technisch platform, maar ook werkprocessen die ervoor zorgen dat documenten op het juiste moment worden aangeleverd en gepubliceerd.

Ten tweede de passieve openbaarmaking. Burgers en journalisten kunnen nog steeds informatie opvragen via een Woo-verzoek. De Woo handhaaft dit recht en stelt aangescherpte termijnen. Uw organisatie moet binnen vier weken reageren, met een mogelijke verlenging van twee weken. Dat is korter dan onder de oude Wob gangbaar was.

Ten derde de informatiehuishouding. De Woo verplicht bestuursorganen om hun informatiehuishouding op orde te brengen. Dat betekent: documenten goed archiveren, metadata toevoegen, en zorgen dat informatie terugvindbaar is. Dit is vaak de grootste uitdaging, omdat veel organisaties werken met verouderde archiefsystemen of ongestructureerde mappen.`,
      },
      {
        heading: 'Het comply-or-explain principe',
        content: 'Een belangrijk aspect van de Woo-implementatie is het comply-or-explain beleid vanuit het ministerie van BZK. Bestuursorganen worden geacht gebruik te maken van de door de overheid ondersteunde open source oplossingen — tenzij ze kunnen uitleggen waarom ze een alternatief kiezen. Dit beleid bevordert standaardisatie, hergebruik en lagere kosten voor de gehele overheid.\n\nIn de praktijk betekent dit dat organisaties die kiezen voor een open source publicatieplatform dat is opgenomen in het BZK-ecosysteem, in lijn handelen met het overheidsbeleid. Organisaties die een commercieel alternatief kiezen, moeten kunnen onderbouwen waarom.',
      },
      {
        heading: 'De urgentie: waarom nu handelen?',
        content: 'Hoewel de volledige invoering gefaseerd verloopt, is er goede reden om nu al in beweging te komen. De eerste tranche is al van kracht. De tweede tranche nadert. En de ervaring leert dat het op orde brengen van de informatiehuishouding — de basis onder alles — maanden kost.\n\nOrganisaties die vroeg beginnen, hebben het voordeel dat ze stapsgewijs kunnen opbouwen en leren. Organisaties die wachten tot de deadline, lopen het risico dat ze onder tijdsdruk kwaliteit moeten inleveren of afhankelijk worden van dure noodoplossingen.',
      },
      {
        heading: 'Hoe verder?',
        content: 'De eerste stap is altijd een inventarisatie: waar staat uw organisatie nu? Welke informatiecategorieën zijn al op orde, en waar zitten de gaten? Van daaruit kunt u een realistisch plan maken dat past bij uw capaciteit en ambitie.\n\nEen werkende Woo-oplossing hoeft geen jaren te duren. Met de juiste aanpak en een bewezen platform kan uw organisatie binnen enkele maanden een operationeel publicatiesysteem hebben — en daarmee niet alleen voldoen aan de wet, maar ook het vertrouwen van burgers in uw organisatie versterken.',
      },
    ],
    cta: 'Heeft u vragen over de Woo-verplichtingen voor uw organisatie? Neem contact op voor een vrijblijvend verkenningsgesprek.',
  },
  {
    slug: 'opms-uitgelegd',
    title: 'OPMS uitgelegd: zo werkt het open source platform voor openbaarmaking',
    category: 'Woo-compliance',
    description: 'OPMS is het open source publicatieplatform voor de Woo. Een praktische uitleg van wat het doet, hoe het werkt en waarom organisaties ervoor kiezen.',
    intro: 'Uw organisatie moet voldoen aan de Woo, maar hoe publiceert u al die documenten eigenlijk? OPMS is het open source publicatieplatform dat speciaal is ontwikkeld voor en door de overheid. Een praktische uitleg van wat het doet, hoe het werkt en waarom steeds meer organisaties ervoor kiezen.',
    sections: [
      {
        heading: 'Wat is OPMS?',
        content: 'OPMS — het Open Publicatie Management Systeem — is een digitaal platform waarmee overheidsorganisaties documenten en informatie openbaar maken conform de Wet open overheid. Het platform is volledig open source, wat betekent dat de broncode vrij beschikbaar is en dat er geen licentiekosten aan verbonden zijn.\n\nOPMS is niet zomaar een documentenopslag. Het is een compleet ecosysteem dat het hele proces ondersteunt: van het aanleveren van documenten door medewerkers tot het doorzoekbaar aanbieden aan burgers via een publiek portaal.\n\nHet platform is opgenomen in het BZK open source ecosysteem. In de context van het comply-or-explain beleid van de rijksoverheid is OPMS daarmee de logische eerste keuze voor bestuursorganen die hun Woo-compliance willen inrichten.',
      },
      {
        heading: 'De vier bouwstenen',
        content: `OPMS bestaat uit vier samenhangende componenten die elk een specifieke functie vervullen.

De publicatiebank vormt het fundament. Dit is de centrale opslagvoorziening waar alle openbaar te maken documenten en bijbehorende metadata worden bewaard. De publicatiebank biedt API's waarmee andere systemen — zoals uw zaaksysteem of documentmanagementsysteem — documenten kunnen aanleveren. Dat betekent dat medewerkers niet handmatig bestanden hoeven te uploaden; de koppeling met bestaande systemen maakt het proces grotendeels automatisch.

De zoekcomponent maakt alle gepubliceerde documenten doorzoekbaar en vindbaar. Burgers kunnen zoeken op trefwoorden, datum, documenttype en informatiecategorie. De zoektechnologie is geoptimaliseerd voor overheidsdocumenten en begrijpt de structuur van besluiten, beleidsnotities en vergaderstukken.

De beheerapp is de werkomgeving voor medewerkers en beheerders. Hier publiceren en beheren zij documenten, controleren ze metadata, en houden ze overzicht over wat er openbaar is gemaakt. De interface is ontworpen voor medewerkers die geen technische achtergrond hebben — het werkt intuïtief en vereist geen speciale training.

Het burgerportaal is de publieke website waar inwoners, journalisten en andere geïnteresseerden documenten kunnen zoeken en raadplegen. Dit portaal voldoet aan de toegankelijkheidseisen (WCAG) en is geoptimaliseerd voor gebruik op zowel desktop als mobiel.`,
      },
      {
        heading: 'Hoe werkt het in de praktijk?',
        content: 'Stel: een gemeente neemt een besluit over een bestemmingsplanwijziging. In de traditionele werkwijze wordt dat besluit genomen, ergens opgeslagen in een documentensysteem, en gepubliceerd via de gebruikelijke kanalen. Actieve openbaarmaking onder de Woo vereist dat dit besluit ook vindbaar wordt aangeboden via een Woo-publicatieplatform.\n\nMet OPMS verloopt dat als volgt. Het besluit wordt in het zaaksysteem afgerond en gemarkeerd voor publicatie. Via de API-koppeling komt het document automatisch terecht in de publicatiebank, inclusief metadata zoals datum, categorie en onderwerp. De zoekindex wordt bijgewerkt, waardoor het document direct vindbaar wordt in het burgerportaal. Een medewerker kan via de beheerapp controleren of alles correct is en zo nodig aanpassingen doen.\n\nHet resultaat: burgers kunnen het besluit vinden zonder een Woo-verzoek in te dienen, de gemeente voldoet aan haar actieve openbaarmakingsplicht, en het proces kost medewerkers minimale extra inspanning.',
      },
      {
        heading: 'Waarom open source?',
        content: `De keuze voor open source is niet vrijblijvend — het is een bewuste strategie van de rijksoverheid om drie problemen aan te pakken.

Ten eerste leveranciersonafhankelijkheid. Bij propriëtaire software bepaalt de leverancier het tempo, de kosten en de richting van doorontwikkeling. Bij open source houdt de overheid de regie. De broncode is eigendom van de gemeenschap, niet van een bedrijf. Dat betekent dat uw organisatie altijd kan overstappen, aanpassen of zelf doorontwikkelen.

Ten tweede kostenbesparing. Omdat de software gezamenlijk wordt ontwikkeld en onderhouden, worden de kosten gedeeld over alle deelnemende organisaties. Er zijn geen licentiekosten en geen onverwachte prijsverhogingen. Hoe meer organisaties meedoen, hoe lager de kosten per organisatie.

Ten derde transparantie. Een overheid die transparantie van zichzelf vraagt via de Woo, doet er goed aan ook transparant te zijn over de technologie die ze daarvoor inzet. Open source maakt de werking van het platform controleerbaar voor iedereen.`,
      },
      {
        heading: 'Implementatie: sneller dan u denkt',
        content: `Een veelgehoorde zorg is dat de implementatie van een nieuw platform maanden tot jaren duurt. Voor OPMS valt dat mee. Omdat het platform als SaaS (Software as a Service) beschikbaar is, kan een organisatie binnen enkele weken aansluiten.

De typische implementatie verloopt in drie fasen. In de verkenningsfase (2-4 weken) wordt de huidige situatie in kaart gebracht, worden de koppelingen met bestaande systemen geïnventariseerd, en wordt een implementatieplan opgesteld. In de inrichtingsfase (4-8 weken) wordt het platform geconfigureerd, worden koppelingen gerealiseerd en worden medewerkers opgeleid. In de productiefase worden de eerste documenten gepubliceerd en wordt het platform geleidelijk onderdeel van de dagelijkse werkprocessen.

Voor organisaties die snel willen starten, is een werkend minimaal product (MVP) binnen drie maanden haalbaar. Een volledig operationeel systeem met alle koppelingen en informatiecategorieën is doorgaans binnen negen maanden gerealiseerd.`,
      },
      {
        heading: 'Geschikt voor elke schaal',
        content: 'OPMS is ontworpen om te werken voor organisaties van elke omvang. Een kleine gemeente met 20.000 inwoners heeft andere volumes dan een grote provincie of een rijksorganisatie, maar het platform schaalt mee. De architectuur is modulair opgebouwd, waardoor organisaties kunnen beginnen met de onderdelen die zij het hardst nodig hebben en later uitbreiden.\n\nBovendien profiteren alle deelnemende organisaties van elkaars doorontwikkeling. Wanneer een gemeente een verbetering laat bouwen, is die beschikbaar voor iedereen. Dat is de kracht van een gezamenlijk open source platform.',
      },
      {
        heading: 'De volgende stap',
        content: 'Wilt u weten hoe OPMS past bij de specifieke situatie van uw organisatie? Een verkenningsgesprek geeft direct inzicht in de aanpak, doorlooptijd en haalbaarheid. Geen verkooppraatje, maar een inhoudelijk gesprek over uw Woo-uitdaging en de route ernaartoe.',
      },
    ],
    cta: 'Benieuwd hoe OPMS werkt voor uw type organisatie? Plan een verkenningsgesprek en krijg binnen twee werkdagen een voorstel op maat.',
  },
  {
    slug: '5-fouten-woo-compliance',
    title: '5 veelgemaakte fouten bij Woo-compliance — en hoe u ze voorkomt',
    category: 'Woo-compliance',
    description: 'De weg naar Woo-compliance is bezaaid met valkuilen. Dit zijn de vijf fouten die wij het vaakst tegenkomen — met praktische tips.',
    intro: 'De Woo raakt elke overheidsorganisatie, maar de weg naar compliance is bezaaid met valkuilen. Dit zijn de vijf fouten die wij het vaakst tegenkomen bij gemeenten, provincies en waterschappen — met praktische tips om ze te vermijden.',
    sections: [
      {
        heading: 'Fout 1: Wachten tot de deadline',
        content: `De meest voorkomende fout is tegelijk de meest begrijpelijke. De Woo-verplichtingen worden gefaseerd ingevoerd, dus het is verleidelijk om te denken: "We hebben nog tijd." Maar die redenering onderschat hoeveel werk er komt kijken bij een goede implementatie.

Het op orde brengen van uw informatiehuishouding — de basis onder elke Woo-oplossing — kost maanden. Werkprocessen moeten worden aangepast, medewerkers moeten leren om documenten op een nieuwe manier te behandelen, en technische koppelingen tussen systemen moeten worden gerealiseerd. Dat alles lukt niet in een paar weken voor een deadline.

Hoe het beter kan: Begin met een inventarisatie van uw huidige situatie. Waar staan de documenten die onder de eerste tranche vallen? Zijn ze al digitaal en gestructureerd beschikbaar? Dat overzicht alleen al geeft richting aan de vervolgstappen — en u kunt die stappen in een rustig tempo zetten in plaats van onder druk.`,
      },
      {
        heading: 'Fout 2: De Woo als IT-project behandelen',
        content: `Een Woo-implementatie vraagt om een publicatieplatform. Dus gaat de opdracht naar de IT-afdeling, die het benadert als een technisch project. Platform selecteren, installeren, testen, opleveren, klaar. Maar daarmee mist u het grootste deel van de opgave.

De Woo is in de eerste plaats een organisatorische verandering. Het raakt de manier waarop medewerkers omgaan met documenten, hoe besluitvorming wordt vastgelegd, en hoe informatie door de organisatie stroomt. Een platform zonder aangepaste werkprocessen is als een archiefsysteem zonder archivarissen — technisch aanwezig, maar in de praktijk leeg.

Hoe het beter kan: Betrek vanaf het begin niet alleen IT, maar ook de afdelingen die de documenten produceren. De griffie, juridische zaken, communicatie, beleidsafdelingen — zij moeten begrijpen waarom de Woo er is en wat er van hen wordt verwacht. Maak iemand verantwoordelijk voor de procesverandering, niet alleen voor de techniek.`,
      },
      {
        heading: 'Fout 3: Kiezen voor een gesloten systeem',
        content: `Onder tijdsdruk of vanuit gewoonte kiezen organisaties soms voor een commercieel publicatieplatform van een vertrouwde leverancier. Dat lijkt op korte termijn veilig — een bekend gezicht, een duidelijk contract, een telefoonnummer voor support. Maar op de langere termijn kan het een kostbare keuze zijn.

Gesloten systemen creëren afhankelijkheid. De leverancier bepaalt het tempo van doorontwikkeling, de prijsstelling bij contractverlenging, en de mogelijkheden voor koppelingen met andere systemen. Bij open source oplossingen ligt de regie bij de overheid zelf.

Bovendien hanteert het ministerie van BZK een comply-or-explain beleid: bestuursorganen worden geacht open source oplossingen te gebruiken die zijn opgenomen in het BZK-ecosysteem. Kiest u voor een commercieel alternatief, dan moet u kunnen uitleggen waarom.

Hoe het beter kan: Onderzoek de open source opties die beschikbaar zijn binnen het BZK-ecosysteem. Deze platforms zijn specifiek ontwikkeld voor de Nederlandse overheid, worden gezamenlijk doorontwikkeld, en bieden dezelfde (of betere) functionaliteit als commerciële alternatieven — zonder de afhankelijkheid.`,
      },
      {
        heading: 'Fout 4: Metadata als bijzaak beschouwen',
        content: `Documenten publiceren is relatief eenvoudig. Documenten vindbaar maken is een ander verhaal. En dat verschil zit in de metadata — de beschrijvende informatie die bij elk document hoort: titel, datum, categorie, onderwerp, documenttype, verantwoordelijk bestuursorgaan.

Veel organisaties publiceren documenten met minimale of inconsistente metadata. Het resultaat is een publicatieplatform dat technisch werkt, maar waar burgers niets kunnen vinden.

Hoe het beter kan: Investeer vooraf in een metadata-standaard voor uw organisatie. Bepaal welke velden verplicht zijn, welke waardenlijsten u hanteert, en wie verantwoordelijk is voor het toekennen van metadata. Maak het zo eenvoudig mogelijk voor medewerkers: hoe minder velden ze handmatig moeten invullen, hoe beter de kwaliteit. Automatiseer waar mogelijk.`,
      },
      {
        heading: 'Fout 5: Geen rekening houden met de menselijke maat',
        content: `De Woo verplicht openbaarmaking, maar niet ten koste van alles. Documenten kunnen persoonsgegevens bevatten, bedrijfsgevoelige informatie, of details die de veiligheid raken. De wet biedt uitzonderingsgronden om dergelijke informatie te beschermen — maar die moeten wel correct worden toegepast.

De fout die wij zien is tweeledig. Sommige organisaties zijn te voorzichtig en lakken zoveel tekst weg dat er nauwelijks leesbare documenten overblijven. Andere organisaties zijn te nonchalant en publiceren documenten zonder ze te controleren op privacygevoelige informatie.

Hoe het beter kan: Ontwikkel een helder beoordelingsproces voor documenten voordat ze worden gepubliceerd. Wie beoordeelt welke documenten? Welke uitzonderingsgronden zijn relevant voor uw type organisatie? Een goede balans tussen openheid en bescherming is niet alleen juridisch verstandig, maar versterkt ook het vertrouwen van burgers in uw organisatie.`,
      },
      {
        heading: 'De rode draad: begin klein, denk groot',
        content: 'Wat deze vijf fouten gemeen hebben, is dat ze vaak voortkomen uit dezelfde oorzaak: de Woo wordt gezien als een eenmalig project in plaats van een doorlopend proces. Compliance is geen eindstreep die u passeert, maar een manier van werken die u stap voor stap opbouwt.\n\nBegin met de informatiecategorieën die nu al verplicht zijn. Richt een werkbaar proces in. Kies een platform dat kan meegroeien. Betrek de juiste mensen. En bouw van daaruit verder, tranche voor tranche.\n\nOrganisaties die deze aanpak volgen, merken dat Woo-compliance minder overweldigend is dan het op het eerste gezicht lijkt. Het hoeft niet in één keer perfect — het moet in beweging zijn.',
      },
    ],
    cta: 'Wilt u weten hoe uw organisatie ervoor staat? Een verkenningsgesprek brengt in kaart waar u nu staat en wat de logische volgende stappen zijn.',
  },
];

export function getArticleBySlug(slug: string): KennisbankArticle | undefined {
  return KENNISBANK_ARTICLES.find((a) => a.slug === slug);
}
