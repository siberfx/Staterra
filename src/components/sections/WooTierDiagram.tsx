/**
 * WooTierDiagram — visualiseert de twee Woo-instapniveaus:
 *
 *   OPMS-tier (centraal): bronnen → OPMS (€2.500 + €750/eenheid) → Opub → KOOP/VWS/...
 *   Opub-tier (zelfstandig): bronnen → Opub-tier (€500 + €250/koppeling) → Opub → KOOP/VWS/...
 *
 * Tailwind tekst-classes worden via SVG-foreignObjects toegepast voor
 * leesbare typografie; vlakken en pijlen zijn pure SVG zodat het op elke
 * resolutie crisp blijft.
 */

const COLORS = {
  // Brand
  brandPrimary: '#163E74',
  brandPrimarySoft: '#E8EFF8',
  brandAccent: '#3A7DB8',
  brandAccentSoft: '#EAF3FA',
  // Neutral
  neutral200: '#E5E7EB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral700: '#374151',
  neutral900: '#111827',
  // Price badge
  priceBg: '#FEF3C7',
  priceBorder: '#F59E0B',
  priceText: '#92400E',
} as const;

function PriceBadge({ x, y, label }: { x: number; y: number; label: string }) {
  // Auto-width: ~7px per char + padding
  const w = Math.max(110, label.length * 7.2 + 24);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={26}
        rx={13}
        fill={COLORS.priceBg}
        stroke={COLORS.priceBorder}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2}
        y={y + 17}
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
        fill={COLORS.priceText}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function SourceBox({ x, y, label, sublabel }: { x: number; y: number; label: string; sublabel: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={170}
        height={62}
        rx={10}
        fill="white"
        stroke={COLORS.neutral400}
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />
      <text x={x + 14} y={y + 22} fontSize={10} fontWeight={600} fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif" letterSpacing="1.2">
        {label}
      </text>
      <text x={x + 14} y={y + 44} fontSize={13} fontWeight={600} fill={COLORS.neutral900} fontFamily="Inter, system-ui, sans-serif">
        {sublabel}
      </text>
    </g>
  );
}

function OutputBox({ x, y, title, url }: { x: number; y: number; title: string; url: string }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={200}
        height={64}
        rx={10}
        fill="white"
        stroke={COLORS.neutral200}
        strokeWidth={1.5}
      />
      <text x={x + 16} y={y + 26} fontSize={14} fontWeight={700} fill={COLORS.neutral900} fontFamily="Inter, system-ui, sans-serif">
        {title}
      </text>
      <text x={x + 16} y={y + 46} fontSize={12} fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif">
        {url}
      </text>
    </g>
  );
}

