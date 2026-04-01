/**
 * Path → template mapping (mirrors backend PHP config).
 * Uses frontend paths (no /api prefix).
 * Backend: api/contact → contact, api/blog → blog-list, etc.
 */

const EXACT = {
  contact: 'contact',
  blog: 'blog-list',
  nieuws: 'nieuws-list',
  succesverhalen: 'succesverhalen-list',
  prijzen: 'pricing',
  changelog: 'changelog',
  solutions: 'solutions-list',
  modules: 'modules-list',
  features: 'features-list',
  academy: 'academy',
  'live-sessions': 'live-sessions',
  vacancies: 'vacancies-list',
  proefversie: 'trial',
  zoeken: 'search-result',
  search: 'search-result',
  docs: 'docs-list',
  partners: 'partners-page',
  'pages/partners': 'partners-page',
  'tech-stack': 'tech-stack-list',
  'ons-verhaal': 'ons-verhaal',
  'pages/ons-verhaal': 'ons-verhaal',
  'academy/categories': 'course-categories-list',
  'academy/live-sessions': 'live-sessions-list',
  'academy/live-sessions/recordings': 'live-sessions-recordings',
}

const PREFIX = [
  ['blog/', 'blog-detail'],
  ['nieuws/', 'nieuws-detail'],
  ['succesverhalen/', 'succesverhalen-detail'],
  ['solutions/', 'solution-detail'],
  ['modules/', 'module-detail'],
  ['features/', 'feature-detail'],
  ['vacancies/', 'vacancy-detail'],
  ['academy/live-sessions/', 'live-session-detail'],
  ['academy/category/', 'course-category-detail'],
  ['academy/video/', 'course-video-detail'],
  ['changelog/', 'changelog-detail'],
  ['prijzen/', 'pricing-plan'],
  ['docs/', 'doc-page'],
  ['legal/', 'legal-detail'],
]

const DEFAULT = 'page'

/**
 * Resolves template for a frontend path (e.g. /contact, /blog, /solutions/woo-verzoeken).
 * @param {string} path - Path without leading slash (or with, will be normalized)
 * @returns {string} Template name
 */
export function resolveTemplate(path) {
  const p = (path || '').replace(/^\/+/, '').replace(/\/+$/, '') || '/'
  const key = p === '/' ? '' : p

  if (EXACT[key]) return EXACT[key]

  for (const [prefix, template] of PREFIX) {
    if (key.startsWith(prefix)) return template
  }

  return DEFAULT
}
