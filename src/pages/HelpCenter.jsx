import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { FaIcon } from '../components/Icons/FaIcon'
import { PageHero } from '../components/hero'

const HELP_LINKS = [
  {
    to: R.faq,
    icon: 'help',
    title: 'Veelgestelde vragen',
    description: 'Antwoorden op de meest gestelde vragen over OPMS, implementatie en koppelingen.',
  },
  {
    to: R.kennisbank,
    icon: 'menu_book',
    title: 'Kennisbank',
    description: 'Artikelen, handleidingen en kennisbank voor gebruikers en beheerders.',
  },
  {
    href: 'https://demo.openpublication.eu/docs',
    icon: 'description',
    title: 'Documentatie',
    description: 'Technische documentatie, API-referentie en ontwikkelaarsdocumentatie.',
  },
  {
    to: R.support,
    icon: 'support',
    title: 'Ondersteuning',
    description: 'Technische ondersteuning, implementatie en beheer.',
  },
  {
    to: R.contact,
    icon: 'mail',
    title: 'Contact',
    description: 'Neem contact op met ons team voor vragen of een gesprek.',
  },
  {
    to: R.demo,
    icon: 'play_circle',
    title: 'Demo aanvragen',
    description: 'Plan een demo en ontdek OPMS in circa 30 minuten.',
  },
]

function HelpCenter() {
  return (
    <>
      <PageHero
        title="Helpcentrum"
        subtitle="Vind antwoorden, documentatie en ondersteuning. Alles wat u nodig heeft om met OPMS aan de slag te gaan."
        breadcrumbs={[{ label: 'Helpcentrum' }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {HELP_LINKS.map((item, i) => {
          const content = (
            <>
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center group-hover:border-secondary/40 transition-colors">
                  <FaIcon icon={item.icon} className="text-primary text-lg" />
                </div>
                <h3 className="text-lg font-bold text-primary leading-tight pt-1">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all">
                Bekijk
                <FaIcon icon="arrow_forward" className="text-sm" />
              </span>
            </>
          )
          const className = "group block bg-white border border-gray-100 border-l-4 border-l-primary pl-8 lg:pl-10 pr-8 lg:pr-10 py-8 lg:py-10 transition-all duration-300 hover:border-l-secondary hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)]"
          if (item.href) {
            return (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            )
          }
          return (
            <Link key={i} to={item.to} className={className}>
              {content}
            </Link>
          )
        })}
        </div>
      </section>
    </>
  )
}

export default HelpCenter
