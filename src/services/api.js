/**
 * API client for OpenPublication
 * Base URL: VITE_API_URL (e.g. https://studio.openpublication.eu/api)
 * Dev: /api proxy kullanır (CORS bypass)
 */

import axios from 'axios'

const isDev = import.meta.env.DEV
const BASE_URL = isDev
  ? '/api'
  : (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

const api = axios.create({
  baseURL: BASE_URL || undefined,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    if (config.headers && typeof config.headers.delete === 'function') {
      config.headers.delete('Content-Type')
    } else {
      delete config.headers['Content-Type']
    }
  }
  return config
})

const API_ORIGIN = (() => {
  const url = import.meta.env.VITE_API_URL ?? ''
  try { return url ? new URL(url.replace(/\/$/, '')).origin : '' } catch { return '' }
})()

const MEDIA_KEYS = new Set([
  'image', 'image_url', 'thumbnail', 'thumbnail_url',
  'avatar', 'author_avatar', 'logo', 'favicon', 'cover',
  'hero_background', 'og_image',
])

function resolveUrls(obj) {
  if (!obj || typeof obj !== 'object' || !API_ORIGIN) return obj
  if (Array.isArray(obj)) { obj.forEach(resolveUrls); return obj }
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && MEDIA_KEYS.has(k) && v.startsWith('/') && !v.startsWith('//')) {
      obj[k] = `${API_ORIGIN}${v}`
    } else if (v && typeof v === 'object') {
      resolveUrls(v)
    }
  }
  return obj
}

const DEBUG = import.meta.env.VITE_DEBUG === 'true' || import.meta.env.VITE_DEBUG === '1'

api.interceptors.response.use(
  (response) => resolveUrls(response.data),
  (error) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data ?? {}
      if (DEBUG) {
        console.error('[API Error]', error.config?.url, error.response?.status, data)
      }
      if (error.response?.status === 422) {
        console.log('[API 422] Validation errors:', JSON.stringify(data, null, 2))
      }
      const message =
        data.message ??
        data.error ??
        (typeof data.errors === 'object' ? Object.values(data.errors).flat().join(' ') : null) ??
        error.message ??
        `API error: ${error.response?.status ?? 'unknown'}`
      const err = new ApiError(error.response?.status ?? 0, message)
      err.errors = data.errors
      throw err
    }
    throw error
  }
)

/**
 * HTTP request helper
 */
export function request(path, options = {}) {
  return api.request({ ...options, url: path })
}

/**
 * GET request
 */
export function get(path, params, options = {}) {
  return api.get(path, { ...options, params })
}

/**
 * POST request
 */
export function post(path, data, options = {}) {
  return api.post(path, data, options)
}

/**
 * PUT request
 */
export function put(path, data, options = {}) {
  return api.put(path, data, options)
}

/**
 * PATCH request
 */
export function patch(path, data, options = {}) {
  return api.patch(path, data, options)
}

/**
 * DELETE request
 */
export function del(path, options = {}) {
  return api.delete(path, options)
}

/**
 * Custom API error with status code
 */
export class ApiError extends Error {
  constructor(status, message) {
    super(message ?? `API error: ${status}`)
    this.name = 'ApiError'
    this.status = status
  }
}

export default api
