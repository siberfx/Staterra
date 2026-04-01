import TeaserCard from '../cards/TeaserCard'

function CardGrid({ articles, getLink }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {articles.map((article) => (
        <TeaserCard key={article.slug} to={getLink ? getLink(article.slug) : article.to} {...article} />
      ))}
    </div>
  )
}

export default CardGrid
