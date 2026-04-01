import { Container } from '@/components/ui/Container';

interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

const STATS: Stat[] = [
  {
    value: '530+',
    label: 'Bestuursorganen',
    sublabel: 'die een Woo-oplossing nodig hebben',
  },
  {
    value: '4',
    label: 'OPMS-modules',
    sublabel: 'in productie',
  },
  {
    value: '10x',
    label: 'Lagere kosten',
    sublabel: 'dan het centrale alternatief',
  },
  {
    value: '3 mnd',
    label: 'Van start',
    sublabel: 'tot werkend systeem',
  },
];

export function StatsBlock() {
  return (
    <section
      className="bg-white py-14 lg:py-20 border-y border-neutral-200"
      aria-label="Kerngetallen"
    >
      <Container variant="content">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-[16px] overflow-hidden">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="bg-white px-8 py-10 text-center"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className="block font-heading font-semibold text-brand-700 mb-2"
                  style={{ fontSize: '2.75rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {stat.value}
                </span>
                <span className="sr-only">{stat.value}</span>
                <span className="block text-body-sm font-semibold text-neutral-800">
                  {stat.label}
                </span>
                {stat.sublabel && (
                  <span className="block text-caption text-neutral-500 mt-1">
                    {stat.sublabel}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
