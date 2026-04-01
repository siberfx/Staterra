import { useState, useEffect } from 'react'
import { nl } from '../translations'
import { PageHero } from '../components/hero'
import { SolutionsGrid } from '../components/grid'
import SolutionsCTA from '../components/cta/SolutionsCTA'
import { getSolutions } from '../services/solutionsService'

function Solutions() {
  const [solutions, setSolutions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSolutions()
      .then(setSolutions)
      .catch(() => setSolutions([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHero
        title={nl('solutions.title')}
        subtitle={nl('solutions.subtitle')}
        breadcrumbs={[{ label: nl('solutions.breadcrumb') }]}
      />
      <SolutionsGrid solutions={solutions} loading={loading} />
      {/* <SolutionsStats /> */}
      <SolutionsCTA />
    </>
  )
}

export default Solutions
