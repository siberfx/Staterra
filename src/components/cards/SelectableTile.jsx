import { nl } from '../../translations'
import { FaIcon } from '../Icons/FaIcon'

function SelectableTile({ category, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(category.id)}
      className={`group w-full text-left rounded-none overflow-hidden transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-primary ring-offset-2 shadow-lg scale-[1.02]'
          : 'hover:shadow-md hover:scale-[1.01]'
      }`}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {category.image ? (
          <img src={category.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: category.placeholder?.color ?? '#1e3a5f' }}
          >
            <FaIcon icon={category.placeholder?.icon} className="text-white text-5xl opacity-90" />
          </div>
        )}
      </div>
      <div className="p-6 bg-white border border-gray-100 border-l-4 border-l-primary">
        <span className="font-semibold text-primary flex items-center justify-between">
          {nl(`academy.category.${category.key}`)}
          <FaIcon icon="expand_more" className={`text-xl transition-transform ${isActive ? 'rotate-180' : ''}`} />
        </span>
      </div>
    </button>
  )
}

export default SelectableTile
