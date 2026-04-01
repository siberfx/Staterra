import { sanitizeHtml } from '../../utils/sanitize'

export default function DocumentView({ title, content }) {
  if (!title && !content) return null

  return (
    <main className="flex-1 min-w-0 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-normal text-primary tracking-tight mb-8">
        {title}
      </h1>

      {content && (
        <div
          className="prose prose-lg prose-headings:font-bold prose-headings:text-primary prose-p:text-gray-600 prose-p:leading-relaxed max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      )}
    </main>
  )
}
