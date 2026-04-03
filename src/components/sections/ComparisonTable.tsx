import { Container } from '@/components/ui/Container';

interface ComparisonRow {
  label: string;
  opms: string;
  centraal: string;
  maatwerk: string;
  highlight?: boolean;
}

const ROWS: ComparisonRow[] = [
  {
    label: 'Doorlooptijd',
    opms: '3–6 maanden',
    centraal: 'Meerdere jaren',
    maatwerk: '6–18 maanden',
    highlight: true,
  },
  {
    label: 'Open source',
    opms: 'Ja — BZK-bibliotheek',
    centraal: 'Nee',
    maatwerk: 'Zelden',
  },
  {
    label: 'Vendor lock-in',
    opms: 'Nee',
    centraal: 'Hoog',
    maatwerk: 'Hoog',
  },
  {
    label: 'Kostenniveau',
    opms: '€70K–140K eenmalig',
    centraal: 'Onbekend',
    maatwerk: '€200K+',
    highlight: true,
  },
  {
    label: 'Comply-or-explain',
    opms: 'Eerste keuze',
    centraal: 'Niet van toepassing',
    maatwerk: 'Niet van toepassing',
  },
  {
    label: 'Direct inzetbaar',
    opms: 'Ja — bewezen in praktijk',
    centraal: 'Nee',
    maatwerk: 'Nee',
  },
];

function CheckIcon() {
  return (
    <svg className="inline w-4 h-4 text-success mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="inline w-4 h-4 text-neutral-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CellValue({ value, isOpms }: { value: string; isOpms: boolean }) {
  const isPositive = isOpms
    ? !['nee', 'onbekend', 'hoog', 'zelden', 'niet van toepassing'].some(
        (w) => value.toLowerCase().startsWith(w)
      )
    : false;

  const isNegative = !isOpms
    ? ['nee', 'hoog', 'meerdere', '€200', 'onbekend', 'niet van toepassing', 'zelden'].some(
        (w) => value.toLowerCase().includes(w)
      )
    : false;

  return (
    <span
      className={
        isPositive
          ? 'text-success font-medium'
          : isNegative
          ? 'text-neutral-500'
          : 'text-neutral-700'
      }
    >
      {isPositive && <CheckIcon />}
      {isNegative && <CrossIcon />}
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section
      className="bg-white py-16 lg:py-24"
      aria-labelledby="comparison-heading"
    >
      <Container variant="content">
        <div className="text-center mb-12">
          <span className="inline-block text-caption font-semibold uppercase tracking-widest text-brand-700 mb-3">
            Vergelijking
          </span>
          <h2
            id="comparison-heading"
            className="font-heading text-h2 font-semibold text-neutral-950"
          >
            OPMS versus de alternatieven
          </h2>
          <p className="text-body text-neutral-700 mt-4 max-w-[640px] mx-auto">
            Het comply-or-explain beleid schrijft voor dat bestuursorganen eerst
            bestaande open source oplossingen beoordelen. OPMS is opgenomen in
            het BZK open source ecosysteem.
          </p>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[640px] px-4 sm:px-0">
            <table
              className="w-full border-collapse"
              aria-label="Vergelijking OPMS, centraal alternatief en maatwerk"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-left py-4 px-5 text-body-sm font-semibold text-neutral-500 w-[200px]"
                  >
                    Criterium
                  </th>
                  {/* OPMS kolom — gemarkeerd */}
                  <th
                    scope="col"
                    className="py-4 px-5 text-center rounded-t-[16px] bg-brand-700 text-white text-body-sm font-semibold"
                  >
                    <span className="block">OPMS</span>
                    <span className="block text-caption font-normal text-brand-200 mt-0.5">
                      via Staterra
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-5 text-center text-body-sm font-semibold text-neutral-700 border-b border-neutral-200"
                  >
                    Centraal alternatief
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-5 text-center text-body-sm font-semibold text-neutral-700 border-b border-neutral-200"
                  >
                    Maatwerk
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => {
                  const isLast = i === ROWS.length - 1;
                  return (
                    <tr
                      key={row.label}
                      className={row.highlight ? 'bg-neutral-100' : 'bg-white'}
                    >
                      <td className="py-4 px-5 text-body-sm font-medium text-neutral-800 border-b border-neutral-200">
                        {row.label}
                      </td>
                      {/* OPMS — gemarkeerde kolom */}
                      <td
                        className={[
                          'py-4 px-5 text-center text-body-sm bg-brand-100 border-x border-brand-200',
                          isLast ? 'border-b rounded-b-[16px]' : 'border-b border-brand-200',
                        ].join(' ')}
                      >
                        <CellValue value={row.opms} isOpms={true} />
                      </td>
                      <td className="py-4 px-5 text-center text-body-sm border-b border-neutral-200">
                        <CellValue value={row.centraal} isOpms={false} />
                      </td>
                      <td className="py-4 px-5 text-center text-body-sm border-b border-neutral-200">
                        <CellValue value={row.maatwerk} isOpms={false} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-caption text-neutral-500 mt-4 text-center">
          * &ldquo;Centraal alternatief&rdquo; verwijst naar de landelijke aanpak. Staterra
          noemt geen namen van specifieke leveranciers.
        </p>
      </Container>
    </section>
  );
}
