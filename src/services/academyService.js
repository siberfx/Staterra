/**
 * Academy/Course API
 * GET /course – index (featured_session, upcoming_sessions, recent_videos, presenters, categories, stats)
 * GET /course/categories – categories with videos
 * GET /course/category/{slug} – category with videos, chapters
 * GET /course/video/{slug} – video with related_videos, video_id, video_provider
 */

import { get } from './api'

export async function getAcademyIndex(q = '') {
  const res = await get('course', q ? { q } : undefined)
  return res?.data ?? {
    featured_session: null,
    upcoming_sessions: [],
    recent_videos: [],
    presenters: [],
    categories: [],
    search_query: '',
    stats: { video_count: 0, total_duration_seconds: 0, hero_duration: null },
  }
}

export async function getAcademyCategories() {
  const res = await get('course/categories')
  return res?.data ?? []
}

export async function getAcademyCategory(slug) {
  const res = await get(`course/category/${slug}`)
  return res?.data ?? null
}

export async function getAcademyVideo(slug) {
  const res = await get(`course/video/${slug}`)
  const data = res?.data ?? null
  const relatedVideos = res?.related_videos ?? []
  if (!data) return null
  return { ...data, related_videos: relatedVideos }
}

export async function getLiveSessions() {
  const res = await get('course/live-sessions')
  return res ?? { upcoming: [], past: [], past_meta: {} }
}

export async function getLiveSessionRecordings(params = {}) {
  const res = await get('course/live-sessions/recordings', params)
  return res ?? { data: [], meta: {} }
}

export async function getLiveSession(slug) {
  const res = await get(`course/live-sessions/${slug}`)
  return res?.data ?? res ?? null
}
