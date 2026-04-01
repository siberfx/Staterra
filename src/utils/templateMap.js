import { lazy } from 'react'

const Solutions = lazy(() => import('../pages/Solutions'))
const SolutionDetail = lazy(() => import('../pages/SolutionDetail'))
const Academy = lazy(() => import('../pages/Academy'))
const Blog = lazy(() => import('../pages/Blog'))
const BlogDetail = lazy(() => import('../pages/BlogDetail'))
const Nieuws = lazy(() => import('../pages/Nieuws'))
const NieuwsDetail = lazy(() => import('../pages/NieuwsDetail'))
const SuccesverhalenPage = lazy(() => import('../pages/Succesverhalen'))
const SuccesverhalenDetail = lazy(() => import('../pages/SuccesverhalenDetail'))
const Changelog = lazy(() => import('../pages/Changelog'))
const ChangelogDetail = lazy(() => import('../pages/ChangelogDetail'))
const Contact = lazy(() => import('../pages/Contact'))
const Demo = lazy(() => import('../pages/Demo'))
const WerkenBij = lazy(() => import('../pages/WerkenBij'))
const VacancyDetail = lazy(() => import('../pages/VacancyDetail'))
const DynamicPage = lazy(() => import('../pages/DynamicPage'))
const Zoeken = lazy(() => import('../pages/Zoeken'))
const Docs = lazy(() => import('../pages/Docs'))
const Partners = lazy(() => import('../pages/Partners'))
const TechStack = lazy(() => import('../pages/TechStack'))
const OnsVerhaal = lazy(() => import('../pages/OnsVerhaal'))

/**
 * Maps API template names to React page components.
 * Mirrors backend PHP route_template_config.php
 */
export const TEMPLATE_MAP = {
  'solutions-list': Solutions,
  'solution-detail': SolutionDetail,
  'academy': Academy,
  'live-sessions': Academy,
  'live-sessions-list': Academy,
  'live-sessions-recordings': Academy,
  'live-session-detail': Academy,
  'course-categories-list': Academy,
  'course-category-detail': Academy,
  'course-video-detail': Academy,
  'blog-list': Blog,
  'blog-detail': BlogDetail,
  'nieuws-list': Nieuws,
  'nieuws-detail': NieuwsDetail,
  'succesverhalen-list': SuccesverhalenPage,
  'succesverhalen-detail': SuccesverhalenDetail,
  'changelog': Changelog,
  'changelog-detail': ChangelogDetail,
  'contact': Contact,
  'trial': Demo,
  'vacancies-list': WerkenBij,
  'vacancy-detail': VacancyDetail,
  'pricing': DynamicPage,
  'pricing-plan': DynamicPage,
  'modules-list': DynamicPage,
  'module-detail': DynamicPage,
  'features-list': DynamicPage,
  'feature-detail': DynamicPage,
  'pages-list': DynamicPage,
  'docs-list': Docs,
  'partners-page': Partners,
  'tech-stack-list': TechStack,
  'ons-verhaal': OnsVerhaal,
  'doc-page': DynamicPage,
  'search-result': Zoeken,
  'search-suggestions': Zoeken,
  'static-page': DynamicPage,
  'legal-detail': DynamicPage,
  'page': DynamicPage,
}

export function getComponentForTemplate(template) {
  return TEMPLATE_MAP[template] ?? null
}
