import { Link, useLocation } from 'react-router-dom'

function TreeNav({ sections, expanded, onToggle }) {
  const { pathname } = useLocation()

  return (
    <aside className="w-56 xl:w-64 flex-shrink-0">
      <nav className="sticky top-28 space-y-1">
        {sections.map((section) => {
          const isExpanded = expanded.has(section.id)
          const hasActive = section.children?.some((c) => c.url && pathname === c.url)
          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => onToggle(section.id)}
                className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                  hasActive ? 'text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {section.label}
                <span className={`material-symbols-outlined text-lg text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-200 ease-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-3 ml-2 border-l border-gray-200 space-y-0.5 py-1">
                  {section.children?.map((child) => (
                    child.url ? (
                      <Link
                        key={child.id}
                        to={child.url}
                        className={`block w-full text-left px-2 py-0.5 text-sm hover:bg-gray-50 transition-colors ${
                          pathname === child.url ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ) : (
                      <span key={child.id} className="block px-2 py-0.5 text-sm text-gray-400">
                        {child.label}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default TreeNav
