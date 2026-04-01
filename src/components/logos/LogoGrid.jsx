import { useState } from 'react'

function PartnerCard({ partner }) {
  const [imgError, setImgError] = useState(false)
  const useLogo = (partner.logo || partner.image_url) && !imgError
  const logoUrl = partner.image_url ?? partner.logo

  const content = useLogo ? (
    <img
      src={logoUrl}
      alt={partner.name ?? ''}
      onError={() => setImgError(true)}
      className="w-full h-full object-contain max-h-12"
    />
  ) : (
    <span className="text-sm font-medium text-gray-500">
      {partner.name ?? 'Partner'}
    </span>
  )

  const wrapperClass = 'flex items-center justify-center p-8 md:p-10 bg-white min-h-[100px] shadow-sm transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
  const innerClass = useLogo ? 'w-full' : ''

  const linkUrl = partner.url ?? partner.link
  if (linkUrl) {
    return (
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${wrapperClass}`}
      >
        <span className={innerClass}>{content}</span>
      </a>
    )
  }

  return (
    <div className={wrapperClass}>
      <span className={innerClass}>{content}</span>
    </div>
  )
}

function LogoGrid({ partners }) {
  if (!partners?.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-16">
      {partners.map((partner, i) => (
        <PartnerCard key={partner.id ?? i} partner={partner} />
      ))}
    </div>
  )
}

export default LogoGrid
