import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSeoForPath } from '@/config/seoConfig';

const SITE_URL = 'https://staterra.nl';
const SITE_NAME = 'Staterra';
const LOCALE = 'nl_NL';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Staterra is open source partner voor de Nederlandse overheid. Bouwen, implementeren en beheren van digitale oplossingen voor de publieke sector — van Woo-publicatie (OPMS) tot maatwerk.',
  areaServed: 'NL',
};

interface PageMetaProps {
  /** Override title (otherwise uses seoConfig). Suffix " — Staterra" wordt automatisch toegevoegd. */
  title?: string;
  /** Override description (otherwise uses seoConfig) */
  description?: string;
  /** Absolute of relatieve URL naar social-card afbeelding (1200×630). Default: /og-default.jpg */
  image?: string;
  /** og:type — `website` voor reguliere pagina's, `article` voor blog/kennisbank-artikelen. */
  ogType?: 'website' | 'article';
  /** twitter:card variant. Default `summary_large_image`. */
  twitterCard?: 'summary' | 'summary_large_image';
  /** robots-directive override. Default `index, follow`. */
  robots?: string;
  /** Aanvullende JSON-LD-blokken bovenop Organization + BreadcrumbList. */
  schemas?: Record<string, unknown>[];
}

export function PageMeta({
  title,
  description,
  image,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  robots = 'index, follow',
  schemas,
}: PageMetaProps) {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);

  const fullTitle = title ? `${title} — ${SITE_NAME}` : seo.title;
  const desc = description ?? seo.description;

  // Canonical: lowercase + strip trailing slash (behalve root) zodat
  // /Woo-Oplossing/ en /woo-oplossing nooit als verschillende kanonieke
  // varianten worden gezien door zoekmachines.
  const normalizedPath = pathname === '/'
    ? ''
    : pathname.toLowerCase().replace(/\/+$/, '');
  const url = `${SITE_URL}${normalizedPath}`;

  const img = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`)
    : DEFAULT_IMAGE;

  // Breadcrumb schema
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbSchema = segments.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...segments.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: seg.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
        item: `${SITE_URL}/${segments.slice(0, i + 1).join('/')}`,
      })),
    ],
  } : null;

  const allSchemas = [
    ORGANIZATION_SCHEMA,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(schemas ?? []),
  ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Route-level fallback: voegt SEO meta toe voor pagina's
 * die geen eigen <PageMeta /> hebben.
 */
export function DefaultPageMeta() {
  return <PageMeta />;
}
