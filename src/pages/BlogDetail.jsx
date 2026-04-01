import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { nl } from '../translations'
import { useSettings } from '../contexts/SiteContext'
import { getBlogPost, getCachedBlogPost, postComment, likeComment, dislikeComment } from '../services/blogService'
import { ApiError } from '../services/api'
import RelatedBlog from '../components/related/RelatedBlog'
import { DetailSkeleton } from '../components/placeholder'
import { DetailHeader, DetailImage, HtmlContent } from '../components/content'
import { CommentForm, CommentList } from '../components/comments'
import { NotFound } from '../components/placeholder'

function BlogDetail({ backRoute = '/blog', sectionLabel = 'Blog' } = {}) {
  const { slug } = useParams()
  const { settings } = useSettings()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  const [commentError, setCommentError] = useState(null)
  const [commentSuccess, setCommentSuccess] = useState(null)
  const [likingId, setLikingId] = useState(null)

  useEffect(() => {
    const cached = getCachedBlogPost(slug)
    setArticle(cached ?? null)
    setLoading(!cached)
    setNotFound(false)
  }, [slug])

  useEffect(() => {
    let cancelled = false
    getBlogPost(slug)
      .then((data) => {
        if (!cancelled) setArticle(data)
      })
      .catch((err) => {
        if (!cancelled && err instanceof ApiError && err.status === 404) {
          setNotFound(true)
        } else if (!cancelled) {
          setArticle(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (article) {
      const title = typeof article.title === 'object' ? article.title?.nl ?? article.title ?? '' : (article.title ?? '')
      const label = title || article.slug || nl('blog.article')
      const siteName = settings.site?.name || 'OpenPublication'
      document.title = `${label} - ${siteName}`
    }
  }, [article, settings.site?.name])

  const refetchArticle = useCallback(() => {
    getBlogPost(slug).then((data) => setArticle(data))
  }, [slug])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    const form = e.target
    const body = form.body?.value?.trim()
    const guestName = form.guest_name?.value?.trim()
    const guestEmail = form.guest_email?.value?.trim()
    if (!body || !slug) return
    setCommentSubmitting(true)
    setCommentError(null)
    setCommentSuccess(null)
    try {
      const res = await postComment({
        slug,
        body,
        guest_name: guestName || undefined,
        guest_email: guestEmail || undefined,
      })
      form.reset()
      setCommentSuccess(res?.message ?? null)
      refetchArticle()
    } catch (err) {
      const msg = err?.errors
        ? Object.values(err.errors).flat().join(' ')
        : (err?.message ?? nl('blog.commentError'))
      setCommentError(msg)
    } finally {
      setCommentSubmitting(false)
    }
  }

  const handleLike = async (commentId) => {
    if (likingId) return
    setLikingId(commentId)
    try {
      await likeComment(slug, commentId)
      refetchArticle()
    } catch {
      // ignore
    } finally {
      setLikingId(null)
    }
  }

  const handleDislike = async (commentId) => {
    if (likingId) return
    setLikingId(commentId)
    try {
      await dislikeComment(slug, commentId)
      refetchArticle()
    } catch {
      // ignore
    } finally {
      setLikingId(null)
    }
  }

  if (loading && !article) {
    return <DetailSkeleton />
  }

  if (notFound || !article) {
    return <NotFound backRoute={backRoute} backLabel={sectionLabel ? `Terug naar ${sectionLabel}` : undefined} />
  }

  const title = typeof article.title === 'object' ? article.title?.nl ?? article.title ?? '' : (article.title ?? '')
  const date = typeof article.date === 'object' ? article.date?.nl ?? article.date ?? '' : (article.date ?? '')
  const authorName = article.author?.name ?? article.author_name ?? null
  const authorAvatar = article.author?.avatar ?? article.author_avatar ?? null
  const category = article.category?.name ?? article.category ?? null
  const breadcrumbLabel = title || article.slug || nl('blog.article')

  return (
    <>
      <DetailHeader
        title={title}
        breadcrumbLabel={breadcrumbLabel}
        category={category}
        authorName={authorName}
        authorAvatar={authorAvatar}
        date={date}
        backRoute={backRoute}
        sectionLabel={sectionLabel}
      />
      <DetailImage src={article.image} alt={title} />
      <HtmlContent html={article.long_body} />
      <section className="container-page mb-24">
        <h2 className="text-2xl font-bold text-primary mb-8">{nl('blog.commentsTitle')}</h2>
        <CommentForm
          onSubmit={handleSubmitComment}
          submitting={commentSubmitting}
          success={commentSuccess}
          error={commentError}
        />
        <CommentList
          comments={article.comments}
          onLike={handleLike}
          onDislike={handleDislike}
          likingId={likingId}
        />
      </section>
      <RelatedBlog currentSlug={slug} postRoute={backRoute ? (s) => `${backRoute}/${s}` : undefined} />
    </>
  )
}

export default BlogDetail
