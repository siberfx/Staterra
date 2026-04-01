import { Link } from 'react-router-dom'

function ListNav({ title, items = [], overviewItem, loading, selected, onSelect, className = '' }) {
  return (
    <aside className={`lg:w-56 xl:w-64 flex-shrink-0 ${className}`}>
      <div className="sticky top-28">
        {title && (
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            {title}
          </h3>
        )}
        <nav className="space-y-0.5">
          {overviewItem && (
            <Link
              to={overviewItem.to}
              onClick={() => onSelect?.(null)}
              className={`block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                overviewItem.isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {overviewItem.label}
            </Link>
          )}
          {loading ? (
            <div className="space-y-1 animate-pulse">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="px-3 py-2.5 flex items-center justify-between gap-2">
                  <div className="h-4 bg-gray-200 rounded" style={{ width: `${60 + i * 8}%` }} />
                  <div className="h-3 w-5 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            items.map((item, index) => {
              const isActive = item.isActive ?? (selected?.slug === item.slug)
              return (
                <Link
                  key={item.slug ?? item.to ?? index}
                  to={item.to ?? '#'}
                  onClick={item.onClick ? () => item.onClick() : (onSelect ? () => onSelect(item) : undefined)}
                  className={`block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="truncate">
                    {item.index != null && (
                      <span className="text-gray-400 text-xs font-mono mr-2">
                        {String(item.index).padStart(2, '0')}
                      </span>
                    )}
                    {item.label ?? item.title}
                  </span>
                  {item.badge != null && (
                    <span className="text-xs text-gray-400 shrink-0">{item.badge}</span>
                  )}
                </Link>
              )
            })
          )}
        </nav>
      </div>
    </aside>
  )
}

export default ListNav
