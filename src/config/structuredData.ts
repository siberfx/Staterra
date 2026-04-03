const PROVIDER = {
  '@type': 'Organization' as const,
  name: 'Staterra',
  url: 'https://staterra.nl',
};

const AREA_SERVED = {
  '@type': 'Country' as const,
  name: 'Netherlands',
};

function service(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: PROVIDER,
    areaServed: AREA_SERVED,
    serviceType: 'Woo-compliance implementatie',
  };
}

function govService(name: string, description: string, audience: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name,
    description,
    provider: PROVIDER,
    areaServed: AREA_SERVED,
    serviceType: 'Digitale dienstverlening overheid',
    audience: { '@type': 'Audience', audienceType: audience },
  };
}

/**
 * Extra structured data per route (bovenop Organization + BreadcrumbList
 * die PageMeta al toevoegt).
 */
export const ROUTE_SCHEMAS: Record<string, Record<string, unknown>[]> = {
  // Woo-doelgroep pagina's (CMS solutions)
  'woo-gemeenten': [
    service('Woo-oplossing voor gemeenten', 'Woo-compliant publiceren voor gemeenten met OPMS. Implementatiepakketten afgestemd op de omvang van uw gemeente.'),
  ],
  'woo-provincies': [
    service('Woo-oplossing voor provincies', 'OPMS-implementatie voor provincies. Schaalbare Woo-oplossing met centrale regie op actieve openbaarmaking.'),
  ],
  'woo-rijksoverheid': [
    service('Woo-oplossing voor de Rijksoverheid', 'Woo-compliance voor rijksorganisaties en ZBO\'s. OPMS-implementatie met koppelingen naar bestaande DMS- en zaaksystemen.'),
  ],
  'woo-waterschappen': [
    service('Woo-oplossing voor waterschappen', 'Praktische Woo-oplossing voor waterschappen. OPMS-implementatie afgestemd op de schaal en behoeften van uw waterschap.'),
  ],

  // Staterra-doelgroep pagina's
  'staterra-gemeenten': [
    govService('Staterra voor gemeenten', 'Staterra ondersteunt gemeenten bij actieve openbaarmaking, Woo-compliance en digitale transformatie met open source.', 'Gemeenten'),
  ],
  'staterra-provincies': [
    govService('Staterra voor provincies', 'Staterra helpt provincies met Woo-compliance, open source platformen en digitale voorzieningen.', 'Provincies'),
  ],
  'staterra-rijkspartijen': [
    govService('Staterra voor rijkspartijen', 'Woo-compliance en open source oplossingen voor rijksorganisaties, uitvoeringsorganisaties en ZBO\'s.', 'Rijksoverheid'),
  ],
  'staterra-waterschappen': [
    govService('Staterra voor waterschappen', 'Staterra ondersteunt waterschappen bij Woo-compliance en actieve openbaarmaking met schaalbare open source oplossingen.', 'Waterschappen'),
  ],
};
