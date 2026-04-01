import { PageHero } from '../components/hero'
import { ImageSlider } from '../components/slider'
import { ContentBlock } from '../components/sections'
import { TeamGrid } from '../components/team'
import { sliderImages, visie, missie, team } from '../data/onsVerhaal'

function OnsVerhaal() {
  return (
    <>
      <PageHero
        title="Wij zijn OpenPublication"
        subtitle="Wij werken aan een mooiere, slimmere en eerlijkere overheid. We verbinden mens, proces en techniek aan duurzame IT oplossingen, om zo bij te dragen aan een betere dienstverlening voor burgers en bedrijven."
        breadcrumbs={[{ label: 'Ons verhaal' }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-12">
        <div className="mb-16">
          <ImageSlider items={sliderImages} />
        </div>

        <div className="mb-16">
          <p className="text-gray-600 leading-relaxed max-w-4xl text-xll">
            OpenPublication biedt een platform voor transparantie en efficiëntie in het openbaar bestuur. Van Woo-verzoeken tot actieve openbaarmaking en archivering: alles in één geïntegreerd systeem, conform Nederlandse kaders en wettelijk gedekt.
          </p>
        </div>
      </section>

      <ContentBlock visie={visie} missie={missie} />
      <TeamGrid team={team} title="Directieteam" />
    </>
  )
}

export default OnsVerhaal
