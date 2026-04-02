import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Staterra';
const SITE_URL = 'https://staterra.nl';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;
const LOGO_URL = `${SITE_URL}/favicon.svg`;
const DEFAULT_DESCRIPTION =
  'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 611 bestuursorganen.';

// Organization schema — verschijnt op elke pagina
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  description: DEFAULT_DESCRIPTION,
  areaServed: 'NL',
};

interface PageMetaProps {
  title: string;
  description?: string;
  image?: string;
  /** Extra JSON-LD schema's (WebSite, Service, etc.) */
  schemas?: Record<string, unknown>[];
}

export function PageMeta({ title, description, image, schemas }: PageMetaProps) {
  const { pathname } = useLocation();
  const fullTitle = `${title} — ${SITE_NAME}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const img = image ?? DEFAULT_IMAGE;

  // Breadcrumb schema op basis van huidige route
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbSchema = {
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
  };

  const allSchemas = [
    ORGANIZATION_SCHEMA,
    ...(segments.length > 0 ? [breadcrumbSchema] : []),
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
