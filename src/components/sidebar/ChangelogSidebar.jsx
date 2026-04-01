import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

const SIDEBAR_ITEMS = [
  { to: R.aankondigingen, icon: 'campaign', key: 'changelog.sidebarAnnouncements' },
  { to: R.featureRequests, icon: 'lightbulb', key: 'changelog.sidebarFeatureRequests' },
  { to: R.changelog, icon: 'schedule', key: 'changelog.sidebarChangelog' },
  { to: R.roadmap, icon: 'route', key: 'changelog.sidebarRoadmap' },
]

function ChangelogSidebar({ currentPath }) {
  return (
    <aside className="lg:w-56 flex-shrink-0">
      <nav className="sticky top-28 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const isExactChangelog = item.to === R.changelog
          const isActive = isExactChangelog
            ? currentPath === R.changelog
            : currentPath.startsWith(item.to)

          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-gray-100 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {nl(item.key)}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default ChangelogSidebar
