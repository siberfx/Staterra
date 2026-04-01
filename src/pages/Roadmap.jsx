import { useLocation } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { PageHero } from '../components/hero'
import ChangelogSidebar from '../components/sidebar/ChangelogSidebar'

const COLUMNS = [
  {
    key: 'backlog',
    label: 'Backlog',
    color: 'bg-amber-400',
    items: [
      { id: 62, title: 'Verbeterde kleurtoegankelijkheid', tags: ['Verbetering', 'Styling'], votes: 9 },
      { id: 8, title: 'Lineaire integratie', tags: ['Integraties'], votes: 28 },
    ],
  },
  {
    key: 'consideration',
    label: 'In overweging',
    color: 'bg-orange-400',
    items: [
      { id: 22, title: 'Helpcentrum artikelen', tags: ['Verbetering', 'Welkom'], votes: 48 },
      { id: 11, title: 'Verbeterde zoekfunctie', tags: ['Verbetering', 'UX'], votes: 44 },
    ],
  },
  {
    key: 'planned',
    label: 'Gepland',
    color: 'bg-blue-400',
    items: [
      { id: 23, title: 'Zapier integratie', tags: ['Verbetering', 'Integraties'], votes: 74 },
    ],
  },
  {
    key: 'in-progress',
    label: 'In ontwikkeling',
    color: 'bg-violet-400',
    items: [
      { id: 31, title: 'GWV bulkaanlevering', tags: ['Functie', 'GWV'], votes: 52 },
      { id: 44, title: 'MDTO 3.0 ondersteuning', tags: ['Archivering'], votes: 37 },
    ],
  },
]

function RoadmapCard({ item }) {
  return (
    <div className="bg-white border border-gray-100 p-4 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-200 group cursor-default">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-primary group-hover:border-primary/30 transition-colors">
          {item.id}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-2">{item.title}</h4>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-500 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {item.votes > 0 && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-50">
          <span className="material-symbols-outlined text-sm text-gray-300">thumb_up</span>
          <span className="text-xs text-gray-400 font-medium">{item.votes}</span>
        </div>
      )}
    </div>
  )
}

function Roadmap() {
  const { pathname } = useLocation()

  return (
    <>
      <PageHero
        title="Roadmap"
        subtitle="Overzicht van geplande functies en verbeteringen voor het platform."
        breadcrumbs={[
          { label: nl('changelog.title'), to: R.changelog },
          { label: 'Roadmap' },
        ]}
      />

      <div className="container-page pt-12 md:pt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <ChangelogSidebar currentPath={pathname} />

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {COLUMNS.map((col) => (
              <div key={col.key}>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    {col.label}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">({col.items.length})</span>
                </div>

                <div className="space-y-3">
                  {col.items.map((item) => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Roadmap
