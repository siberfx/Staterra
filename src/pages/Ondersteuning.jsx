import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'

function Ondersteuning() {
  return (
    <section className="container-page pt-12 md:pt-16 pb-24">
      <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">
          {nl('actueel.breadcrumbHome')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{nl('nav.ondersteuning')}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-primary mb-4">
          {nl('ondersteuning.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-6">
          {nl('ondersteuning.subtitle')}
        </p>
      </header>

      <div className="prose prose-lg max-w-3xl mb-12">
        <p className="text-gray-700">{nl('ondersteuning.content')}</p>
      </div>

      <div className="max-w-3xl mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {nl('ondersteuning.itVragenTitle')}
        </h2>
        <p className="text-gray-600 mb-8">{nl('ondersteuning.itVragenIntro')}</p>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold text-black mb-1">
              {nl('ondersteuning.itKoppelbaar')}
            </dt>
            <dd className="text-gray-600">{nl('ondersteuning.itKoppelbaarAnswer')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-black mb-1">
              {nl('ondersteuning.itBeveiliging')}
            </dt>
            <dd className="text-gray-600">{nl('ondersteuning.itBeveiligingAnswer')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-black mb-1">
              {nl('ondersteuning.itWaarDraait')}
            </dt>
            <dd className="text-gray-600">{nl('ondersteuning.itWaarDraaitAnswer')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-black mb-1">
              {nl('ondersteuning.itImplementatie')}
            </dt>
            <dd className="text-gray-600">{nl('ondersteuning.itImplementatieAnswer')}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <a
          href={nl('ondersteuning.documentatieLink')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-primary hover:bg-primary/90 transition-all rounded-md"
        >
          {nl('ondersteuning.documentatie')}
        </a>
        <Link
          to={R.programmaVanEisen}
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary border border-primary hover:bg-primary/5 transition-all rounded-md"
        >
          {nl('footer.programmaVanEisen')}
        </Link>
        <Link
          to={R.contact}
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary border border-primary hover:bg-primary/5 transition-all rounded-md"
        >
          {nl('nav.contact')}
        </Link>
      </div>
    </section>
  )
}

export default Ondersteuning
