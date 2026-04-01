import { nl } from '../../translations'
import { FaIcon } from '../Icons/FaIcon'

const stats = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label', icon: 'business' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label', icon: 'speed' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label', icon: 'schedule' },
]

function StatsBar() {
  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.valueKey}
              className={`flex flex-col items-center text-center py-8 ${
                i < stats.length - 1 ? 'md:border-r md:border-gray-200' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FaIcon icon={stat.icon} className="text-primary text-xl" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums">
                {nl(`solutions.${stat.valueKey}`)}
              </div>
              <p className="text-gray-600 font-medium">{nl(`solutions.${stat.labelKey}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
