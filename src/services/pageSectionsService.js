import { get } from './api'

/**
 * GET /api/page-sections?page={pageId}
 * @param {string} page - e.g. homepage | oplossingen | samen-ontwikkelen
 * @returns {Promise<Array<{ id: number, page: string, section_key: string, section_name: string, sort_order: number, content: object }>>}
 */
export async function getPageSections(page) {
  if (!page || typeof page !== 'string') return []
  try {
    const raw = await get('page-sections', { page: page.trim() })
    const list = Array.isArray(raw) ? raw : raw?.data ?? []
    if (!Array.isArray(list)) return []
    return [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  } catch {
    return []
  }
}

/**
 * Secties op section_key geïndexeerd.
 */
export function pageSectionsByKey(sections) {
  const map = {}
  for (const s of sections ?? []) {
    if (s?.section_key) map[s.section_key] = s.content ?? {}
  }
  return map
}

/**
 * Sorteer op sort_order; bij gelijke order op positie in sectionKeysOrder.
 */
export function sortPageSections(list, sectionKeysOrder = []) {
  const idx = (k) => {
    const i = sectionKeysOrder.indexOf(k)
    return i === -1 ? 999 : i
  }
  return [...(list ?? [])].sort((a, b) => {
    const ao = a.sort_order ?? 0
    const bo = b.sort_order ?? 0
    if (ao !== bo) return ao - bo
    return idx(a.section_key) - idx(b.section_key)
  })
}
