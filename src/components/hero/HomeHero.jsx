import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'
import { useSettings } from '../../contexts/SiteContext'
import { resolveMediaUrl } from '../../utils/media'
import { FaIcon } from '../Icons/FaIcon'

function HomeHero({ data, loading: hpLoading }) {
  const { settings, loading: siteLoading } = useSettings()
  const loading = hpLoading || siteLoading

  const label = data?.label ?? ''
  const heading = data?.heading ?? ''
  const paragraph = data?.paragraph ?? ''
  const bullets = data?.bullets ?? []
  const ctaPrimaryText = data?.cta_primary_text ?? ''
  const ctaPrimaryUrl = toFrontendUrl(data?.cta_primary_url) ?? R.demo
  const ctaSecondaryText = data?.cta_secondary_text ?? ''
  const ctaSecondaryUrl = toFrontendUrl(data?.cta_secondary_url) ?? R.solutions

  const heroImage = resolveMediaUrl(data?.image)
    || settings.hero?.contact
    || settings.hero?.blog
    || settings.site?.hero_background

  return (
    <section className="relative min-h-[600px] lg:min-h-[88vh] overflow-hidden bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] min-h-[600px] lg:min-h-[88vh]">
        <div className="relative flex items-center order-2 lg:order-1 py-14 lg:py-20">
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            {label && (
              <div className="flex items-center gap-3 mb-5">
                <span className="w-12 h-0.5 bg-primary" />
                <span className="type-kicker text-primary">
                  {label}
                </span>
              </div>
            )}
            <h1 className="type-h1 text-primary tracking-tight mb-6">
              {heading}
            </h1>
            <p className="type-body-lg text-gray-600 mb-8 max-w-lg">
              {paragraph}
            </p>
            <ul className="space-y-2.5 mb-10">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-primary/10">
                    <FaIcon icon={b.icon} className="text-primary text-base" />
                  </div>
                  <span className="type-body text-gray-600">{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              {ctaPrimaryText && (
                <Link
                  to={ctaPrimaryUrl}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 font-semibold transition-all duration-200 hover:bg-secondary hover:shadow-[0_4px_14px_rgb(0,115,230,0.4)]"
                >
                  <span>{ctaPrimaryText}</span>
                  <FaIcon icon="arrow_forward" className="text-lg" />
                </Link>
              )}
              {ctaSecondaryText && (
                <Link
                  to={ctaSecondaryUrl}
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-primary font-semibold px-6 py-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-gray-50"
                >
                  <span>{ctaSecondaryText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 h-80 sm:h-[420px] lg:h-full min-h-[320px] lg:min-h-0 overflow-hidden">
          <div className="absolute inset-0 hero-img-shape overflow-hidden">
            {loading ? (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            ) : heroImage ? (
              <img alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" src={heroImage} />
            ) : (
              <div className="absolute inset-0 bg-gray-200" aria-hidden />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent pointer-events-none" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
