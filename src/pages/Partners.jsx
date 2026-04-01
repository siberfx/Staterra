import { useState, useEffect } from 'react'
import { nl } from '../translations'
import { PageHero } from '../components/hero'
import { LogoGrid } from '../components/logos'
import { getPartners } from '../services/partnersService'

function Partners() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getPartners()
      .then((res) => {
        if (!cancelled) setData(res)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const title = data?.title ?? nl('partners.title')
  const description = data?.description ?? nl('partners.subtitle')
  const showExtraContent = !loading && !data
  const partners = (data?.data ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)).map((item, i) => ({
    id: item.id ?? i,
    name: item.name ?? item.title,
    logo: item.image_url ?? item.image,
    url: item.url ?? item.link,
    link: item.link,
  }))

  return (
    <>
      <PageHero
        title={title}
        subtitle={description}
        breadcrumbs={[{ label: nl('nav.partners') }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-24">
        {showExtraContent && (
          <p className="text-gray-600 max-w-3xl mb-12">{nl('partners.content')}</p>
        )}

        {loading ? (
        <div className=" bg-gray-50/80 p-8 md:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[100px] bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <div className=" bg-gray-50/80 p-8 md:p-12">
          <LogoGrid partners={partners} />
        </div>
      )}
      </section>
    </>
  )
}

export default Partners
