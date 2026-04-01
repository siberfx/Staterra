/**
 * Search API
 * GET /api/search - full search (q, type, per_page, page)
 * GET /api/search/suggestions - autocomplete (q, min 2 chars)
 */

import { get } from './api'
import { toFrontendUrl } from '../utils/routes'

function toPath(url) {
  if (!url || typeof url !== 'string') return null
  try {
    if (url.startsWith('http')) {
      const u = new URL(url)
      return u.pathname
    }
    return url.startsWith('/') ? url : `/${url}`
  } catch {
    return url
  }
}

/**
 * Full search
 * @param {{ q: string, type?: string, per_page?: number, page?: number }} params
 */
export async function search(params) {
  const { q = '', type = 'all', per_page = 15, page = 1 } = params ?? {}
  const res = await get('/search', { q: q.trim(), type, per_page, page })
  const data = (res?.data ?? []).map((item) => ({
    ...item,
    url: toFrontendUrl(toPath(item.url)) ?? item.url,
  }))
  return { ...res, data }
}

/**
 * Search suggestions (autocomplete, min 2 chars)
 * @param {string} q
 */
export async function getSuggestions(q) {
  const trimmed = (q ?? '').trim()
  if (trimmed.length < 2) return { suggestions: [], mostSearched: [] }
  const res = await get('/search/suggestions', { q: trimmed })
  const suggestions = (res?.suggestions ?? []).map((s) => ({
    ...s,
    url: toFrontendUrl(toPath(s.url)) ?? s.url,
  }))
  const mostSearched = (res?.mostSearched ?? []).map((m) => ({
    ...m,
    url: m.url ? (toFrontendUrl(toPath(m.url)) ?? m.url) : null,
  }))
  return { suggestions, mostSearched }
}
