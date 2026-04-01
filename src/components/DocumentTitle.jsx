import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSettings } from '../contexts/SiteContext'
import { nl } from '../translations'
import { R } from '../utils/routes'

const ROUTE_TITLES = {
  '/': null,
  [R.solutions]: 'nav.solutions',
  [R.kennisbank]: 'nav.kennisbank',
  [R.changelog]: 'changelog.title',
  [R.actueel]: 'nav.nieuws',
  [R.academy]: 'nav.academy',
  [R.contact]: 'nav.contact',
  [R.demo]: 'nav.demoAanvragen',
  [R.page('ons-verhaal')]: 'nav.onsVerhaal',
  [R.page('partners')]: 'nav.partners',
  [R.techStack]: 'techStack.breadcrumb',
  [R.vacancies]: 'nav.werkenBij',
  [R.page('zo-doen-zij-het')]: 'nav.zoDoenZijHet',
  [R.zoeken]: 'zoeken.title',
  '/search': 'zoeken.title',
  [R.blog]: 'nav.blog',
  [R.nieuws]: 'nav.nieuws',
  [R.roadmap]: 'changelog.sidebarRoadmap',
  [R.featureRequests]: 'changelog.sidebarFeatureRequests',
  [R.succesverhalen]: 'succesverhalenPage.title',
  [R.page('ondersteuning')]: 'nav.ondersteuning',
  [R.programmaVanEisen]: 'footer.programmaVanEisen',
}

const STATIC_PAGE_TITLES = {
  [R.oplossingen]: 'Oplossingen',
  [R.aanpak]: 'Aanpak',
  [R.overOnsSamenOntwikkelen]: 'Samen ontwikkelen',
  [R.overOnsWooOplossing]: 'Woo-oplossing',
  [R.overOnsOpenSource]: 'Open source',
}

const ROUTE_PREFIXES = [
  { prefix: `${R.solutions}/`, key: 'nav.solutions' },
  { prefix: `${R.kennisbank}/`, key: 'nav.kennisbank' },
  { prefix: `${R.actueel}/`, key: 'nav.nieuws' },
  { prefix: `${R.academy}/`, key: 'nav.academy' },
  { prefix: `${R.blog}/`, key: 'nav.blog' },
  { prefix: `${R.nieuws}/`, key: 'nav.nieuws' },
  { prefix: `${R.succesverhalen}/`, key: 'succesverhalenPage.title' },
  { prefix: `${R.vacancies}/`, key: 'nav.werkenBij' },
]

function DocumentTitle() {
  const { pathname } = useLocation()
  const { settings } = useSettings()
  const siteName = settings.site?.name || ''
  const defaultTitle = settings.seo?.meta_title || siteName

  useEffect(() => {
    const staticTitle = STATIC_PAGE_TITLES[pathname]
    if (staticTitle) {
      document.title = siteName ? `${staticTitle} | ${siteName}` : staticTitle
      return
    }

    let titleKey = ROUTE_TITLES[pathname]
    if (!titleKey) {
      const match = ROUTE_PREFIXES.find((r) => pathname.startsWith(r.prefix))
      titleKey = match ? match.key : null
    }

    document.title = titleKey ? `${nl(titleKey)} - ${siteName}` : defaultTitle
  }, [pathname, siteName, defaultTitle])

  return null
}

export default DocumentTitle
