import { Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { useSite } from '../contexts/SiteContext'
import { getComponentForTemplate } from '../utils/templateMap'
import { resolveTemplate } from '../utils/routeTemplateConfig'

const DynamicPage = lazy(() => import('../pages/DynamicPage'))
const ErrorPage = lazy(() => import('../pages/ErrorPage'))

function normalize(p) {
  return p.length > 1 ? p.replace(/\/+$/, '') : p
}

const Skeleton = () => (
  <div className="container-page py-16">
    <div className="animate-pulse space-y-4 max-w-3xl">
      <div className="h-10 bg-gray-200 w-3/4 rounded" />
      <div className="h-5 bg-gray-200 w-full rounded" />
      <div className="h-5 bg-gray-200 w-5/6 rounded" />
    </div>
  </div>
)

function TemplateRouter() {
  const { pathname } = useLocation()
  const { templateMap, loading } = useSite()

  if (loading) return <Skeleton />

  const path = normalize(pathname)
  const pathKey = path.replace(/^\/+/, '')
  // Override: /pages/partners and /pages/ons-verhaal from API menu must render correct page, not DynamicPage
  const override = pathKey === 'pages/partners' ? 'partners-page' : pathKey === 'pages/ons-verhaal' ? 'ons-verhaal' : null
  const template = override ?? templateMap[path] ?? resolveTemplate(pathKey)
  const Component = template ? getComponentForTemplate(template) : null

  if (Component) {
    return (
      <Suspense fallback={<Skeleton />}>
        <Component />
      </Suspense>
    )
  }

  const slug = path.replace(/^\/+/, '')
  if (slug) {
    return (
      <Suspense fallback={<Skeleton />}>
        <DynamicPage slug={slug} />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <ErrorPage status={404} />
    </Suspense>
  )
}

export default TemplateRouter
