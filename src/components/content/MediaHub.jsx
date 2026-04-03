import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { nl } from '../../translations'
import { R, toFrontendUrl } from '../../utils/routes'
import { resolveMediaUrl } from '../../utils/media'

const VideoPlayer = lazy(() => import('../video/VideoPlayer'))

function formatDuration(seconds) {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function getVideoEmbedUrl(video) {
  const provider = video?.video_provider ?? 'youtube'
  const videoId = video?.video_id
  if (!videoId) return null
  if (provider === 'youtube') return `https://www.youtube.com/embed/${videoId}`
  if (provider === 'vimeo') return `https://player.vimeo.com/video/${videoId}`
  return null
}

function getThumbnailUrl(video) {
  const url = video?.thumbnail_url ?? video?.thumbnail
  if (url) return resolveMediaUrl(url)
  const videoId = video?.video_id
  const provider = video?.video_provider ?? 'youtube'
  if (videoId && provider === 'youtube') return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
  return null
}

export default function MediaHub({
  view,
  indexData,
  categories = [],
  categoryData,
  videoData,
  videoError,
  liveSessions = { upcoming: [], past: [] },
  recordingsData = { data: [], meta: {} },
  liveSessionData,
  selectedSlug,
  onSelectVideo,
  loading,
}) {
  if (loading) {
    return (
      <div className="flex-1 min-w-0 animate-pulse">
        <div className="mb-12">
          <div className="h-7 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-full max-w-md bg-gray-200 rounded mb-6" />
          <div className="flex gap-6 mb-6">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="mb-12">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-none border border-gray-100">
            <div className="md:w-80 flex-shrink-0 aspect-video bg-gray-200 rounded-none" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        <div className="mb-12">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-none border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-12">
          <div className="h-6 w-44 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-none border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-5 w-2/3 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Categories view: all categories
  if (view === 'categories') {
    const allCategories = categories.length > 0 ? categories : indexData?.categories ?? []
    return (
      <div id="academy-content" className="flex-1 min-w-0 scroll-mt-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-2">{nl('academy.discoverByTopic')}</h2>
          <p className="text-gray-600 mb-8">{nl('academy.searchSub')}</p>
        </section>
        {allCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((cat) => (
              <Link
                key={cat.slug ?? cat.id}
                to={toFrontendUrl(cat.url) ?? R.academyCategory(cat.slug ?? cat.id)}
                  className="group block rounded-none overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="relative aspect-video">
                    {resolveMediaUrl(cat.image_url ?? cat.thumbnail_url) ? (
                    <img src={resolveMediaUrl(cat.image_url ?? cat.thumbnail_url)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary">
                      <span className="material-symbols-outlined text-white text-4xl opacity-90">folder</span>
                    </div>
                  )}
                  {(cat.videos_count ?? 0) > 0 && (
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                      {cat.videos_count} {nl('academy.videos')}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-primary group-hover:text-primary">
                    {cat.name ?? cat.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-12">{nl('academy.noContent')}</p>
        )}
      </div>
    )
  }

  // Live sessions view: upcoming (Aanstaande) + past (Terugkijken) - two sections
  if (view === 'liveSessions') {
    const upcoming = liveSessions?.upcoming ?? []
    const past = liveSessions?.past ?? []
    return (
      <div id="academy-content" className="flex-1 min-w-0 scroll-mt-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-2">{nl('academy.agendaLiveSessions')}</h2>
          <p className="text-gray-600 mb-8">{nl('academy.searchSub')}</p>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">{nl('academy.upcomingSessions')}</h3>
          </div>
          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((s) => (
                <Link
                  key={s.slug ?? s.id}
                  to={toFrontendUrl(s.url) ?? R.academyLiveSession(s.slug ?? s.id)}
                  className="block p-5 bg-white border border-gray-100 rounded-none hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {(s.starts_at || s.date) && (
                      <span className="text-sm font-medium text-gray-500">
                        {s.starts_at ? new Date(s.starts_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : (s.date?.nl ?? s.date)}
                      </span>
                    )}
                    {(s.duration_formatted ?? s.duration_seconds ?? s.duration) && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {s.duration_formatted ?? (s.duration_seconds ? formatDuration(s.duration_seconds) : (s.duration?.nl ?? s.duration))}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-primary mt-2 mb-1">{s.title ?? s.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{s.description ?? s.subtitle ?? nl('academy.sessionDesc')}</p>
                  <span className="text-sm font-medium text-primary hover:underline">{nl('academy.startSession')} →</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-6">{nl('academy.noContent')}</p>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">{nl('academy.terugkijken')}</h3>
            <Link to={R.recordings} className="text-sm font-medium text-primary hover:underline">
              {nl('academy.viewAllSessions')} →
            </Link>
          </div>
          {past.length > 0 ? (
            <div className="space-y-4">
              {past.map((s) => (
                <Link
                  key={s.slug ?? s.id}
                  to={toFrontendUrl(s.url) ?? R.academyLiveSession(s.slug ?? s.id)}
                  className="block p-5 bg-white border border-gray-100 rounded-none hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <h4 className="font-bold text-primary">{s.title ?? s.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.description ?? s.subtitle}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-6">{nl('academy.noContent')}</p>
          )}
        </section>
      </div>
    )
  }

  // Recordings view (Terugkijken): past sessions - same structure as categories
  if (view === 'recordings') {
    const recordings = recordingsData?.data ?? []
    return (
      <div id="academy-content" className="flex-1 min-w-0 scroll-mt-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-2">{nl('academy.terugkijken')}</h2>
          <p className="text-gray-600 mb-8">{nl('academy.searchSub')}</p>
        </section>
        {recordings.length > 0 ? (
          <div className="space-y-4">
            {recordings.map((s) => (
              <Link
                key={s.slug ?? s.id}
                to={toFrontendUrl(s.url) ?? R.academyLiveSession(s.slug ?? s.id)}
                className="block p-5 bg-white border border-gray-100 rounded-none hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <h4 className="font-bold text-primary">{s.title ?? s.name}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.description ?? s.subtitle}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-12">{nl('academy.noContent')}</p>
        )}
      </div>
    )
  }

  // Live session detail view
  if (view === 'liveSession' && liveSessionData) {
    return (
      <div className="flex-1 min-w-0 max-w-4xl">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {liveSessionData.title ?? liveSessionData.name}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          {liveSessionData.description ?? liveSessionData.subtitle}
        </p>
        {(liveSessionData.starts_at || liveSessionData.date) && (
          <p className="text-sm text-gray-500 mb-4">
            {liveSessionData.starts_at ? new Date(liveSessionData.starts_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : (liveSessionData.date?.nl ?? liveSessionData.date)}
          </p>
        )}
        <Link to={R.academyLiveSessions} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
          ← {nl('academy.back')}
        </Link>
      </div>
    )
  }

  // Index view: featured, upcoming live sessions, categories, recent
  if (view === 'index' && indexData) {
    const { featured_session, upcoming_sessions, recent_videos, categories, stats } = indexData
    const videoCount = stats?.video_count ?? 0
    const duration = stats?.total_duration_seconds ?? 0
    const upcoming = (liveSessions?.upcoming?.length > 0 ? liveSessions.upcoming : upcoming_sessions) ?? []

    return (
      <div id="academy-content" className="flex-1 min-w-0 scroll-mt-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-2">{nl('academy.whatToLearn')}</h2>
          <p className="text-gray-600 mb-6">{nl('academy.searchSub')}</p>
        </section>

        {featured_session && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-primary mb-4">{nl('academy.featured')}</h3>
            <Link
              to={toFrontendUrl(featured_session.url) ?? R.academyVideo(featured_session.slug)}
              className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-none border border-gray-100 hover:border-gray-200 transition-all block"
            >
              <div className="md:w-80 flex-shrink-0 aspect-video overflow-hidden rounded-none bg-gray-200">
                {getThumbnailUrl(featured_session) ? (
                  <img src={getThumbnailUrl(featured_session)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <span className="material-symbols-outlined text-primary text-5xl">play_circle</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-primary mb-2">
                  {featured_session.title ?? featured_session.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {featured_session.description ?? featured_session.subtitle}
                </p>
                {(featured_session.duration_formatted ?? featured_session.duration_seconds) && (
                  <span className="text-xs text-gray-500">
                    {featured_session.duration_formatted ?? formatDuration(featured_session.duration_seconds)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-4 block">
                  {nl('academy.viewDetails')}
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </span>
              </div>
            </Link>
          </section>
        )}

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary">{nl('academy.upcomingSessions')}</h3>
            <Link to={R.academyLiveSessions} className="text-sm font-medium text-primary hover:underline">
              {nl('academy.viewAllSessions')} →
            </Link>
          </div>
          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((s) => (
                <Link
                  key={s.slug ?? s.id}
                  to={toFrontendUrl(s.url) ?? (s.slug ? R.academyLiveSession(s.slug) : R.academyLiveSessions)}
                  className="block p-5 bg-white border border-gray-100 rounded-none hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {(s.starts_at || s.date) && (
                      <span className="text-sm font-medium text-gray-500">
                        {s.starts_at ? new Date(s.starts_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : (s.date?.nl ?? s.date)}
                      </span>
                    )}
                    {(s.duration_formatted ?? s.duration_seconds ?? s.duration) && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {s.duration_formatted ?? (s.duration_seconds ? formatDuration(s.duration_seconds) : (s.duration?.nl ?? s.duration))}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-primary mt-2 mb-1">{s.title ?? s.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{s.description ?? s.subtitle ?? nl('academy.sessionDesc')}</p>
                  <span className="text-sm font-medium text-primary hover:underline">
                    {nl('academy.startSession')} →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-6">{nl('academy.noContent')}</p>
          )}
        </section>

        {categories?.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary">{nl('academy.discoverByTopic')}</h3>
              <Link to={R.academyCategories} className="text-sm font-medium text-primary hover:underline">
                {nl('academy.viewAllTopics')} →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(categories ?? []).slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug ?? cat.id}
                  to={toFrontendUrl(cat.url) ?? R.academyCategory(cat.slug ?? cat.id)}
                  className="group block rounded-none overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div
                    className="aspect-[4/3] flex items-center justify-center bg-primary"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    {resolveMediaUrl(cat.image_url ?? cat.thumbnail_url) ? (
                      <img src={resolveMediaUrl(cat.image_url ?? cat.thumbnail_url)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <span className="material-symbols-outlined text-white text-2xl opacity-90">folder</span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h4 className="font-semibold text-primary text-sm group-hover:text-primary">
                      {cat.name ?? cat.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {recent_videos?.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-primary mb-6">{nl('academy.recentlyAdded')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recent_videos.slice(0, 3).map((v) => (
                <Link
                  key={v.slug ?? v.id}
                  to={toFrontendUrl(v.url) ?? R.academyVideo(v.slug ?? v.id)}
                  className="text-left group block rounded-none overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="relative aspect-video">
                    {getThumbnailUrl(v) ? (
                      <img src={getThumbnailUrl(v)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <span className="material-symbols-outlined text-primary text-4xl">play_circle</span>
                      </div>
                    )}
                    {(v.duration_formatted ?? v.duration_seconds) && (
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                        {v.duration_formatted ?? formatDuration(v.duration_seconds)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-primary group-hover:text-primary">
                      {v.title ?? v.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {v.category?.name ?? v.category?.title ?? ''} {v.created_at ? `• ${new Date(v.created_at).toLocaleDateString('nl-NL')}` : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!featured_session && !upcoming.length && !recent_videos?.length && !categories?.length && (
          <p className="text-gray-500 py-12">{nl('academy.noContent')}</p>
        )}
      </div>
    )
  }

  // Category view – API: categories have videos array directly (no chapters)
  if (view === 'category' && categoryData) {
    const videos = categoryData.videos ?? []

    return (
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-primary mb-2">
          {categoryData.name ?? categoryData.title}
        </h2>
        <p className="text-gray-600 mb-8">{categoryData.description}</p>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v) => (
              <Link
                key={v.slug ?? v.id}
                to={toFrontendUrl(v.url) ?? R.academyVideo(v.slug ?? v.id)}
                className="text-left p-4 rounded-none border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all flex gap-4 block"
              >
                <div className="w-24 aspect-video flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  {getThumbnailUrl(v) ? (
                    <img src={getThumbnailUrl(v)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-gray-300 w-full h-full flex items-center justify-center">play_circle</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{v.title ?? v.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{v.description ?? v.subtitle}</p>
                  {(v.duration_formatted ?? v.duration_seconds) && (
                    <span className="text-xs text-gray-400 mt-1 block">{v.duration_formatted ?? formatDuration(v.duration_seconds)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-12">{nl('academy.noVideos')}</p>
        )}
      </div>
    )
  }

  // Video view – error state (e.g. 500 from API)
  if (view === 'video' && videoError && !videoData) {
    return (
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">error_outline</span>
        <p className="text-gray-600 mb-6 max-w-md">{nl('academy.videoLoadError')}</p>
        <Link
          to={R.academy}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {nl('academy.back')}
        </Link>
      </div>
    )
  }

  // Video view
  if (view === 'video' && videoData) {
    const hasVideo = getVideoEmbedUrl(videoData) ?? videoData.embed_url ?? videoData.video_url
    return (
      <div className="flex-1 min-w-0 max-w-4xl">
        <div className="aspect-video rounded-none overflow-hidden bg-gray-900 mb-8">
          {hasVideo ? (
            <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
              <VideoPlayer
                source={videoData}
                title={videoData.title ?? videoData.name}
                poster={getThumbnailUrl(videoData)}
                className="w-full h-full"
              />
            </Suspense>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-8xl opacity-50">play_circle</span>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-primary mb-4">
          {videoData.title ?? videoData.name}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">
          {videoData.description ?? videoData.subtitle}
        </p>
        {(videoData.duration_formatted ?? videoData.duration_seconds) && (
          <p className="text-sm text-gray-500 mb-6">
            {nl('academy.duration')}: {videoData.duration_formatted ?? formatDuration(videoData.duration_seconds)}
          </p>
        )}
        {videoData.related_videos?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-primary mb-4">{nl('academy.relatedVideos')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoData.related_videos.map((v) => (
                <Link
                  key={v.slug ?? v.id}
                  to={toFrontendUrl(v.url) ?? R.academyVideo(v.slug ?? v.id)}
                  className="text-left p-4 rounded-none border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all flex gap-4 block"
                >
                  <div className="w-24 aspect-video flex-shrink-0 rounded overflow-hidden bg-gray-100">
                    {getThumbnailUrl(v) ? (
                      <img src={getThumbnailUrl(v)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl text-gray-300 w-full h-full flex items-center justify-center">play_circle</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{v.title ?? v.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{v.description ?? v.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0 flex items-center justify-center py-24 text-gray-500">
      {nl('academy.selectCategory')}
    </div>
  )
}
