/**
 * Partners API
 * GET /api/partners - single partners record with data array of link items
 */

import { get } from './api'

export async function getPartners() {
  const res = await get('partners')
  return res
}
