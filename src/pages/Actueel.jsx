import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { actueelArticles, actueelFilters } from '../data/actueel'
import ActueelCard from '../components/cards/ActueelCard'
import { Newsletter } from '../components/form'

function Actueel() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredArticles = useMemo(() => {
    return actueelArticles.filter((article) => {
      const title = article.title?.nl ?? article.title
      const matchesSearch =
        !search.trim() ||
        title.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        activeFilter === 'all' || article.category === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  return (
    <>
      <div className="container-page pt-12 md:pt-16 pb-8 md:pb-10">
        <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
          <Link to="/" className="hover:text-primary transition-colors">
            {nl('actueel.breadcrumbHome')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{nl('nav.news')}</span>
        </nav>

        <header className="mb-8">
          <h1 className="type-h1 text-primary tracking-tight mb-4">
            {nl('actueel.title')}
          </h1>
          <p className="type-body-lg text-gray-600 max-w-3xl">
            {nl('actueel.subtitle')}
          </p>
        </header>

        <div className="mb-10">
          <div className="relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="search"
              placeholder={nl('actueel.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {actueelFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {nl(`actueel.filter.${filter.key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredArticles.map((article) => (
            <ActueelCard
              key={article.slug}
              slug={article.slug}
              title={article.title?.nl ?? article.title}
              date={article.date?.nl ?? article.date}
              featured={article.featured}
              image={article.image}
              placeholder={article.placeholder}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            {nl('actueel.noResults')}
          </p>
        )}
      </div>

      <Newsletter />
    </>
  )
}

export default Actueel
