import { Container } from '@/components/ui/Container';
import { BESTUURSORGANEN_STATS } from '@/lib/data/bestuursorganen-stats';

const OVERHEID_STATS = [
  { value: String(BESTUURSORGANEN_STATS.totaal), label: 'Bestuursorganen', sublabel: 'vallen onder de Woo' },
  { value: String(BESTUURSORGANEN_STATS.gemeenten), label: 'Gemeenten', sublabel: 'elk zelfstandig verantwoordelijk' },
  { value: String(BESTUURSORGANEN_STATS.provincies), label: 'Provincies', sublabel: 'alle provincies' },
  { value: String(BESTUURSORGANEN_STATS.waterschappen), label: 'Waterschappen', sublabel: 'alle waterschappen' },
];

const STATERRA_STATS = [
  { value: '4', label: 'OPMS-modules', sublabel: 'in productie' },
  { value: '3 mnd', label: 'Van start', sublabel: 'tot werkend systeem' },
];

export function StatsBlock() {
  return (
    <section
      className="bg-white py-14 lg:py-20 border-y border-neutral-200"
      aria-label="Kerngetallen"
    >
      <Container variant="content">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-center">

          {/* Overheidsorganisaties — brand kleuren, prominent */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 rounded-[16px] overflow-hidden">
            {OVERHEID_STATS.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-10 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span
                    className="block font-heading font-semibold text-brand-700 mb-2"
                    style={{ fontSize: '2.75rem', lineHeight: 1 }}
                  >
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
          </dl>

          {/* Scheiding */}
          <div className="hidden lg:flex items-center justify-center px-6">
            <div className="w-px h-24 bg-neutral-200" />
          </div>

          {/* Staterra-stats — neutrale kleuren, kleiner */}
          <dl className="grid grid-cols-2 gap-px bg-neutral-200 rounded-[16px] overflow-hidden">
            {STATERRA_STATS.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-10 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span
                    className="block font-heading font-semibold text-neutral-700 mb-2"
                    style={{ fontSize: '2rem', lineHeight: 1 }}
                  >
                    {stat.value}
                  </span>
                  <span className="block text-body-sm font-semibold text-neutral-700">
                    {stat.label}
                  </span>
                  <span className="block text-caption text-neutral-400 mt-1">
                    {stat.sublabel}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

        </div>
      </Container>
    </section>
  );
}
