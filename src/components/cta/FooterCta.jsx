import { Link } from 'react-router-dom'
import { useSettings } from '../../contexts/SiteContext'

export default function FooterCta() {
  const { settings, loading } = useSettings()
  const footerCta = settings.footer
  const hasFooterCta = footerCta?.cta_title && (footerCta?.cta_button_url || footerCta?.cta_button_text)

  if (loading) {
    return (
      <section className="bg-white border-y border-gray-100 py-16" aria-hidden>
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 animate-pulse">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded" />
              <div className="h-5 w-96 bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-40 bg-gray-200 rounded shrink-0" />
          </div>
        </div>
      </section>
    )
  }

  if (!hasFooterCta) return null

  return (
    <section className="bg-white border-y border-gray-100 py-16">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">{footerCta.cta_title}</h3>
            {footerCta.cta_subtitle && (
              <p className="text-gray-700 text-lg mb-1">{footerCta.cta_subtitle}</p>
            )}
            {footerCta.cta_description && (
              <p className="text-gray-500 text-sm max-w-2xl">{footerCta.cta_description}</p>
            )}
          </div>
          {footerCta.cta_button_url && footerCta.cta_button_text && (
            <div className="shrink-0">
              {footerCta.cta_button_url.startsWith('http') ? (
                <a
                  href={footerCta.cta_button_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {footerCta.cta_button_text}
                </a>
              ) : (
                <Link
                  to={footerCta.cta_button_url.startsWith('/') ? footerCta.cta_button_url : `/${footerCta.cta_button_url}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {footerCta.cta_button_text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
