import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

function SolutionsCTA() {
  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="container-page max-w-4xl mx-auto text-center">
        <h2 className="type-h1 text-black tracking-tight mb-6">
          {nl('solutions.ctaTitle')}
        </h2>
        <p className="type-body-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          {nl('solutions.ctaSub')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            to={R.demo}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary hover:bg-primary/90 transition-all rounded-md min-w-[180px]"
          >
            {nl('solutions.ctaDemo')}
          </Link>
          <Link
            to={`${R.contact}?tab=question`}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-800 border-2 border-primary hover:bg-primary/9 transition-all rounded-md min-w-[180px]"
          >
            {nl('solutions.ctaContact')}
          </Link>
          <Link
            to={R.programmaVanEisen}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-800 border-2 border-primary hover:bg-primary/9 transition-all rounded-md min-w-[180px]"
          >
            {nl('footer.programmaVanEisen')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SolutionsCTA
