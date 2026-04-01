export default function DetailImage({ src, alt }) {
  if (!src) return null
  return (
    <div className="w-full mb-16">
      <div className="container-page">
        <img
          alt={alt ?? ''}
          className="w-full h-[400px] md:h-[500px] object-contain rounded-none"
          src={src}
        />
      </div>
    </div>
  )
}
