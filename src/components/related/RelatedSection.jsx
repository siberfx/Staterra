import { Link } from 'react-router-dom'

function RelatedSection({ title, items = [], renderCard, className = '' }) {
  if (!items?.length) return null

  return (
    <section className={`py-20 bg-gray-50 border-t border-gray-100 ${className}`}>
      <div className="container-page">
        {title && (
          <div className="text-center mb-12">
            <h2 className="type-h2 text-black mb-2">{title}</h2>
            <div className="w-12 h-1 bg-gray-200 mx-auto mt-4" />
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            if (renderCard) return renderCard(item, i)

            const slug = item.slug ?? item.id
            const itemTitle = typeof item.title === 'object' ? item.title?.nl ?? '' : (item.title ?? '')
            const date = typeof item.date === 'object' ? item.date?.nl ?? '' : (item.date ?? '')

            return (
              <Link
                key={slug ?? i}
                to={item.to ?? '#'}
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
                  {item.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-black rounded-sm shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    {item.author?.avatar && (
                      <img src={item.author.avatar} alt="" className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                    )}
                    {item.category && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{item.category}</span>
                    )}
                    {date && <span>{date}</span>}
                  </div>
                  <h3 className="type-h3 text-black group-hover:text-primary transition-colors mb-2">
                    {itemTitle}
                  </h3>
                  {item.short_body && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.short_body}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RelatedSection
