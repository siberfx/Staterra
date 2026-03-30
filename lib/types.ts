/* =============================================================
   Staterra CMS — TypeScript Interfaces
   Bron: API-DOCS.md / studio.staterra.nl
   ============================================================= */

// ── Paginering ──────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// ── Instellingen ─────────────────────────────────────────────

export interface SettingsResponse {
  site: {
    name: string;
    tagline: string;
    description: string;
    logo: string;
    favicon: string;
    footer_logo: string;
    email: string;
    phone: string;
    address: string;
    copyright_footer: string;
  };
  theme: {
    base_color: string;
    accent_color: string;
    primary_color: string;
    secondary_color: string;
    natural_color: string;
    footer_bg: string;
    footer_text: string;
    header_bg: string;
    header_text: string;
    font_sans: string;
    font_outfit: string;
    font_size_h1: string;
    font_size_h2: string;
    font_size_h3: string;
    font_size_h4: string;
    font_size_h5: string;
    font_size_h6: string;
    font_size_p: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    google_analytics_id: string;
  };
  contact: {
    map_latitude: string;
    map_longitude: string;
    map_zoom: string;
  };
  cookie: {
    banner_enabled: boolean;
    intro_title: string;
    intro_summary: string;
    preferences_title: string;
    settings_label: string;
    settings_url: string;
    policy_url: string;
    category_functional_label: string;
    category_functional_description: string;
    category_analytics_label: string;
    category_analytics_description: string;
  };
  hero?: Record<string, unknown>;
  header?: Record<string, unknown>;
  organizations?: Record<string, unknown>;
  external_codes?: Record<string, unknown>;
}

// ── Navigatiemenu ────────────────────────────────────────────

export interface MenuItem {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  url: string;
  slug: string | null;
  page_type: string;
  template: string;
  order: number;
  tags: string[];
  children: MenuItem[];
  sidebar: unknown | null;
}

export interface HeaderMenuResponse {
  items: MenuItem[];
}

export interface FooterColumnLink {
  id: number;
  title: string;
  url: string;
  template: string;
  order: number;
}

export interface FooterColumn {
  column: number;
  links: FooterColumnLink[];
}

export interface FooterMenuResponse {
  columns: FooterColumn[];
}

// ── Homepage ─────────────────────────────────────────────────

export interface CmsBullet {
  icon: string;
  text: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  link_text: string;
  link_url: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  link_text?: string;
  link_url?: string;
}

export interface CompetitionBox {
  // Huidige CMS-velden (milestones)
  value: string;
  label: string;
  // Toekomstige CMS-velden (pain points)
  title?: string;
  description?: string;
  image?: string;
  image_url?: string;
  link_text?: string;
  link_url?: string;
}

export interface HomepageResponse {
  hero: {
    label: string;
    heading: string;
    paragraph: string;
    bullets: CmsBullet[];
    cta_primary_text: string;
    cta_primary_url: string;
    cta_secondary_text: string;
    cta_secondary_url: string;
    image: string;
  };
  about_opms: {
    label: string;
    heading: string;
    paragraph: string;
    bullets: CmsBullet[];
    link_text: string;
    link_url: string;
    image: string;
  };
  competition: {
    heading: string;
    paragraph: string;
    boxes: CompetitionBox[];
  };
  feature_cards: {
    title: string;
    cards: FeatureCard[];
  };
  how_it_works: {
    title: string;
    steps: HowItWorksStep[];
  };
  user_features: {
    left_title: string;
    left_items: string[];
    right_title: string;
    right_items: string[];
  };
  latest_updates: {
    title: string;
  };
  bottom_cta: {
    heading: string;
    subtext: string;
    cta_primary_text: string;
    cta_primary_url: string;
    cta_secondary_text: string;
    cta_secondary_url: string;
  };
}

// ── Oplossingen ──────────────────────────────────────────────

export interface Solution {
  id: number;
  title: string;
  anchor: string;
  nav_title: string;
  subtitle: string;
  short_body: string;
  image: string;
  url: string;
  sort_order: number;
  features: unknown[];
  created_at: string;
}

export interface SolutionsListResponse {
  data: Solution[];
  template: string;
  banner: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SolutionDetail extends Solution {
  long_body: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string | null;
  image_position: 'left' | 'right';
  list_items: string[];
  faq: FaqItem[];
  link_text: string;
  link_url: string;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  testimonial_company: string | null;
  template: 'solution-detail';
  updated_at: string;
}

// ── Pagina's ─────────────────────────────────────────────────

export interface Page {
  id: number;
  title: string;
  slug: string;
  short_body: string;
  meta_title: string;
  meta_body: string;
  meta_keywords: string;
  image: string | null;
  icon: string | null;
  template: string;
  elements: unknown[];
  created_at: string;
  updated_at: string;
}

// ── Contact ──────────────────────────────────────────────────

export interface ContactSubject {
  id: number;
  title: string;
  sort_order: number;
}

export interface ContactFaq {
  id: number;
  identifier: string;
  title: string;
  subtitle: string;
  question: string | null;
  answer: string | null;
  items: FaqItem[];
  created_at: string;
  updated_at: string;
}

export interface ContactResponse {
  template: 'contact';
  banner: string;
  data: {
    id: number;
    title: string;
    short_body: string;
    long_body: string;
    image: string | null;
    image_url: string | null;
    meta_title: string;
    meta_body: string;
    subjects: ContactSubject[];
  };
  faqs: ContactFaq;
  subjects: ContactSubject[];
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  onderwerp?: string;
  reden: string;
  organisatie?: string;
  bericht: string;
  'avg-optin': boolean;
  contact_preference?: string;
  country_code?: string;
  nieuwsbrief?: boolean;
}

// ── Blog / Kennisbank ────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  summary?: string;
  body?: string;
  content?: string;
  image?: string;
  image_url?: string;
  author?: string;
  author_name?: string;
  author_image?: string;
  categories?: string[];
  tags?: string[];
  created_at?: string;
  published_at?: string;
  reading_time?: number;
  meta_title?: string;
  meta_description?: string;
  [key: string]: unknown;
}

export interface BlogListResponse {
  data: BlogPost[];
  template: string;
  banner: string | null;
  has_more: boolean;
  next_page: string | null;
}

// ── Prijzen ──────────────────────────────────────────────────

export interface PricingResponse {
  template: 'pricing';
  data: {
    plans: unknown[];
    boosters: unknown[];
    features: unknown[];
  };
}

// ── Partners & Tech Stack ────────────────────────────────────

export interface PartnerItem {
  link: string;
  link_type: string;
  image: string;
  sort_order: number;
  url: string;
  image_url: string;
}

// ── Sitemap ──────────────────────────────────────────────────

export interface SitemapItem {
  loc: string;
  priority: string;
  changefreq: string;
}

export interface SitemapResponse {
  data: SitemapItem[];
}

// ── Legal ────────────────────────────────────────────────────

export interface LegalPage {
  slug: string;
  title: string;
  content: string;
  [key: string]: unknown;
}
