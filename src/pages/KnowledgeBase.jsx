import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { CardGrid } from '../components/grid'
import { kennisbankArticles } from '../data/kennisbank'

function KnowledgeBase() {
  return (
    <>
      <div className="container-page pt-12 md:pt-16 pb-8 md:pb-10">
        <nav className="flex text-xs font-medium text-gray-400 mb-6 uppercase tracking-wide">
          <Link to="/" className="hover:text-primary transition-colors">
            {nl('actueel.breadcrumbHome')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{nl('kennisbank.breadcrumb')}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-primary mb-4">
            {nl('kennisbank.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {nl('kennisbank.subtitle')}
          </p>
        </header>
      </div>
      <div className="container-page pb-24">
        <CardGrid
          articles={kennisbankArticles}
          getLink={(slug) => R.kennisbankArticle(slug)}
        />
      </div>
    </>
  )
}

export default KnowledgeBase
