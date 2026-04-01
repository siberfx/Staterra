import { Link } from 'react-router-dom'
import { R } from '../../utils/routes'

function ArticlePlaceholder({ article }) {
  const hasImage = article.image || article.placeholder

  return (
    <div className="space-y-8">
      {hasImage && (
        <figure className="my-12 -mx-4 sm:mx-0">
          {article.image ? (
            <img
              src={article.image}
              alt=""
              className="w-full h-[280px] sm:h-[360px] object-cover rounded-none"
            />
          ) : (
            <div
              className="w-full h-[280px] sm:h-[360px] flex items-center justify-center"
              style={{ backgroundColor: article.placeholder?.color ?? '#1e3a5f' }}
            >
              {article.placeholder?.icon && (
                <span className="material-symbols-outlined text-white text-6xl opacity-80">
                  {article.placeholder.icon}
                </span>
              )}
              {article.placeholder?.label && !article.placeholder?.icon && (
                <span className="font-serif italic text-2xl text-white">
                  {article.placeholder.label}
                </span>
              )}
            </div>
          )}
        </figure>
      )}

      <p className="text-xl leading-relaxed text-gray-600 font-normal">
        Dit artikel wordt momenteel voorbereid. Binnenkort vindt u hier uitgebreide informatie over
        dit onderwerp.
      </p>

      <div className="border-l-4 border-gray-200 pl-6 py-4 my-8">
        <p className="text-gray-500 text-sm">
          Heeft u vragen? Neem contact met ons op via{' '}
          <Link to={R.contact} className="text-black hover:underline">
            contact@openpublication.nl
          </Link>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-12 p-6 bg-gray-50 border border-gray-100">
        <div>
          <h3 className="font-bold text-black mb-2">Gerelateerde onderwerpen</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Digitaal archiefbeheer</li>
            <li>• Woo-verzoeken</li>
            <li>• AVG-compliance</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-black mb-2">Meer lezen</h3>
          <p className="text-gray-600 text-sm">
            Bekijk onze andere succesverhalen in de{' '}
            <Link to={R.kennisbank} className="text-black hover:underline">
              Kennisbank
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArticlePlaceholder
