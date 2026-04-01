import { nl } from '../../translations'

function BlogCommentItem({ comment, onLike, onDislike, likingId }) {
  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-medium text-gray-900">{comment.author_name}</span>
        <span className="text-sm text-gray-500">
          {comment.created_at ? new Date(comment.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
        </span>
      </div>
      <p className="text-gray-600">{comment.body}</p>
      <div className="flex items-center gap-4 mt-2">
        <button
          type="button"
          onClick={() => onLike(comment.id)}
          disabled={likingId === comment.id}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
          aria-label={nl('blog.likes')}
        >
          <span className="material-symbols-outlined text-lg">thumb_up</span>
          <span>{comment.likes ?? 0}</span>
        </button>
        <button
          type="button"
          onClick={() => onDislike(comment.id)}
          disabled={likingId === comment.id}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
          aria-label={nl('blog.dislikes')}
        >
          <span className="material-symbols-outlined text-lg">thumb_down</span>
          <span>{comment.dislikes ?? 0}</span>
        </button>
      </div>
      {comment.replies?.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-gray-100 space-y-4">
          {comment.replies.map((r) => (
            <div key={r.id}>
              <div className="flex items-center gap-4 mb-1">
                <span className="font-medium text-gray-900 text-sm">{r.author_name}</span>
                <span className="text-xs text-gray-500">
                  {r.created_at ? new Date(r.created_at).toLocaleDateString('nl-NL') : ''}
                </span>
              </div>
              <p className="text-sm text-gray-600">{r.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentList({ comments = [], onLike, onDislike, likingId }) {
  return (
    <div className="space-y-6">
      {comments.map((c) => (
        <BlogCommentItem
          key={c.id}
          comment={c}
          onLike={onLike}
          onDislike={onDislike}
          likingId={likingId}
        />
      ))}
    </div>
  )
}
