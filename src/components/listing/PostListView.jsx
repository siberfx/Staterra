import { useState, useEffect, useCallback } from 'react'
import { nl } from '../../translations'
import { getBlogList } from '../../services/blogService'
import TeaserCard from '../cards/TeaserCard'
import SearchHero from '../hero/SearchHero'

const PER_PAGE = 50

function matchesBlogType(article, blogTypeName) {
  if (!blogTypeName) return true
  const name = article.blog_type?.name ?? null
  return name != null && name.toLowerCase() === blogTypeName.toLowerCase()
}

function mapToCard(article, options = {}) {
  const title = typeof article.title === 'object' ? article.title?.nl ?? article.title ?? '' : (article.title ?? '')
  const date = typeof article.date === 'object' ? article.date?.nl ?? article.date ?? '' : (article.date ?? '')
  const category = typeof article.category === 'object' ? article.category?.name ?? article.category : (article.category ?? null)
  return {
    slug: article.slug,
    title,
    date,
    short_body: article.short_body ?? null,
    category,
    category_slug: article.category_slug ?? article.category?.slug ?? null,
    author_name: article.author_name ?? article.author?.name ?? null,
    author_avatar: article.author_avatar ?? article.author?.avatar ?? null,
    featured: article.featured ?? options.featured ?? false,
    image: article.image ?? null,
    placeholder: article.placeholder ?? null,
  }
}

/**
 * @param {{ blogTypeName?: string, postRoute: (slug: string) => string, heroTitle: string, heroSubtitle: string, heroBreadcrumb: string, heroSearchPlaceholder: string }} props
 */
function PostListView({ blogTypeName, postRoute, heroTitle, heroSubtitle, heroBreadcrumb, heroSearchPlaceholder }) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(id)
  }, [search])

  const fetchArticles = useCallback(
    async (pageNum = 1, append = false) => {
      if (!append) setLoading(true)
      setError(null)
      try {
        const params = {
          page: pageNum,
          per_page: PER_PAGE,
          ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
          ...(category && { category }),
        }
        const { data, hasMore: more } = await getBlogList(params)
        const filtered = blogTypeName ? data.filter((a) => matchesBlogType(a, blogTypeName)) : data
        const mapped = filtered.map((a, i) => mapToCard(a, { featured: !append && i === 0 }))
        setArticles((prev) => (append ? [...prev, ...mapped] : mapped))
        setHasMore(more)
        if (pageNum === 1 && !category) {
          const cats = [...new Map(filtered.map((a) => {
            const slug = a.category_slug ?? (typeof a.category === 'object' ? a.category?.slug : null)
            const name = typeof a.category === 'object' ? a.category?.name : (a.category ?? null)
            return [slug, name]
          })).entries()]
            .filter(([slug]) => slug)
            .map(([slug, name]) => ({ slug, name }))
          setCategories(cats)
        }
      } catch (err) {
        setError(err)
        if (pageNum === 1) setArticles([])
      } finally {
        setLoading(false)
      }
    },
    [debouncedSearch, category, blogTypeName]
  )

  useEffect(() => {
    setPage(1)
    fetchArticles(1, false)
  }, [fetchArticles])

  const handleCategoryChange = (slug) => {
    setCategory((prev) => (prev === slug ? '' : slug))
  }

  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    fetchArticles(next, true)
  }

  return (
    <>
      <SearchHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={[{ label: heroBreadcrumb }]}
        search={search}
        onSearch={setSearch}
        searchPlaceholder={heroSearchPlaceholder}
        scrollTargetId="blog-content"
      />

      <div id="blog-content" className="container-page py-12 md:py-16 pb-8 md:pb-10">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                !category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {nl('blog.filter.all')}
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => handleCategoryChange(c.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  category === c.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div className="min-h-[60vh]">
          {loading && articles.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200 rounded-none mb-4" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="h-6 bg-gray-200 w-3/4 mb-1" />
                  <div className="h-4 bg-gray-200 w-full" />
                  <div className="h-4 bg-gray-200 w-5/6 mt-1" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {articles.map((article) => (
                  <TeaserCard
                    key={article.slug}
                    to={postRoute(article.slug)}
                    title={article.title}
                    date={article.date}
                    shortBody={article.short_body}
                    category={article.category}
                    author={{ name: article.author_name, avatar: article.author_avatar }}
                    featured={article.featured}
                    image={article.image}
                    placeholder={article.placeholder}
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
                    {nl(loading ? 'blog.loading' : 'blog.loadMore')}
                  </button>
                </div>
              )}

              {articles.length === 0 && (
                <p className="text-center text-gray-500 py-16">
                  {nl('blog.noResults')}
                </p>
              )}
            </>
          )}
        </div>

        {error && (
          <p className="text-center text-amber-600 text-sm py-4">
            {error.message}
          </p>
        )}
      </div>
    </>
  )
}

export default PostListView
