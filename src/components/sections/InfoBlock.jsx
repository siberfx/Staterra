import { useSettings } from '../../contexts/SiteContext'
import { nl } from '../../translations'
import { FaIcon } from '../Icons/FaIcon'

function InfoBlock() {
  const { settings } = useSettings()

  const email = settings.site?.email
  const phone = settings.site?.phone
  const address = settings.site?.address

  const items = [
    email && {
      icon: 'mail',
      key: 'email',
      titleKey: 'salesTitle',
      descKey: 'salesDesc',
      link: `mailto:${email}`,
      value: email,
    },
    phone && {
      icon: 'call',
      key: 'call',
      titleKey: 'callTitle',
      descKey: 'callDesc',
      link: `tel:${phone.replace(/\s/g, '')}`,
      value: phone,
    },
    address && {
      icon: 'location_on',
      key: 'visit',
      titleKey: 'visitTitle',
      descKey: 'visitDesc',
      value: address,
    },
  ].filter(Boolean)

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">{nl('contact.noContactInfo')}</p>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.key} className="flex items-start gap-4 group">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <FaIcon icon={item.icon} className="text-primary group-hover:text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black mb-1">{nl(`contact.${item.titleKey}`)}</p>
            <p className="text-sm text-gray-500 mb-1">{nl(`contact.${item.descKey}`)}</p>
            {item.link ? (
              <a
                href={item.link}
                className="text-sm font-medium text-primary hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm text-gray-600 whitespace-pre-line">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default InfoBlock
