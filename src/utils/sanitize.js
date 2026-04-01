/**
 * HTML sanitization utilities for XSS prevention.
 * API content is sanitized before rendering to prevent malicious script injection.
 */

import DOMPurify from 'dompurify'

/** Trusted domains for external script injection (analytics, chat, etc.) */
const TRUSTED_SCRIPT_DOMAINS = [
  'www.googletagmanager.com',
  'googletagmanager.com',
  'www.google-analytics.com',
  'google-analytics.com',
  'connect.facebook.net',
  'platform.twitter.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'code.tidio.co',
  'tidio.co',
]

function isTrustedScriptUrl(url) {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url, 'https://example.com')
    const host = parsed.hostname?.toLowerCase() ?? ''
    return TRUSTED_SCRIPT_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

/**
 * Sanitize HTML content for safe rendering (blog, pages, contact, changelog).
 * Allows safe tags: a, p, h1-h6, ul, ol, li, strong, em, blockquote, img, etc.
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'a', 'p', 'br', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'u', 'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'hr', 'sub', 'sup',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
    ADD_ATTR: ['target'],
  })
}

/**
 * Filter external code items: only inject scripts from trusted domains.
 * Inline scripts (textContent) are skipped for security.
 */
export function filterTrustedScripts(html) {
  if (!html || typeof html !== 'string') return ''
  const div = document.createElement('div')
  div.innerHTML = html
  const scripts = div.querySelectorAll('script')
  const safeScripts = []
  scripts.forEach((s) => {
    if (s.src && isTrustedScriptUrl(s.src)) {
      safeScripts.push({ src: s.src, async: s.async, defer: s.defer })
    }
  })
  return safeScripts
}

/**
 * Inject only trusted external scripts into the DOM.
 */
export function injectTrustedScripts(scripts, target) {
  if (!target || !Array.isArray(scripts)) return
  scripts.forEach(({ src, async, defer }) => {
    const el = document.createElement('script')
    el.src = src
    if (async) el.async = true
    if (defer) el.defer = true
    target.appendChild(el)
  })
}
