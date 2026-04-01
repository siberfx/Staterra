import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

function getBoxHref(b) {
  const url = b?.url ?? b?.link_url
  if (!url) return null
  if (typeof url === 'string' && (url.startsWith('http') || url.startsWith('mailto:'))) return url
  return toFrontendUrl(url) ?? null
}

function StatCards({ data }) {
  const label = data?.label ?? ''
  const heading = data?.heading ?? ''
  const paragraph = data?.paragraph ?? ''
  const boxes = data?.boxes ?? []
  const linkText = data?.link_text ?? ''
  const linkUrl = toFrontendUrl(data?.link_url) ?? R.page('ons-verhaal')
  const linkSecondaryText = data?.cta_secondary_text ?? ''
  const linkSecondaryUrl = toFrontendUrl(data?.cta_secondary_url) ?? linkUrl

  if (!heading && !paragraph && boxes.length === 0) return null

  const StatCard = ({ title, value, description, href }) => {
    const content = (
      <div className="min-w-0 flex flex-col justify-center">
        {title && <p className="text-sm font-semibold text-primary mb-2 line-clamp-2">{title}</p>}
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary block mb-2">{value}</span>
        {description && <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 break-words">{description}</p>}
      </div>
    )
    const className = "p-5 sm:p-6 lg:p-10 bg-gray-50/60 border-l-4 border-l-primary aspect-square flex flex-col justify-center transition-colors hover:bg-gray-50 hover:border-l-secondary min-w-0 overflow-hidden"
    if (href?.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`block ${className}`}>
          {content}
        </a>
      )
    }
    if (href) {
      return (
        <Link to={href} className={`block ${className}`}>
          {content}
        </Link>
      )
    }
    return <div className={className}>{content}</div>
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - left, aligned with container */}
          <div>
            {label && (
              <p className="text-sm font-bold text-primary mb-3">{label}</p>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6 break-words">
              {heading}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 break-words">
              {paragraph}
            </p>
            <div className="flex flex-wrap gap-3">
              {linkText && (
                <Link
                  to={linkUrl}
                  className="inline-flex items-center gap-2 border-2 border-gray-200 px-6 py-3 font-semibold text-primary hover:border-primary/30 hover:bg-gray-50 transition-colors"
                >
                  {linkText}
                </Link>
              )}
              {linkSecondaryText && (
                <Link
                  to={linkSecondaryUrl}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  {linkSecondaryText}
                  <FaIcon icon="arrow_forward" className="text-sm" />
                </Link>
              )}
            </div>
          </div>

          {/* Stats grid - 2x2 cards */}
          {boxes.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 min-w-0">
              {boxes.map((b, i) => (
                <StatCard
                  key={i}
                  title={b.title}
                  value={b.value}
                  description={b.description ?? b.label}
                  href={getBoxHref(b)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default StatCards
