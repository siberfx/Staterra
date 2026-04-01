import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'
import { resolveMediaUrl } from '../../utils/media'

const DEFAULT_ICONS = ['description', 'public', 'web', 'folder', 'code', 'check_circle']

function IconCard({ solution, index }) {
  const slug = solution?.anchor ?? solution?.slug
  const title = solution?.nav_title ?? solution?.title ?? ''
  const desc = solution?.short_body ?? solution?.subtitle ?? solution?.desc ?? ''
  const image = solution?.image ? resolveMediaUrl(solution.image) : null
  const icon = solution?.icon ?? DEFAULT_ICONS[(index ?? 1) % DEFAULT_ICONS.length]

  if (!slug) return null

  return (
    <Link
      to={R.solution(slug)}
      className="group relative block p-8 lg:p-10 bg-white border border-gray-100 border-l-4 border-l-primary hover:border-l-secondary hover:border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between mb-6">
        {image ? (
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
            <FaIcon icon={icon} className="text-primary group-hover:text-white text-2xl transition-colors" />
          </div>
        )}
        {index != null && (
          <span className="text-6xl font-bold text-gray-100 group-hover:text-primary/20 transition-colors">
            {String(index).padStart(2, '0')}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{desc}</p>
      <span className="text-sm font-semibold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
        {nl('solutions.learnMore')}
        <FaIcon icon="arrow_forward" className="text-base" />
      </span>
    </Link>
  )
}

export default IconCard
