/**
 * Tijdelijke shell voor statische marketingpagina’s — vervang inhoud later per route.
 * Tabtitel: zie DocumentTitle (STATIC_PAGE_TITLES).
 */
export default function StaticPlaceholder({ title }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
      <h1 className="type-h1 mb-4 text-text-heading">{title}</h1>
      <p className="type-body text-text-main">
        Deze pagina wordt statisch ingevuld. Placeholder — inhoud volgt.
      </p>
    </div>
  )
}
