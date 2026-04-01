/**
 * Solutions API (Starterra)
 * GET /solutions – list solutions (data array)
 * GET /solutions/{anchor} – single solution by anchor
 * Hierarchy: solution → feature → module
 */

import { get } from './api'

export async function getSolutions() {
  const res = await get('solutions')
  const data = res?.data ?? []
  return Array.isArray(data) ? data : []
}

export async function getSolutionByAnchor(anchor) {
  const res = await get(`solutions/${anchor}`)
  return res?.data ?? res ?? null
}
