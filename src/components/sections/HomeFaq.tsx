import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface FaqCategory {
  title: string;
  items: { question: string; answer: string }[];
}

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Woo-compliance',
    items: [
      {
        question: 'Wat is de Woo en waarom moet mijn organisatie hieraan voldoen?',
        answer: 'De Wet open overheid (Woo) verplicht alle bestuursorganen tot actieve en passieve openbaarmaking van overheidsinformatie. Dit geldt voor 611 bestuursorganen — van gemeenten tot rijksoverheid. Niet voldoen kan leiden tot juridische procedures en reputatieschade.',
      },
      {
        question: 'Hoe snel kan OPMS ingezet worden?',
        answer: 'OPMS is als SaaS direct beschikbaar. Een volledige on-premise implementatie duurt gemiddeld 3 maanden. We beginnen met een verkenningsgesprek, gevolgd door configuratie en een pilotfase. Daarna bent u operationeel.',
      },
      {
        question: 'Wat kost de implementatie?',
        answer: 'De kosten hangen af van de omvang van uw organisatie en het gekozen model. Een gedeelde SaaS-omgeving start vanaf €70K eenmalig. Een dedicated omgeving met maatwerk begint rond €140K. Geen doorlopende licentiekosten — alleen beheer en onderhoud.',
      },
      {
        question: 'Is OPMS geschikt voor kleine gemeenten?',
        answer: 'Absoluut. De gedeelde SaaS-omgeving is specifiek ontworpen voor kleinere organisaties. U deelt de infrastructuur met andere gemeenten, wat de kosten laag houdt, terwijl uw data volledig gescheiden blijft.',
      },
    ],
  },
  {
    title: 'Samen ontwikkelen',
    items: [
      {
        question: 'Kunnen wij samen met Staterra een geheel nieuwe oplossing bouwen?',
        answer: 'Ja. We bouwen samen met overheden digitale oplossingen op maat — van eerste verkenning tot werkend product. U bepaalt de richting, wij leveren de technische realisatie. Het resultaat is open source en volledig van u.',
      },
      {
        question: 'Hoe verloopt een co-creatietraject?',
        answer: 'We starten met een verkenningsfase waarin we uw vraagstuk en bestaande systemen in kaart brengen. Daarna volgt een ontwerp- en prototypefase met korte iteraties. Na validatie bouwen we het product uit en zorgen we voor een soepele livegang.',
      },
      {
        question: 'Wat als onze organisatie weinig technische kennis in huis heeft?',
        answer: 'Dat is geen probleem. Staterra neemt de volledige technische realisatie op zich. Uw rol is het sturen op inhoud en prioriteiten — wij vertalen dat naar werkende software. U hoeft geen ontwikkelaars in dienst te hebben.',
      },
      {
        question: 'Houden wij eigenaarschap over het eindresultaat?',
        answer: 'Altijd. Alles wat we samen bouwen is open source. U bezit de broncode, kunt zelf doorontwikkelen of een andere partij inschakelen. Geen vendor lock-in, geen licentiekosten achteraf.',
      },
    ],
  },
  {
    title: 'Open source beheer',
    items: [
      {
        question: 'Welke open source applicaties kan Staterra implementeren en beheren?',
        answer: 'Naast OPMS implementeren en beheren wij open source platformen zoals Nextcloud (bestanden en samenwerking), Rocket.Chat (communicatie), Jitsi (videovergaderen) en andere applicaties die passen binnen de publieke sector. Altijd op uw eigen infrastructuur of een door u gekozen omgeving.',
      },
      {
        question: 'Waarom zou ik Nextcloud via Staterra afnemen in plaats van zelf installeren?',
        answer: 'Installeren is het begin — beheren is het werk. Staterra zorgt voor beveiligingsupdates, monitoring, back-ups, schaalbaarheid en 24/7 ondersteuning. U krijgt een productiewaardige omgeving zonder zelf een devops-team te hoeven opzetten.',
      },
      {
        question: 'Kunnen jullie bestaande open source omgevingen overnemen?',
        answer: 'Ja. We doen een assessment van uw huidige omgeving, brengen de staat van onderhoud en beveiliging in kaart, en nemen het beheer over. Indien nodig migreren we naar een stabielere of veiligere opzet.',
      },
      {
        question: 'Wat als wij al een ander systeem gebruiken?',
        answer: 'Open source oplossingen kunnen naast bestaande systemen draaien en integreren via standaard API\'s. Migratie is mogelijk maar niet verplicht — veel organisaties starten met een parallelle opzet en schakelen geleidelijk over.',
      },
    ],
  },
];

// Flat array + globale key per vraag
const ALL_FAQ_ITEMS = FAQ_CATEGORIES.flatMap((cat, ci) =>
  cat.items.map((item, ii) => ({ ...item, key: `${ci}-${ii}` })),
);

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL_FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

// ── Single FAQ item (controlled) ─────────────────────────────

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={onToggle}
        className={[
          'flex items-center justify-between w-full py-5 px-2 -mx-2 rounded-lg text-left cursor-pointer',
          'transition-colors duration-150',
          isOpen ? 'bg-neutral-50' : 'hover:bg-neutral-50',
        ].join(' ')}
        aria-expanded={isOpen}
      >
        <span className={[
          'text-body-sm font-semibold pr-4 transition-colors duration-150',
          isOpen ? 'text-brand-700' : 'text-neutral-900',
        ].join(' ')}>
          {question}
        </span>
        <svg
          className={[
            'w-5 h-5 flex-shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180 text-brand-600' : 'text-neutral-400',
          ].join(' ')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-body-sm text-neutral-600 leading-relaxed pb-5 px-2 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── HomeFaq ──────────────────────────────────────────────────

export function HomeFaq() {
  // Single-open across all categories
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  }, []);

  let globalIndex = 0;

  return (
    <section className="bg-white py-12 lg:py-16" aria-labelledby="faq-heading">
      <Container variant="text">
        <div className="text-center mb-10">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-600 mb-3">
            Veelgestelde vragen
          </span>
          <h2
            id="faq-heading"
            className="font-heading text-h2 font-semibold text-neutral-950"
          >
            Veelgestelde vragen
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_CATEGORIES.map((category, ci) => (
            <div key={category.title} className={ci > 0 ? 'mt-8' : ''}>
              <h3 className="inline-flex items-center border-l-[3px] border-brand-600 bg-brand-50 px-3 py-1.5 rounded-r-md text-body-sm font-semibold text-brand-700 uppercase tracking-widest mb-3">
                {category.title}
              </h3>
              <div className="rounded-[20px] border border-neutral-200 bg-white px-6 lg:px-8">
                {category.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  globalIndex++;
                  return (
                    <FaqItem
                      key={key}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openKey === key}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA onderaan */}
        <div className="text-center pt-8 pb-4">
          <p className="text-body-sm text-neutral-600">
            Staat uw vraag er niet bij?{' '}
            <Link
              to="/contact"
              className="text-brand-700 font-semibold hover:underline transition-colors duration-150"
            >
              Neem contact op
            </Link>
            {' '}— wij reageren binnen twee werkdagen.
          </p>
        </div>
      </Container>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </section>
  );
}
