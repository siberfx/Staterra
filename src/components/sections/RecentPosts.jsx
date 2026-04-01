import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R, toFrontendUrl } from '../../utils/routes'
import { resolveMediaUrl } from '../../utils/media'
import { FaIcon } from '../Icons/FaIcon'
import TeaserCard from '../cards/TeaserCard'
import { getBlogPosts } from '../../services/blogService'

function mapToCard(article) {
  const title = typeof article.title === 'object' ? article.title?.nl ?? article.title ?? '' : (article.title ?? '')
  const date = typeof article.date === 'object' ? article.date?.nl ?? article.date ?? '' : (article.date ?? '')
  const category = typeof article.category === 'object' ? article.category?.name ?? article.category : (article.category ?? null)
  return {
    slug: article.slug,
    title,
    date,
    short_body: article.short_body ?? null,
    category,
    image: article.image ?? null,
    placeholder: article.placeholder ?? null,
    featured: article.featured ?? false,
    author_name: article.author_name ?? article.author?.name ?? null,
    author_avatar: article.author_avatar ?? article.author?.avatar ?? null,
  }
}

function RecentPosts({ data }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts(3)
      .then((posts) => setArticles((posts ?? []).slice(0, 3)))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading || articles.length === 0) {
    return null
  }

  const title = data?.title ?? nl('home.latestUpdates')
  const linkText = data?.link_text ?? nl('home.viewAllArticles')
  const linkUrl = toFrontendUrl(data?.link_url) ?? R.blog
  const items = articles.map(mapToCard)

  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl font-medium text-primary mb-2">{title}</h2>
            <p className="text-gray-600">{nl('home.latestUpdatesSub')}</p>
          </div>
          <Link
            to={linkUrl}
            className="hidden sm:flex items-center text-primary font-semibold hover:underline"
          >
            {linkText}
            <FaIcon icon="arrow_forward" className="ml-1 text-sm" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item) => (
            <TeaserCard
              key={item.slug}
              to={R.blogPost(item.slug)}
              title={item.title}
              date={item.date}
              shortBody={item.short_body}
              category={item.category}
              image={resolveMediaUrl(item.image)}
              placeholder={item.placeholder}
              featured={item.featured}
              author={{ name: item.author_name, avatar: resolveMediaUrl(item.author_avatar) }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentPosts
