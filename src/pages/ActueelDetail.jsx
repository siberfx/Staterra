import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { actueelArticles } from '../data/actueel'
import { actueelContent } from '../data/actueelContent'
import { BlockRenderer } from '../components/content'
import ActueelPlaceholder from '../components/placeholder/ActueelPlaceholder'
import RelatedActueel from '../components/related/RelatedActueel'

function ActueelDetail() {
  const { slug } = useParams()
  const article = actueelArticles.find((a) => a.slug === slug)
  const content = actueelContent[slug]

  if (!article) {
    return (
      <div className="container-page py-16">
        <p className="text-gray-500">{nl('actueel.notFound')}</p>
        <Link to={R.actueel} className="text-primary hover:underline mt-4 inline-block">
          ← {nl('actueel.backToActueel')}
        </Link>
      </div>
    )
  }

  const meta = content ?? { author: null, readTime: null }

  return (
    <>
      <section className="pt-12 pb-8 bg-white">
        <div className="container-page">
          <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
            <Link to="/" className="hover:text-black transition-colors">
              {nl('actueel.breadcrumbHome')}
            </Link>
            <span className="mx-2">/</span>
            <Link to={R.actueel} className="hover:text-black transition-colors">
              {nl('nav.news')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{article.title?.nl ?? article.title}</span>
          </nav>

          <h1 className="type-h1 text-black tracking-tight mb-6">
            {article.title?.nl ?? article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            {meta.author && (
              <>
                <span className="font-medium text-black">
                  Door {meta.author}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
              </>
            )}
            <span>{article.date?.nl ?? article.date}</span>
            {meta.readTime && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{meta.readTime} leestijd</span>
              </>
            )}
          </div>

          <div className="flex gap-3 mb-8">
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
              aria-label="Link kopiëren"
            >
              <span className="material-symbols-outlined text-base">link</span>
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
              aria-label="Delen"
            >
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>
      </section>

      {content?.heroImage && (
        <div className="w-full mb-16">
          <div className="container-page">
            <img
              alt={content.heroAlt ?? ''}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-none"
              src={content.heroImage}
            />
          </div>
        </div>
      )}

      <article className="container-page mb-24">
        {content ? (
          <BlockRenderer content={content} />
        ) : (
          <ActueelPlaceholder article={article} />
        )}
      </article>

      <RelatedActueel currentSlug={slug} />
    </>
  )
}

export default ActueelDetail
