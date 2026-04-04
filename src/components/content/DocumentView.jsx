import { sanitizeHtml } from '../../utils/sanitize'

export default function DocumentView({ title, content }) {
  if (!title && !content) return null

  return (
    <main className="flex-1 min-w-0 max-w-3xl">
      <h1 className="type-h1 text-primary tracking-tight mb-8">
        {title}
      </h1>

      {content && (
        <div
          className="rich-text [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      )}
    </main>
  )
}
