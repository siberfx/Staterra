import { Link, useLocation } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { ANNOUNCEMENTS } from '../data/announcements'
import { PageHero } from '../components/hero'
import ChangelogSidebar from '../components/sidebar/ChangelogSidebar'
import { formatDate } from '../components/changelog/TimelineEntry'

function AnnouncementEntry({ entry }) {
  return (
    <article className="py-10 border-t border-gray-100 first:border-t-0">
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12">
        <div className="flex flex-col gap-2">
          <time className="text-sm text-gray-500 font-medium">{formatDate(entry.date)}</time>
          <span className="inline-flex w-fit px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
            Aankondiging
          </span>
        </div>
        <div>
          <Link to={R.changelogAnnouncement(entry.id)} className="group">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-primary transition-colors">
              {entry.title}
            </h2>
          </Link>
          <p className="text-gray-600 leading-relaxed">{entry.description}</p>
        </div>
      </div>
    </article>
  )
}

function Aankondigingen() {
  const { pathname } = useLocation()

  return (
    <>
      <PageHero
        title={nl('changelog.sidebarAnnouncements')}
        subtitle="Belangrijke mededelingen en aankondigingen over het platform."
        breadcrumbs={[
          { label: nl('changelog.title'), to: R.changelog },
          { label: nl('changelog.sidebarAnnouncements') },
        ]}
        stats={[{ icon: 'campaign', label: `${ANNOUNCEMENTS.length} aankondigingen` }]}
      />

      <div className="container-page pt-12 md:pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <ChangelogSidebar currentPath={pathname} />

          <div className="flex-1 min-w-0 min-h-[60vh]">
            <div className="space-y-0">
              {ANNOUNCEMENTS.map((entry) => (
                <AnnouncementEntry key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Aankondigingen
