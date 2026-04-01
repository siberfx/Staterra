export const FEATURE_REQUESTS = [
  {
    id: 62,
    title: 'Verbeterde kleurtoegankelijkheid',
    description: 'Mogelijkheid om meer kleuren toe te voegen en aan te passen, inclusief een kleurenpicker voor organisatie-specifieke huisstijl.',
    author: 'Team OPMS',
    date: '20 feb 2026',
    tags: ['Verbetering', 'Styling'],
    status: 'backlog',
    statusLabel: 'Backlog',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    votes: 9,
    comments: 3,
  },
  {
    id: 23,
    title: 'Zapier integratie',
    description: 'Koppeling met Zapier voor automatische workflows naar honderden externe applicaties zonder technische kennis.',
    author: 'Team OPMS',
    date: '18 feb 2026',
    tags: ['Verbetering', 'Integraties'],
    status: 'planned',
    statusLabel: 'Gepland',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    votes: 74,
    comments: 12,
  },
  {
    id: 22,
    title: 'Helpcentrum artikelen',
    description: 'Uitgebreide kennisbank met handleidingen, FAQ en stapsgewijze instructies voor alle platformfuncties.',
    author: 'Team OPMS',
    date: '15 feb 2026',
    tags: ['Verbetering', 'Welkom'],
    status: 'consideration',
    statusLabel: 'In overweging',
    statusColor: 'bg-orange-50 text-orange-700 border-orange-200',
    votes: 48,
    comments: 5,
  },
  {
    id: 11,
    title: 'Verbeterde zoekfunctie',
    description: 'Full-text search over alle documenten, verzoeken en archiefstukken met filters op metadata en datum.',
    author: 'Team OPMS',
    date: '12 feb 2026',
    tags: ['Verbetering', 'UX'],
    status: 'consideration',
    statusLabel: 'In overweging',
    statusColor: 'bg-orange-50 text-orange-700 border-orange-200',
    votes: 44,
    comments: 8,
  },
  {
    id: 31,
    title: 'GWV bulkaanlevering',
    description: 'Mogelijkheid om grote hoeveelheden documenten in één keer aan te leveren bij de landelijke voorziening.',
    author: 'Team OPMS',
    date: '10 feb 2026',
    tags: ['Functie', 'GWV'],
    status: 'shipped',
    statusLabel: 'Geleverd',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    votes: 52,
    comments: 15,
  },
  {
    id: 8,
    title: 'Lineaire integratie',
    description: 'Directe koppeling met Linear voor issue tracking en projectmanagement vanuit het OPMS-platform.',
    author: 'Team OPMS',
    date: '8 feb 2026',
    tags: ['Integraties'],
    status: 'backlog',
    statusLabel: 'Backlog',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    votes: 28,
    comments: 4,
  },
]

export const STATUSES = [
  { key: 'all', label: 'Alles', color: null },
  { key: 'backlog', label: 'Backlog', color: 'bg-amber-400' },
  { key: 'consideration', label: 'In overweging', color: 'bg-orange-400' },
  { key: 'planned', label: 'Gepland', color: 'bg-blue-400' },
  { key: 'shipped', label: 'Geleverd', color: 'bg-emerald-400' },
]

export const SORT_OPTIONS = [
  { key: 'trending', label: 'Trending' },
  { key: 'votes', label: 'Meeste stemmen' },
  { key: 'newest', label: 'Nieuwste' },
]

export function getFeatureRequestById(id) {
  const numId = Number(id)
  return FEATURE_REQUESTS.find((f) => f.id === numId) ?? null
}
