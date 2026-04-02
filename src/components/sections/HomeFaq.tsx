import { useState } from 'react';
import { Container } from '@/components/ui/Container';

const FAQ_ITEMS = [
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
    question: 'Houden wij als organisatie de regie?',
    answer: 'Ja. OPMS is open source — u bezit de broncode en bent nooit afhankelijk van Staterra of een andere leverancier. U kunt op elk moment overstappen of zelf verder ontwikkelen. Dat is het fundament van onze aanpak.',
  },
  {
    question: 'Is OPMS geschikt voor kleine gemeenten?',
    answer: 'Absoluut. De gedeelde SaaS-omgeving is specifiek ontworpen voor kleinere organisaties. U deelt de infrastructuur met andere gemeenten, wat de kosten laag houdt, terwijl uw data volledig gescheiden blijft.',
  },
  {
    question: 'Wat als wij al een ander systeem gebruiken?',
    answer: 'OPMS kan naast bestaande systemen draaien en integreert via standaard API\'s met uw documentbeheersysteem. Migratie is mogelijk maar niet verplicht — veel organisaties starten OPMS als aanvulling op hun huidige landschap.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-body-sm font-semibold text-neutral-900 pr-4 group-hover:text-brand-700 transition-colors duration-150">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
          maxHeight: open ? '500px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-body-sm text-neutral-600 leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function HomeFaq() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="faq-heading">
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

        <div className="rounded-[20px] border border-neutral-200 bg-white px-6 lg:px-8">
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
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
