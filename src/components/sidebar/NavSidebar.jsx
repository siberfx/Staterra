import { Link } from 'react-router-dom'

function NavSidebar({ title, items = [], currentPath, className = '' }) {
  if (!items?.length) return null

  return (
    <aside className={`lg:w-64 flex-shrink-0 ${className}`}>
      <div className="space-y-8 sticky top-28">
        {title && (
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {title}
          </h3>
        )}
        <nav className="space-y-0.5">
          {items.map((item) => {
            const isActive = item.isActive ?? (currentPath === item.to)
            const IconEl = item.iconComponent
            return (
              <Link
                key={item.to ?? item.label}
                to={item.to ?? '#'}
                onClick={item.onClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon && <span className="material-symbols-outlined text-lg">{item.icon}</span>}
                {IconEl}
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default NavSidebar
