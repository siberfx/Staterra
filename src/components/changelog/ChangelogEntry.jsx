import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function statusLabel(status) {
  if (status === 'api') return 'API'
  if (status === 'feature' || status === 'newFeature') return nl('changelog.tagNewFeature')
  if (status === 'improvement') return nl('changelog.tagImprovement')
  return status ?? ''
}

function statusStyle(status) {
  if (status === 'api') return 'bg-violet-50 text-violet-700'
  if (status === 'feature' || status === 'newFeature') return 'bg-emerald-50 text-emerald-700'
  if (status === 'improvement') return 'bg-blue-50 text-blue-700'
  return 'bg-gray-100 text-gray-700'
}

function ChangelogEntry({ entry }) {
  const title = typeof entry.title === 'object' ? entry.title?.nl ?? '' : (entry.title ?? '')
  const description = typeof entry.description === 'object' ? entry.description?.nl ?? '' : (entry.description ?? '')

  return (
    <article id={entry.slug ?? entry.id} className="py-10 border-t border-gray-100 first:border-t-0">
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12">
        <div className="flex flex-col gap-2">
          <time className="text-sm text-gray-500 font-medium">{formatDate(entry.date)}</time>
          {entry.status && (
            <span className={`inline-flex w-fit px-2.5 py-1 text-xs font-medium rounded-full ${statusStyle(entry.status)}`}>
              {statusLabel(entry.status)}
            </span>
          )}
        </div>
        <div>
          <Link to={`${R.changelog}/${entry.slug}`} className="group">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-primary transition-colors">
              {title}
            </h2>
          </Link>
          {description && (
            <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
          )}

          {entry.features?.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {entry.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-emerald-500 text-base mt-0.5 shrink-0">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {entry.steps?.length > 0 && (
            <div className="mt-3 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Migratiestappen</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800">
                {entry.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          {entry.video_url && (
            <a
              href={entry.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-base">play_circle</span>
              Bekijk video
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ChangelogEntry
export { formatDate }
