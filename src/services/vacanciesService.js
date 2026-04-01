/**
 * Vacancies API
 * GET /vacancies – paginated list with filters
 * GET /vacancies/{slug} – single vacancy
 * GET /vacancies/{slug}/apply – vacancy for form
 * POST /vacancies/{slug}/apply – submit application
 */

import { get, post } from './api'

export async function getVacancies(params = {}) {
  const data = await get('vacancies', params)
  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 },
    filters: data?.filters ?? { departments: [], locations: [], categories: [] },
  }
}

export async function getVacancy(slug) {
  const data = await get(`vacancies/${slug}`)
  return data?.data ?? null
}

export async function getVacancyApply(slug) {
  const data = await get(`vacancies/${slug}/apply`)
  return data?.data ?? null
}

export async function submitApplication(slug, payload) {
  const data = await post(`vacancies/${slug}/apply`, payload)
  return data
}
