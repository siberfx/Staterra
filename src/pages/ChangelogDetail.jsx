import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { useSettings } from '../contexts/SiteContext'
import { getChangelogEntry } from '../services/changelogService'
import { ApiError } from '../services/api'
import { sanitizeHtml } from '../utils/sanitize'
import { VideoPlayer } from '../components/video'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ChangelogDetail() {
  const { slug } = useParams()
  const { settings } = useSettings()
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    getChangelogEntry(slug)
      .then((data) => { if (!cancelled) setEntry(data) })
      .catch((err) => {
        if (!cancelled && err instanceof ApiError && err.status === 404) setNotFound(true)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (entry?.title) {
      const siteName = settings.site?.name || 'OpenPublication'
      document.title = `${entry.title} - ${nl('changelog.title')} - ${siteName}`
    }
  }, [entry, settings.site?.name])

  if (loading) {
    return (
      <div className="container-page pt-12 md:pt-16 pb-24">
        <nav className="flex gap-2 mb-6 animate-pulse">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded" />
          <div className="h-3 w-10 bg-gray-200 rounded" />
          <div className="h-3 w-3 bg-gray-200 rounded" />
          <div className="h-3 w-36 bg-gray-200 rounded" />
        </nav>

        <article className="max-w-3xl animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-6 w-14 bg-gray-200 rounded-full" />
          </div>
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4" />
          <div className="space-y-3 mb-8">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="space-y-3 mb-8">
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-4/5" />
            <div className="h-5 bg-gray-200 rounded w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="mb-8">
            <div className="h-6 w-36 bg-gray-200 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
          <div className="mb-8 p-6 bg-amber-50/50 rounded-lg border border-amber-100">
            <div className="h-3 w-32 bg-amber-200/50 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-amber-200/50 rounded w-full" />
              <div className="h-4 bg-amber-200/50 rounded w-4/5" />
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200">
            <div className="h-5 w-28 bg-gray-200 rounded" />
          </div>
        </article>
      </div>
    )
  }

  if (notFound || !entry) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">Changelog-item niet gevonden.</p>
        <Link to={R.changelog} className="text-primary hover:underline mt-4 inline-block">
          ← Terug naar Changelog
        </Link>
      </div>
    )
  }

  const title = typeof entry.title === 'object' ? entry.title?.nl ?? '' : (entry.title ?? '')

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
        <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs inline-block">{title}</span>
      </nav>

      <article className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-gray-500 font-medium">{formatDate(entry.date)}</time>
          {entry.status && (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              entry.status === 'api' ? 'bg-violet-50 text-violet-700' :
              entry.status === 'feature' ? 'bg-emerald-50 text-emerald-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {entry.status === 'api' ? 'API' : entry.status}
            </span>
          )}
        </div>

        <h1 className="type-h1 text-black tracking-tight mb-4">
          {title}
        </h1>

        {entry.description && (
          <p className="type-body-lg text-gray-600 mb-8">
            {typeof entry.description === 'object' ? entry.description?.nl ?? '' : entry.description}
          </p>
        )}

        {entry.content && (
          <div className="rich-text max-w-none mb-8">
            {entry.content.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(entry.content) }} />
            ) : (
              <p>{entry.content}</p>
            )}
          </div>
        )}

        {entry.features?.length > 0 && (
          <section className="mb-8">
            <h2 className="type-h3 text-black mb-3">Wat is er nieuw</h2>
            <ul className="space-y-2">
              {entry.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-600">
                  <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5 shrink-0">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.steps?.length > 0 && (
          <section className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-lg">
            <h2 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3">Migratiestappen</h2>
            <ol className="list-decimal list-inside space-y-2 text-amber-800">
              {entry.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>
        )}

        {entry.video_url && (
          <section className="mb-8">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 max-w-3xl">
              <VideoPlayer source={entry.video_url} title={title} className="w-full h-full" />
            </div>
          </section>
        )}

        <div className="pt-8 border-t border-gray-200">
          <Link to={R.changelog} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Alle updates
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ChangelogDetail
