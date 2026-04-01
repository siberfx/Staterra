/**
 * Settings API
 * GET /settings – site, theme, seo, contact, cookie, hero, header, footer, external_codes
 * external_codes: { header: [], body: [] } – scripts for <head> and before </body>
 */

import { get } from './api'

export async function getSettings() {
  const base = import.meta.env.VITE_API_URL?.trim()
  if (!base) return {}
  const data = await get('settings')
  return {
    site: data?.site ?? {},
    theme: data?.theme ?? {},
    seo: data?.seo ?? {},
    contact: data?.contact ?? {},
    cookie: data?.cookie ?? {},
    hero: data?.hero ?? {},
    header: data?.header ?? {},
    footer: data?.footer ?? {},
    external_codes: data?.external_codes ?? { header: [], body: [] },
  }
}
