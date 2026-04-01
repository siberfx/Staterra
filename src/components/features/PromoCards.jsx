import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

const offsets = ['', 'mt-8 lg:mt-12', '']

function PromoCards({ data }) {
  const cards = data?.cards ?? []

  if (cards.length === 0) return null

  return (
    <section className="relative pt-20 lg:pt-24 pb-20">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
          {cards.map((card, i) => (
            <Link
              key={i}
              to={toFrontendUrl(card.link_url) ?? R.solutions}
              className={`group block bg-white border border-gray-100 border-l-4 border-l-primary pl-8 lg:pl-10 pr-8 lg:pr-10 py-8 lg:py-10 transition-all duration-300 hover:border-l-secondary hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] ${offsets[i % 3]}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center group-hover:border-secondary/40 transition-colors">
                  <FaIcon icon={card.icon ?? 'layers'} className="text-primary text-lg" fallback="fa-solid fa-layer-group" />
                </div>
                <h3 className="text-lg font-bold text-primary leading-tight pt-1">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {card.description}
              </p>
              {card.link_text && (
                <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                  {card.link_text}
                  <FaIcon icon="arrow_forward" className="text-sm" />
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoCards
