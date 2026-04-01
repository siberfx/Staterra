import { nl } from '../../translations'

export default function CommentForm({ onSubmit, submitting, success, error }) {
  return (
    <form onSubmit={onSubmit} className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
      <div className="mb-4">
        <textarea
          name="body"
          placeholder={nl('blog.commentPlaceholder')}
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          name="guest_name"
          type="text"
          placeholder={nl('blog.namePlaceholder')}
          required
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
        <input
          name="guest_email"
          type="email"
          placeholder={nl('blog.emailPlaceholder')}
          required
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      </div>
      {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
      {error && <p className="text-amber-600 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? nl('blog.loading') : nl('blog.submitComment')}
      </button>
    </form>
  )
}
