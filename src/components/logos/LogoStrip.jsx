import { nl } from '../../translations'
import { FaIcon } from '../Icons/FaIcon'

const clients = [
  { icon: 'account_balance', name: 'CityGov' },
  { icon: 'gavel', name: 'JusticeDept' },
  { icon: 'local_library', name: 'PublicLibrary' },
  { icon: 'health_and_safety', name: 'HealthBoard' },
  { icon: 'forest', name: 'EnvAgency' },
]

function LogoStrip() {
  return (
    <div className="border-y border-gray-100 bg-white py-16">
      <div className="container-page">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          {nl('home.clientLogos')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-70">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-2 font-bold text-xl text-gray-400 grayscale"
            >
              <FaIcon icon={client.icon} />
              {client.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoStrip
