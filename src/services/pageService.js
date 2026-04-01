/**
 * Dynamic CMS Pages API
 * GET /pages/{slug} – headless CMS page content
 */

import { get } from './api'

export async function getPage(slug) {
  const res = await get(`pages/${slug}`)
  return res?.data ?? res
}