export function WooTierDiagram() {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 1200 720"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-labelledby="woo-tier-diagram-title woo-tier-diagram-desc"
      >
        <title id="woo-tier-diagram-title">Architectuur van de twee Woo-instapniveaus</title>
        <desc id="woo-tier-diagram-desc">
          Diagram toont twee tier-paden: OPMS-tier voor centrale bestuursorganen
          met €2.500 per maand en €750 per publicatie-eenheid, en Opub-tier voor
          zelfstandige bestuursorganen met €500 per maand en €250 per
          API-koppeling. Beide leveren publicaties via het Opub
          publicatie-platform door naar KOOP, open.minvws.nl en andere kanalen.
        </desc>

        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.neutral400} />
          </marker>
        </defs>

        {/* ── TOP TIER LABEL ─────────────────────────────────── */}
        <text x={20} y={28} fontSize={11} fontWeight={700} letterSpacing="1.5" fill={COLORS.brandPrimary} fontFamily="Inter, system-ui, sans-serif">
          OPMS-TIER · CENTRAAL BESTUURSORGAAN
        </text>

        {/* ── TOP: Bronnen ──────────────────────────────────── */}
        <SourceBox x={20} y={50} label="BRON 1" sublabel="Handmatige upload" />
        <SourceBox x={20} y={130} label="BRON 2" sublabel="API koppeling" />
        <SourceBox x={20} y={210} label="BRON 3" sublabel="API koppeling" />

        {/* ── TOP: pijlen bronnen → OPMS ────────────────────── */}
        <line x1={195} y1={81} x2={285} y2={140} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={195} y1={161} x2={285} y2={161} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={195} y1={241} x2={285} y2={185} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />

        {/* ── TOP: OPMS-blok ────────────────────────────────── */}
        <rect x={290} y={50} width={340} height={230} rx={14} fill={COLORS.brandPrimarySoft} stroke={COLORS.brandPrimary} strokeWidth={1.5} />
        <text x={310} y={78} fontSize={13} fontWeight={700} fill={COLORS.brandPrimary} fontFamily="Inter, system-ui, sans-serif">
          OPMS
        </text>
        <text x={310} y={95} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">
          centrale verwerkingslaag
        </text>
        <PriceBadge x={500} y={64} label="€ 2.500 / maand" />

        {/* 3 publicatie-eenheden binnen OPMS */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={310}
              y={120 + i * 50}
              width={300}
              height={40}
              rx={8}
              fill="white"
              stroke={COLORS.neutral200}
              strokeWidth={1}
            />
            <text x={324} y={144 + i * 50} fontSize={12} fontWeight={500} fill={COLORS.neutral900} fontFamily="Inter, system-ui, sans-serif">
              Publicatie-eenheid {i + 1}
            </text>
            <PriceBadge x={500} y={127 + i * 50} label="€ 750 / mnd" />
          </g>
        ))}

        {/* ── OPMS → Opub publicatie-platform ───────────────── */}
        <line x1={630} y1={165} x2={720} y2={165} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />

        {/* ── OPUB PUBLICATIE-PLATFORM (gedeelde middenkolom) ─ */}
        <rect x={725} y={130} width={195} height={130} rx={14} fill={COLORS.brandAccentSoft} stroke={COLORS.brandAccent} strokeWidth={1.5} />
        <text x={822} y={166} fontSize={15} fontWeight={700} textAnchor="middle" fill={COLORS.brandPrimary} fontFamily="Inter, system-ui, sans-serif">
          Opub
        </text>
        <text x={822} y={184} fontSize={12} textAnchor="middle" fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">
          publicatie-platform
        </text>
        <text x={822} y={216} fontSize={11} textAnchor="middle" fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif">
          incl. voor
        </text>
        <text x={822} y={232} fontSize={11} textAnchor="middle" fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif">
          OPMS-gebruikers
        </text>

        {/* ── Opub → outputs ────────────────────────────────── */}
        <line x1={920} y1={150} x2={970} y2={120} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={920} y1={195} x2={970} y2={235} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={920} y1={235} x2={970} y2={355} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />

        {/* ── Outputs (rechts) ──────────────────────────────── */}
        <OutputBox x={975} y={88} title="KOOP" url="open.overheid.nl" />
        <OutputBox x={975} y={208} title="VWS" url="open.minvws.nl" />
        <OutputBox x={975} y={328} title="Overige" url="publicatie-platformen" />

        {/* ── DIVIDER ───────────────────────────────────────── */}
        <line x1={20} y1={360} x2={1180} y2={360} stroke={COLORS.neutral200} strokeWidth={1} strokeDasharray="3 6" />

        {/* ── BOTTOM TIER LABEL ─────────────────────────────── */}
        <text x={20} y={395} fontSize={11} fontWeight={700} letterSpacing="1.5" fill={COLORS.brandAccent} fontFamily="Inter, system-ui, sans-serif">
          OPUB-TIER · BESTUURSORGAAN
        </text>

        {/* ── BOTTOM: Opub-tier-blok ────────────────────────── */}
        <rect x={290} y={420} width={340} height={130} rx={14} fill={COLORS.brandAccentSoft} stroke={COLORS.brandAccent} strokeWidth={1.5} />
        <text x={310} y={448} fontSize={13} fontWeight={700} fill={COLORS.brandPrimary} fontFamily="Inter, system-ui, sans-serif">
          Bestuursorgaan
        </text>
        <text x={310} y={465} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">
          zelfstandig publiceren
        </text>
        <PriceBadge x={500} y={434} label="€ 500 / maand" />
        <text x={310} y={510} fontSize={11} fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif">
          Handmatige upload inclusief.
        </text>
        <text x={310} y={526} fontSize={11} fill={COLORS.neutral500} fontFamily="Inter, system-ui, sans-serif">
          API-koppelingen: € 250 / mnd per koppeling.
        </text>

        {/* ── BOTTOM: Opub-tier → Opub publicatie-platform ──── */}
        <line x1={630} y1={485} x2={720} y2={250} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />

        {/* ── BOTTOM: Bronnen ───────────────────────────────── */}
        <SourceBox x={20} y={420} label="BRON 1" sublabel="Handmatige upload" />
        <g>
          <SourceBox x={20} y={500} label="BRON 2" sublabel="API koppeling" />
          <PriceBadge x={50} y={584} label="€ 250 / mnd" />
        </g>
        <g>
          <SourceBox x={20} y={624} label="BRON 3" sublabel="API koppeling" />
          <PriceBadge x={50} y={690} label="€ 250 / mnd" />
        </g>

        {/* ── BOTTOM: pijlen bronnen → Opub-tier ────────────── */}
        <line x1={195} y1={451} x2={285} y2={465} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={195} y1={531} x2={285} y2={490} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />
        <line x1={195} y1={655} x2={285} y2={530} stroke={COLORS.neutral400} strokeWidth={1.5} markerEnd="url(#arrowhead)" />

        {/* ── LEGENDA ───────────────────────────────────────── */}
        <g transform="translate(680, 680)">
          <rect x={0} y={-12} width={14} height={14} rx={3} fill={COLORS.brandPrimarySoft} stroke={COLORS.brandPrimary} strokeWidth={1} />
          <text x={20} y={0} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">OPMS-tier</text>
          <rect x={100} y={-12} width={14} height={14} rx={3} fill={COLORS.brandAccentSoft} stroke={COLORS.brandAccent} strokeWidth={1} />
          <text x={120} y={0} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">Opub-tier · publicatie-platform</text>
          <rect x={310} y={-12} width={14} height={14} rx={3} fill="white" stroke={COLORS.neutral400} strokeDasharray="3 2" strokeWidth={1} />
          <text x={330} y={0} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">Bron (extern)</text>
          <rect x={420} y={-12} width={28} height={14} rx={7} fill={COLORS.priceBg} stroke={COLORS.priceBorder} strokeWidth={1} />
          <text x={454} y={0} fontSize={11} fill={COLORS.neutral700} fontFamily="Inter, system-ui, sans-serif">Tarief</text>
        </g>
      </svg>
    </div>
  );
}
