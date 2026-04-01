import { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { parseVideoUrl } from '../../utils/videoUrl'

/**
 * VideoPlayer – Plyr wrapper for YouTube, Vimeo, and HTML5 video.
 *
 * Props:
 * - source: { provider: 'youtube'|'vimeo'|'html5', videoId?: string, src?: string }
 *   OR video object from Academy API: { video_id, video_provider, video_url, embed_url, ... }
 *   OR string URL (parsed via parseVideoUrl)
 * - title: optional aria-label
 * - poster: optional poster image URL (HTML5 only)
 * - className: optional wrapper class
 */
export default function VideoPlayer({ source, title = '', poster, className = '' }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)

  const normalized = (() => {
    if (!source) return null
    if (typeof source === 'string') return parseVideoUrl(source)
    if (source.video_id && (source.video_provider === 'youtube' || source.video_provider === 'vimeo')) {
      return { provider: source.video_provider, videoId: source.video_id }
    }
    if (source.provider && (source.videoId || source.src)) return source
    if (source.video_url) return parseVideoUrl(source.video_url)
    if (source.embed_url) return parseVideoUrl(source.embed_url)
    return null
  })()

  useEffect(() => {
    if (!normalized || !containerRef.current) return

    const el = containerRef.current.querySelector('.plyr-target')
    if (!el) return

    const player = new Plyr(el, {
      title: title || undefined,
      hideControls: true,
    })
    playerRef.current = player

    return () => {
      player.destroy()
      playerRef.current = null
    }
  }, [normalized?.provider, normalized?.videoId, normalized?.src, title])

  if (!normalized) return null

  if (normalized.provider === 'youtube' || normalized.provider === 'vimeo') {
    return (
      <div ref={containerRef} className={`${className}`.trim()}>
        <div
          className="plyr__video-embed plyr-target"
          data-plyr-provider={normalized.provider}
          data-plyr-embed-id={normalized.videoId}
        />
      </div>
    )
  }

  if (normalized.provider === 'html5' && normalized.src) {
    return (
      <div ref={containerRef} className={`${className}`.trim()}>
        <video
          className="plyr-target"
          playsInline
          controls
          data-poster={poster || undefined}
          data-title={title || undefined}
        >
          <source src={normalized.src} type="video/mp4" />
        </video>
      </div>
    )
  }

  return null
}
