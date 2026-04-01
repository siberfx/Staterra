import { Link } from 'react-router-dom'
import { FaIcon } from '../Icons/FaIcon'

function TeaserCard({ to, title, date, image, placeholder, shortBody, category, tags, author, featured, featuredText }) {
  const renderPlaceholder = () => {
    if (!placeholder) return null
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: placeholder.color ?? '#1e3a5f' }}
      >
        <div className="text-white text-center p-8">
          {placeholder.icon && (
            <span className="block w-16 h-16 mx-auto mb-2 opacity-80 flex items-center justify-center">
              <FaIcon icon={placeholder.icon} className="text-4xl" />
            </span>
          )}
          <span className="font-serif italic text-xl">{placeholder.label}</span>
        </div>
      </div>
    )
  }

  return (
    <Link to={to} className="group block">
      <div className="relative overflow-hidden rounded-none mb-4 aspect-[16/10]">
        {image ? (
          <img
            alt=""
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            src={image}
          />
        ) : (
          renderPlaceholder()
        )}
        {featured && (
          <span className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary rounded-sm shadow-sm flex items-center gap-1">
            <FaIcon icon="star" className="text-sm" />
            {featuredText ?? 'Uitgelicht'}
          </span>
        )}
        {tags?.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="bg-white text-xs font-semibold px-3 py-1 rounded-sm shadow-sm text-gray-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-2">
        {author?.avatar && (
          <img src={author.avatar} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
        )}
        {category && (
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{category}</span>
        )}
        {date && <time className="block text-xs text-gray-500">{date}</time>}
      </div>
      <h3 className="text-lg md:text-xl font-medium leading-snug text-primary group-hover:underline decoration-1 underline-offset-4 mb-1">
        {title}
      </h3>
      {shortBody && (
        <p className="text-sm text-gray-600 line-clamp-2">{shortBody}</p>
      )}
    </Link>
  )
}

export default TeaserCard
