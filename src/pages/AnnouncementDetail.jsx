import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { useSettings } from '../contexts/SiteContext'
import { getAnnouncementById } from '../data/announcements'
import { formatDate } from '../components/changelog/TimelineEntry'

function AnnouncementDetail() {
  const { id } = useParams()
  const { settings } = useSettings()
  const entry = getAnnouncementById(id)

  useEffect(() => {
    if (entry?.title) {
      const siteName = settings?.site?.name || 'OpenPublication'
      document.title = `${entry.title} - ${nl('changelog.sidebarAnnouncements')} - ${siteName}`
    }
  }, [entry, settings?.site?.name])

  if (!entry) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">Aankondiging niet gevonden.</p>
        <Link to={R.changelog} className="text-primary hover:underline mt-4 inline-block">
          ← Terug naar Changelog
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
        <Link to={R.changelog} state={{ view: 'announcements' }} className="hover:text-primary transition-colors">
          {nl('changelog.sidebarAnnouncements')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs inline-block">{entry.title}</span>
      </nav>

      <article className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-gray-500 font-medium">{formatDate(entry.date)}</time>
          <span className="inline-flex w-fit px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
            Aankondiging
          </span>
        </div>

        <h1 className="type-h1 text-black tracking-tight mb-6">
          {entry.title}
        </h1>

        <p className="type-body-lg text-gray-600 mb-8">
          {entry.description}
        </p>

        <div className="pt-8 border-t border-gray-200">
          <Link
            to={R.changelog}
            state={{ view: 'announcements' }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Alle aankondigingen
          </Link>
        </div>
      </article>
    </div>
  )
}

export default AnnouncementDetail
