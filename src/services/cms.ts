import type {
  SettingsResponse,
  HeaderMenuResponse,
  FooterMenuResponse,
  HomepageResponse,
  SolutionsListResponse,
  SolutionDetail,
  Page,
  ContactResponse,
  ContactSubject,
  BlogPost,
  BlogListResponse,
  PaginatedResponse,
  LegalPage,
} from '@/lib/types'

// In dev: gebruik de Vite proxy (/api → CMS) om CORS te vermijden
// In productie: directe URL naar de CMS
const isDev = import.meta.env.DEV
const FULL_CMS_URL = import.meta.env.VITE_API_URL || 'https://studio.staterra.nl'
const CMS_URL = isDev ? '' : FULL_CMS_URL

const CMS_ORIGIN = (() => {
  try { return new URL(FULL_CMS_URL).origin } catch { return FULL_CMS_URL }
})()

// ── Media URL resolver ───────────────────────────────────────
const MEDIA_KEYS = new Set([
  'image', 'image_url', 'thumbnail', 'thumbnail_url',
  'avatar', 'author_avatar', 'logo', 'favicon', 'cover',
  'hero_background', 'og_image', 'banner', 'footer_logo',
])

function resolveMediaUrls<T>(obj: T): T {
  if (!obj || typeof obj !== 'object' || !CMS_ORIGIN) return obj
  if (Array.isArray(obj)) { obj.forEach(resolveMediaUrls); return obj }
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (typeof v === 'string' && MEDIA_KEYS.has(k) && v.startsWith('/') && !v.startsWith('//')) {
      (obj as Record<string, unknown>)[k] = `${CMS_ORIGIN}${v}`
    } else if (v && typeof v === 'object') {
      resolveMediaUrls(v)
    }
  }
  return obj
}

// ── Basis fetch ──────────────────────────────────────────────

async function fetchCMS<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${CMS_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`CMS fout ${res.status} bij ${endpoint}`)
  const data = await res.json() as T
  return resolveMediaUrls(data)
}

async function fetchCMSSafe<T>(endpoint: string): Promise<T | null> {
  try {
    return await fetchCMS<T>(endpoint)
  } catch (err) {
    console.warn(`CMS fetch mislukt (${endpoint}):`, err)
    return null
  }
}

// ── Instellingen ─────────────────────────────────────────────

export async function getSettings(): Promise<SettingsResponse | null> {
  return fetchCMSSafe<SettingsResponse>('/api/settings')
}

// ── Navigatiemenu's ──────────────────────────────────────────

export async function getHeaderMenu(): Promise<HeaderMenuResponse | null> {
  return fetchCMSSafe<HeaderMenuResponse>('/api/menus/header')
}

export async function getFooterMenu(): Promise<FooterMenuResponse | null> {
  return fetchCMSSafe<FooterMenuResponse>('/api/menus/footer')
}

// ── Homepage ─────────────────────────────────────────────────

export async function getHomepage(): Promise<HomepageResponse | null> {
  return fetchCMSSafe<HomepageResponse>('/api/homepage')
}

// ── Oplossingen ──────────────────────────────────────────────

export async function getSolutions(): Promise<SolutionsListResponse | null> {
  return fetchCMSSafe<SolutionsListResponse>('/api/solutions')
}

export async function getSolution(anchor: string): Promise<SolutionDetail | null> {
  const res = await fetchCMSSafe<{ data: SolutionDetail }>(`/api/solutions/${anchor}`)
  return res?.data ?? null
}

// ── Pagina's ─────────────────────────────────────────────────

export async function getPages(): Promise<PaginatedResponse<Page> | null> {
  return fetchCMSSafe<PaginatedResponse<Page>>('/api/pages')
}

export async function getPage(slug: string): Promise<Page | null> {
  const normalized = slug.startsWith('/') ? slug.slice(1) : slug
  const res = await fetchCMSSafe<{ data: Page } | Page>(`/api/pages/${normalized}`)
  if (!res) return null
  return (res as { data: Page }).data ?? (res as Page)
}

// ── Contact ──────────────────────────────────────────────────

export async function getContact(): Promise<ContactResponse | null> {
  return fetchCMSSafe<ContactResponse>('/api/contact')
}

export async function getContactSubjects(): Promise<ContactSubject[] | null> {
  return fetchCMSSafe<ContactSubject[]>('/api/contact/subjects')
}

export async function submitContactForm(
  formData: Record<string, string | boolean>
): Promise<{ success: boolean; message?: string }> {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(formData)) {
    body.append(key, String(value))
  }

  const res = await fetch(`${CMS_URL}/api/contact/verstuur`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  if (!res.ok) {
    return { success: false, message: 'Er is een fout opgetreden. Probeer het later opnieuw.' }
  }

  return { success: true }
}

// ── Blog / Kennisbank ────────────────────────────────────────

export async function getBlogPosts(perPage = 25, page = 1): Promise<BlogListResponse | null> {
  return fetchCMSSafe<BlogListResponse>(`/api/blog?per_page=${perPage}&page=${page}`)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return fetchCMSSafe<BlogPost>(`/api/blog/${slug}`)
}

// ── Legal pagina's ───────────────────────────────────────────

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return fetchCMSSafe<LegalPage>(`/api/legal/${slug}`)
}

// ── Menu URL → Frontend route ────────────────────────────────

const PAGE_SLUG_MAP: Record<string, string> = {
  'contact': '/contact',
  'aanpak': '/aanpak',
  'over-ons': '/over-ons',
  'dienstverlening': '/dienstverlening',
  'kennisbank': '/kennisbank',
  'open-source': '/open-source',
}

const LEGAL_SLUG_MAP: Record<string, string> = {
  'privacybeleid-pagina': '/privacy',
  'privacy': '/privacy',
  'cookiebeleid': '/cookies',
  'algemene-voorwaarden': '/legal/algemene-voorwaarden',
}

export function mapMenuUrl(url: string): string {
  if (!url) return '/'

  const solutionMatch = url.match(/^\/api\/solutions\/(.+)$/)
  if (solutionMatch) return `/${solutionMatch[1]}`

  const pageMatch = url.match(/^\/api\/pages\/\/*(.*)$/)
  if (pageMatch) {
    const slug = pageMatch[1].replace(/^\/+/, '')
    if (!slug) return '/'
    return PAGE_SLUG_MAP[slug] ?? `/${slug}`
  }

  const legalMatch = url.match(/^\/api\/legal\/(.+)$/)
  if (legalMatch) {
    const slug = legalMatch[1]
    return LEGAL_SLUG_MAP[slug] ?? `/legal/${slug}`
  }

  return url
}
