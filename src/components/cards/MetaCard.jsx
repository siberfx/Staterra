import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

function MetaCard({ slug, title, location, type, department, category, closingDate }) {
  return (
    <Link
      to={R.vacancy(slug)}
      className="block p-6 border border-gray-100 border-l-4 border-l-primary hover:border-l-secondary hover:border-gray-200 hover:bg-primary/5 transition-all group"
    >
      <h3 className="text-lg font-semibold text-primary group-hover:text-primary transition-colors mb-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
        {location && (
          <span className="flex items-center gap-1">
            <FaIcon icon="location_on" className="text-base" />
            {location}
          </span>
        )}
        {type && (
          <span className="flex items-center gap-1">
            <FaIcon icon="schedule" className="text-base" />
            {type}
          </span>
        )}
        {department && (
          <span className="flex items-center gap-1">
            <FaIcon icon="business" className="text-base" />
            {department}
          </span>
        )}
        {category && (
          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{category}</span>
        )}
      </div>
      {closingDate && (
        <p className="text-xs text-gray-400 mt-3">
          {nl('vacancies.closingDate')}: {closingDate}
        </p>
      )}
    </Link>
  )
}

export default MetaCard
