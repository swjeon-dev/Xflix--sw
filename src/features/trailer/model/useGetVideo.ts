import { useEffect, useState } from 'react'

import { tmdbFetch } from '@/shared'
import type { IVideoReturn, MediaVideoType } from '@/shared/model/video.types'
import { getVideosEndpoint } from '../api'
import { pickYoutubeTrailerUrl, type YoutubeEmbedVariant } from '../lib'

interface IUseGetVideoReturn {
  error: string | null
  isLoading: boolean
  trailerUrl: string | null
}

function useGetVideo(
  id: string,
  mediaType: MediaVideoType = 'movie',
  variant: YoutubeEmbedVariant,
): IUseGetVideoReturn {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setTrailerUrl(null)
      setError(null)
      setIsLoading(false)
      return
    }

    let cancelled = false

    const errorMessage =
      mediaType === 'movie'
        ? '영화 영상 정보를 찾을 수 없습니다.'
        : 'TV 프로그램 영상 정보를 찾을 수 없습니다.'

    async function fetchVideos() {
      setIsLoading(true)
      setTrailerUrl(null)
      setError(null)

      const result = await tmdbFetch<IVideoReturn>(
        getVideosEndpoint(id, mediaType),
        undefined,
        errorMessage,
      )

      const results = result.data?.results ?? []

      if (cancelled) return

      setTrailerUrl(pickYoutubeTrailerUrl(results, variant))
      setError(result.error)
      setIsLoading(false)
    }

    fetchVideos()
    return () => {
      cancelled = true
    }
  }, [id, mediaType, variant])

  return { error, isLoading, trailerUrl }
}

export default useGetVideo
