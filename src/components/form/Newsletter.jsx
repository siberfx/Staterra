import { useState } from 'react'
import { nl } from '../../translations'

function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder - zou naar backend gaan
  }

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {nl('actueel.newsletterTitle')}
          </h2>
          <p className="text-blue-100 mb-8">
            {nl('actueel.newsletterSub')}
          </p>
          <form onSubmit={handleSubmit} className="flex max-w-lg mx-auto overflow-hidden bg-white shadow-lg border border-white/20">
            <input
              type="email"
              placeholder={nl('actueel.newsletterPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 px-5 py-3.5 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              {nl('actueel.newsletterButton')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
