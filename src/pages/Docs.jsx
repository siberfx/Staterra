import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { nl } from '../translations'
import { SearchHero } from '../components/hero'
import { TreeNav, AnchorNav } from '../components/sidebar'
import { DocumentView } from '../components/content'
import { getDocsList, getDocPage, searchDocs } from '../services/docsService'
import { R } from '../utils/routes'

function Docs() {
  const { section, page } = useParams()
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
  const [doc, setDoc] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [docLoading, setDocLoading] = useState(false)
  const [expanded, setExpanded] = useState(new Set())

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getDocsList()
      .then((res) => {
        if (cancelled) return
        const data = res?.data ?? []
        setSections(data.map((s) => ({
          id: s.slug,
          label: s.title,
          children: (s.pages ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)).map((p) => ({
            id: p.slug,
            label: p.title,
            url: p.url,
          })),
        })))
        setExpanded(new Set(data.map((s) => s.slug)))
        if (!section && !page && data.length > 0) {
          const first = data[0]
          const firstPage = (first.pages ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))[0]
          if (firstPage?.url) {
            const path = firstPage.url.startsWith('/') ? firstPage.url : `/${firstPage.url}`
            navigate(path, { replace: true })
          }
        }
      })
      .catch(() => {
        if (!cancelled) setSections([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [section, page, navigate])

  useEffect(() => {
    if (section && page) {
      setSearchQuery('')
      setSearchResults(null)
    }
  }, [section, page])

  useEffect(() => {
    if (!section || !page) {
      setDoc(null)
      return
    }
    let cancelled = false
    setDocLoading(true)
    getDocPage(section, page)
      .then((data) => {
        if (!cancelled) setDoc(data?.data ?? data)
      })
      .catch(() => {
        if (!cancelled) setDoc(null)
      })
      .finally(() => {
        if (!cancelled) setDocLoading(false)
      })
    return () => { cancelled = true }
  }, [section, page])

  useEffect(() => {
    const q = searchQuery.trim()
    if (q.length < 2) {
      setSearchResults(null)
      return
    }
    const id = setTimeout(() => {
      searchDocs(q).then(setSearchResults)
    }, 300)
    return () => clearTimeout(id)
  }, [searchQuery])

  const toggleSection = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const showSearch = searchQuery.trim().length >= 2
  const searchData = searchResults?.data ?? []

  return (
    <>
      <SearchHero
        title={nl('docs.heroTitle')}
        subtitle={nl('docs.heroSub')}
        breadcrumbs={[{ label: nl('docs.breadcrumb') }]}
        search={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder={nl('docs.searchPlaceholder')}
        searchButtonLabel={nl('docs.searchButton')}
        scrollTargetId="docs-content"
      />

      <div id="docs-content" className="container-page py-8 md:py-10 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {loading ? (
            <div className="w-56 h-64 bg-gray-100 animate-pulse" />
          ) : (
            <TreeNav
              sections={sections}
              expanded={expanded}
              onToggle={toggleSection}
            />
          )}

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {showSearch ? (
              <main className="flex-1 min-w-0 max-w-3xl">
                <h1 className="type-h1 text-primary tracking-tight mb-8">
                  Zoekresultaten
                </h1>
                {searchData.length > 0 ? (
                  <ul className="space-y-2">
                    {searchData.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={item.url?.startsWith('/') ? item.url : `/${item.url || ''}`}
                          className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                        >
                          <span className="text-xs font-medium text-gray-500 uppercase">{item.section}</span>
                          <span className="block font-semibold text-primary group-hover:underline">{item.title}</span>
                          {item.excerpt && (
                            <span className="block text-sm text-gray-500 mt-1 line-clamp-2">{item.excerpt}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Geen resultaten gevonden.</p>
                )}
              </main>
            ) : docLoading ? (
              <div className="flex-1 max-w-3xl">
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-gray-200 w-3/4" />
                  <div className="h-4 bg-gray-200 w-full" />
                  <div className="h-4 bg-gray-200 w-full" />
                  <div className="h-4 bg-gray-200 w-2/3" />
                </div>
              </div>
            ) : (
              <DocumentView
                title={doc?.title ?? doc?.meta_title}
                content={doc?.content ?? doc?.body ?? doc?.long_body}
              />
            )}
          </div>

          <AnchorNav items={[]} activeId={null} onSelect={() => {}} />
        </div>
      </div>
    </>
  )
}

export default Docs
