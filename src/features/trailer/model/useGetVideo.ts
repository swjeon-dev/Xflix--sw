import { useEffect, useState } from 'react'

import { tmdbFetch } from '@/shared'
import type { IVideoReturn, MediaVideoType } from '@/shared/model/video.types'
import { getVideosEndpoint } from '../api'
import { findPlayableYoutubeUrl, type YoutubeEmbedVariant } from '../lib'

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

    const errorMessage =
      mediaType === 'movie'
        ? '영화 영상 정보를 불러오지 못했습니다.'
        : 'TV 프로그램 영상 정보를 불러오지 못했습니다.'

    async function fetchVideos() {
      setStatus('loading')
      setTrailerUrl(null)
      setError(null)

      const result = await tmdbFetch<IVideoReturn>(
        getVideosEndpoint(id, mediaType),
        undefined,
        errorMessage,
      )

      if (cancelled) return

      if (result.error) {
        setTrailerUrl(null)
        setError(result.error)
        setStatus('error')
        return
      }

      const url = await findPlayableYoutubeUrl(
        result.data?.results ?? [],
        variant,
      )

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

    fetchVideos()
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
