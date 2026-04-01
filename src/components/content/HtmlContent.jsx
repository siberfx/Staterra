import { nl } from '../../translations'
import { sanitizeHtml } from '../../utils/sanitize'

export default function HtmlContent({ html }) {
  return (
    <article className="container-page mb-24">
      {html ? (
        <div
          className="prose prose-lg prose-headings:font-bold prose-headings:text-black prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-black hover:prose-a:text-gray-600 max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
      ) : (
        <p className="text-gray-500">{nl('blog.placeholderText')}</p>
      )}
    </article>
  )
}
