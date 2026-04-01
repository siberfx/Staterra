import { FaIcon } from '../Icons/FaIcon'

function ComparisonSection({ data }) {
  const leftTitle = data?.left_title ?? ''
  const leftItems = data?.left_items ?? []
  const rightTitle = data?.right_title ?? ''
  const rightItems = data?.right_items ?? []

  if (!leftTitle && !rightTitle && leftItems.length === 0 && rightItems.length === 0) return null

  return (
    <section id="voordelen" className="py-20 lg:py-28 bg-gray-50/60 scroll-mt-24">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="p-8 lg:p-10 bg-white border-l-4 border-l-primary">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
                <FaIcon icon="admin_panel_settings" className="text-primary text-xl" />
              </div>
              {leftTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {leftItems.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-primary/5 border border-primary/15 text-gray-700"
                >
                  <FaIcon icon="check" className="text-primary flex-shrink-0" />
                  {typeof item === 'string' ? item : item.trim?.() ?? item}
                </span>
              ))}
            </div>
          </div>
          <div className="p-8 lg:p-10 bg-white border-l-4 border-l-secondary">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-secondary/10">
                <FaIcon icon="person" className="text-secondary text-xl" />
              </div>
              {rightTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {rightItems.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-secondary/5 border border-secondary/15 text-gray-700"
                >
                  <FaIcon icon="check" className="text-secondary flex-shrink-0" />
                  {typeof item === 'string' ? item : item.trim?.() ?? item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection
