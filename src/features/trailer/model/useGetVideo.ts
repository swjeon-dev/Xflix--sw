import { useEffect, useState } from 'react'

import { getVideos } from '../api'
import { findPlayableYoutubeUrl, type YoutubeEmbedVariant } from '../lib'
import type { MediaVideoType } from './video.types'

type VideoStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error'

interface IUseGetVideoReturn {
  error: string | null
  isLoading: boolean
  status: VideoStatus
  trailerUrl: string | null
}

function useGetVideo(
  id: string,
  mediaType: MediaVideoType = 'movie',
  variant: YoutubeEmbedVariant,
): IUseGetVideoReturn {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<VideoStatus>('idle')

  useEffect(() => {
    if (!id) {
      setTrailerUrl(null)
      setError(null)
      setStatus('idle')
      return
    }

    let cancelled = false

    async function loadVideos() {
      setStatus('loading')
      setTrailerUrl(null)
      setError(null)

      let results = await getVideos(id, mediaType)

      if (cancelled) return

      if (!results.data?.results?.length) {
        results = await getVideos(id, mediaType, { language: 'en-US' })
        if (cancelled) return
      }

      if (results.error) {
        setTrailerUrl(null)
        setError(results.error)
        setStatus('error')
        return
      }

      const url = await findPlayableYoutubeUrl(
        results.data?.results ?? [],
        variant,
      )

      if (cancelled) return

      if (!url) {
        setTrailerUrl(null)
        setError(null)
        setStatus('empty')
        return
      }

      setTrailerUrl(url)
      setError(null)
      setStatus('ready')
    }

    loadVideos()

    return () => {
      cancelled = true
    }
  }, [id, mediaType, variant])

  return {
    error,
    isLoading: status === 'loading',
    status,
    trailerUrl,
  }
}

export default useGetVideo
export type { VideoStatus, IUseGetVideoReturn }
