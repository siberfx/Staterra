import { FaIcon } from '../Icons/FaIcon'
import { resolveMediaUrl } from '../../utils/media'
import { sanitizeHtml } from '../../utils/sanitize'

function getRemainingBody(body, featureCount = 3) {
  if (!body?.length) return []
  let skipped = 0
  const result = []
  for (let i = 0; i < body.length; i++) {
    if (body[i].type === 'h2' && body[i + 1]?.type === 'p') {
      if (skipped < featureCount) {
        skipped++
        i++
        continue
      }
    }
    result.push(body[i])
  }
  return result
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'

export default function SplitContent({ solution, content, title, image, imageAlt }) {
  const listItems = solution?.list_items ?? content?.body?.find((b) => b.type === 'ul')?.items ?? []
  const longBody = solution?.long_body
  const remaining = getRemainingBody(content?.body)
  const hasApiContent = longBody || (Array.isArray(listItems) && listItems.length > 0)
  const hasLegacyContent = remaining.length > 0

  if (!hasApiContent && !hasLegacyContent) return null

  const imgSrc = image ?? resolveMediaUrl(solution?.image) ?? content?.contentImage ?? DEFAULT_IMAGE
  const imgAlt = imageAlt ?? content?.contentImageAlt ?? title ?? ''
  const imageRight = solution?.image_position === 'right'

  const imageBlock = (
    <div className="flex flex-col gap-6">
      <h2 className="type-h2 text-gray-900 tracking-tight">
        {title}
      </h2>
      <div className="flex-1 min-h-0">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full min-h-[280px] object-cover shadow-sm"
        />
      </div>
    </div>
  )

  const contentBlock = (
    <div className="space-y-6">
      {longBody ? (
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(longBody) }}
        />
      ) : null}
      {Array.isArray(listItems) && listItems.length > 0 ? (
        <ul className="list-none pl-0 space-y-3">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 bg-primary flex items-center justify-center mt-0.5 rounded">
                <FaIcon icon="check" className="text-white text-xs" />
              </span>
              <span className="type-body text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {!longBody &&
        remaining.map((block, i) => {
          if (block.type === 'h2') {
            return (
              <h3 key={i} className="type-h3 text-gray-900">
                {block.content}
              </h3>
            )
          }
          if (block.type === 'p') {
            return (
              <p key={i} className="type-body text-gray-600">
                {block.content}
              </p>
            )
          }
          if (block.type === 'ul') {
            return (
              <ul key={i} className="list-none pl-0 space-y-3">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary flex items-center justify-center mt-0.5 rounded">
                      <FaIcon icon="check" className="text-white text-xs" />
                    </span>
                    <span className="type-body text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            )
          }
          return null
        })}
    </div>
  )

  return (
    <section className="py-20 md:py-24 bg-gray-50/50 border-t border-gray-100">
      <div className="container-page">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch ${imageRight ? 'lg:flex-row-reverse' : ''}`}
        >
          {imageRight ? (
            <>
              {contentBlock}
              {imageBlock}
            </>
          ) : (
            <>
              {imageBlock}
              {contentBlock}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
