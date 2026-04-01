import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

function HorizontalCard({ training }) {
  return (
    <Link
      to={`${R.academy}/${training.slug}`}
      className="group flex flex-col sm:flex-row gap-5 sm:gap-6 p-6 bg-white rounded-none border border-gray-100 border-l-4 border-l-primary hover:border-l-secondary hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="sm:w-52 flex-shrink-0 aspect-video sm:aspect-square overflow-hidden rounded-none bg-gray-50">
        {training.image ? (
          <img
            src={training.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: training.placeholder?.color ?? '#1e3a5f' }}
          >
            <FaIcon icon={training.placeholder?.icon} className="text-white text-5xl opacity-90" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-primary/90 mb-2 leading-snug">
          {training.title?.nl ?? training.title}
        </h3>
        <span className="inline-flex w-fit text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-none mb-3">
          {training.subtitle?.nl ?? training.subtitle}
        </span>
        <div className="flex flex-wrap gap-5 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <FaIcon icon="schedule" className="text-base text-gray-400" />
            {training.duration?.nl ?? training.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <FaIcon icon="calendar_today" className="text-base text-gray-400" />
            {training.date?.nl ?? training.date}
          </span>
          <span className="flex items-center gap-1.5">
            <FaIcon icon="language" className="text-base text-gray-400" />
            Nederlands
          </span>
        </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-center">
        <span className="flex items-center justify-center w-10 h-10 rounded-none bg-gray-100 group-hover:bg-primary group-hover:text-white text-gray-600 transition-colors">
          <FaIcon icon="arrow_forward" />
        </span>
      </div>
    </Link>
  )
}

export default HorizontalCard
