function ContentBlock({ visie, missie }) {
  return (
    <section className="py-16 md:py-20 bg-whit">
      <div className="container-page">
        <h2 className="text-2xl md:text-5xl font-small text-gray-900 mb-12 md:mb-24 leading-tight">
          Slimme apps voor de overheid
        </h2>

        <div className="space-y-16">
          {visie && (
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <h3 className="text-xl md:text-2xl font-small text-gray-900">{visie.title}</h3>
              <div>
                <h4 className="text-lg md:text-xl font-small text-gray-900 mb-2">{visie.heading}</h4>
                <p className="text-gray-600 leading-relaxed">{visie.content}</p>
              </div>
            </div>
          )}
          {missie && (
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <h3 className="text-xl md:text-2xl font-small text-gray-900">{missie.title}</h3>
              <div>
                <h4 className="text-lg md:text-xl font-small text-gray-900 mb-2">{missie.heading}</h4>
                <p className="text-gray-600 leading-relaxed">{missie.content}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContentBlock
