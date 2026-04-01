/**
 * Resolves relative media URLs against the API origin.
 * Full URLs (http/https) are returned as-is.
 * Relative paths (e.g. /front/images/blog.png) get the API origin prepended.
 */

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const API_ORIGIN = (() => {
  try { return new URL(API_URL).origin } catch { return '' }
})()

export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return null
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (url.startsWith('/') && API_ORIGIN) return `${API_ORIGIN}${url}`
  return url
}
