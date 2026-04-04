import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

export default function DetailHeader({ title, breadcrumbLabel, category, authorName, authorAvatar, date, backRoute, sectionLabel }) {
  return (
    <section className="pt-12 pb-8 bg-white">
      <div className="container-page">
        <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black transition-colors">
            {nl('actueel.breadcrumbHome')}
          </Link>
          <span className="mx-2">/</span>
          <Link to={backRoute ?? R.blog} className="hover:text-black transition-colors">
            {sectionLabel ?? nl('nav.blog')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs inline-block" title={breadcrumbLabel}>
            {breadcrumbLabel}
          </span>
        </nav>

        <h1 className="type-h1 text-black tracking-tight mb-6">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          {authorAvatar && (
            <img src={authorAvatar} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          )}
          {category && (
            <>
              <span className="px-2 py-0.5 bg-gray-100 rounded">{category}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
            </>
          )}
          {authorName && (
            <>
              <span className="font-medium text-black">
                Door {authorName}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
            </>
          )}
          <span>{date}</span>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            aria-label="Link kopiëren"
          >
            <span className="material-symbols-outlined text-base">link</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            aria-label="Delen"
          >
            <span className="material-symbols-outlined text-base">share</span>
          </button>
        </div>
      </div>
    </section>
  )
}
