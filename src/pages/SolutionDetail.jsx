import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { toFrontendUrl } from '../utils/routes'
import { resolveMediaUrl } from '../utils/media'
import { PageHero } from '../components/hero'
import { FaIcon } from '../components/Icons/FaIcon'
import { FeatureGrid } from '../components/features'
import { SplitContent } from '../components/content'
import SolutionDetailCTA from '../components/cta/SolutionDetailCTA'
import { Testimonial } from '../components/testimonial'
import { FAQ } from '../components/faq'
import { RelatedGrid } from '../components/related'
import { getSolutionByAnchor, getSolutions } from '../services/solutionsService'

function SolutionDetail() {
  const { slug } = useParams()
  const [solution, setSolution] = useState(null)
  const [allSolutions, setAllSolutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    Promise.all([
      getSolutionByAnchor(slug),
      getSolutions(),
    ])
      .then(([sol, list]) => {
        setSolution(sol ?? null)
        setAllSolutions(Array.isArray(list) ? list : [])
        setNotFound(!sol)
      })
      .catch(() => {
        setNotFound(true)
        setSolution(null)
        setAllSolutions([])
      })
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (solution?.meta_title || solution?.title) {
      document.title = `${solution?.meta_title ?? solution?.title ?? ''} | ${nl('solutions.breadcrumb')}`
    }
  }, [solution?.meta_title, solution?.title])

  useEffect(() => {
    const desc = solution?.meta_description?.trim()
    if (desc) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = desc
    }
  }, [solution?.meta_description])

  if (loading) {
    return (
      <div className="container-page py-16">
        <div className="animate-pulse space-y-6 max-w-3xl">
          <div className="h-12 bg-gray-200 w-3/4 rounded" />
          <div className="h-5 bg-gray-200 w-full rounded" />
          <div className="h-5 bg-gray-200 w-4/5 rounded" />
        </div>
      </div>
    )
  }

  if (notFound || !solution) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">Oplossing niet gevonden.</p>
        <Link to={R.solutions} className="text-primary hover:underline mt-4 inline-block">
          ← Terug naar Oplossingen
        </Link>
      </div>
    )
  }

  const title = solution.nav_title ?? solution.title ?? ''
  const subtitle = solution.subtitle ?? solution.short_body ?? ''
  const heroImage = resolveMediaUrl(solution.image)
  const ctaUrl = toFrontendUrl(solution.link_url) ?? R.demo
  const ctaText = solution.link_text ?? 'Demo aanvragen'

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: nl('solutions.breadcrumb'), to: R.solutions },
          { label: title },
        ]}
      >
        <Link
          to={ctaUrl}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          {ctaText}
          <FaIcon icon="arrow_forward" className="text-base" />
        </Link>
      </PageHero>

      {heroImage && (
        <div className="w-full pt-12 md:pt-16 pb-4">
          <div className="container-page">
            <div className="overflow-hidden shadow-md">
              <img
                alt={title}
                className="w-full h-[360px] md:h-[440px] lg:h-[500px] object-cover"
                src={heroImage}
              />
            </div>
          </div>
        </div>
      )}

      <FeatureGrid items={solution.features} title="Alles voor transparantie en efficiëntie" />

      <SplitContent solution={solution} title={title} />

      <Testimonial
        quote={solution.testimonial_quote}
        author={solution.testimonial_author}
        company={solution.testimonial_company}
      />

      <FAQ items={solution.faq} />

      <SolutionDetailCTA solution={solution} />

      <RelatedGrid solutions={allSolutions} currentAnchor={slug} />
    </>
  )
}

export default SolutionDetail
