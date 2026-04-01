import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { PageHero } from '../components/hero'
import ChangelogSidebar from '../components/sidebar/ChangelogSidebar'
import { FEATURE_REQUESTS, STATUSES, SORT_OPTIONS } from '../data/featureRequests'

function FeatureRequestCard({ item, onVote }) {
  const [voted, setVoted] = useState(false)

  const handleVote = () => {
    setVoted(!voted)
    onVote?.(item.id, !voted)
  }

  return (
    <div className="flex gap-5 py-6 border-t border-gray-100 first:border-t-0">
      <button
        type="button"
        onClick={handleVote}
        className={`flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center border transition-all duration-200 ${
          voted
            ? 'bg-primary border-primary text-white'
            : 'bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined text-base leading-none">expand_less</span>
        <span className="text-sm font-bold leading-none">{item.votes + (voted ? 1 : 0)}</span>
      </button>

      <div className="flex-1 min-w-0">
        <Link
          to={R.featureRequest(item.id)}
          className="block group"
        >
          <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-600">{item.author}</span>
          <span>·</span>
          <span>{item.date}</span>
          {item.tags.map((tag) => (
            <span key={tag} className="text-gray-400">#{tag}</span>
          ))}
          <span className={`ml-auto px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${item.statusColor}`}>
            {item.statusLabel}
          </span>
          {item.comments > 0 && (
            <span className="flex items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
              {item.comments}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function FeatureRequests() {
  const { pathname } = useLocation()
  const [statusFilter, setStatusFilter] = useState('all')
  const [sort, setSort] = useState('trending')

  const filtered = statusFilter === 'all'
    ? FEATURE_REQUESTS
    : FEATURE_REQUESTS.filter((f) => f.status === statusFilter)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'votes') return b.votes - a.votes
    if (sort === 'newest') return b.id - a.id
    return b.votes - a.votes
  })

  return (
    <>
      <PageHero
        title="Feature Requests"
        subtitle="Ideeën en suggesties om het platform te verbeteren. Stem op de functies die u belangrijk vindt."
        breadcrumbs={[
          { label: nl('changelog.title'), to: R.changelog },
          { label: 'Feature Requests' },
        ]}
      />

      <div className="container-page pt-12 md:pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <ChangelogSidebar currentPath={pathname} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSort(opt.key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    sort === opt.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-44 flex-shrink-0">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status</h4>
              <div className="flex flex-wrap lg:flex-col gap-1">
                {STATUSES.map((s) => {
                  const count = s.key === 'all' ? FEATURE_REQUESTS.length : FEATURE_REQUESTS.filter((f) => f.status === s.key).length
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStatusFilter(s.key)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded transition-colors text-left w-full ${
                        statusFilter === s.key
                          ? 'bg-gray-100 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {s.color && <span className={`w-2 h-2 rounded-full ${s.color} flex-shrink-0`} />}
                      {s.label}
                      <span className="text-xs text-gray-400 ml-auto">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {sorted.length === 0 ? (
                <p className="text-center text-gray-500 py-16">Geen feature requests gevonden.</p>
              ) : (
                sorted.map((item) => (
                  <FeatureRequestCard key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default FeatureRequests
