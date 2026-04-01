import { get } from './api'

let cache = null

export async function getHomepage() {
  if (cache) return cache
  const data = await get('homepage')
  cache = data ?? {}
  return cache
}

export function getCachedHomepage() {
  return cache
}
