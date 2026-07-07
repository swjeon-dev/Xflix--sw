import { useEffect, useState } from 'react'

import type { MediaVideoType } from './video.types'
import useGetVideo from './useGetVideo'

function useTrailerPlay(
  contentId: string,
  mediaType: MediaVideoType,
  variant: 'modal' | 'background',
) {
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false)
  const { trailerUrl, isLoading, status, error } = useGetVideo(
    contentId,
    mediaType,
    variant,
  )

  useEffect(() => {
    setPlaybackUnavailable(false)
  }, [contentId, mediaType])

  const isReady = status === 'ready' && !!trailerUrl && !playbackUnavailable
  const isEmpty = status === 'empty' || !trailerUrl || playbackUnavailable
  const isError = status === 'error'

  return {
    trailerUrl,
    isLoading,
    isError,
    isEmpty,
    isReady,
    error,
    markUnavailable: () => setPlaybackUnavailable(true),
  }
}

export default useTrailerPlay
