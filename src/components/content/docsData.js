export const DOCS_SIDEBAR = [
  { id: 'intro', label: 'Introductie', children: [{ id: 'over-opms', label: 'Over OPMS' }, { id: 'quickstart', label: 'Quickstart' }] },
  { id: 'api', label: 'API', children: [{ id: 'authenticatie', label: 'Authenticatie' }, { id: 'endpoints', label: 'Endpoints' }, { id: 'rate-limiting', label: 'Rate limiting' }] },
  { id: 'integratie', label: 'Integratie', children: [{ id: 'webhooks', label: 'Webhooks' }, { id: 'sdk', label: 'SDK' }] },
  { id: 'beheer', label: 'Beheer', children: [{ id: 'content-types', label: 'Content types' }, { id: 'media', label: 'Media' }] },
]

export const DOCS_CONTENT = {
  title: 'Introductie',
  sections: [
    { id: 'over-opms', title: 'Over OPMS', body: 'OPMS is een platform voor het beheren en publiceren van overheidsinformatie. Het biedt een centrale plek voor content, workflows en integraties.' },
    { id: 'quickstart', title: 'Quickstart', body: 'Start binnen enkele minuten met OPMS. Maak een account aan, configureer uw eerste content type en begin met publiceren.' },
    { id: 'authenticatie', title: 'Authenticatie', body: 'De API gebruikt API-tokens voor authenticatie. Voeg deze toe aan de Authorization header van uw requests.' },
    { id: 'endpoints', title: 'Endpoints', body: 'Alle endpoints zijn beschikbaar onder /api. Gebruik de OpenAPI documentatie voor de volledige specificatie.' },
  ],
}
