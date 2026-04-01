/**
 * Tech Stack API
 * GET /api/tech-stack - single tech stack record with data array of link items
 */

import { get } from './api'

export async function getTechStack() {
  const res = await get('tech-stack')
  return res
}
