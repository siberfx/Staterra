import { Link } from 'react-router-dom'
import { nl } from '../../translations'

const DEFAULT_IMAGE = '/assets/hero-banner.jpg'

function PageHero({ title, subtitle, breadcrumbs, stats, image, children }) {
  return (
    <section className="relative min-h-[340px] md:min-h-[400px] flex flex-col justify-center overflow-hidden">
      <img
        src={image ?? DEFAULT_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative container-page w-full pt-20 pb-12 md:pt-24 md:pb-14">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex text-xs font-medium text-white/80 mb-6 uppercase tracking-wide">
            <Link to="/" className="hover:text-white transition-colors">
              {nl('actueel.breadcrumbHome')}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center">
                <span className="mx-2">/</span>
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="type-h1 text-white tracking-tight mb-3">
          {title}
        </h1>

        {subtitle && (
          <p className="type-body-lg text-white/90 max-w-2xl">{subtitle}</p>
        )}

        {children}

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap gap-6 text-sm text-white/90 mt-5 min-h-[28px]">
            {stats.map((stat, i) => (
              <span key={i} className="flex items-center gap-2">
                {stat.icon && <span className="material-symbols-outlined text-lg">{stat.icon}</span>}
                {stat.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHero
