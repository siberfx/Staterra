import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { nl } from '../../translations'

const DEFAULT_IMAGE = '/assets/hero-banner.jpg'
const DEBOUNCE_MS = 350

function SearchHero({
  title,
  subtitle,
  breadcrumbs,
  stats,
  image,
  search = '',
  onSearch,
  searchPlaceholder,
  searchButtonLabel,
  scrollTargetId,
}) {
  const [inputValue, setInputValue] = useState(search)
  const debounceRef = useRef(null)

  useEffect(() => {
    setInputValue(search)
  }, [search])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      if (inputValue.trim() !== search.trim()) {
        onSearch?.(inputValue.trim())
      }
    }, DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [inputValue, search, onSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      debounceRef.current = null
    }
    onSearch?.(inputValue.trim())
    if (scrollTargetId) {
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[340px] md:min-h-[400px] flex flex-col justify-center overflow-hidden">
      <img
        src={image ?? DEFAULT_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative container-page w-full pt-20 pb-12 md:pt-24 md:pb-14">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex text-xs font-medium text-white/80 mb-6 uppercase tracking-wide">
            <Link to="/" className="hover:text-white transition-colors">
              {nl('actueel.breadcrumbHome')}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center">
                <span className="mx-2">/</span>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg text-white/90 mb-6 max-w-2xl">{subtitle}</p>
        )}

        <form onSubmit={handleSubmit} className="flex max-w-2xl overflow-hidden rounded-none bg-white shadow-xl">
          <input
            type="text"
            role="search"
            placeholder={searchPlaceholder ?? ''}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 min-w-0 px-5 py-3.5 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-primary text-white font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            {searchButtonLabel ?? nl('academy.searchButton')}
          </button>
        </form>

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap gap-6 text-sm text-white/90 mt-6 min-h-[28px]">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                {stat.icon && <span className="material-symbols-outlined text-lg">{stat.icon}</span>}
                {stat.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchHero
