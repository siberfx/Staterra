import { Link } from 'react-router-dom'
import { nl } from '../translations'
import { R } from '../utils/routes'
import { FaIcon } from '../components/Icons/FaIcon'
import { PageHero } from '../components/hero'

const SUPPORT_LINKS = [
  {
    to: R.contact,
    icon: 'mail',
    title: 'Contact opnemen',
    description: 'Stel uw vraag of meld een probleem. Ons team reageert zo snel mogelijk.',
  },
  {
    to: R.faq,
    icon: 'help',
    title: 'Veelgestelde vragen',
    description: 'Antwoorden op de meest gestelde vragen over OPMS en implementatie.',
  },
  {
    to: R.helpCenter,
    icon: 'menu_book',
    title: 'Helpcentrum',
    description: 'Documentatie, kennisbank en alle hulpbronnen op één plek.',
  },
  {
    href: 'https://demo.openpublication.eu/docs',
    icon: 'description',
    title: 'Technische documentatie',
    description: 'API-referentie, ontwikkelaarsdocumentatie en technische handleidingen.',
  },
  {
    to: R.programmaVanEisen,
    icon: 'article',
    title: 'Programma van eisen',
    description: 'Technische eisen en specificaties voor implementatie.',
  },
  {
    to: R.demo,
    icon: 'play_circle',
    title: 'Demo aanvragen',
    description: 'Plan een demo en ontdek hoe OPMS uw organisatie kan ondersteunen.',
  },
]

function Support() {
  return (
    <>
      <PageHero
        title={nl('ondersteuning.title')}
        subtitle={nl('ondersteuning.subtitle')}
        breadcrumbs={[{ label: nl('nav.ondersteuning') }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {SUPPORT_LINKS.map((item, i) => {
          const content = (
            <>
              <div className="flex items-start gap-4 mb-5">
                <div className="flex-shrink-0 w-10 h-10 border border-primary/20 flex items-center justify-center group-hover:border-secondary/40 transition-colors">
                  <FaIcon icon={item.icon} className="text-primary text-lg" />
                </div>
                <h3 className="type-h3 text-primary pt-1">
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

      <div className="mt-16 pt-12 border-t border-gray-100">
        <div className="rich-text max-w-3xl mb-12">
          <p className="text-gray-700">{nl('ondersteuning.content')}</p>
        </div>
        <div className="max-w-3xl mb-12">
          <h2 className="type-h2 text-black mb-4">
            {nl('ondersteuning.itVragenTitle')}
          </h2>
          <p className="text-gray-600 mb-8">{nl('ondersteuning.itVragenIntro')}</p>
          <dl className="space-y-6">
            <div className="p-6 border-l-4 border-l-primary bg-white border border-gray-100">
              <dt className="font-semibold text-black mb-1">
                {nl('ondersteuning.itKoppelbaar')}
              </dt>
              <dd className="text-gray-600">{nl('ondersteuning.itKoppelbaarAnswer')}</dd>
            </div>
            <div className="p-6 border-l-4 border-l-primary bg-white border border-gray-100">
              <dt className="font-semibold text-black mb-1">
                {nl('ondersteuning.itBeveiliging')}
              </dt>
              <dd className="text-gray-600">{nl('ondersteuning.itBeveiligingAnswer')}</dd>
            </div>
            <div className="p-6 border-l-4 border-l-primary bg-white border border-gray-100">
              <dt className="font-semibold text-black mb-1">
                {nl('ondersteuning.itWaarDraait')}
              </dt>
              <dd className="text-gray-600">{nl('ondersteuning.itWaarDraaitAnswer')}</dd>
            </div>
            <div className="p-6 border-l-4 border-l-primary bg-white border border-gray-100">
              <dt className="font-semibold text-black mb-1">
                {nl('ondersteuning.itImplementatie')}
              </dt>
              <dd className="text-gray-600">{nl('ondersteuning.itImplementatieAnswer')}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <a
            href={nl('ondersteuning.documentatieLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-primary hover:bg-secondary transition-colors"
          >
            {nl('ondersteuning.documentatie')}
          </a>
          <Link
            to={R.programmaVanEisen}
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-primary border-2 border-gray-200 hover:border-primary/40 hover:bg-gray-50 transition-colors"
          >
            {nl('footer.programmaVanEisen')}
          </Link>
          <Link
            to={R.contact}
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-primary border-2 border-gray-200 hover:border-primary/40 hover:bg-gray-50 transition-colors"
          >
            {nl('nav.contact')}
          </Link>
        </div>
      </div>
      </section>
    </>
  )
}

export default Support
