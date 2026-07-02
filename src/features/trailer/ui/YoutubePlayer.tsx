import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import {
  extractYoutubeVideoKey,
  getYoutubePlayerVars,
  loadYoutubeIframeApi,
  type YoutubeEmbedVariant,
} from '../lib'

interface YoutubePlayerProps {
  title: string
  src: string
  variant: YoutubeEmbedVariant
  onUnavailable?: () => void
}

const BASE_CLASS = 'absolute inset-0 w-full h-full'
const BACKGROUND_CLASS = 'pointer-events-none scale-[1.35] [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:object-cover'
const UNAVAILABLE_ERROR_CODES = new Set([2, 5, 100, 101, 150])

function YoutubePlayer({
  title,
  src,
  variant,
  onUnavailable,
}: YoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const onUnavailableRef = useRef(onUnavailable)
  onUnavailableRef.current = onUnavailable

  const videoKey = extractYoutubeVideoKey(src)
  const className = clsx(
    BASE_CLASS,
    variant === 'background' && BACKGROUND_CLASS,
  )

  useEffect(() => {
    if (!containerRef.current || !videoKey) {
      onUnavailableRef.current?.()
      return
    }

    let destroyed = false

    loadYoutubeIframeApi()
      .then(YT => {
        if (destroyed || !containerRef.current) return

        playerRef.current = new YT.Player(containerRef.current, {
          videoId: videoKey,
          playerVars: getYoutubePlayerVars(videoKey, variant),
          events: {
            onError: (event: YT.OnErrorEvent) => {
              if (UNAVAILABLE_ERROR_CODES.has(event.data)) {
                onUnavailableRef.current?.()
              }
            },
          },
        })
      })
      .catch(() => {
        onUnavailableRef.current?.()
      })

    return () => {
      destroyed = true
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoKey, variant])

  return (
    <div
      ref={containerRef}
      title={`${title} 트레일러`}
      className={className}
      aria-label={`${title} 트레일러`}
    />
  )
}

export default YoutubePlayer
