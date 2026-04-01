/**
 * Sitemap API
 * GET /api/sitemap – returns { data: [{ loc, priority }] }
 * API paths are converted to frontend routes.
 */

import { get } from './api'
import { R } from '../utils/routes'

const API_TO_FRONTEND = [
  [/^\/api\/blog$/, R.blog],
  [/^\/api\/blog\/(.+)$/, (_, s) => R.blogPost(s)],
  [/^\/api\/pages\/(.+)$/, (_, s) => R.page(s)],
  [/^\/api\/solutions$/, R.solutions],
  [/^\/api\/solutions\/(.+)$/, (_, s) => R.solution(s)],
  [/^\/api\/vacancies$/, R.vacancies],
  [/^\/api\/vacancies\/(.+)$/, (_, s) => R.vacancy(s)],
  [/^\/api\/contact$/, R.contact],
  [/^\/api\/academy\/?$/, R.academy],
  [/^\/api\/academy\/(.+)$/, (_, rest) => `/academy/${rest}`],
  [/^\/api\/changelog\/?$/, R.changelog],
  [/^\/api\/changelog\/(.+)$/, (_, s) => `${R.changelog}/${s}`],
  [/^\/api\/proefversie$/, R.demo],
  [/^\/api\/prijzen$/, '/prijzen'],
]

function apiPathToFrontend(apiPath) {
  for (const [pattern, replacement] of API_TO_FRONTEND) {
    const match = apiPath.match(pattern)
    if (match) {
      if (typeof replacement === 'function') {
        return replacement(...match.slice(1))
      }
      return replacement.replace(/\$1/g, match[1] ?? '')
    }
  }
  return null
}

export async function getSitemap() {
  const data = await get('sitemap')
  const items = data?.data ?? []
  return items
    .map(({ loc, priority }) => {
      const path = apiPathToFrontend(loc)
      return path ? { loc: path, priority: priority ?? '0.5' } : null
    })
    .filter(Boolean)
}
