import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSeoForPath } from '@/config/seoConfig';

const SITE_URL = 'https://staterra.nl';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Staterra',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: 'Staterra implementeert en beheert OPMS, het open source publicatieplatform voor Woo-compliance.',
  areaServed: 'NL',
};

interface PageMetaProps {
  /** Override title (otherwise uses seoConfig) */
  title?: string;
  /** Override description (otherwise uses seoConfig) */
  description?: string;
  image?: string;
  schemas?: Record<string, unknown>[];
}

export function PageMeta({ title, description, image, schemas }: PageMetaProps) {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);

  const fullTitle = title ? `${title} — Staterra` : seo.title;
  const desc = description ?? seo.description;
  const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const img = image ?? DEFAULT_IMAGE;

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
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

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
