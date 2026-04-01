import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'

function HomeCTA({ data }) {
  const heading = data?.heading ?? ''
  const subtext = data?.subtext ?? ''
  const primaryText = data?.cta_primary_text ?? ''
  const primaryUrl = toFrontendUrl(data?.cta_primary_url) ?? R.demo
  const secondaryText = data?.cta_secondary_text ?? ''
  const secondaryUrl = toFrontendUrl(data?.cta_secondary_url) ?? R.contact

  if (!heading && !primaryText && !secondaryText) return null

  return (
    <section className="bg-white py-16">
      <div className="container-page max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-medium text-gray-800 mb-6">{heading}</h2>
        <p className="text-gray-600 text-lg mb-8">{subtext}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryText && (
            <Link
              to={primaryUrl}
              className="inline-flex justify-center bg-primary text-white px-8 py-3 font-bold hover:bg-primary/90 transition-colors"
            >
              {primaryText}
            </Link>
          )}
          {secondaryText && (
            <Link
              to={secondaryUrl}
              className="inline-flex justify-center border border-primary text-primary px-8 py-3 font-bold hover:bg-primary/10 transition-colors"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeCTA
