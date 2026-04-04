import { useState, useEffect, useCallback } from 'react'
import { nl } from '../translations'
import { getVacancies } from '../services/vacanciesService'
import { MetaCard } from '../components/cards'
import { SearchHero } from '../components/hero'

function WerkenBij() {
  const [vacancies, setVacancies] = useState([])
  const [filters, setFilters] = useState({ departments: [], locations: [], categories: [] })
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(id)
  }, [search])

  const fetchVacancies = useCallback(async (pageNum = 1, append = false) => {
    if (!append) setLoading(true)
    try {
      const params = {
        page: pageNum,
        per_page: 10,
        ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
        ...(filterDepartment && { department: filterDepartment }),
        ...(filterLocation && { location: filterLocation }),
        ...(filterCategory && { category: filterCategory }),
      }
      const { data, meta: m, filters: f } = await getVacancies(params)
      setVacancies((prev) => (append ? [...prev, ...data] : data))
      setMeta(m)
      if (!append) setFilters(f ?? { departments: [], locations: [], categories: [] })
      setHasMore((m?.current_page ?? 1) < (m?.last_page ?? 1))
    } catch {
      if (!append) setVacancies([])
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, filterDepartment, filterLocation, filterCategory])

  useEffect(() => {
    setPage(1)
    fetchVacancies(1, false)
  }, [fetchVacancies])

  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    fetchVacancies(next, true)
  }

  return (
    <>
      <SearchHero
        title={nl('werkenBij.title')}
        subtitle={nl('werkenBij.subtitle')}
        breadcrumbs={[{ label: nl('nav.werkenBij') }]}
        search={search}
        onSearch={setSearch}
        searchPlaceholder={nl('vacancies.searchPlaceholder')}
        scrollTargetId="werkenbij-content"
      />

      <section id="werkenbij-content" className="container-page py-12 md:py-16 pb-24">
        <div className="rich-text max-w-3xl mb-10">
          <p className="text-gray-700">{nl('werkenBij.content')}</p>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-3 mb-6">
            {filters.departments?.length > 0 && (
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              >
                <option value="">{nl('vacancies.filterDepartment')}: {nl('vacancies.filterAll')}</option>
                {filters.departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}
            {filters.locations?.length > 0 && (
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              >
                <option value="">{nl('vacancies.filterLocation')}: {nl('vacancies.filterAll')}</option>
                {filters.locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            )}
            {filters.categories?.length > 0 && (
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              >
                <option value="">{nl('vacancies.filterCategory')}: {nl('vacancies.filterAll')}</option>
                {filters.categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {loading && vacancies.length === 0 ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse p-6 border border-gray-100 rounded-lg">
                <div className="h-5 bg-gray-200 w-2/3 mb-3" />
                <div className="h-4 bg-gray-200 w-1/2" />
              </div>
            ))}
          </div>
        ) : vacancies.length > 0 ? (
          <>
            <div className="space-y-4">
              {vacancies.map((v) => (
                <MetaCard
                  key={v.id}
                  slug={v.slug}
                  title={v.title}
                  location={v.location}
                  type={v.type}
                  department={v.department}
                  category={v.category}
                  closingDate={v.closing_date}
                />
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? nl('vacancies.loading') : nl('vacancies.loadMore')}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 py-12">{nl('vacancies.noVacancies')}</p>
        )}
      </section>
    </>
  )
}

export default WerkenBij
