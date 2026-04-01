import { useRef, useState, useCallback, useEffect } from 'react'
import SliderCard from './SliderCard'

const CARD_WIDTH = 560
const GAP = 24

function ImageSlider({ items = [] }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -(CARD_WIDTH + GAP) : (CARD_WIDTH + GAP)
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    startX.current = e.pageX - scrollRef.current.getBoundingClientRect().left
    scrollLeft.current = scrollRef.current.scrollLeft
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e) => {
      if (!scrollRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollRef.current.getBoundingClientRect().left
      const walk = (x - startX.current) * 1.5
      scrollRef.current.scrollLeft = scrollLeft.current - walk
    }
    const onUp = () => setIsDragging(false)
    document.addEventListener('mousemove', onMove, { capture: true })
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove, { capture: true })
      document.removeEventListener('mouseup', onUp)
    }
  }, [isDragging])

  if (!items.length) return null

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={`overflow-x-auto no-scrollbar pb-14 scroll-smooth select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
        }}
      >
        <div
          className="flex min-w-max"
          style={{
            gap: `${GAP}px`,
            paddingLeft: 'max(1rem, calc((100vw - min(90rem, 100vw)) / 2 + 2rem))',
            paddingRight: '2rem',
          }}
        >
          {items.map((item, i) => (
            <SliderCard
              key={i}
              image={item.image ?? item.src}
              imageAlt={item.imageAlt ?? item.alt ?? ''}
            />
          ))}
        </div>
      </div>
      <div
        className="flex gap-2 justify-end mt-[-2em] pr-0"
      >
        <button
          type="button"
          onClick={() => scroll('left')}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors shadow-sm"
          aria-label="Vorige"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors shadow-sm"
          aria-label="Volgende"
        >
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}

export default ImageSlider
