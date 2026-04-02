import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Staterra';
const SITE_URL = 'https://staterra.nl';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;
const DEFAULT_DESCRIPTION =
  'Staterra implementeert en beheert OPMS, het open source platform voor Woo-compliance. Direct inzetbaar voor 611 bestuursorganen.';

interface PageMetaProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function PageMeta({ title, description, path, image }: PageMetaProps) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const img = image ?? DEFAULT_IMAGE;

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
    </Helmet>
  );
}
