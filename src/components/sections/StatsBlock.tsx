import { Container } from '@/components/ui/Container';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

const OVERHEID_STATS = [
  { value: String(BESTUURSORGANEN_STATS.totaal), label: 'Bestuursorganen', sublabel: 'vallen onder de Woo' },
  { value: String(BESTUURSORGANEN_STATS.gemeenten), label: 'Gemeenten', sublabel: 'zelfstandig verantwoordelijk' },
  { value: String(BESTUURSORGANEN_STATS.provincies), label: 'Provincies', sublabel: 'alle provincies' },
  { value: String(BESTUURSORGANEN_STATS.waterschappen), label: 'Waterschappen', sublabel: 'alle waterschappen' },
];

const STATERRA_STATS = [
  { value: '4', label: 'OPMS-modules', sublabel: 'in productie' },
  { value: '3 mnd', label: 'Van start', sublabel: 'tot werkend systeem (SaaS direct beschikbaar)' },
];

export function StatsBlock() {
  return (
    <section
      className="bg-white py-14 lg:py-20 border-y border-neutral-200"
      aria-label="Kerngetallen"
    >
      <Container variant="content">
        {/* Eén rij met 6 kolommen: 4 overheid (brand) + 2 staterra (neutraal) */}
        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-200 rounded-[16px] overflow-hidden">
          {OVERHEID_STATS.map((stat) => (
            <div key={stat.label} className="bg-white px-4 py-10 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading font-semibold text-brand-700 text-[clamp(1.75rem,3vw,2.5rem)] leading-none mb-2">
                  {stat.value}
                </span>
                <span className="block text-body-sm font-semibold text-neutral-800">
                  {stat.label}
                </span>
                <span className="block text-caption text-neutral-500 mt-1">
                  {stat.sublabel}
                </span>
              </dd>
            </div>
          ))}
          {STATERRA_STATS.map((stat) => (
            <div key={stat.label} className="bg-brand-50/50 px-4 py-10 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading font-semibold text-neutral-600 text-[clamp(1.5rem,2.5vw,2rem)] leading-none mb-2">
                  {stat.value}
                </span>
                <span className="block text-body-sm font-semibold text-neutral-600">
                  {stat.label}
                </span>
                <span className="block text-caption text-neutral-400 mt-1">
                  {stat.sublabel}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
