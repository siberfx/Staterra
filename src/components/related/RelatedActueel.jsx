import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { actueelArticles } from '../../data/actueel'

function RelatedActueel({ currentSlug, limit = 3 }) {
  const related = actueelArticles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit)

  if (related.length === 0) return null

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="type-h2 text-black mb-2">{nl('actueel.relatedTitle')}</h2>
          <div className="w-12 h-1 bg-gray-200 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {related.map((item) => (
            <Link
              key={item.slug}
              to={R.actueelDetail(item.slug)}
              className="group block bg-white h-full border border-gray-100 hover:shadow-soft transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {item.image ? (
                  <img
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: item.placeholder?.color ?? '#1e3a5f' }}
                  >
                    {item.placeholder?.icon && (
                      <span className="material-symbols-outlined text-6xl text-white opacity-80">
                        {item.placeholder.icon}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="text-xs font-medium text-gray-400 mb-3">{item.date?.nl ?? item.date}</div>
                <h3 className="type-h3 text-black group-hover:text-primary transition-colors">
                  {item.title?.nl ?? item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedActueel
