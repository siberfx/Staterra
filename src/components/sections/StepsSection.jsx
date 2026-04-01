import { Link } from 'react-router-dom'
import { R, toFrontendUrl } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

function StepsSection({ data }) {
  const title = data?.title ?? ''
  const steps = data?.steps ?? []
  const linkText = data?.link_text ?? ''
  const linkUrl = toFrontendUrl(data?.link_url) ?? R.demo

  if (steps.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-page">
        <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-16 text-center">{title}</h2>

        <div className="relative">
          {/* Horizontal line connecting steps */}
          <div
            className="hidden lg:block absolute top-6 left-[calc(50%/var(--cols)*1)] right-[calc(50%/var(--cols)*1)] h-0.5 bg-primary/20"
            style={{ '--cols': steps.length, left: '4%', right: '4%' }}
            aria-hidden
          />

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
            {steps.map((step, i) => {
              const num = step.number ?? i + 1
              const isLast = i === steps.length - 1

              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <div
                      className={`w-full h-full flex items-center justify-center font-bold text-sm ${
                        isLast ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary'
                      }`}
                    >
                      {num}
                    </div>
                  </div>

                  <div className="group border-l-4 border-l-primary border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] w-full text-left">
                    <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {linkText && (
          <div className="mt-16 text-center">
            <Link
              to={linkUrl}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold hover:bg-secondary transition-colors"
            >
              {linkText}
              <FaIcon icon="arrow_forward" className="text-lg" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default StepsSection
