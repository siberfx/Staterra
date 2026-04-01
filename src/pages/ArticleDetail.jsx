import { useParams, Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { kennisbankArticles } from '../data/kennisbank'
import { articleContent } from '../data/articleContent'
import { BlockRenderer } from '../components/content'
import ArticlePlaceholder from '../components/placeholder/ArticlePlaceholder'
import RelatedArticles from '../components/related/RelatedArticles'

function ArticleDetail() {
  const { slug } = useParams()
  const article = kennisbankArticles.find((a) => a.slug === slug)
  const content = articleContent[slug]

  if (!article) {
    return (
      <div className="container-page py-16">
        <p className="text-muted">Artikel niet gevonden.</p>
        <Link to={R.kennisbank} className="text-primary hover:underline mt-4 inline-block">
          ← Terug naar Kennisbank
        </Link>
      </div>
    )
  }

  const meta = content ?? { author: null, readTime: null }
  const primaryTag = article.tags[0]

  return (
    <>
      <section className="pt-12 pb-8 bg-white">
        <div className="container-page">
          <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
            <Link to={R.kennisbank} className="hover:text-black transition-colors">
              {nl('kennisbank.breadcrumb')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{primaryTag}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            {meta.author && (
              <>
                <span className="font-medium text-black">Door {meta.author}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
              </>
            )}
            <span>{article.date}</span>
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
          <ArticlePlaceholder article={article} />
        )}
      </article>

      <RelatedArticles />
    </>
  )
}

export default ArticleDetail
