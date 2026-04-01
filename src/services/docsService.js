/**
 * Docs API
 * GET /api/docs - list sections with pages
 * GET /api/docs/{section}/{page} - single doc page
 * GET /api/docs/search - search (q, per_page)
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
 * List doc sections with pages tree
 */
export async function getDocsList() {
  const res = await get('docs')
  const data = (res?.data ?? []).map((section) => ({
    ...section,
    pages: (section.pages ?? []).map((p) => ({
      ...p,
      url: toFrontendUrl(toPath(p.url)) ?? p.url,
    })),
  }))
  return { ...res, data }
}

/**
 * Single doc page by section and page slugs
 */
export async function getDocPage(section, page) {
  return get(`docs/${section}/${page}`)
}

/**
 * Search doc pages (q min 2 chars, per_page default 20)
 */
export async function searchDocs(q, per_page = 20) {
  const trimmed = (q ?? '').trim()
  if (trimmed.length < 2) return { data: [], query: '', count: 0, meta: null }
  const res = await get('docs/search', { q: trimmed, per_page })
  const data = (res?.data ?? []).map((item) => ({
    ...item,
    url: toFrontendUrl(toPath(item.url)) ?? item.url,
  }))
  return { ...res, data }
}
