import { nl } from '../../translations'
import { formatDate } from './ChangelogEntry'

function ChangelogOnThisPage({ entries }) {
  if (!entries?.length) return null

  return (
    <aside className="hidden xl:block w-48 flex-shrink-0">
      <nav className="sticky top-28">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">list</span>
          {nl('changelog.onThisPage')}
        </h3>
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.id ?? entry.slug}>
              <a
                href={`#${entry.slug ?? entry.id}`}
                className="text-sm text-gray-600 hover:text-primary transition-colors block truncate"
              >
                {formatDate(entry.date)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default ChangelogOnThisPage
