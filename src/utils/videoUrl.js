/**
 * Parse video URL to determine provider and source for Plyr.
 * Returns { provider: 'youtube'|'vimeo'|'html5', videoId?: string, src?: string }
 */
export function parseVideoUrl(url) {
  if (!url || typeof url !== 'string') return null

  const trimmed = url.trim()

  // YouTube
  const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return { provider: 'youtube', videoId: ytMatch[1] }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return { provider: 'vimeo', videoId: vimeoMatch[1] }

  // Direct video URL (HTML5)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return { provider: 'html5', src: trimmed }
  }

  return null
}
