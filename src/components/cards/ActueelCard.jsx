import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

function ActueelCard({ slug, title, date, featured, image, placeholder }) {
  const renderPlaceholder = () => {
    if (!placeholder) return null
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: placeholder.color ?? '#1e3a5f' }}
      >
        <div className="text-white text-center p-8">
          {placeholder.icon && (
            <span className="material-symbols-outlined block w-16 h-16 mx-auto mb-2 opacity-80">
              {placeholder.icon}
            </span>
          )}
          <span className="font-serif italic text-xl">{placeholder.label}</span>
        </div>
      </div>
    )
  }

  return (
    <Link to={R.actueelDetail(slug)} className="group block">
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
            <span className="material-symbols-outlined text-sm">star</span>
            {nl('actueel.featured')}
          </span>
        )}
      </div>
      <time className="block text-xs text-gray-500 mb-2">{date}</time>
      <h3 className="text-lg md:text-xl font-medium leading-snug text-primary group-hover:underline decoration-1 underline-offset-4">
        {title}
      </h3>
    </Link>
  )
}

export default ActueelCard
