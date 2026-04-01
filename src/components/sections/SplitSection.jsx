import { Link } from 'react-router-dom'
import { FaIcon } from '../Icons/FaIcon'

function SplitSection({ title, subtitle, label, items = [], image, imagePosition = 'left', cta, className = '' }) {
  if (!title && !subtitle && items.length === 0) return null

  const imageBlock = image ? (
    <div className="relative">
      <div className="relative border-l-4 border-l-primary overflow-hidden">
        {typeof image === 'string' ? (
          <img alt="" className="w-full h-auto block" src={image} />
        ) : (
          image
        )}
      </div>
    </div>
  ) : null

  const contentBlock = (
    <div>
      {label && (
        <div className="flex items-center gap-3 mb-5">
          <span className="w-12 h-0.5 bg-primary" />
          <span className="text-primary font-semibold tracking-wider text-sm uppercase">{label}</span>
        </div>
      )}
      {title && (
        <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">{title}</h2>
      )}
      {subtitle && (
        <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">{subtitle}</p>
      )}
      {items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, i) => {
            if (item.icon && item.text) {
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center">
                    <FaIcon icon={item.icon} className="text-primary text-lg" />
                  </div>
                  <div className="pt-1">
                    <span className="text-gray-600 leading-relaxed">{item.text}</span>
                  </div>
                </div>
              )
            }
            if (item.title && item.description) {
              return (
                <li key={i} className="flex items-start list-none">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <FaIcon icon="check" className="text-white text-xs" />
                  </div>
                  <div className="ml-4">
                    <strong className="block text-black font-semibold text-lg">{item.title}</strong>
                    <span className="text-gray-600">{item.description}</span>
                  </div>
                </li>
              )
            }
            return null
          })}
        </div>
      )}
      {cta && (
        <Link
          to={cta.url ?? '/'}
          className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 bg-primary text-white font-semibold hover:bg-secondary transition-colors"
        >
          {cta.text}
          <FaIcon icon="arrow_forward" className="text-lg" />
        </Link>
      )}
    </div>
  )

  const isRight = imagePosition === 'right'

  return (
    <section className={`py-20 lg:py-28 bg-gray-50/50 ${className}`}>
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {isRight ? (
            <>
              <div className="order-2 lg:order-1">{contentBlock}</div>
              <div className="order-1 lg:order-2">{imageBlock}</div>
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1">{contentBlock}</div>
              <div className="order-1 lg:order-2">{imageBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default SplitSection
