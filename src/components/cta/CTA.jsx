import { Link } from 'react-router-dom'
import { FaIcon } from '../Icons/FaIcon'

function CTA({ variant = 'centered', title, description, eyebrow, actions = [], image, imageAlt, className = '' }) {
  if (!title && actions.length === 0) return null

  if (variant === 'split') {
    return (
      <section className={`border-t border-gray-100 py-16 bg-white ${className}`}>
        <div className="container-page flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="type-h2 text-primary mb-2">{title}</h2>
            {description && <p className="type-body-lg text-gray-600">{description}</p>}
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            {actions.map((action, i) => {
              const isExternal = action.url?.startsWith('http')
              const btnClass = action.variant === 'outline'
                ? 'inline-flex items-center justify-center px-8 py-4 text-sm font-semibold border-2 border-primary text-gray-800 hover:bg-primary/10 transition-colors'
                : 'inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors'
              if (isExternal) {
                return (
                  <a key={i} href={action.url} target="_blank" rel="noopener noreferrer" className={btnClass}>
                    {action.text}
                    {action.icon && <FaIcon icon={action.icon} className="ml-2 text-base" />}
                  </a>
                )
              }
              return (
                <Link key={i} to={action.url ?? '/'} className={btnClass}>
                  {action.text}
                  {action.icon && <FaIcon icon={action.icon} className="ml-2 text-base" />}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'media') {
    return (
      <section className={`py-24 md:py-32 bg-white border-t border-gray-100 ${className}`}>
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              {eyebrow && <span className="text-xs font-semibold text-primary uppercase tracking-wider">{eyebrow}</span>}
              <h2 className="type-h2 text-gray-900 mt-2 mb-4">{title}</h2>
              {description && <p className="type-body-lg text-gray-600 mb-6">{description}</p>}
              <div className="flex flex-wrap gap-4">
                {actions.map((action, i) => {
                  const btnClass = action.variant === 'outline'
                    ? 'inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border-2 border-primary text-gray-800 hover:bg-primary/10 transition-colors'
                    : 'inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors'
                  return (
                    <Link key={i} to={action.url ?? '/'} className={btnClass}>
                      {action.text}
                      {action.icon && <FaIcon icon={action.icon} className="text-base" />}
                    </Link>
                  )
                })}
              </div>
            </div>
            {image && (
              <div className="overflow-hidden shadow-sm">
                <img alt={imageAlt ?? ''} className="w-full h-64 lg:h-80 object-cover" src={image} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`bg-white py-16 ${className}`}>
      <div className="container-page max-w-4xl mx-auto text-center px-4">
        {eyebrow && <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-4 block">{eyebrow}</span>}
        <h2 className="type-h2 text-gray-800 mb-6">{title}</h2>
        {description && <p className="type-body-lg text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>}
        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
          {actions.map((action, i) => {
            const btnClass = action.variant === 'outline'
              ? 'inline-flex items-center justify-center px-8 py-4 text-base font-bold border-2 border-primary text-gray-800 hover:bg-primary/10 transition-colors min-w-[180px]'
              : 'inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary/90 transition-colors min-w-[180px]'
            return (
              <Link key={i} to={action.url ?? '/'} className={btnClass}>
                {action.text}
                {action.icon && <FaIcon icon={action.icon} className="ml-2 text-base" />}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CTA
