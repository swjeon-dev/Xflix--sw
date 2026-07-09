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

      const [resultInKorean, resultInEnglish] = await Promise.all([
        getVideos(id, mediaType),
        getVideos(id, mediaType, { language: 'en-US' }),
      ])
      const koreanResults = resultInKorean.data?.results ?? []
      const englishResults = resultInEnglish.data?.results ?? []
      const results = koreanResults.length > 0 ? koreanResults : englishResults

      if (cancelled) return

      if (!!resultInKorean.error && !!resultInEnglish.error) {
        setTrailerUrl(null)
        setError(resultInKorean.error || resultInEnglish.error)
        setStatus('error')
        return
      }

      const url = await findPlayableYoutubeUrl(results, variant)

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
