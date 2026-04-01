function AnchorNav({ title = 'Op deze pagina', items = [], activeId, onSelect }) {
  if (!items?.length) return null

  return (
    <aside className="hidden xl:block w-48 flex-shrink-0">
      <nav className="sticky top-28">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">list</span>
          {title}
        </h3>
        <ul className="space-y-2">
          {items.map((item) => {
            const id = item.id ?? item.slug
            const label = item.label ?? item.title
            const isActive = activeId === id

            if (onSelect) {
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`text-sm block w-full text-left truncate transition-colors hover:text-primary ${
                      isActive ? 'text-primary font-medium' : 'text-gray-600'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              )
            }

            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm text-gray-600 hover:text-primary transition-colors block truncate"
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default AnchorNav
