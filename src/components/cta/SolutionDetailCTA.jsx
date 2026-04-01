import { Link } from 'react-router-dom'
import { R } from '../../utils/routes'
import { toFrontendUrl } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

const DEFAULT_TITLE = 'Hoeveel bezwaren mogen wij voor je ontgrieven?'
const DEFAULT_DESC =
  'We begrijpen dat je een applicatie eerst wil zien voordat je er een goede mening over kunt geven. Vul geheel vrijblijvend het formulier in voor het aanvragen van een demonstratie.'
const DEFAULT_CTA = 'Demo aanvragen'

function SolutionDetailCTA({ solution }) {
  const title = DEFAULT_TITLE
  const desc = solution?.subtitle ?? DEFAULT_DESC
  const ctaText = solution?.link_text ?? DEFAULT_CTA
  const ctaUrl = solution?.link_url ? toFrontendUrl(solution.link_url) : `${R.contact}?tab=question`

  return (
    <section className="py-24 md:py-32 bg-white border-t border-gray-100">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Demo</span>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {title ?? ctaText}
            </h2>
            <p className="text-gray-600 mb-6 text-xl">{desc}</p>
            <Link
              to={ctaUrl}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              {ctaText}
              <FaIcon icon="arrow_forward" className="text-base" />
            </Link>
          </div>
          <div className="overflow-hidden shadow-sm">
            <img
              alt="Team collaborating"
              className="w-full h-64 lg:h-80 object-cover"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionDetailCTA
