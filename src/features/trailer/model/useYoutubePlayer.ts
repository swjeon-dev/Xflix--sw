import { useEffect, useRef } from 'react'

import { extractYoutubeVideoKey } from '../lib/youtubeVideo'
import { getYoutubePlayerVars, loadYoutubeIframeApi } from '../lib'

const UNAVAILABLE_ERROR_CODES = new Set([2, 5, 100, 101, 150])

interface YoutubePlayerProps {
  src: string
  variant: 'background' | 'modal'
  onUnavailable?: () => void
}

export default function useYoutubePlayer({
  src,
  variant,
  onUnavailable,
}: YoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YT.Player | null>(null)
  const onUnavailableRef = useRef(onUnavailable)
  onUnavailableRef.current = onUnavailable

  const videoKey = extractYoutubeVideoKey(src)

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

  return {
    containerRef,
  }
}
