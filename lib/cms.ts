import type {
  SettingsResponse,
  HeaderMenuResponse,
  FooterMenuResponse,
  HomepageResponse,
  Solution,
  SolutionsListResponse,
  SolutionDetail,
  Page,
  ContactResponse,
  ContactSubject,
  BlogPost,
  BlogListResponse,
  PricingResponse,
  PartnerItem,
  SitemapResponse,
  LegalPage,
  PaginatedResponse,
} from './types';

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL || 'https://studio.staterra.nl';

const DEFAULT_REVALIDATE = 300; // 5 minuten

// ── Basis fetch-functie ──────────────────────────────────────

async function fetchCMS<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number | false }
): Promise<T> {
  const { revalidate = DEFAULT_REVALIDATE, ...fetchOptions } = options ?? {};

  const nextOptions =
    revalidate === false
      ? { cache: 'no-store' as const }
      : { next: { revalidate } };

  const res = await fetch(`${CMS_URL}${endpoint}`, {
    ...fetchOptions,
    ...nextOptions,
    headers: {
      Accept: 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    throw new CmsError(res.status, endpoint);
  }

  return res.json() as Promise<T>;
}

export class CmsError extends Error {
  constructor(
    public readonly status: number,
    public readonly endpoint: string
  ) {
    super(`CMS fout ${status} bij ${endpoint}`);
    this.name = 'CmsError';
  }
}

// Veilige wrapper: geeft null terug bij fout (i.p.v. crash)
async function fetchCMSSafe<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number | false }
): Promise<T | null> {
  try {
    return await fetchCMS<T>(endpoint, options);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`CMS fetch mislukt (${endpoint}):`, err);
    }
    return null;
  }
}

// ── Instellingen ─────────────────────────────────────────────

export async function getSettings(): Promise<SettingsResponse | null> {
  return fetchCMSSafe<SettingsResponse>('/api/settings');
}

// ── Navigatiemenu's ──────────────────────────────────────────

export async function getHeaderMenu(): Promise<HeaderMenuResponse | null> {
  return fetchCMSSafe<HeaderMenuResponse>('/api/menus/header');
}

export async function getFooterMenu(): Promise<FooterMenuResponse | null> {
  return fetchCMSSafe<FooterMenuResponse>('/api/menus/footer');
}

// ── Homepage ─────────────────────────────────────────────────

export async function getHomepage(): Promise<HomepageResponse | null> {
  return fetchCMSSafe<HomepageResponse>('/api/homepage');
}

// ── Oplossingen ──────────────────────────────────────────────

export async function getSolutions(): Promise<SolutionsListResponse | null> {
  return fetchCMSSafe<SolutionsListResponse>('/api/solutions');
}

export async function getSolution(
  anchor: string
): Promise<SolutionDetail | null> {
  const res = await fetchCMSSafe<{ data: SolutionDetail }>(
    `/api/solutions/${anchor}`
  );
  return res?.data ?? null;
}

// ── Pagina's ─────────────────────────────────────────────────

export async function getPages(): Promise<PaginatedResponse<Page> | null> {
  return fetchCMSSafe<PaginatedResponse<Page>>('/api/pages');
}

export async function getPage(slug: string): Promise<Page | null> {
  const normalized = slug.startsWith('/') ? slug.slice(1) : slug;
  return fetchCMSSafe<Page>(`/api/pages/${normalized}`);
}

// ── Contact ──────────────────────────────────────────────────

export async function getContact(): Promise<ContactResponse | null> {
  return fetchCMSSafe<ContactResponse>('/api/contact');
}

export async function getContactSubjects(): Promise<ContactSubject[] | null> {
  return fetchCMSSafe<ContactSubject[]>('/api/contact/subjects');
}

export async function submitContactForm(
  formData: Record<string, string | boolean>
): Promise<{ success: boolean; message?: string }> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(formData)) {
    body.append(key, String(value));
  }

  const res = await fetch(`${CMS_URL}/api/contact/verstuur`, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!res.ok) {
    return {
      success: false,
      message: 'Er is een fout opgetreden. Probeer het later opnieuw.',
    };
  }

  return { success: true };
}

// ── Blog / Kennisbank ────────────────────────────────────────

export async function getBlogPosts(
  perPage = 25,
  page = 1
): Promise<BlogListResponse | null> {
  return fetchCMSSafe<BlogListResponse>(
    `/api/blog?per_page=${perPage}&page=${page}`
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return fetchCMSSafe<BlogPost>(`/api/blog/${slug}`);
}

export async function searchBlogPosts(query: string): Promise<BlogListResponse | null> {
  return fetchCMSSafe<BlogListResponse>(
    `/api/blog/search?q=${encodeURIComponent(query)}`
  );
}

// ── Prijzen ──────────────────────────────────────────────────

export async function getPricing(): Promise<PricingResponse | null> {
  return fetchCMSSafe<PricingResponse>('/api/prijzen');
}

// ── Partners ─────────────────────────────────────────────────

export async function getPartners(): Promise<
  PaginatedResponse<PartnerItem> | null
> {
  return fetchCMSSafe<PaginatedResponse<PartnerItem>>('/api/partners');
}

// ── Sitemap ──────────────────────────────────────────────────

export async function getSitemap(): Promise<SitemapResponse | null> {
  return fetchCMSSafe<SitemapResponse>('/api/sitemap', {
    revalidate: 3600, // 1 uur
  });
}

// ── Legal pagina's ────────────────────────────────────────────

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return fetchCMSSafe<LegalPage>(`/api/legal/${slug}`);
}

// ── Menu URL → Frontend route ────────────────────────────────

/**
 * Vertaalt CMS-API-URL's naar frontend routes.
 *
 * Patronen:
 *   /api/solutions/woo-oplossing  → /woo-oplossing
 *   /api/pages/contact            → /contact
 *   /api/pages//aanpak            → /aanpak  (dubbele slash in CMS)
 *   /contact                      → /contact  (al correct)
 */
// Specific mappings for legal slugs that differ from frontend routes
const LEGAL_SLUG_MAP: Record<string, string> = {
  'privacybeleid-pagina': '/privacy',
  'privacy': '/privacy',
  'cookiebeleid': '/cookies',
  'algemene-voorwaarden': '/legal/algemene-voorwaarden',
};

// CMS page slugs that map to custom frontend routes
const PAGE_SLUG_MAP: Record<string, string> = {
  'contact': '/contact',
  'aanpak': '/aanpak',
  'over-ons': '/over-ons',
  'dienstverlening': '/dienstverlening',
  'kennisbank': '/kennisbank',
  'open-source': '/open-source',
};

export function mapMenuUrl(url: string): string {
  if (!url) return '/';

  const solutionMatch = url.match(/^\/api\/solutions\/(.+)$/);
  if (solutionMatch) return `/${solutionMatch[1]}`;

  const pageMatch = url.match(/^\/api\/pages\/\/*(.*)$/);
  if (pageMatch) {
    const slug = pageMatch[1].replace(/^\/+/, '');
    if (!slug) return '/';
    return PAGE_SLUG_MAP[slug] ?? `/${slug}`;
  }

  const legalMatch = url.match(/^\/api\/legal\/(.+)$/);
  if (legalMatch) {
    const slug = legalMatch[1];
    return LEGAL_SLUG_MAP[slug] ?? `/legal/${slug}`;
  }

  return url;
}
