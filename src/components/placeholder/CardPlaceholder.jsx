import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

function CardPlaceholder({ article }) {
  const hasImage = article.image || article.placeholder

  return (
    <div className="space-y-8">
      {hasImage && (
        <figure className="my-12 -mx-4 sm:mx-0">
          {article.image ? (
            <img
              src={article.image}
              alt=""
              className="w-full h-[280px] sm:h-[360px] object-cover rounded-none"
            />
          ) : (
            <div
              className="w-full h-[280px] sm:h-[360px] flex items-center justify-center"
              style={{ backgroundColor: article.placeholder?.color ?? '#1e3a5f' }}
            >
              {article.placeholder?.icon && (
                <span className="material-symbols-outlined text-white text-6xl opacity-80">
                  {article.placeholder.icon}
                </span>
              )}
              {article.placeholder?.label && !article.placeholder?.icon && (
                <span className="font-serif italic text-2xl text-white">
                  {article.placeholder.label}
                </span>
              )}
            </div>
          )}
        </figure>
      )}

      <p className="text-xl leading-relaxed text-gray-600 font-normal">
        {nl('blog.placeholderText')}
      </p>

      <div className="border-l-4 border-gray-200 pl-6 py-4 my-8">
        <p className="text-gray-500 text-sm">
          {nl('blog.placeholderContact')}{' '}
          <Link to={R.contact} className="text-black hover:underline">
            {nl('blog.placeholderLink')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CardPlaceholder
