import { nl } from '../../translations'
import { sanitizeHtml } from '../../utils/sanitize'

export default function HtmlContent({ html }) {
  return (
    <article className="container-page mb-24">
      {html ? (
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
      ) : (
        <p className="text-gray-500">{nl('blog.placeholderText')}</p>
      )}
    </article>
  )
}
