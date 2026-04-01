/**
 * Changelog API
 * GET /changelog – paginated list (per_page, status=api|all)
 * GET /changelog/{slug} – single entry
 */

import { get } from './api'

/**
 * @param {{ per_page?: number, status?: 'api'|'all' }} params
 */
export async function getChangelogList(params = {}) {
  const data = await get('changelog', params)
  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 },
  }
}

export async function getChangelogEntry(slug) {
  const data = await get(`changelog/${slug}`)
  return data?.data ?? data
}
