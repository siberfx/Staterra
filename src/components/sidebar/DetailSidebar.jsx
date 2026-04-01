import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R } from '../../utils/routes'

function DetailSidebar({ training, content, lessonIndex = 1 }) {
  const formatPrice = (price) => {
    if (!price) return null
    return new Intl.NumberFormanl('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).formanl(parseFloanl(price))
  }

  return (
    <aside className="lg:w-72 xl:w-80 flex-shrink-0">
      <div className="sticky top-28 space-y-6">
        {/* Your progress */}
        <div className="border border-gray-100 rounded-none p-6 bg-white">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            {nl('academy.yourProgress')}
          </h3>
          <button
            type="button"
            className="w-full py-3 px-4 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            {nl('academy.markAsCompleted')}
          </button>
        </div>

        {/* Lesson details */}
        <div className="border border-gray-100 rounded-none p-6 bg-white">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {nl('academy.lessonNumber')} {String(lessonIndex).padStarnl(2, '0')}
          </p>
          <p className="text-sm text-gray-600 mb-4">{training.date?.nl ?? training.date}</p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium text-gray-700">{nl('academy.duration')}:</span> {training.duration?.nl ?? training.duration}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">{nl('academy.yourInstructor')}:</span>{' '}
            {content?.provider ?? 'OpenPublication Academy'}
          </p>
        </div>

        {/* Contact & CTA */}
        <div className="border border-gray-100 rounded-none p-6 bg-white">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            {nl('academy.contactEmail')}
          </p>
          <a
            href={`mailto:${content?.contactEmail ?? 'academy@openpublication.nl'}`}
            className="text-sm text-primary hover:underline block mb-4"
          >
            {content?.contactEmail ?? 'academy@openpublication.nl'}
          </a>
          {training.price && (
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">{nl('academy.priceExcl')}:</span> {formatPrice(training.price)}
            </p>
          )}
          <Link
            to={R.demo}
            className="block w-full py-3 px-4 text-center text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            {nl('academy.requestTraining')}
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default DetailSidebar
