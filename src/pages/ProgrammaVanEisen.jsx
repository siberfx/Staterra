import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'

function ProgrammaVanEisen() {
  return (
    <section className="container-page pt-12 md:pt-16 pb-24">
      <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">
          {nl('actueel.breadcrumbHome')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{nl('footer.programmaVanEisen')}</span>
      </nav>

      <header className="mb-8">
        <h1 className="type-h1 text-primary tracking-tight mb-4">
          {nl('programmaVanEisen.title')}
        </h1>
        <p className="type-body-lg text-gray-600 max-w-3xl">
          {nl('programmaVanEisen.subtitle')}
        </p>
      </header>

      <div className="rich-text max-w-3xl space-y-6 mb-12">
        <p className="text-gray-700">{nl('programmaVanEisen.content')}</p>
      </div>

      <div className="mb-8">
        <h2 className="type-h2 text-black mb-4">
          {nl('programmaVanEisen.eisenTitle')}
        </h2>
        <ul className="list-disc list-inside space-y-2 type-body text-gray-700">
          <li>{nl('programmaVanEisen.eis1')}</li>
          <li>{nl('programmaVanEisen.eis2')}</li>
          <li>{nl('programmaVanEisen.eis3')}</li>
          <li>{nl('programmaVanEisen.eis4')}</li>
          <li>{nl('programmaVanEisen.eis5')}</li>
        </ul>
      </div>

      <Link
        to={R.contact}
        className="inline-flex items-center justify-center px-8 py-3.5 text-body-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all rounded-md"
      >
        {nl('programmaVanEisen.cta')}
      </Link>
    </section>
  )
}

export default ProgrammaVanEisen
