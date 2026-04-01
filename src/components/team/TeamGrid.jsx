function TeamGrid({ team = [], title = 'Directieteam' }) {
  if (!team.length) return null

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <h2 className="text-2xl md:text-5xl font-small text-gray-900 mb-12 md:mb-24 leading-tight">
            {title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6">
                <div className="aspect-square w-full max-w-[180px] mx-auto mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl">person</span>
                </div>
                <h3 className="text-lg md:text-xl font-small text-gray-900">{member.name}</h3>
                <p className="text-sm md:text-base text-gray-600 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamGrid
