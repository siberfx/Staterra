import { FaIcon } from '../Icons/FaIcon'

export default function ChecklistContent({ content }) {
  if (!content?.body) return null

  return (
    <div className="rich-text">
      <p className="type-body-lg text-gray-600 font-normal mb-10">{content.lead}</p>
      {content.body.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="type-h2 text-black mt-12 mb-4">
              {block.content}
            </h2>
          )
        }
        if (block.type === 'p') {
          return (
            <p key={i} className="type-body text-gray-600 mb-4">
              {block.content}
            </p>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="list-none pl-0 space-y-3 my-8">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5">
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
}
