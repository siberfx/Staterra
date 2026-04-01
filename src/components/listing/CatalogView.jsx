import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { academyCategories, academyTrainings } from '../../data/academy'
import { FaIcon } from '../Icons/FaIcon'

function CatalogView({ search }) {
  const filteredTrainings = search.trim()
    ? academyTrainings.filter((tr) =>
        (tr.title?.nl ?? tr.title).toLowerCase().includes(search.toLowerCase())
      )
    : academyTrainings
  const featured = filteredTrainings[0]
  const upcoming = filteredTrainings.slice(0, 3)
  const recentlyAdded = filteredTrainings.slice(0, 3).reverse()

  return (
    <div id="academy-content" className="flex-1 min-w-0 scroll-mt-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {nl('academy.whatToLearn')}
        </h2>
        <p className="text-gray-600 mb-6">{nl('academy.searchSub')}</p>
      </section>

      {featured && (
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-none border border-gray-100">
            <div className="md:w-80 flex-shrink-0 aspect-video overflow-hidden rounded-none bg-gray-200">
              {featured.image ? (
                <img src={featured.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: featured.placeholder?.color ?? '#1e3a5f' }}
                >
                  <FaIcon icon={featured.placeholder?.icon ?? 'school'} className="text-white text-5xl" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-none mb-3">
                {featured.subtitle?.nl ?? featured.subtitle}
              </span>
              <p className="text-xs text-gray-500 mb-2">{featured.date?.nl ?? featured.date}</p>
              <h3 className="text-xl font-bold text-primary mb-3">
                {featured.title?.nl ?? featured.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {nl('academy.featuredDesc')}
              </p>
              <Link
                to={R.academy}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {nl('academy.viewDetails')}
                <FaIcon icon="arrow_forward" className="text-lg" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary">
            {nl('academy.upcomingSessions')}
          </h3>
          <Link to={R.academy} className="text-sm font-medium text-primary hover:underline">
            {nl('academy.viewAllSessions')} →
          </Link>
        </div>
        <div className="space-y-4">
          {upcoming.map((session) => (
            <Link
              key={session.slug}
              to={R.academy}
              className="block p-5 bg-white border border-gray-100 rounded-none hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm font-medium text-gray-500">{session.date?.nl ?? session.date}</span>
                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaIcon icon="schedule" className="text-base" />
                  {session.duration?.nl ?? session.duration}
                </span>
              </div>
              <h4 className="font-bold text-primary mt-2 mb-1">{session.title?.nl ?? session.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{nl('academy.sessionDesc')}</p>
              <span className="text-sm font-medium text-primary hover:underline">
                {nl('academy.startSession')} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-primary">
            {nl('academy.discoverByTopic')}
          </h3>
          <Link to={R.academy} className="text-sm font-medium text-primary hover:underline">
            {nl('academy.viewAllTopics')} →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {academyCategories.map((cat) => (
            <Link
              key={cat.id}
              to={R.academy}
              className="group block rounded-none overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center bg-primary"
                style={{ backgroundColor: cat.placeholder?.color ?? '#1e3a5f' }}
              >
                <FaIcon icon={cat.placeholder?.icon} className="text-white text-2xl opacity-90" />
              </div>
              <div className="p-2.5">
                <h4 className="font-semibold text-primary text-sm group-hover:text-primary">
                  {nl(`academy.category.${cat.key}`)}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-primary mb-6">
          {nl('academy.recentlyAdded')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentlyAdded.map((item) => (
            <Link
              key={item.slug}
              to={R.academy}
              className="group block rounded-none overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="relative aspect-video">
                {item.image ? (
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: item.placeholder?.color ?? '#1e3a5f' }}
                  >
                    <FaIcon icon={item.placeholder?.icon ?? 'play_circle'} className="text-white text-4xl" />
                  </div>
                )}
                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-none">
                  {item.duration?.nl ?? item.duration}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-primary group-hover:underline">
                  {item.title?.nl ?? item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {nl(`academy.category.${item.category}`)} • {item.date?.nl ?? item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CatalogView
