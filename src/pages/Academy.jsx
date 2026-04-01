import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, useParams, useLocation } from 'react-router-dom'
import { R } from '../utils/routes'
import {
  getAcademyIndex,
  getAcademyCategories,
  getAcademyCategory,
  getAcademyVideo,
  getLiveSessions,
  getLiveSessionRecordings,
  getLiveSession,
} from '../services/academyService'
import { nl } from '../translations'
import { SearchHero } from '../components/hero'
import AcademySidebar from '../components/sidebar/AcademySidebar'
import { MediaHub } from '../components/content'

function Academy() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const searchQuery = searchParams.get('q') ?? ''

  const isCategoriesView = pathname === R.academyCategories
  const isCategoryView = pathname.startsWith(`${R.academy}/category/`) && !isCategoriesView
  const isVideoView = pathname.startsWith(`${R.academy}/video/`)
  const isLiveSessionsView = pathname === R.academyLiveSessions
  const isRecordingsView = pathname === R.recordings
  const isLiveSessionView = pathname.startsWith(`${R.academy}/live-sessions/`) && pathname !== R.recordings
  const categorySlug = isCategoryView ? slug : null
  const videoSlug = isVideoView ? slug : null
  const liveSessionSlug = isLiveSessionView ? slug : null

  const [indexData, setIndexData] = useState(null)
  const [categories, setCategories] = useState([])
  const [liveSessions, setLiveSessions] = useState({ upcoming: [], past: [] })
  const [recordingsData, setRecordingsData] = useState({ data: [], meta: {} })
  const [liveSessionData, setLiveSessionData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)
  const [videoData, setVideoData] = useState(null)
  const [videoError, setVideoError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(false)

  const fetchIndex = useCallback(async (q = '') => {
    try {
      const data = await getAcademyIndex(q)
      setIndexData(data)
      setCategories(data?.categories ?? [])
    } catch {
      setIndexData({
        featured_session: null,
        upcoming_sessions: [],
        recent_videos: [],
        presenters: [],
        categories: [],
        stats: { video_count: 0, total_duration_seconds: 0, hero_duration: null },
      })
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getAcademyCategories()
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data)
      }
    } catch {
      // keep existing categories from index
    }
  }, [])

  const fetchLiveSessions = useCallback(async () => {
    try {
      const data = await getLiveSessions()
      setLiveSessions({ upcoming: data?.upcoming ?? [], past: data?.past ?? [] })
    } catch {
      setLiveSessions({ upcoming: [], past: [] })
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchIndex(searchQuery)
    fetchCategories()
    fetchLiveSessions()
  }, [searchQuery, fetchIndex, fetchCategories, fetchLiveSessions])

  useEffect(() => {
    if (categorySlug) {
      setContentLoading(true)
      setVideoData(null)
      setVideoError(false)
      const fallback = [...(indexData?.categories ?? []), ...categories].find(
        (c) => String(c.slug ?? c.id ?? '') === String(categorySlug)
      )
      getAcademyCategory(categorySlug)
        .then(setCategoryData)
        .catch(() => setCategoryData(fallback ?? null))
        .finally(() => setContentLoading(false))
    } else {
      setCategoryData(null)
    }
  }, [categorySlug, indexData?.categories, categories])

  useEffect(() => {
    if (videoSlug) {
      setContentLoading(true)
      setCategoryData(null)
      setVideoError(false)
      getAcademyVideo(videoSlug)
        .then((data) => {
          setVideoData(data)
          setVideoError(false)
        })
        .catch(() => {
          setVideoData(null)
          setVideoError(true)
        })
        .finally(() => setContentLoading(false))
    } else {
      setVideoData(null)
      setVideoError(false)
    }
  }, [videoSlug])

  useEffect(() => {
    if (isRecordingsView) {
      setContentLoading(true)
      getLiveSessionRecordings()
        .then((res) => setRecordingsData(res ?? { data: [], meta: {} }))
        .catch(() => setRecordingsData({ data: [], meta: {} }))
        .finally(() => setContentLoading(false))
    } else {
      setRecordingsData({ data: [], meta: {} })
    }
  }, [isRecordingsView])

  useEffect(() => {
    if (liveSessionSlug) {
      setContentLoading(true)
      setCategoryData(null)
      setVideoData(null)
      getLiveSession(liveSessionSlug)
        .then(setLiveSessionData)
        .catch(() => setLiveSessionData(null))
        .finally(() => setContentLoading(false))
    } else {
      setLiveSessionData(null)
    }
  }, [liveSessionSlug])

  const handleSearch = useCallback((q) => {
    const params = new URLSearchParams(searchParams)
    if (q) params.set('q', q)
    else params.delete('q')
    navigate(`${R.academy}?${params.toString()}`, { replace: true })
    fetchIndex(q)
  }, [searchParams, navigate, fetchIndex])

  const view = isCategoriesView ? 'categories'
    : isLiveSessionsView ? 'liveSessions'
    : isRecordingsView ? 'recordings'
    : isLiveSessionView ? 'liveSession'
    : !categorySlug && !videoSlug ? 'index' : categorySlug ? 'category' : 'video'

  const handleSelect = useCallback((item) => {
    if (!item) {
      navigate(R.academy)
      return
    }
    if (typeof item === 'object' && item.type === 'category') {
      navigate(R.academyCategory(item.slug))
      return
    }
    const s = typeof item === 'string' ? item : item?.slug
    if (s) navigate(R.academyVideo(s))
  }, [navigate])

  return (
    <>
      <SearchHero
        title={nl('academy.heroTitle')}
        subtitle={nl('academy.heroSub')}
        breadcrumbs={[{ label: nl('nav.lerenEnDoen') }]}
        search={searchQuery}
        onSearch={handleSearch}
        searchPlaceholder={nl('academy.searchPlaceholder')}
        searchButtonLabel={nl('academy.searchButton')}
        scrollTargetId="academy-content"
        stats={(indexData?.stats?.video_count ?? 0) > 0
          ? [{ icon: 'video_library', label: `${indexData.stats.video_count} ${nl('academy.videos')}` }]
          : [{ icon: 'video_library', label: nl('academy.statWebinars') }]
        }
      />

      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <AcademySidebar activeMenu={isLiveSessionsView || isRecordingsView || isLiveSessionView ? 'liveSessions' : 'dashboard'} />
          <MediaHub
            view={view}
            indexData={indexData}
            categories={categories}
            categoryData={categoryData}
            videoData={videoData}
            videoError={videoError}
            liveSessions={liveSessions}
            recordingsData={recordingsData}
            liveSessionData={liveSessionData}
            selectedSlug={videoSlug}
            onSelectVideo={handleSelect}
            loading={view === 'index' || view === 'categories' ? loading : contentLoading}
          />
        </div>
      </div>
    </>
  )
}

export default Academy
