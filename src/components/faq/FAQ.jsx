import { useState } from 'react'

function FAQ({ items = [], title = 'Veelgestelde vragen', className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)

  const filtered = Array.isArray(items) ? items.filter((i) => i?.question?.trim()) : []
  if (filtered.length === 0) return null

  return (
    <section className={`py-20 md:py-24 bg-white border-t border-gray-100 ${className}`}>
      <div className="container-page max-w-2xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            {title}
          </h2>
        )}
        <div className="divide-y divide-gray-100">
          {filtered.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="py-5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-medium leading-snug transition-colors ${
                      isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-gray-600'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      isOpen ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-[15px] text-gray-600 leading-relaxed pl-0">{item.answer}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
