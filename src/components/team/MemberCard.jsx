function MemberCard({ category, title, description, image, imageAlt }) {
  return (
    <div className="relative group w-[360px] sm:w-[480px] h-[360px] sm:h-[540px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
      <img
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <span className="text-xs font-bold text-white uppercase tracking-wider bg-primary px-2 py-1 mb-3 inline-block">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {description}
        </p>
      </div>
    </div>
  )
}

export default MemberCard
