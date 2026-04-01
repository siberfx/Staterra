import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { zoDoenZijHetCases } from '../data/zoDoenZijHet'

function ZoDoenZijHet() {
  return (
    <section className="container-page pt-12 md:pt-16 pb-24">
      <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">
          {nl('actueel.breadcrumbHome')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{nl('nav.zoDoenZijHet')}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-primary mb-4">
          {nl('zoDoenZijHet.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-6">
          {nl('zoDoenZijHet.subtitle')}
        </p>
        <p className="text-gray-600 max-w-3xl">
          {nl('zoDoenZijHet.intro')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {zoDoenZijHetCases.map((c) => (
          <article
            key={c.id}
            className="p-6 lg:p-8 border border-gray-100 bg-white hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">
                {c.icon}
              </span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {nl(`zoDoenZijHet.type${c.type.charAt(0).toUpperCase() + c.type.slice(1)}`)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">
              {nl(`zoDoenZijHet.${c.orgKey}`)}
            </h3>
            <p className="text-primary font-medium mb-4">
              {nl(`zoDoenZijHet.${c.resultKey}`)}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {nl(`zoDoenZijHet.${c.descKey}`)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16 p-8 bg-gray-50 border border-gray-100">
        <h2 className="text-xl font-bold text-primary mb-3">
          {nl('zoDoenZijHet.ctaTitle')}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl">
          {nl('zoDoenZijHet.ctaSub')}
        </p>
        <Link
          to={R.contact}
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          {nl('zoDoenZijHet.ctaContact')}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}

export default ZoDoenZijHet
