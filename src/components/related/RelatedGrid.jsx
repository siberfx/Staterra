import { Link } from 'react-router-dom'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

const DEFAULT_ICONS = ['description', 'public', 'web', 'folder', 'code', 'check_circle']

function RelatedGrid({ solutions = [], currentAnchor }) {
  const related = (solutions ?? [])
    .filter((s) => (s.anchor ?? s.slug) !== currentAnchor)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="py-20 md:py-24 bg-white border-t border-gray-100">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="type-h2 text-gray-900 mb-2">
            Andere oplossingen
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {related.map((solution, i) => {
            const slug = solution.anchor ?? solution.slug
            const title = solution.nav_title ?? solution.title ?? ''
            const desc = solution.short_body ?? solution.subtitle ?? solution.desc ?? ''
            const icon = solution.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
            return (
              <Link
                key={slug ?? solution.id}
                to={R.solution(slug)}
                className="group block bg-white h-full border border-gray-100 border-l-4 border-l-primary hover:border-l-secondary hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 p-10 md:p-12 min-h-[200px]"
              >
                <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <FaIcon icon={icon} className="text-primary group-hover:text-white text-xl" />
                </div>
                <h3 className="type-h3 text-gray-900 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="type-body text-gray-600 mt-3 line-clamp-3">
                  {desc}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RelatedGrid
