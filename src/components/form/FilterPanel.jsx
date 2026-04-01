import { useState } from 'react'
import { nl } from '../../translations'
import { academyCategories, academyTypes } from '../../data/academy'

function FilterPanel({ category, type, difficulty, onCategoryChange, onTypeChange, onDifficultyChange }) {
  const [catOpen, setCatOpen] = useState(true)
  const [typeOpen, setTypeOpen] = useState(true)
  const [diffOpen, setDiffOpen] = useState(true)

  const difficulties = [
    { id: 'beginner', key: 'beginner' },
    { id: 'intermediate', key: 'intermediate' },
    { id: 'advanced', key: 'advanced' },
  ]

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-gray-50/80 rounded-none border border-gray-100 p-6 space-y-6 sticky top-28">
        <div>
          <button
            type="button"
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center justify-between w-full text-sm font-bold text-gray-800 uppercase tracking-wider mb-3"
          >
            {nl('academy.filterCategory')}
            <span className={`material-symbols-outlined text-lg transition-transform ${catOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          {catOpen && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={category === null}
                  onChange={() => onCategoryChange(null)}
                  className="border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{nl('academy.filterAll')}</span>
              </label>
              {academyCategories.map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === c.id}
                    onChange={() => onCategoryChange(c.id)}
                    className="border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{nl(`academy.category.${c.key}`)}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setTypeOpen(!typeOpen)}
            className="flex items-center justify-between w-full text-sm font-bold text-gray-800 uppercase tracking-wider mb-3"
          >
            {nl('academy.filterType')}
            <span className={`material-symbols-outlined text-lg transition-transform ${typeOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          {typeOpen && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === null}
                  onChange={() => onTypeChange(null)}
                  className="border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{nl('academy.filterAll')}</span>
              </label>
              {academyTypes.map((tpe) => (
                <label key={tpe.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={type === tpe.id}
                    onChange={() => onTypeChange(tpe.id)}
                    className="border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{nl(`academy.type.${tpe.key}`)}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setDiffOpen(!diffOpen)}
            className="flex items-center justify-between w-full text-sm font-bold text-gray-800 uppercase tracking-wider mb-3"
          >
            {nl('academy.filterDifficulty')}
            <span className={`material-symbols-outlined text-lg transition-transform ${diffOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          {diffOpen && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  checked={difficulty === null}
                  onChange={() => onDifficultyChange(null)}
                  className="border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{nl('academy.filterAll')}</span>
              </label>
              {difficulties.map((d) => (
                <label key={d.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    checked={difficulty === d.id}
                    onChange={() => onDifficultyChange(d.id)}
                    className="border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{nl(`academy.difficulty.${d.key}`)}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default FilterPanel
