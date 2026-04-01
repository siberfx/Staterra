import { FaIcon } from '../Icons/FaIcon'

const DEFAULT_ICONS = ['description', 'code', 'check_circle', 'public', 'web', 'folder']

function FeatureGrid({ title, subtitle, items = [], columns = 3, className = '' }) {
  const normalized = Array.isArray(items)
    ? items
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .slice(0, 6)
        .map((f) => ({
          title: f.title ?? '',
          description: f.description ?? f.desc ?? '',
          icon: f.icon ?? DEFAULT_ICONS[0],
        }))
        .filter((f) => f.title)
    : []

  if (normalized.length === 0) return null

  const colClass = columns === 2
    ? 'grid md:grid-cols-2 gap-12'
    : 'grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12'

  return (
    <section className={`py-20 md:py-24 bg-white ${className}`}>
      <div className="container-page">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-2xl md:text-5xl font-small text-gray-900 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">{subtitle}</p>
            )}
          </div>
        )}
        <div className={colClass}>
          {normalized.map((f, i) => {
            const icon = f.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
            return (
              <div
                key={i}
                className="group block bg-white h-full border border-gray-100 border-l-4 border-l-primary hover:border-l-secondary hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 p-10 md:p-12 min-h-[200px]"
              >
                <div className="w-14 h-14 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <FaIcon icon={icon} className="text-primary group-hover:text-white text-xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                  {f.title}
                </h3>
                <p className="text-gray-600 mt-3 text-base">{f.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid
