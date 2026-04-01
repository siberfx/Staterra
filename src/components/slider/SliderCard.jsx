function SliderCard({ image, imageAlt }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden bg-gray-100" style={{ width: '720px', height: '540px' }}>
      <img
        alt={imageAlt}
        className="w-full h-full object-cover"
        draggable={false}
        src={image}
      />
    </div>
  )
}

export default SliderCard
