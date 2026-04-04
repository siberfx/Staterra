import { nl } from '../../translations'
import IconCard from '../cards/IconCard'

function SolutionsGrid({ solutions = [], loading = false }) {
  if (loading) {
    return (
      <section id="solutions" className="scroll-mt-24 pt-8 lg:pt-12 pb-20 lg:pb-28 bg-white">
        <div className="container-page">
          <div className="mb-16 lg:mb-20 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              {nl('solutions.sectionLabel')}
            </p>
            <h2 className="type-h2 text-black tracking-tight mb-4">
              {nl('solutions.sectionTitle')}
            </h2>
            <p className="type-body-lg text-gray-600 max-w-2xl mx-auto">
              {nl('solutions.sectionSub')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 lg:p-10 bg-white border border-gray-100 animate-pulse rounded">
                <div className="w-14 h-14 bg-gray-200 rounded-xl mb-6" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (solutions.length === 0) {
    return null
  }

  return (
    <section id="solutions" className="scroll-mt-24 pt-8 lg:pt-12 pb-20 lg:pb-28 bg-white">
      <div className="container-page">
        <div className="mb-16 lg:mb-20 text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            {nl('solutions.sectionLabel')}
          </p>
          <h2 className="type-h2 text-black tracking-tight mb-4">
            {nl('solutions.sectionTitle')}
          </h2>
          <p className="type-body-lg text-gray-600 max-w-2xl mx-auto">
            {nl('solutions.sectionSub')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, i) => (
            <IconCard key={solution.id ?? solution.anchor} solution={solution} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionsGrid
