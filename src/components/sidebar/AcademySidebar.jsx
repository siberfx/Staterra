import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'
import { FaIcon } from '../Icons/FaIcon'

const navItem = (to, label, icon, isActive) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <FaIcon icon={icon} className="text-lg" />
    {label}
  </Link>
)

function AcademySidebar({ activeMenu = 'dashboard' }) {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="space-y-8 sticky top-28">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {nl('academy.menuTitle')}
          </h3>
          <nav className="space-y-0.5">
            {navItem(R.academy, nl('academy.dashboard'), 'th-large', activeMenu === 'dashboard')}
            {navItem(R.academyLiveSessions, nl('academy.agendaLiveSessions'), 'calendar', activeMenu === 'liveSessions')}
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default AcademySidebar
