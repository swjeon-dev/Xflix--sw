import { useEffect, useState } from 'react'

import { tmdbFetch } from '@/shared'
import type { IVideo, IVideoReturn, MediaVideoType } from './video.types'
import { getVideosEndpoint } from '../api/tmdb/video'

interface IUseGetVideoReturn {
  error: string | null
  isLoading: boolean
  videos: IVideo[]
  trailer: IVideo | null
}
function pickYoutubeTrailer(videos: IVideo[]): IVideo | null {
  const youtube = videos.filter(video => video.site === 'YouTube')

  return (
    youtube.find(video => video.type === 'Trailer' && video.official) ??
    youtube.find(video => video.type === 'Trailer') ??
    youtube[0] ??
    null
  )
}

function useGetVideo(
  id: string,
  mediaType: MediaVideoType = 'movie',
): IUseGetVideoReturn {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [trailer, setTrailer] = useState<IVideo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setVideos([])
      setTrailer(null)
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
      const result = await tmdbFetch<IVideoReturn>(
        getVideosEndpoint(id, mediaType),
        undefined,
        errorMessage,
      )

      if (cancelled) return

      const results = result.data?.results ?? []
      setVideos(results)
      setTrailer(pickYoutubeTrailer(results))
      setError(result.error)
      setIsLoading(false)
    }

    fetchVideos()
    return () => {
      cancelled = true
    }
  }, [id])

  return { error, isLoading, videos, trailer }
}

export default useGetVideo
