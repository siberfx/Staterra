import { useRef, useState, useCallback, useEffect } from 'react'
import { nl } from '../../translations'
import MemberCard from './MemberCard'

const teams = [
  {
    category: 'Strategy',
    title: 'Collaborative Planning',
    description: 'Teams aligning on strategic goals.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM7XLs5gNIlmx0Ut5-EYDAbTKBRfOmjM5py2d0rkR97GykfCEP4aMNhUCcFBK4SF-tWGa9SRsrS2v4vW_46wGSZAsEyP9-zA3ekp8sV1ghorUhqcwkLQklAb9ic90zAoPoyU2Oj_JYR9zM6epsBdlPjEZapbSFN7n1iy4DWV0j0sUHcn784-fGuLVzmXss5pLPoZVUgfvGrENpBxR-Fu02yDjqGufgmPjic5cddAX99gCLH8B-PtjAOdS99LUoTL4e22ak1pSaoKgY',
    imageAlt: 'Team Strategy Meeting',
  },
  {
    category: 'Operations',
    title: 'Efficient Execution',
    description: 'Streamlined processes in action.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Dce4YNA2hd7wS5KfrScKTeV5pNJM_MDXDBGuYt2M8B_Yv_nEb1FwWN3_KUrmnhsyvMwp-vlZpOl8WQRpWISYLteKfH9S-HKj-nuRfbv5AxX287HKsELm9S7DNCybitiORbjf-91ew4mzyCJGOmhAubpZ12se8GML0Z4KeCqDPMJWarz6Tj1RXp_zHpkvVtKnXCMmFVrcfF6DQBkNykDeN7XJSyY2juCcRqk1ciXGynVW1ESXqtgCOxqXM5fCDovUSVKJ81M1Q--9',
    imageAlt: 'Modern Office Work',
  },
  {
    category: 'Community',
    title: 'Diverse Perspectives',
    description: 'Inclusive decision making.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEzIm2J-Gv8ySrdkSzKeG0JLmXZtYomlxKJKADCLa5QDLeSgOhy3UkLKaOO5tbYyYh0AGocNOonmaPlTyULSZUlXezh4XGG6ChMIz63EcSfWrRD7PLlnJCfOVasLzyrmpGEnrqC_0nYETQp5mPJRlPpmK0AJzT_YhdlYBknBl02KP9jbtrgo95LMVOKmlg9yBE1cV0drLaUYtw8V2qtwgvUQUeEhi4q4j15ikKWNsZm25DXhFhgpBNn1c1ug8lZYX7MQ2GXeXCw7GK',
    imageAlt: 'Diverse Team Discussion',
  },
  {
    category: 'Culture',
    title: 'Positive Environment',
    description: 'Building a better workplace.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYiWC6365S0EjlXrokqP0rps3w4F5KGWDndcSRPMoLetjpn-Akb3HuDPgyYscuL9KNBGzxybdQnxBq652Cyd9yxOrAGhvxopezJO3vuLKBmDvxQu-i2iMZqjlQJtAZAewx_C98jH7GXpQEAgEHV2JMOks0GO_3b2edX7R-PBfqZsOymRV1LBteUNPfx24XORXmPnV6WCQsYfcZEu61pky-DD4uSwDfdnSLS7wc6rE7WXIqd8OPG37DbiOfyDYSV2WGE9waCShIRDEo',
    imageAlt: 'Happy Team Members',
  },
  {
    category: 'Support',
    title: 'Dedicated Assistance',
    description: 'Helping you succeed every day.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzDDaFIEDvTfIuKPapdrU8TNtb8DuUMVDyrqR1QYGdadcFlk_XqHk988k-JlRUrYBDhmgQ0QKGZk1QxZBmIz4ZJkoj82kSn4ez5_2x-ouQbDqjTX-gzJv4Va7RXfEo8nuDyv-VwdYhAteVasbpsY2jBevDXr2-B1ZzclaIuj7WqxaQL16xG0ClLXWbYoXCe1GSKRI4KBAy2mA6sqw-t64ha74i1DTIoiWTjR_0YqrzLdIXElL0ZO9LeY_g_3C_zNg8SVWYU5VgeLZd',
    imageAlt: 'Tech Support Team',
  },
]

function TeamCarousel() {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const cardWidth = 504 // ~480px card + 24px gap
    const amount = direction === 'left' ? -cardWidth : cardWidth
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

  return (
    <section className="py-24 bg-white overflow-x-hidden">
      <div className="container-page mb-10">
        <h2 className="text-3xl font-bold text-black">{nl('home.ourTeams')}</h2>
        <p className="text-lg text-gray-600 mt-2">{nl('home.ourTeamsSub')}</p>
      </div>

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
            className="flex gap-6 min-w-max"
            style={{
              paddingLeft: 'max(1rem, calc((100vw - min(80rem, 100vw)) / 2 + 1rem))',
              paddingRight: '2rem',
            }}
          >
            {teams.map((team) => (
              <MemberCard key={team.title} {...team} />
            ))}
          </div>
        </div>
        <div
          className="absolute bottom-0 flex gap-2"
          style={{ right: 'max(1rem, calc((100vw - min(80rem, 100vw)) / 2 + 1rem))' }}
        >
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors shadow-sm"
            aria-label={nl('home.sliderPrev')}
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary transition-colors shadow-sm"
            aria-label={nl('home.sliderNext')}
          >
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default TeamCarousel
