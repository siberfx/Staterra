import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

const relatedArticles = [
  {
    slug: 'gemeente-utrecht',
    title: 'Gemeente Etten-Leur: sneller, vlotter en overzichtelijker objectbeheer',
    date: '12 maart 2025',
    tag: 'Succesverhalen',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoJesZiVXFDtLvV3ktJ1EW8Hnhhg5y5p_7pFpr869NfFG5UkpCpljXvZECoSzqUsuL69694pJcPq4tzTQh7kHeX754yiZk9vv7jkUnJtvQJIjQoEz7_lRQvUT6YDtGBsHMryezOpfq9A6NFAH4nNJ6TGm4olWUkz4HUMJxyjCWuYBnYImwycSg0zAid2ETLFRCPkf2cqZx0ExrH2-lrOrswufB_muvGNNfYbfGfeLpVG9ogxH_J5hMkD6CDI30wrfC4DFgG9Jkx7__',
    imageAlt: 'Office discussion',
  },
  {
    slug: 'den-haag-schoolverlaters',
    title: 'Zó verliest de gemeente Den Haag voortijdig schoolverlaters niet uit het oog',
    date: '24 januari 2024',
    tag: 'Kennis',
    placeholder: { bg: 'bg-blue-50', icon: 'article', iconColor: 'text-blue-200' },
  },
  {
    slug: 'woo-verzoek-digitaal',
    title: 'In 2 stappen een WOZ-bezwaar indienen',
    date: '1 november 2023',
    tag: 'Succesverhalen',
    placeholder: { bg: 'bg-indigo-50', icon: 'monitoring', iconColor: 'text-indigo-200' },
  },
]

function RelatedArticles() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="type-h2 text-black mb-2">{nl('kennisbank.leesVerder')}</h2>
          <div className="w-12 h-1 bg-gray-200 mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((item) => (
            <Link
              key={item.slug}
              to={R.kennisbankArticle(item.slug)}
              className="group block bg-white h-full border border-gray-100 hover:shadow-soft transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100 rounded-none">
                {item.image ? (
                  <img
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${item.placeholder.bg}`}
                  >
                    <FaIcon
                      icon={item.placeholder.icon}
                      className={`text-6xl ${item.placeholder.iconColor}`}
                    />
                  </div>
                )}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-black rounded-sm shadow-sm">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="text-xs font-medium text-gray-400 mb-3">{item.date}</div>
                <h3 className="type-h3 text-black group-hover:text-gray-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedArticles
