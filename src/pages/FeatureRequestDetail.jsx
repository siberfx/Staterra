import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { useSettings } from '../contexts/SiteContext'
import { getFeatureRequestById } from '../data/featureRequests'

function FeatureRequestDetail() {
  const { id } = useParams()
  const { settings } = useSettings()
  const item = getFeatureRequestById(id)

  useEffect(() => {
    if (item?.title) {
      const siteName = settings?.site?.name || 'OpenPublication'
      document.title = `${item.title} - ${nl('changelog.sidebarFeatureRequests')} - ${siteName}`
    }
  }, [item, settings?.site?.name])

  if (!item) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">Feature request niet gevonden.</p>
        <Link to={R.featureRequests} className="text-primary hover:underline mt-4 inline-block">
          ← Terug naar Feature Requests
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page pt-12 md:pt-16 pb-24">
      <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary transition-colors">
          {nl('actueel.breadcrumbHome')}
        </Link>
        <span className="mx-2">/</span>
        <Link to={R.changelog} className="hover:text-primary transition-colors">
          {nl('changelog.title')}
        </Link>
        <span className="mx-2">/</span>
        <Link to={R.featureRequests} className="hover:text-primary transition-colors">
          {nl('changelog.sidebarFeatureRequests')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs inline-block">{item.title}</span>
      </nav>

      <article className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <time className="text-sm text-gray-500 font-medium">{item.date}</time>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${item.statusColor}`}>
            {item.statusLabel}
          </span>
          <span className="text-sm text-gray-500">{item.author}</span>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">expand_less</span>
              {item.votes} stemmen
            </span>
            {item.comments > 0 && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                {item.comments} reacties
              </span>
            )}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-6">
          {item.title}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          {item.description}
        </p>

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-8 border-t border-gray-200">
          <Link
            to={R.featureRequests}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Alle feature requests
          </Link>
        </div>
      </article>
    </div>
  )
}

export default FeatureRequestDetail
