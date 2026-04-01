function Testimonial({ quote, author, company, className = '' }) {
  if (!quote?.trim()) return null

  return (
    <section className={`py-20 md:py-24 bg-primary text-white ${className}`}>
      <div className="container-page max-w-3xl mx-auto">
        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed italic text-center">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(author || company) && (
          <footer className="mt-6 text-center text-white/80">
            <cite className="not-italic">
              {author}
              {author && company ? ' — ' : ''}
              {company}
            </cite>
          </footer>
        )}
      </div>
    </section>
  )
}

export default Testimonial
