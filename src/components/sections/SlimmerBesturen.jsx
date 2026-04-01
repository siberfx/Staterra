import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'
import { resolveMediaUrl } from '../../utils/media'
import { FaIcon } from '../Icons/FaIcon'

function SlimmerBesturen({ data }) {
  const label = data?.label ?? ''
  const heading = data?.heading ?? ''
  const paragraph = data?.paragraph ?? ''
  const bullets = data?.bullets ?? []
  const linkText = data?.link_text ?? ''
  const linkUrl = toFrontendUrl(data?.link_url) ?? R.solutions
  const image = resolveMediaUrl(data?.image)

  if (!heading && !paragraph && bullets.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-gray-50/50">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            {label && (
              <div className="flex items-center gap-3 mb-5">
                <span className="w-12 h-0.5 bg-primary" />
                <span className="text-primary font-semibold tracking-wider text-sm uppercase">
                  {label}
                </span>
              </div>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
              {heading}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              {paragraph}
            </p>
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center">
                    <FaIcon icon={b.icon} className="text-primary text-lg" />
                  </div>
                  <div className="pt-1">
                    <span className="text-gray-600 leading-relaxed">{b.text}</span>
                  </div>
                </div>
              ))}
            </div>
            {linkText && (
              <Link
                to={linkUrl}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 bg-primary text-white font-semibold hover:bg-secondary transition-colors"
              >
                {linkText}
                <FaIcon icon="arrow_forward" className="text-lg" />
              </Link>
            )}
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative border-l-4 border-l-primary overflow-hidden">
              {image ? (
                <img alt="" className="w-full h-auto block" src={image} />
              ) : (
                <div className="w-full aspect-video bg-gray-200" aria-hidden />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlimmerBesturen
