/**
 * Converts menu item URLs to clean frontend routes (no /api prefix).
 */

import { toFrontendUrl } from './routes'

export function toNavUrl(item) {
  const { url, slug } = item ?? {}
  if (url && (url.startsWith('http') || url.startsWith('mailto:'))) return url
  if (url && url.startsWith('/')) return toFrontendUrl(url) ?? url
  if (url) return toFrontendUrl(`/${url}`) ?? `/${url}`
  if (slug) return slug.startsWith('/') ? slug : `/${slug}`
  return '#'
}
