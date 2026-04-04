function resolveText(obj) {
  if (typeof obj === 'string') return obj
  if (obj && typeof obj === 'object' && (obj.nl || obj.en)) {
    return obj?.nl ?? obj?.en ?? ''
  }
  return ''
}

function BlockRenderer({ content, showLead = true }) {
  if (!content?.body) return null

  const getText = (val) => resolveText(val)

  return (
    <div className="rich-text">
      {showLead && content.lead && (
        <p className="type-body-lg text-gray-600 font-normal mb-10">
          {getText(content.lead)}
        </p>
      )}
      {content.body.map((block, i) => {
        const text = getText(block.content)
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="type-h2 text-black mt-12 mb-4">
              {text}
            </h2>
          )
        }
        if (block.type === 'h3') {
          return (
            <h3 key={i} className="type-h3 text-black mt-8 mb-3">
              {text}
            </h3>
          )
        }
        if (block.type === 'p') {
          return (
            <p key={i} className="type-body text-gray-600 mb-4">
              {text}
            </p>
          )
        }
        if (block.type === 'ul' && block.items) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-2 mb-8 text-gray-600">
              {block.items.map((item, j) => {
                const itemText = typeof item === 'object' ? resolveText(item) : item
                const colonIdx = typeof itemText === 'string' ? itemText.indexOf(':') : -1
                const label = colonIdx > 0 ? itemText.slice(0, colonIdx) : null
                const rest = colonIdx > 0 ? itemText.slice(colonIdx + 1).trim() : itemText
                return (
                  <li key={j}>
                    {label && <strong>{label}: </strong>}
                    {rest}
                  </li>
                )
              })}
            </ul>
          )
        }
        if (block.type === 'blockquote') {
          return (
            <blockquote key={i} className="my-8">
              <p className="type-h3 font-medium text-black border-l-4 border-black pl-4 py-2 italic">
                {text}
              </p>
            </blockquote>
          )
        }
        if (block.type === 'image') {
          return (
            <figure key={i} className="my-12">
              <img
                src={block.src}
                alt={block.alt ?? ''}
                className="w-full h-auto object-cover rounded-none"
              />
              {block.caption && (
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  {getText(block.caption)}
                </figcaption>
              )}
            </figure>
          )
        }
        return null
      })}
    </div>
  )
}

export default BlockRenderer
