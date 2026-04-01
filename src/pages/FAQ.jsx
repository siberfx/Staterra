import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { PageHero } from '../components/hero'

const FAQ_ITEMS = [
  { q: 'contact.faq1Question', a: 'contact.faq1Answer' },
  { q: 'contact.faq2Question', a: 'contact.faq2Answer' },
  { q: 'contact.faq3Question', a: 'contact.faq3Answer' },
  { q: 'contact.faq4Question', a: 'contact.faq4Answer' },
  { q: 'contact.faq5Question', a: 'contact.faq5Answer' },
  { q: 'contact.faq6Question', a: 'contact.faq6Answer' },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <PageHero
        title={nl('contact.faqTitle')}
        subtitle="Veelgestelde vragen over OPMS, implementatie, koppelingen en gebruik."
        breadcrumbs={[{ label: nl('contact.faqTitle') }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-24">
        <div className="max-w-4xl mx-auto space-y-1">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`border-l-4 border-l-primary bg-white border border-gray-100 transition-all duration-200 hover:border-gray-200 ${
                isOpen ? 'border-l-secondary' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-start justify-between gap-4 text-left p-6 lg:p-8 group"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-base font-semibold leading-snug transition-colors ${
                    isOpen ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                  }`}
                >
                  {nl(item.q)}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm transition-all ${
                    isOpen ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary group-hover:bg-primary/15'
                  }`}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                  <p className="text-gray-600 leading-relaxed">{nl(item.a)}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

        <div className="mt-12 pt-8 border-t border-gray-100 max-w-4xl mx-auto">
          <p className="text-gray-600 mb-4">
            Staat uw vraag er niet bij? Neem gerust contact met ons op.
          </p>
          <Link
            to={R.contact}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold hover:bg-secondary transition-colors"
          >
            {nl('nav.contact')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default FAQ
