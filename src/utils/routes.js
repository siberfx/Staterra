/**
 * Centralized route paths — single source of truth.
 * API URLs (/api/...) are converted to clean frontend URLs via toFrontendUrl.
 */
export function toFrontendUrl(apiUrl) {
  if (!apiUrl || typeof apiUrl !== 'string') return null
  const u = apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`
  return u
    .replace(/^\/api\/course\//, '/academy/')
    .replace(/^\/api\/solutions\//, '/solutions/')
    .replace(/^\/api\/pages\/partners\/?$/, '/partners')
    .replace(/^\/api\/tech-stack\/?$/, '/tech-stack')
    .replace(/^\/api\/pages\/ons-verhaal\/?$/, '/ons-verhaal')
    .replace(/^\/api\/pages\/ondersteuning\/?$/, '/support')
    .replace(/^\/api\/pages\//, '/')
    .replace(/^\/api\//, '/')
    .replace(/^\/pages\//, '/')
}

export const R = {
  home: '/',
  solutions: '/solutions',
  solution: (slug) => `/solutions/${slug}`,
  academy: '/academy',
  academyCategories: '/academy/categories',
  academyCategory: (slug) => `/academy/category/${slug}`,
  academyVideo: (slug) => `/academy/video/${slug}`,
  academyLiveSessions: '/academy/live-sessions',
  academyLiveSession: (slug) => `/academy/live-sessions/${slug}`,
  liveSessions: '/live-sessions',
  recordings: '/academy/live-sessions/recordings',
  blog: '/blog',
  blogPost: (slug) => `/blog/${slug}`,
  nieuws: '/nieuws',
  nieuwsPost: (slug) => `/nieuws/${slug}`,
  succesverhalen: '/succesverhalen',
  succesverhalenPost: (slug) => `/succesverhalen/${slug}`,
  changelog: '/changelog',
  aankondigingen: '/changelog/aankondigingen',
  changelogAnnouncement: (id) => `/changelog/aankondigingen/${id}`,
  vacancies: '/vacancies',
  vacancy: (slug) => `/vacancies/${slug}`,
  contact: '/contact',
  faq: '/faq',
  helpCenter: '/help',
  support: '/support',
  demo: '/proefversie',
  page: (slug) => `/${slug}`,
  kennisbank: '/kennisbank',
  kennisbankArticle: (slug) => `/kennisbank/${slug}`,
  actueel: '/actueel',
  actueelDetail: (slug) => `/actueel/${slug}`,
  zoeken: '/zoeken',
  docs: '/docs',
  docsPage: (section, page) => `/docs/${section}/${page}`,
  techStack: '/tech-stack',
  programmaVanEisen: '/programma-van-eisen',
  roadmap: '/changelog/roadmap',
  featureRequests: '/changelog/feature-requests',
  featureRequest: (id) => `/changelog/feature-requests/${id}`,

  /** Statische marketingpagina’s (StaticHeader + eigen inhoud) */
  oplossingen: '/oplossingen',
  aanpak: '/aanpak',
  overOns: '/over-ons',
  overOnsSamenOntwikkelen: '/over-ons/samen-ontwikkelen',
  overOnsWooOplossing: '/over-ons/woo-oplossing',
  overOnsOpenSource: '/over-ons/open-source',

  /** Juridisch / statische pagina’s (TemplateRouter of CMS) */
  privacy: '/privacy',
  voorwaarden: '/gebruiksvoorwaarden',
  cookies: '/cookies',
}
