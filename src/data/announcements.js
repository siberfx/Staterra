export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Nieuwe integratie met Digikoppeling',
    date: '2025-02-15',
    description: 'De integratie met Digikoppeling is nu beschikbaar voor alle gebruikers. U kunt nu eenvoudig documenten uitwisselen via het landelijke koppelvlak.',
  },
  {
    id: 2,
    title: 'Webinar: OPMS in Vogelvlucht',
    date: '2025-02-10',
    description: 'Schrijf je in voor onze maandelijkse webinar over de basis van OPMS. Leer in 45 minuten hoe u het platform optimaal gebruikt voor Woo-verzoeken.',
  },
  {
    id: 3,
    title: 'Planbaar onderhoud 3 maart',
    date: '2025-02-28',
    description: 'Op 3 maart vindt planbaar onderhoud plaats tussen 02:00 en 04:00 uur. Het platform kan in die periode tijdelijk niet bereikbaar zijn.',
  },
]

export function getAnnouncementById(id) {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id
  return ANNOUNCEMENTS.find((a) => a.id === numId)
}
