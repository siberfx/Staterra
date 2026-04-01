/**
 * Blog API
 * GET /blog – paginated list (page, per_page, search, category)
 * GET /blog/{slug} – single post with comments
 * POST /blog/{slug}/comments – add comment (form-urlencoded: body, parent_id?, guest_name?, guest_email?, hp_phone)
 * POST /blog/{slug}/comments/{comment}/like – like comment
 * POST /blog/{slug}/comments/{comment}/dislike – dislike comment
 */

import { get, post } from './api'

const listCache = { key: null, value: null }
const postCache = new Map()

export async function getBlogPosts(limit = 3) {
  const res = await get('blog', { page: 1, per_page: limit })
  return res?.data ?? []
}

export async function getBlogPost(slug) {
  const res = await get(`blog/${slug}`)
  const post = res?.data ?? res
  if (post && slug) postCache.set(slug, post)
  return post
}

export function getCachedBlogPost(slug) {
  return slug ? postCache.get(slug) : null
}

/**
 * @param {{ page?: number, per_page?: number, search?: string, category?: string }} params
 */
export async function getBlogList(params = {}) {
  const res = await get('blog', {
    page: params.page ?? 1,
    per_page: params.per_page ?? 50,
    ...(params.search && { search: params.search }),
    ...(params.category && { category: params.category }),
  })
  const result = {
    data: res?.data ?? [],
    hasMore: res?.has_more ?? false,
    nextPage: res?.next_page ?? null,
  }
  if (params.page === 1 && !params.search && !params.category) {
    listCache.key = 'default'
    listCache.value = result
  }
  return result
}

export function getCachedBlogList() {
  return listCache.key ? listCache.value : null
}

export function prefetchBlogList() {
  if (listCache.key) return
  getBlogList({ page: 1, per_page: 50 }).catch(() => {})
}

/**
 * @param {{ slug: string, body: string, parent_id?: number, guest_name?: string, guest_email?: string }} data
 */
export async function postComment(data) {
  const params = new URLSearchParams()
  params.set('body', data.body)
  if (data.parent_id != null) params.set('parent_id', String(data.parent_id))
  if (data.guest_name) params.set('guest_name', data.guest_name)
  if (data.guest_email) params.set('guest_email', data.guest_email)
  params.set('hp_phone', '') // honeypot
  const res = await post(`blog/${data.slug}/comments`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return res
}

export async function likeComment(slug, commentId) {
  const res = await post(`blog/${slug}/comments/${commentId}/like`)
  return res
}

export async function dislikeComment(slug, commentId) {
  const res = await post(`blog/${slug}/comments/${commentId}/dislike`)
  return res
}
