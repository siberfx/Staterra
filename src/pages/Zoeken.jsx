import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { SearchHero } from '../components/hero'
import { search } from '../services/searchService'

const TYPE_LABELS = {
  blog: 'zoeken.sectionBlog',
  changelog: 'Changelog',
  course_category: 'zoeken.sectionAcademy',
  course_video: 'zoeken.sectionAcademy',
  pages: 'Pagina\'s',
  solutions: 'zoeken.sectionSolutions',
  docs: 'Documentatie',
}

function getTypeLabel(type) {
  return TYPE_LABELS[type] ?? type
}

function Zoeken() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const qFromUrl = searchParams.get('q') ?? ''
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const [results, setResults] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const q = qFromUrl.trim()
    if (!q) {
      setResults([])
      setMeta(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    search({ q, type: 'all', per_page: 15, page: pageFromUrl })
      .then((res) => {
        if (cancelled) return
        setResults(res.data ?? [])
        setMeta(res.meta ?? null)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message ?? 'Zoeken mislukt')
        setResults([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [qFromUrl, pageFromUrl])

  const totalCount = meta?.total ?? 0
  const currentPage = meta?.current_page ?? 1
  const lastPage = meta?.last_page ?? 1

  const handleSearch = (q) => {
    if (q) {
      navigate(`${R.zoeken}?q=${encodeURIComponent(q)}`)
    }
  }

  const goToPage = (p) => {
    const q = qFromUrl.trim()
    if (!q) return
    const params = new URLSearchParams({ q })
    if (p > 1) params.set('page', String(p))
    navigate(`${R.zoeken}?${params}`)
  }

  return (
    <>
      <SearchHero
        title={nl('zoeken.title')}
        subtitle={nl('zoeken.subtitle')}
        breadcrumbs={[{ label: nl('zoeken.title') }]}
        search={qFromUrl}
        onSearch={handleSearch}
        searchPlaceholder={nl('zoeken.placeholder')}
        searchButtonLabel="Zoeken"
        scrollTargetId="zoeken-content"
        stats={totalCount > 0 ? [{ icon: 'search', label: `${totalCount} ${nl('zoeken.resultsFound')}` }] : null}
      />

      <div id="zoeken-content" className="container-page py-12 md:py-16 pb-8 md:pb-10">
        {qFromUrl.trim() ? (
        loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500">
            <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
            <span>Zoeken...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 py-16">{error}</p>
        ) : totalCount > 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 mb-6">
              {totalCount} {nl('zoeken.resultsFound')}
            </p>

            <ul className="space-y-2">
              {results.map((item) => (
                <li key={`${item.type}-${item.slug}`}>
                  <Link
                    to={item.url || '#'}
                    className="flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary shrink-0 mt-0.5">arrow_forward</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {typeof getTypeLabel(item.type) === 'string' && getTypeLabel(item.type).startsWith('zoeken.')
                          ? nl(getTypeLabel(item.type))
                          : getTypeLabel(item.type)}
                      </span>
                      <span className="block font-semibold text-gray-900 group-hover:text-primary mt-0.5 transition-colors">
                        {item.title}
                      </span>
                      {item.excerpt && (
                        <span className="block text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.excerpt}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {lastPage > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                  Vorige
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-600">
                  Pagina {currentPage} van {lastPage}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= lastPage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Volgende
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-16">{nl('zoeken.noResults')}</p>
        )
      ) : (
        <p className="text-gray-500">{nl('zoeken.enterQuery')}</p>
      )}
      </div>
    </>
  )
}

export default Zoeken
