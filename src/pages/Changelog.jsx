import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { nl } from '../translations'
import { getChangelogList } from '../services/changelogService'
import { PageHero } from '../components/hero'
import ChangelogSidebar from '../components/sidebar/ChangelogSidebar'
import { TimelineEntry, formatDate } from '../components/changelog'
import { AnchorNav } from '../components/sidebar'
import { TimelineSkeleton } from '../components/placeholder'

function Changelog() {
  const { pathname } = useLocation()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)

  const PER_PAGE = 10

  useEffect(() => {
    setLoading(true)
    getChangelogList({ per_page: PER_PAGE, page })
      .then(({ data, meta: m }) => {
        setEntries((prev) => (page === 1 ? data : [...prev, ...data]))
        setMeta(m)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [page])

  const hasMore = meta && meta.current_page < meta.last_page

  const anchorItems = entries.map((entry) => ({
    id: entry.slug ?? entry.id,
    label: formatDate(entry.date),
  }))

  return (
    <>
      <PageHero
        title={nl('changelog.title')}
        subtitle={nl('changelog.subtitle')}
        breadcrumbs={[{ label: nl('changelog.title') }]}
        stats={meta ? [{ icon: 'update', label: `${meta.total} updates` }] : null}
      />

      <div className="container-page pt-12 md:pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <ChangelogSidebar currentPath={pathname} />

          <div className="flex-1 min-w-0 min-h-[60vh]">
            {loading && page === 1 ? (
              <TimelineSkeleton />
            ) : error ? (
              <p className="text-amber-600">{error.message}</p>
            ) : (
              <>
                <div className="space-y-0">
                  {entries.map((entry) => (
                    <TimelineEntry key={entry.id ?? entry.slug} entry={entry} />
                  ))}
                  {entries.length === 0 && (
                    <p className="text-center text-gray-500 py-16">{nl('changelog.noEntries')}</p>
                  )}
                </div>
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      type="button"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={loading}
                      className="px-6 py-3 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                      {loading ? nl('changelog.loading') : nl('changelog.loadMore')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <AnchorNav items={anchorItems} />
        </div>
      </div>
    </>
  )
}

export default Changelog
